const mockExecute = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")

  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() {}, isConnected() {} }
  }

  TeamSpeakQuery.prototype.execute = mockExecute

  return { TeamSpeakQuery }
})


jest.mock("../src/transport/FileTransfer", () => {

  class FileTransfer {
    constructor() {}
    download() {
      return Promise.resolve(Buffer.from([]))
    }
    upload() {
      return Promise.resolve(Buffer.from([]))
    }
  }

  return { FileTransfer }
})

import { TeamSpeak } from "../src/TeamSpeak"
import { TeamSpeakClient } from "../src/node/Client"
import { clientlist } from "./mocks/queryresponse"

describe("TeamSpeakClient", () => {
  let teamspeak: TeamSpeak
  let raw: ReturnType<typeof clientlist>[0]
  let client: TeamSpeakClient

  beforeEach(() => {
    teamspeak = new TeamSpeak({})
    raw = clientlist(1)[0]
    client = new TeamSpeakClient(teamspeak, raw)
    mockExecute.mockReset()
    mockExecute.mockResolvedValue([])
  })

  it("should verify the getter value of #clid()", () => {
    expect(client.clid).toBe(raw.clid)
  })

  it("should verify the getter value of #cid()", () => {
    expect(client.cid).toBe(raw.cid)
  })

  it("should verify the getter value of #databaseId()", () => {
    expect(client.databaseId).toBe(raw.clientDatabaseId)
  })

  it("should verify the getter value of #nickname()", () => {
    expect(client.nickname).toBe(raw.clientNickname)
  })

  it("should verify the getter value of #type()", () => {
    expect(client.type).toBe(raw.clientType)
  })

  it("should verify the getter value of #away()", () => {
    expect(client.away).toBe(raw.clientAway)
  })

  it("should verify the getter value of #awayMessage()", () => {
    expect(client.awayMessage).toBe(raw.clientAwayMessage)
  })

  it("should verify the getter value of #flagTalking()", () => {
    expect(client.flagTalking).toBe(raw.clientFlagTalking)
  })

  it("should verify the getter value of #inputMuted()", () => {
    expect(client.inputMuted).toBe(raw.clientInputMuted)
  })

  it("should verify the getter value of #outputMuted()", () => {
    expect(client.outputMuted).toBe(raw.clientOutputMuted)
  })

  it("should verify the getter value of #inputHardware()", () => {
    expect(client.inputHardware).toBe(raw.clientInputHardware)
  })

  it("should verify the getter value of #outputHardware()", () => {
    expect(client.outputHardware).toBe(raw.clientOutputHardware)
  })

  it("should verify the getter value of #talkPower()", () => {
    expect(client.talkPower).toBe(raw.clientTalkPower)
  })

  it("should verify the getter value of #isTalker()", () => {
    expect(client.isTalker).toBe(raw.clientIsTalker)
  })

  it("should verify the getter value of #isPrioritySpeaker()", () => {
    expect(client.isPrioritySpeaker).toBe(raw.clientIsPrioritySpeaker)
  })

  it("should verify the getter value of #isRecording()", () => {
    expect(client.isRecording).toBe(raw.clientIsRecording)
  })

  it("should verify the getter value of #isChannelCommander()", () => {
    expect(client.isChannelCommander).toBe(raw.clientIsChannelCommander)
  })

  it("should verify the getter value of #uniqueIdentifier()", () => {
    expect(client.uniqueIdentifier).toBe(raw.clientUniqueIdentifier)
  })

  it("should verify the getter value of #servergroups()", () => {
    expect(client.servergroups).toBe(raw.clientServergroups)
  })

  it("should verify the getter value of #channelGroupId()", () => {
    expect(client.channelGroupId).toBe(raw.clientChannelGroupId)
  })

  it("should verify the getter value of #channelGroupInheritedChannelId()", () => {
    expect(client.channelGroupInheritedChannelId).toBe(raw.clientChannelGroupInheritedChannelId)
  })

  it("should verify the getter value of #version()", () => {
    expect(client.version).toBe(raw.clientVersion)
  })

  it("should verify the getter value of #platform()", () => {
    expect(client.platform).toBe(raw.clientPlatform)
  })

  it("should verify the getter value of #idleTime()", () => {
    expect(client.idleTime).toBe(raw.clientIdleTime)
  })

  it("should verify the getter value of #created()", () => {
    expect(client.created).toBe(raw.clientCreated)
  })

  it("should verify the getter value of #lastconnected()", () => {
    expect(client.lastconnected).toBe(raw.clientLastconnected)
  })

  it("should verify the getter value of #country()", () => {
    expect(client.country).toBe(raw.clientCountry)
  })

  it("should verify the getter value of #connectionClientIp()", () => {
    expect(client.connectionClientIp).toBe(raw.connectionClientIp)
  })

  it("should verify the getter value of #badges()", () => {
    expect(client.badges).toBe(raw.clientBadges)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(client.getNameSpace()).toBe("client")
  })

  it("should verify return parameters of #isQuery()", () => {
    expect(client.isQuery()).toBe(raw.clientType === 1)
  })

  it("should verify return parameters of #getURL()", () => {
    const { clid, clientUniqueIdentifier, clientNickname } = raw
    expect(client.getUrl()).toBe(`[URL=client://${clid}/${clientUniqueIdentifier}~${encodeURIComponent(clientNickname)}]${clientNickname}[/URL]`)
  })

  it("should verify execute parameters of #getInfo()", async () => {
    await client.getInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientinfo", { clid: [raw.clid] })
  })

  it("should verify execute parameters of #edit()", async () => {
    await client.edit({ clientIsTalker: false })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientedit", { clid: raw.clid, clientIsTalker: false })
  })

  it("should verify execute parameters of #getDbInfo()", async () => {
    await client.getDBInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: [raw.clientDatabaseId] })
  })

  it("should verify execute parameters of #customInfo()", async () => {
    await client.customInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("custominfo", { cldbid: raw.clientDatabaseId })
  })

  it("should verify execute parameters of #customDelete()", async () => {
    await client.customDelete("key")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customdelete", { cldbid: raw.clientDatabaseId, ident: "key" })
  })

  it("should verify execute parameters of #customSet()", async () => {
    await client.customSet("key", "value")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customset", {
      cldbid: raw.clientDatabaseId,
      ident: "key",
      value: "value"
    })
  })

  it("should verify execute parameters of #kickFromServer()", async () => {
    await client.kickFromServer("Kick Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientkick", {
      clid: raw.clid,
      reasonid: 5,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #kickFromChannel()", async () => {
    await client.kickFromChannel("Kick Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientkick", {
      clid: raw.clid,
      reasonid: 4,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #ban()", async () => {
    await client.ban("Ban Reason", 60)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("banadd", {
      ip: undefined,
      name: undefined,
      uid: raw.clientUniqueIdentifier,
      mytsid: undefined,
      time: 60,
      banreason: "Ban Reason"
    })
  })

  it("should verify execute parameters of #move()", async () => {
    await client.move("10", "channel password")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientmove", {
      clid: raw.clid,
      cid: "10",
      cpw: "channel password"
    })
  })

  it("should verify execute parameters of #addGroups()", async () => {
    await client.addGroups(["1", "5"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddservergroup", {
      cldbid: raw.clientDatabaseId,
      sgid: ["1", "5"]
    })
  })

  it("should verify execute parameters of #delGroups()", async () => {
    await client.delGroups(["1", "5"])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelservergroup", {
      cldbid: raw.clientDatabaseId,
      sgid: ["1", "5"]
    })
  })

  it("should verify execute parameters of #dbEdit()", async () => {
    await client.dbEdit({ clientDescription: "test" })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbedit", {
      cldbid: raw.clientDatabaseId,
      clientDescription: "test"
    })
  })

  it("should verify execute parameters of #poke()", async () => {
    await client.poke("poke message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientpoke", {
      clid: raw.clid,
      msg: "poke message"
    })
  })

  it("should verify execute parameters of #message()", async () => {
    await client.message("chat message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("sendtextmessage", {
      targetmode: 1,
      target: raw.clid,
      msg: "chat message"
    })
  })

  it("should verify execute parameters of #permList()", async () => {
    await client.permList(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith(
      "clientpermlist",
      { cldbid: raw.clientDatabaseId },
      ["-permsid"]
    )
  })

  it("should verify execute parameters of #addPerm()", async () => {
    await client.addPerm({ permname: "i_channel_subscribe_power", permvalue: 25 })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddperm", {
      permsid: "i_channel_subscribe_power",
      permskip: false,
      permnegated: false,
      permvalue: 25,
      cldbid: raw.clientDatabaseId
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    await client.delPerm("i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelperm", {
      permsid: "i_channel_subscribe_power",
      cldbid: raw.clientDatabaseId
    })
  })

  it("should verify execute parameters of #getAvatarName()", async () => {
    const base64uid = Buffer.from(raw.clientUniqueIdentifier).toString("base64")
    mockExecute.mockResolvedValue([{ clientBase64HashClientUID: base64uid }])
    expect(await client.getAvatarName()).toBe(`avatar_${base64uid}`)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: [raw.clientDatabaseId] })
  })

  it("should verify parameters of #getAvatar()", async () => {
    const base64uid = Buffer.from(raw.clientUniqueIdentifier).toString("base64")
    mockExecute.mockResolvedValueOnce([{ clientBase64HashClientUID: base64uid }])
    mockExecute.mockResolvedValueOnce([{ ftkey: "fooKey", size: 10 }])
    await client.getAvatar()
    expect(mockExecute).toHaveBeenCalledTimes(2)
    
    expect(mockExecute.mock.calls[0]).toEqual(["clientdbinfo", { cldbid: [raw.clientDatabaseId] }])
    expect(mockExecute.mock.calls[1][0]).toEqual("ftinitdownload")
    expect(mockExecute.mock.calls[1][1]).toHaveProperty("name", "/avatar_Zm9vYmFyMT0=")
  })

  it("should validate the return value of #getIcon()", done => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: "9999" }])
    mockExecute.mockResolvedValueOnce([{ size: 0, msg: "nok" }])
    client.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        expect(mockExecute).toHaveBeenCalledTimes(2)
        expect(err.message).toBe("nok")
        done()
      })
  })

  it("should validate the return value of #getIconId()", async () => {
    mockExecute.mockResolvedValue([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await client.getIconId()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toBe(9999)
  })

})