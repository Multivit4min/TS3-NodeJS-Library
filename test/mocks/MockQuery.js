const EventEmitter = require("events")

class MockQuery extends EventEmitter {
  constructor() {
    super()
  }
}

module.exports = MockQuery
