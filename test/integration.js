/* global describe after afterEach it */

const mock = require("mock-require")
const assert = require("assert")
const fs = require("fs")
// @ts-ignore
const crc32 = require("crc-32")
const ResponseError = require("../src/exception/ResponseError")

let TeamSpeak3 = require("../src/TeamSpeak3.js")
mock.stop("../src/transport/TS3Query.js")
TeamSpeak3 = mock.reRequire("../src/TeamSpeak3.js")

const config = {
  host: process.env.TS3_HOST || "127.0.0.1",
  serverport: parseInt(process.env.TS3_SERVERPORT, 10) || 9987,
  username: process.env.TS3_USERNAME || "serveradmin",
  password: process.env.TS3_PASSWORD || "abc123"
}

describe("Integration Test", () => {
  let ts3 = null

  after(() => {
    if (ts3 instanceof TeamSpeak3) ts3.forceQuit()
  })

  afterEach(() => {
    if (ts3 instanceof TeamSpeak3) ts3.removeAllListeners()
  })

  it("should connect to a TeamSpeak Server via SSH Query", done => {
    let error = null
    const ts3ssh = new TeamSpeak3({
      ...config,
      protocol: "ssh",
      queryport: parseInt(process.env.TS3_QUERYPORT_SSH, 10) || 10022,
      nickname: "NodeJS SSH"
    })

    ts3ssh.on("error", e => error = e)
    ts3ssh.on("close", () => done(error))

    ts3ssh.on("ready", async () => {
      try {
        const [serverinfo, whoami] = await Promise.all([ts3ssh.serverInfo(), ts3ssh.whoami()])
        assert.equal("object", typeof serverinfo)
        assert.equal("string", typeof serverinfo.virtualserver_name)
        assert.equal("object", typeof whoami)
        assert.equal("NodeJS SSH", whoami.client_nickname)
        // eslint-disable-next-line no-underscore-dangle
        ts3ssh._ts3.keepAlive()
        ts3ssh.quit()
      } catch (e) {
        error = e
        ts3ssh.quit()
      }
    })

  }).timeout(5000)

  it("should connect to a TeamSpeak Server via RAW Query", done => {
    ts3 = new TeamSpeak3({
      ...config,
      queryport: parseInt(process.env.TS3_QUERYPORT_RAW, 10) || 10011,
      nickname: "NodeJS RAW"
    })

    ts3.on("error", e => done(e))

    ts3.on("ready", async () => {
      try {
        const [serverinfo, whoami] = await Promise.all([ts3.serverInfo(), ts3.whoami()])
        assert.equal("object", typeof serverinfo)
        assert.equal("string", typeof serverinfo.virtualserver_name)
        assert.equal("object", typeof whoami)
        assert.equal("NodeJS RAW", whoami.client_nickname)
        // eslint-disable-next-line no-underscore-dangle
        ts3._ts3.keepAlive()
        try {
          await ts3.execute("invalid_command")
          done(new Error("should have handled an error"))
        } catch (error) {
          assert(error instanceof ResponseError)
        }
        done()
      } catch (e) {
        done(e)
      }
    })

  }).timeout(5000)


  it("should test upload and download of a file", async () => {
    if (!(ts3 instanceof TeamSpeak3))
      throw new Error("can not run test, due to no valid connection")

    const data = fs.readFileSync(`${__dirname}/mocks/filetransfer.png`)
    const crc = crc32.buf(data)
    await ts3.uploadFile(`/icon_${crc >>> 0}`, data, 0)
    const download = await ts3.downloadIcon(`icon_${crc >>> 0}`)
    assert.equal(crc, crc32.buf(download))

  }).timeout(5000)

  // eslint-disable-next-line arrow-body-style
  it("should test receiving of an event", () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (fulfill, reject) => {
      if (!(ts3 instanceof TeamSpeak3))
        return reject(new Error("can not run test, due to no valid connection"))

      const servername = `event ${Math.floor(Math.random() * 10000)}`

      ts3.once("serveredit", ev => {
        assert.deepEqual(ev.modified, { virtualserver_name: servername })
        fulfill()
      })

      try {
        await ts3.registerEvent("server")
        await ts3.serverEdit({ virtualserver_name: servername })
      } catch (e) {
        reject(e)
      }
    })

  }).timeout(5000)
})