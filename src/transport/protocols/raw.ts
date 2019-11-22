import { connect, Socket } from "net"
import { EventEmitter } from "events"
import { ConnectionParams } from "../../TeamSpeak"
import { TeamSpeakQuery } from "../TeamSpeakQuery"


export class ProtocolRAW extends EventEmitter implements TeamSpeakQuery.QueryProtocolInterface {

  private socket: Socket
  chunk: string = ""

  constructor(config: ConnectionParams) {
    super()
    this.socket = connect({
      port: config.queryport,
      host: config.host,
      localAddress: config.localAddress
    })
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

  send(str: string) {
    this.socket.write(`${str}\n`)
  }

  sendKeepAlive() {
    this.socket.write(" \n")
  }

  close() {
    return this.socket.destroy()
  }

  isConnected() {
    return (this.socket.writable && this.socket.readable) || this.socket.connecting 
  }

}