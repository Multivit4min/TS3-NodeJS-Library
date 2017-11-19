const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")
const Promise = require("bluebird") 

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

ts3.on("clientconnect", async ev => {
    console.log("Client "+(await ev.client.getInfo()).client_nickname+" just connected")
})

ts3.on("textmessage", async ev => {
    console.log((await ev.invoker.getInfo()).client_nickname+" just sent '"+ ev.msg +"'")
})

ts3.on("clientmoved", async ev => {
    console.log((await ev.client.getInfo()).client_nickname+" just moved to Channel "+(await ev.channel.getInfo()).channel_name)
})

ts3.on("ready", () => {
    Promise.all([
        ts3.registerEvent("server"),
        ts3.registerEvent("channel", 0),
        ts3.registerEvent("textserver"),
        ts3.registerEvent("textchannel"),
        ts3.registerEvent("textprivate")
    ]).then(() => {
        console.log("Subscribed to all Events")
    }).catch(e => {
        console.log("CATCHED", e)
    })
})

ts3.on("error", e => {
    console.log("Error", e)
})

ts3.on("close", e => {
    console.log("Connection has been closed!", e)
})