const assert = require("assert")
const TeamSpeak3 = require(__dirname+"/../TeamSpeak3.js")

const mockArray = [{
  foo: "bar",
  name: "john Doe",
  age: 40
}, {
  foo: "baz",
  name: "jane Doe",
  age: 40
}, {
  foo: "bar",
  name: "Richard Doe",
  age: 16
}]

describe("TeamSpeak3", () => {

  describe("#filter()", () => {
    it("should filter an array of objects with 1 filter parameter", async () => {
      assert.deepEqual(
        await TeamSpeak3._filter(mockArray, { foo: "bar" }),
        [mockArray[0], mockArray[2]]
      )
    })

    it("should filter an array of objects with 2 filter parameters", async () => {
      assert.deepEqual(
        await TeamSpeak3._filter(mockArray, { age: 40, foo: "baz" }),
        [mockArray[1]]
      )
    })
  })

  describe("#toArray()", () => {
    it("should convert undefined to an empty array", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(undefined), [])
    })
    it("should convert null to an empty array", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(null), [])
    })
    it("should convert a single string to an array with the string in it", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray("foo bar"), ["foo bar"])
    })
    it("should do nothing with an array as argument", async () => {
      assert.deepEqual(await TeamSpeak3.prototype.toArray(["jane doe", "john doe"]), ["jane doe", "john doe"])
    })
  })

})
