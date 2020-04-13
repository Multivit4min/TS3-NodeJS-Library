const mockExecute = jest.fn()

jest.mock("../src/transport/TeamSpeakQuery", () => {
  const { TeamSpeakQuery } = jest.requireActual("../src/transport/TeamSpeakQuery")

  TeamSpeakQuery.getSocket = function() {
    return { on() {}, send() {}, sendKeepAlive() {}, close() {} }
  }

  TeamSpeakQuery.prototype.execute = mockExecute

  return { TeamSpeakQuery }
})

import { MockNode } from "./mocks/MockNode"
import { TeamSpeak } from "../src/TeamSpeak"

describe("Abstract", () => {
  let node: MockNode<any>
  let teamspeak: TeamSpeak

  beforeEach(() => {
    teamspeak = new TeamSpeak({})
    node = new MockNode<any>(
      teamspeak,
      { clientNickname: "TeamSpeakClient", clid: "10" },
      "mock"
    )
  })

  it("should check return value of #toJSON()", () => {
    expect(node.toJSON()).toEqual({
      _namespace: "mock",
      clientNickname: "TeamSpeakClient",
      clid: "10"
    })
  })

  it("should check return value of #toJSON(false)", () => {
    expect(node.toJSON(false)).toEqual({
      clientNickname: "TeamSpeakClient",
      clid: "10"
    })
  })

  it("should check return value of #getNameSpace()", () => {
    expect(node.getNameSpace()).toBe("mock")
  })

  it("should check return value of #getPropertyByName()", () => {
    expect(node.getPropertyByName("clid")).toBe("10")
  })

  it("should check return value of #getParent()", () => {
    expect(node.getParent()).toBeInstanceOf(TeamSpeak)
    expect(node.getParent()).toStrictEqual(teamspeak)
  })

  it("should check return value of #updateCache()", () => {
    node.updateCache({ clientAway: 0, clid: "55" })
    expect(node.toJSON(false)).toEqual({
      clientNickname: "TeamSpeakClient",
      clid: "55",
      clientAway: 0
    })
  })

})