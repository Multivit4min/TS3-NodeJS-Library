
# TS3-NodeJS-Library

[![Build Status](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library.svg?branch=master)](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library)
[![npm](https://img.shields.io/npm/v/ts3-nodejs-library.svg)](https://www.npmjs.com/package/ts3-nodejs-library)
[![Coverage Status](https://coveralls.io/repos/github/Multivit4min/TS3-NodeJS-Library/badge.svg?branch=master)](https://coveralls.io/github/Multivit4min/TS3-NodeJS-Library?branch=master)
[![TypeScript definitions on DefinitelyTyped](https://definitelytyped.org/badges/standard.svg)](https://www.npmjs.com/package/@types/ts3-nodejs-library)

The TS3 NodeJS Library has been strongly influenced by [PlanetTeamSpeaks TS3 PHP
Framework](https://docs.planetteamspeak.com/ts3/php/framework/index.html)


## Install

`npm install --save ts3-nodejs-library`

If you want to install additional typings you can do that with:

`npm install --save-dev @types/ts3-nodejs-library`


## Documentation

You can find all necessary documentation [here](https://multivit4min.github.io/TS3-NodeJS-Library)!


## Example

Send a message to all non Query Clients connected:
```javascript
const TeamSpeak3 = require("ts3-nodejs-library")

//Create a new Connection
const ts3 = new TeamSpeak3({
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
ts3.on("ready", async () => {
  try {
    //Retrieves a List of non Query Clients
    const clients = await ts3.clientList({client_type: 0})
    clients.forEach(client => {
      console.log("Sending Message to", client.nickname)
      //Sends to every Client a "Hello"
      client.message("Hello!")
    })
  } catch (e) {
    console.log("Catched an error!")
    console.error(e)
  }
})

ts3.on("error", e => console.log("Error", e.message))
ts3.on("close", e => console.log("Connection has been closed!", e))
```


## Flood Protection

Flooding will be handled automatically.

When the Query gets accused of Flooding then it will return error with id 524 and an error message which states how much time needs to be waited.

This will be parsed automatically and the Query will wait for the given time (normally its 1 second) + 100 additional milliseconds (sometimes it happens the query gets banned when still sending too early)


## Authors

* **David Kartnaller** ([Multivit4min](https://github.com/Multivit4min)) - *Initial work*
* **Pascal Sthamer** ([P4sca1](https://github.com/P4sca1)) and **Mattis Krämer** ([Mattzi](https://github.com/Mattzi)) - *TypeScript typings*



See also the list of [contributors](https://github.com/Multivit4min/TS3-NodeJS-Library/graphs/contributors) who participated in this project.
