import { TeamSpeak } from "./src/TeamSpeak"

TeamSpeak.connect({
  host: "10.10.12.105",
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "MakY1Uu6"
}).then(async teamspeak => {
  console.log(await teamspeak.createSnapshot())
})