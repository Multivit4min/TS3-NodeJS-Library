/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
/* global describe beforeEach it */
const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakClient = require("../src/property/Client.js")
let TeamSpeak3 = require("../src/TeamSpeak3.js")

mockRequire("../src/transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../src/TeamSpeak3.js")



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

  it("should verify the getter value of #clid()", () => {
    assert.match(client.clid, rawClient.clid)
  })

  it("should verify the getter value of #cid()", () => {
    assert.match(client.cid, rawClient.cid)
  })

  it("should verify the getter value of #databaseId()", () => {
    assert.match(client.databaseId, rawClient.client_database_id)
  })

  it("should verify the getter value of #nickname()", () => {
    assert.match(client.nickname, rawClient.client_nickname)
  })

  it("should verify the getter value of #type()", () => {
    assert.match(client.type, rawClient.client_type)
  })

  it("should verify the getter value of #away()", () => {
    assert.match(client.away, rawClient.client_away)
  })

  it("should verify the getter value of #awayMessage()", () => {
    assert.match(client.awayMessage, rawClient.client_away_message)
  })

  it("should verify the getter value of #flagTalking()", () => {
    assert.match(client.flagTalking, rawClient.client_flag_talking)
  })

  it("should verify the getter value of #inputMuted()", () => {
    assert.match(client.inputMuted, rawClient.client_input_muted)
  })

  it("should verify the getter value of #outputMuted()", () => {
    assert.match(client.outputMuted, rawClient.client_output_muted)
  })

  it("should verify the getter value of #inputHardware()", () => {
    assert.match(client.inputHardware, rawClient.client_input_hardware)
  })

  it("should verify the getter value of #outputHardware()", () => {
    assert.match(client.outputHardware, rawClient.client_output_hardware)
  })

  it("should verify the getter value of #talkPower()", () => {
    assert.match(client.talkPower, rawClient.client_talk_power)
  })

  it("should verify the getter value of #isTalker()", () => {
    assert.match(client.isTalker, rawClient.client_is_talker)
  })

  it("should verify the getter value of #isPrioritySpeaker()", () => {
    assert.match(client.isPrioritySpeaker, rawClient.client_is_priority_speaker)
  })

  it("should verify the getter value of #isRecording()", () => {
    assert.match(client.isRecording, rawClient.client_is_recording)
  })

  it("should verify the getter value of #isChannelCommander()", () => {
    assert.match(client.isChannelCommander, rawClient.client_is_channel_commander)
  })

  it("should verify the getter value of #uniqueIdentifier()", () => {
    assert.match(client.uniqueIdentifier, rawClient.client_unique_identifier)
  })

  it("should verify the getter value of #servergroups()", () => {
    assert.match(client.servergroups, rawClient.client_servergroups)
  })

  it("should verify the getter value of #channelGroupId()", () => {
    assert.match(client.channelGroupId, rawClient.client_channel_group_id)
  })

  it("should verify the getter value of #channelGroupInheritedChannelId()", () => {
    assert.match(client.channelGroupInheritedChannelId, rawClient.client_channel_group_inherited_channel_id)
  })

  it("should verify the getter value of #version()", () => {
    assert.match(client.version, rawClient.client_version)
  })

  it("should verify the getter value of #platform()", () => {
    assert.match(client.platform, rawClient.client_platform)
  })

  it("should verify the getter value of #idleTime()", () => {
    assert.match(client.idleTime, rawClient.client_idle_time)
  })

  it("should verify the getter value of #created()", () => {
    assert.match(client.created, rawClient.client_created)
  })

  it("should verify the getter value of #lastconnected()", () => {
    assert.match(client.lastconnected, rawClient.client_lastconnected)
  })

  it("should verify the getter value of #country()", () => {
    assert.match(client.country, rawClient.client_country)
  })

  it("should verify the getter value of #connectionClientIp()", () => {
    assert.match(client.connectionClientIp, rawClient.connection_client_ip)
  })

  it("should verify the getter value of #badges()", () => {
    assert.match(client.badges, rawClient.client_badges)
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
        done(new Error("Event got fired which should not fire"))
      })
      ts3.emit("textmessage", {
        msg: "Text Message Content",
        // @ts-ignore
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
      ts3.emit("clientdisconnect", { client: client.toJSON() })
    })
    it("should check if the event gets not fired when its not meant for the client", function(done) {
      this.slow(4000)
      const timer = setTimeout(() => done(), 50)
      client.on("disconnect", () => {
        clearTimeout(timer)
        done(new Error("Event got fired which should not fire"))
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
        done(new Error("Event got fired which should not fire"))
      })
      ts3.emit("clientmoved", {
        channel: "Fake Payload",
        // @ts-ignore
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
      ip: undefined,
      name: undefined,
      uid: rawClient.client_unique_identifier,
      mytsid: undefined,
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
    stub.onCall(0).resolves([{ client_base64HashClientUID: base64uid }])
    assert.match(await client.getAvatarName(), base64uid)
    assert.calledOnce(stub)
    assert.calledWith(stub, "clientdbinfo", { cldbid: rawClient.client_database_id })
  })

  it("should validate the return value of #getIcon()", done => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    stub.onCall(1).resolves([{ size: 0, msg: "nok" }])
    client.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        assert.calledTwice(stub)
        assert.match(err.message, "nok")
        done()
      })
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await client.getIconName()
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

})