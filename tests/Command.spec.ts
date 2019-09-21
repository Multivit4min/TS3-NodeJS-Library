import { Command } from "../src/transport/Command"
import { ResponseError } from "../src/exception/ResponseError"

describe("Command", () => {

  describe("#reset()", () => {
    it("should clear all responses", () => {
      const cmd = new Command()
      cmd.setResponse("clid=0|clid=1")
      cmd.setError("error id=1 msg=test")
      cmd.reset()
      expect(cmd.getResponse()).toEqual([])
      expect(cmd.hasError()).toBe(false)
    })
  })

  describe("#build()", () => {
    it("should build a valid command", () => {
      const cmd = new Command()
      cmd.setCommand("use")
      cmd.setOptions({
        client_nickname: "TeamSpeak Query",
        client_away_message: "",
        client_base64HashClientUID: undefined
      })
      cmd.setFlags(["1"])
      expect(cmd.build()).toBe("use 1 client_nickname=TeamSpeak\\sQuery client_away_message=")
    })
  })

  describe("#build()", () => {
    it("should build a valid command with multiple options", () => {
      const cmd = new Command()
      cmd.setCommand("channeladdperm")
      cmd.setOptions({ cid: 10 })
      cmd.setMultiOptions([
        { permsid: 10, permvalue: 75 },
        { permsid: 11, permvalue: 80 }
      ])
      expect(cmd.build()).toBe("channeladdperm cid=10 permsid=10 permvalue=75|permsid=11 permvalue=80")
    })
  })

  describe("#getResponse()", () => {
    it("should validate an empty response", () => {
      const cmd = new Command()
      expect(cmd.getResponse()).toEqual([])
    })
  })

  describe("#parse()", () => {
    it("should validate an array response", () => {
      const cmd = new Command()
      cmd.setResponse("bar=baz ident=foo value=bar|ident=foo value=bar|ident value=baz")
      expect(cmd.getResponse()).toEqual([{
        bar: "baz",
        ident: "foo",
        value: "bar"
      }, {
        bar: "baz",
        ident: "foo",
        value: "bar"
      }, {
        bar: "baz",
        ident: undefined,
        value: "baz"
      }])
    })
  })

  describe("#setResponse()", () => {
    it("should set and parse the response data", () => {
      const cmd = new Command()
      cmd.setResponse("virtualserver_status=online virtualserver_id=1 virtualserver_unique_identifier=Ygn7V8+jiDXLDO5+zrxK/WptJBw= virtualserver_port=9987 client_id=1 client_channel_id=1 client_nickname=Unknown\\sfrom\\s[::1]:0000 client_database_id=0 client_login_name client_unique_identifier client_origin_server_id=0")
      expect(cmd.getResponse()).toEqual([{
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
      expect(cmd.hasError()).toBe(false)
    })
    it("should detect no errors", () => {
      const cmd = new Command()
      cmd.setError("error id=0 msg=ok")
      expect(cmd.hasError()).toBe(false)
    })
  })

  describe("#getError()", () => {
    it("should create a new Instance of ResponseError", () => {
      const cmd = new Command()
      cmd.setError("error id=1024 msg=invalid\\sserverID")
      expect(cmd.hasError()).toBe(true)
      expect(cmd.getError()).toBeInstanceOf(ResponseError)
    })
    it("should return null when no error is available", () => {
      const cmd = new Command()
      expect(cmd.getError()).toBe(null)
    })
  })

  describe("#escapeKeyValue()", () => {
    it("should escape multiple values", () => {
      expect(Command.escapeKeyValue("test", ["a", "b"])).toBe("test=a|test=b")
    })
  })

  describe("#parseValue()", () => {
    it("should parse an Array of numbers", () => {
      expect(Command.parseValue("client_servergroups", "1,2,3")).toEqual([1, 2, 3])
    })
  })

  describe("#hasOptions()", () => {
    it("should validate no options", () => {
      const cmd = new Command()
      expect(cmd.hasOptions()).toBe(false)
    })
    it("should validate multiple options", () => {
      const cmd = new Command()
      cmd.setMultiOptions([{ sid: [1,2] }])
      expect(cmd.hasOptions()).toBe(true)
    })
    it("should validate simple options", () => {
      const cmd = new Command()
      cmd.setOptions({ sid: 0 })
      expect(cmd.hasOptions()).toBe(true)
    })
  })

  describe("escape", () => {
    it("should escape backslash", () => {
      expect(Command.escape("\\")).toBe("\\\\")
    })
    it("should escape forwardslash", () => {
      expect(Command.escape("/")).toBe("\\/")
    })
    it("should escape pipe", () => {
      expect(Command.escape("|")).toBe("\\p")
    })
    it("should escape carriage return", () => {
      expect(Command.escape("\r")).toBe("\\r")
    })
    it("should escape horizontal tab", () => {
      expect(Command.escape("\t")).toBe("\\t")
    })
    it("should escape form feed", () => {
      expect(Command.escape("\f")).toBe("\\f")
    })
    it("should escape whitespace", () => {
      expect(Command.escape(" ")).toBe("\\s")
    })
  })

  describe("unescape", () => {
    it("should unescape backslash", () => {
      expect(Command.unescape("\\\\")).toBe("\\")
    })
    it("should unescape forwardslash", () => {
      expect(Command.unescape("\\/")).toBe("/")
    })
    it("should unescape pipe", () => {
      expect(Command.unescape("\\p")).toBe("|")
    })
    it("should unescape carriage return", () => {
      expect(Command.unescape("\\r")).toBe("\r")
    })
    it("should unescape horizontal tab", () => {
      expect(Command.unescape("\\t")).toBe("\t")
    })
    it("should unescape form feed", () => {
      expect(Command.unescape("\\f")).toBe("\f")
    })
    it("should unescape whitespace", () => {
      expect(Command.unescape("\\s")).toBe(" ")
    })
  })
})