/*global describe it process */

//do nothing if we are not on a travis environment
console.log(process.env)
if (!process.env.TRAVIS) return

console.log("####################### RUNNING INTEGRATION TESTS #######################")

const assert = require("assert")
const TeamSpeak3 = require("../TeamSpeak3.js")

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

    assert.equal("object", typeof serverinfo)
    console.log(serverinfo)
  })
})