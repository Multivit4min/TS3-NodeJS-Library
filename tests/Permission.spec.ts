import { Permission } from "../src/util/Permission"

describe("Permission", () => {

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

  describe("#getDefaults()", () => {
    it("should validate the return type", () => {
      expect(Permission.getDefaults({ permname: 1, permskip: true }))
        .toEqual({ permskip: true, permname: 1, permnegated: false })
    })
  })

})