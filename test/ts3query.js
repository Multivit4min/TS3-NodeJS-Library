/*global describe it */
const mock = require("mock-require")
const assert = require("assert")
mock.stop("../src/transport/TS3Query.js")
const TS3Query = require("../src/transport/TS3Query")


describe("TS3Query", () => {

  it("should throw an error when the wrong protocol gets required", () => {
    assert.throws(() => {
      // eslint-disable-next-line no-new
      new TS3Query({
        protocol: "something false"
      })
    }, Error)
  })
})