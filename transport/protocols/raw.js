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
  constructor(host, port) {
    super()
    this._data = ""
    this._socket = net.connect(port, host)
    this._socket.on("connect", this._handleConnect.bind(this))
    this._socket.on("data", this._handleData.bind(this))
    this._socket.on("error", this._handleError.bind(this))
    this._socket.on("close", this._handleClose.bind(this))
  }

  _handleConnect() {
    this.emit("connect")
  }

  _handleError(err) {
    this.emit("error", err)
  }

  _handleClose() {
    this.emit("close", str)
  }

  _handleData(chunk) {
    this._data += chunk
    var lines = this._data.split("\n")
    this._data = lines.pop()
    lines.forEach(line => this.emit("line", line))
  }

  send(str) {
    this._socket.write(str+"\n")
  }

  sendKeepAlive() {
    this._socket.write("\n")
  }

}


module.exports = RAW
