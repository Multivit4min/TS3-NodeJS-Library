const mockExecute = jest.fn()
const mockExecutePrio = jest.fn()
const mockTransfer = jest.fn()
const mockClose = jest.fn()
const mockIsConnected = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")
  // tslint:disable-next-line: only-arrow-functions
  TeamSpeakQuery.getSocket = function() {
    // tslint:disable-next-line: no-empty
    return { on() {}, send() {}, sendKeepAlive() {}, close() { mockClose() }, isConnected() {} }
  }
  TeamSpeakQuery.prototype.execute = mockExecute
  TeamSpeakQuery.prototype.executePrio = mockExecutePrio
  TeamSpeakQuery.prototype.isConnected = mockIsConnected
  return { TeamSpeakQuery }
})

jest.mock("../src/transport/FileTransfer", () => {

  class FileTransfer {
    download() {
      return mockTransfer(...arguments)
    }
    upload() {
      return mockTransfer(...arguments)
    }
  }

  return { FileTransfer }
})

import {
  TeamSpeak,
  TextMessageTargetMode,
  LogLevel,
  ReasonIdentifier,
  TeamSpeakChannel,
  TeamSpeakServer,
  TeamSpeakClient,
  TeamSpeakServerGroup,
  TeamSpeakChannelGroup
} from "../src"

import * as mocks from "./mocks/queryresponse"
import { ApiKeyScope, TokenType, ClientType } from "../src/types/enum"
import { SelectType } from "../src/types/context"
import { BanClient } from "../src/types/PropertyTypes"

describe("TeamSpeak", () => {
  let teamspeak: TeamSpeak = new TeamSpeak({})

  beforeEach(() => {
    teamspeak = new TeamSpeak({})
    mockTransfer.mockReset()
    mockClose.mockReset()
    mockExecute.mockReset()
    mockExecute.mockResolvedValue([])
    mockExecutePrio.mockReset()
    mockExecutePrio.mockResolvedValue([])
  })

  describe("#new()", () => {
    it("should test the construction of TeamSpeak with an empty object", () => {
      const teamspeak = new TeamSpeak({})
      expect(teamspeak.config)
        .toEqual({
          protocol: TeamSpeak.QueryProtocol.RAW,
          host: "127.0.0.1",
          ignoreQueries: false,
          queryport: 10011,
          readyTimeout: 10000,
          keepAlive: true,
          keepAliveTimeout: 250,
          autoConnect: true
        })
    })
    it("should test the construction of TeamSpeak with an username and password", () => {
      const teamspeak = new TeamSpeak({ username: "foo", password: "bar" })
      expect(teamspeak.config)
        .toEqual({
          protocol: TeamSpeak.QueryProtocol.RAW,
          host: "127.0.0.1",
          ignoreQueries: false,
          queryport: 10011,
          readyTimeout: 10000,
          keepAlive: true,
          keepAliveTimeout: 250,
          username: "foo",
          password: "bar",
          autoConnect: true
        })
    })
    it("should test the construction of TeamSpeak with protocol SSH", () => {
      const teamspeak = new TeamSpeak({ protocol: TeamSpeak.QueryProtocol.SSH })
      expect(teamspeak.config)
        .toEqual({
          protocol: TeamSpeak.QueryProtocol.SSH,
          host: "127.0.0.1",
          ignoreQueries: false,
          queryport: 10022,
          readyTimeout: 10000,
          keepAlive: true,
          keepAliveTimeout: 250,
          autoConnect: true
        })
    })
    it("should test the construction of TeamSpeak with a serverport", () => {
      const teamspeak = new TeamSpeak({ serverport: 5000 })
      expect(teamspeak.config)
        .toEqual({
          protocol: TeamSpeak.QueryProtocol.RAW,
          host: "127.0.0.1",
          ignoreQueries: false,
          queryport: 10011,
          readyTimeout: 10000,
          keepAlive: true,
          keepAliveTimeout: 250,
          serverport: 5000,
          autoConnect: true
        })
    })
  })


  describe("#handleConnect()", () => {
    it("check an empty connection config", async () => {
      const teamspeak = new TeamSpeak({})
      teamspeak["query"].emit("connect")
      expect(mockExecute).toHaveBeenCalledTimes(0)
    })
    it("check a connection config with username and password", async () => {
      expect.assertions(3)
      const teamspeak = new TeamSpeak({ username: "foo", password: "bar" })
      teamspeak["query"].emit("ready")
      expect(mockExecutePrio).toHaveBeenNthCalledWith(1, "login", ["foo", "bar"])
      expect(mockExecutePrio).toHaveBeenNthCalledWith(2, "version")
      expect(mockExecutePrio).toHaveBeenCalledTimes(2)
    })
    it("check a connection config with a serverport", async () => {
      expect.assertions(3)
      const teamspeak = new TeamSpeak({ serverport: 9987 })
      teamspeak["query"].emit("ready")
      expect(mockExecutePrio).toHaveBeenNthCalledWith(1, "use", { port: 9987 }, ["-virtual"])
      expect(mockExecutePrio).toHaveBeenNthCalledWith(2, "version")
      expect(mockExecutePrio).toHaveBeenCalledTimes(2)
    })
    it("check a connection config with a serverport and nickname", async () => {
      expect.assertions(3)
      const teamspeak = new TeamSpeak({ serverport: 9987, nickname: "FooBar" })
      teamspeak["query"].emit("ready")
      expect(mockExecutePrio).toHaveBeenNthCalledWith(1, "use", { port: 9987, clientNickname: "FooBar" }, ["-virtual"])
      expect(mockExecutePrio).toHaveBeenNthCalledWith(2, "version")
      expect(mockExecutePrio).toHaveBeenCalledTimes(2)
    })
  })

  it("should validate correct subscriptions to events", () => {
    teamspeak.on("textmessage", () => null)
    expect(mockExecute).toHaveBeenCalledTimes(3)
    expect(mockExecute).toHaveBeenNthCalledWith(1, "servernotifyregister", { event: "textserver", id: undefined })
    expect(mockExecute).toHaveBeenNthCalledWith(2, "servernotifyregister", { event: "textchannel", id: undefined })
    expect(mockExecute).toHaveBeenNthCalledWith(3, "servernotifyregister", { event: "textprivate", id: undefined })
  })

  it("should validate that no events get registered", done => {
    expect.assertions(1)
    teamspeak["context"].events.push({ event: "textserver" })
    teamspeak["context"].events.push({ event: "textchannel" })
    teamspeak["context"].events.push({ event: "textprivate" })
    teamspeak["context"].events.push({ event: "server" })
    teamspeak["context"].events.push({ event: "channel", id: "0" })
    teamspeak["context"].events.push({ event: "tokenused" })
    teamspeak.on("clientconnect", () => null)
    teamspeak.on("clientdisconnect", () => null)
    teamspeak.on("serveredit", () => null)
    teamspeak.on("tokenused", () => null)
    teamspeak.on("channeledit", () => null)
    teamspeak.on("channelmoved", () => null)
    teamspeak.on("channelcreate", () => null)
    teamspeak.on("channeldelete", () => null)
    teamspeak.on("textmessage", () => null)
    process.nextTick(() => {
      expect(mockExecute).toHaveBeenCalledTimes(0)
      done()
    })
  })

  it("should test a #reconnect with selected SID", async () => {
    expect.assertions(2)
    mockExecutePrio.mockResolvedValue(null)
    mockIsConnected.mockReturnValue(true)
    teamspeak["context"].selectType = SelectType.SID
    teamspeak["context"].selected = 123
    await teamspeak["handleReady"]()
    expect(mockExecutePrio).toHaveBeenNthCalledWith(1, "use", [123, "-virtual"], { clientNickname: undefined })
    expect(mockExecutePrio).toBeCalledTimes(2)
  }, 1000)

  it("should test #reconnect()", async () => {
    expect.assertions(1)
    mockIsConnected.mockReturnValue(true)
    await expect(teamspeak.reconnect(1, 50))
      .rejects.toEqual(new Error("already connected"))
  })

  it("should test a failed #reconnect()", async () => {
    expect.assertions(1)
    mockIsConnected.mockReturnValue(false)
    await expect(teamspeak.reconnect(0, 50))
      .rejects.toEqual(new Error("reconnecting failed after 0 attempt(s)"))
  })

  it("should verify parameters of #version()", async () => {
    await teamspeak.version()
    expect(mockExecute).toHaveBeenCalledWith("version")
    expect(mockExecute).toHaveBeenCalledTimes(1)
  })

  it("should verify parameters of #clientSetServerQueryLogin()", async () => {
    await teamspeak.clientSetServerQueryLogin("foo")
    expect(mockExecute).toHaveBeenCalledWith("clientsetserverquerylogin", { clientLoginName: "foo"})
    expect(mockExecute).toHaveBeenCalledTimes(1)
  })

  it("should verify parameters of #clientUpdate()", async () => {
    await teamspeak.clientUpdate({ clientNickname: "Test" })
    expect(mockExecute).toHaveBeenCalledWith("clientupdate", { clientNickname: "Test"})
    expect(mockExecute).toHaveBeenCalledTimes(1)
  })

  describe("#registerEvent()", () => {
    it("should verify 2 parameters", async () => {
      await teamspeak.registerEvent("channel", "0")
      expect(mockExecute).toHaveBeenCalledWith("servernotifyregister", { event: "channel", id: "0" })
      expect(mockExecute).toHaveBeenCalledTimes(1)
    })
    it("should verify 1 parameter", async () => {
      await teamspeak.registerEvent("channel")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("servernotifyregister", { event: "channel", id: undefined })
    })
  })

  it("should verify parameters of #queryloginadd()", async () => {
    await teamspeak.queryLoginAdd("name", "3")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("queryloginadd", {clientLoginName: "name", cldbid: "3"})
  })

  it("should verify parameters of #querylogindel()", async () => {
    await teamspeak.queryLoginDel("3")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("querylogindel", { cldbid: "3" })
  })

  it("should verify parameters of #queryloginlist()", async () => {
    await teamspeak.queryLoginList("search", 0, 10)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("queryloginlist", { pattern: "search", start: 0, duration: 10 }, ["-count"])
  })

  it("should verify parameters of #apiKeyAdd()", async () => {
    await teamspeak.apiKeyAdd({ scope: ApiKeyScope.MANAGE })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("apikeyadd", { scope: "manage" })
  })

  it("should verify parameters of #apiKeyList()", async () => {
    await teamspeak.apiKeyList({ start: 10 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("apikeylist", { start: 10 }, ["-count"])
  })

  it("should verify parameters of #apiKeyDel()", async () => {
    await teamspeak.apiKeyDel("512")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("apikeydel", { id: "512" })
  })

  it("should verify parameters of #unregisterEvent()", async () => {
    await teamspeak.unregisterEvent()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servernotifyunregister")
  })

  it("should verify parameters of #login()", async () => {
    await teamspeak.login("serveradmin", "password")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("login", ["serveradmin", "password"])
  })

  it("should verify parameters of #logout()", async () => {
    await teamspeak.logout()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("logout")
  })

  it("should verify parameters of #hostInfo()", async () => {
    await teamspeak.hostInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("hostinfo")
  })

  it("should verify parameters of #instanceInfo()", async () => {
    await teamspeak.instanceInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("instanceinfo")
  })

  it("should verify parameters of #instanceEdit()", async () => {
    await teamspeak.instanceEdit({ "serverinstanceFiletransferPort": 30033 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("instanceedit", { "serverinstanceFiletransferPort": 30033 })
  })

  it("should verify parameters of #bindingList()", async () => {
    await teamspeak.bindingList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("bindinglist")
  })

  describe("#useByPort()", () => {
    it("should verify 2 parameters", async () => {
      await teamspeak.useByPort(9987, "Test")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("use", { port: 9987, clientNickname: "Test" }, ["-virtual"])
    })
    it("should verify 1 parameter", async () => {
      await teamspeak.useByPort(9987)
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("use", { port: 9987, clientNickname: undefined }, ["-virtual"])
    })
  })

  describe("#useBySid()", () => {
    it("should verify 2 parameters", async () => {
      await teamspeak.useBySid("1", "Test")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("use", ["1", "-virtual"], { clientNickname: "Test" })
    })
    it("should verify 1 parameter", async () => {
      await teamspeak.useBySid("1")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("use", ["1", "-virtual"], { clientNickname: undefined })
    })
  })

  it("should verify parameters of #whoami()", async () => {
    await teamspeak.whoami()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("whoami")
  })

  it("should verify rejection of #self()", async () => {
    expect.assertions(2)
    mockExecute.mockResolvedValueOnce({ clientId: 1 })
    mockExecute.mockResolvedValueOnce([])
    await expect(teamspeak.self())
      .rejects.toEqual(new Error("could not find own query client"))
    expect(mockExecute).toHaveBeenCalledTimes(2)
  })

  it("should verify parameters of #serverInfo()", async () => {
    await teamspeak.serverInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverinfo")
  })

  it("should verify parameters of #serverIdGetByPort()", async () => {
    await teamspeak.serverIdGetByPort(9987)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serveridgetbyport", { virtualserverPort: 9987 })
  })

  it("should verify parameters of #serverEdit()", async () => {
    await teamspeak.serverEdit({ virtualserverName: "Foo" })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serveredit", { virtualserverName: "Foo" })
  })

  it("should verify parameters of #serverProcessStop()", async () => {
    await teamspeak.serverProcessStop("Shutdown")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverprocessstop", { reasonmsg: "Shutdown" })
  })

  it("should verify parameters of #connectionInfo()", async () => {
    await teamspeak.connectionInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverrequestconnectioninfo")
  })

  it("should verify parameters of #serverCreate()", async () => {
    mockExecute.mockResolvedValueOnce([{ token: "servertoken", sid: "2" }])
    mockExecute.mockResolvedValueOnce([{ virtualserverId: "2" }])
    const { server, token } = await teamspeak.serverCreate({ virtualserverName: "Server Name" })
    expect(server).toBeInstanceOf(TeamSpeakServer)
    expect(token).toBe("servertoken")
    expect(mockExecute).toHaveBeenCalledTimes(2)
    expect(mockExecute).toHaveBeenCalledWith("servercreate", { virtualserverName: "Server Name" })
  })

  it("should verify parameters of #serverDelete()", async () => {
    await teamspeak.serverDelete("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverdelete", { sid: "1" })
  })

  it("should verify parameters of #serverStart()", async () => {
    await teamspeak.serverStart("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverstart", { sid: "1" })
  })

  describe("#serverStop()", () => {
    it("should verify 2 parameters", async () => {
      await teamspeak.serverStop("1", "Shutdown")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("serverstop", { sid: "1", reasonmsg: "Shutdown" })
    })
    it("should verify 1 parameter", async () => {
      await teamspeak.serverStop("1")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("serverstop", { sid: "1", reasonmsg: undefined })
    })
  })

  it("should verify parameters of #serverGroupsByClientId()", async () => {
    await teamspeak.serverGroupsByClientId("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupsbyclientid", { cldbid: ["1"] })
  })

  it("should verify parameters of #serverGroupCreate()", async () => {
    mockExecute.mockResolvedValue([{ sgid: "2" }])
    const group = await teamspeak.serverGroupCreate("New Group", 1)
    expect(group).toBeInstanceOf(TeamSpeakServerGroup)
    expect(mockExecute).toHaveBeenCalledTimes(2)
    expect(mockExecute).toHaveBeenCalledWith("servergroupadd", { name: "New Group", type: 1 })
  })

  it("should verify parameters of #serverGroupClientList()", async () => {
    await teamspeak.serverGroupClientList("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupclientlist", { sgid: "1" }, ["-names"])
  })

  it("should verify parameters of #serverGroupAddClient()", async () => {
    await teamspeak.serverGroupAddClient(["1", "3"], "2")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupaddclient", { sgid: "2", cldbid: ["1", "3"] })
  })

  it("should verify parameters of #serverGroupDelClient()", async () => {
    await teamspeak.serverGroupDelClient(["1", "3"], "2")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdelclient", { sgid: "2", cldbid: ["1", "3"] })
  })

  it("should verify parameters of #clientAddServerGroup()", async () => {
    await teamspeak.clientAddServerGroup("1", ["2", "5"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddservergroup", { sgid: ["2", "5"], cldbid: "1" })
  })

  it("should verify parameters of #clientDelServerGroup()", async () => {
    await teamspeak.clientDelServerGroup("1", ["2", "5"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelservergroup", { sgid: ["2", "5"], cldbid: "1" })
  })

  it("should verify parameters of #serverGroupDel()", async () => {
    await teamspeak.serverGroupDel("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdel", { sgid: "1", force: false })
  })

  it("should verify parameters of #serverGroupCopy()", async () => {
    await teamspeak.serverGroupCopy("1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupcopy", {
      name: "foo",
      ssgid: "1",
      tsgid: "0",
      type: 1
    })
  })

  it("should verify parameters of #serverGroupRename()", async () => {
    await teamspeak.serverGroupRename("1", "New Name")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergrouprename", { sgid: "1", name: "New Name" })
  })

  describe("#serverGroupPermList()", () => {
    it("should verify 2 parameters", async () => {
      await teamspeak.serverGroupPermList("2", true)
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("servergrouppermlist", { sgid: "2" }, ["-permsid"])
    })
    it("should verify 1 parameter", async () => {
      await teamspeak.serverGroupPermList("2")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("servergrouppermlist", { sgid: "2" }, [null])
    })
  })

  it("should verify parameters of #serverGroupAddPerm() with permsid", async () => {
    await teamspeak.serverGroupAddPerm("2", { permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupaddperm", {
      sgid: "2",
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #serverGroupAddPerm() with permid", async () => {
    await teamspeak.serverGroupAddPerm("2", { permname: 11, permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupaddperm", {
      sgid: "2",
      permid: 11,
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #serverGroupDelPerm() with permsid", async () => {
    await teamspeak.serverGroupDelPerm("2", "i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdelperm", { sgid: "2", permsid: "i_channel_subscribe_power" })
  })

  it("should verify parameters of #serverGroupDelPerm() with permid", async () => {
    await teamspeak.serverGroupDelPerm("2", 10)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdelperm", { sgid: "2", permid: 10 })
  })

  it("should verify parameters of #serverTempPasswordAdd()", async () => {
    await teamspeak.serverTempPasswordAdd({ duration: 60, pw: "pass", desc: "description", tcid: "0", tcpw: "" })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servertemppasswordadd", { duration: 60, pw: "pass", desc: "description", tcid: "0", tcpw: "" })
  })

  it("should verify parameters of #serverTempPasswordDel()", async () => {
    await teamspeak.serverTempPasswordDel("test")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servertemppassworddel", { pw: "test" })
  })

  it("should verify parameters of #serverTempPasswordList()", async () => {
    await teamspeak.serverTempPasswordList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servertemppasswordlist")
  })

  describe("channelClientPermList()", () => {
    it("should verify parameters of #channelClientPermList() without permsid", async () => {
      await teamspeak.channelClientPermList("10", "12")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("channelclientpermlist", { cid: "10", cldbid: "12" }, [null])
    })
    it("should verify parameters of #channelClientPermList() with permsid", async () => {
      await teamspeak.channelClientPermList("10", "12", true)
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("channelclientpermlist", { cid: "10", cldbid: "12" }, ["-permsid"])
    })
  })

  it("should verify parameters of #channelCreate()", async () => {
    mockExecute.mockResolvedValue([{ cid: "2" }])
    const channel = await teamspeak.channelCreate("Channel Name")
    expect(channel).toBeInstanceOf(TeamSpeakChannel)
    expect(mockExecute).toHaveBeenCalledTimes(2)
    expect(mockExecute).toHaveBeenCalledWith("channelcreate", { channelName: "Channel Name" })
  })

  it("should verify parameters of #channelGroupCreate()", async () => {
    mockExecute.mockResolvedValue([{ cgid: "2" }])
    const group = await teamspeak.channelGroupCreate("Channel Group Name", 0)
    expect(group).toBeInstanceOf(TeamSpeakChannelGroup)
    expect(mockExecute).toHaveBeenCalledTimes(2)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupadd", { name: "Channel Group Name", type: 0 })
  })

  it("should verify parameters of #getChannelById()", async () => {
    mockExecute.mockResolvedValue(mocks.channellist(5))
    const channel = await teamspeak.getChannelById("3")
    if (!channel) throw new Error("no channel received")
    expect(channel).toBeInstanceOf(TeamSpeakChannel)
    expect(channel.cid).toBe("3")
    expect(channel.name).toBe("Channel 3")
  })

  it("should verify parameters of #getChannelByName()", async () => {
    mockExecute.mockResolvedValue(mocks.channellist(5))
    const channel = await teamspeak.getChannelByName("Channel 3")
    if (!channel) throw new Error("no channel received")
    expect(channel).toBeInstanceOf(TeamSpeakChannel)
    expect(channel.cid).toBe("3")
    expect(channel.name).toBe("Channel 3")
  })

  it("should verify parameters of #channelInfo()", async () => {
    await teamspeak.channelInfo("2")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelinfo", { cid: "2" })
  })

  it("should verify parameters of #channelMove()", async () => {
    await teamspeak.channelMove("10", "5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelmove", { cid: "10", cpid: "5", order: 0 })
  })

  it("should verify parameters of #channelDelete()", async () => {
    await teamspeak.channelDelete("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelete", { cid: "10", force: false })
  })

  it("should verify parameters of #channelEdit()", async () => {
    await teamspeak.channelEdit("1", { channelName: "new name" })
    expect(mockExecute).toHaveBeenCalledTimes(2)
    expect(mockExecute).toHaveBeenNthCalledWith(2, "channeledit", { cid: "1", channelName: "new name" })
  })

  it("should verify parameters of #channelPermList() with permsid", async () => {
    await teamspeak.channelPermList("10", true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelpermlist", { cid: "10" }, ["-permsid"])
  })

  it("should verify parameters of #channelPermList() with permid", async () => {
    await teamspeak.channelPermList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelpermlist", { cid: "10" }, [null])
  })

  it("should verify parameters of #channelSetPerm() with permsid", async () => {
    await teamspeak.channelSetPerm("10", { permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeladdperm", {
      cid: "10",
      permsid: "i_channel_subscribe_power",
      permvalue: 25
    })
  })

  it("should verify parameters of #channelSetPerm() with permid", async () => {
    await teamspeak.channelSetPerm("10", { permname: 11, permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeladdperm", {
      cid: "10",
      permid: 11,
      permvalue: 25
    })
  })

  it("should verify parameters of #channelSetPerms()", async () => {
    await teamspeak.channelSetPerms("5", [{ permsid: "i_channel_needed_modify_power", permvalue: 75 }])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toBeCalledWith(
      "channeladdperm",
      { cid: "5" },
      [{ permsid: "i_channel_needed_modify_power", permvalue: 75 }]
    )
  })

  it("should verify parameters of #channelDelPerm() with permsid", async () => {
    await teamspeak.channelDelPerm("10", "i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelperm", { cid: "10", permsid: "i_channel_subscribe_power" })
  })

  it("should verify parameters of #channelDelPerm() with permid", async () => {
    await teamspeak.channelDelPerm("10", 11)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelperm", { cid: "10", permid: 11 })
  })

  it("should verify parameters of #getClientById()", async () => {
    mockExecute.mockResolvedValue(mocks.clientlist(5))
    const client = await teamspeak.getClientById("3")
    if (!client) throw new Error("no client received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(client).toBeInstanceOf(TeamSpeakClient)
    expect(client.clid).toBe("3")
  })

  it("should verify parameters of #getClientByDbid()", async () => {
    mockExecute.mockResolvedValue(mocks.clientlist(5))
    const client = await teamspeak.getClientByDbid("4")
    if (!client) throw new Error("no client received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(client).toBeInstanceOf(TeamSpeakClient)
    expect(client.databaseId).toBe("4")
  })

  it("should verify parameters of #getClientByUid()", async () => {
    mockExecute.mockResolvedValue(mocks.clientlist(5))
    const client = await teamspeak.getClientByUid("foobar4=")
    if (!client) throw new Error("no client received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(client).toBeInstanceOf(TeamSpeakClient)
    expect(client.uniqueIdentifier).toBe("foobar4=")
  })

  it("should verify parameters of #getClientByName()", async () => {
    mockExecute.mockResolvedValue(mocks.clientlist(5))
    const client = await teamspeak.getClientByName("Client 3")
    if (!client) throw new Error("no client received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(client).toBeInstanceOf(TeamSpeakClient)
    expect(client.nickname).toBe("Client 3")
  })

  it("should verify parameters of #clientEdit()", async () => {
    await teamspeak.clientEdit("10", { clientDescription: "foo", clientIsTalker: true })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientedit", { clid: "10", clientDescription: "foo", clientIsTalker: true })
  })

  it("should verify parameters of #clientFind()", async () => {
    await teamspeak.clientFind("foo")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientfind", { pattern: "foo" })
  })

  it("should verify parameters of #clientGetIds()", async () => {
    await teamspeak.clientGetIds("foo=")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientgetids", { cluid: "foo=" })
  })

  it("should verify parameters of #clientGetDbidFromUid()", async () => {
    await teamspeak.clientGetDbidFromUid("foo=")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientgetdbidfromuid", { cluid: "foo=" })
  })

  it("should verify parameters of #clientGetNameFromUid()", async () => {
    await teamspeak.clientGetNameFromUid("foo=")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientgetnamefromuid", { cluid: "foo=" })
  })

  it("should verify parameters of #clientGetUidFromClid()", async () => {
    await teamspeak.clientGetUidFromClid("20")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientgetuidfromclid", { clid: "20" })
  })

  it("should verify parameters of #clientGetNameFromDbid()", async () => {
    await teamspeak.clientGetNameFromDbid("20")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientgetnamefromdbid", { cldbid: "20" })
  })

  it("should verify parameters of #clientInfo()", async () => {
    await teamspeak.clientInfo("20")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientinfo", { clid: ["20"] })
  })

  it("should verify parameters of #clientDbList()", async () => {
    await teamspeak.clientDbList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdblist", { start: 0, duration: 1000 }, ["-count"])
  })

  it("should verify parameters of #clientDbList() without count", async () => {
    await teamspeak.clientDbList(0, 1000, false)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdblist", { start: 0, duration: 1000 }, [null])
  })

  it("should verify parameters of #clientDbInfo()", async () => {
    await teamspeak.clientDbInfo("25")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: ["25"] })
  })

  it("should verify parameters of #clientKick()", async () => {
    await teamspeak.clientKick("10", ReasonIdentifier.KICK_CHANNEL, "Kicked from Channel", true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientkick", {
      clid: "10",
      reasonid: 4,
      reasonmsg: "Kicked from Channel"
    }, ["-continueonerror"])
  })

  it("should verify parameters of #clientMove()", async () => {
    await teamspeak.clientMove("25", "10", undefined, true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientmove", { clid: "25", cid: "10", cpw: undefined }, ["-continueonerror"])
  })

  it("should verify parameters of #clientPoke()", async () => {
    await teamspeak.clientPoke("10", "you have been poked")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientpoke", { clid: "10", msg: "you have been poked" })
  })

  it("should verify parameters of #clientPermList() with permsid", async () => {
    await teamspeak.clientPermList("10", true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientpermlist", { cldbid: "10" }, ["-permsid"])
  })

  it("should verify parameters of #clientPermList() with permid", async () => {
    await teamspeak.clientPermList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientpermlist", { cldbid: "10" }, [null])
  })

  it("should verify parameters of #clientAddPerm() with permsid", async () => {
    await teamspeak.clientAddPerm("10", { permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddperm", {
      cldbid: "10",
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #clientAddPerm() with permid", async () => {
    await teamspeak.clientAddPerm("10", { permname: 11, permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddperm", {
      cldbid: "10",
      permid: 11,
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #clientDelPerm() with permsid", async () => {
    await teamspeak.clientDelPerm("10", "i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelperm", { cldbid: "10", permsid: "i_channel_subscribe_power" })
  })

  it("should verify parameters of #clientDelPerm() with permid", async () => {
    await teamspeak.clientDelPerm("10", 11)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelperm", { cldbid: "10", permid: 11 })
  })

  it("should verify parameters of #customSearch()", async () => {
    await teamspeak.customSearch("key", "fdsa")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customsearch", { ident: "key", pattern: "fdsa" })
  })

  it("should verify parameters of #customInfo()", async () => {
    await teamspeak.customInfo("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("custominfo", { cldbid: "10" })
  })

  it("should verify parameters of #customDelete()", async () => {
    await teamspeak.customDelete("10", "key")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customdelete", { cldbid: "10", ident: "key" })
  })

  it("should verify parameters of #customSet()", async () => {
    await teamspeak.customSet("10", "key", "value")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customset", { cldbid: "10", ident: "key", value: "value" })
  })

  it("should verify parameters of #sendTextMessage()", async () => {
    await teamspeak.sendTextMessage("10", TextMessageTargetMode.CLIENT, "message to client chat")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("sendtextmessage", {
      target: "10",
      targetmode: 1,
      msg: "message to client chat"
    })
  })

  it("should verify parameters of #sendTextMessage() with TargetMode channel", async () => {
    await teamspeak.sendTextMessage("10", TextMessageTargetMode.CHANNEL, "message to channel chat")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("sendtextmessage", {
      target: "10",
      targetmode: 2,
      msg: "message to channel chat"
    })
  })


  it("should verify parameters of #sendChannelMessage() when being in the same channel", async () => {
    mockExecute
      .mockResolvedValueOnce([{ clientId: "1" }])
      .mockResolvedValueOnce([{ clid: "1", cid: "10" }])
    await teamspeak.sendChannelMessage("10", "test message")
    expect(mockExecute).toHaveBeenCalledTimes(3)
    expect(mockExecute).toHaveBeenNthCalledWith(1, "whoami")
    expect(mockExecute).toHaveBeenNthCalledWith(2, "clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip", "-location"])
    expect(mockExecute).toHaveBeenNthCalledWith(3, "sendtextmessage", {
      target: "10", targetmode: 2, msg: "test message"
    })
  })


  it("should verify parameters of #sendChannelMessage() when being in a different channel", async () => {
    mockExecute
      .mockResolvedValueOnce([{ clientId: "1" }])
      .mockResolvedValueOnce([{ clid: "1", cid: "9" }])
    await teamspeak.sendChannelMessage("10", "test message")
    expect(mockExecute).toHaveBeenCalledTimes(5)
    expect(mockExecute).toHaveBeenNthCalledWith(1, "whoami")
    expect(mockExecute).toHaveBeenNthCalledWith(2, "clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip", "-location"])
    expect(mockExecute).toHaveBeenNthCalledWith(3, "clientmove", {
      cid: "10", clid: "1", cpw: undefined
    }, [])
    expect(mockExecute).toHaveBeenNthCalledWith(4, "sendtextmessage", {
      target: "10", targetmode: 2, msg: "test message"
    })
    expect(mockExecute).toHaveBeenNthCalledWith(5, "clientmove", {
      cid: "9", clid: "1", cpw: undefined
    }, [])
  })

  it("should verify parameters of #getServerGroupByID()", async () => {
    mockExecute.mockResolvedValue(mocks.servergrouplist(5))
    const group = await teamspeak.getServerGroupById("4")
    if (!group) throw new Error("no group received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(group).toBeInstanceOf(TeamSpeakServerGroup)
    expect(group.sgid).toBe("4")
  })

  it("should verify parameters of #getServerGroupByName()", async () => {
    mockExecute.mockResolvedValue(mocks.servergrouplist(5))
    const group = await teamspeak.getServerGroupByName("Group 4")
    if (!group) throw new Error("no group received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(group).toBeInstanceOf(TeamSpeakServerGroup)
    expect(group.name).toBe("Group 4")
  })

  it("should verify parameters of #getChannelGroupByID()", async () => {
    mockExecute.mockResolvedValue(mocks.channelgrouplist(5))
    const group = await teamspeak.getChannelGroupById("4")
    if (!group) throw new Error("no group received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(group).toBeInstanceOf(TeamSpeakChannelGroup)
    expect(group.cgid).toBe("4")
  })

  it("should verify parameters of #getChannelGroupByName()", async () => {
    mockExecute.mockResolvedValue(mocks.channelgrouplist(5))
    const group = await teamspeak.getChannelGroupByName("Group 3")
    if (!group) throw new Error("no group received")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(group).toBeInstanceOf(TeamSpeakChannelGroup)
    expect(group!.name).toBe("Group 3")
  })

  it("should verify parameters of #setClientChannelGroup()", async () => {
    await teamspeak.setClientChannelGroup("10", "5", "3")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("setclientchannelgroup", { cgid: "10", cid: "5", cldbid: "3" })
  })

  it("should verify parameters of #deleteChannelGroup()", async () => {
    await teamspeak.deleteChannelGroup("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdel", { cgid: "10", force: false })
  })

  it("should verify parameters of #channelGroupCopy()", async () => {
    await teamspeak.channelGroupCopy("10", "0", 1, "New Channel Group")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupcopy", {
      scgid: "10",
      tcgid: "0",
      type: 1,
      name: "New Channel Group"
    })
  })

  it("should verify parameters of #channelGroupCopy() with name", async () => {
    await teamspeak.channelGroupCopy("10", "0", 1, "New Channel Group")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupcopy", {
      scgid: "10",
      tcgid: "0",
      type: 1,
      name: "New Channel Group"
    })
  })

  it("should verify parameters of #channelGroupRename()", async () => {
    await teamspeak.channelGroupRename("10", "New Name")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouprename", { cgid: "10", name: "New Name" })
  })

  it("should verify parameters of #channelGroupPermList() with permsid", async () => {
    await teamspeak.channelGroupPermList("10", true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouppermlist", { cgid: "10" }, ["-permsid"])
  })

  it("should verify parameters of #channelGroupPermList() with permid", async () => {
    await teamspeak.channelGroupPermList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouppermlist", { cgid: "10" }, [null])
  })

  it("should verify parameters of #channelGroupAddPerm() with permsid", async () => {
    await teamspeak.channelGroupAddPerm("10", { permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupaddperm", {
      cgid: "10",
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #channelGroupAddPerm() with permid", async () => {
    await teamspeak.channelGroupAddPerm("10", { permname: 11, permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupaddperm", {
      cgid: "10",
      permid: 11,
      permvalue: 25,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify parameters of #channelGroupDelPerm() with permsid", async () => {
    await teamspeak.channelGroupDelPerm("10", "i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdelperm", {
      cgid: "10",
      permsid: "i_channel_subscribe_power"
    })
  })

  it("should verify parameters of #channelGroupDelPerm() with permid", async () => {
    await teamspeak.channelGroupDelPerm("10", 11)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdelperm", {
      cgid: "10",
      permid: 11
    })
  })

  it("should verify parameters of #channelGroupClientList()", async () => {
    await teamspeak.channelGroupClientList("10", "5", "1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupclientlist", { cgid: "10", cid: "5", cldbid: "1" })
  })

  it("should verify parameters of #channelGroupClientList() without cldbid", async () => {
    await teamspeak.channelGroupClientList("10", "5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupclientlist", { cgid: "10" , cid: "5" })
  })

  it("should verify parameters of #channelGroupClientList() without cid and cldbid", async () => {
    await teamspeak.channelGroupClientList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupclientlist", { cgid: "10" })
  })

  it("should verify parameters of #permOverview()", async () => {
    await teamspeak.permOverview("10", "5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permoverview", { cldbid: "10", cid: "5" })
  })

  it("should verify parameters of #permOverview() with permsid", async () => {
    await teamspeak.permOverview("10", "5", ["a", "b", "c"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permoverview", { cldbid: "10", cid: "5", permsid: ["a", "b", "c"] })
  })

  it("should verify parameters of #permOverview() with permids", async () => {
    await teamspeak.permOverview("10", "5", [1, 2, 3])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permoverview", { cldbid: "10", cid: "5", permid: [1, 2, 3] })
  })

  it("should verify parameters of #permissionList()", async () => {
    await teamspeak.permissionList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permissionlist")
  })

  it("should verify parameters of #permIdGetByName()", async () => {
    await teamspeak.permIdGetByName("b_foo")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permidgetbyname", { permsid: "b_foo" })
  })

  it("should verify parameters of #permIdsGetByName()", async () => {
    await teamspeak.permIdsGetByName(["b_foo", "b_bar"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permidgetbyname", { permsid: ["b_foo", "b_bar"] })
  })

  describe("#permGet()", () => {
    it("should verify with string parameter", async () => {
      await teamspeak.permGet("i_channel_subscribe_power")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("permget", { permsid: "i_channel_subscribe_power" })
    })
    it("should verify with numeric parameter", async () => {
      await teamspeak.permGet(10)
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("permget", { permid: 10 })
    })
  })

  describe("#permFind()", () => {
    it("should verify with string parameter", async () => {
      await teamspeak.permFind("i_channel_subscribe_power")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("permfind", { permsid: "i_channel_subscribe_power" })
    })
    it("should verify with numeric parameter", async () => {
      await teamspeak.permFind(10)
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("permfind", { permid: 10 })
    })
  })

  it("should verify parameters of #permReset()", async () => {
    await teamspeak.permReset()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("permreset")
  })

  it("should verify parameters of #privilegeKeyList()", async () => {
    await teamspeak.privilegeKeyList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeylist")
  })

  it("should verify parameters of #privilegeKeyAdd()", async () => {
    await teamspeak.privilegeKeyAdd(TokenType.ServerGroup, "10", undefined, "Server Group Token")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeyadd", {
      tokentype: 0,
      tokenid1: "10",
      tokenid2: "0",
      tokendescription: "Server Group Token",
      tokencustomset: ""
    })
  })

  it("should verify some parameters of #privilegeKeyAdd()", async () => {
    await teamspeak.privilegeKeyAdd(TokenType.ChannelGroup, "10", "1")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeyadd", {
      tokentype: 1,
      tokenid1: "10",
      tokenid2: "1",
      tokendescription: "",
      tokencustomset: ""
    })
  })

  it("should verify parameters of #serverGroupPrivilegeKeyAdd()", async () => {
    await teamspeak.serverGroupPrivilegeKeyAdd("10", "Server Group Token")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeyadd", {
      tokentype: 0,
      tokenid1: "10",
      tokenid2: "0",
      tokendescription: "Server Group Token",
      tokencustomset: ""
    })
  })

  it("should verify parameters of #channelGroupPrivilegeKeyAdd()", async () => {
    await teamspeak.channelGroupPrivilegeKeyAdd("10", "5", "Channel Group Token")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeyadd", {
      tokentype: 1,
      tokenid1: "10",
      tokenid2: "5",
      tokendescription: "Channel Group Token",
      tokencustomset: ""
    })
  })

  it("should verify parameters of #privilegeKeyDelete()", async () => {
    await teamspeak.privilegeKeyDelete("asdf")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeydelete", { token: "asdf" })
  })

  it("should verify parameters of #privilegeKeyUse()", async () => {
    await teamspeak.privilegeKeyUse("asdf")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("privilegekeyuse", { token: "asdf" })
  })

  it("should verify parameters of #messageList()", async () => {
    await teamspeak.messageList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("messagelist")
  })

  it("should verify parameters of #messageAdd()", async () => {
    await teamspeak.messageAdd("uniqueidentifier=", "title", "content")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("messageadd", {
      cluid: "uniqueidentifier=",
      subject: "title",
      message: "content"
    })
  })

  it("should verify parameters of #messageDel()", async () => {
    await teamspeak.messageDel("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("messagedel", { msgid: "10" })
  })

  it("should verify parameters of #messageGet()", async () => {
    await teamspeak.messageGet("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("messageget", { msgid: "10" })
  })

  it("should verify parameters of #messageUpdate()", async () => {
    await teamspeak.messageUpdate("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("messageupdateflag", { msgid: "10", flag: true })
  })

  it("should verify parameters of #complainList()", async () => {
    await teamspeak.complainList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("complainlist", { cldbid: "10" })
  })

  it("should verify parameters of #complainAdd()", async () => {
    await teamspeak.complainAdd("10", "message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("complainadd", { cldbid: "10", message: "message" })
  })

  describe("#complainDel()", () => {
    it("should deletes all complaints for the given dbid", async () => {
      await teamspeak.complainDel("10")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("complaindelall", { tcldbid: "10" })
    })
    it("should delete only a single complaint", async () => {
      await teamspeak.complainDel("10", "15")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("complaindel", { tcldbid: "10", fcldbid: "15" })
    })
  })

  it("should verify parameters of #banList()", async () => {
    await teamspeak.banList(5, 10)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("banlist", { start: 5, duration: 10 })
  })

  it("should verify parameters of #ban()", async () => {
    const rule = { ip: "127.0.0.1", uid: "something=", name: "FooBar", mytsid: "empty", banreason: "spam", time: 60 }
    await teamspeak.ban({ ...rule })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("banadd", { ...rule })
  })

  it("should verify parameters of #banClient()", async () => {
    const rule: BanClient = { clid: "1337", mytsid: "empty", banreason: "spam", time: 60, continueOnError: true }
    await teamspeak.banClient({ ...rule })
    delete rule.continueOnError
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("banclient", { ...rule }, ["-continueonerror"])
  })

  describe("#banDel()", () => {
    it("should remove a single ban", async () => {
      await teamspeak.banDel("10")
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("bandel", { banid: "10" })
    })
    it("should remove all bans", async () => {
      await teamspeak.banDel()
      expect(mockExecute).toHaveBeenCalledTimes(1)
      expect(mockExecute).toHaveBeenCalledWith("bandelall")
    })
  })

  it("should verify parameters of #logView()", async () => {
    await teamspeak.logView()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("logview", { lines: 1000, reverse: 0, instance: 0, beginPos: 0 })
  })

  it("should verify parameters of #logAdd()", async () => {
    await teamspeak.logAdd(LogLevel.DEBUG, "custom message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("logadd", { loglevel: 3, logmsg: "custom message" })
  })

  it("should verify parameters of #gm()", async () => {
    await teamspeak.gm("Global Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("gm", { msg: "Global Message" })
  })

  it("should verify parameters of #clientDBInfo()", async () => {
    await teamspeak.clientDbInfo("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: ["10"] })
  })

  it("should verify parameters of #clientDBFind()", async () => {
    await teamspeak.clientDbFind("John Doe")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbfind", { pattern: "John Doe" }, [null])
  })

  it("should verify parameters of #clientDBFind() with an uid", async () => {
    await teamspeak.clientDbFind("foobar=", true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbfind", { pattern: "foobar=" }, ["-uid"])
  })

  it("should verify parameters of #clientDBEdit()", async () => {
    await teamspeak.clientDbEdit("10", { clientDescription: "foo" })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbedit", { cldbid: "10", clientDescription: "foo" })
  })

  it("should verify parameters of #clientDBDelete()", async () => {
    await teamspeak.clientDbDelete("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbdelete", { cldbid: "10" })
  })

  it("should verify parameters of #serverList()", async () => {
    await teamspeak.serverList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverlist", ["-uid", "-all"])
  })

  it("should verify parameters of #channelGroupList()", async () => {
    await teamspeak.channelGroupList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouplist")
  })

  it("should verify parameters of #serverGroupList()", async () => {
    await teamspeak.serverGroupList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergrouplist")
  })

  it("should verify parameters of #channelFind()", async () => {
    await teamspeak.channelFind("foo")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toBeCalledWith("channelfind", { pattern: "foo" })
  })

  it("should verify parameters of #channelList()", async () => {
    await teamspeak.channelList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toBeCalledWith(
      "channellist",
      ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty", "-banner"]
    )
  })

  it("should verify parameters of #clientList()", async () => {
    await teamspeak.clientList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toBeCalledWith(
      "clientlist",
      ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip", "-location"]
    )
  })

  it("should verify parameters of #clientList() with set ignoreQueries config", async () => {
    teamspeak["config"].ignoreQueries = true
    const filter = {}
    await teamspeak.clientList(filter)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toBeCalledWith(
      "clientlist",
      ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip", "-location"]
    )
    expect(filter).toEqual({ clientType: 0 })
  })

  it("should verify parameters of #ftList()", async () => {
    await teamspeak.ftList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftlist")
  })

  it("should verify parameters of #ftGetFileList()", async () => {
    await teamspeak.ftGetFileList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftgetfilelist", { cid: "10", path: "/", cpw: "" })
  })

  it("should verify parameters of #ftGetFileInfo()", async () => {
    await teamspeak.ftGetFileInfo("10", "/file.txt")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftgetfileinfo", { cid: "10", name: "/file.txt", cpw: "" })
  })

  it("should verify parameters of #ftStop()", async () => {
    await teamspeak.ftStop(109100)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftstop", { serverftfid: 109100, delete: 1 })
  })

  it("should verify parameters of #ftDeleteFile()", async () => {
    await teamspeak.ftDeleteFile("10", "/file.txt")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftdeletefile", { cid: "10", name: "/file.txt", cpw: "" })
  })

  it("should verify parameters of #ftCreateDir()", async () => {
    await teamspeak.ftCreateDir("10", "/folder")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftcreatedir", { cid: "10", dirname: "/folder", "cpw": "" })
  })

  it("should verify parameters of #ftRenameFile()", async () => {
    await teamspeak.ftRenameFile("10", "/file.txt", "/file2.txt", "11")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftrenamefile", {
      cid: "10",
      oldname: "/file.txt",
      newname: "/file2.txt",
      tcid: "11",
      cpw: "",
      tcpw: ""
    })
  })

  it("should verify parameters of #ftInitUpload()", async () => {
    await teamspeak.ftInitUpload({ name: "/somefile.iso", clientftfid: 123, size: 1 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftinitupload", {
      name: "/somefile.iso",
      size: 1,
      clientftfid: 123,
      cid: "0",
      resume: 0,
      overwrite: 1,
      cpw: ""
    })
  })

  it("should verify parameters of #ftInitDownload()", async () => {
    await teamspeak.ftInitDownload({ name: "/somefile.iso", clientftfid: 123 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("ftinitdownload", {
      name: "/somefile.iso", clientftfid: 123, cid: "0", seekpos: 0, cpw: ""
    })
  })

  
  it("should verify parameters of #uploadFile() with a string", async () => {
    mockExecute.mockResolvedValue({ size: 10, ftkey: "fookey", port: 30033 })
    mockTransfer.mockResolvedValue(null)
    await teamspeak.uploadFile("/mock.txt", "test")
    expect(mockExecute).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledWith("fookey", Buffer.from("test"))
  })

  
  it("should verify parameters of #uploadFile() with a buffer", async () => {
    const data = Buffer.from("test")
    mockExecute.mockResolvedValue({ size: 10, ftkey: "fookey", port: 30033 })
    mockTransfer.mockResolvedValue(null)
    await teamspeak.uploadFile("/mock.txt", data)
    expect(mockExecute).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledWith("fookey", data)
  })

  
  it("should verify parameters of #downloadFile()", async () => {
    mockExecute.mockResolvedValue({ size: 10, ftkey: "fookey", port: 30033 })
    mockTransfer.mockResolvedValue(Buffer.from("foodata"))
    await teamspeak.downloadFile("/mock.txt")
    expect(mockExecute).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledTimes(1)
    expect(mockTransfer).toBeCalledWith("fookey", 10)
  })


  it("should verify parameters of #forceQuit()", async () => {
    await teamspeak.forceQuit()
    expect(mockClose).toHaveBeenCalledTimes(1)
  })


  it("should verify parameters of #quit()", async () => {
    await teamspeak.quit()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("quit")
  })

  it("should validate the return value of #getIconId()", async () => {
    mockExecute.mockResolvedValue([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await teamspeak.getIconId(teamspeak.serverGroupPermList("8"))
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toBe(9999)
  })

  it("should verify parameters of #createSnapshot()", async () => {
    mockExecute.mockResolvedValue([{ version: "2", salt: "_SALT_", snapshot: "_SNAPSHOT_" }])
    const response = await teamspeak.createSnapshot("_PASSWORD_")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute.mock.calls[0].length).toBe(3)
    expect(mockExecute.mock.calls[0][0]).toBe("serversnapshotcreate")
    expect(mockExecute.mock.calls[0][1]).toEqual({ password: "_PASSWORD_" })
    expect(typeof mockExecute.mock.calls[0][2]).toBe("function")
    expect(response).toEqual({
      version: 2,
      salt: "_SALT_",
      snapshot: "_SNAPSHOT_"
    })
  })

  it("should verify parameters of #deploySnapshot()", async () => {
    await teamspeak.deploySnapshot("foo=", "_SALT_", "_PASSWORD_")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute.mock.calls[0].length).toBe(4)
    expect(mockExecute.mock.calls[0][0]).toBe("serversnapshotdeploy")
    expect(mockExecute.mock.calls[0][1]).toEqual(["-keepfiles", "-mapping"])
    expect(mockExecute.mock.calls[0][2]).toEqual({
      password: "_PASSWORD_",
      salt: "_SALT_"
    })
    expect(typeof mockExecute.mock.calls[0][3]).toBe("function")
  })

  describe("should test return parameter of ignoreQueryClient", () => {
    expect(teamspeak["ignoreQueryClient"](ClientType.Regular)).toBe(false)
    expect(teamspeak["ignoreQueryClient"](ClientType.ServerQuery)).toBe(false)
    teamspeak["config"].ignoreQueries = true
    expect(teamspeak["ignoreQueryClient"](ClientType.Regular)).toBe(false)
    expect(teamspeak["ignoreQueryClient"](ClientType.ServerQuery)).toBe(true)
  })

  describe("event clientconnect", () => {
    it("should receive and handle the event", done => {
      try {
        mockExecute.mockRejectedValueOnce([])
        mockExecute.mockResolvedValueOnce(mocks.clientlist(1))
        teamspeak.once("clientconnect", ev => {
          expect(ev.client).toBeInstanceOf(TeamSpeakClient)
          expect(ev.client.clid).toBe("1")
          expect(ev.cid).toBe("10")
          expect(mockExecute).toHaveBeenCalledTimes(2)
          done()
        })
        teamspeak["query"].emit("cliententerview", {
          ctid: "10",
          clientUniqueIdentifier: "foobar1=",
          clid: "1",
          clientDatabaseId: "1",
          clientType: 0 
        })
      } catch (e) {
        done(e)
      }
    }, 400)
    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValueOnce(new Error("failed"))
      teamspeak.once("clientconnect", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("cliententerview", {})
    }, 400)
  })

  describe("event clientdisconnect", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockResolvedValueOnce([])
      try {
        teamspeak.once("clientdisconnect", ev => {
          expect(ev.event.clid).toBe("4")
          expect(mockExecute).toHaveBeenCalledTimes(1)
          done()
        })
        teamspeak["query"].emit("clientleftview", { clid: "4" })
      } catch (e) {
        done(e)
      }
    }, 400)
  })

  describe("event tokenused", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValue(mocks.clientlist(1))
      try {
        teamspeak.once("tokenused", ev => {
          expect(ev.client).toBeInstanceOf(TeamSpeakClient)
          expect(ev.client.clid).toBe("1")
          expect(ev.token).toBe("fXy69G3Td5eYeYiLCarBXMf3SEDTi3dPbfyJtrJK")
          expect(ev.token1).toBe("7")
          expect(ev.token2).toBe("0")
          expect(mockExecute).toHaveBeenCalledTimes(2)
          done()
        })
        teamspeak["query"].emit("tokenused", {
            clid: "1",
            cldbid: "1",
            cluid: '596ScG3nXtcR++4aYEmiDqTnCdi=',
            token: 'fXy69G3Td5eYeYiLCarBXMf3SEDTi3dPbfyJtrJK',
            token1: '7',
            token2: '0'
        })
      } catch (e) {
        done(e)
      }
    }, 400)
    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("tokenused", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("tokenused", {})
    }, 400)
  })

  describe("event textmessage", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValue(mocks.clientlist(1))
      try {
        teamspeak.once("textmessage", ev => {
          expect(ev.msg).toBe("Message Content")
          expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
          expect(ev.invoker.clid).toBe("1")
          expect(ev.targetmode).toBe(1)
          expect(mockExecute).toHaveBeenCalledTimes(4)
          done()
        })
        teamspeak["query"].emit("textmessage", {
          msg: "Message Content",
          invokerid: "1",
          targetmode: 1 
        })
      } catch (e) {
        done(e)
      }
    }, 400)
    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("textmessage", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("textmessage", {})
    }, 400)
  })

  describe("event clientmoved", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce(mocks.clientlist(1))
      mockExecute.mockResolvedValueOnce(mocks.channellist(1))
      try {
        teamspeak.once("clientmoved", ev => {
          expect(ev.client).toBeInstanceOf(TeamSpeakClient)
          expect(ev.client.clid).toBe("1")
          expect(ev.channel).toBeInstanceOf(TeamSpeakChannel)
          expect(ev.channel.cid).toBe("1")
          expect(ev.reasonid).toBe(4)
          expect(mockExecute).toHaveBeenCalledTimes(3)
          done()
        })
        teamspeak["query"].emit("clientmoved", { clid: "1", ctid: "1", reasonid: 4 })
      } catch (e) {
        done(e)
      }
    }, 400)
    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("clientmoved", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("clientmoved", {})
    }, 400)
  })



  describe("event serveredit", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValue(mocks.clientlist(1))
      try {
        teamspeak.once("serveredit", ev => {
          expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
          expect(ev.invoker.clid).toBe("1")
          expect(ev.modified).toEqual({ virtualserverName: "Renamed Server" })
          expect(ev.reasonid).toBe(10)
          expect(mockExecute).toHaveBeenCalledTimes(2)
          done()
        })
        teamspeak["query"].emit("serveredited", {
          reasonid: 10,
          invokerid: "1",
          invokername: "Client 1",
          invokeruid: "foobar1=",
          virtualserverName: "Renamed Server"
        })
      } catch (e) {
        done(e)
      }
    }, 400)

    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("serveredited", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("serveredited", {})
    }, 400)
  })


  describe("event channeledited", () => {
    it("should receive and handle the event channeledit", done => {
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockResolvedValueOnce(mocks.clientlist(1))
      mockExecute.mockResolvedValueOnce(mocks.channellist(1))
      try {
        teamspeak.once("channeledit", ev => {
          expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
          expect(ev.invoker.clid).toBe("1")
          expect(ev.channel).toBeInstanceOf(TeamSpeakChannel)
          expect(ev.channel.cid).toBe("1")
          expect(ev.modified).toEqual({ channelName: "new name" })
          expect(ev.reasonid).toBe(10)
          expect(mockExecute).toHaveBeenCalledTimes(3)
          done()
        })
        teamspeak["query"].emit("channeledited", {
          cid: "1",
          reasonid: 10,
          invokerid: "1",
          invokername: "Client 1",
          invokeruid: "foobar1=",
          channelName: "new name"
        })
      } catch (e) {
        done(e)
      }
    }, 400)

    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("channeledited", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("channeledited", {})
    }, 400)
  })


  describe("event channelcreate", () => {
    it("should receive and handle the event", done => {
      mockExecute.mockRejectedValueOnce([])
      mockExecute.mockResolvedValueOnce(mocks.clientlist(5))
      mockExecute.mockResolvedValueOnce(mocks.channellist(5))
      teamspeak.once("channelcreate", ev => {
        expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
        expect(ev.invoker.clid).toBe("3")
        expect(ev.channel).toBeInstanceOf(TeamSpeakChannel)
        expect(ev.channel.cid).toBe("3")
        expect(ev.modified).toEqual({
          channelName: "new channel",
          channelCodecQuality: 6,
          channelOrder: 2,
          channelCodecIsUnencrypted: false,
          channelFlagMaxfamilyclientsUnlimited: false,
          channelFlagMaxfamilyclientsInherited: true
        })
        expect(ev.cpid).toBe("0")
        expect(mockExecute).toHaveBeenCalledTimes(3)
        done()
      })
      teamspeak["query"].emit("channelcreated", {
        cid: "3",
        cpid: "0",
        channelName: "new channel",
        channelCodecQuality: 6,
        channelOrder: 2,
        channelCodecIsUnencrypted: false,
        channelFlagMaxfamilyclientsUnlimited: false,
        channelFlagMaxfamilyclientsInherited: true,
        invokerid: "3",
        invokername: "TeamSpeakUser",
        invokeruid: "uid="
      })
    }, 400)

    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValue(new Error("failed"))
      teamspeak.once("channelcreate", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("channelcreated", {})
    }, 400)
  })


  describe("event channelmoved", () => {
    it("should receive and handle the event", done => {
      mockExecute
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mocks.clientlist(1))
        .mockResolvedValueOnce(mocks.channellist(2))
        .mockResolvedValueOnce(mocks.channellist(2))
      teamspeak.once("channelmoved", ev => {
        expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
        expect(ev.invoker.clid).toBe("1")
        expect(ev.channel).toBeInstanceOf(TeamSpeakChannel)
        expect(ev.channel.cid).toBe("1")
        expect(ev.parent).toBeInstanceOf(TeamSpeakChannel)
        expect(ev.parent.cid).toBe("2")
        expect(ev.order).toBe(0)
        expect(mockExecute).toHaveBeenCalledTimes(4)
        done()
      })
      teamspeak["query"].emit("channelmoved", {
        cid: "1",
        cpid: "2",
        order: 0,
        reasonid: 1,
        invokerid: "1",
        invokername: "Client 1",
        invokeruid: "foobar1="
      })
    }, 400)

    it("should receive and handle an error", done => {
      expect.assertions(1)
      mockExecute.mockResolvedValueOnce([])
      mockExecute.mockRejectedValueOnce(new Error("failed"))
      teamspeak.once("channelmoved", () => {
        throw new Error("event should not get called")
      })
      teamspeak.once("error", e => {
        expect(e).toEqual(new Error("failed"))
        done()
      })
      teamspeak["query"].emit("channelmoved", {})
    }, 400)
  })


  describe("event channeldelete", () => {
    it("should receive and handle the event", done => {
      expect.assertions(4)
      mockExecute
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mocks.clientlist(5))
      teamspeak.once("channeldelete", ev => {
        expect(ev.invoker).toBeInstanceOf(TeamSpeakClient)
        expect(ev.invoker.clid).toBe("1")
        expect(ev.cid).toBe("4")
        expect(mockExecute).toHaveBeenCalledTimes(2)
        done()
      })
      teamspeak["query"].emit("channeldeleted", {
        invokerid: "1",
        invokername: "Client 1",
        invokeruid: "foobar1=",
        cid: "4"
      })
    }, 400)
  })


  describe("#filter()", () => {
    const mockData: any = [
      { foo: "bar", bar: "baz", list: ["a", "b", "c"] }, 
      { foo: "baz", bar: "foo", list: ["c"] },
      { foo: "bar", bar: "bar", list: ["a", "b"] },
      { foo: "",    bar: "", list: [] }
    ]

    it("should filter an array of objects with 1 filter parameter", () => {
      const filter: any = { foo: "bar" }
      expect(TeamSpeak.filter(mockData, filter))
        .toEqual([mockData[0], mockData[2]])
    })

    it("should filter an array of objects with 2 filter parameters", () => {
      const filter: any = { foo: "bar", bar: "baz" }
      expect(TeamSpeak.filter(mockData, filter))
        .toEqual([mockData[0]])
    })

    it("should filter an array of objects with an array with 1 item as filter array", () => {
      const filter: any = { list: "c" }
      expect(TeamSpeak.filter(mockData, filter))
        .toEqual([mockData[0], mockData[1]])
    })

    it("should filter an array of objects with an array with 2 item as filter array", () => {
      const filter: any = { list: ["a", "b"] }
      expect(TeamSpeak.filter(mockData, filter))
        .toEqual([mockData[0], mockData[2]])
    })
  })

  describe("#toArray()", () => {
    it("should convert undefined to an empty array", () => {
      expect(TeamSpeak.toArray(undefined)).toEqual([])
    })
    it("should convert null to an empty array", () => {
      expect(TeamSpeak.toArray(null)).toEqual([])
    })
    it("should convert a single string to an array with the string in it", () => {
      expect(TeamSpeak.toArray("foo bar")).toEqual(["foo bar"])
    })
    it("should do nothing with an array as argument", () => {
      expect(TeamSpeak.toArray(["jane doe", "john doe"])).toEqual(["jane doe", "john doe"])
    })
  })

})
