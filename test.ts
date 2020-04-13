import { TeamSpeak } from "./src"

TeamSpeak.connect({
  username: "serveradmin",
  password: "igT7PM8+",
  serverport: 9987
}).then(async teamspeak => {
  await Promise.all((await teamspeak.clientList()).map(async client => {
    console.log(await await client.getInfo())
  }))
})