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
 * @extends EventEmitter
 */
class Abstract extends EventEmitter {

  /**
   * Creates a new Abstract Class
   * @version 1.0
   * @param {TeamSpeak3} parent - The Parent Object which is a TeamSpeak Instance
   * @param {object} props - The Properties
   * @param {string} namespace - the namespace of the Abstract used
   */
  constructor(parent, props, namespace) {
    super()
    this._namespace = namespace
    this._propcache = { ...props }
    this._parent = parent
    this._listeners = {}
    this._registerProps()
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
   */
  toJSON() {
    return {
      _namespace: this.getNameSpace(),
      ...this._propcache
    }
  }

  /**
   * adds getters to all cached props
   * @private
   * @param {object} [props] optional properties which should get added
   */
  _registerProps(props = false) {
    Object.keys(props || this._propcache)
      .forEach(name => this._addGetter(name))
  }

  /**
   * adds a new getter on the own object
   * @private
   * @param {string} name the name of the property
   */
  _addGetter(name) {
    const translated = this.translatePropName(name)
    if (Object.prototype.hasOwnProperty.call(this, translated)) return
    Object.defineProperty(this, translated, {
      get: this.getPropertyByName.bind(this, name)
    })
  }

  /**
   * retrieves a single property value by the given name
   * @param {string} name the name from where the value should be retrieved
   */
  getPropertyByName(name) {
    return this._propcache[name]
  }

  /**
   * translates a TeamSpeak property key to a JavaScript conform name
   * @param {string} name the name which will get converted
   * @returns {string} returns the JavaScript conform name
   * @example
   *  //given that the abstract is extending a TeamSpeakClient
   *  client.translatePropName("client_nickname") //returns "nickname"
   *  client.translatePropName("client_is_talker") //returns "isTalker"
   *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
   */
  translatePropName(name) {
    const prefix = this.getNameSpace()
    if (name.startsWith(prefix))
      name = name.replace(new RegExp(`^${prefix}_?`), "")
    let up = false
    return name.split("").reduce((acc, str) => {
      if (str === "_") return (up = true, acc)
      return [...acc, up ? (up = false, str.toUpperCase()) : str]
    }, []).join("")
  }

  /**
   * Subscribes to parent events
   * @private
   * @param {string} event the eventname
   * @param {Function} cb the callback function
   */
  _onParent(event, cb) {
    if (!Array.isArray(this._listeners[event])) this._listeners[event] = []
    this._listeners[event].push(cb)
    return this.getParent().on(event, cb)
  }


  /**
   * Safely unsubscribes from all Events
   * @version 1.0
   */
  destruct() {
    super.removeAllListeners()
    Object.keys(this._listeners).forEach(key => {
      this._listeners[key].forEach(f => this.getParent().removeListener(key, f))
    })
  }

  /**
   * Returns the data from the last List Command
   * @version 1.0
   * @return {object}
   */
  getCache() {
    return this._propcache
  }

  /**
   * Sets the Data from the Last List Command
   * @param {object} info a object with new key values from the list command
   * @version 1.0
   */
  updateCache(info) {
    const changes = this._objectCopy(this._propcache, info)
    if (Object.values(changes).length === 0) return
    this._registerProps(Object.keys(changes).reduce((acc, curr) => ({ [curr]: null, ...acc}), {}))
    Object.keys(changes)

    /**
     * Single Property Change event
     *
     * @event Abstract#update:<property>
     * @memberof Abstract
     * @type {object}
     * @property {any} from - the old value
     * @property {any} to - the new value
     */
      .forEach(prop => this.emit(`update#${prop}`, changes[prop]))

    /**
     * Property Change event, will retrieve all changed properties in an array
     * @event Abstract#update
     * @memberof Abstract
     * @type {object[]}
     * @property {any} change[].from - the old value
     * @property {any} change[].to - the new value
     */
    this.emit("update", changes)
  }


  /**
   * Copies the the new values and keys from src to dst and returns the changes to dst
   * @private
   * @param {object} dst - the object to copy the src object onto
   * @param {object} src - the object with the new values
   * @return {object} returns the updated values from src to dst
   * @version 1.7
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
   * @version 1.0
   * @returns {TeamSpeak3} the teamspeak instance
   */
  getParent() {
    return this._parent
  }

}

module.exports = Abstract