export class EventError extends Error {

  readonly eventName: string

  /**
   * @param message error message
   * @param eventName source event of this error
   */
  constructor(message: string, eventName: string) {
    super(`${message} in event "${eventName}"`)
    this.eventName = eventName
  }

  /* returns a string representation for the error */
  toString() {
    return this.message
  }

  /* returns a json representation for this error */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      eventName: this.eventName
    }
  }
}