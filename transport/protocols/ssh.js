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
  constructor(config) {
    super()
    this._data = ""
    this._ssh = new Client()
    this._ssh
      .on("ready", this._handleReady.bind(this))
      .on("banner", this._handleData.bind(this))
      .on("error", this._handleError.bind(this))
      .on("close", this._handleClose.bind(this))
      .connect({
        host: config.host,
        port: config.queryport,
        username: config.username,
        password: config.password
      })
  }


  /**
   * Called after the Socket has been established
   *
   * @version 1.8
   */
  _handleReady() {
    this._ssh.shell(false, (err, stream) => {
      if (err) return this.emit("error", err)
      this._stream = stream
      this._stream.on("data", chunk => this._handleData(chunk))
      this.emit("connect")
    })
  }

 /**
  * Called when the connection with the Socket gets closed
  *
  * @version 1.8
  */
  _handleClose() {
    this.emit("close", ...arguments)
  }


  /**
   * Called when the Socket emits an error
   * Splits the data with every newline
   *
   * @version 1.8
   */
  _handleError() {
    this.emit("error", ...arguments)
  }


  /**
   * Called when the Socket receives data
   *
   * @version 1.8
   */
  _handleData(chunk) {
    this._data += chunk
    var lines = this._data.split("\n")
    this._data = lines.pop()
    lines.forEach(line => this.emit("line", line))
  }


  /**
   * sends the data in the first argument, appends a newline
   *
   * @version 1.8
   * @param {string} str - the data which should be sent
   */
  send(str) {
    this._stream.write(str+"\n")
  }


  /**
   * sends a keepalive to the TeamSpeak Server
   *
   * @version 1.8
   */
  sendKeepAlive() {
    this._stream.write(" \n")
  }
}


module.exports = SSH
