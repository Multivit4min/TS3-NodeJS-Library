export class EventError extends Error {

  readonly eventName: string

  constructor(message: string, eventName: string) {
    super(`${message} in event "${eventName}"`)
    this.eventName = eventName
  }
}