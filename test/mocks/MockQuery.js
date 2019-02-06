const EventEmitter = require("events")

class MockQuery extends EventEmitter {
  constructor() {
    super()
    console.log("Using mocked query")
  }
}

module.exports = MockQuery