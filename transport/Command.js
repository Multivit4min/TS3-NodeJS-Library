/**
 * @file Command.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const escape = require(__dirname+"/../helper/escape.js")
const unescape = require(__dirname+"/../helper/unescape.js")
const keytypes = require(__dirname+"/../helper/keytypes.js")
const ResponseError = require(__dirname+"/../exception/ResponseError.js")


/**
 * TeamSpeak Query Command Class
 * @class
 */
class Command {
    /**
     * Creates the Command Class
     * @constructor
     * @version 1.0
     * @toc TRANSPORT.Command
     */
    constructor() {
      this.cmd = ""
      this.opts = {}
      this.flags = []
      this.reset()
    }


    /**
     * Initializes the Respone with default values
     * @version 1.8
     * @returns {this}
     */
    reset() {
      this.response = ""
      this.error = null
      return this
    }


    /**
     * Sets the main command to send
     * @version 1.0
     * @param {string} cmd - Sets the command which will be sent to the TeamSpeak Query
     * @returns {this}
     */
    setCommand(cmd) {
      this.cmd = cmd.trim()
      return this
    }


    /**
     *Sets the TeamSpeak Key Value Pairs
     * @version 1.0
     * @param {object} opts - Sets the Object with the key value pairs which should get sent to the TeamSpeak Query
     * @returns {this}
     */
    setOptions(opts) {
      this.opts = opts
      return this
    }


    /**
     * Checks wether there are options used with this command
     * @version 1.7
     * @returns {boolean}
     */
    hasOptions() {
      return Object.values(this.opts).length > 0
    }


    /**
     * Set TeamSpeak Flags
     * @version 1.0
     * @param {object} flags - Sets the Flags which should get sent to the TeamSpeak Query
     * @returns {this}
     */
    setFlags(flags) {
      this.flags = flags
      return this
    }


    /**
     * Checks wether there are flags used with this command
     * @version 1.7
     * @returns {boolean}
     */
    hasFlags() {
      return this.flags.length > 0
    }


    /**
     * Set the Line which has been received from the TeamSpeak Query
     * @version 1.0
     * @param {string} line - The Line which has been received from the TeamSpeak Query
     * @returns {this}
     */
    setResponse(line) {
        this.response = Command.parse(line)
        return this
    }


    /**
     * Set the error line which has been received from the TeamSpeak Query
     * @version 1.0
     * @param {string} error - The error Line which has been received from the TeamSpeak Query
     * @returns {this}
     */
    setError(error) {
      this.error = Command.parse(error)
      return this
    }


    /**
     * Get the Parsed Error Object which has been received from the TeamSpeak Query
     * @version 1.0
     * @return {object} Returns the Parsed Error Object
     */
    getError() {
      return new ResponseError(this.error)
    }


    /**
     * Checks if a error has been received
     * @version 1.0
     * @return {boolean} Returns true when a error has been received
     */
    hasError() {
      return this.error !== null && this.error.id > 0
    }


    /**
     * Get the Parsed Response Object which has been received from the TeamSpeak Query
     * @version 1.0
     * @return {object} Returns the Parsed Response Object
     */
    getResponse() {
      return this.response || null
    }


    /**
     * Parses a Query Response
     * @version 1.0
     * @static
     * @param {string} data - The Line which has been received
     * @return {object} Returns the parsed Data
     */
    static parse(data = "") {
      var res = data.split("|").map(entry => {
        var res = {}
        entry.split(" ").map(str => {
          if (str.indexOf("=") >= 0) {
            var k = unescape(str.substr(0, str.indexOf("=")))
            res[k] = Command.parseValue(k, unescape(str.substr(str.indexOf("=") + 1)))
          } else {
            res[str] = undefined
          }
        })
        return res
      })
      return (res.length === 1) ? res[0] : res
    }


    /**
     * Checks if a error has been received
     * @version 1.0
     * @return {string} The parsed String which is readable by the TeamSpeak Query
     */
    build() {
      var cmd = escape(this.cmd)
      if (this.hasOptions()) cmd += " " + this.buildOptions()
      if (this.hasFlags()) cmd += " " + this.buildFlags()
      return cmd
    }


    /**
     * Builds the query string for options
     * @version 1.7
     * @private
     * @return {string} The parsed String which is readable by the TeamSpeak Query
     */
    buildOptions() {
      return Object
        .keys(this.opts)
        .filter(key => [undefined, null, NaN].indexOf(this.opts[key]) === -1)
        .map(key => this.escapeKeyValue(key, this.opts[key]))
        .join(" ")
    }


    /**
     * Escapes a key and a value
     * @version 1.7
     * @private
     * @param {string} key - the key used
     * @param {string|string[]} value - the value or an array of values
     * @return {string} The parsed String which is readable by the TeamSpeak Query
     */
    escapeKeyValue(key, value) {
      if (Array.isArray(value)) {
        return value.map(v => escape(key) + "=" + escape(v)).join("|")
      } else {
        return escape(key) + "=" + escape(value)
      }
    }


    /**
     * Builds the query string for flags
     * @version 1.7
     * @private
     * @return {string} The parsed String which is readable by the TeamSpeak Query
     */
    buildFlags() {
      return this.flags.map(f => escape(f)).join(" ")
    }


    /**
     * Parses a value to the type which the key represents
     * @version 1.0
     * @static
     * @param {string} k - The Key which should get looked up
     * @param {any} v - The value which should get parsed
     * @return {any} Returns the parsed Data
     */
    static parseValue(k, v) {
      switch(keytypes[k]) {
        case "ArrayOfInt": return v.split(",").map(i => parseFloat(i))
        case "ArrayOfString": return v.split(",").map(i => String(i))
        case Boolean: return Boolean(v)
        case Number: return parseFloat(v)
        case String: return String(v)
        default:
          return String(v)
      }
    }
}

module.exports = Command
