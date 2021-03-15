import { TeamSpeak } from "../src/TeamSpeak"
import * as fs from "fs"

/**
 * for some reason teamspeak closes the connection when connecting directly after a disconnect
 */
const WAIT_TIME = 1500

const config = {
  host: process.env.TS3_HOST || "127.0.0.1",
  serverport: parseInt(process.env.TS3_SERVERPORT!, 10) || 9987,
  username: process.env.TS3_USERNAME || "serveradmin",
  password: process.env.TS3_PASSWORD || "abc123"
}

describe("Integration Test", () => {

  let teamspeak: TeamSpeak|null = null

  afterEach(async () => {
    if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
    teamspeak = null
    await TeamSpeak.wait(WAIT_TIME)
  })

  it("should connect to a TeamSpeak Server via RAW Query", async () => {
    expect.assertions(4)
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: TeamSpeak.QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
        nickname: "JEST RAW"
      })
      const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
      expect(typeof serverinfo).toBe("object")
      expect(typeof serverinfo.virtualserverName).toBe("string")
      expect(typeof whoami).toBe("object")
      expect(whoami.clientNickname).toBe("JEST RAW")
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
  })

  it("should connect to a TeamSpeak Server via SSH Query", async () => {
    expect.assertions(4)
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: TeamSpeak.QueryProtocol.SSH,
        queryport: parseInt(process.env.TS3_QUERYPORT_SSH!, 10) || 10022,
        nickname: "JEST SSH"
      })
      const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
      expect(typeof serverinfo).toBe("object")
      expect(typeof serverinfo.virtualserverName).toBe("string")
      expect(typeof whoami).toBe("object")
      expect(whoami.clientNickname).toBe("JEST SSH")
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
  })

  it("should test upload and download of a file", async () => {
    expect.assertions(1)
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: TeamSpeak.QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
        nickname: "JEST RAW"
      })
      const data = fs.readFileSync(`${__dirname}/mocks/filetransfer.png`)
      const id = await teamspeak.uploadIcon(data)
      const download = await teamspeak.downloadIcon(id)
      expect(download).toEqual(data)
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
  })

  it("should test receiving of an event", () => {
    expect.assertions(1)
    return new Promise<void>(async fulfill => {
      const servername = `event ${Math.floor(Math.random() * 10000)}`
      try {
        teamspeak = await TeamSpeak.connect({
          ...config,
          protocol: TeamSpeak.QueryProtocol.RAW,
          queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
          nickname: "JEST RAW"
        })
        teamspeak.once("serveredit", ev => {
          expect(ev.modified).toEqual({ virtualserverName: servername })
          if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
          fulfill()
        })
        await teamspeak.serverEdit({ virtualserverName: servername })
      } catch (e) {
        if (teamspeak instanceof TeamSpeak) {
          teamspeak.removeAllListeners()
          teamspeak.forceQuit()
        }
        throw e
      }
    })
  })

  it("should test reconnecting to a server", async () => {
    expect.assertions(6)
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: TeamSpeak.QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
        serverport: undefined
      })
      let whoami = await teamspeak.whoami()
      expect(typeof whoami).toBe("object")
      expect(whoami.clientNickname).toBe(undefined)
      expect(whoami.virtualserverPort).toBe(0)
      await teamspeak.useByPort(config.serverport, "JEST RAW 123")
      await teamspeak.forceQuit()
      await teamspeak.reconnect(1, WAIT_TIME)
      whoami = await teamspeak.whoami()
      expect(typeof whoami).toBe("object")
      expect(whoami.clientNickname).toBe("JEST RAW 123")
      expect(whoami.virtualserverPort).toBe(config.serverport)
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
  }, 10 * 1000)


  it("should test a failed connection", () => {
    expect.assertions(1)
    return expect(TeamSpeak.connect({
      ...config,
      protocol: TeamSpeak.QueryProtocol.RAW,
      queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
      serverport: -1
    })).rejects.toEqual(new Error("convert error"))
  })

})