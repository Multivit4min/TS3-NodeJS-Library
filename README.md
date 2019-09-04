
# TS3-NodeJS-Library

[![Build Status](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library.svg?branch=master)](https://travis-ci.com/Multivit4min/TS3-NodeJS-Library)
[![npm](https://img.shields.io/npm/v/ts3-nodejs-library.svg)](https://www.npmjs.com/package/ts3-nodejs-library)
[![Coverage Status](https://coveralls.io/repos/github/Multivit4min/TS3-NodeJS-Library/badge.svg?branch=master)](https://coveralls.io/github/Multivit4min/TS3-NodeJS-Library?branch=master)

The TS3 NodeJS Library has been strongly influenced by [PlanetTeamSpeaks TS3 PHP
Framework](https://docs.planetteamspeak.com/ts3/php/framework/index.html)


# Introduction

This library can connect to a TeamSpeak Server Query interface, send and receive commands aswell as upload and download files via Filetransfer!

With vscode you will receive powerful autocomplete of functions and their return values, so vscode is highly recommended!

## Install

`npm install --save ts3-nodejs-library`


# Documentation

You can find all necessary documentation [here](https://multivit4min.github.io/TS3-NodeJS-Library)!


# Example

Send a message to all non Query Clients connected:
```typescript
//import with typescript
import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library"
//import with javascript
//const { TeamSpeak } = require("ts3-node-js-library")

//create a new connection
TeamSpeak.connect({
  host: "localhost",
  protocol: QueryProtocol.RAW,
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "",
  nickname: "NodeJS Query Framework"
}).then(async teamspeak => {
  const clients = await teamspeak.clientList({ client_type: 0 })
  clients.forEach(client => {
    console.log("Sending 'Hello!' Message to", client.nickname)
    client.message("Hello!")
  })
}).catch(e => {
  console.log("Catched an error!")
  console.error(e)
})
```


# Quickstart


## Connecting to a TeamSpeak Server


There are 2 ways to connect with the TeamSpeak Server:
using the wrapper `TeamSpeak.connect()` or by instanciating the `TeamSpeak` class by yourself

> to connect with TeamSpeak.connect():

```javascript
const { TeamSpeak } = require("ts3-nodejs-library")

TeamSpeak.connect({
  host: "127.0.0.1",
  protocol: "raw",
  queryport: 10011
}).then(teamspeak => {
  //you are now connected
}).catch(e => {
  //an error occured during connecting
})
```

> when instanciating it by yourself:

```javascript
const { TeamSpeak } = require("ts3-nodejs-library")

const teamspeak = new TeamSpeak({
  host: "127.0.0.1",
  protocol: QueryProtocol.RAW,
  queryport: 10011
})

teamspeak.on("ready", () => {
  //teamspeak connected successfully
})

teamspeak.on("error", () => {
  //teamspeak had an error
})
```

### Configuration

Parameter | Default |  Description
--------- | ------- | -----------
host | "127.0.0.1" | hostname to connect to
queryport | 10011 | queryport to connect to
protocol | "raw" | either use telnet or ssh to connect to the server
serverport | `empty` | the server port to select when connecting
username | `empty` | the username to login with (required when using ssh)
password | `empty` | the password to login with (required when using ssh)
nickname | `empty` | the nickname to connect with when selecting a server
readyTimeout | 10000 | timeout in ms to wait for the connection to be built
keepAlive | true | wether a keepalive should be sent to the teamspeak server
localAddress | `empty` | local address the socket should connect from

### Error handling when connecting

the method `TeamSpeak.connect()` will do error handling for you, when the query fails to connect or some of the commands which are being initially used to connect may encounter an error then the query will disconnect and reject the Promise with an error

However when instanciating TeamSpeak by yourself an `error` event might get thrown but the `ready` event will never fire

thats why `TeamSpeak.connect()` is more preferable to build a connection

## Basic Usage

### Sending a command


Sending a command is simple, every command will return a `Promise`. If you do not know what a Promise is then please read the documentation first: [developer.mozilla.org > Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

When using NodeJS then Promises are essential for further progress


> Using Promises
>
```javascript
teamspeak.whoami().then(whoami => {
  console.log(whoami)
})
```

> Using Async/Await
>
```javascript
(async () => {
  const whoami = await teamspeak.whoami()
  console.log(whoami)
})()
```

`whoami` will then give you an object like

```javascript
{
  virtualserver_status: "online",
  virtualserver_unique_identifier: "t1lytXTeyvmHXvNJ4ZcBBd15ugs=",
  virtualserver_port: 9987,
  virtualserver_id: 1,
  client_id: 2,
  client_channel_id: 1,
  client_nickname: "serveradmin",
  client_database_id: 0,
  client_login_name: "serveradmin",
  client_unique_identifier: "serveradmin",
  client_origin_server_id: 0
}
```


### Events


To register for events you need to execute `teamspeak.registerEvent()` first in order to even receive events.

> Registering for all available Events

```javascript
Promise.all([
  teamspeak.registerEvent("server"),
  teamspeak.registerEvent("channel", 0),
  teamspeak.registerEvent("textserver"),
  teamspeak.registerEvent("textchannel"),
  teamspeak.registerEvent("textprivate")
])
```

When being registered for events you can use `teamspeak.on()` to register your event handlers

```javascript
teamspeak.on("textmessage", ev => {
  console.log(`${ev.invoker.nickname} just send the message "${ev.msg}"`)
})
```

### Flood Protection

Flooding will be handled automatically.

When the Query gets accused of Flooding then it will return error with id 524 and an error message which states how much time needs to be waited.

This will be parsed automatically and the Query will wait for the given time (normally its 1 second) + 100 additional milliseconds (sometimes it happens the query gets banned when still sending too early)


# Update Notes from 1.x to 2.x

With version 2.x support for Client Events has been dropped instead use the events from the main class TeamSpeak.
Additionally it comes with `TeamSpeak.connect()` in order to use a promise to connect to a teamspeak server.
Multiple node methods have been replaced with a getter for ex: `client.getDBID()` -> `client.databaseId`, `client.getUID()` -> `client.uniqueIdentifier`, `channel.getID()` -> `channel.cid`
The testing environment now runs via jest which makes mocking and testing easier. Since this project now is written in TypeScript vscode should now be completely capable to autocomplete, so there is no need to update docs on @types.
Documentation software has been switched from `documentation` to `typedoc`


# Authors

* **David Kartnaller** ([Multivit4min](https://github.com/Multivit4min)) - *Initial work*
* **Pascal Sthamer** ([P4sca1](https://github.com/P4sca1)) and **Mattis Krämer** ([Mattzi](https://github.com/Mattzi)) - *TypeScript typings*



See also the list of [contributors](https://github.com/Multivit4min/TS3-NodeJS-Library/graphs/contributors) who participated in this project.
