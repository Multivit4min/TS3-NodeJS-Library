import { QueryErrorMessage } from "../types/ResponseTypes"

export class ResponseError extends Error implements QueryErrorMessage {

  readonly id: number
  readonly msg: string
  readonly extra_msg?: string
  readonly failed_permid?: number

  constructor(error: QueryErrorMessage) {
    super(error.msg)
    this.id = error.id
    this.msg = error.msg
    this.extra_msg = error.extra_msg
    this.failed_permid = error.failed_permid
    if (this.extra_msg) this.message += `, ${this.extra_msg}`
    if (this.failed_permid) this.message += `, failed on permid ${this.failed_permid}`
  }

  /**
   * returns a string representative of this error
   */
  toString() {
    return this.message
  }

  /**
   * returns a json encodeable object for this error
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