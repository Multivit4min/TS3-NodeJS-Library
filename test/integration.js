/*global describe it */
const mock = require("mock-require")
const assert = require("assert")
const fs = require("fs")
const crc32 = require("crc-32")

let TeamSpeak3 = require("../TeamSpeak3.js")
mock.stop("../transport/TS3Query.js")
TeamSpeak3 = mock.reRequire("../TeamSpeak3.js")

describe("Integration Test", () => {
  it("should connect to a TeamSpeak Server via RAW Query", done => {
    let error = null
    const ts3 = new TeamSpeak3({
      host: "127.0.0.1",
      queryport: 10011,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    ts3.on("error", e => error = e)
    ts3.on("close", () => done(error))

    ts3.on("ready", async () => {
      try {
        const [serverinfo, whoami] = await Promise.all([ts3.serverInfo(), ts3.whoami()])
        assert.equal("object", typeof serverinfo)
        assert.equal("string", typeof serverinfo.virtualserver_name)
        assert.equal("object", typeof whoami)
        assert.equal("NodeJS Query Framework", whoami.client_nickname)
        ts3.quit()
      } catch (e) {
        ts3.quit()
        throw e
      }
    })

  }).timeout(5000)


  it("should connect to a TeamSpeak Server via SSH Query", done => {
    let error = null
    const ts3 = new TeamSpeak3({
      protocol: "ssh",
      host: "127.0.0.1",
      queryport: 10022,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    ts3.on("error", e => error = e)
    ts3.on("close", () => done(error))

    ts3.on("ready", async () => {
      try {
        const [serverinfo, whoami] = await Promise.all([ts3.serverInfo(), ts3.whoami()])
        assert.equal("object", typeof serverinfo)
        assert.equal("string", typeof serverinfo.virtualserver_name)
        assert.equal("object", typeof whoami)
        assert.equal("NodeJS Query Framework", whoami.client_nickname)
        ts3.quit()
      } catch (e) {
        ts3.quit()
        throw e
      }
    })

  }).timeout(5000)

  it("should test upload and download of a file", done => {
    let error = null
    const ts3 = new TeamSpeak3({
      host: "127.0.0.1",
      queryport: 10011,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    ts3.on("error", e => error = e)
    ts3.on("close", () => done(error))

    ts3.on("ready", async () => {
      try {
        const data = fs.readFileSync(`${__dirname}/mocks/filetransfer.png`)
        const crc = crc32.buf(data)
        await ts3.uploadFile(`/icon_${crc}`, data, 0)
        const download = await ts3.downloadIcon(`icon_${crc >>> 0}`)
        assert.equal(crc, crc32.buf(download))
        ts3.quit()
      } catch (e) {
        ts3.quit()
        error = e
      }
    })

  }).timeout(5000)
})