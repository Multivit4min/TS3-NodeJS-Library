/* eslint-disable brace-style */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

class EventEmitter {

  /**
   * @param {string|symbol} event
   * @param {function} listener
   * @returns {ThisType}
   */
  addListener(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {function} listener
   * @returns {ThisType}
   */
  on(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {Function} listener
   * @returns {ThisType}
   */
  once(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {Function} listener
   * @returns {ThisType}
   */
  prependListener(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {Function} listener
   * @returns {ThisType}
   */
  prependOnceListener(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {Function} listener
   * @returns {ThisType}
   */
  removeListener(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @param {Function} listener
   * @returns {ThisType}
   */
  off(event, listener) { return this }

  /**
   * @param {string|symbol} event
   * @returns {ThisType}
   */
  removeAllListeners(event) { return this }

  /**
   * @param {number} n
   * @returns {ThisType}
   */
  setMaxListeners(n) { return this }

  /**
   * @returns {number}
   */
  getMaxListeners() { return 0 }

  /**
   * @param {string|symbol} event
   * @returns {Function[]}
   */
  listeners(event) { return [() => null] }

  /**
   * @param {string|symbol} event
   * @returns {Function[]}
   */
  rawListeners(event) { return [() => null] }

  /**
   * @param {string|symbol} event
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(event, ...args) { return false }

  /**
   * @returns {string[]|symbol[]}
   */
  eventNames() { return [] }

  /**
   * @param {string|symbol} type
   * @returns {number}
   */
  listenerCount(type) { return 0 }

}

module.exports = EventEmitter