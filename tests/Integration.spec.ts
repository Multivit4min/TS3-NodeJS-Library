import { TeamSpeak, QueryProtocol } from "../src/TeamSpeak"

const config = {
  host: process.env.TS3_HOST || "127.0.0.1",
  serverport: parseInt(process.env.TS3_SERVERPORT!, 10) || 9987,
  username: process.env.TS3_USERNAME || "serveradmin",
  password: process.env.TS3_PASSWORD || "abc123"
}


describe("Integration Test", () => {
  let teamspeak: TeamSpeak

  afterEach(() => {
    if (teamspeak instanceof TeamSpeak) {
      teamspeak.removeAllListeners()
      teamspeak.forceQuit()
    }
  })

  it("should connect to a TeamSpeak Server via SSH Query", () => {
    return new Promise((fulfill, reject) => {
      let error: Error|null = null
      teamspeak = new TeamSpeak({
        ...config,
        protocol: QueryProtocol.SSH,
        queryport: parseInt(process.env.TS3_QUERYPORT_SSH!, 10) || 10022,
        nickname: "JEST SSH"
      })
  
      teamspeak.on("error", e => error = e)
      teamspeak.on("close", () => {
        if (error instanceof Error) return reject(error)
        fulfill()
      })
  
      teamspeak.on("ready", async () => {
        try {
          const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
          expect(typeof serverinfo).toBe("object")
          expect(typeof serverinfo.virtualserver_name).toBe("string")
          expect(typeof whoami).toBe("object")
          expect(whoami.client_nickname).toBe("JEST SSH")
          teamspeak.quit()
        } catch (e) {
          error = e
          teamspeak.quit()
        }
      })
    })
  })


  it("should connect to a TeamSpeak Server via RAW Query", () => {
    return new Promise((fulfill, reject) => {
      let error: Error|null = null
      teamspeak = new TeamSpeak({
        ...config,
        protocol: QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERYPORT_RAW!, 10) || 10022,
        nickname: "JEST RAW"
      })
  
      teamspeak.on("error", e => error = e)
      teamspeak.on("close", () => {
        if (error instanceof Error) return reject(error)
        fulfill()
      })
  
      teamspeak.on("ready", async () => {
        try {
          const [serverinfo, whoami] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
          expect(typeof serverinfo).toBe("object")
          expect(typeof serverinfo.virtualserver_name).toBe("string")
          expect(typeof whoami).toBe("object")
          expect(whoami.client_nickname).toBe("JEST RAW")
          teamspeak.quit()
        } catch (e) {
          error = e
          teamspeak.quit()
        }
      })
    })
  })

  /*
  it("should test upload and download of a file", async () => {
    if (!(teamspeak instanceof TeamSpeak))
      throw new Error("can not run test, due to no valid connection")

    const data = fs.readFileSync(`${__dirname}/mocks/filetransfer.png`)
    const crc = crc32.buf(data)
    await teamspeak.uploadFile(`/icon_${crc >>> 0}`, data, 0)
    const download = await teamspeak.downloadIcon(`icon_${crc >>> 0}`)
    assert.equal(crc, crc32.buf(download))

  }).timeout(5000)

  // eslint-disable-next-line arrow-body-style
  it("should test receiving of an event", () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (fulfill, reject) => {
      if (!(teamspeak instanceof TeamSpeak))
        return reject(new Error("can not run test, due to no valid connection"))

      const servername = `event ${Math.floor(Math.random() * 10000)}`

      teamspeak.once("serveredit", ev => {
        assert.deepEqual(ev.modified, { virtualserver_name: servername })
        fulfill()
      })

      try {
        await teamspeak.registerEvent("server")
        await teamspeak.serverEdit({ virtualserver_name: servername })
      } catch (e) {
        reject(e)
      }
    })

  }).timeout(5000)
  */
})