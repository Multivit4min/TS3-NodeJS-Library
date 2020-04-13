import { EventEmitter } from "events"

const encodingMock = jest.fn()
const setTimeoutMock = jest.fn()
const destroyMock = jest.fn()
const writeMock = jest.fn()
const connectMock = jest.fn()
const shellMock = jest.fn()

jest.mock("net", () => {
  class Socket extends EventEmitter {
    setEncoding(encoding: string) { encodingMock(encoding) }
    setTimeout(encoding: string) { setTimeoutMock(encoding) }
    destroy() { destroyMock() }
    write(data: any) { writeMock(data) }
  }
  return { connect: () => new Socket() }
})

jest.mock("ssh2", () => {

  class Stream extends EventEmitter {
    setEncoding(encoding: string) { encodingMock(encoding) }
    write(data: any) { writeMock(data) }
  }

  class Client extends EventEmitter {
    shell(out: any, cb: (err: Error|undefined, stream: Stream) => void) {
      shellMock(out, cb)
      cb(undefined, new Stream())
    }
    connect(config: any) { connectMock(config) }
  }

  return { Client }
})

import { TeamSpeak } from "../src/TeamSpeak"
import { ProtocolRAW } from "../src/transport/protocols/raw"
import { ProtocolSSH } from "../src/transport/protocols/ssh"

const config = {
  host: "0.0.0.0",
  protocol: TeamSpeak.QueryProtocol.RAW,
  ignoreQueries: false,
  queryport: 10011,
  readyTimeout: 1000,
  keepAliveTimeout: 250,
  keepAlive: false
}

describe("QueryProtocol", () => {

  beforeEach(() => {
    encodingMock.mockClear()
    setTimeoutMock.mockClear()
    destroyMock.mockClear()
    writeMock.mockClear()
    connectMock.mockClear()
    shellMock.mockClear()
  })

  describe("error handling", () => {
    it("should emit an error on raw", () => {
      expect.assertions(1)
      const raw = new ProtocolRAW(config)
      raw.once("error", err => expect(err.message).toBe("foo"))
      raw["handleError"](new Error("foo"))
    })

    it("should emit an error on ssh", () => {
      expect.assertions(1)
      const ssh = new ProtocolSSH(config)
      ssh.once("error", err => expect(err.message).toBe("foo"))
      ssh["handleError"](new Error("foo"))
    })
  })

  describe("sendKeepAlive", () => {
    it("should send a keepalive on raw", () => {
      expect.assertions(2)
      const raw = new ProtocolRAW(config)
      raw.sendKeepAlive()
      expect(writeMock).toBeCalledTimes(1)
      expect(writeMock).toBeCalledWith(" \n")
    })

    it("should send a keepalive on ssh", () => {
      expect.assertions(2)
      const ssh = new ProtocolSSH(config)
      ssh["handleReady"]()
      ssh.sendKeepAlive()
      expect(writeMock).toBeCalledTimes(1)
      expect(writeMock).toBeCalledWith(" \n")
    })
  })
})