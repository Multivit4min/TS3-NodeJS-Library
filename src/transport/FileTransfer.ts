import { Socket } from "net"

export class FileTransfer {

  private bytesreceived: number = 0
  private host: string
  private port: number
  private buffer: Buffer[]
  private timeout: number

  /**
   * Initializes a File Transfer
   * @param host TeamSpeak's File transfer Host
   * @param port TeamSpeak's File transfer Port
   * @param timeout Timeout for File Transfer
   */
  constructor(host: string, port: number = 30033, timeout: number = 8000) {
    this.host = host
    this.port = port
    this.timeout = timeout
    this.bytesreceived = 0
    this.buffer = []
  }


  /**
   * Starts the download of a File
   * @param ftkey the Filetransfer Key
   * @param size the Data Length
   */
  download(ftkey: string, size: number): Promise<Buffer> {
    return new Promise((fulfill, reject) => {
      this.init(ftkey)
        .then(({ socket, timeout }) => {
          socket.once("error", reject)
          socket.on("data", (data: Buffer) => {
            this.buffer.push(data)
            this.bytesreceived += data.byteLength
            if (this.bytesreceived === size) {
              socket.destroy()
              clearTimeout(timeout)
              fulfill(Buffer.concat(this.buffer))
            }
          })
        })
        .catch(reject)
    })
  }


  /**
   * starts the upload of a File
   * @param ftkey the Filetransfer Key
   * @param data the data to send
   */
  upload(ftkey: string, data: string|Buffer): Promise<void> {
    return new Promise((fulfill, reject) => {
      this.init(ftkey)
        .then(({ socket, timeout }) => {
          socket.once("error", reject)
          socket.on("close", () => {
            clearTimeout(timeout)
            socket.removeListener("error", reject)
            fulfill()
          })
          socket.write(data)
        })
        .catch(reject)
    })
  }


  /**
   * connects to the File Transfer Server
   * @param ftkey the Filetransfer Key
   * @returns returns a Promise Object with the socket
   */
  private init(ftkey?: string): Promise<{ socket: Socket, timeout: ReturnType<typeof setTimeout> }> {
    return new Promise((fulfill, reject) => {
      const socket = new Socket()
      const timeout = setTimeout(() => {
        socket.destroy()
        reject(new Error("Filetransfer Timeout Limit reached"))
      }, this.timeout)
      socket.connect(this.port, this.host)
      socket.on("connect", () => {
        if (typeof ftkey === "string") socket.write(ftkey)
        socket.removeListener("error", reject)
        fulfill({ socket, timeout })
      })
      socket.once("error", reject)
    })
  }

}