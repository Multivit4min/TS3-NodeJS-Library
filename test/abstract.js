/* eslint-disable camelcase */
/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
/* global describe beforeEach it */
const sinon = require("sinon")
const EventEmitter = require("events")
const { assert } = sinon
const Abstract = require("../property/Abstract.js")


describe("Abstract", () => {
  let abstract = null

  beforeEach(() => {
    // @ts-ignore
    abstract = new Abstract(new EventEmitter(), { test_init_val: true}, "test")
  })

  it("should verify return value of #translatePropName('test_should_work')", () => {
    assert.match(abstract.translatePropName("test_should_work"), "shouldWork")
  })

  it("should verify return value of #translatePropName('should_work')", () => {
    assert.match(abstract.translatePropName("should_work"), "shouldWork")
  })

  it("should verify that getters are getting set correctly", () => {
    assert.match(abstract.initVal, true)
  })

  it("should verify that changes are getting emitted correctly", done => {
    abstract.once("update", changes => {
      assert.match(Object.keys(changes).length, 2)
      assert.match(changes.test_init_val, { from: true, to: false })
      assert.match(changes.test_new_val, { from: undefined, to: true })
      done()
    })
    abstract.updateCache({ test_init_val: false, test_new_val: true })
  }).timeout(100)

})