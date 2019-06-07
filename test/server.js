/*global describe beforeEach it*/
const sinon = require("sinon")
const { assert } = sinon
const mockRequire = require("mock-require")
const mockResponse = require("./mocks/queryResponse.js")
const TeamSpeakServer = require("../src/property/Server.js")
let TeamSpeak3 = require("../src/TeamSpeak3.js")

mockRequire("../src/transport/TS3Query.js", "./mocks/MockQuery.js")
TeamSpeak3 = mockRequire.reRequire("../src/TeamSpeak3.js")


describe("TeamSpeakServer", () => {
  let rawServer = null
  let stub = null
  let server = null

  beforeEach(() => {
    const ts3 = new TeamSpeak3()
    rawServer = mockResponse.serverlist[0]
    stub = sinon.stub(ts3, "execute")
    stub.resolves()
    // @ts-ignore
    server = new TeamSpeakServer(ts3, rawServer)
  })

  it("should verify the getter value of #id()", () => {
    assert.match(server.id, rawServer.virtualserver_id)
  })

  it("should verify the getter value of #port()", () => {
    assert.match(server.port, rawServer.virtualserver_port)
  })

  it("should verify the getter value of #status()", () => {
    assert.match(server.status, rawServer.virtualserver_status)
  })

  it("should verify the getter value of #clientsonline()", () => {
    assert.match(server.clientsonline, rawServer.virtualserver_clientsonline)
  })

  it("should verify the getter value of #queryclientsonline()", () => {
    assert.match(server.queryclientsonline, rawServer.virtualserver_queryclientsonline)
  })

  it("should verify the getter value of #maxclients()", () => {
    assert.match(server.maxclients, rawServer.virtualserver_maxclients)
  })

  it("should verify the getter value of #uptime()", () => {
    assert.match(server.uptime, rawServer.virtualserver_uptime)
  })

  it("should verify the getter value of #name()", () => {
    assert.match(server.name, rawServer.virtualserver_name)
  })

  it("should verify the getter value of #autostart()", () => {
    assert.match(server.autostart, rawServer.virtualserver_autostart)
  })

  it("should verify the getter value of #machineId()", () => {
    assert.match(server.machineId, rawServer.virtualserver_machine_id)
  })

  it("should verify the getter value of #uniqueIdentifier()", () => {
    assert.match(server.uniqueIdentifier, rawServer.virtualserver_unique_identifier)
  })

  it("should verify the return value of #getNameSpace()", () => {
    assert.match(server.getNameSpace(), "virtualserver")
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