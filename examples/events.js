const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")

//Creates a new Connection to a TeamSpeak Server
var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "password",
    nickname: "NodeJS Query Framework",
    keepalive: true
})

//The clientconnect event gets fired when a new Client joins the selected TeamSpeak Server
ts3.on("clientconnect", ev => {
    var client = ev.client
    //the .getCache() method returns the data from the last Client List command
    var nick = client.getCache().client_nickname
    console.log("Client "+nick+" just connected")
    //Event gets fired when the Client moves to a different Channel
    client.on("move", channel => console.log(nick+" just moved to Channel "+ channel.getCache().channel_name))
    //Event gets fired when the Client sends a message to the bot
    client.on("message", msg => console.log(nick+" just sent '"+msg+"'"))
    //Event gets fired when the Client disconnects from the Server
    client.on("disconnect", () => console.log(nick+" just disconnected :("))
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

//Error event gets fired when an Error during connecting or an Error during Processing of an Event happens
ts3.on("error", e => {
    console.log("Error", e.message)
})

//Close event gets fired when the Connection to the TeamSpeak Server has been closed
//the e variable is not always set
ts3.on("close", e => {
    console.log("Connection has been closed!", e)
})
