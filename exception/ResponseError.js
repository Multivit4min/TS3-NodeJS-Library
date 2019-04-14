/**
 * @file TeamSpeak3.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */


/**
 * TeamSpeak Query Response Exception Handler
 * @version 1.4
 * @param {object} error - The Error Object
 * @param {number} error.id - The error id
 * @param {string} error.msg - The error message
 * @param {string} [error.extra_msg] - Optional extra message
 * @param {number} [error.failed_permid] - Optional missing permission id
 */
class ResponseError extends Error {
  constructor(error) {
    super(error.msg)
    this.id = error.id
    this.msg = error.msg
    this.extra_msg = error.extra_msg
    this.failed_permid = error.failed_permid
    if (typeof this.extra_msg === "string")
      this.message += `, ${this.extra_msg}`
    if (typeof this.failed_permid === "number")
      this.message += `, failed on permid ${this.failed_permid}`
  }

  /**
   * Returns a string representative of this error
   * @returns {string} the error message
   */
  toString() {
    return this.message
  }

  /**
   * Returns a json encodeable object for this error
   * @returns {object} the error object
   */
  toJSON() {
    return {
      id: this.id,
      msg: this.msg,
      extra_msg: this.extra_msg,
      failed_permid: this.failed_permid,
      message: this.message
    }
  }
}

module.exports = ResponseError