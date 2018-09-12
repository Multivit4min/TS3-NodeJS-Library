const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakChannel = require("../property/Channel.js")
var TeamSpeak3 = require("../TeamSpeak3.js")


mockRequire("../transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../TeamSpeak3.js")



describe("TeamSpeakChannel", () => {

  beforeEach(() => {
    var ts3 = new TeamSpeak3()
    rawChannel = mockResponse.channellist[0]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    channel = new TeamSpeakChannel(ts3, rawChannel)
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
    await channel.setPerm("i_channel_subscribe_power", 25, true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeladdperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      cid: rawChannel.cid
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await channel.delPerm("i_channel_subscribe_power", true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channeldelperm", {
      permsid: "i_channel_subscribe_power",
      cid: rawChannel.cid
    })
  })

  it("should verify execute parameters of #getClients()", async () => {
    stub.onCall(0).resolves(mockResponse.clientlist[0])
    var clients = await channel.getClients()
    assert.match(Array.isArray(clients), true)
    clients.forEach(client => assert.match(client.constructor.name, "TeamSpeakClient"))
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    var name = await channel.getIconName()
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

})
