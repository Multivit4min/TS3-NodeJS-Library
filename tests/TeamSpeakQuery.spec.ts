import { EventEmitter } from "events"

const sendMock = jest.fn()
const keepAliveMock = jest.fn()
const wait = (time: number) => new Promise(fulfill => setTimeout(fulfill, time))

jest.mock("../src/transport/protocols/raw", () => {
  
  class FakeProtocol extends EventEmitter implements TeamSpeakQuery.QueryProtocolInterface {
    chunk: string = ""
    send(data: string) { sendMock(data) }
    close() {}
    sendKeepAlive() { keepAliveMock() }
  }

  return { ProtocolRAW: FakeProtocol }
})

import { TeamSpeakQuery } from "../src/transport/TeamSpeakQuery"
import { TeamSpeak } from "../src/TeamSpeak"
import { ResponseError } from "../src/exception/ResponseError"

describe("TeamSpeakQuery", () => {

  beforeEach(() => {
    sendMock.mockReset()
    keepAliveMock.mockReset()
  })

  it("should throw an error when the wrong protocol gets required", () => {
    //@ts-ignore
    expect(() => TeamSpeakQuery.getSocket({ protocol: "something false" })).toThrowError()
  })

  it("should catch and handle a query flooding error", async () => {
    const query = new TeamSpeakQuery({
      queryport: 10011,
      host: "127.0.0.1",
      ignoreQueries: false,
      protocol: TeamSpeak.QueryProtocol.RAW,
      keepAlive: true,
      keepAliveTimeout: 250,
      readyTimeout: 10000
    })
    query.connect()
    query.pause(false)
    //@ts-ignore
    const emit: typeof EventEmitter.prototype.emit = query["socket"]["emit"].bind(query["socket"])

    emit("connect")
    emit("line", "TS3")
    emit("line", "Welcome ... command.")
    query.execute("whoami")
    emit("line", "error id=524 msg=client\\sis\\sflooding extra_msg=please\\swait\\s1\\sseconds")
    expect(sendMock).toBeCalledTimes(1)
    expect(sendMock.mock.calls[0][0]).toBe("whoami")
    await wait(1200)
    expect(sendMock).toBeCalledTimes(2)
    expect(sendMock.mock.calls[1][0]).toBe("whoami")
    emit("close")
  })

  it("should receive a response error", async () => {
    const query = new TeamSpeakQuery({
      queryport: 10011,
      host: "127.0.0.1",
      ignoreQueries: false,
      protocol: TeamSpeak.QueryProtocol.RAW,
      keepAlive: true,
      keepAliveTimeout: 250,
      readyTimeout: 10000
    })
    query.connect()
    query.pause(false)
    //@ts-ignore
    const emit: typeof EventEmitter.prototype.emit = query["socket"]["emit"].bind(query["socket"])

    emit("connect")
    emit("line", "TS3")
    emit("line", "Welcome ... command.")
    const command = query.execute("whoami")
    emit("line", "error id=1 msg=error")
    expect(sendMock).toBeCalledTimes(1)
    expect(sendMock.mock.calls[0][0]).toBe("whoami")
    expect(command).rejects.toBeInstanceOf(ResponseError)
    emit("close")
  })

  it("should test a keepalive", async () => {
    const query = new TeamSpeakQuery({
      queryport: 10011,
      host: "127.0.0.1",
      ignoreQueries: false,
      protocol: TeamSpeak.QueryProtocol.RAW,
      keepAlive: true,
      keepAliveTimeout: 250,
      readyTimeout: 10000
    })
    query.connect()
    query.pause(false)
    //@ts-ignore
    const emit: typeof EventEmitter.prototype.emit = query["socket"]["emit"].bind(query["socket"])

    emit("connect")
    emit("line", "TS3")
    emit("line", "Welcome ... command.")
    query["sendKeepAlive"]()
    emit("close")
    expect(keepAliveMock).toBeCalledTimes(1)
  })
})