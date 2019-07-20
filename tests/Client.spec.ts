const mockExecute = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")

  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() {} }
  }

  TeamSpeakQuery.prototype.execute = mockExecute

  return { TeamSpeakQuery }
})

jest.mock("../src/transport/FileTransfer", () => {

  return { 
    FileTransfer: class FileTransfer {
      constructor() {}
      download() {
        return Promise.resolve(Buffer.from([]))
      }
      upload() {
        return Promise.resolve(Buffer.from([]))
      }
    }
 }
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
  })

  it("should verify the getter value of #clid()", () => {
    expect(client.clid).toBe(raw.clid)
  })

  it("should verify the getter value of #cid()", () => {
    expect(client.cid).toBe(raw.cid)
  })

  it("should verify the getter value of #databaseId()", () => {
    expect(client.databaseId).toBe(raw.client_database_id)
  })

  it("should verify the getter value of #nickname()", () => {
    expect(client.nickname).toBe(raw.client_nickname)
  })

  it("should verify the getter value of #type()", () => {
    expect(client.type).toBe(raw.client_type)
  })

  it("should verify the getter value of #away()", () => {
    expect(client.away).toBe(raw.client_away)
  })

  it("should verify the getter value of #awayMessage()", () => {
    expect(client.awayMessage).toBe(raw.client_away_message)
  })

  it("should verify the getter value of #flagTalking()", () => {
    expect(client.flagTalking).toBe(raw.client_flag_talking)
  })

  it("should verify the getter value of #inputMuted()", () => {
    expect(client.inputMuted).toBe(raw.client_input_muted)
  })

  it("should verify the getter value of #outputMuted()", () => {
    expect(client.outputMuted).toBe(raw.client_output_muted)
  })

  it("should verify the getter value of #inputHardware()", () => {
    expect(client.inputHardware).toBe(raw.client_input_hardware)
  })

  it("should verify the getter value of #outputHardware()", () => {
    expect(client.outputHardware).toBe(raw.client_output_hardware)
  })

  it("should verify the getter value of #talkPower()", () => {
    expect(client.talkPower).toBe(raw.client_talk_power)
  })

  it("should verify the getter value of #isTalker()", () => {
    expect(client.isTalker).toBe(raw.client_is_talker)
  })

  it("should verify the getter value of #isPrioritySpeaker()", () => {
    expect(client.isPrioritySpeaker).toBe(raw.client_is_priority_speaker)
  })

  it("should verify the getter value of #isRecording()", () => {
    expect(client.isRecording).toBe(raw.client_is_recording)
  })

  it("should verify the getter value of #isChannelCommander()", () => {
    expect(client.isChannelCommander).toBe(raw.client_is_channel_commander)
  })

  it("should verify the getter value of #uniqueIdentifier()", () => {
    expect(client.uniqueIdentifier).toBe(raw.client_unique_identifier)
  })

  it("should verify the getter value of #servergroups()", () => {
    expect(client.servergroups).toBe(raw.client_servergroups)
  })

  it("should verify the getter value of #channelGroupId()", () => {
    expect(client.channelGroupId).toBe(raw.client_channel_group_id)
  })

  it("should verify the getter value of #channelGroupInheritedChannelId()", () => {
    expect(client.channelGroupInheritedChannelId).toBe(raw.client_channel_group_inherited_channel_id)
  })

  it("should verify the getter value of #version()", () => {
    expect(client.version).toBe(raw.client_version)
  })

  it("should verify the getter value of #platform()", () => {
    expect(client.platform).toBe(raw.client_platform)
  })

  it("should verify the getter value of #idleTime()", () => {
    expect(client.idleTime).toBe(raw.client_idle_time)
  })

  it("should verify the getter value of #created()", () => {
    expect(client.created).toBe(raw.client_created)
  })

  it("should verify the getter value of #lastconnected()", () => {
    expect(client.lastconnected).toBe(raw.client_lastconnected)
  })

  it("should verify the getter value of #country()", () => {
    expect(client.country).toBe(raw.client_country)
  })

  it("should verify the getter value of #connectionClientIp()", () => {
    expect(client.connectionClientIp).toBe(raw.connection_client_ip)
  })

  it("should verify the getter value of #badges()", () => {
    expect(client.badges).toBe(raw.client_badges)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(client.getNameSpace()).toBe("client")
  })

  it("should verify return parameters of #isQuery()", () => {
    expect(client.isQuery()).toBe(raw.client_type === 1)
  })

  it("should verify return parameters of #getURL()", () => {
    const { clid, client_unique_identifier, client_nickname } = raw
    expect(client.getUrl()).toBe(`[URL=client://${clid}/${client_unique_identifier}~${encodeURIComponent(client_nickname)}]${client_nickname}[/URL]`)
  })

  it("should verify execute parameters of #getInfo()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.getInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientinfo", { clid: raw.clid })
  })

  it("should verify execute parameters of #getDBInfo()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.getDBInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: raw.client_database_id })
  })

  it("should verify execute parameters of #customInfo()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.customInfo()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("custominfo", { cldbid: raw.client_database_id })
  })

  it("should verify execute parameters of #customDelete()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.customDelete("key")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customdelete", { cldbid: raw.client_database_id, ident: "key" })
  })

  it("should verify execute parameters of #customSet()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.customSet("key", "value")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("customset", {
      cldbid: raw.client_database_id,
      ident: "key",
      value: "value"
    })
  })

  it("should verify execute parameters of #kickFromServer()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.kickFromServer("Kick Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientkick", {
      clid: raw.clid,
      reasonid: 5,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #kickFromChannel()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.kickFromChannel("Kick Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientkick", {
      clid: raw.clid,
      reasonid: 4,
      reasonmsg: "Kick Message"
    })
  })

  it("should verify execute parameters of #ban()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.ban("Ban Reason", 60)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("banadd", {
      ip: undefined,
      name: undefined,
      uid: raw.client_unique_identifier,
      mytsid: undefined,
      time: 60,
      banreason: "Ban Reason"
    })
  })

  it("should verify execute parameters of #move()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.move(10, "channel password")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientmove", {
      clid: raw.clid,
      cid: 10,
      cpw: "channel password"
    })
  })

  it("should verify execute parameters of #addGroups()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.addGroups([1, 5])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddservergroup", {
      cldbid: raw.client_database_id,
      sgid: [1, 5]
    })
  })

  it("should verify execute parameters of #delGroups()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.delGroups([1, 5])
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelservergroup", {
      cldbid: raw.client_database_id,
      sgid: [1, 5]
    })
  })

  it("should verify execute parameters of #dbEdit()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.dbEdit({ client_description: "test" })
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbedit", {
      cldbid: raw.client_database_id,
      client_description: "test"
    })
  })

  it("should verify execute parameters of #poke()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.poke("poke message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientpoke", {
      clid: raw.clid,
      msg: "poke message"
    })
  })

  it("should verify execute parameters of #message()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.message("chat message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("sendtextmessage", {
      targetmode: 1,
      target: raw.clid,
      msg: "chat message"
    })
  })

  it("should verify execute parameters of #permList()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.permList(true)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith(
      "clientpermlist",
      { cldbid: raw.client_database_id },
      ["-permsid"]
    )
  })

  it("should verify execute parameters of #addPerm()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.addPerm("i_channel_subscribe_power", 25, 0, 0)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientaddperm", {
      permsid: "i_channel_subscribe_power",
      permskip: 0,
      permnegated: 0,
      permvalue: 25,
      cldbid: raw.client_database_id
    })
  })

  it("should verify execute parameters of #delPerm()", async () => {
    mockExecute.mockResolvedValue(null)
    await client.delPerm("i_channel_subscribe_power")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdelperm", {
      permsid: "i_channel_subscribe_power",
      cldbid: raw.client_database_id
    })
  })

  it("should verify execute parameters of #getAvatarName()", async () => {
    const base64uid = Buffer.from(raw.client_unique_identifier).toString("base64")
    mockExecute.mockResolvedValue([{ client_base64HashClientUID: base64uid }])
    expect(await client.getAvatarName()).toBe(`avatar_${base64uid}`)
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("clientdbinfo", { cldbid: raw.client_database_id })
  })

  it("should verify parameters of #getAvatar()", async () => {
    const base64uid = Buffer.from(raw.client_unique_identifier).toString("base64")
    mockExecute.mockResolvedValueOnce([{ client_base64HashClientUID: base64uid }])
    mockExecute.mockResolvedValueOnce([{ ftkey: "fooKey", size: 10 }])
    await client.getAvatar()
    expect(mockExecute).toHaveBeenCalledTimes(2)
    
    expect(mockExecute.mock.calls[0]).toEqual(["clientdbinfo", { cldbid: raw.client_database_id }])
    expect(mockExecute.mock.calls[1][0]).toEqual("ftinitdownload")
    expect(mockExecute.mock.calls[1][1]).toHaveProperty("name", "/avatar_Zm9vYmFyMT0=")
  })

  it("should validate the return value of #getIcon()", done => {
    mockExecute.mockResolvedValueOnce([{ permsid: "i_icon_id", permvalue: 9999 }])
    mockExecute.mockResolvedValueOnce([{ size: 0, msg: "nok" }])
    client.getIcon()
      .then(() => done("Expected Promise to reject!"))
      .catch(err => {
        expect(mockExecute).toHaveBeenCalledTimes(2)
        expect(err.message).toBe("nok")
        done()
      })
  })

  it("should validate the return value of #getIconName()", async () => {
    mockExecute.mockResolvedValue([{ permsid: "i_icon_id", permvalue: 9999 }])
    const name = await client.getIconName()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(name).toBe("icon_9999")
  })

})