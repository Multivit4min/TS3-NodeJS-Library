# TS3-NodeJS-Library

The TS3 NodeJS Library (name is subject to change) has been strongly influenced by [PlanetTeamSpeaks TS3 PHP 
Framework](https://docs.planetteamspeak.com/ts3/php/framework/index.html)

Currently there is no NPM Repository for this Project
<br/><br/>
##### TODO
----
* File upload
* Channel Browser Access
<br/><br/>

##### Documentation
----
You can find all necessary documentation [here](https://github.com/Multivit4min/TS3-NodeJS-Library/blob/master/documentation.md)!
<br/><br/>

##### Example
----

Send a message to all non Query Clients connected:
```javascript
const TeamSpeak3 = require(__dirname+"/TS3-NodeJS-Library/TeamSpeak3")

//Create a new Connection
var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "",
    nickname: "NodeJS Query Framework"
})

/*
    Ready gets fired when the Bot has connected to the TeamSpeak Query and
    issued login commands (if username and password has been given)
    selected the appropriate Server (also if given in the config)
    and set the nickname
*/
ts3.on("ready", () => {
    //Retrieves a List of non Query Clients
    ts3.clientList({client_type:0}).then(clients => {
        clients.forEach(client => {
            console.log("Sending Message to", client.getCache().client_nickname)
            //Sends to every Client a "Hello"
            client.message("Hello!")
        }
    }).catch(e => console.log("CATCHED", e))
})

ts3.on("error", e => console.log("Error", e))
ts3.on("close", e => console.log("Connection has been closed!", e))
```
