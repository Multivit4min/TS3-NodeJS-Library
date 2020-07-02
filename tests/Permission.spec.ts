const mockExecute = jest.fn()
const mockExecutePrio = jest.fn()
const mockClose = jest.fn()
const mockIsConnected = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")
  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() { mockClose() }, isConnected() {} }
  }
  TeamSpeakQuery.prototype.execute = mockExecute
  TeamSpeakQuery.prototype.executePrio = mockExecutePrio
  TeamSpeakQuery.prototype.isConnected = mockIsConnected
  return { TeamSpeakQuery }
})

import { Permission } from "../src/util/Permission"
import { TeamSpeak } from "../src/TeamSpeak"

describe("Permission", () => {

  let teamspeak: TeamSpeak = new TeamSpeak({})

  beforeEach(() => {
    teamspeak = new TeamSpeak({})
    mockClose.mockReset()
    mockExecute.mockReset()
    mockExecute.mockResolvedValue([])
    mockExecutePrio.mockReset()
    mockExecutePrio.mockResolvedValue([])
  })

  describe("#getSkip()", () => {
    it("should check the correct return type", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      expect(perm.getSkip()).toBe(false)
      perm.skip(true)
      expect(perm.getSkip()).toBe(true)
      perm.skip(false)
      expect(perm.getSkip()).toBe(false)
    })
  })

  describe("#getNegate()", () => {
    it("should check the correct return type", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      expect(perm.getNegate()).toBe(false)
      perm.negate(true)
      expect(perm.getNegate()).toBe(true)
      perm.negate(false)
      expect(perm.getNegate()).toBe(false)
    })
  })

  describe("#get()", () => {
    it("should check if it throws an error", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      expect(() => perm["get"]()).toThrowError()
    })
  })

  describe("#getAsPermid()", () => {
    it("should check if it throws an error", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      perm.perm("NaN")
      expect(() => perm["getAsPermid"]()).toThrowError()
      perm.perm(123)
      expect(() => perm["getAsPermid"]()).toThrowError()
    })
  })

  describe("#getAsPermSid()", () => {
    it("should check if it throws an error", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      perm.perm(123)
      expect(() => perm["getAsPermSid"]()).toThrowError()
    })
  })

  describe("#getPermName()", () => {
    it("should validate the return type", () => {
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak: {} as any,
        context: {}
      })
      perm.perm(123)
      expect(perm["getPermName"]()).toBe("permid")
      perm.perm("foo")
      expect(perm["getPermName"]()).toBe("permsid")
    })
  })

  describe("#remove()", () => {
    it("should validate parameters", async () => {
      expect.assertions(1)
      const perm = new Permission({
        update: "foo",
        remove: "bar",
        teamspeak,
        context: {}
      })
      await perm.remove()
      expect(mockExecute).toHaveBeenCalledTimes(1)
    })
  })

  describe("#getDefaults()", () => {
    it("should validate the return type", () => {
      expect(Permission.getDefaults({ permname: 1, permskip: true }))
        .toEqual({ permskip: true, permname: 1, permnegated: false })
    })
  })

})