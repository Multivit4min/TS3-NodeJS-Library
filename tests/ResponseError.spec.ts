import { ResponseError } from "../src/exception/ResponseError"


describe("ResponseError", () => {

  let stack = (new Error()).stack!

  it("should verify the message of ResponseError with msg, extraMsg and failedPermid", () => {
    const error = new ResponseError({
      id: "2568",
      msg: "missing permissions",
      extraMsg: "additional",
      failedPermid: 10
    }, stack)
    expect(error.message).toBe("missing permissions, additional, failed on permid 10")
  })

  it("should verify the message of ResponseError with msg and extraMsg", () => {
    const error = new ResponseError({
      id: "3329",
      msg: "connection failed, you are banned",
      extraMsg: "you may retry in 600 seconds"
    }, stack)
    expect(error.message).toBe("connection failed, you are banned, you may retry in 600 seconds")
  })

  it("should verify the message of ResponseError with msg and failedPermid", () => {
    const error = new ResponseError({
      id: "2568",
      msg: "missing permissions",
      failedPermid: 10
    }, stack)
    expect(error.message).toBe("missing permissions, failed on permid 10")
  })

  it("should test the return object from #toString()", () => {
    const error = new ResponseError({
      id: "2568",
      msg: "missing permissions",
      extraMsg: "some extra message",
      failedPermid: 10
    }, stack)
    expect(error.toString()).toBe("missing permissions, some extra message, failed on permid 10")
  })

  it("should test the return object from #toJSON()", () => {
    const data = {
      id: "1",
      msg: "missing permissions",
      extraMsg: "some extra message",
      failedPermid: 10
    }
    const error = new ResponseError(data, stack)
    expect(error.toJSON()).toEqual({ message: "missing permissions, some extra message, failed on permid 10", ...data })
  })

})