const TeamSpeak3 = require("./../TeamSpeak3")

//Creates a new Connection to a TeamSpeak Server
const ts3 = new TeamSpeak3({
  //simply add this line to connect via ssh
  protocol: "ssh",
  host: "localhost",
  queryport: 10022,
  username: "serveradmin",
  password: "password",
  keepalive: true
})

ts3.on("ready", () => listServers())

function listServers() {
  ts3.serverList().then(servers => {
    servers.forEach(server => {
      console.log(`Server ID ${server.id}`)
      console.log(`\tName ${server.name}`)
      console.log(`\tPort ${server.port}`)
      console.log(`\tStatus ${server.status}`)
      console.log(`\tServerUID ${server.uniqueIdentifier}`)
      console.log(`\tClients ${server.clientsonline}/${server.maxclients}`)
    })
    setTimeout(listServers, 1000)
  })
}

//Error event gets fired when an Error during connecting or an Error during Processing of an Event happens
ts3.on("error", e => {
  console.log("Error", e.message)
})

//Close event gets fired when the Connection to the TeamSpeak Server has been closed
//the e variable is not always set
ts3.on("close", e => {
  console.log("Connection has been closed!", e)
})