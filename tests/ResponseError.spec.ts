import { ResponseError } from "../src/exception/ResponseError"


describe("ResponseError", () => {

  it("should verify the message of ResponseError with msg, extra_msg and failed_permid", () => {
    const error = new ResponseError({
      id: 2568,
      msg: "missing permissions",
      extra_msg: "additional",
      failed_permid: 10
    })
    expect(error.message).toBe("missing permissions, additional, failed on permid 10")
  })

  it("should verify the message of ResponseError with msg and extra_msg", () => {
    const error = new ResponseError({
      id: 3329,
      msg: "connection failed, you are banned",
      extra_msg: "you may retry in 600 seconds"
    })
    expect(error.message).toBe("connection failed, you are banned, you may retry in 600 seconds")
  })

  it("should verify the message of ResponseError with msg and failed_permid", () => {
    const error = new ResponseError({
      id: 2568,
      msg: "missing permissions",
      failed_permid: 10
    })
    expect(error.message).toBe("missing permissions, failed on permid 10")
  })

  it("should test the return object from #toString()", () => {
    const error = new ResponseError({
      id: 2568,
      msg: "missing permissions",
      extra_msg: "some extra message",
      failed_permid: 10
    })
    expect(error.toString()).toBe("missing permissions, some extra message, failed on permid 10")
  })

  it("should test the return object from #toJSON()", () => {
    const data = {
      id: 1,
      msg: "missing permissions",
      extra_msg: "some extra message",
      failed_permid: 10
    }
    const error = new ResponseError(data)
    expect(error.toJSON()).toEqual({ message: "missing permissions, some extra message, failed on permid 10", ...data })
  })

})