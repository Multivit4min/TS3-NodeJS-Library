const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockArray = require("./mocks/mockArray.js")
const mockResponse = require("./mocks/queryResponse.js")
var TeamSpeak3 = require("../TeamSpeak3.js")


mockRequire("../transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../TeamSpeak3.js")



describe("TeamSpeak3", () => {

  beforeEach(() => {
    ts3 = new TeamSpeak3()
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
  })

  it("should verify parameters of #clientUpdate()", async () => {
    await ts3.clientUpdate({ client_nickname: "Test" })
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientupdate", { client_nickname: "Test" })
  })

  describe("#registerEvent()", () => {
    it("should verify 2 parameters", async () => {
      await ts3.registerEvent("channel", 0)
      assert.calledOnce(stub)
      assert.calledWith(stub, "servernotifyregister", { event: "channel", id: 0 })
    })
    it("should verify 1 parameter", async () => {
      await ts3.registerEvent("channel")
      assert.calledOnce(stub)
      assert.calledWith(stub, "servernotifyregister", { event: "channel", id: undefined })
    })
  })

  it("should verify parameters of #login()", async () => {
    await ts3.login("serveradmin", "password")
    assert.calledOnce(stub)
    assert.calledWith(stub, "login", ["serveradmin", "password"])
  })

  it("should verify parameters of #logout()", async () => {
    await ts3.logout()
    assert.calledOnce(stub)
    assert.calledWith(stub, "logout")
  })

  it("should verify parameters of #version()", async () => {
    await ts3.version()
    assert.calledOnce(stub)
    assert.calledWith(stub, "version")
  })

  it("should verify parameters of #hostInfo()", async () => {
    await ts3.hostInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "hostinfo")
  })

  it("should verify parameters of #instanceInfo()", async () => {
    await ts3.instanceInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "instanceinfo")
  })

  it("should verify parameters of #instanceEdit()", async () => {
    await ts3.instanceEdit(mockArray.SIMPLE)
    assert.calledOnce(stub)
    assert.calledWith(stub, "instanceedit", mockArray.SIMPLE)
  })

  it("should verify parameters of #bindingList()", async () => {
    await ts3.bindingList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "bindinglist")
  })

  describe("#useByPort()", () => {
    it("should verify 2 parameters", async () => {
      await ts3.useByPort(9987, "Test")
      assert.calledOnce(stub)
      assert.calledWith(stub, "use", { port: 9987, client_nickname: "Test" })
    })
    it("should verify 1 parameter", async () => {
      await ts3.useByPort(9987)
      assert.calledOnce(stub)
      assert.calledWith(stub, "use", { port: 9987, client_nickname: undefined })
    })
  })

  describe("#useBySid()", () => {
    it("should verify 2 parameters", async () => {
      await ts3.useBySid(1, "Test")
      assert.calledOnce(stub)
      assert.calledWith(stub, "use", [1], { client_nickname: "Test" })
    })
    it("should verify 1 parameter", async () => {
      await ts3.useBySid(1)
      assert.calledOnce(stub)
      assert.calledWith(stub, "use", [1], { client_nickname: undefined })
    })
  })

  it("should verify parameters of #whoami()", async () => {
    await ts3.whoami()
    assert.calledOnce(stub)
    assert.calledWith(stub, "whoami")
  })

  it("should verify parameters of #serverInfo()", async () => {
    await ts3.serverInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverinfo")
  })

  it("should verify parameters of #serverIdGetByPort()", async () => {
    await ts3.serverIdGetByPort(9987)
    assert.calledOnce(stub)
    assert.calledWith(stub, "serveridgetbyport", { virtualserver_port: 9987 })
  })

  it("should verify parameters of #serverEdit()", async () => {
    await ts3.serverEdit(mockArray.SIMPLE)
    assert.calledOnce(stub)
    assert.calledWith(stub, "serveredit", mockArray.SIMPLE)
  })

  it("should verify parameters of #serverProcessStop()", async () => {
    await ts3.serverProcessStop("Shutdown")
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverprocessstop", { reasonmsg: "Shutdown" })
  })

  it("should verify parameters of #connectionInfo()", async () => {
    await ts3.connectionInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverrequestconnectioninfo")
  })

  it("should verify parameters of #serverCreate()", async () => {
    stub.onCall(0).resolves({ token: "servertoken", sid: 2 })
    await ts3.serverCreate({ virtualserver_name: "Server Name" })
    assert.calledTwice(stub)
    assert.calledWith(stub, "servercreate", { virtualserver_name: "Server Name" })
  })

  it("should verify parameters of #serverDelete()", async () => {
    await ts3.serverDelete(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverdelete", { sid: 1 })
  })

  it("should verify parameters of #serverStart()", async () => {
    await ts3.serverStart(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverstart", { sid: 1 })
  })

  describe("#serverStop()", () => {
    it("should verify 2 parameters", async () => {
      await ts3.serverStop(1, "Shutdown")
      assert.calledOnce(stub)
      assert.calledWith(stub, "serverstop", { sid: 1, reasonmsg: "Shutdown" })
    })
    it("should verify 1 parameter", async () => {
      await ts3.serverStop(1)
      assert.calledOnce(stub)
      assert.calledWith(stub, "serverstop", { sid: 1, reasonmsg: undefined })
    })
  })

  it("should verify parameters of #serverGroupCreate()", async () => {
    stub.onCall(0).resolves({ sgid: 2 })
    await ts3.serverGroupCreate("New Group", 1)
    assert.calledTwice(stub)
    assert.calledWith(stub, "servergroupadd", { name: "New Group", type: 1 })
  })

  it("should verify parameters of #serverGroupClientList()", async () => {
    await ts3.serverGroupClientList(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupclientlist", { sgid: 1 }, ["-names"])
  })

  it("should verify parameters of #serverGroupAddClient()", async () => {
    await ts3.serverGroupAddClient(1, 2)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupaddclient", { sgid: 2, cldbid: 1 })
  })

  it("should verify parameters of #serverGroupDelClient()", async () => {
    await ts3.serverGroupDelClient(1, 2)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupdelclient", { sgid: 2, cldbid: 1 })
  })

  it("should verify parameters of #serverGroupDel()", async () => {
    await ts3.serverGroupDel(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupdel", { sgid: 1, force: 0 })
  })

  it("should verify parameters of #serverGroupCopy()", async () => {
    await ts3.serverGroupCopy(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupcopy", { ssgid: 1, tsgid: 0, type: 1 })
  })

  it("should verify parameters of #serverGroupRename()", async () => {
    await ts3.serverGroupRename(1, "New Name")
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergrouprename", { sgid: 1, name: "New Name" })
  })

  describe("#serverGroupPermList()", () => {
    it("should verify 2 parameters", async () => {
      await ts3.serverGroupPermList(2, true)
      assert.calledOnce(stub)
      assert.calledWith(stub, "servergrouppermlist", { sgid: 2 }, ["-permsid"])
    })
    it("should verify 1 parameter", async () => {
      await ts3.serverGroupPermList(2)
      assert.calledOnce(stub)
      assert.calledWith(stub, "servergrouppermlist", { sgid: 2 }, [null])
    })
  })

  it("should verify parameters of #serverGroupAddPerm()", async () => {
    await ts3.serverGroupAddPerm(2, "i_channel_subscribe_power", 25, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupaddperm", {
      sgid: 2,
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: 0,
      permnegated: 0
    })
  })

  it("should verify parameters of #serverGroupDelPerm()", async () => {
    await ts3.serverGroupDelPerm(2, "i_channel_subscribe_power", true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupdelperm", {
      sgid: 2,
      permsid: "i_channel_subscribe_power"
    })
  })

  it("should verify parameters of #channelCreate()", async () => {
    stub.onCall(0).resolves({ cid: 2 })
    await ts3.channelCreate("Channel Name")
    assert.calledTwice(stub)
    assert.calledWith(stub, "channelcreate", { channel_name: "Channel Name" })
  })

  it("should verify parameters of #channelGroupCreate()", async () => {
    stub.onCall(0).resolves({ cigd: 2 })
    await ts3.channelGroupCreate("Channel Group Name", 0)
    assert.calledTwice(stub)
    assert.calledWith(stub, "channelgroupadd", { name: "Channel Group Name", type: 0 })
  })

  it("should verify parameters of #getChannelByID()", async () => {
    stub.onCall(0).resolves(mockResponse.channellist)
    var channel = await ts3.getChannelByID(3)
    assert.match(channel.constructor.name, "TeamSpeakChannel")
    assert.match(channel.getCache().cid, 3)
  })

  it("should verify parameters of #getChannelByName()", async () => {
      stub.onCall(0).resolves(mockResponse.channellist)
      var channel = await ts3.getChannelByName("Channel 3")
      assert.match(channel.constructor.name, "TeamSpeakChannel")
      assert.match(channel.getCache().cid, 3)
  })

  it("should verify parameters of #channelInfo()", async () => {
    await ts3.channelInfo(2)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelinfo", { cid: 2 })
  })

  it("should verify parameters of #channelMove()", async () => {
    await ts3.channelMove(10, 5)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelmove", { cid: 10, cpid: 5, order: 0 })
  })

  it("should verify parameters of #channelDelete()", async () => {
    await ts3.channelDelete(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeldelete", { cid: 10, force: 0 })
  })

  it("should verify parameters of #channelEdit()", async () => {
    await ts3.channelEdit(1, { channel_name: "new name" })
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeledit", { cid: 1, channel_name: "new name" })
  })

  it("should verify parameters of #channelPermList()", async () => {
    await ts3.channelPermList(10, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelpermlist", { cid: 10 }, ["-permsid"])
  })

  it("should verify parameters of #channelSetPerm()", async () => {
    await ts3.channelSetPerm(10, "i_channel_subscribe_power", 25, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeladdperm", {
      cid: 10,
      permsid: "i_channel_subscribe_power",
      permvalue: 25
    })
  })

  it("should verify parameters of #channelDelPerm()", async () => {
    await ts3.channelDelPerm(10, "i_channel_subscribe_power", true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeldelperm", {
      cid: 10,
      permsid: "i_channel_subscribe_power"
    })
  })

  it("should verify parameters of #getClientByID()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist)
    var client = await ts3.getClientByID(3)
    assert.match(client.constructor.name, "TeamSpeakClient")
    assert.match(client.getCache().clid, 3)
  })

  it("should verify parameters of #getClientByDBID()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist)
    var client = await ts3.getClientByDBID(4)
    assert.match(client.constructor.name, "TeamSpeakClient")
    assert.match(client.getCache().client_database_id, 4)
  })

  it("should verify parameters of #getClientByUID()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist)
    var client = await ts3.getClientByUID("NF61yPIiDvYuOJ/Bbeod84bw6dE=")
    assert.match(client.constructor.name, "TeamSpeakClient")
    assert.match(client.getCache().client_unique_identifier, "NF61yPIiDvYuOJ/Bbeod84bw6dE=")
  })

  it("should verify parameters of #getClientByName()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist)
    var channel = await ts3.getClientByName("Multivitamin | David")
    assert.match(channel.constructor.name, "TeamSpeakClient")
    assert.match(channel.getCache().client_nickname, "Multivitamin | David")
  })

  it("should verify parameters of #clientInfo()", async () => {
    await ts3.clientInfo(20)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientinfo", { clid: 20 })
  })

  it("should verify parameters of #clientDBList()", async () => {
    await ts3.clientDBList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdblist", { start: 0, duration: 1000 }, ["-count"])
  })

  it("should verify parameters of #clientDBInfo()", async () => {
    await ts3.clientDBInfo(25)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbinfo", { cldbid: 25 })
  })

  it("should verify parameters of #clientKick()", async () => {
    await ts3.clientKick(10, 4, "Kicked from Channel")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientkick", {
      clid: 10,
      reasonid: 4,
      reasonmsg: "Kicked from Channel"
    })
  })

  it("should verify parameters of #clientMove()", async () => {
    await ts3.clientMove(25, 10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientmove", { clid: 25, cid: 10, cpw: undefined })
  })

  it("should verify parameters of #clientPoke()", async () => {
    await ts3.clientPoke(10, "you have been poked")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientpoke", { clid: 10, msg: "you have been poked" })
  })

  it("should verify parameters of #clientPermList()", async () => {
    await ts3.clientPermList(10, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientpermlist", { cldbid: 10 }, ["-permsid"])
  })

  it("should verify parameters of #clientAddPerm()", async () => {
    await ts3.clientAddPerm(10, "i_channel_subscribe_power", 25, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientaddperm", {
      cldbid: 10,
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: 0,
      permnegated: 0
    })
  })

  it("should verify parameters of #clientDelPerm()", async () => {
    await ts3.clientDelPerm(10, "i_channel_subscribe_power", true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdelperm", { cldbid: 10, permsid: "i_channel_subscribe_power" })
  })

  it("should verify parameters of #customSearch()", async () => {
    await ts3.customSearch("key", "fdsa")
    assert.calledOnce(stub)
    assert.calledWith(stub, "customsearch", { ident: "key", pattern: "fdsa" })
  })

  it("should verify parameters of #customInfo()", async () => {
    await ts3.customInfo(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "custominfo", { cldbid: 10 })
  })

  it("should verify parameters of #customDelete()", async () => {
    await ts3.customDelete(10, "key")
    assert.calledOnce(stub)
    assert.calledWith(stub, "customdelete", { cldbid: 10, ident: "key" })
  })

  it("should verify parameters of #customSet()", async () => {
    await ts3.customSet(10, "key", "value")
    assert.calledOnce(stub)
    assert.calledWith(stub, "customset", { cldbid: 10, ident: "key", value: "value" })
  })

  it("should verify parameters of #sendTextMessage()", async () => {
    await ts3.sendTextMessage(10, 2, "message to channel chat")
    assert.calledOnce(stub)
    assert.calledWith(stub, "sendtextmessage", {
      target: 10,
      targetmode: 2,
      msg: "message to channel chat"
    })
  })

  it("should verify parameters of #getServerGroupByID()", async () => {
    stub.onCall(0).resolves(mockResponse.servergrouplist)
    var group = await ts3.getServerGroupByID(4)
    assert.match(group.constructor.name, "TeamSpeakServerGroup")
    assert.match(group.getCache().name, "Normal")
  })

  it("should verify parameters of #getServerGroupByName()", async () => {
    stub.onCall(0).resolves(mockResponse.servergrouplist)
    var group = await ts3.getServerGroupByName("Normal")
    assert.match(group.constructor.name, "TeamSpeakServerGroup")
    assert.match(group.getCache().name, "Normal")
  })

  it("should verify parameters of #getChannelGroupByID()", async () => {
    stub.onCall(0).resolves(mockResponse.channelgrouplist)
    var group = await ts3.getChannelGroupByID(7)
    assert.match(group.constructor.name, "TeamSpeakChannelGroup")
    assert.match(group.getCache().cgid, 7)
  })

  it("should verify parameters of #getChannelGroupByName()", async () => {
    stub.onCall(0).resolves(mockResponse.channelgrouplist)
    var group = await ts3.getChannelGroupByName("Voice")
    assert.match(group.constructor.name, "TeamSpeakChannelGroup")
    assert.match(group.getCache().cgid, 7)
  })

  it("should verify parameters of #setClientChannelGroup()", async () => {
    await ts3.setClientChannelGroup(10, 5, 3)
    assert.calledOnce(stub)
    assert.calledWith(stub, "setclientchannelgroup", { cgid: 10, cid: 5, cldbid: 3 })
  })

  it("should verify parameters of #deleteChannelGroup()", async () => {
    await ts3.deleteChannelGroup(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupdel", { cgid: 10, force: 0 })
  })

  it("should verify parameters of #channelGroupCopy()", async () => {
    await ts3.channelGroupCopy(10, 0, 1, "New Channel Group")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupcopy", {
      scgid: 10,
      tcgid: 0,
      type: 1,
      name: "New Channel Group"
    })
  })

  it("should verify parameters of #channelGroupRename()", async () => {
    await ts3.channelGroupRename(10, "New Name")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgrouprename", { cgid: 10, name: "New Name" })
  })

  it("should verify parameters of #channelGroupPermList()", async () => {
    await ts3.channelGroupPermList(10, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgrouppermlist", { cgid: 10 }, ["-permsid"])
  })

  it("should verify parameters of #channelGroupAddPerm()", async () => {
    await ts3.channelGroupAddPerm(10, "i_channel_subscribe_power", 25, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupaddperm", {
      cgid: 10,
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      permskip: 0,
      permnegated: 0
    })
  })

  it("should verify parameters of #channelGroupDelPerm()", async () => {
    await ts3.channelGroupDelPerm(10, "i_channel_subscribe_power", true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupdelperm", {
      cgid: 10,
      permsid: "i_channel_subscribe_power"
    })
  })

  it("should verify parameters of #channelGroupClientList()", async () => {
    await ts3.channelGroupClientList(10, 5)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupclientlist", { cgid: 10, cid: 5 })
  })

  it("should verify parameters of #permOverview()", async () => {
    await ts3.permOverview(10, 5, 4)
    assert.calledOnce(stub)
    assert.calledWith(stub, "permoverview", { cldbid: 10, cid: 5, permid: 4 })
  })

  it("should verify parameters of #permissionList()", async () => {
    await ts3.permissionList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "permissionlist")
  })

  it("should verify parameters of #permIdGetByName()", async () => {
    await ts3.permIdGetByName(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "permidgetbyname", { permsid: 10 })
  })

  describe("#permGet()", () => {
    it("should verify with string parameter", async () => {
      await ts3.permGet("i_channel_subscribe_power")
      assert.calledOnce(stub)
      assert.calledWith(stub, "permget", { permsid: "i_channel_subscribe_power" })
    })
    it("should verify with numeric parameter", async () => {
      await ts3.permGet(10)
      assert.calledOnce(stub)
      assert.calledWith(stub, "permget", { permid: 10 })
    })
  })

  describe("#permFind()", () => {
    it("should verify with string parameter", async () => {
      await ts3.permFind("i_channel_subscribe_power")
      assert.calledOnce(stub)
      assert.calledWith(stub, "permfind", { permsid: "i_channel_subscribe_power" })
    })
    it("should verify with numeric parameter", async () => {
      await ts3.permFind(10)
      assert.calledOnce(stub)
      assert.calledWith(stub, "permfind", { permid: 10 })
    })
  })

  it("should verify parameters of #permGet()", async () => {
    await ts3.permGet()
    assert.calledOnce(stub)
    assert.calledWith(stub, "permget")
  })

  it("should verify parameters of #permFind()", async () => {
    await ts3.permFind("i_channel_subscribe_power")
    assert.calledOnce(stub)
    assert.calledWith(stub, "permfind")
  })

  it("should verify parameters of #permReset()", async () => {
    await ts3.permReset()
    assert.calledOnce(stub)
    assert.calledWith(stub, "permreset")
  })

  it("should verify parameters of #privilegeKeyList()", async () => {
    await ts3.privilegeKeyList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeylist")
  })

  it("should verify parameters of #privilegeKeyAdd()", async () => {
    await ts3.privilegeKeyAdd(0, 10, null, "Server Group Token")
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeyadd", {
      tokentype: 0,
      tokenid1: 10,
      description: "Server Group Token"
    })
  })

  it("should verify parameters of #serverGroupPrivilegeKeyAdd()", async () => {
    await ts3.serverGroupPrivilegeKeyAdd(10, "Server Group Token")
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeyadd", {
      tokentype: 0,
      tokenid1: 10,
      description: "Server Group Token"
    })
  })

  it("should verify parameters of #channelGroupPrivilegeKeyAdd()", async () => {
    await ts3.channelGroupPrivilegeKeyAdd(10, 5, "Channel Group Token")
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeyadd", {
      tokentype: 1,
      tokenid1: 10,
      tokenid2: 5,
      description: "Channel Group Token"
    })
  })

  it("should verify parameters of #privilegeKeyDelete()", async () => {
    await ts3.privilegeKeyDelete("asdf")
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeydelete", { token: "asdf" })
  })

  it("should verify parameters of #privilegeKeyUse()", async () => {
    await ts3.privilegeKeyUse("asdf")
    assert.calledOnce(stub)
    assert.calledWith(stub, "privilegekeyuse", { token: "asdf" })
  })

  it("should verify parameters of #messageList()", async () => {
    await ts3.messageList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "messagelist")
  })

  it("should verify parameters of #messageAdd()", async () => {
    await ts3.messageAdd("uniqueidentifier=", "title", "content")
    assert.calledOnce(stub)
    assert.calledWith(stub, "messageadd", {
      cluid: "uniqueidentifier=",
      subject: "title",
      text: "content"
    })
  })

  it("should verify parameters of #messageDel()", async () => {
    await ts3.messageDel(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "messagedel", { msgid: 10 })
  })

  it("should verify parameters of #messageGet()", async () => {
    await ts3.messageGet(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "messageget", { msgid: 10 })
  })

  it("should verify parameters of #messageUpdate()", async () => {
    await ts3.messageUpdate(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "messageupdateflag", { msgid: 10, flag: 1 })
  })

  it("should verify parameters of #complainList()", async () => {
    await ts3.complainList(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "complainlist", { cldbid: 10 })
  })

  it("should verify parameters of #complainAdd()", async () => {
    await ts3.complainAdd(10, "message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "complainadd", { cldbid: 10, message: "message" })
  })

  describe("#complainDel()", () => {
    it("should deletes all complaints for the given dbid", async () => {
      await ts3.complainDel(10)
      assert.calledOnce(stub)
      assert.calledWith(stub, "complaindelall", { tcldbid: 10 })
    })
    it("should delete only a single complaint", async () => {
      await ts3.complainDel(10, 15)
      assert.calledOnce(stub)
      assert.calledWith(stub, "complaindel", { tcldbid: 10, fcldbid: 15 })
    })
  })

  it("should verify parameters of #banList()", async () => {
    await ts3.banList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "banlist")
  })

  it("should verify parameters of #banAdd()", async () => {
    await ts3.banAdd("127.0.0.1", null, null, null, "spam")
    assert.calledOnce(stub)
    assert.calledWith(stub, "banadd", {
      ip: "127.0.0.1",
      name: null,
      uid: null,
      time: null,
      banreason: "spam"
    })
  })

  describe("#banDel()", () => {
    it("should remove a single ban", async () => {
      await ts3.banDel(10)
      assert.calledOnce(stub)
      assert.calledWith(stub, "bandel", { banid: 10 })
    })
    it("should remove all bans", async () => {
      await ts3.banDel()
      assert.calledOnce(stub)
      assert.calledWith(stub, "bandelall")
    })
  })

  it("should verify parameters of #logView()", async () => {
    await ts3.logView()
    assert.calledOnce(stub)
    assert.calledWith(stub, "logview", { lines: 1000, reverse: 0, instance: 0, begin_pos: 0 })
  })

  it("should verify parameters of #logAdd()", async () => {
    await ts3.logAdd(0, "custom message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "logadd", { loglevel: 0, logmsg: "custom message" })
  })

  it("should verify parameters of #gm()", async () => {
    await ts3.gm("Global Message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "gm", { msg: "Global Message" })
  })

  it("should verify parameters of #clientDBInfo()", async () => {
    await ts3.clientDBInfo(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbinfo", { cldbid: 10 })
  })

  it("should verify parameters of #clientDBFind()", async () => {
    await ts3.clientDBFind("John Doe")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbfind", { pattern: "John Doe" }, [])
  })

  it("should verify parameters of #clientDBEdit()", async () => {
    await ts3.clientDBEdit(10, { "foo": "bar" })
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbedit", { cldbid: 10, foo: "bar" })
  })

  it("should verify parameters of #clientDBDelete()", async () => {
    await ts3.clientDBDelete(10 )
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbdelete", { cldbid: 10 })
  })

  it("should verify parameters of #serverList()", async () => {
    await ts3.serverList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverlist", ["-uid", "-all"])
  })

  it("should verify parameters of #channelGroupList()", async () => {
    await ts3.channelGroupList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgrouplist")
  })

  it("should verify parameters of #serverGroupList()", async () => {
    await ts3.serverGroupList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergrouplist")
  })

  it("should verify parameters of #channelList()", async () => {
    await ts3.channelList()
    assert.calledOnce(stub)
    assert.calledWith(
      stub,
      "channellist",
      ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty"]
    )
  })

  it("should verify parameters of #clientList()", async () => {
    await ts3.clientList()
    assert.calledOnce(stub)
    assert.calledWith(
      stub,
      "clientlist",
      ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country"]
    )
  })

  it("should verify parameters of #ftGetFileList()", async () => {
    await ts3.ftGetFileList(10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftgetfilelist", { cid: 10, path: "/", cpw: undefined })
  })

  it("should verify parameters of #ftGetFileInfo()", async () => {
    await ts3.ftGetFileInfo(10, "/file.txt")
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftgetfileinfo", { cid: 10, name: "/file.txt", cpw: undefined })
  })

  it("should verify parameters of #ftStop()", async () => {
    await ts3.ftStop(109100)
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftstop", { serverftfid: 109100, delete: 1 })
  })

  it("should verify parameters of #ftDeleteFile()", async () => {
    await ts3.ftDeleteFile(10, "/file.txt")
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftdeletefile", { cid: 10, name: "/file.txt", cpw: undefined })
  })

  it("should verify parameters of #ftCreateDir()", async () => {
    await ts3.ftCreateDir(10, "/folder")
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftcreatedir", { cid: 10, dirname: "/folder", "cpw": undefined })
  })

  it("should verify parameters of #ftRenameFile()", async () => {
    await ts3.ftRenameFile(10, "/file.txt", "/file2.txt", 11)
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftrenamefile", {
      cid: 10,
      oldname: "/file.txt",
      newname: "/file2.txt",
      tcid: 11,
      cpw: undefined,
      tcpw: undefined
    })
  })

  it("should verify parameters of #ftInitUpload()", async () => {
    await ts3.ftInitUpload({ clientftfid: 123 })
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftinitupload", {
      clientftfid: 123,
      cid: 0,
      resume: 0,
      overwrite: 1
    })
  })

  it("should verify parameters of #ftInitDownload()", async () => {
    await ts3.ftInitDownload({ clientftfid: 123 })
    assert.calledOnce(stub)
    assert.calledWith(stub, "ftinitdownload", {
      clientftfid: 123,
      cid: 0,
      seekpos: 0,
      path: "/",
      cpw: ""
    })
  })

  it("should verify parameters of #quit()", async () => {
    await ts3.quit()
    assert.calledOnce(stub)
    assert.calledWith(stub, "quit")
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    var name = await ts3.getIconName(ts3.serverGroupPermList())
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

  it("should receive and handle the event clientconnect", done => {
    try {
      ts3.on("clientconnect", ev => {
        deepEqual(ev.client.constructor.name, "TeamSpeakClient")
        deepEqual(ev.client.getID(), 4)
        deepEqual(ev.cid, 10)
        done()
      })
      ts3._ts3.emit("cliententerview", {
        ctid: 10,
        client_unique_identifier: "uid=",
        clid: 4,
        client_database_id: 1,
        client_type: 0
      })
      assert.notCalled(stub)
    } catch(e) {
      done(e)
    }
  })

  it("should receive and handle the event clientdisconnect", done => {
    try {
      ts3.on("clientdisconnect", ev => {
        deepEqual(ev.event.clid, 4)
        done()
      })
      ts3._ts3.emit("clientleftview", { clid: 4 })
      assert.notCalled(stub)
    } catch(e) {
      done(e)
    }
  })

  it("should receive and handle the event textmessage", done => {
    stub.onCall(0).resolves({ client_unique_identifier: "uid=", clid: 10, client_database_id: 1, client_type: 0 })
    try {
      ts3.on("textmessage", ev => {
        deepEqual(ev.msg, "Message Content")
        deepEqual(ev.invoker.constructor.name, "TeamSpeakClient")
        deepEqual(ev.invoker.getID(), 10)
        deepEqual(ev.targetmode, 1)
        done()
      })
      ts3._ts3.emit("textmessage", { msg: "Message Content", invokerid: 10, targetmode: 1 })
      assert.calledOnce(stub)
    } catch(e) {
      done(e)
    }
  })

  it("should receive and handle the event clientmoved", done => {
    stub.onCall(0).resolves({ client_unique_identifier: "uid=", clid: 10, client_database_id: 1, client_type: 0 })
    stub.onCall(1).resolves({ cid: 3 })
    try {
      ts3.on("clientmoved", ev => {
        deepEqual(ev.client.constructor.name, "TeamSpeakClient")
        deepEqual(ev.client.getID(), 10)
        deepEqual(ev.channel.constructor.name, "TeamSpeakChannel")
        deepEqual(ev.channel.getCache().cid, 3)
        deepEqual(ev.reasonid, 4)
        done()
      })
      ts3._ts3.emit("clientmoved", { clid: 10, ctid: 3, reasonid: 4 })
      assert.calledTwice(stub)
    } catch(e) {
      done(e)
    }
  })




  describe("#filter()", () => {
    it("should filter an array of objects with 1 filter parameter", async () => {
      deepEqual(
        await TeamSpeak3._filter(mockArray.ADVANCED, { foo: "bar" }),
        [mockArray.ADVANCED[0], mockArray.ADVANCED[2]]
      )
    })

    it("should filter an array of objects with 2 filter parameters", async () => {
      deepEqual(
        await TeamSpeak3._filter(mockArray.ADVANCED, { age: 40, foo: "baz" }),
        [mockArray.ADVANCED[1]]
      )
    })
  })

  describe("#toArray()", () => {
    it("should convert undefined to an empty array", async () => {
      deepEqual(await TeamSpeak3.prototype.toArray(undefined), [])
    })
    it("should convert null to an empty array", async () => {
      deepEqual(await TeamSpeak3.prototype.toArray(null), [])
    })
    it("should convert a single string to an array with the string in it", async () => {
      deepEqual(await TeamSpeak3.prototype.toArray("foo bar"), ["foo bar"])
    })
    it("should do nothing with an array as argument", async () => {
      deepEqual(
        await TeamSpeak3.prototype.toArray(["jane doe", "john doe"]),
        ["jane doe", "john doe"]
      )
    })
  })

})
