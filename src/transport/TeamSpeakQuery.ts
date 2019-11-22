import { EventEmitter } from "events"
import { Command } from "./Command"
import { ProtocolRAW } from "./protocols/raw"
import { ProtocolSSH } from "./protocols/ssh"

import { ConnectionParams, QueryProtocol } from "../TeamSpeak"
import { QueryResponseTypes } from "../types/QueryResponse"

export class TeamSpeakQuery extends EventEmitter {

  static IGNORE_LINES_INITIAL = 2
  private config: ConnectionParams
  private queue: Array<TeamSpeakQuery.QueueItem> = []
  private active: TeamSpeakQuery.QueueItem|undefined
  private ignoreLines: number = TeamSpeakQuery.IGNORE_LINES_INITIAL
  private lastEvent: string = ""
  private lastcmd: number = Date.now()
  private connected: boolean = false
  private keepAliveTimeout: any
  private floodTimeout: NodeJS.Timeout
  private socket: TeamSpeakQuery.QueryProtocolInterface
  readonly doubleEvents: Array<string> = [
    "notifyclientleftview",
    "notifyclientmoved",
    "notifycliententerview"
  ]

  constructor(config: ConnectionParams) {
    super()
    this.config = config
  }

  /**
   * start connecting to the teamspeak server
   */
  connect() {
    if (this.socket) {
      if (this.socket.isConnected()) {
        throw new Error("already connected")
      } else {
        this.socket.removeAllListeners()
        this.ignoreLines = TeamSpeakQuery.IGNORE_LINES_INITIAL
      }
    }
    this.socket = TeamSpeakQuery.getSocket(this.config)
    this.socket.on("debug", data => this.emit("debug", data))
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("line", this.handleLine.bind(this))
    this.socket.on("error", this.handleError.bind(this))
    this.socket.on("close", this.handleClose.bind(this))
  }

  /** returns a constructed Socket */
  static getSocket(config: ConnectionParams): TeamSpeakQuery.QueryProtocolInterface {
    if (config.protocol === QueryProtocol.RAW) {
      return new ProtocolRAW(config)
    } else if (config.protocol === QueryProtocol.SSH) {
      return new ProtocolSSH(config)
    } else {
      throw new Error("Invalid Protocol given! Expected (\"raw\" or \"ssh\")")
    }
  }

  /** sends a command to the TeamSpeak Server */
  execute(command: string, ...args: TeamSpeakQuery.executeArgs[]): Promise<QueryResponseTypes[]> {
    return new Promise((fulfill, reject) => {
      const cmd = new Command().setCommand(command)
      Object.values(args).forEach(v => {
        if (Array.isArray(v)) {
          if (v.some(value => typeof value === "object" && value !== null)) {
            return cmd.setMultiOptions((<Command.multiOpts>v).filter(n => n !== null))
          } else {
            return cmd.setFlags(<Command.flags>v)
          }
        } else if (typeof v === "function") {
          return cmd.setParser(v)
        } else {
          return cmd.setOptions(v)
        }
      })
      this.queueWorker({ cmd, fulfill, reject })
    })
  }

  /** forcefully closes the socket connection */
  forceQuit() {
    return this.socket.close()
  }

  /** gets called when the underlying transport layer connects to a server */
  private handleConnect() {
    this.connected = true
    this.emit("connect")
  }

  /** handles a single line response from the teamspeak server */
  private handleLine(line: string): void {
    line = line.trim()
    this.emit("debug", { type: "receive", data: line })
    if (this.ignoreLines > 0 && !line.startsWith("error")) {
      this.ignoreLines -= 1
      if (this.ignoreLines > 0) return
      this.emit("ready")
      this.queueWorker()
    } else if (line.startsWith("error")) {
      this.handleQueryError(line)
    } else if (line.startsWith("notify")) {
      this.handleQueryEvent(line)
    } else if (this.active && this.active.cmd) {
      this.active.cmd.setResponse(line)
    }
  }

  /** handles the error line which finnishes a command */
  private handleQueryError(line: string): void {
    if (!this.active) return
    this.active.cmd.setError(line)
    if (this.active.cmd.hasError()) {
      const error = this.active.cmd.getError()!
      if (error.id === 524) {
        this.emit("flooding", this.active.cmd.getError())
        const match = error.message.match(/(\d*) second/i)
        const waitTimeout = match ? parseInt(match[1], 10) : 1000
        clearTimeout(this.floodTimeout)
        this.floodTimeout = setTimeout((cmd => (() => {
          cmd.reset()
          this.send(cmd.build())
        }))(this.active.cmd), waitTimeout * 1000 + 100)
        return
      } else {
        this.active.reject(this.active.cmd.getError())
      }
    } else {
      this.active.fulfill(this.active.cmd.getResponse())
    }
    this.active = undefined
    this.queueWorker()
  }

  /**
   * Handles an event which has been received from the TeamSpeak Server
   * @param line event response line from the teamspeak server
   */
  private handleQueryEvent(line: string): void {
    if (this.doubleEvents.some(s => line.includes(s)) && line === this.lastEvent) return
    /**
     * Query Event
     * Gets fired when the Query receives an Event
     * @event TeamSpeakQuery#<TeamSpeakEvent>
     * @memberof  TeamSpeakQuery
     * @type {object}
     */
    this.emit(
      line.substr(6, line.indexOf(" ") - 6),
      Command.parse({ raw: line.substr(line.indexOf(" ") + 1) })[0]
    )
  }

  /**
   * Emits an Error which the given arguments
   * @param {...any} args arguments which gets passed to the error event
   */
  private handleError(error: Error) {
    /**
     * Query Event
     * Gets fired when the Socket had an Error
     * @event TeamSpeakQuery#error
     * @memberof TeamSpeakQuery
     */
    this.emit("error", error)
  }

  /** handles socket closing */
  private handleClose() {
    this.connected = false
    clearTimeout(this.floodTimeout)
    clearTimeout(this.keepAliveTimeout)
    const cmd = new Command().setError(this.socket.chunk || "")
    this.emit("close", cmd.getError())
  }

  /** handles the timer for the keepalive request */
  private keepAlive() {
    if (!this.config.keepAlive) return
    clearTimeout(this.keepAliveTimeout)
    this.keepAliveTimeout = setTimeout(() => this.sendKeepAlive(), 250 * 1000 - (Date.now() - this.lastcmd))
  }

  /** dispatches the keepalive */
  private sendKeepAlive() {
    this.emit("debug", { type: "keepalive" })
    this.lastcmd = Date.now()
    this.socket.sendKeepAlive()
    this.keepAlive()
  }

  /** executes the next command */
  private queueWorker(cmd?: TeamSpeakQuery.QueueItem) {
    if (cmd) this.queue.push(cmd)
    if (!this.connected || this.active) return
    this.active = this.queue.shift()
    if (!this.active) return
    this.send(this.active.cmd.build())
  }

  /** sends data to the socket */
  private send(data: string) {
    this.lastcmd = Date.now()
    this.emit("debug", { type: "send", data })
    this.socket.send(data)
    this.keepAlive()
  }

  isConnected() {
    return this.socket.isConnected()
  }
}

export namespace TeamSpeakQuery {
  
  export type executeArgs = Command.ParserCallback|Command.multiOpts|Command.options|Command.flags

  export interface QueueItem {
    fulfill: Function
    reject: Function
    cmd: Command
  }

  export interface QueryProtocolInterface extends EventEmitter {
    readonly chunk: string
    /** sends a keepalive to the TeamSpeak Server */
    sendKeepAlive: () => void
    /**
     * sends the data in the first argument, appends a newline
     * @param {string} str the data which should be sent
     */
    send: (data: string) => void
    /** forcefully closes the socket */
    close: () => void
    /** checks if the socket is connected or connecting */
    isConnected: () => boolean
  }
}