# TS3-NodeJS-Library

The TS3 NodeJS Library (name is subject to change) has been strongly influenced by [PlanetTeamSpeaks TS3 PHP 
Framework](https://docs.planetteamspeak.com/ts3/php/framework/index.html), there is still much work to do to cover the whole TeamSpeak Query Interface.

Currently there is no NPM Repository for this Project


Example to send a message to all non Query Clients connected:
```javascript
const TeamSpeak3 = require(__dirname+"/ts3lib/TeamSpeak3")

var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "",
    nickname: "NodeJS Query Framework",
    antispam: true,
    antispamtimer: 350,
    keepalive: true
})

ts3.on("ready", () => {
    ts3.clientList({client_type:0})
        .then(clients => {
            clients.forEach(client => {
                console.log("Sending Message to", client.getCache().client_nickname)
                client.message("Hello!")
            }
        })
        .catch(e => console.log("CATCHED", e))
})

ts3.on("error", e => console.log("Error", e))
ts3.on("close", e => console.log("Connection has been closed!", e))
```