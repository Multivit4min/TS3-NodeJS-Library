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
    constructor(host, port = 30033, timeout = 5000) {
        this.host = host
        this.port = port
        this.timeout = timeout
        this.bytesreceived = 0
        this.buffer = []
    }


    /**
     * Starts the Download of a File
     * @param {string} ftkey - The Filetransfer Key
     * @param {number} size - The Data Length
     * @version 1.0
     * @returns {Promise<Buffer>} Retruns a buffer with the binary data
     */
    download(ftkey, size) {
        return new Promise((fulfill, reject) => {
            this._connect()
            var timer = setTimeout(() => {
                this.socket.destroy()
                reject("Filetransfer Timeout Limit reached")
            }, this.timeout)
            this.socket.on("error", reject)
            this.socket.on("connect", () => this.socket.write(ftkey))
            this.socket.on("data", data => {
                this.buffer.push(data)
                this.bytesreceived += data.byteLength
                if (this.bytesreceived == size) {
                    this.socket.destroy()
                    clearTimeout(timer)
                    fulfill(Buffer.concat(this.buffer))
                }
            })
        })
    }


    /**
     * Connects to the File Transfer Server
     * @private
     * @version 1.0
     * @returns {object} returns the socket
     */
    _connect() {
        this.socket = new net.Socket()
        this.socket.connect(this.port, this.host)
        return this.socket 
    }



}


module.exports = FileTransfer