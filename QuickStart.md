---
title: Quickstart Guide

language_tabs:
  - javascript
  - typescript

toc_footers:
  - <a href="https://github.com/Multivit4min/TS3-NodeJS-Library">Documentation for TS3-NodeJS-Library</a>

---

# Introduction

This library can connect to a TeamSpeak Server Query interface, send and receive commands aswell as upload and download files via Filetransfer!

# Connecting to a TeamSpeak Server

> to connect with TeamSpeak.connect():

```typescript
import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library"

TeamSpeak.connect({
  host: "127.0.0.1",
  protocol: QueryProtocol.RAW,
  queryport: 10011
}).then((teamspeak: TeamSpeak) => {
  //you are now connected
}).catch(e => {
  //an error occured during connecting
})
```

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

```typescript
import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library"

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

There are 2 ways to connect with the TeamSpeak Server:
using the wrapper `TeamSpeak.connect()` or by instanciating the `TeamSpeak` class by yourself

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

# Usage

### Sending a command

> Using Promises

```typescript
teamspeak.whoami().then(whoami => {
  console.log(whoami)
})
```

```javascript
teamspeak.whoami().then(whoami => {
  console.log(whoami)
})
```

> Using Async/Await

```typescript
(async () => {
  const whoami = await teamspeak.whoami()
  console.log(whoami)
})()
```

```javascript
(async () => {
  const whoami = await teamspeak.whoami()
  console.log(whoami)
})()
```

Sending a command is simple, every command will return a `Promise`. If you do not know what a Promise is then please read the documentation first: [developer.mozilla.org > Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

When using NodeJS then Promises are essential for further progress

`console.log(whoami)` will then give you an object like

key | value
--- | ----
virtualserver_status | "online"
virtualserver_unique_identifier | "t1lytXTeyvmHXvNJ4ZcBBd15ugs="
virtualserver_port | 9987
virtualserver_id | 1
client_id | 2
client_channel_id | 1
client_nickname | "serveradmin"
client_database_id | 0
client_login_name | "serveradmin"
client_unique_identifier | "serveradmin"
client_origin_server_id | 0


### Events

> Registering for an Event

```typescript
Promise.all([
  teamspeak.registerEvent("server"),
  teamspeak.registerEvent("channel", 0),
  teamspeak.registerEvent("textserver"),
  teamspeak.registerEvent("textchannel"),
  teamspeak.registerEvent("textprivate")
])
```

```javascript
Promise.all([
  teamspeak.registerEvent("server"),
  teamspeak.registerEvent("channel", 0),
  teamspeak.registerEvent("textserver"),
  teamspeak.registerEvent("textchannel"),
  teamspeak.registerEvent("textprivate")
])
```

To register for events you need to execute `teamspeak.registerEvent()` first in order to even receive events.

When being registered for events you can use `teamspeak.on()` to register your event handlers

```typescript
teamspeak.on("textmessage", ev => {
  console.log(`${ev.invoker.nickname} just send the message "${ev.msg}"`)
})
```

```javascript
teamspeak.on("textmessage", ev => {
  console.log(`${ev.invoker.nickname} just send the message "${ev.msg}"`)
})
```