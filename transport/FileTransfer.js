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
 * @class
 */
class FileTransfer {
    /**
     * Initializes a File Transfer
     * @constructor
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
     * @param {string} ftkey - The Filetransfer Key
     * @param {number} size - The Data Length
     * @version 1.0
     * @returns {Promise<Buffer>} Returns a buffer with the binary data
     */
    download(ftkey, size) {
        return new Promise(async (fulfill, reject) => {
            var socket = await this._init(ftkey).catch(reject)
            var timer = setTimeout(() => {
                socket.destroy()
                reject(new Error("Filetransfer Timeout Limit reached"))
            }, this.timeout)
            socket.on("error", reject)
            socket.on("data", data => {
                this.buffer.push(data)
                this.bytesreceived += data.byteLength
                if (this.bytesreceived == size) {
                    socket.destroy()
                    clearTimeout(timer)
                    fulfill(Buffer.concat(this.buffer))
                }
            })
        })
    }


    /**
     * Starts the upload of a File
     * @param {string} ftkey - the Filetransfer Key
     * @param {string} data - the data to send
     * @version 1.6
     * @returns {Promise}
     */
    upload(ftkey, data) {
        return new Promise(async (fulfill, reject) => {
            await this._init(ftkey).catch(reject)
            var timer = setTimeout(() => {
                this.socket.destroy()
                reject(new Error("Filetransfer Timeout Limit reached"))
            }, this.timeout)
            this.socket.on("error", reject)
            this.socket.on("close", () => {
                clearTimeout(timer)
                fulfill()
            })
            this.socket.write(data)
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
          var didFulfill = false
          this.socket = new net.Socket()
          this.socket.connect(this.port, this.host)
          this.socket.on("connect", () => {
            if (typeof ftkey === "string") this.socket.write(ftkey)
            didFulfill = true
            fulfill(this.socket)
          })
          this.socket.on("error", err => didFulfill ? reject(err) : null)
        })
    }



}


module.exports = FileTransfer
