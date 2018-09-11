const assert = require("assert")
const sinon = require("sinon")
const mockRequire = require("mock-require")
const mockArray = require("./mocks/mockArray.js")
var TeamSpeak3 = require("../TeamSpeak3.js")

mockRequire("../transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../TeamSpeak3.js")



describe("TeamSpeak3", () => {

  beforeEach(() => {
    ts3 = new TeamSpeak3()
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
  })

  it("should test parameters of #clientUpdate()", async () => {
    await ts3.clientUpdate({ client_nickname: "Test" })
    assert(stub.calledOnce)
    assert(stub.withArgs("clientupdate", { client_nickname: "Test" }).calledOnce)
  })

  describe("#registerEvent()", () => {
    it("should test 2 parameters", async () => {
      await ts3.registerEvent("channel", 0)
      assert(stub.calledOnce)
      assert(stub.withArgs("servernotifyregister", { event: "channel", id: 0 }).calledOnce)
    })
    it("should test 1 parameter", async () => {
      await ts3.registerEvent("channel")
      assert(stub.calledOnce)
      assert(stub.withArgs("servernotifyregister", { event: "channel", id: undefined }).calledOnce)
    })
  })

  it("should test parameters of #login()", async () => {
    await ts3.login("serveradmin", "password")
    assert(stub.calledOnce)
    assert(stub.withArgs("login", ["serveradmin", "password"]).calledOnce)
  })

  it("should test parameters of #logout()", async () => {
    await ts3.logout()
    assert(stub.calledOnce)
    assert(stub.withArgs("logout").calledOnce)
  })

  it("should test parameters of #version()", async () => {
    await ts3.version()
    assert(stub.calledOnce)
    assert(stub.withArgs("version").calledOnce)
  })

  it("should test parameters of #hostInfo()", async () => {
    await ts3.hostInfo()
    assert(stub.calledOnce)
    assert(stub.withArgs("hostinfo").calledOnce)
  })

  it("should test parameters of #instanceInfo()", async () => {
    await ts3.instanceInfo()
    assert(stub.calledOnce)
    assert(stub.withArgs("instanceinfo").calledOnce)
  })

  it("should test parameters of #instanceEdit()", async () => {
    await ts3.instanceEdit(mockArray.SIMPLE)
    assert(stub.calledOnce)
    assert(stub.withArgs("instanceedit", mockArray.SIMPLE).calledOnce)
  })

  it("should test parameters of #bindingList()", async () => {
    await ts3.bindingList()
    assert(stub.calledOnce)
    assert(stub.withArgs("bindinglist").calledOnce)
  })

  describe("#useByPort()", () => {
    it("should test 2 parameters", async () => {
      await ts3.useByPort(9987, "Test")
      assert(stub.calledOnce)
      assert(stub.withArgs("use", { port: 9987, client_nickname: "Test" }).calledOnce)
    })
    it("should test 1 parameter", async () => {
      await ts3.useByPort(9987)
      assert(stub.calledOnce)
      assert(stub.withArgs("use", { port: 9987, client_nickname: undefined }).calledOnce)
    })
  })

  describe("#useBySid()", () => {
    it("should test 2 parameters", async () => {
      await ts3.useBySid(1, "Test")
      assert(stub.calledOnce)
      assert(stub.withArgs("use", [1], { client_nickname: "Test" }).calledOnce)
    })
    it("should test 1 parameter", async () => {
      await ts3.useBySid(1)
      assert(stub.calledOnce)
      assert(stub.withArgs("use", [1], { client_nickname: undefined }).calledOnce)
    })
  })

  it("should test parameters of #whoami()", async () => {
    await ts3.whoami()
    assert(stub.calledOnce)
    assert(stub.withArgs("whoami").calledOnce)
  })

  it("should test parameters of #serverInfo()", async () => {
    await ts3.serverInfo()
    assert(stub.calledOnce)
    assert(stub.withArgs("serverinfo").calledOnce)
  })

  it("should test parameters of #serverIdGetByPort()", async () => {
    await ts3.serverIdGetByPort(9987)
    assert(stub.calledOnce)
    assert(stub.withArgs("serveridgetbyport", { virtualserver_port: 9987 }).calledOnce)
  })

  it("should test parameters of #serverEdit()", async () => {
    await ts3.serverEdit(mockArray.SIMPLE)
    assert(stub.calledOnce)
    assert(stub.withArgs("serveredit", mockArray.SIMPLE).calledOnce)
  })

  it("should test parameters of #serverProcessStop()", async () => {
    await ts3.serverProcessStop("Shutdown")
    assert(stub.calledOnce)
    assert(stub.withArgs("serverprocessstop", { reasonmsg: "Shutdown" }).calledOnce)
  })

  it("should test parameters of #connectionInfo()", async () => {
    await ts3.connectionInfo()
    assert(stub.calledOnce)
    assert(stub.withArgs("serverrequestconnectioninfo").calledOnce)
  })

  it("should test parameters of #serverCreate()", async () => {
    stub.onCall(0).resolves({ token: "servertoken", sid: 2 })
    await ts3.serverCreate({ virtualserver_name: "Server Name" })
    assert(stub.calledTwice)
    assert(stub.withArgs("servercreate", { virtualserver_name: "Server Name" }).calledOnce)
  })

  it("should test parameters of #serverDelete()", async () => {
    await ts3.serverDelete(1)
    assert(stub.calledOnce)
    assert(stub.withArgs("serverdelete", { sid: 1 }).calledOnce)
  })

  it("should test parameters of #serverStart()", async () => {
    await ts3.serverStart(1)
    assert(stub.calledOnce)
    assert(stub.withArgs("serverstart", { sid: 1 }).calledOnce)
  })

  describe("#serverStop()", () => {
    it("should test 2 parameters", async () => {
      await ts3.serverStop(1, "Shutdown")
      assert(stub.calledOnce)
      assert(stub.withArgs("serverstop", { sid: 1, reasonmsg: "Shutdown" }).calledOnce)
    })
    it("should test 1 parameter", async () => {
      await ts3.serverStop(1)
      assert(stub.calledOnce)
      assert(stub.withArgs("serverstop", { sid: 1, reasonmsg: undefined }).calledOnce)
    })
  })

  it("should test parameters of #serverGroupCreate()", async () => {
    stub.onCall(0).resolves({ sgid: 2 })
    await ts3.serverGroupCreate("New Group", 1)
    assert(stub.calledTwice)
    assert(stub.withArgs("servergroupadd", { name: "New Group", type: 1 }).calledOnce)
  })

  it("should test parameters of #serverGroupClientList()", async () => {
    await ts3.serverGroupClientList(1)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupclientlist", { sgid: 1 }, ["-names"]).calledOnce)
  })

  it("should test parameters of #serverGroupAddClient()", async () => {
    await ts3.serverGroupAddClient(1, 2)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupaddclient", { sgid: 2, cldbid: 1 }).calledOnce)
  })

  it("should test parameters of #serverGroupDelClient()", async () => {
    await ts3.serverGroupDelClient(1, 2)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupdelclient", { sgid: 2, cldbid: 1 }).calledOnce)
  })

  it("should test parameters of #serverGroupDel()", async () => {
    await ts3.serverGroupDel(1)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupdel", { sgid: 1, force: 0 }).calledOnce)
  })

  it("should test parameters of #serverGroupCopy()", async () => {
    await ts3.serverGroupCopy(1)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupcopy", { ssgid: 1, tsgid: 0, type: 1 }).calledOnce)
  })

  it("should test parameters of #serverGroupRename()", async () => {
    await ts3.serverGroupRename(1, "New Name")
    assert(stub.calledOnce)
    assert(stub.withArgs("servergrouprename", { sgid: 1, name: "New Name" }).calledOnce)
  })

  describe("#serverGroupPermList()", () => {
    it("should test 2 parameters", async () => {
      await ts3.serverGroupPermList(2, true)
      assert(stub.calledOnce)
      assert(stub.withArgs("servergrouppermlist", { sgid: 2 }, ["-permsid"]).calledOnce)
    })
    it("should test 1 parameter", async () => {
      await ts3.serverGroupPermList(2)
      assert(stub.calledOnce)
      assert(stub.withArgs("servergrouppermlist", { sgid: 2 }, [null]).calledOnce)
    })
  })

  it("should test parameters of #serverGroupAddPerm()", async () => {
    await ts3.serverGroupAddPerm(2, "i_channel_subscribe_power", 25, true)
    assert(stub.calledOnce)
    assert(stub.withArgs(
      "servergroupaddperm",
      {sgid: 2, permsid: "i_channel_subscribe_power", permvalue: 25, permskip: 0, permnegated: 0}
    ).calledOnce)
  })

  it("should test parameters of #serverGroupDelPerm()", async () => {
    await ts3.serverGroupDelPerm(2, "i_channel_subscribe_power", true)
    assert(stub.calledOnce)
    assert(stub.withArgs("servergroupdelperm", { sgid: 2, permsid: "i_channel_subscribe_power" }).calledOnce)
  })

  it("should test parameters of #channelCreate()", async () => {
    stub.onCall(0).resolves({ cid: 2 })
    await ts3.channelCreate("Channel Name")
    assert(stub.calledTwice)
    assert(stub.withArgs("channelcreate", { channel_name: "Channel Name" }).calledOnce)
  })

  it("should test parameters of #channelGroupCreate()", async () => {
    stub.onCall(0).resolves({ cigd: 2 })
    await ts3.channelGroupCreate("Channel Group Name", 0)
    assert(stub.calledTwice)
    assert(stub.withArgs("channelgroupadd", { name: "Channel Group Name", type: 0 }).calledOnce)
  })

  it("should test parameters of #getChannelByID()")

  it("should test parameters of #getChannelByName()")

  it("should test parameters of #channelInfo()", async () => {
    await ts3.channelInfo(2)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelinfo", { cid: 2 }).calledOnce)
  })

  it("should test parameters of #channelMove()", async () => {
    await ts3.channelMove(10, 5)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelmove", { cid: 10, cpid: 5, order: 0 }).calledOnce)
  })

  it("should test parameters of #channelDelete()", async () => {
    await ts3.channelDelete(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("channeldelete", { cid: 10, force: 0 }).calledOnce)
  })

  it("should test parameters of #channelEdit()", async () => {
    await ts3.channelEdit(1, { channel_name: "new name" })
    assert(stub.calledOnce)
    assert(stub.withArgs("channeledit", { cid: 1, channel_name: "new name" }).calledOnce)
  })

  it("should test parameters of #channelPermList()", async () => {
    await ts3.channelPermList(10, true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelpermlist", { cid: 10 }, ["-permsid"]).calledOnce)
  })

  it("should test parameters of #channelSetPerm()", async () => {
    await ts3.channelSetPerm(10, "i_channel_subscribe_power", 25, true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channeladdperm", { cid: 10, permsid: "i_channel_subscribe_power", permvalue: 25 }).calledOnce)
  })

  it("should test parameters of #channelDelPerm()", async () => {
    await ts3.channelDelPerm(10, "i_channel_subscribe_power", true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channeldelperm", { cid: 10, permsid: "i_channel_subscribe_power" }).calledOnce)
  })

  it("should test parameters of #getClientByID()")

  it("should test parameters of #getClientByDBID()")

  it("should test parameters of #getClientByUID()")

  it("should test parameters of #getClientByName()")

  it("should test parameters of #clientInfo()", async () => {
    await ts3.clientInfo(20)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientinfo", { clid: 20 }).calledOnce)
  })

  it("should test parameters of #clientDBList()", async () => {
    await ts3.clientDBList()
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdblist", { start: 0, duration: 1000 }, ["-count"]).calledOnce)
  })

  it("should test parameters of #clientDBInfo()", async () => {
    await ts3.clientDBInfo(25)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdbinfo", { cldbid: 25 }).calledOnce)
  })

  it("should test parameters of #clientKick()", async () => {
    await ts3.clientKick(10, 4, "Kicked from Channel")
    assert(stub.calledOnce)
    assert(stub.withArgs("clientkick", { clid: 10, reasonid: 4, reasonmsg: "Kicked from Channel" }).calledOnce)
  })

  it("should test parameters of #clientMove()", async () => {
    await ts3.clientMove(25, 10)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientmove", { clid: 25, cid: 10, cpw: undefined }).calledOnce)
  })

  it("should test parameters of #clientPoke()", async () => {
    await ts3.clientPoke(10, "you have been poked")
    assert(stub.calledOnce)
    assert(stub.withArgs("clientpoke", { clid: 10, msg: "you have been poked" }).calledOnce)
  })

  it("should test parameters of #clientPermList()", async () => {
    await ts3.clientPermList(10, true)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientpermlist", { cldbid: 10 }, ["-permsid"]).calledOnce)
  })

  it("should test parameters of #clientAddPerm()", async () => {
    await ts3.clientAddPerm(10, "i_channel_subscribe_power", 25, true)
    assert(stub.calledOnce)
    assert(stub.withArgs(
      "clientaddperm",
      { cldbid: 10, permsid: "i_channel_subscribe_power", permvalue: 25, permskip: 0, permnegated: 0 })
      .calledOnce)
  })

  it("should test parameters of #clientDelPerm()", async () => {
    await ts3.clientDelPerm(10, "i_channel_subscribe_power", true)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdelperm", { cldbid: 10, permsid: "i_channel_subscribe_power" }).calledOnce)
  })

  it("should test parameters of #customSearch()", async () => {
    await ts3.customSearch("key", "fdsa")
    assert(stub.calledOnce)
    assert(stub.withArgs("customsearch", { ident: "key", pattern: "fdsa" }).calledOnce)
  })

  it("should test parameters of #customInfo()", async () => {
    await ts3.customInfo(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("custominfo", { cldbid: 10 }).calledOnce)
  })

  it("should test parameters of #customDelete()", async () => {
    await ts3.customDelete(10, "key")
    assert(stub.calledOnce)
    assert(stub.withArgs("customdelete", { cldbid: 10, ident: "key" }).calledOnce)
  })

  it("should test parameters of #customSet()", async () => {
    await ts3.customSet(10, "key", "value")
    assert(stub.calledOnce)
    assert(stub.withArgs("customset", { cldbid: 10, ident: "key", value: "value" }).calledOnce)
  })

  it("should test parameters of #sendTextMessage()", async () => {
    await ts3.sendTextMessage(10, 2, "message to channel chat")
    assert(stub.calledOnce)
    assert(stub.withArgs("sendtextmessage", { target: 10, targetmode: 2, msg: "message to channel chat" }).calledOnce)
  })

  it("should test parameters of #getServerGroupByID()")

  it("should test parameters of #getServerGroupByName()")

  it("should test parameters of #getChannelGroupByID()")

  it("should test parameters of #getChannelGroupByName()")

  it("should test parameters of #setClientChannelGroup()", async () => {
    await ts3.setClientChannelGroup(10, 5, 3)
    assert(stub.calledOnce)
    assert(stub.withArgs("setclientchannelgroup", { cgid: 10, cid: 5, cldbid: 3 }).calledOnce)
  })

  it("should test parameters of #deleteChannelGroup()", async () => {
    await ts3.deleteChannelGroup(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgroupdel", { cgid: 10, force: 0 }).calledOnce)
  })

  it("should test parameters of #channelGroupCopy()", async () => {
    await ts3.channelGroupCopy(10, 0, 1, "New Channel Group")
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgroupcopy", { scgid: 10, tcgid: 0, type: 1, name: "New Channel Group" }).calledOnce)
  })

  it("should test parameters of #channelGroupRename()", async () => {
    await ts3.channelGroupRename(10, "New Name")
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgrouprename", { cgid: 10, name: "New Name" }).calledOnce)
  })

  it("should test parameters of #channelGroupPermList()", async () => {
    await ts3.channelGroupPermList(10, true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgrouppermlist", { cgid: 10 }, ["-permsid"]).calledOnce)
  })

  it("should test parameters of #channelGroupAddPerm()", async () => {
    await ts3.channelGroupAddPerm(10, "i_channel_subscribe_power", 25, true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgroupaddperm", { cgid: 10, permsid: "i_channel_subscribe_power", permvalue: 25, permskip: 0, permnegated: 0 }).calledOnce)
  })

  it("should test parameters of #channelGroupDelPerm()", async () => {
    await ts3.channelGroupDelPerm(10, "i_channel_subscribe_power", true)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgroupdelperm", { cgid: 10, permsid: "i_channel_subscribe_power" }).calledOnce)
  })

  it("should test parameters of #channelGroupClientList()", async () => {
    await ts3.channelGroupClientList(10, 5)
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgroupclientlist", { cgid: 10, cid: 5 }).calledOnce)
  })

  it("should test parameters of #permOverview()", async () => {
    await ts3.permOverview(10, 5, 4)
    assert(stub.calledOnce)
    assert(stub.withArgs("permoverview", { cldbid: 10, cid: 5, permid: 4 }).calledOnce)
  })

  it("should test parameters of #permissionList()", async () => {
    await ts3.permissionList()
    assert(stub.calledOnce)
    assert(stub.withArgs("permissionlist").calledOnce)
  })

  it("should test parameters of #permIdGetByName()", async () => {
    await ts3.permIdGetByName(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("permidgetbyname", { permsid: 10 }).calledOnce)
  })

  describe("#permGet()", () => {
    it("should test with string parameter", async () => {
      await ts3.permGet("i_channel_subscribe_power")
      assert(stub.calledOnce)
      assert(stub.withArgs("permget", { permsid: "i_channel_subscribe_power" }).calledOnce)
    })
    it("should test with numeric parameter", async () => {
      await ts3.permGet(10)
      assert(stub.calledOnce)
      assert(stub.withArgs("permget", { permid: 10 }).calledOnce)
    })
  })

  describe("#permFind()", () => {
    it("should test with string parameter", async () => {
      await ts3.permFind("i_channel_subscribe_power")
      assert(stub.calledOnce)
      assert(stub.withArgs("permfind", { permsid: "i_channel_subscribe_power" }).calledOnce)
    })
    it("should test with numeric parameter", async () => {
      await ts3.permFind(10)
      assert(stub.calledOnce)
      assert(stub.withArgs("permfind", { permid: 10 }).calledOnce)
    })
  })

  it("should test parameters of #permGet()", async () => {
    await ts3.permGet()
    assert(stub.calledOnce)
    assert(stub.withArgs("permget").calledOnce)
  })

  it("should test parameters of #permFind()", async () => {
    await ts3.permFind("i_channel_subscribe_power")
    assert(stub.calledOnce)
    assert(stub.withArgs("permfind").calledOnce)
  })

  it("should test parameters of #permReset()", async () => {
    await ts3.permReset()
    assert(stub.calledOnce)
    assert(stub.withArgs("permreset").calledOnce)
  })

  it("should test parameters of #privilegekeyList()", async () => {
    await ts3.privilegekeyList()
    assert(stub.calledOnce)
    assert(stub.withArgs("privilegekeylist").calledOnce)
  })

  it("should test parameters of #privilegekeyAdd()", async () => {
    await ts3.privilegekeyAdd(0, 10, null, "Server Group Token")
    assert(stub.calledOnce)
    assert(stub.withArgs("privilegekeyadd", { tokentype: 0, tokenid1: 10, description: "Server Group Token" }).calledOnce)
  })

  it("should test parameters of #privilegekeyDelete()", async () => {
    await ts3.privilegekeyDelete("asdf")
    assert(stub.calledOnce)
    assert(stub.withArgs("privilegekeydelete", { token: "asdf" }).calledOnce)
  })

  it("should test parameters of #privilegekeyUse()", async () => {
    await ts3.privilegekeyUse("asdf")
    assert(stub.calledOnce)
    assert(stub.withArgs("privilegekeyuse", { token: "asdf" }).calledOnce)
  })

  it("should test parameters of #messageList()", async () => {
    await ts3.messageList()
    assert(stub.calledOnce)
    assert(stub.withArgs("messagelist").calledOnce)
  })

  it("should test parameters of #messageAdd()", async () => {
    await ts3.messageAdd("uniqueidentifier=", "title", "content")
    assert(stub.calledOnce)
    assert(stub.withArgs("messageadd", { cluid: "uniqueidentifier=", subject: "title", text: "content" }).calledOnce)
  })

  it("should test parameters of #messageDel()", async () => {
    await ts3.messageDel(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("messagedel", { msgid: 10 }).calledOnce)
  })

  it("should test parameters of #messageGet()", async () => {
    await ts3.messageGet(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("messageget", { msgid: 10 }).calledOnce)
  })

  it("should test parameters of #messageUpdate()", async () => {
    await ts3.messageUpdate(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("messageupdateflag", { msgid: 10, flag: 1 }).calledOnce)
  })

  it("should test parameters of #complainList()", async () => {
    await ts3.complainList(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("complainlist", { cldbid: 10 }).calledOnce)
  })

  it("should test parameters of #complainAdd()", async () => {
    await ts3.complainAdd(10, "message")
    assert(stub.calledOnce)
    assert(stub.withArgs("complainadd", { cldbid: 10, message: "message" }).calledOnce)
  })

  describe("#complainDel()", () => {
    it("should deletes all complaints for the given dbid", async () => {
      await ts3.complainDel(10)
      assert(stub.calledOnce)
      assert(stub.withArgs("complaindelall", { tcldbid: 10 }).calledOnce)
    })
    it("should delete only a single complaint", async () => {
      await ts3.complainDel(10, 15)
      assert(stub.calledOnce)
      assert(stub.withArgs("complaindel", { tcldbid: 10, fcldbid: 15 }).calledOnce)
    })
  })

  it("should test parameters of #banList()", async () => {
    await ts3.banList()
    assert(stub.calledOnce)
    assert(stub.withArgs("banlist").calledOnce)
  })

  it("should test parameters of #banAdd()", async () => {
    await ts3.banAdd("127.0.0.1", null, null, null, "spam")
    assert(stub.calledOnce)
    assert(stub.withArgs("banadd", { ip: "127.0.0.1", name: null, uid: null, time: null, banreason: "spam" }).calledOnce)
  })

  describe("#banDel()", () => {
    it("should remove a single ban", async () => {
      await ts3.banDel(10)
      assert(stub.calledOnce)
      assert(stub.withArgs("bandel", { banid: 10 }).calledOnce)
    })
    it("should remove all bans", async () => {
      await ts3.banDel()
      assert(stub.calledOnce)
      assert(stub.withArgs("bandelall").calledOnce)
    })
  })

  it("should test parameters of #logView()", async () => {
    await ts3.logView()
    assert(stub.calledOnce)
    assert(stub.withArgs("logview", { lines: 1000, reverse: 0, instance: 0, begin_pos: 0 }).calledOnce)
  })

  it("should test parameters of #logAdd()", async () => {
    await ts3.logAdd(0, "custom message")
    assert(stub.calledOnce)
    assert(stub.withArgs("logadd", { loglevel: 0, logmsg: "custom message" }).calledOnce)
  })

  it("should test parameters of #gm()", async () => {
    await ts3.gm("Global Message")
    assert(stub.calledOnce)
    assert(stub.withArgs("gm", { msg: "Global Message" }).calledOnce)
  })

  it("should test parameters of #clientDBInfo()", async () => {
    await ts3.clientDBInfo(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdbinfo", { cldbid: 10 }).calledOnce)
  })

  it("should test parameters of #clientDBFind()", async () => {
    await ts3.clientDBFind("John Doe")
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdbfind", { pattern: "John Doe" }, []).calledOnce)
  })

  it("should test parameters of #clientDBEdit()", async () => {
    await ts3.clientDBEdit(10, { "foo": "bar" })
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdbedit", { cldbid: 10, foo: "bar" }).calledOnce)
  })

  it("should test parameters of #clientDBDelete()", async () => {
    await ts3.clientDBDelete(10 )
    assert(stub.calledOnce)
    assert(stub.withArgs("clientdbdelete", { cldbid: 10 }).calledOnce)
  })

  it("should test parameters of #serverList()", async () => {
    await ts3.serverList()
    assert(stub.calledOnce)
    assert(stub.withArgs("serverlist", ["-uid", "-all"]).calledOnce)
  })

  it("should test parameters of #channelGroupList()", async () => {
    await ts3.channelGroupList()
    assert(stub.calledOnce)
    assert(stub.withArgs("channelgrouplist").calledOnce)
  })

  it("should test parameters of #serverGroupList()", async () => {
    await ts3.serverGroupList()
    assert(stub.calledOnce)
    assert(stub.withArgs("servergrouplist").calledOnce)
  })

  it("should test parameters of #channelList()", async () => {
    await ts3.channelList()
    assert(stub.calledOnce)
    assert(stub.withArgs("channellist", ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty"]).calledOnce)
  })

  it("should test parameters of #clientList()", async () => {
    await ts3.clientList()
    assert(stub.calledOnce)
    assert(stub.withArgs("clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country"]).calledOnce)
  })

  it("should test parameters of #ftGetFileList()", async () => {
    await ts3.ftGetFileList(10)
    assert(stub.calledOnce)
    assert(stub.withArgs("ftgetfilelist", { cid: 10, path: "/", cpw: undefined }).calledOnce)
  })

  it("should test parameters of #ftGetFileInfo()", async () => {
    await ts3.ftGetFileInfo(10, "/file.txt")
    assert(stub.calledOnce)
    assert(stub.withArgs("ftgetfileinfo", { cid: 10, name: "/file.txt", cpw: undefined }).calledOnce)
  })

  it("should test parameters of #ftStop()", async () => {
    await ts3.ftStop(109100)
    assert(stub.calledOnce)
    assert(stub.withArgs("ftstop", { serverftfid: 109100, delete: 1 }).calledOnce)
  })

  it("should test parameters of #ftDeleteFile()", async () => {
    await ts3.ftDeleteFile(10, "/file.txt")
    assert(stub.calledOnce)
    assert(stub.withArgs("ftdeletefile", { cid: 10, name: "/file.txt", cpw: undefined }).calledOnce)
  })

  it("should test parameters of #ftCreateDir()", async () => {
    await ts3.ftCreateDir(10, "/folder")
    assert(stub.calledOnce)
    assert(stub.withArgs("ftcreatedir", { cid: 10, dirname: "/folder", "cpw": undefined }).calledOnce)
  })

  it("should test parameters of #ftRenameFile()", async () => {
    await ts3.ftRenameFile(10, "/file.txt", "/file2.txt", 11)
    assert(stub.calledOnce)
    assert(stub.withArgs("ftrenamefile", { cid: 10, oldname: "/file.txt", newname: "/file2.txt", tcid: 11, cpw: undefined, tcpw: undefined }).calledOnce)
  })

  it("should test parameters of #ftInitUpload()", async () => {
    await ts3.ftInitUpload({ clientftfid: 123 })
    assert(stub.calledOnce)
    assert(stub.withArgs("ftinitupload", { clientftfid: 123, cid: 0, resume: 0, overwrite: 1 }).calledOnce)
  })

  it("should test parameters of #ftInitDownload()", async () => {
    await ts3.ftInitDownload({ clientftfid: 123 })
    assert(stub.calledOnce)
    assert(stub.withArgs("ftinitdownload", { clientftfid: 123, cid: 0, seekpos: 0, path: "/", cpw: "" }).calledOnce)
  })




  describe("#filter()", () => {
    it("should filter an array of objects with 1 filter parameter", async () => {
      assert.deepEqual(await TeamSpeak3._filter(mockArray.ADVANCED, { foo: "bar" }), [mockArray.ADVANCED[0], mockArray.ADVANCED[2]])
    })

    it("should filter an array of objects with 2 filter parameters", async () => {
      assert.deepEqual(await TeamSpeak3._filter(mockArray.ADVANCED, { age: 40, foo: "baz" }), [mockArray.ADVANCED[1]])
    })
  })

  describe("#toArray()", () => {
    it("should convert undefined to an empty array", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(undefined), [])
    })
    it("should convert null to an empty array", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(null), [])
    })
    it("should convert a single string to an array with the string in it", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray("foo bar"), ["foo bar"])
    })
    it("should do nothing with an array as argument", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(["jane doe", "john doe"]), ["jane doe", "john doe"])
    })
  })

})
