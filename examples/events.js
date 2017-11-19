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
    var client = ev.client
    var nick = (await client.getInfo()).client_nickname
    console.log("Client "+nick+" just connected")
    client.on("move" => async channel => console.log(nick+" just moved to Channel "+(await ev.channel.getInfo()).channel_name))
    client.on("message", msg => console.log(nick+" just sent '"+msg+"'"))
    client.on("disconnect", () => console.log(nick+" just disconnected :("))
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