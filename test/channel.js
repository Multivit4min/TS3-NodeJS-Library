/*global describe beforeEach it*/
const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakChannel = require("../src/property/Channel.js")
let TeamSpeak3 = require("../src/TeamSpeak3.js")

mockRequire("../src/transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../src/TeamSpeak3.js")



describe("TeamSpeakChannel", () => {
  let ts3 = null
  let rawChannel = null
  let stub = null
  let channel = null

  beforeEach(() => {
    ts3 = new TeamSpeak3()
    rawChannel = mockResponse.channellist[0]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    channel = new TeamSpeakChannel(ts3, rawChannel)
  })

  it("should verify the getter value of #cid()", () => {
    assert.match(channel.cid, rawChannel.cid)
  })

  it("should verify the getter value of #pid()", () => {
    assert.match(channel.pid, rawChannel.pid)
  })

  it("should verify the getter value of #order()", () => {
    assert.match(channel.order, rawChannel.channel_order)
  })

  it("should verify the getter value of #name()", () => {
    assert.match(channel.name, rawChannel.channel_name)
  })

  it("should verify the getter value of #topic()", () => {
    assert.match(channel.topic, rawChannel.channel_topic)
  })

  it("should verify the getter value of #flagDefault()", () => {
    assert.match(channel.flagDefault, rawChannel.channel_flag_default)
  })

  it("should verify the getter value of #flagPassword()", () => {
    assert.match(channel.flagPassword, rawChannel.channel_flag_password)
  })

  it("should verify the getter value of #flagPermanent()", () => {
    assert.match(channel.flagPermanent, rawChannel.channel_flag_permanent)
  })

  it("should verify the getter value of #flagSemiPermanent()", () => {
    assert.match(channel.flagSemiPermanent, rawChannel.channel_flag_semi_permanent)
  })

  it("should verify the getter value of #codec()", () => {
    assert.match(channel.codec, rawChannel.channel_codec)
  })

  it("should verify the getter value of #codecQuality()", () => {
    assert.match(channel.codecQuality, rawChannel.channel_codec_quality)
  })

  it("should verify the getter value of #neededTalkPower()", () => {
    assert.match(channel.neededTalkPower, rawChannel.channel_needed_talk_power)
  })

  it("should verify the getter value of #iconId()", () => {
    assert.match(channel.iconId, rawChannel.channel_icon_id)
  })

  it("should verify the getter value of #secondsEmpty()", () => {
    assert.match(channel.secondsEmpty, rawChannel.seconds_empty)
  })

  it("should verify the getter value of #totalClientsFamily()", () => {
    assert.match(channel.totalClientsFamily, rawChannel.total_clients_family)
  })

  it("should verify the getter value of #maxclients()", () => {
    assert.match(channel.maxclients, rawChannel.channel_maxclients)
  })

  it("should verify the getter value of #maxfamilyclients()", () => {
    assert.match(channel.maxfamilyclients, rawChannel.channel_maxfamilyclients)
  })

  it("should verify the getter value of #totalClients()", () => {
    assert.match(channel.totalClients, rawChannel.total_clients)
  })

  it("should verify the getter value of #neededSubscribePower()", () => {
    assert.match(channel.neededSubscribePower, rawChannel.channel_needed_subscribe_power)
  })

  it("should verify the return value of #getNameSpace()", () => {
    assert.match(channel.getNameSpace(), "channel")
  })

  it("should verify execute parameters of #getInfo()", async () => {
    await channel.getInfo()
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelinfo", { cid: rawChannel.cid })
  })

  it("should verify execute parameters of #move()", async () => {
    await channel.move(1, 10)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelmove", { cid: rawChannel.cid, cpid: 1, order: 10 })
  })

  it("should verify execute parameters of #del()", async () => {
    await channel.del(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeldelete", { cid: rawChannel.cid, force: 1 })
  })

  it("should verify execute parameters of #edit()", async () => {
    await channel.edit({ a: "b", c: 1 })
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeledit", { cid: rawChannel.cid, a: "b", c: 1 })
  })

  it("should verify execute parameters of #permList()", async () => {
    await channel.permList(true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelpermlist", { cid: rawChannel.cid }, ["-permsid"])
  })

  it("should verify execute parameters of #setPerm()", async () => {
    await channel.setPerm("i_channel_subscribe_power", 25)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeladdperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      cid: rawChannel.cid
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await channel.delPerm("i_channel_subscribe_power")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeldelperm", {
      permsid: "i_channel_subscribe_power",
      cid: rawChannel.cid
    })
  })

  it("should verify execute parameters of #getClients()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist[0])
    const clients = await channel.getClients()
    assert.match(Array.isArray(clients), true)
    clients.forEach(client => assert.match(client.constructor.name, "TeamSpeakClient"))
  })

  it("should validate the return value of #getIcon()", done => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    stub.onCall(1).resolves({ size: 0, msg: "nok" })
    channel.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        assert.calledTwice(stub)
        assert.match(err.message, "nok")
        done()
      })
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await channel.getIconName()
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

})