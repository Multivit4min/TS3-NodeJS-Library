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
import { TeamSpeakServerGroup } from "../src/node/ServerGroup"
import { servergrouplist } from "./mocks/queryresponse"


describe("TeamSpeakServerGroup", () => {
  let raw: ReturnType<typeof servergrouplist>[0]
  let serverGroup: TeamSpeakServerGroup

  beforeEach(() => {
    const teamspeak = new TeamSpeak({})
    raw = servergrouplist(1)[0]
    serverGroup = new TeamSpeakServerGroup(teamspeak, raw)
    mockExecute.mockReset()
    mockExecute.mockResolvedValue([])
  })

  it("should verify the getter value of #sgid()", () => {
    expect(serverGroup.sgid).toBe(raw.sgid)
  })

  it("should verify the getter value of #name()", () => {
    expect(serverGroup.name).toBe(raw.name)
  })

  it("should verify the getter value of #type()", () => {
    expect(serverGroup.type).toBe(raw.type)
  })

  it("should verify the getter value of #iconid()", () => {
    expect(serverGroup.iconid).toBe(raw.iconid)
  })

  it("should verify the getter value of #savedb()", () => {
    expect(serverGroup.savedb).toBe(raw.savedb)
  })

  it("should verify the getter value of #sortid()", () => {
    expect(serverGroup.sortid).toBe(raw.sortid)
  })

  it("should verify the getter value of #namemode()", () => {
    expect(serverGroup.namemode).toBe(raw.namemode)
  })

  it("should verify the getter value of #nModifyp()", () => {
    expect(serverGroup.nModifyp).toBe(raw.nModifyp)
  })

  it("should verify the getter value of #nMemberAddp()", () => {
    expect(serverGroup.nMemberAddp).toBe(raw.nMemberAddp)
  })

  it("should verify the getter value of #nMemberRemovep()", () => {
    expect(serverGroup.nMemberRemovep).toBe(raw.nMemberRemovep)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(serverGroup.getNameSpace()).toBe("servergroup")
  })

  it("should verify execute parameters of #del()", async () => {
    await serverGroup.del(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdel", { sgid: raw.sgid, force: true })
  })

  it("should verify execute parameters of #copy()", async () => {
    await serverGroup.copy("0", 1, "New ServerGroup")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupcopy", {
      ssgid: raw.sgid,
      tsgid: "0",
      type: 1,
      name: "New ServerGroup"
    })
  })

  it("should verify execute parameters of #rename()", async () => {
    await serverGroup.rename("New Group Name")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergrouprename", { sgid: raw.sgid, name: "New Group Name" })
  })

  it("should verify execute parameters of #permList()", async () => {
    await serverGroup.permList(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergrouppermlist", { sgid: raw.sgid }, ["-permsid"])
  })

  it("should verify execute parameters of #addPerm()", async () => {
    await serverGroup.addPerm({ permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupaddperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      sgid: raw.sgid,
      permskip: false,
      permnegated: false
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await serverGroup.delPerm("i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdelperm", {
      permsid: "i_channel_subscribe_power",
      sgid: raw.sgid
    })
  })

  it("should verify execute parameters of #addClient()", async () => {
    await serverGroup.addClient("5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupaddclient", {
      cldbid: ["5"],
      sgid: raw.sgid
    })
  })

  it("should verify execute parameters of #delClient()", async () => {
    await serverGroup.delClient("5")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupdelclient", {
      cldbid: ["5"],
      sgid: raw.sgid
    })
  })

  it("should verify execute parameters of #clientList()", async () => {
    await serverGroup.clientList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("servergroupclientlist", { sgid: raw.sgid }, ["-names"])
  })

  it("should validate the return value of #getIcon()", done => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    mockExecute.mockResolvedValueOnce([{ size: 0, msg: "nok" }])
    serverGroup.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        expect(mockExecute).toHaveBeenCalledTimes(2)
        expect(err.message).toBe("nok")
        done()
      })
  })

  it("should validate the return value of #getIconId()", async () => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await serverGroup.getIconId()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toBe(9999)
  })

})