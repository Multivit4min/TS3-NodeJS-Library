/**
 * @file Abstract.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const EventEmitter = require("events")

/**
 * Abstract Class
 * @class
 */
class Abstract extends EventEmitter {

  /**
   * Creates a new Abstract Class
   * @version 1.0
   * @param {object} parent - The Parent Object which is a TeamSpeak Instance
   * @param {object} c - The Properties
   */
  constructor(parent, c) {
    super()
    this._propcache = c
    this._parent = parent
    this._cache = {}
    this._listeners = {}
    this._onParent("close", () => this.destruct())
  }

  /**
   * Subscribes to parent events
   * @private
   * @param {string} event the eventname
   * @param {function} cb the callback function
   */
  _onParent(event, cb) {
    if (!Array.isArray(this._listeners[event])) this._listeners[event] = []
    this._listeners[event].push(cb)
    return this._parent.on(event, cb)
  }


  /**
   * Safely unsubscribes to all Events
   * @version 1.0
   */
  destruct() {
    super.removeAllListeners()
    Object.keys(this._listeners).forEach(key => {
      this._listeners[key].forEach(f => this._parent.removeListener(key, f))
    })
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
  execute(...args) {
    return this._parent.execute(...args)
  }


  /**
   * Filters an Object with given Option
   * @version 1.0
   * @async
   * @param {object} array - The Object which should get filtered
   * @param {object} filter - Filter Object
   * @returns {Promise.<object>} Promise object
   */
  filter(array, filter) {
    return this.getParent().constructor.filter(array, filter)
  }

  /**
   * Returns the data from the last List Command
   * @version 1.0
   * @return {Promise.<object>}
   */
  getCache() {
    return this._propcache
  }


  /**
   * Sets the Data from the Last List Command
   * @version 1.0
   */
  updateCache(info) {
    const changes = this.objectCopy(this._propcache, info)
    if (Object.values(changes).length === 0) return
    Object
      .keys(changes)

    /**
     * Single Property Change event
     *
     * @event Abstract#update#<property>
     * @memberof Abstract
     * @type {object}
     * @property {any} from - the old value
     * @property {any} to - the new value
     */
      .forEach(prop => this.emit(`update#${prop}`, changes[prop]))

    /**
     * Property Change event, will retrieve all changed properties in an array
     *
     * @event Abstract#update
     * @memberof Abstract
     * @type {object[]} change
     * @property {any} change[].from - the old value
     * @property {any} change[].to - the new value
     */
    this.emit("update", changes)
  }


  /**
   * Copies the the new values and keys from src to dst and returns the changes to dst
   *
   * @param {object} dst - the object to copy the src object onto
   * @param {object} src - the object with the new values
   * @return {object} returns the updated values from src to dst
   * @version 1.7
   */
  objectCopy(dst, src) {
    const changes = {}
    Object.keys(src).forEach(key => {
      if (JSON.stringify(dst[key]) === JSON.stringify(src[key])) return
      changes[key] = { from: dst[key], to: src[key] }
      dst[key] = src[key]
    })
    return changes
  }


  /**
   * Returns the Parent Class
   * @version 1.0
   * @returns {TeamSpeak3}
   */
  getParent() {
    return this._parent
  }

}

module.exports = Abstract