
# TS3-NodeJS-Library

[![Build Status](https://github.com/multivit4min/TS3-NodeJS-LIbrary/workflows/Node%20CI/badge.svg)](https://github.com/Multivit4min/TS3-NodeJS-Library/actions)
[![npm](https://img.shields.io/npm/v/ts3-nodejs-library.svg)](https://www.npmjs.com/package/ts3-nodejs-library)
[![Coverage Status](https://coveralls.io/repos/github/Multivit4min/TS3-NodeJS-Library/badge.svg?branch=master)](https://coveralls.io/github/Multivit4min/TS3-NodeJS-Library?branch=master)
[![Discord](https://img.shields.io/discord/653273459840778270)](https://discord.gg/Z5rdcGu)

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
//const { TeamSpeak } = require("ts3-nodejs-library")

//create a new connection
TeamSpeak.connect({
  host: "localhost",
  protocol: QueryProtocol.RAW, //optional
  queryport: 10011, //optional
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
import { TeamSpeak } from "ts3-nodejs-library"

TeamSpeak.connect({
  host: "127.0.0.1",
  queryport: 10011
}).then(teamspeak => {
  //you are now connected
}).catch(e => {
  //an error occured during connecting
})
```

> when instanciating it by yourself:

```javascript
import { TeamSpeak } from "ts3-nodejs-library"

const teamspeak = new TeamSpeak({
  host: "127.0.0.1",
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

You can use `teamspeak.on()` to register to various events, you can find a list of all events here: https://multivit4min.github.io/TS3-NodeJS-Library/classes/teamspeak.html#on
Note: with 3.x its not necessary to subscribe to events anymore, this will be done automatically now!

```javascript
teamspeak.on("textmessage", ev => {
  console.log(`${ev.invoker.nickname} just send the message "${ev.msg}"`)
})
```

### Flood Protection

Flooding will be handled automatically.

When the Query gets accused of Flooding then it will return error with id 524 and an error message which states how much time needs to be waited.

This will be parsed automatically and the Query will wait for the given time (normally its 1 second) + 100 additional milliseconds (sometimes it happens the query gets banned when still sending too early)


# Reconnecting


With version 2.3 this library is able to reconnect to its TeamSpeak Server when the connection has been lost.
It restores its full context this includes:
  * selecting the server
  * logging in with the last credentials
  * subscribing to all used events
  * selecting the correct nickname

all commands which have been added in meantime while the teamspeak server was not connected will be still executed after and all pending commands will be sent AFTER connecting and restoring the context

an example on how this looks like:

```typescript
import { TeamSpeak, QueryProtocol } from "./src/TeamSpeak"

TeamSpeak.connect({
  host: "127.0.0.1",
  queryport: 10011,
  serverport: 9987,
  protocol: QueryProtocol.RAW,
  username: "serveradmin",
  password: "xxx",
  nickname: "test"
}).then(async teamspeak => {

  teamspeak.on("close", async () => {
    console.log("disconnected, trying to reconnect...")
    await teamspeak.reconnect(-1, 1000)
    console.log("reconnected!")
  })

})
```



# Update Notes from 1.x to 2.x

With version 2.x support for Client Events has been dropped instead use the events from the main class TeamSpeak.
Additionally it comes with `TeamSpeak.connect()` in order to use a promise to connect to a teamspeak server.
Multiple node methods have been replaced with a getter for ex: `client.getDBID()` -> `client.databaseId`, `client.getUID()` -> `client.uniqueIdentifier`, `channel.getID()` -> `channel.cid`
The testing environment now runs via jest which makes mocking and testing easier. Since this project now is written in TypeScript vscode should now be completely capable to autocomplete, so there is no need to update docs on @types.
Documentation software has been switched from `documentation` to `typedoc`


# Update Notes to 2.3

The `close` event now only gets fired when a connection has been successfully established first!
In order to get errors when connecting to a server use the `error` event instead. This was required in order to implement the reconnect logic.

# Update Notes to 3.0

### Some Parameters are now strings instead of numbers

With the free Beta TeamSpeak Servers for the TeamSpeak 5 Client there are IDs which use a 64 bit format.
Since JavaScript starts to round at 53 bits those IDs will not be displayed correctly. In order to compensate this all IDs are now strings instead of numbers!


### Function renames

Renamed some function in order to comply with JavaScript Standard

`TeamSpeak#getClientByID` -> `TeamSpeak#getClientById`\
`TeamSpeak#getClientByUID` -> `TeamSpeak#getClientByUid`\
`TeamSpeak#getClientByDBID` -> `TeamSpeak#getClientByDbid`\
......\
`TeamSpeak#getChannelByID` -> `TeamSpeak#getChannelById`\

### Update to Permissions

Permissions will now be handled differently, if you for example want to add a Permission onto a ServerGroup then you can use 


```typescript
const group = await teamspeak.getServerGroupById(10)
if (!group) throw new Error("could not find group with id 10")
//old await teamspeak.serverGroupAddPerm(10, "i_channel_subscribe_power", 10, 0, 1)
await teamspeak.serverGroupAddPerm(group, {
  permname: "i_channel_subscribe_power",
  permvalue: 10,
  skip: false,
  negate: true
})
//or alternatively you can use it via the permission object
await teamspeak.serverGroupAddPerm(group)
  .perm("i_channel_subscribe_power")
  .value(10)
  .skip(false)
  .negate(true)
  .update()
```

Permission List commands will now not give back a raw object but will give you an array of Permission class
which you can dynamically update after, for example if you want to add all existing permissions the skip flag

```typescript
const group = await teamspeak.getServerGroupById(10)
if (!group) throw new Error("could not find group with id 10")
const permlist = await group.permList()
await Promise.all(permlist.map(perm => perm.skip(true).update()))
```

or if you want to remove all permissions:

```typescript
const group = await teamspeak.getServerGroupById(10)
if (!group) throw new Error("could not find group with id 10")
const permlist = await group.permList()
await Promise.all(permlist.map(perm => perm.remove()))
```

To retrieve the permission name or value you can use
`perm.getValue()`, `perm.getPerm()`, `perm.getSkip()`, `perm.getNegate()`

### Update to all parameters

all Parameters are now returned as camelcase and require camelcase characters in object properties
```typescript
console.log(await teamspeak.whoami())
/**
 * with < 3.0 it looked like:
 * {
 *   virtualserver_status: "unknown",
 *   virtualserver_unique_identifier: undefined,
 *   virtualserver_port: 0,
 *   virtualserver_id: 0,
 *   client_id: 0,
 *   client_channel_id: 0,
 *   client_nickname: undefined,
 *   client_database_id: 0,
 *   client_login_name: undefined,
 *   client_unique_identifier: undefined,
 *   client_origin_server_id: 0
 * }
 * with converted to camelcase the response will look like:
 * {
 *   virtualserverStatus: "unknown",
 *   virtualserverUniqueIdentifier: undefined,
 *   virtualserverPort: 0,
 *   virtualserverId: 0,
 *   clientId: 0,
 *   clientChannelId: 0,
 *   clientNickname: undefined,
 *   clientDatabaseId: 0,
 *   clientLoginName: undefined,
 *   clientUniqueIdentifier: undefined,
 *   clientOriginServerId: 0
 * }
 */
```

the same is for parameters given to update certain things for example:
```typescript
const channel = await teamspeak.getChannelById(10)
if (!channel) throw new Error("could not find channel with id 10")
//with version < 3.0
channel.edit({
  channel_name: "foo",
  channel_password: "bar",
  channel_description: "lorem ipsum"
})
//with version >= 3.0
channel.edit({
  channelName: "foo",
  channelPassword: "bar",
  channelDescription: "lorem ipsum"
})
```

In favor to have `TeamSpeak#uploadIcon()` a new dependency has been added `buffer-crc32`
Upload Icon takes as first argument the icon buffer and returns after a finnished upload the crc32 value of the buffer

### Events

With 3.0 you do not need to subscribe to server events manually anymore! This will now done automatically when necessary!
So you can remove those lines from your code:
```typescript
Promise.all([
  teamspeak.registerEvent("server"),
  teamspeak.registerEvent("channel", 0),
  teamspeak.registerEvent("textserver"),
  teamspeak.registerEvent("textchannel"),
  teamspeak.registerEvent("textprivate")
])
```


# Authors

* **David Kartnaller** ([Multivit4min](https://github.com/Multivit4min)) - *Initial work*
* **Pascal Sthamer** ([P4sca1](https://github.com/P4sca1)) and **Mattis Krämer** ([Mattzi](https://github.com/Mattzi)) - *TypeScript typings*
* **Alexander** ([xIAlexanderIx](https://github.com/xIAlexanderIx))



See also the list of [contributors](https://github.com/Multivit4min/TS3-NodeJS-Library/graphs/contributors) who participated in this project.
