const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")

//Creates a new Connection to a TeamSpeak Server
var ts3 = new TeamSpeak3({
    host: "127.0.0.1",
    queryport: 10011,
    username: "serveradmin",
    password: "password",
    antispam: true,
    antispamtimer: 350,
    keepalive: true
})

ts3.on("ready", () => {
    listServers()
})

function listServers() {
  ts3.serverList().then(servers => {
    servers.forEach(server => {
      var info = server.getCache()
      console.log(`Server ID ${info.virtualserver_id}`)
      console.log(`\tName ${info.virtualserver_name}`)
      console.log(`\tPort ${info.virtualserver_port}`)
      console.log(`\tStatus ${info.virtualserver_status}`)
      console.log(`\tServerUID ${info.virtualserver_unique_identifier}`)
      console.log(`\tClients ${info.virtualserver_clientsonline}/${info.virtualserver_maxclients}`)
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
