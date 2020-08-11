import { EventEmitter } from "events"
import { Command } from "./Command"
import { ProtocolRAW } from "./protocols/raw"
import { ProtocolSSH } from "./protocols/ssh"

import { TeamSpeak } from "../TeamSpeak"

export class TeamSpeakQuery extends EventEmitter {

  static IGNORE_LINES_INITIAL = 2
  private config: TeamSpeak.ConnectionParams
  private queue: TeamSpeakQuery.QueueItem[] = []
  private active: TeamSpeakQuery.QueueItem|undefined
  private ignoreLines: number = TeamSpeakQuery.IGNORE_LINES_INITIAL
  private lastEvent: string = ""
  private lastcmd: number = Date.now()
  private connected: boolean = false
  private keepAliveTimeout: any
  private floodTimeout: NodeJS.Timeout
  private socket: TeamSpeakQuery.QueryProtocolInterface
  private pauseQueue: boolean = true
  readonly doubleEvents: string[] = [
    "notifyclientleftview",
    "notifyclientmoved",
    "notifycliententerview"
  ]

  constructor(config: TeamSpeak.ConnectionParams) {
    super()
    this.config = config
  }

  /**
   * start connecting to the teamspeak server
   */
  connect() {
    if (this.socket) {
      if (this.connected) {
        throw new Error("already connected")
      } else {
        /**
         * socket has already been connected and there was an active item
         * push it back into the queue for possible priorized elements
         */
        if (this.active) {
          this.queue.unshift(this.active)
          this.active = undefined
        }
        this.socket.removeAllListeners()
        this.ignoreLines = TeamSpeakQuery.IGNORE_LINES_INITIAL
      }
    }
    this.socket = TeamSpeakQuery.getSocket(this.config)
    this.socket.on("debug", data => this.emit("debug", data))
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("line", this.handleLine.bind(this))
    this.socket.on("error", this.handleError.bind(this))
  }

  /** returns a constructed Socket */
  static getSocket(config: TeamSpeak.ConnectionParams): TeamSpeakQuery.QueryProtocolInterface {
    if (config.protocol === TeamSpeak.QueryProtocol.RAW) {
      return new ProtocolRAW(config)
    } else if (config.protocol === TeamSpeak.QueryProtocol.SSH) {
      return new ProtocolSSH(config)
    } else {
      throw new Error("Invalid Protocol given! Expected (\"raw\" or \"ssh\")")
    }
  }

  /** sends a command to the TeamSpeak Server */
  execute(command: string, ...args: TeamSpeakQuery.executeArgs[]): Promise<TeamSpeakQuery.Response[]> {
    return this.handleCommand(command, args)
  }

  /** sends a priorized command to the TeamSpeak Server */
  executePrio(command: string, ...args: TeamSpeakQuery.executeArgs[]): Promise<TeamSpeakQuery.Response[]> {
    return this.handleCommand(command, args, true)
  }

  /**
   * @param command command to send
   * @param args arguments which gets parsed
   * @param prio wether this command should be handled as priority and be queued before others
   */
  private handleCommand(command: string, args: TeamSpeakQuery.executeArgs[], priority: boolean = false): Promise<TeamSpeakQuery.Response[]> {
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
      this.queueWorker({ cmd, fulfill, reject, priority })
    })
  }

  /** forcefully closes the socket connection */
  forceQuit() {
    this.pause(true)
    return this.socket.close()
  }

  pause(pause: boolean) {
    this.pauseQueue = pause
    if (!this.pauseQueue) this.queueWorker()
    return this
  }

  /** gets called when the underlying transport layer connects to a server */
  private handleConnect() {
    this.connected = true
    this.socket.on("close", this.handleClose.bind(this))
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
      if (error.id === "524") {
        return this.handleFloodingError(this.active)
      } else {
        this.active.reject(this.active.cmd.getError())
      }
    } else {
      this.active.fulfill(this.active.cmd.getResponse())
    }
    this.active = undefined
    this.queueWorker()
  }

  /** handles a flooding response from the teamspeak query */
  private handleFloodingError(active: TeamSpeakQuery.QueueItem) {
    this.emit("flooding", active.cmd.getError())
    const match = active.cmd.getError()!.message.match(/(\d*) second/i)
    const waitTimeout = match ? parseInt(match[1], 10) : 1
    clearTimeout(this.floodTimeout)
    this.floodTimeout = setTimeout((cmd => (() => {
      cmd.reset()
      this.send(cmd.build())
    }))(active.cmd), waitTimeout * 1000 + 100)
    return
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
    this.pause(true)
    clearTimeout(this.floodTimeout)
    clearTimeout(this.keepAliveTimeout)
    const cmd = new Command().setError(this.socket.chunk || "")
    this.emit("close", cmd.getError())
  }

  /** handles the timer for the keepalive request */
  private keepAlive() {
    if (!this.config.keepAlive) return
    clearTimeout(this.keepAliveTimeout)
    this.keepAliveTimeout = setTimeout(
      () => this.sendKeepAlive(),
      this.config.keepAliveTimeout * 1000 - (Date.now() - this.lastcmd)
    )
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
    if (!this.connected || this.active || this.pauseQueue) return
    this.active = this.getNextQueueItem()
    if (!this.active) return
    this.send(this.active.cmd.build())
  }

  /**
   * retrieves the next available queue item
   * respects priorized queue
   */
  private getNextQueueItem() {
    const item = this.queue.find(i => i.priority)
    if (item) {
      this.queue = this.queue.filter(i => i !== item)
      return item
    }
    return this.queue.shift()
  }

  /** sends data to the socket */
  private send(data: string) {
    this.lastcmd = Date.now()
    this.emit("debug", { type: "send", data })
    this.socket.send(data)
    this.keepAlive()
  }

  isConnected() {
    return this.connected
  }
}

export namespace TeamSpeakQuery {

  export type executeArgs =
    Command.ParserCallback |
    Command.multiOpts |
    Command.options |
    Command.flags

  export interface QueueItem {
    fulfill: (data: any) => void
    reject: (data: any) => void
    cmd: Command
    priority: boolean
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
  }
}

export namespace TeamSpeakQuery {

  export type ValueTypes =
    boolean    |
    string     |
    string[]   |
    number     |
    number[]   |
    undefined  |
    TeamSpeakQuery.Response

  export interface ResponseEntry {
    [x: string]: ValueTypes
  }
  export type Response = ResponseEntry[]
}