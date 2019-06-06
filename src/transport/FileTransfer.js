/**
 * @file FileTransfer.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const net = require("net")

/**
 * Class representing a File Transfer
 */
class FileTransfer {

  /**
   * Initializes a File Transfer
   * @version 1.0
   * @param {string} host - TeamSpeak's File transfer Host
   * @param {number} [port=30033] - TeamSpeak's File transfer Port
   * @param {number} [timeout=5000] - Timeout for File Transfer
   */
  constructor(host, port = 30033, timeout = 8000) {
    this.host = host
    this.port = port
    this.timeout = timeout
    this.bytesreceived = 0
    this.buffer = []
  }


  /**
   * Starts the download of a File
   * @async
   * @version 1.0
   * @param {string} ftkey - The Filetransfer Key
   * @param {number} size - The Data Length
   * @returns {Promise<Buffer>} Returns a buffer with the binary data
   */
  download(ftkey, size) {
    return new Promise((fulfill, reject) => {
      this._init(ftkey)
        .then(({ socket, timeout }) => {
          socket.once("error", reject)
          socket.on("data", data => {
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
   * Starts the upload of a File
   * @version 1.6
   * @param {string} ftkey - the Filetransfer Key
   * @param {string|Buffer} data - the data to send
   * @returns {Promise}
   */
  upload(ftkey, data) {
    return new Promise((fulfill, reject) => {
      this._init(ftkey)
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
   * Connects to the File Transfer Server
   * @private
   * @version 1.0
   * @param {string} [ftkey] - The Filetransfer Key
   * @returns {Promise} returns a Promise Object with the socket
   */
  _init(ftkey) {
    return new Promise((fulfill, reject) => {
      const socket = new net.Socket()
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

module.exports = FileTransfer