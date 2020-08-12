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

  describe("#buildSnapshotDeploy()", () => {
    it("should throw an error on invalid version", () => {
      expect(() => Command.buildSnapshotDeploy("_SNAPSHOTDATA_", new Command(), <any>{ version: "3.9.0" }))
        .toThrowError("unsupported teamspeak version (3.9.0) or snapshot version (0)")
    })
    it("should validate a parsed request with version 3.10.0", () => {
      const cmd = new Command()
      cmd.setCommand("serversnapshotdeploy")
      cmd.setFlags(["-keepfiles", "-mapping"])
      cmd.setOptions({ password: "_PASSWORD_", salt: "_SALT_" })
      const str = Command.buildSnapshotDeploy("_SNAPSHOTDATA_", cmd, <any>{ version: "3.10.0" })
      expect(str).toBe("serversnapshotdeploy -keepfiles -mapping password=_PASSWORD_ salt=_SALT_ version=2|_SNAPSHOTDATA_")
    })
    it("should validate a parsed request with version 3.12.0", () => {
      const cmd = new Command()
      cmd.setCommand("serversnapshotdeploy")
      cmd.setFlags(["-keepfiles", "-mapping"])
      cmd.setOptions({ password: "_PASSWORD_", salt: "_SALT_" })
      const str = Command.buildSnapshotDeploy("_SNAPSHOTDATA_", cmd, <any>{ version: "3.12.0" })
      expect(str).toBe("serversnapshotdeploy -keepfiles -mapping password=_PASSWORD_ salt=_SALT_ version=3 data=_SNAPSHOTDATA_")
    })
  })

  describe("#buildSnapshot()", () => {
    it("should throw an error on invalid version", () => {
      expect(() => Command.parseSnapshotCreate({ raw: "version=1 salt=_SALT_|_SNAPSHOTDATA_" }))
        .toThrowError("unsupported snapshot version: 1")
    })
    it("should validate an parsed response with version 2", () => {
      const response = Command.parseSnapshotCreate({ raw: "version=2 salt=_SALT_|_SNAPSHOTDATA_" })
      expect(response).toEqual([{
        version: "2",
        salt: "_SALT_",
        snapshot: "_SNAPSHOTDATA_"
      }])
    })
    it("should validate an parsed response with version 3", () => {
      const response = Command.parseSnapshotCreate({ raw: "version=3 salt=_SALT_ data=_SNAPSHOTDATA_" })
      expect(response).toEqual([{
        version: "3",
        salt: "_SALT_",
        snapshot: "_SNAPSHOTDATA_"
      }])
    })
  })

  describe("#minVersion()", () => {
    it("should compare 2 semantic versions", () => {
      expect(Command.minVersion("3.9.0", "3.10.0")).toBe(true)
      expect(Command.minVersion("3.10.0", "3.9.0")).toBe(false)
      expect(Command.minVersion("3.10.0", "3.010.0")).toBe(true)
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
    it("should be able to parse recursive", () => {
      const cmd = new Command()
      cmd.setResponse("tokencustomset=ident=foo1\\svalue=bar\\pident=foo2\\svalue=baz")
      expect(cmd.getResponse()).toEqual([{
        tokencustomset: [{ ident: "foo1", value: "bar" }, { ident: "foo2", value: "baz" }]
      }])
    })
  })

  describe("#setParser", () => {
    it("should validate that the response parser is getting set correctly", () => {
      const cmd = new Command()
      const cb = () => ([{}])
      cmd.setParser(parsers => {
        parsers.response = cb
        return parsers
      })
      expect(cmd["responseParser"]).toBe(cb)
    })
    it("should validate that the request parser is getting set correctly", () => {
      const cmd = new Command()
      const cb = () => "foo"
      cmd.setParser(parsers => {
        parsers.request = cb
        return parsers
      })
      expect(cmd["requestParser"]).toBe(cb)
    })
  })

  describe("#setResponse()", () => {
    it("should set and parse the response data", () => {
      const cmd = new Command()
      cmd.setResponse("virtualserver_status=online virtualserver_id=1 virtualserver_unique_identifier=Ygn7V8+jiDXLDO5+zrxK/WptJBw= virtualserver_port=9987 client_id=1 client_channel_id=1 client_nickname=Unknown\\sfrom\\s[::1]:0000 client_database_id=0 client_login_name client_unique_identifier client_origin_server_id=0")
      expect(cmd.getResponse()).toEqual([{
        virtualserverStatus: "online",
        virtualserverId: "1",
        virtualserverUniqueIdentifier: "Ygn7V8+jiDXLDO5+zrxK/WptJBw=",
        virtualserverPort: 9987,
        clientId: "1",
        clientChannelId: "1",
        clientNickname: "Unknown from [::1]:0000",
        clientDatabaseId: "0",
        clientLoginName: undefined,
        clientUniqueIdentifier: undefined,
        clientOriginServerId: "0"
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
    it("should parse an Array of strings", () => {
      expect(Command.parseValue("clientServergroups", "a,b,c")).toEqual(["a", "b", "c"])
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