/*global describe beforeEach it*/
const { deepEqual } = require("assert")
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakChannelGroup = require("../src/property/ChannelGroup.js")
let TeamSpeak3 = require("../src/TeamSpeak3.js")

mockRequire("../src/transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../src/TeamSpeak3.js")



describe("TeamSpeakServerGroup", () => {
  let rawGroup = null
  let stub = null
  let channelGroup = null

  beforeEach(() => {
    const ts3 = new TeamSpeak3()
    rawGroup = mockResponse.channelgrouplist[0]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    channelGroup = new TeamSpeakChannelGroup(ts3, rawGroup)
  })

  it("should verify the return value of #getNameSpace()", () => {
    assert.match(channelGroup.getNameSpace(), "channelgroup")
  })

  it("should verify execute parameters of #del()", async () => {
    await channelGroup.del(1)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupdel", { cgid: rawGroup.cgid, force: 1 })
  })

  it("should verify execute parameters of #copy()", async () => {
    await channelGroup.copy(0, 1, "New ChannelGroup")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupcopy", {
      scgid: rawGroup.cgid,
      tcgid: 0,
      type: 1,
      name: "New ChannelGroup"
    })
  })

  it("should verify execute parameters of #rename()", async () => {
    await channelGroup.rename("New Group Name")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgrouprename", { cgid: rawGroup.cgid, name: "New Group Name" })
  })

  it("should verify execute parameters of #permList()", async () => {
    await channelGroup.permList(true)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgrouppermlist", { cgid: rawGroup.cgid }, ["-permsid"])
  })

  it("should verify execute parameters of #addPerm()", async () => {
    await channelGroup.addPerm("i_channel_subscribe_power", 25)
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupaddperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      cgid: rawGroup.cgid,
      permskip: 0,
      permnegated: 0
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await channelGroup.delPerm("i_channel_subscribe_power")
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupdelperm", {
      permsid: "i_channel_subscribe_power",
      cgid: rawGroup.cgid
    })
  })

  it("should verify execute parameters of #setClient()", async () => {
    await channelGroup.setClient(4, 5)
    assert.calledOnce(stub)
    assert.calledWith(stub, "setclientchannelgroup", {
      cldbid: 5,
      cid: 4,
      cgid: rawGroup.cgid
    })
  })

  it("should verify execute parameters of #clientList()", async () => {
    await channelGroup.clientList()
    assert.calledOnce(stub)
    assert.calledWith(stub, "channelgroupclientlist", { cgid: rawGroup.cgid })
  })

  it("should validate the return value of #getIcon()", done => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    stub.onCall(1).resolves({ size: 0, msg: "nok" })
    channelGroup.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        assert.calledTwice(stub)
        assert.match(err.message, "nok")
        done()
      })
  })

  it("should validate the return value of #getIconName()", async () => {
    stub.onCall(0).resolves([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await channelGroup.getIconName()
    assert.calledOnce(stub)
    deepEqual(name, "icon_9999")
  })

})