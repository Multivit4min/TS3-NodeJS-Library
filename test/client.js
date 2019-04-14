/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
/*global describe beforeEach it*/
const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakClient = require("../property/Client.js")
let TeamSpeak3 = require("../TeamSpeak3.js")

mockRequire("../transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../TeamSpeak3.js")



describe("TeamSpeakClient", () => {
  let ts3 = null
  let rawClient = null
  let stub = null
  let client = null

  beforeEach(() => {
    ts3 = new TeamSpeak3()
    rawClient = mockResponse.clientlist[1]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    client = new TeamSpeakClient(ts3, rawClient)
  })

  it("should verify the return value of #getNameSpace()", () => {
    assert.match(client.getNameSpace(), "client")
  })

  it("should verify return parameters of #getDBID()", () => {
    assert.match(client.getDBID(), rawClient.client_database_id)
  })

  it("should verify return parameters of #getID()", () => {
    assert.match(client.getID(), rawClient.clid)
  })

  it("should verify return parameters of #getUID()", () => {
    assert.match(client.getUID(), rawClient.client_unique_identifier)
  })

  it("should verify return parameters of #isQuery()", () => {
    assert.match(client.isQuery(), rawClient.client_type === 1)
  })

  it("should verify return parameters of #getURL()", () => {
    const { clid, client_unique_identifier, client_nickname } = rawClient
    assert.match(
      client.getURL(),
      `[URL=client://${clid}/${client_unique_identifier}~${encodeURIComponent(client_nickname)}]${client_nickname}[/URL]`
    )
  })

  describe("event#textmessage", () => {
    it("should check if the event gets fired with correct parameters", done => {
      client.on("message", msg => {
        assert.match(msg, "Text Message Content")
        done()
      })
      ts3.emit("textmessage", { msg: "Text Message Content", invoker: client })
    })
    it("should check if the event gets not fired when its not meant for the client", function (done) {
      this.slow(4000)
      const timer = setTimeout(() => done(), 50)
      client.on("message", () => {
        clearTimeout(timer)
        done(Error("Event got fired which should not fire"))
      })
      ts3.emit("textmessage", {
        msg: "Text Message Content",
        invoker: new TeamSpeakClient(ts3, {
          client_unique_identifier: "bla=",
          clid: 25,
          client_database_id: 100,
          client_type: 0
        })
      })
    })
  })

  describe("event#disconnect", () => {
    it("should check if the event gets fired with correct parameters", done => {
      client.on("disconnect", () => done())
      ts3.emit("clientdisconnect", { client: client.getCache() })
    })
    it("should check if the event gets not fired when its not meant for the client", function(done) {
      this.slow(4000)
      const timer = setTimeout(() => done(), 50)
      client.on("disconnect", () => {
        clearTimeout(timer)
        done(Error("Event got fired which should not fire"))
      })
      ts3.emit("clientdisconnect", { client: { clid: 25 } })
    })
  })

  describe("event#move", () => {
    it("should check if the event gets fired with correct parameters", done => {
      client.on("move", channel => {
        assert.match(channel, "Fake Payload")
        done()
      })
      ts3.emit("clientmoved", { channel: "Fake Payload", client })
    })
    it("should check if the event gets not fired when its not meant for the client", function(done) {
      this.slow(4000)
      const timer = setTimeout(() => done(), 50)
      client.on("move", () => {
        clearTimeout(timer)
        done(Error("Event got fired which should not fire"))
      })
      ts3.emit("clientmoved", {
        channel: "Fake Payload",
        client: new TeamSpeakClient(ts3, {
          client_unique_identifier: "bla=",
          clid: 25,
          client_database_id: 100,
          client_type: 0
        })
      })
    })
  })

  it("should verify execute parameters of #getInfo()", async () => {
    await client.getInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientinfo", { clid: rawClient.clid })
  })

  it("should verify execute parameters of #getDBInfo()", async () => {
    await client.getDBInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbinfo", { cldbid: rawClient.client_database_id })
  })

  it("should verify execute parameters of #customInfo()", async () => {
    await client.customInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "custominfo", { cldbid: rawClient.client_database_id })
  })

  it("should verify execute parameters of #customDelete()", async () => {
    await client.customDelete("key")
    assert.calledOnce(stub)
    assert.calledWith(stub, "customdelete", { cldbid: rawClient.client_database_id, ident: "key" })
  })

  it("should verify execute parameters of #customSet()", async () => {
    await client.customSet("key", "value")
    assert.calledOnce(stub)
    assert.calledWith(stub, "customset", {
      cldbid: rawClient.client_database_id,
      ident: "key",
      value: "value"
    })
  })

  it("should verify execute parameters of #kickFromServer()", async () => {
    await client.kickFromServer("Kick Message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientkick", {
      clid: rawClient.clid,
      reasonid: 5,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #kickFromChannel()", async () => {
    await client.kickFromChannel("Kick Message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientkick", {
      clid: rawClient.clid,
      reasonid: 4,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #ban()", async () => {
    await client.ban("Ban Reason", 60)
    assert.calledOnce(stub)
    assert.calledWith(stub, "banadd", {
      ip: null,
      name: null,
      uid: rawClient.client_unique_identifier,
      time: 60,
      banreason: "Ban Reason"
    })
  })

  it("should verify execute parameters of #move()", async () => {
    await client.move(10, "channel password")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientmove", {
      clid: rawClient.clid,
      cid: 10,
      cpw: "channel password"
    })
  })

  it("should verify execute parameters of #serverGroupAdd()", async () => {
    await client.serverGroupAdd(5)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupaddclient", {
      cldbid: rawClient.client_database_id,
      sgid: 5
    })
  })

  it("should verify execute parameters of #serverGroupDel()", async () => {
    await client.serverGroupDel(5)
    assert.calledOnce(stub)
    assert.calledWith(stub, "servergroupdelclient", {
      cldbid: rawClient.client_database_id,
      sgid: 5
    })
  })

  it("should verify execute parameters of #poke()", async () => {
    await client.poke("poke message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientpoke", {
      clid: rawClient.clid,
      msg: "poke message"
    })
  })

  it("should verify execute parameters of #message()", async () => {
    await client.message("chat message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "sendtextmessage", {
      targetmode: 1,
      target: rawClient.clid,
      msg: "chat message"
    })
  })

  it("should verify execute parameters of #permList()", async () => {
    await client.permList(true)
    assert.calledOnce(stub)
    assert.calledWith(
      stub,
      "clientpermlist",
      { cldbid: rawClient.client_database_id },
      ["-permsid"]
    )
  })

  it("should verify execute parameters of #addPerm()", async () => {
    await client.addPerm("i_channel_subscribe_power", 25, 0, 0)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientaddperm", {
      permsid: "i_channel_subscribe_power",
      permskip: 0,
      permnegated: 0,
      permvalue: 25,
      cldbid: rawClient.client_database_id
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await client.delPerm("i_channel_subscribe_power")
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdelperm", {
      permsid: "i_channel_subscribe_power",
      cldbid: rawClient.client_database_id
    })
  })

  it("should verify execute parameters of #getAvatarName()", async () => {
    const base64uid = Buffer.from(rawClient.client_unique_identifier).toString("base64")
    stub.onCall(0).resolves({ client_base64HashClientUID: base64uid })
    assert.match(await client.getAvatarName(), base64uid)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbinfo", { cldbid: rawClient.client_database_id })
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await client.getIconName()
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

})