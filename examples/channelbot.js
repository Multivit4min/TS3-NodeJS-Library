//Changes the TeamSpeak Channel Name to the Current Users online

const TeamSpeak3 = require("./../TeamSpeak3")

//Define the Channel which should be edited
const channelid = 0

//Creates a new Connection to a TeamSpeak Server
const ts3 = new TeamSpeak3({
  host: "localhost",
  queryport: 10011,
  serverport: 9987,
  username: "serveradmin",
  password: "password",
  nickname: "NodeJS Query Framework",
  keepalive: true
})

function editChannel() {
  Promise.all([
    ts3.getChannelByID(channelid),
    ts3.serverInfo()
  ]).then(([channel, { virtualserver_clientsonline, virtualserver_maxclients }]) => {
    //will be like => "10/32 online"
    const name = `${virtualserver_clientsonline}/${virtualserver_maxclients} online`
    //Edits the Channel Name
    channel.edit({channel_name: name})
  })
}

ts3.on("ready", async () => {
  //if no channelid is given list all Channel with their IDs
  if (channelid === 0) {
    console.log("No Channel ID given, listing all Channels available")
    const channels = await ts3.channelList()
    channels.forEach(channel => {
      //Logs the Channel ID and the Channel Name
      console.log(channel.getCID(), channel.getCache().channel_name)
    })
  } else {
    //Edit the Channel when the Bot starts, when a user leaves and when a user connects
    editChannel()
    ts3.on("clientconnect", editChannel)
    ts3.on("clientdisconnect", editChannel)
  }
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