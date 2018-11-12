const assert = require("assert")
const escape = require("./../helper/escape.js")
const unescape = require("./../helper/unescape.js")

describe("escape", () => {
  it("should escape backslash", () => {
    assert.equal(escape("\\"), "\\\\")
  })
  it("should escape forwardslash", () => {
    assert.equal(escape("/"), "\\/")
  })
  it("should escape pipe", () => {
    assert.equal(escape("|"), "\\p")
  })
  it("should escape carriage return", () => {
    assert.equal(escape("\r"), "\\r")
  })
  it("should escape horizontal tab", () => {
    assert.equal(escape("\t"), "\\t")
  })
  it("should escape form feed", () => {
    assert.equal(escape("\f"), "\\f")
  })
  it("should escape whitespace", () => {
    assert.equal(escape(" "), "\\s")
  })
})

describe("unescape", () => {
  it("should unescape backslash", () => {
    assert.equal(unescape("\\\\"), "\\")
  })
  it("should unescape forwardslash", () => {
    assert.equal(unescape("\\/"), "/")
  })
  it("should unescape pipe", () => {
    assert.equal(unescape("\\p"), "|")
  })
  it("should unescape carriage return", () => {
    assert.equal(unescape("\\r"), "\r")
  })
  it("should unescape horizontal tab", () => {
    assert.equal(unescape("\\t"), "\t")
  })
  it("should unescape form feed", () => {
    assert.equal(unescape("\\f"), "\f")
  })
  it("should unescape whitespace", () => {
    assert.equal(unescape("\\s"), " ")
  })
})
