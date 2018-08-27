/**
 * @file ssh.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const { Client } = require("ssh2")
const EventEmitter = require("events")

/**
 * TeamSpeak SSH Connection
 * @class
 */
class SSH extends EventEmitter {
    /**
     * Creates a new TS3Query
     * @constructor
     * @version 1.0
     * @param {string} host - Teamspeak host to connect to
     * @param {number} port - TeamSpeak query port
     * @param {string} username - Username to connect with
     * @param {string} password - This holds Basic Client data
     */
  constructor(host, port, username, password) {
    super()
    this._ssh = new Client()
    this._ssh
      .on("ready", this._handleReady.bind(this))
      .on("banner", this._handleData.bind(this))
      .on("error", this._handleError.bind(this))
      .on("close", this._handleClose.bind(this))
      .connect({ host, port, username, password })
  }

  _handleReady() {
    this._ssh.shell(false, (err, stream) => {
      if (err) return this.emit("error", err)
      this._stream = stream
      this._stream.on("data", chunk => this._handleData(chunk))
      this.emit("connect")
    })
  }

  _handleClose() {
    this.emit("close", ...arguments)
  }

  _handleError(err) {
    this.emit("error", err)
  }

  _handleData(chunk) {
    this._data += chunk
    var lines = this._data.split("\n")
    this._data = lines.pop()
    lines.forEach(line => this.emit("line", line))
  }

  send(str) {
    this._stream.write(str+"\n")
  }

  sendKeepAlive() {
    this._stream.write("\n")
  }
}


module.exports = SSH
