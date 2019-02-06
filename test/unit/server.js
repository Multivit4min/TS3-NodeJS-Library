/*global describe beforeEach it*/
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("../mocks/queryResponse.js")
const TeamSpeakServer = require("../../property/Server.js")
let TeamSpeak3 = require("../../Teamspeak3.js")


mockRequire("../../transport/TS3Query.js", "../mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../../TeamSpeak3.js")



describe("TeamSpeakServer", () => {
  let rawServer = null
  let stub = null
  let server = null

  beforeEach(() => {
    const ts3 = new TeamSpeak3()
    rawServer = mockResponse.serverlist[0]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    server = new TeamSpeakServer(ts3, rawServer)
  })

  it("should verify execute parameters of #use()", async () => {
    await server.use("Nickname")
    assert.calledOnce(stub)
    assert.calledWith(stub, "use", [rawServer.virtualserver_id], { client_nickname: "Nickname" })
  })

  it("should verify execute parameters of #del()", async () => {
    await server.del()
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverdelete", { sid: rawServer.virtualserver_id })
  })

  it("should verify execute parameters of #start()", async () => {
    await server.start()
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverstart", { sid: rawServer.virtualserver_id })
  })

  it("should verify execute parameters of #stop()", async () => {
    await server.stop("Reason Message")
    assert.calledOnce(stub)
    assert.calledWith(stub, "serverstop", {
      sid: rawServer.virtualserver_id,
      reasonmsg: "Reason Message"
    })
  })

})