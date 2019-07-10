import { connect, Socket } from "net"
import { EventEmitter } from "events"
import { ConnectionParams } from "../../TeamSpeak"
import { QueryProtocol } from "../TeamSpeakQuery"


export class ProtocolRAW extends EventEmitter implements QueryProtocol {

  private socket: Socket
  private chunk: string = ""

  constructor(config: ConnectionParams) {
    super()
    this.socket = connect(config.queryport, config.host)
    this.socket.setEncoding("utf8")
    this.socket.setTimeout(config.readyTimeout)
    this.socket.on("timeout", this.handleTimeout.bind(this))
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("data", this.handleData.bind(this))
    this.socket.on("error", this.handleError.bind(this))
    this.socket.on("close", this.handleClose.bind(this))
  }

  /**
   * Called after the socket was not able to connect within the given timeframe
   */
  private handleTimeout() {
    this.socket.destroy()
    this.emit("error", Error("Socket Timeout reached"))
  }

  /**
   * Called after the Socket has been established
   */
  private handleConnect() {
    this.socket.setTimeout(0)
    this.emit("connect")
  }

  /**
   * called when the Socket emits an error
   */
  private handleError(err: Error) {
    this.emit("error", err)
  }

  /**
   * called when the connection with the Socket gets closed
   */
  private handleClose() {
    this.emit("close", String(this.chunk))
  }

  /**
   * called when the Socket receives data
   * Splits the data with every newline
   */
  private handleData(chunk: string) {
    this.chunk += chunk
    const lines = this.chunk.split("\n")
    this.chunk = lines.pop() || ""
    lines.forEach(line => this.emit("line", line))
  }


  /**
   * sends the data in the first argument, appends a newline
   * @param {string} str the data which should be sent
   */
  send(str: string) {
    this.socket.write(`${str}\n`)
  }


  /**
   * sends a keepalive to the TeamSpeak Server
   */
  sendKeepAlive() {
    this.socket.write(" \n")
  }

  /**
   * Forcefully closes the socket
   */
  close() {
    return this.socket.destroy()
  }

}