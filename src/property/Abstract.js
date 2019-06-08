/**
 * @file Abstract.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

/**
 * @typedef {import("../TeamSpeak3")} TeamSpeak3
 * @ignore
 */

const EventEmitter = require("events")

/**
 * Abstract Class
 * @extends EventEmitter
 */
class Abstract extends EventEmitter {

  /**
   * Creates a new Abstract Class
   * @param {TeamSpeak3} parent the parent object which is a teamspeak instance
   * @param {object} props props from the list command
   * @param {string} namespace the namespace of the Abstract used
   */
  constructor(parent, props, namespace) {
    super()
    this._namespace = namespace
    this._propcache = { ...props }
    this._parent = parent
    this._listeners = {}
    this._onParent("close", () => this.destruct())
  }

  /**
   * retrieves the namespace of this class
   * @returns {string} the current namespace
   */
  getNameSpace() {
    return this._namespace
  }

  /**
   * returns JSONifyable data
   * @param {boolean} [includeNameSpace=true]
   */
  toJSON(includeNameSpace = true) {
    const res = { ...this._propcache }
    // eslint-disable-next-line no-underscore-dangle
    if (includeNameSpace) res._namespace = this.getNameSpace()
    return res
  }

  /**
   * retrieves a single property value by the given name
   * @param {string} name the name from where the value should be retrieved
   */
  getPropertyByName(name) {
    return this._propcache[name]
  }

  /**
   * Subscribes to parent events
   * @private
   * @param {string} event the eventname
   * @param {(...args) => void} cb the callback function
   */
  _onParent(event, cb) {
    if (!Array.isArray(this._listeners[event])) this._listeners[event] = []
    this._listeners[event].push(cb)
    return this.getParent().on(event, cb)
  }


  /**
   * Safely unsubscribes from all Events
   */
  destruct() {
    super.removeAllListeners()
    Object.keys(this._listeners).forEach(key => {
      this._listeners[key].forEach(f => this.getParent().removeListener(key, f))
    })
  }

  /* istanbul ignore next */
  /**
   * Returns the data from the last List Command
   * @deprecated
   * @return {object}
   */
  getCache() {
    console.log(`WARNING: Abstract#getCache() is deprecated please use the respective getters`)
    console.log(`WARNING: you can find a list of available getters on https://multivit4min.github.io/TS3-NodeJS-Library/#teamspeak${this._namespace}`)
    return this._propcache
  }

  /**
   * Sets the Data from the Last List Command
   * @param {object} info a object with new key values from the list command
   */
  updateCache(info) {
    const changes = this._objectCopy(this._propcache, info)
    if (Object.values(changes).length === 0) return
    Object.keys(changes)

    /**
     * Single Property Change event
     * @event Abstract#update:<property>
     * @memberof Abstract
     * @type {object}
     * @property {any} from the old value
     * @property {any} to the new value
     */
      .forEach(prop => this.emit(`update#${prop}`, changes[prop]))

    /**
     * Property Change event, will retrieve all changed properties in an array
     * @event Abstract#update
     * @memberof Abstract
     * @type {object[]}
     * @property {any} change[].from the old value
     * @property {any} change[].to the new value
     */
    this.emit("update", changes)
  }


  /**
   * Copies the the new values and keys from src to dst and returns the changes to dst
   * @private
   * @param {object} dst the object to copy the src object onto
   * @param {object} src the object with the new values
   * @return {object} returns the updated values from src to dst
   */
  _objectCopy(dst, src) {
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
   * @returns {TeamSpeak3} the teamspeak instance
   */
  getParent() {
    return this._parent
  }

}

module.exports = Abstract