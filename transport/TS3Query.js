/**
 * @file TS3Query.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Command = require(__dirname+"/Command.js")
const Response = require(__dirname+"/Response.js")
const net = require("net")
const EventEmitter = require("events")


/**
 * TS3 Query Connection
 * @class
 */
class TS3Query extends EventEmitter {
    /**
     * Creates a new TS3Query
     * @constructor
     * @version 1.0
     * @param {string} ip - The Parent Object which is a TeamSpeak Instance
     * @param {number} port - This holds Basic Client data
     */
    constructor(ip, port) {
        super()
        this.connected = false
        this._ignoreLines = 2
        this._queue = []
        this._lastline = ""
        this._lastevent = ""
        this._cmdstarted = Date.now()
        this._handleDoubleEvents = true
        this._keepalive = false
        this._keepalivetimer
        this._active = false
        this._antiSpamStepping = 0
        this._data = ""
        this._doubleEvents = [
          "notifyclientleftview",
          "notifyclientmoved",
          "notifycliententerview"
        ]

        this._socket = net.connect(port, ip)
        this._socket.on("connect", () => {
          this.connected = true
          /**
           * Query Connect Event
           * Gets fired when the Query connects to the TeamSpeak Server
           *
           * @event TS3Query#connect
           * @memberof TS3Query
           */
          this.emit("connect")
          this._queueWorker()
        })
        this._socket.on("data", chunk => {
            this._data += chunk
            var lines = this._data.split("\n")
            this._data = lines.pop()
            lines.forEach(line => {
              this._lastline = line
              var line = line.trim()
              if (this._ignoreLines > 0
                  && line.indexOf("error") !== 0)
                  return this._ignoreLines--
              if (line.indexOf("error") === 0) {
                  let res = this._active.res
                  this._lastline = ""
                  res.finalize(line)
                  if (res.hasError())
                      this._active.reject(res.getError())
                  else
                      this._active.fulfill(res.getResponse())
                  this._active = false
                  return this._queueWorker()
              } else if (line.indexOf("notify") === 0) {
                  if (this._doubleEvents.some(s => line.indexOf(s) === 0)
                      && this._handleDoubleEvents
                      && line === this._lastevent) return
                  this._lastevent = line
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
                      Response.parse(line.substr(line.indexOf(" ") + 1)))
              } else if (this._active) {
                  this._active.res.setLine(line)
              }
            })
        })
        this._socket.on("error", err => this.emit("error", err))
        this._socket.on("close", () => {
            this.connected = false
            clearTimeout(this._keepalivetimer)
            clearTimeout(this._antispamTimeout)
            var str = (this._lastline.indexOf("error") === 0) ? Response.parse(this._lastline)[0] : ""
            /**
             * Query Close Event
             * Gets fired when the Query disconnects from the TeamSpeak Server
             *
             * @event TS3Query#close
             * @memberof  TS3Query
             * @type {object}
             * @property {any} error - The Error Object
             */
            this.emit("close", str)
        })
    }


    /**
     * Sends keepalive to the TeamSpeak Server so the connection will not be closed
     * @version 1.0
     * @param {boolean} [b=true] - Parameter enables or disables the Keepalive Ping
     */
    keepAlive(b = true) {
        this._keepalive = Boolean(b)
        if (!b) return clearTimeout(this._keepalivetimer)
        this._refreshKeepAlive()
    }


    /**
     * Whether Double Events should be handled or not
     * @version 1.0
     * @param {boolean} [b=true] - Parameter enables or disables the Double Event Handling
     */
    handleDoubleEvents(b = true) {
        this._handleDoubleEvents = Boolean(b)
    }

    /**
     * Sets the antispam timeout
     * @version 1.0
     * @param {number} i - The timeout every command should have (350ms should work good if the Query is not in the whitelist)
     */
    antiSpam(i = 0) {
        this._antiSpamStepping = i
    }


    /**
     * Refreshes the Keepalive Timer
     * @version 1.0
     * @private
     */
    _refreshKeepAlive() {
        clearTimeout(this._keepalivetimer)
        this._keepalivetimer = setTimeout(() => {
            this._cmdstarted = Date.now()
            this._socket.write("\n")
            this._refreshKeepAlive()
        }, 300 * 1000 - (Date.now() - this._cmdstarted))
    }


    /**
     * Sends a command to the TeamSpeak Server.
     * @version 1.0
     * @async
     * @param {string} Command - The Command which should get executed on the TeamSpeak Server
     * @param {object} [Object] - Optional the Parameters
     * @param {object} [Array] - Optional Flagwords
     * @returns {Promise.<object>} Promise object which returns the Information about the Query executed
     */
    execute() {
        var args = arguments
        return new Promise((fulfill, reject) => {
            var cmd = new Command()
            Object.keys(args).forEach(a => {
                switch (typeof(args[a])) {
                    case "string":
                        return cmd.setCommand(args[a])
                    case "object":
                        if (Array.isArray(args[a]))
                            return cmd.setFlags(args[a])
                        return cmd.setOptions(args[a])
                }
            })
            this._queueWorker({
                cmd: cmd,
                fulfill: fulfill,
                reject: reject
            })
        })
    }

    /**
     * Executes the next command
     * @version 1.0
     * @private
     * @param {object} [cmd] - the next command which should get executedd
     */
    _queueWorker(cmd = false) {
        if (cmd) this._queue.push(cmd)
        if (!this.connected
            || typeof this._active == "object"
            || this._queue.length == 0) return
        this._active = this._queue.shift()
        this._active.res = new Response()
        this._antispamTimeout = setTimeout(() => {
            this._cmdstarted = Date.now()
            this._socket.write(this._active.cmd.build()+"\n")
        }, this._antiSpamStepping - (Date.now() - this._cmdstarted))
        this._refreshKeepAlive()
    }

}

module.exports = TS3Query
