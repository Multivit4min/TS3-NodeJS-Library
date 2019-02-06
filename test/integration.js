/*global describe it */
const mock = require('mock-require')
mock.stop("../TeamSpeak3.js")
const assert = require("assert")
const TeamSpeak3 = require("../TeamSpeak3.js")

describe("Integration Test", () => {
  it("should connect to a TeamSpeak Server via RAW Query", done => {
    const ts3 = new TeamSpeak3({
      host: "127.0.0.1",
      queryport: 10011,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    ts3.on("error", e => {
      console.error("Possible Error", e)
    })

    ts3.on("ready", async () => {
      const serverinfo = await ts3.serverInfo()
      console.log(serverinfo)
      assert.equal("object", typeof serverinfo)
      done()
    })
  }).timeout(10000)

  it("should connect to a TeamSpeak Server via SSH Query", done => {
    const ts3 = new TeamSpeak3({
      protocol: "ssh",
      host: "127.0.0.1",
      queryport: 10022,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    ts3.on("error", e => {
      console.error("Possible Error", e)
    })

    ts3.on("ready", async () => {
      const serverinfo = await ts3.serverInfo()
      console.log(serverinfo)
      assert.equal("object", typeof serverinfo)
      done()
    })
  }).timeout(10000)
})