const assert = require("assert")
const Command = require(__dirname+"/../transport/Command.js")
const ResponseError = require(__dirname+"/../exception/ResponseError.js")

describe("Command", () => {

  describe("#build()", () => {
    it("should build a valid command", () => {
      var cmd = new Command()
      cmd.setCommand("use")
      cmd.setOptions({ client_nickname: "TeamSpeak Query", invalid: null })
      cmd.setFlags([1])
      assert.equal(cmd.build(), "use 1 client_nickname=TeamSpeak\\sQuery")
    })
  })

  describe("#setResponse()", () => {
    it("should set end parse the response data", () => {
      var cmd = new Command()
      cmd.setResponse("virtualserver_status=online virtualserver_id=1 virtualserver_unique_identifier=Ygn7V8+jiDXLDO5+zrxK\/WptJBw= virtualserver_port=9987 client_id=1 client_channel_id=1 client_nickname=Unknown\\sfrom\\s[::1]:0000 client_database_id=0 client_login_name client_unique_identifier client_origin_server_id=0")
      assert.deepEqual(cmd.getResponse(), {
        virtualserver_status: "online",
        virtualserver_id: 1,
        virtualserver_unique_identifier: "Ygn7V8+jiDXLDO5+zrxK/WptJBw=",
        virtualserver_port: 9987,
        client_id: 1,
        client_channel_id: 1,
        client_nickname: "Unknown from [::1]:0000",
        client_database_id: 0,
        client_login_name: undefined,
        client_unique_identifier: undefined,
        client_origin_server_id: 0
      })
    })
  })

  describe("#setError()", () => {
    it("should detect no errors", () => {
      var cmd = new Command()
      cmd.setError("error id=0 msg=ok")
      assert.ok(!cmd.hasError())
    })
  })

  describe("#getError()", () => {
    it("should create a new Instance of ResponseError", () => {
      var cmd = new Command()
      cmd.setError("error id=1024 msg=invalid\sserverID")
      assert.ok(cmd.hasError())
      assert.ok(cmd.getError() instanceof ResponseError)
    })
  })
})
