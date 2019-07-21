import { EventEmitter } from "events"

const sendMock = jest.fn()
const wait = (time: number) => new Promise(fulfill => setTimeout(fulfill, time))

jest.mock("../src/transport/protocols/raw", () => {
  
  class FakeProtocol extends EventEmitter implements QueryProtocolInterface {
    chunk: string = ""
    send(data: string) { sendMock(data) }
    close() {}
    sendKeepAlive() {}
  }

  return { ProtocolRAW: FakeProtocol }
})

import { TeamSpeakQuery, QueryProtocolInterface } from "../src/transport/TeamSpeakQuery"
import { QueryProtocol } from "../src/TeamSpeak"
import { ResponseError } from "../src/exception/ResponseError"

describe("TeamSpeakQuery", () => {

  beforeEach(() => {
    sendMock.mockReset()
  })

  it("should throw an error when the wrong protocol gets required", () => {
    //@ts-ignore
    expect(() => new TeamSpeakQuery({ protocol: "something false" })).toThrowError()
  })

  it("should catch and handle a query flooding error", async () => {
    const query = new TeamSpeakQuery({
      queryport: 10011,
      host: "127.0.0.1",
      protocol: QueryProtocol.RAW,
      keepAlive: true,
      readyTimeout: 10000
    })

    //@ts-ignore
    const emit: typeof EventEmitter.prototype.emit = query["socket"]["emit"].bind(query["socket"])

    emit("connect")
    emit("line", "TS3")
    emit("line", "Welcome ... command.")
    const command = query.execute("whoami")
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
      protocol: QueryProtocol.RAW,
      keepAlive: true,
      readyTimeout: 10000
    })

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
})