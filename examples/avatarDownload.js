const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")
const fs = require("fs")

var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "password",
    nickname: "NodeJS Query Framework",
    keepalive: true
})

ts3.on("ready", () => {
    var client = false
    ts3.clientList({client_type: 0})
        .then(clients => {
            if (!clients[0]) return console.log("No Client Found!")
            client = clients[0]
            return client.getAvatar()
        }).then(buffer => {
            fs.writeFileSync(__dirname+"/avatar", buffer)
            console.log("Avatar from Client "+client.getCache().client_nickname+" downloaded and saved to", __dirname+"/avatar")
            ts3.quit()
        }).catch(e => console.log("CATCHED", e.message))
})

ts3.on("error", e => {
    console.log("Error", e.message)
})

ts3.on("close", e => {
    console.log("Connection has been closed!", e)
})
