const TeamSpeak3 = require("./../TeamSpeak3")
const fs = require("fs")
//if you want to test this example you need to install crc-32
//  > npm install crc-32
const CRC32 = require("crc-32")

const path = "/PATH/TO/THE/ICON/YOU/WANT/TO/UPLOAD"

var ts3 = new TeamSpeak3({
    host: "127.0.0.1",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "password",
    nickname: "NodeJS Query Framework",
    keepalive: true
})

ts3.on("ready", async () => {
  try {
    var data = fs.readFileSync(path)
    //generate a crc32 checksum and right shift it like the TeamSpeak Client would do
    var crc = CRC32.buf(data)>>>0
    console.log("Uploading Icon to /icons/icon_"+crc)
    await ts3.uploadFile("/icons/icon_"+crc, data, 0)
    console.log("File uploaded")
  } catch(e) {
    console.log("ERROR", e)
  }
})

ts3.on("error", e => {
    console.log("Error", e.message)
})

ts3.on("close", e => {
    console.log("Connection has been closed!", e)
})
