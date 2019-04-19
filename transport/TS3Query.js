/**
 * @file TS3Query.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Command = require("./Command.js")
const RAW = require("./protocols/raw.js")
const SSH = require("./protocols/ssh.js")
const EventEmitter = require("events")


/**
 * TS3 Query Connection
 * @extends EventEmitter
 */
class TS3Query extends EventEmitter {

  /**
   * Creates a new TS3Query
   * @constructor
   * @version 1.0
   * @param {ConnectionParams} config Configuration Object
   */
  constructor(config) {
    super()
    this.protocol = config.protocol || "raw"
    this.queue = []
    this.ignoreLines = 2
    this.lastline = ""
    this.lastevent = ""
    this.lastcmd = Date.now()
    this.active = {}
    this.connected = false
    this.keepalivetimer = null
    this.preventDoubleEvents = true
    this.floodTimeout = null
    this.doubleEvents = [
      "notifyclientleftview",
      "notifyclientmoved",
      "notifycliententerview"
    ]
    if (this.protocol === "raw") {
      this.socket = new RAW(config)
    } else if (this.protocol === "ssh") {
      this.socket = new SSH(config)
    } else {
      throw new Error("Invalid Protocol given! Expected (\"raw\" or \"ssh\")")
    }

    this.socket.on("debug", data => this.emit("debug", data))
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("line", this.handleLine.bind(this))
    this.socket.on("error", this.handleError.bind(this))
    this.socket.on("close", this.handleClose.bind(this))
  }


  handleConnect() {
    this.connected = true

    /**
     * Query Connect Event
     * Gets fired when the Query connects to the TeamSpeak Server
     *
     * @event TS3Query#connect
     * @memberof TS3Query
     */
    this.emit("connect")
    this.queueWorker()
  }

  /**
   * Handles any TeamSpeak Query Response Line
   *
   * @version 1.8
   * @param {string} line - error line from teamspeak
   */
  handleLine(line) {
    this.lastline = line
    line = line.trim()
    this.emit("debug", { type: "receive", data: line })
    if (this.ignoreLines > 0 && line.indexOf("error") !== 0)
      return this.ignoreLines -= 1
    if (line.indexOf("error") === 0) {
      this.handleQueryError(line)
    } else if (line.indexOf("notify") === 0) {
      this.handleQueryEvent(line)
    } else if (this.active.cmd) {
      this.active.cmd.setResponse(line)
    }
  }

  /**
   * Handles the error line which finnishes a command
   *
   * @version 1.8
   * @param {string} line - error line from teamspeak
   */
  handleQueryError(line) {
    this.lastline = ""
    this.active.cmd.setError(line)
    if (this.active.cmd.hasError()) {
      if (this.active.cmd.getError().id === 524) {
        this.emit("flooding", this.active.cmd.getError())
        const match = this.active.cmd.getError().message.match(/(\d*) second/i)
        clearTimeout(this.floodTimeout)
        this.floodTimeout = setTimeout(() => {
          this.active.cmd.reset()
          this.send(this.active.cmd.build())
        }, (parseInt(match[1], 10) || 1) * 1000 + 100)
        return
      } else {
        this.active.reject(this.active.cmd.getError())
      }
    } else {
      this.active.fulfill(this.active.cmd.getResponse())
    }
    this.active = {}
    return this.queueWorker()
  }


  /**
   * Handles an event which has been received from the TeamSpeak Server
   *
   * @version 1.8
   * @param {string} line - event line from TeamSpeak
   */
  handleQueryEvent(line) {
    if (this.doubleEvents.some(s => line.indexOf(s) === 0) &&
        this.preventDoubleEvents &&
        line === this.lastevent) return
    this.lastevent = line

    /**
     * Query Event
     * Gets fired when the Query receives an Event
     *
     * @event TS3Query#<TeamSpeakEvent>
     * @memberof  TS3Query
     * @type {object}
     * @property {any} data - The data received from the Event
     */
    return this.emit(
      line.substr(6, line.indexOf(" ") - 6),
      Command.parse(line.substr(line.indexOf(" ") + 1))
    )
  }


  /**
   * Emits an Error which the given arguments
   *
   * @version 1.8
   * @param {...any} args arguments which gets passed to the error event
   */
  handleError(...args) {

    /**
     * Query Event
     * Gets fired when the Socket had an Error
     * @event TS3Query#error
     * @memberof  TS3Query
     */
    this.emit("error", ...args)
  }


  handleClose(line) {
    this.connected = false
    clearTimeout(this.floodTimeout)
    clearTimeout(this.keepalivetimer)
    const cmd = new Command().setError(line)

    /**
     * Query Close Event
     * Gets fired when the Query disconnects from the TeamSpeak Server
     * @event TS3Query#close
     * @memberof  TS3Query
     * @type {object}
     * @property {any|null} error - The Error Object
     */
    this.emit("close", cmd.hasError() ? cmd.getError() : null)
  }


  /**
   * Sends keepalive to the TeamSpeak Server so the connection will not be closed
   * @version 1.0
   */
  keepAlive() {
    clearTimeout(this.keepalivetimer)
    this.keepalivetimer = setTimeout(() => {
      this.emit("debug", { type: "keepalive" })
      this.lastcmd = Date.now()
      this.socket.sendKeepAlive()
      this.keepAlive()
    }, 250 * 1000 - (Date.now() - this.lastcmd))
  }


  /**
   * Whether Double Events should be handled or not
   * @version 1.0
   * @param {boolean} [b=true] - Parameter enables or disables the Double Event Handling
   */
  handleDoubleEvents(b = true) {
    this.preventDoubleEvents = Boolean(b)
  }


  /**
   * Sends a command to the TeamSpeak Server.
   * @version 1.0
   * @async
   * @param {...any} args parameters which should get executed
   * @returns {Promise.<object>} Promise object which returns the Information about the Query executed
   */
  execute(...args) {
    return new Promise((fulfill, reject) => {
      const cmd = new Command()
      Object.values(args).forEach(v => {
        switch (typeof v) {
          case "string":
            return cmd.setCommand(v)
          case "object":
            if (Array.isArray(v)) {
              if (v.some(value => typeof value === "object" && value !== null)) {
                return cmd.setMultiOptions(v.filter(n => n !== null))
              } else {
                return cmd.setFlags(v)
              }
            }
            return cmd.setOptions(v)
          default:
            return null
        }
      })
      this.queueWorker({ cmd, fulfill, reject })
    })
  }

  /**
   * Executes the next command
   * @version 1.0
   * @private
   * @param {object} [cmd] - the next command which should get executedd
   */
  queueWorker(cmd = false) {
    if (cmd) this.queue.push(cmd)
    if (!this.connected ||
        this.active.cmd instanceof Command ||
        this.queue.length === 0) return
    this.active = this.queue.shift()
    this.send(this.active.cmd.build())
  }

  /**
     * Sends data to the socket
     * @version 1.8
     * @private
     * @param {string} raw - the data which should get sent
     */
  send(raw) {
    this.lastcmd = Date.now()
    this.emit("debug", { type: "send", data: raw })
    this.socket.send(raw)
    this.keepAlive()
  }
}

module.exports = TS3Query