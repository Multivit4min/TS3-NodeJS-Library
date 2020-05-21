const mockExecute = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")

  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() {}, isConnected() {} }
  }

  TeamSpeakQuery.prototype.execute = mockExecute

  return { TeamSpeakQuery }
})

import { TeamSpeak } from "../src/TeamSpeak"
import { TeamSpeakChannelGroup } from "../src/node/ChannelGroup"
import { channelgrouplist } from "./mocks/queryresponse"


describe("TeamSpeakChannelGroup", () => {
  let raw: ReturnType<typeof channelgrouplist>[0]
  let channelGroup: TeamSpeakChannelGroup

  beforeEach(() => {
    const teamspeak = new TeamSpeak({})
    raw = channelgrouplist(1)[0]
    channelGroup = new TeamSpeakChannelGroup(teamspeak, raw)
    mockExecute.mockReset()
    mockExecute.mockResolvedValue([])
  })

  it("should verify the getter value of #cgid()", () => {
    expect(channelGroup.cgid).toBe(raw.cgid)
  })

  it("should verify the getter value of #name()", () => {
    expect(channelGroup.name).toBe(raw.name)
  })

  it("should verify the getter value of #type()", () => {
    expect(channelGroup.type).toBe(raw.type)
  })

  it("should verify the getter value of #iconid()", () => {
    expect(channelGroup.iconid).toBe(raw.iconid)
  })

  it("should verify the getter value of #savedb()", () => {
    expect(channelGroup.savedb).toBe(raw.savedb)
  })

  it("should verify the getter value of #sortid()", () => {
    expect(channelGroup.sortid).toBe(raw.sortid)
  })

  it("should verify the getter value of #namemode()", () => {
    expect(channelGroup.namemode).toBe(raw.namemode)
  })

  it("should verify the getter value of #nModifyp()", () => {
    expect(channelGroup.nModifyp).toBe(raw.nModifyp)
  })

  it("should verify the getter value of #nMemberAddp()", () => {
    expect(channelGroup.nMemberAddp).toBe(raw.nMemberAddp)
  })

  it("should verify the getter value of #nMemberRemovep()", () => {
    expect(channelGroup.nMemberRemovep).toBe(raw.nMemberRemovep)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(channelGroup.getNameSpace()).toBe("channelgroup")
  })

  it("should verify execute parameters of #del(1)", async () => {
    await channelGroup.del(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdel", { cgid: raw.cgid, force: true })
  })

  it("should verify execute parameters of #del()", async () => {
    await channelGroup.del()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdel", { cgid: raw.cgid, force: false })
  })

  it("should verify execute parameters of #copy()", async () => {
    await channelGroup.copy("0", 1, "New ChannelGroup")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupcopy", {
      scgid: raw.cgid,
      tcgid: "0",
      type: 1,
      name: "New ChannelGroup"
    })
  })

  it("should verify execute parameters of #rename()", async () => {
    await channelGroup.rename("New Group Name")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouprename", { cgid: raw.cgid, name: "New Group Name" })
  })

  it("should verify execute parameters of #permList()", async () => {
    await channelGroup.permList(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouppermlist", { cgid: raw.cgid }, ["-permsid"])
  })

  it("should verify execute parameters of #permList()", async () => {
    await channelGroup.permList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgrouppermlist", { cgid: raw.cgid }, [null])
  })

  it("should verify execute parameters of #addPerm()", async () => {
    await channelGroup.addPerm({ permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupaddperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      cgid: raw.cgid,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await channelGroup.delPerm("i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupdelperm", {
      permsid: "i_channel_subscribe_power",
      cgid: raw.cgid
    })
  })

  it("should verify execute parameters of #setClient()", async () => {
    await channelGroup.setClient("4", "5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("setclientchannelgroup", {
      cldbid: "5",
      cid: "4",
      cgid: raw.cgid
    })
  })

  it("should verify execute parameters of #clientList()", async () => {
    await channelGroup.clientList("10")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelgroupclientlist", { cgid: raw.cgid, cid: "10" })
  })

  it("should validate the return value of #getIcon()", done => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: "9999" }])
    mockExecute.mockResolvedValueOnce([{ size: 0, msg: "nok" }])
    channelGroup.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        expect(mockExecute).toHaveBeenCalledTimes(2)
        expect(err.message).toBe("nok")
        done()
      })
  })

  it("should validate the return value of #getIconId()", async () => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await channelGroup.getIconId()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toBe(9999)
  })

})