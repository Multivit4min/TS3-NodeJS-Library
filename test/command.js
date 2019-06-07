/*global describe it*/
const assert = require("assert")
const Command = require("../src/transport/Command.js")
const ResponseError = require("../src/exception/ResponseError.js")

describe("Command", () => {

  describe("#build()", () => {
    it("should build a valid command", () => {
      const cmd = new Command()
      cmd.setCommand("use")
      cmd.setOptions({
        client_nickname: "TeamSpeak Query",
        empty: "",
        invalid1: null,
        invalid2: NaN,
        invalid3: undefined
      })
      cmd.setFlags([1])
      assert.equal(cmd.build(), "use 1 client_nickname=TeamSpeak\\sQuery empty=")
    })
  })

  describe("#build()", () => {
    it("should build a valid command with multiple options", () => {
      const cmd = new Command()
      cmd.setCommand("channeladdperm")
      cmd.setOptions({ cid: 10 })
      cmd.setMultiOptions([{
        permsid: 10,
        permvalue: 75
      }, {
        permsid: 11,
        permvalue: 80
      }])
      assert.equal(cmd.build(), "channeladdperm cid=10 permsid=10 permvalue=75|permsid=11 permvalue=80")
    })
  })

  describe("#setResponse()", () => {
    it("should set and parse the response data", () => {
      const cmd = new Command()
      cmd.setResponse("virtualserver_status=online virtualserver_id=1 virtualserver_unique_identifier=Ygn7V8+jiDXLDO5+zrxK/WptJBw= virtualserver_port=9987 client_id=1 client_channel_id=1 client_nickname=Unknown\\sfrom\\s[::1]:0000 client_database_id=0 client_login_name client_unique_identifier client_origin_server_id=0")
      assert.deepEqual(cmd.getResponse(), [{
        virtualserver_status: "online",
        virtualserver_id: 1,
        virtualserver_unique_identifier: "Ygn7V8+jiDXLDO5+zrxK/WptJBw=",
        virtualserver_port: 9987,
        client_id: 1,
        client_channel_id: 1,
        client_nickname: "Unknown from [::1]:0000",
        client_database_id: 0,
        client_login_name: undefined,
        client_unique_identifier: undefined,
        client_origin_server_id: 0
      }])
    })
  })

  describe("#setError()", () => {
    it("should detect no errors", () => {
      const cmd = new Command()
      cmd.setError("error id=0 msg=ok")
      assert.ok(!cmd.hasError())
    })
  })

  describe("#getError()", () => {
    it("should create a new Instance of ResponseError", () => {
      const cmd = new Command()
      cmd.setError("error id=1024 msg=invalid\\sserverID")
      assert.ok(cmd.hasError())
      assert.ok(cmd.getError() instanceof ResponseError)
    })
  })

  describe("escape", () => {
    it("should escape backslash", () => {
      assert.equal(Command.escape("\\"), "\\\\")
    })
    it("should escape forwardslash", () => {
      assert.equal(Command.escape("/"), "\\/")
    })
    it("should escape pipe", () => {
      assert.equal(Command.escape("|"), "\\p")
    })
    it("should escape carriage return", () => {
      assert.equal(Command.escape("\r"), "\\r")
    })
    it("should escape horizontal tab", () => {
      assert.equal(Command.escape("\t"), "\\t")
    })
    it("should escape form feed", () => {
      assert.equal(Command.escape("\f"), "\\f")
    })
    it("should escape whitespace", () => {
      assert.equal(Command.escape(" "), "\\s")
    })
  })

  describe("unescape", () => {
    it("should unescape backslash", () => {
      assert.equal(Command.unescape("\\\\"), "\\")
    })
    it("should unescape forwardslash", () => {
      assert.equal(Command.unescape("\\/"), "/")
    })
    it("should unescape pipe", () => {
      assert.equal(Command.unescape("\\p"), "|")
    })
    it("should unescape carriage return", () => {
      assert.equal(Command.unescape("\\r"), "\r")
    })
    it("should unescape horizontal tab", () => {
      assert.equal(Command.unescape("\\t"), "\t")
    })
    it("should unescape form feed", () => {
      assert.equal(Command.unescape("\\f"), "\f")
    })
    it("should unescape whitespace", () => {
      assert.equal(Command.unescape("\\s"), " ")
    })
  })
})