/*global describe it*/
const assert = require("assert")
const ResponseError = require("../src/exception/ResponseError")


describe("Exception", () => {

  describe("ResponseError", () => {
    it("should verify the message of ResponseError with msg, extra_msg and failed_permid", () => {
      const error = new ResponseError({
        msg: "missing permissions",
        extra_msg: "additional",
        failed_permid: 10
      })
      assert.equal(error.message, "missing permissions, additional, failed on permid 10")
    })

    it("should verify the message of ResponseError with msg and extra_msg", () => {
      const error = new ResponseError({
        msg: "missing permissions",
        extra_msg: "additional"
      })
      assert.equal(error.message, "missing permissions, additional")
    })

    it("should verify the message of ResponseError with msg and failed_permid", () => {
      const error = new ResponseError({
        msg: "missing permissions",
        failed_permid: 10
      })
      assert.equal(error.message, "missing permissions, failed on permid 10")
    })

    it("should test the return object from #toString()", () => {
      const data = {
        msg: "missing permissions",
        extra_msg: "some extra message",
        failed_permid: 10
      }
      const error = new ResponseError(data)
      assert.equal(error.toString(), "missing permissions, some extra message, failed on permid 10")
    })

    it("should test the return object from #toJSON()", () => {
      const data = {
        id: 1,
        msg: "missing permissions",
        extra_msg: "some extra message",
        failed_permid: 10
      }
      const error = new ResponseError(data)
      assert.deepEqual(error.toJSON(), {
        ...data,
        message: "missing permissions, some extra message, failed on permid 10"
      })
    })
  })
})