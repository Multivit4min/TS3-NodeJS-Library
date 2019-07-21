import { Client, ClientChannel } from "ssh2"
import { EventEmitter } from "events"
import { ConnectionParams } from "../../TeamSpeak"
import { QueryProtocolInterface } from "../TeamSpeakQuery"


export class ProtocolSSH extends EventEmitter implements QueryProtocolInterface {

  private client: Client
  private stream: ClientChannel|null
  chunk: string = ""

  constructor(config: ConnectionParams) {
    super()
    this.client = new Client()
    process.nextTick(() => {
      try {
        this.client
          .on("ready", this.handleReady.bind(this))
          .on("banner", this.handleData.bind(this))
          .on("error", this.handleError.bind(this))
          .on("close", this.handleClose.bind(this))
          .connect({
            host: config.host,
            port: config.queryport,
            username: config.username,
            password: config.password,
            readyTimeout: config.readyTimeout
          })
      } catch (e) {
        this.handleError(e)
      }
    })
  }


  /**
   * Called after the Socket has been established
   */
  private handleReady() {
    this.client.shell(false, (err, stream) => {
      if (err) return this.emit("error", err)
      this.stream = stream
      this.stream.setEncoding("utf8")
      this.stream.on("data", (chunk: string) => this.handleData(chunk))
      this.emit("connect")
      return null
    })
  }

  /**
   * Called when the connection with the Socket gets closed
   */
  private handleClose() {
    this.emit("close", String(this.chunk))
  }


  /**
   * Called when the Socket emits an error
   */
  private handleError(error: Error) {
    this.emit("error", error)
  }


  /**
   * called when the Socket receives data
   */
  private handleData(chunk: string) {
    this.chunk += chunk
    const lines = this.chunk.split("\n")
    this.chunk = lines.pop()!
    lines.forEach(line => this.emit("line", line))
  }


  /**
   * sends the data in the first argument, appends a newline
   * @param str the data which should be sent
   */
  send(str: string) {
    if (!this.stream) throw new Error("Tried to write data to a closed socket")
    this.stream.write(`${str}\n`)
  }


  /** sends a keepalive to the TeamSpeak Server */
  sendKeepAlive() {
    if (!this.stream) throw new Error("Tried to write data to a closed socket")
    this.stream.write(" \n")
  }

  /** forcefully closes the socket */
  close() {
    return this.client.end()
  }

}