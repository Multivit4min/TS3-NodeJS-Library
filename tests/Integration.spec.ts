import { TeamSpeak, QueryProtocol } from "../src/TeamSpeak"
import * as fs from "fs"
import * as crc32 from "crc-32"

const config = {
  host: process.env.TS3_HOST || "127.0.0.1",
  serverport: parseInt(process.env.TS3_SERVERPORT!, 10) || 9987,
  username: process.env.TS3_USERNAME || "serveradmin",
  password: process.env.TS3_PASSWORD || "abc123"
}

const wait = (time: number) => new Promise(fulfill => setTimeout(fulfill, time))

describe("Integration Test", () => {

  it("should connect to a TeamSpeak Server via RAW Query", async () => {
    let teamspeak: TeamSpeak|null = null
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
        nickname: "JEST RAW"
      })
      const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
      expect(typeof serverinfo).toBe("object")
      expect(typeof serverinfo.virtualserver_name).toBe("string")
      expect(typeof whoami).toBe("object")
      expect(whoami.client_nickname).toBe("JEST RAW")
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
    await wait(2000)
  })

  it("should connect to a TeamSpeak Server via SSH Query", async () => {
    let teamspeak: TeamSpeak|null = null
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: QueryProtocol.SSH,
        queryport: parseInt(process.env.TS3_QUERYPORT_SSH!, 10) || 10022,
        nickname: "JEST SSH"
      })
      const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
      expect(typeof serverinfo).toBe("object")
      expect(typeof serverinfo.virtualserver_name).toBe("string")
      expect(typeof whoami).toBe("object")
      expect(whoami.client_nickname).toBe("JEST SSH")
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
    await wait(2000)
  })

  it("should test upload and download of a file", async () => {
    let teamspeak: TeamSpeak|null = null
    try {
      teamspeak = await TeamSpeak.connect({
        ...config,
        protocol: QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
        nickname: "JEST RAW"
      })
      const data = fs.readFileSync(`${__dirname}/mocks/filetransfer.png`)
      const crc = crc32.buf(data)
      await teamspeak.uploadFile(`/icon_${crc >>> 0}`, data, 0)
      const download = await teamspeak.downloadIcon(`icon_${crc >>> 0}`)
      expect(crc).toEqual(crc32.buf(download))
      teamspeak.forceQuit()
    } catch (e) {
      if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
      throw e
    }
    await wait(2000)
  })

  it("should test receiving of an event", () => {
    return new Promise(async fulfill => {
      let teamspeak: TeamSpeak|null = null
      const servername = `event ${Math.floor(Math.random() * 10000)}`
      try {
        teamspeak = await TeamSpeak.connect({
          ...config,
          protocol: QueryProtocol.RAW,
          queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
          nickname: "JEST RAW"
        })
        teamspeak.once("serveredit", ev => {
          expect(ev.modified).toEqual({ virtualserver_name: servername })
          if (teamspeak instanceof TeamSpeak) teamspeak.forceQuit()
          fulfill()
        })
        await teamspeak.registerEvent("server")
        await teamspeak.serverEdit({ virtualserver_name: servername })
      } catch (e) {
        if (teamspeak instanceof TeamSpeak) {
          teamspeak.removeAllListeners()
          teamspeak.forceQuit()
        }
        throw e
      }
      await wait(2000)
    })
  })

  it("should test a failed connection", () => {
    expect.assertions(1)
    return expect(TeamSpeak.connect({
      ...config,
      protocol: QueryProtocol.RAW,
      queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10011,
      serverport: -1
    })).rejects.toEqual(new Error("convert error"))
  })

})