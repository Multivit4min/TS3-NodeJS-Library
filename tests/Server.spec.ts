const mockExecute = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")

  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() {} }
  }

  TeamSpeakQuery.prototype.execute = mockExecute

  return { TeamSpeakQuery }
})

import { TeamSpeak } from "../src/TeamSpeak"
import { TeamSpeakServer } from "../src/node/Server"
import { serverlist } from "./mocks/queryresponse"


describe("TeamSpeakServer", () => {
  let raw: ReturnType<typeof serverlist>[0]
  let server: TeamSpeakServer

  beforeEach(() => {
    const teamspeak = new TeamSpeak({})
    raw = serverlist(1)[0]
    server = new TeamSpeakServer(teamspeak, raw)
    mockExecute.mockReset()
    mockExecute.mockResolvedValue(null)
  })

  it("should verify the getter value of #id()", () => {
    expect(server.id).toBe(raw.virtualserver_id)
  })

  it("should verify the getter value of #port()", () => {
    expect(server.port).toBe(raw.virtualserver_port)
  })

  it("should verify the getter value of #status()", () => {
    expect(server.status).toBe(raw.virtualserver_status)
  })

  it("should verify the getter value of #clientsonline()", () => {
    expect(server.clientsonline).toBe(raw.virtualserver_clientsonline)
  })

  it("should verify the getter value of #queryclientsonline()", () => {
    expect(server.queryclientsonline).toBe(raw.virtualserver_queryclientsonline)
  })

  it("should verify the getter value of #maxclients()", () => {
    expect(server.maxclients).toBe(raw.virtualserver_maxclients)
  })

  it("should verify the getter value of #uptime()", () => {
    expect(server.uptime).toBe(raw.virtualserver_uptime)
  })

  it("should verify the getter value of #name()", () => {
    expect(server.name).toBe(raw.virtualserver_name)
  })

  it("should verify the getter value of #autostart()", () => {
    expect(server.autostart).toBe(raw.virtualserver_autostart)
  })

  it("should verify the getter value of #machineId()", () => {
    expect(server.machineId).toBe(raw.virtualserver_machine_id)
  })

  it("should verify the getter value of #uniqueIdentifier()", () => {
    expect(server.uniqueIdentifier).toBe(raw.virtualserver_unique_identifier)
  })

  it("should verify the return value of #getNameSpace()", () => {
    expect(server.getNameSpace()).toBe("virtualserver")
  })

  it("should verify execute parameters of #use()", async () => {
    await server.use("Nickname")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("use", [raw.virtualserver_id], { client_nickname: "Nickname" })
  })

  it("should verify execute parameters of #del()", async () => {
    await server.del()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverdelete", { sid: raw.virtualserver_id })
  })

  it("should verify execute parameters of #start()", async () => {
    await server.start()
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverstart", { sid: raw.virtualserver_id })
  })

  it("should verify execute parameters of #stop()", async () => {
    await server.stop("Reason Message")
    expect(mockExecute).toHaveBeenCalledTimes(1)
    expect(mockExecute).toHaveBeenCalledWith("serverstop", {
      sid: raw.virtualserver_id,
      reasonmsg: "Reason Message"
    })
  })

})