//Changes the TeamSpeak Channel Name to the Current Users online

const TeamSpeak3 = require(__dirname+"/../TeamSpeak3")

//Define the Channel which should be edited
var channelid = 0

//Creates a new Connection to a TeamSpeak Server
var ts3 = new TeamSpeak3({
    host: "localhost",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "password",
    nickname: "NodeJS Query Framework",
    antispam: true,
    antispamtimer: 350,
    keepalive: true
})

function editChannel() {
	Promise.all([
		ts3.getChannelByID(channelid),
		ts3.serverInfo()
	]).then(res => {
		var channel = res[0]
		var serverinfo = res[1]
		var name = serverinfo.virtualserver_clientsonline+"/"+serverinfo.virtualserver_maxclients+" online" //will be like => "10/32 online"
		channel.edit({channel_name: name}) //Edits the Channel Name
	}) 
}

ts3.on("ready", async () => {
	//if no channelid is given list all Channel with their IDs
	if (channelid == 0) {
		console.log("No Channel ID given, listing all Channels available")
		var channels = ts3.channelList()
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
    console.log("Error", e)
})

//Close event gets fired when the Connection to the TeamSpeak Server has been closed
//the e variable is not always set
ts3.on("close", e => {
    console.log("Connection has been closed!", e)
})
