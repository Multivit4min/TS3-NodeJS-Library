import { EventError } from "../src/exception/EventError"


describe("EventError", () => {

  it("should validate properties of EventError", () => {
    const message = "error z in event"
    const event = "xyz"
    const result = `${message} in event "${event}"`
    const error = new EventError(message, event)
    expect(error.toString()).toBe(result)
    expect(error.toJSON()).toEqual({
      name: "Error",
      message: result,
      eventName: event
    })
  })

})