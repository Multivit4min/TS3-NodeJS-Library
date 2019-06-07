/*global describe it*/
const Filetransfer = require("../src/transport/FileTransfer")
const { deepEqual } = require("assert")


describe("Filetransfer", () => {
  it("should verify that Filetransfer correctly times out", done => {
    const ft = new Filetransfer("127.0.0.1", 1, 0)
    ft.download("abc", 1000)
      .then(() => done(new Error("Expected function to  timeout")))
      .catch(e => {
        deepEqual(e.message, "Filetransfer Timeout Limit reached")
        done()
      })
  })
})