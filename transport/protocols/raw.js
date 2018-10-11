/**
 * @file raw.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const net = require("net")
const EventEmitter = require("events")

/**
 * TeamSpeak RAW Connection
 * @class
 */
class RAW extends EventEmitter {
  /**
   * Creates a new RAW Instance
   * @constructor
   * @version 1.5
   * @param {string} host - The Parent Object which is a TeamSpeak Instance
   * @param {number} port - This holds Basic Client data
   */
  constructor(config) {
    super()
    this._data = ""
    this._socket = net.connect(config.queryport, config.host)
    this._socket.setEncoding("utf8")
    this._socket.on("connect", this._handleConnect.bind(this))
    this._socket.on("data", this._handleData.bind(this))
    this._socket.on("error", this._handleError.bind(this))
    this._socket.on("close", this._handleClose.bind(this))
  }

  /**
   * Called after the Socket has been established
   *
   * @version 1.8
   */
  _handleConnect() {
    this.emit("connect")
  }

  /**
   * Called when the Socket emits an error
   *
   * @version 1.8
   */
  _handleError(err) {
    this.emit("error", err)
  }

 /**
  * Called when the connection with the Socket gets closed
  *
  * @version 1.8
  */
  _handleClose() {
    this.emit("close", String(this._data))
  }

  /**
   * Called when the Socket receives data
   * Splits the data with every newline
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
    this._socket.write(str+"\n")
  }


  /**
   * sends a keepalive to the TeamSpeak Server
   *
   * @version 1.8
   */
  sendKeepAlive() {
    this._socket.write(" \n")
  }

}


module.exports = RAW
