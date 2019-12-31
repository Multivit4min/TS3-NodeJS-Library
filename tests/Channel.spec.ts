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
import { TeamSpeakChannel } from "../src/node/Channel"
import { channellist, clientlist } from "./mocks/queryresponse"
import { TeamSpeakClient } from "../src/node/Client"



describe("TeamSpeakChannel", () => {
  let teamspeak: TeamSpeak
  let raw: ReturnType<typeof channellist>[0]
  let channel: TeamSpeakChannel

  beforeEach(() => {
    teamspeak = new TeamSpeak({})
    raw = channellist(1)[0]
    channel = new TeamSpeakChannel(teamspeak, raw)
    mockExecute.mockReset()
    mockExecute.mockResolvedValue(null)
  })

  it("should verify the getter value of #cid()", () => {
    expect(channel.cid).toBe(raw.cid)
  })

  it("should verify the getter value of #pid()", () => {
    expect(channel.pid).toBe(raw.pid)
  })

  it("should verify the getter value of #order()", () => {
    expect(channel.order).toBe(raw.channel_order)
  })

  it("should verify the getter value of #name()", () => {
    expect(channel.name).toBe(raw.channel_name)
  })

  it("should verify the getter value of #topic()", () => {
    expect(channel.topic).toBe(raw.channel_topic)
  })

  it("should verify the getter value of #flagDefault()", () => {
    expect(channel.flagDefault).toBe(raw.channel_flag_default)
  })

  it("should verify the getter value of #flagPassword()", () => {
    expect(channel.flagPassword).toBe(raw.channel_flag_password)
  })

  it("should verify the getter value of #flagPermanent()", () => {
    expect(channel.flagPermanent).toBe(raw.channel_flag_permanent)
  })

  it("should verify the getter value of #flagSemiPermanent()", () => {
    expect(channel.flagSemiPermanent).toBe(raw.channel_flag_semi_permanent)
  })

  it("should verify the getter value of #codec()", () => {
    expect(channel.codec).toBe(raw.channel_codec)
  })

  it("should verify the getter value of #codecQuality()", () => {
    expect(channel.codecQuality).toBe(raw.channel_codec_quality)
  })

  it("should verify the getter value of #neededTalkPower()", () => {
    expect(channel.neededTalkPower).toBe(raw.channel_needed_talk_power)
  })

  it("should verify the getter value of #iconId()", () => {
    expect(channel.iconId).toBe(raw.channel_icon_id)
  })

  it("should verify the getter value of #secondsEmpty()", () => {
    expect(channel.secondsEmpty).toBe(raw.seconds_empty)
  })

  it("should verify the getter value of #totalClientsFamily()", () => {
    expect(channel.totalClientsFamily).toBe(raw.total_clients_family)
  })

  it("should verify the getter value of #maxclients()", () => {
    expect(channel.maxclients).toBe(raw.channel_maxclients)
  })

  it("should verify the getter value of #maxfamilyclients()", () => {
    expect(channel.maxfamilyclients).toBe(raw.channel_maxfamilyclients)
  })

  it("should verify the getter value of #totalClients()", () => {
    expect(channel.totalClients).toBe(raw.total_clients)
  })

  it("should verify the getter value of #neededSubscribePower()", () => {
    expect(channel.neededSubscribePower).toBe(raw.channel_needed_subscribe_power)
  })

  it("should verify the getter value of #totalClients()", () => {
    expect(channel.bannerGfxUrl).toBe(raw.channel_banner_gfx_url)
  })

  it("should verify the getter value of #neededSubscribePower()", () => {
    expect(channel.bannerMode).toBe(raw.channel_banner_mode)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(channel.getNameSpace()).toBe("channel")
  })

  it("should verify execute parameters of #getInfo()", async () => {
    await channel.getInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelinfo", { cid: raw.cid })
  })

  it("should verify execute parameters of #move()", async () => {
    await channel.move(1, 10)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelmove", { cid: raw.cid, cpid: 1, order: 10 })
  })

  it("should verify execute parameters of #move()", async () => {
    await channel.move(1)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelmove", { cid: raw.cid, cpid: 1, order: 0 })
  })

  it("should verify execute parameters of #del()", async () => {
    await channel.del(1)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelete", { cid: raw.cid, force: 1 })
  })

  it("should verify execute parameters of #del()", async () => {
    await channel.del()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelete", { cid: raw.cid, force: 0 })
  })

  it("should verify execute parameters of #edit()", async () => {
    await channel.edit({ channel_codec_quality: 10, channel_name: "Test"})
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeledit", { cid: raw.cid, channel_codec_quality: 10, channel_name: "Test"})
  })

  it("should verify execute parameters of #permList()", async () => {
    await channel.permList(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelpermlist", { cid: raw.cid }, ["-permsid"])
  })

  it("should verify execute parameters of #permList()", async () => {
    await channel.permList()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channelpermlist", { cid: raw.cid }, [null])
  })

  it("should verify execute parameters of #setPerm()", async () => {
    await channel.setPerm("i_channel_subscribe_power", 25)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeladdperm", {
      permsid: "i_channel_subscribe_power",
      permvalue: 25,
      cid: raw.cid
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await channel.delPerm("i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("channeldelperm", {
      permsid: "i_channel_subscribe_power",
      cid: raw.cid
    })
  })

  it("should verify execute parameters of #getClients()", async () => {
    mockExecute.mockResolvedValueOnce(clientlist(1)[0])
    const clients = await channel.getClients()
    expect(Array.isArray(clients)).toBe(true)
    clients.forEach(client => expect(client).toBeInstanceOf(TeamSpeakClient))
  })

  it("should validate the return value of #getIcon()", done => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    mockExecute.mockResolvedValueOnce([{ size: 0, msg: "nok" }])
    channel.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch((err: Error) => {
        expect(mockExecute).toHaveBeenCalledTimes(2)
        expect(err.message).toBe("nok")
        done()
      })
  })

  it("should validate the return value of #getIconName()", async () => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await channel.getIconName()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toEqual("icon_9999")
  })

})