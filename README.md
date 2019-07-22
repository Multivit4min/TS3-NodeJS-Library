
# TS3-NodeJS-Library

[![Build Status](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library.svg?branch=master)](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library)
[![npm](https://img.shields.io/npm/v/ts3-nodejs-library.svg)](https://www.npmjs.com/package/ts3-nodejs-library)
[![Coverage Status](https://coveralls.io/repos/github/Multivit4min/TS3-NodeJS-Library/badge.svg?branch=master)](https://coveralls.io/github/Multivit4min/TS3-NodeJS-Library?branch=master)

The TS3 NodeJS Library has been strongly influenced by [PlanetTeamSpeaks TS3 PHP
Framework](https://docs.planetteamspeak.com/ts3/php/framework/index.html)


## Install

`npm install --save ts3-nodejs-library`


## Documentation

You can find all necessary documentation [here](https://multivit4min.github.io/TS3-NodeJS-Library)!


## Example

Send a message to all non Query Clients connected:
```typescript
//import with typescript
import { TeamSpeak } from "ts3-nodejs-library"
//import with javascript
//const { TeamSpeak } = require("ts3-node-js-library")

//create a new connection
TeamSpeak.connect({
  host: "localhost",
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "",
  nickname: "NodeJS Query Framework"
}).then(teamspeak => {
  try {
    //retrieves a list of non query clients
    const clients = await ts3.clientList({ client_type: 0 })
    clients.forEach(client => {
      console.log("Sending 'Hello!' Message to", client.nickname)
      client.message("Hello!")
    })
  } catch (e) {
    console.log("Catched an error!")
    console.error(e)
  }
})
```

## Flood Protection

Flooding will be handled automatically.

When the Query gets accused of Flooding then it will return error with id 524 and an error message which states how much time needs to be waited.

This will be parsed automatically and the Query will wait for the given time (normally its 1 second) + 100 additional milliseconds (sometimes it happens the query gets banned when still sending too early)


## Authors

* **David Kartnaller** ([Multivit4min](https://github.com/Multivit4min)) - *Initial work*
* **Pascal Sthamer** ([P4sca1](https://github.com/P4sca1)) and **Mattis Krämer** ([Mattzi](https://github.com/Mattzi)) - *TypeScript typings*



See also the list of [contributors](https://github.com/Multivit4min/TS3-NodeJS-Library/graphs/contributors) who participated in this project.