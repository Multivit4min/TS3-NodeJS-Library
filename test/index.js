require("./unit/teamspeak.js")
require("./unit/client.js")
require("./unit/channel.js")
require("./unit/channelgroup.js")
require("./unit/server.js")
require("./unit/servergroup.js")
require("./unit/escape.js")
require("./unit/command.js")

//do nothing if we are not on a travis environment
console.log(process.env)
if (process.env.TRAVIS) {
  console.log("####################### RUNNING INTEGRATION TESTS #######################")
  require("./integration/basic.js")
}