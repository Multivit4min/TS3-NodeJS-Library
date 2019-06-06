const TeamSpeak3 = require("../src/TeamSpeak3")

//Creates a new Connection to a TeamSpeak Server
const ts3 = new TeamSpeak3({
  host: "localhost",
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "password",
  nickname: "NodeJS Query Framework",
  keepAlive: true
})

//The clientconnect event gets fired when a new Client joins the selected TeamSpeak Server
ts3.on("clientconnect", ev => {
  const client = ev.client
  console.log(`Client ${client.nickname} just connected`)
  //Event gets fired when the Client moves to a different Channel
  client.on("move", channel => console.log(`${client.nickname} just moved to Channel ${channel.name}`))
  //Event gets fired when the Client disconnects from the Server
  client.on("disconnect", cache => console.log(`${cache.client_nickname} just disconnected :(`))
})

ts3.on("ready", () => {
  //This Part subscribes to all events available
  Promise.all([
    ts3.registerEvent("server"),
    ts3.registerEvent("channel", 0),
    ts3.registerEvent("textserver"),
    ts3.registerEvent("textchannel"),
    ts3.registerEvent("textprivate")
  ]).then(() => {
    console.log("Subscribed to all Events")
  }).catch(e => {
    console.log("CATCHED", e.message)
  })
})

ts3.on("textmessage", ev => {
  console.log(`${ev.invoker.nickname} sent ${ev.msg}`)
})

//Error event gets fired when an Error during connecting or an Error during Processing of an Event happens
ts3.on("error", e => {
  console.log("Error", e.message)
})

//Close event gets fired when the Connection to the TeamSpeak Server has been closed
//the e variable is not always set
ts3.on("close", e => {
  console.log("Connection has been closed!", e)
})