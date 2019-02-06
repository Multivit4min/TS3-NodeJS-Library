/*global describe it process */

const assert = require("assert")
const TeamSpeak3 = require("../../TeamSpeak3.js")

describe("Integration Test", () => {
  it("should connect to a TeamSpeak Server", async () => {
    const ts3 = new TeamSpeak3({
      host: "127.0.0.1",
      queryport: 10011,
      serverport: 9987,
      username: "serveradmin",
      password: "abc123",
      nickname: "NodeJS Query Framework"
    })

    const serverinfo = await ts3.serverInfo()
    console.log(serverinfo)

    assert.equal("object", typeof serverinfo)
  })
})