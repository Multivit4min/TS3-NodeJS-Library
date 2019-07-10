import { EventEmitter } from "events"
import { Command } from "./Command"
import { ProtocolRAW } from "./protocols/raw"
import { ProtocolSSH } from "./protocols/ssh"

import { ConnectionParams } from "../TeamSpeak"
import { QueryResponseTypes } from "../types/QueryResponseType"

interface QueueItem {
  fulfill: Function
  reject: Function
  cmd: Command
}

export interface QueryProtocol {
  on: (event: string, callback: (...args: any[]) => void) => void
  sendKeepAlive: () => void
  send: (data: string) => void
  close: () => void
}

export class TeamSpeakQuery extends EventEmitter {
  private config: ConnectionParams
  private queue: Array<QueueItem> = []
  private active: QueueItem|undefined
  private ignoreLines: number
  private lastLine: string = ""
  private lastEvent: string = ""
  private lastcmd: number = Date.now()
  private connected: boolean = false
  private keepAliveTimeout: any
  private floodTimeout: ReturnType<typeof setTimeout>
  private socket: QueryProtocol
  readonly doubleEvents: Array<string>

  constructor(config: ConnectionParams) {
    super()
    this.config = config
    this.ignoreLines = 2
    this.doubleEvents = [
      "notifyclientleftview",
      "notifyclientmoved",
      "notifycliententerview"
    ]

    if (this.config.protocol === "raw") {
      this.socket = new ProtocolRAW(this.config)
    } else if (this.config.protocol === "ssh") {
      this.socket = new ProtocolSSH(this.config)
    } else {
      throw new Error("Invalid Protocol given! Expected (\"raw\" or \"ssh\")")
    }

    this.socket.on("debug", data => this.emit("debug", data))
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("line", this.handleLine.bind(this))
    this.socket.on("error", this.handleError.bind(this))
    this.socket.on("close", this.handleClose.bind(this))
  }


  /**
   * sends a command to the TeamSpeak Server
   * @returns {Promise<RawQueryResponse[]>} Promise object which returns the Information about the Query executed
   */
  execute(command: string, ...args: any[]): Promise<QueryResponseTypes[]> {
    return new Promise((fulfill, reject) => {
      const cmd = new Command().setCommand(command)
      Object.values(args).forEach(v => {
        if (typeof args !== "object") return
        if (Array.isArray(v)) {
          if (v.some(value => typeof value === "object" && value !== null)) {
            return cmd.setMultiOptions(v.filter(n => n !== null))
          } else {
            return cmd.setFlags(v)
          }
        }
        return cmd.setOptions(v)
      })
      this.queueWorker({ cmd, fulfill, reject })
    })
  }

  /**
   * forcefully closes the socket connection
   */
  forceQuit() {
    return this.socket.close()
  }


  private handleConnect() {
    this.connected = true
    this.emit("connect")
    this.queueWorker()
  }

  /**
   * handles a single line response from the teamspeak server
   */
  private handleLine(line: string): void {
    this.lastLine = line
    line = line.trim()
    this.emit("debug", { type: "receive", data: line })
    if (this.ignoreLines > 0 && line.indexOf("error") !== 0)
      return (this.ignoreLines -= 1, undefined)
    if (line.indexOf("error") === 0) {
      this.handleQueryError(line)
    } else if (line.indexOf("notify") === 0) {
      this.handleQueryEvent(line)
    } else if (this.active && this.active.cmd) {
      this.active.cmd.setResponse(line)
    } else {
      /** @todo */
    }
  }

  /**
   * handles the error line which finnishes a command
   */
  private handleQueryError(line: string): void {
    this.lastLine = ""
    if (!this.active) return
    this.active.cmd.setError(line)
    /** @todo if (this.active.cmd.hasError()) { */
    const error = this.active.cmd.getError()
    if (error !== null && error.id > 0) {
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
    this.lastEvent = line

    /**
     * Query Event
     * Gets fired when the Query receives an Event
     * @event TS3Query#<TeamSpeakEvent>
     * @memberof  TS3Query
     * @type {object}
     */
    this.emit(
      line.substr(6, line.indexOf(" ") - 6),
      Command.parse(line.substr(line.indexOf(" ") + 1))[0]
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
     * @event TS3Query#error
     * @memberof TS3Query
     */
    this.emit("error", error)
  }


  private handleClose(line?: string) {
    this.connected = false
    clearTimeout(this.floodTimeout)
    clearTimeout(this.keepAliveTimeout)
    const cmd = new Command().setError(line ? line : "")

    /**
     * Query Close Event
     * Gets fired when the Query disconnects from the TeamSpeak Server
     * @event TS3Query#close
     * @memberof  TS3Query
     * @type {object}
     * @property {Error|null} error - The Error Object
     */
    this.emit("close", cmd.hasError() ? cmd.getError() : null)
  }


  /**
   * Sends keepalive to the TeamSpeak Server so the connection will not be closed
   */
  private keepAlive() {
    if (!this.config.keepAlive) return
    clearTimeout(this.keepAliveTimeout)
    this.keepAliveTimeout = setTimeout(() => {
      this.emit("debug", { type: "keepalive" })
      this.lastcmd = Date.now()
      this.socket.sendKeepAlive()
      this.keepAlive()
    }, 250 * 1000 - (Date.now() - this.lastcmd))
  }

  /**
   * Executes the next command
   */
  private queueWorker(cmd?: QueueItem) {
    if (cmd) this.queue.push(cmd)
    if (!this.connected || this.active) return
    this.active = this.queue.shift()
    if (!this.active) return
    this.send(this.active.cmd.build())
  }

  /**
   * sends data to the socket
   */
  private send(data: string) {
    this.lastcmd = Date.now()
    this.emit("debug", { type: "send", data })
    this.socket.send(data)
    this.keepAlive()
  }
}