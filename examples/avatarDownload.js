const TeamSpeak3 = require("./../TeamSpeak3")
const fs = require("fs")

const ts3 = new TeamSpeak3({
  host: "localhost",
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "password",
  nickname: "NodeJS Query Framework",
  keepalive: true
})

ts3.on("ready", async () => {
  const [client] = await ts3.clientList({ client_type: 0 })
  if (!client) return console.log("No online client found!")
  const buffer = await client.getAvatar()
  fs.writeFileSync(`${__dirname}/avatar`, buffer)
  console.log(`Avatar from Client ${client.nickname} downloaded and saved to`, `${__dirname}/avatar`)
  ts3.quit()
})

ts3.on("error", e => {
  console.log("Error", e.message)
})

ts3.on("close", err => {
  console.log("Connection has been closed!", err)
})