const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")

//Creates a new Connection to a TeamSpeak Server
var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "password",
    nickname: "NodeJS Query Framework",
    //antispam: true,
    antispamtimer: 350,
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


ts3.on("ready", async () => {
    //Get all non query clients
    var clients = await ts3.clientList({ client_type: 0 })

    clients.forEach(client => {
      //subscribe to changes on all clients which had been retrieved
      console.log("Listening on", client.getCache().client_nickname)

      //event when any property changes on the client
      //this will send an array of changes
      client.on("update", changes => {
        console.log("Changes on", client.getCache().client_nickname)
        Object.keys(changes).forEach(k => {
          console.log(k, changes[k].from, "=>", changes[k].to)
        })
      })

      //you can also subscribe to a single event
      //this will send an object with the change
      client.on("update_client_nickname", change => {
          console.log("Nickname changed", change.from, "=>", change.to)
      })
    })

    //create a check interval in order to cyclic check for changes
    //the library will handle the rest of it
    setInterval(() => ts3.clientList(), 2000)
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
