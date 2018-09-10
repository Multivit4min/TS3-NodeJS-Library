/**
 * @file TeamSpeak3.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const TS3Query = require(__dirname+"/transport/TS3Query")
const FileTransfer = require(__dirname+"/transport/FileTransfer")
const TeamSpeakClient = require(__dirname+"/property/Client")
const TeamSpeakChannel = require(__dirname+"/property/Channel")
const TeamSpeakServer = require(__dirname+"/property/Server")
const TeamSpeakServerGroup = require(__dirname+"/property/ServerGroup")
const TeamSpeakChannelGroup = require(__dirname+"/property/ChannelGroup")

const EventEmitter = require("events")

/**
 * Main TeamSpeak Query Class
 * @fires TeamSpeak3#ready
 * @fires TeamSpeak3#error
 * @fires TeamSpeak3#close
 * @fires TeamSpeak3#debug
 * @fires TeamSpeak3#channeldelete
 * @fires TeamSpeak3#channelmoved
 * @fires TeamSpeak3#channelcreate
 * @fires TeamSpeak3#channeledit
 * @fires TeamSpeak3#serveredit
 * @fires TeamSpeak3#clientmoved
 * @fires TeamSpeak3#textmessage
 * @fires TeamSpeak3#clientdisconnect
 * @fires TeamSpeak3#clientconnect
 * @fires TeamSpeak3#flooding
 */
class TeamSpeak3 extends EventEmitter {
    /**
     * Represents a TeamSpeak Server Instance
     * @version 1.0
     * @param {object} [config] - The Configuration Object
     * @param {string} [config.protocol=raw] - The Protocol to use, valid is ssh or raw
     * @param {string} [config.host=127.0.0.1] - The Host on which the TeamSpeak Server runs
     * @param {number} [config.queryport=10011] - The Queryport on which the TeamSpeak Server runs
     * @param {number} [config.serverport=9987] - The Serverport on which the TeamSpeak Instance runs
     * @param {string} [config.username] - The username to authenticate with the TeamSpeak Server
     * @param {string} [config.password] - The password to authenticate with the TeamSpeak Server
     * @param {string} [config.nickname] - The Nickname the Client should have
     * @param {boolean} [config.keepalive=true] - Whether the Query should send a keepalive
     */
    constructor(config = {}) {
        super()
        this._config = {
            protocol: config.protocol || "raw",
            host: config.host || "127.0.0.1",
            queryport: parseInt(config.queryport) || 10011,
            serverport: parseInt(config.serverport) || false,
            username: config.username || false,
            password: config.password || false,
            nickname: config.nickname || false,
            keepalive: Boolean(config.keepalive)
        }

        this._clients = {}
        this._channels = {}
        this._servergroups = {}
        this._channelgroups = {}
        this._servers = {}

        this._ts3 = new TS3Query(this._config)

        this._ts3.on("cliententerview", this._evcliententerview.bind(this))
        this._ts3.on("clientleftview", this._evclientleftview.bind(this))
        this._ts3.on("serveredited", this._evserveredited.bind(this))
        this._ts3.on("channeledited", this._evchanneledited.bind(this))
        this._ts3.on("channelmoved", this._evchannelmoved.bind(this))
        this._ts3.on("channeldeleted", this._evchanneldeleted.bind(this))
        this._ts3.on("channelcreated", this._evchannelcreated.bind(this))
        this._ts3.on("clientmoved", this._evclientmoved.bind(this))
        this._ts3.on("textmessage", this._evtextmessage.bind(this))

        this._ts3.on("connect", () => {
            var exec = []
            if (typeof this._config.username === "string" && this._config.protocol === "raw")
                exec.push(this.login(this._config.username, this._config.password))
            if (typeof this._config.serverport === "number")
                exec.push(this.useByPort(this._config.serverport))
            if (typeof this._config.nickname === "string")
                exec.push(this.clientUpdate({client_nickname: this._config.nickname}))
            Promise.all(exec)
                /**
                 * Query Ready Event
                 * Gets fired when the TeamSpeak Query has successfully connected and selected the virtual server
                 *
                 * @event TeamSpeak3#ready
                 * @memberof TeamSpeak3
                 */
                .then(r => super.emit("ready"))
                .catch(e => super.emit("error", e))
        })


        /**
         * Query Close Event
         * Gets fired when the Query disconnects from the TeamSpeak Server
         *
         * @event TeamSpeak3#close
         * @memberof TeamSpeak3
         * @type {object}
         * @returns {object} - may return an error object
         */
        this._ts3.on("close", e => super.emit("close", e))
        /**
         * Query Error Event
         * Gets fired when the TeamSpeak Query had an error while trying to connect
         * and also gets fired when there was an error after receiving an event
         *
         * @event TeamSpeak3#error
         * @memberof  TeamSpeak3
         * @returns {object} - return the error object
         */
         this._ts3.on("error", e => super.emit("error", e))
         /**
          * Query Flooding Error
          * Gets fired when the TeamSpeak Query gets flooding errors
          *
          * @event TeamSpeak3#flooding
          * @memberof  TeamSpeak3
          * @returns {object} - return the error object
          */
          this._ts3.on("flooding", e => super.emit("flooding", e))
          /**
           * Forwards any debug messages
           *
           * @event TeamSpeak3#debug
           * @memberof  TeamSpeak3
           * @returns {object} - debug data
           */
           this._ts3.on("debug", data => super.emit("debug", data))
    }


    /**
     * Client Join Event
     *
     * @event TeamSpeak3#clientconnect
     * @memberof TeamSpeak3
     * @type {object}
     * @property {TeamSpeakClient} client - The Client which joined the Server
     */
    _evcliententerview(event) {
        this._clients[event.clid] = new TeamSpeakClient(this, event)
        super.emit("clientconnect", {
            client: this._clients[String(event.clid)],
            cid: event.ctid
        })
    }


    /**
     * Client Disconnect Event
     * Events Object contains all available Informations returned by the query
     *
     * @event TeamSpeak3#clientdisconnect
     * @memberof TeamSpeak3
     * @type {object}
     * @property {object} client - The data from the last Client List Command
     * @property {object} event - The Data from the disconnect event
     */
    _evclientleftview(event) {
        super.emit("clientdisconnect", {
            client: (event.clid in this._clients) ? this._clients[event.clid].getCache() : {clid: event.clid},
            event
        })
        delete this._clients[String(event.clid)]
    }


    /**
     * Textmessage event
     *
     * @event TeamSpeak3#textmessage
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which sent a textmessage
     * @property {string} msg - The Message which has been sent
     * @property {number} targetmode - The Targetmode (1 = Client, 2 = Channel, 3 = Virtual Server)
     */
    _evtextmessage(event) {
        this.getClientByID(event.invokerid)
        .then(c => {
            super.emit("textmessage", {
                invoker: c,
                msg: event.msg,
                targetmode: event.targetmode
            })
        }).catch(e => super.emit("error", e))
    }


    /**
     * Client Move Event
     *
     * @event TeamSpeak3#clientmoved
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} client - The Client which moved
     * @property {class} channel - The Channel which the client has been moved to
     * @property {number} reasonid - Reason ID why the Client has moved (4 = Channel Kick)
     */
    _evclientmoved(event) {
        Promise.all([
            this.getClientByID(event.clid),
            this.getChannelByID(event.ctid)
        ]).then(res => {
            this.emit("clientmoved", {
                client: res[0],
                channel: res[1],
                reasonid: event.reasonid
            })
        }).catch(e => this.emit("error", e))
    }


    /**
     * Server Edit Event
     *
     * @event TeamSpeak3#serveredit
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which edited the server
     * @property {object} modified - The Properties which has been modified
     */
    _evserveredited(event) {
        this.getClientByID(event.invokerid)
        .then(client => {
            var prop = {invoker: client, modified: {}}
            Object.keys(event)
                .filter(k => k.indexOf("virtualserver_") === 0)
                .forEach(k => prop.modified[k] = event[k])
            this.emit("serveredit", prop)
        }).catch(e => this.emit("error", e))
    }


    /**
     * Channel Edit Event
     *
     * @event TeamSpeak3#channeledit
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which edited a channel
     * @property {class} channel - The Channel which has been edited
     * @property {object} modified - The Properties which has been modified
     */
    _evchanneledited(event) {
        Promise.all([
            this.getClientByID(event.invokerid),
            this.getChannelByID(event.cid)
        ]).then(res => {
            var prop = {invoker: res[0], channel: res[1], modified: {}}
            Object.keys(event)
                .filter(k => k.indexOf("channel_") === 0)
                .forEach(k => prop.modified[k] = event[k])
            this.emit("channeledit", prop)
        }).catch(e => this.emit("error", e))
    }


    /**
     * Channel Create Event
     *
     * @event TeamSpeak3#channelcreate
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which created the channel
     * @property {class} channel - The Channel which has been created
     * @property {object} modified - The Properties which has been modified
     */
    _evchannelcreated(event) {
        Promise.all([
            this.getClientByID(event.invokerid),
            this.getChannelByID(event.cid)
        ]).then(res => {
            var prop = {invoker: res[0], channel: res[1], modified: {}}
            Object.keys(args)
                .filter(k => k.indexOf("channel_") === 0)
                .forEach(k => prop.modified[k] = event[k])
            this.emit("channelcreate", prop)
        }).catch(e => this.emit("error", e))
    }


    /**
     * Channel Move Event
     *
     * @event TeamSpeak3#channelmoved
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which moved the channel
     * @property {class} channel - The Channel which has been moved
     * @property {class} parent - The new Parent Channel
     */
    _evchannelmoved(event) {
        Promise.all([
            this.getClientByID(event.invokerid),
            this.getChannelByID(event.cid),
            this.getChannelByID(event.cpid)
        ]).then(res => this.emit("channelmoved", {
            invoker: res[0],
            channel: res[1],
            parent: res[2]
        })).catch(e => this.emit("error", e))
    }


    /**
     * Channel Delete Event
     *
     * @event TeamSpeak3#channeldelete
     * @memberof TeamSpeak3
     * @type {object}
     * @property {class} invoker - The Client which deleted the channel
     * @property {class} cid - The Channel ID which has been deleted
     */
    _evchanneldeleted(event) {
        this.getClientByID(event.invokerid)
          .then(client => this.emit("channeldelete", {invoker: client, cid: event.cid}))
          .catch(e => this.emit("error", e))
    }


    /**
     * Sends a command to the TeamSpeak Server.
     * @version 1.0
     * @async
     * @param {string} Command - The Command which should get executed on the TeamSpeak Server
     * @param {object} [Object] - Optional the Parameters
     * @param {object} [Array] - Optional Flagwords
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed
     */
    execute() {
        return this._ts3.execute(...arguments)
    }


    /**
     * Change your ServerQuery clients settings using given properties.
     * @version 1.0
     * @async
     * @param {string} properties - The Properties which should be changed
     * @returns {Promise.<object>}
     */
    clientUpdate(properties) {
        return this.execute("clientupdate", properties)
    }


    /**
     * Subscribes to an Event.
     * @version 1.0
     * @async
     * @param {string} event - The Event on which should be subscribed
     * @param {number} [id] - The Channel ID, only required when subscribing to the "channel" event
     * @returns {Promise.<object>}
     */
    registerEvent(event, id) {
        return this.execute("servernotifyregister", { event, id })
    }


    /**
     * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.
     * @version 1.0
     * @async
     * @param {string} username - The Username which you want to login with
     * @param {string} password - The Password you want to login with
     * @returns {Promise.<object>}
     */
    login(username, password) {
        return this.execute("login", [username, password])
    }


    /**
     * Deselects the active virtual server and logs out from the server instance.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    logout() {
        return this._cacheCleanUp(this.execute("logout"))
    }


    /**
     * Displays the servers version information including platform and build number.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    version() {
        return this.execute("version")
    }


    /**
     * Displays detailed connection information about the server instance including uptime, number of virtual servers online, traffic information, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    hostInfo() {
        return this.execute("hostinfo")
    }


    /**
     * Displays the server instance configuration including database revision number, the file transfer port, default group IDs, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    instanceInfo() {
        return this.execute("instanceinfo")
    }


    /**
     * Changes the server instance configuration using given properties.
     * @version 1.0
     * @async
     * @param {object} properties - The stuff you want to change
     * @returns {Promise.<object>}
     */
    instanceEdit(properties) {
        return this.execute("instanceedit", properties)
    }


    /**
     * Displays a list of IP addresses used by the server instance on multi-homed machines.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    bindingList() {
        return this.execute("bindinglist")
    }


    /**
     * Selects the virtual server specified with the port to allow further interaction.
     * @version 1.0
     * @async
     * @param {number} port - The Port the Server runs on
     * @returns {Promise.<object>}
     */
    useByPort(port) {
        return this._cacheCleanUp(this.execute("use", { port }))
    }


    /**
     * Selects the virtual server specified with the sid to allow further interaction.
     * @version 1.0
     * @async
     * @param {number} sid - The Server ID
     * @returns {Promise.<object>}
     */
    useBySid(sid) {
        return this._cacheCleanUp(this.execute("use", [sid]))
    }


    /**
     * Displays information about your current ServerQuery connection including your loginname, etc.
     * @version 1.0
     * @async
     * @returns {Promise<object>} Promise object which provides the Information about the QueryClient
     */
    whoami() {
        return this.execute("whoami")
    }


    /**
     * Displays detailed configuration information about the selected virtual server including unique ID, number of clients online, configuration, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    serverInfo() {
        return this.execute("serverinfo")
    }


    /**
     * Displays the database ID of the virtual server running on the UDP port
     * @version 1.0
     * @async
     * @param {number} virtualserver_port - The Server Port where data should be retrieved
     * @returns {Promise.<object>}
     */
    serverIdGetByPort(virtualserver_port) {
        return this.execute("serveridgetbyport", { virtualserver_port })
    }


    /**
     * Changes the selected virtual servers configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.
     * @version 1.0
     * @async
     * @param {object} properties - The Server Settings which should be changed
     * @returns {Promise.<object>}
     */
    serverEdit(properties) {
        return this.execute("serveredit", properties)
    }


    /**
     * Stops the entire TeamSpeak 3 Server instance by shutting down the process.
     * @version 1.0
     * @async
     * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
     * @returns {Promise.<object>}
     */
    serverProcessStop(reasonmsg) {
        return this.execute("serverprocessstop", { reasonmsg })
    }


    /**
     * Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    connectionInfo() {
        return this.execute("serverrequestconnectioninfo")
    }


    /**
     * Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key. If virtualserver_port is not specified, the server will test for the first unused UDP port
     * @version 1.0
     * @async
     * @param {object} properties - The Server Settings
     * @returns {Promise.<object>} returns the server admin token for the new server and the response from the server creation
     */
    serverCreate(properties) {
        var servertoken = ""
        return this.execute("servercreate", properties)
          .then(({token, sid}) => {
              servertoken = token
              return this.serverList({virtualserver_id: sid})
          })
          .then(server => new Promise(fulfill => fulfill({server: server[0], token: servertoken})))
    }


    /**
     * Deletes a Server.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @returns {Promise.<object>}
     */
    serverDelete(sid) {
        return this.execute("serverdelete", { sid })
    }


    /**
     * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @returns {Promise.<object>}
     */
    serverStart(sid) {
        return this.execute("serverstart", { sid })
    }


    /**
     * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
     * @returns {Promise.<object>}
     */
    serverStop(sid, reasonmsg) {
        return this.execute("serverstop", { sid, reasonmsg })
    }


    /**
     * Creates a new server group using the name specified with name. The optional type parameter can be used to create ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Server Group
     * @param {number} [type=1] - Type of the Server Group
     * @returns {Promise.<object>}
     */
    serverGroupCreate(name, type = 1) {
        return this.execute("servergroupadd", { name, type })
          .then(({sgid}) => this.serverGroupList({ sgid }))
          .then(group => new Promise(fulfill => fulfill(group[0])))
    }


    /**
     * Displays the IDs of all clients currently residing in the server group.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @returns {Promise.<object>}
     */
    serverGroupClientList(sgid) {
        return this.execute("servergroupclientlist", { sgid }, ["-names"])
    }


    /**
     * Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be added
     * @param {number} sgid - The Server Group ID which the Client should be added to
     * @returns {Promise.<object>}
     */
    serverGroupAddClient(cldbid, sgid) {
        return this.execute("servergroupaddclient", { sgid, cldbid })
    }


    /**
     * Removes the client from the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be removed
     * @param {number} sgid - The Server Group ID which the Client should be removed from
     * @returns {Promise.<object>}
     */
    serverGroupDelClient(cldbid, sgid) {
        return this.execute("servergroupdelclient", { cldbid, sgid })
    }


    /**
     * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {number} [force=0] - If set to 1 the ServerGroup will be deleted even when Clients are in it
     * @returns {Promise.<object>}
     */
    serverGroupDel(sgid, force = 0) {
        return this.execute("servergroupdel", {sgid, force})
    }


    /**
     * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
     * @version 1.0
     * @async
     * @param {number} ssgid - the source ServerGroup
     * @param {number} [tsgid=0] - the target ServerGroup, 0 to create a new Group
     * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
     * @param {(string|boolean)} [name=false] - Name of the Group
     * @returns {Promise.<object>}
     */
    serverGroupCopy(ssgid, tsgid = 0, type = 1, name = false) {
        var properties = { ssgid, tsgid, type }
        if (typeof name === "string") properties.name = name
        return this.execute("servergroupcopy", properties)
    }


    /**
     * Changes the name of the server group
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {string} name - new name of the ServerGroup
     * @returns {Promise.<object>}
     */
    serverGroupRename(sgid, name) {
        return this.execute("servergrouprename", { sgid, name })
    }


    /**
     * Displays a list of permissions assigned to the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @returns {Promise.<object>}
     */
    serverGroupPermList(sgid, permsid = false) {
        return this.execute("servergrouppermlist", { sgid }, [permsid ? "-permsid" : null]).then(this.toArray)
    }


    /**
     * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @returns {Promise.<object>}
     */
    serverGroupAddPerm(sgid, perm, value, permsid = false, skip = 0, negate = 0) {
        var properties = { sgid }
        properties[permsid ? "permsid": "permid"] = perm
        properties.permvalue = value
        properties.permskip = skip
        properties.permnegated = negate
        return this.execute("servergroupaddperm", properties)
    }


    /**
     * Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @returns {Promise.<object>}
     */
    serverGroupDelPerm(sgid, perm, permsid = false) {
        var properties = { sgid }
        properties[permsid ? "permsid" : "permid"] = perm
        return this.execute("servergroupdelperm", properties)
    }


    /**
     * Creates a new channel using the given properties. Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Channel
     * @param {object} [properties={}] - Properties of the Channel
     * @returns {Promise.<object>}
     */
    channelCreate(name, properties = {}) {
        properties.channel_name = name
        return this.execute("channelcreate", properties)
        .then(({cid}) => this.channelList({ cid }))
        .then(c => new Promise(fulfill => fulfill(c[0])))
    }


    /**
     * Creates a new channel group using a given name. The optional type parameter can be used to create ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Channel Group
     * @param {number} [type=1] - Type of the Channel Group
     * @returns {Promise.<object>}
     */
    channelGroupCreate(name, type = 1) {
        return this.execute("channelgroupadd", { name, type })
          .then(({cgid}) => this.channelGroupList({ cgid }))
          .then(g => new Promise(fulfill => fulfill(g[0])))
    }


    /**
     * Retrieves a Single Channel by the given Channel ID
     * @version 1.0
     * @async
     * @param {number} cid - The Channel Id
     * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
     */
    getChannelByID(cid) {
        return new Promise((fulfill, reject) => {
          this.channelList({ cid })
            .then(channel => fulfill(channel[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a Single Channel by the given Channel Name
     * @version 1.0
     * @async
     * @param {number} channel_name - The Name of the Channel
     * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
     */
    getChannelByName(channel_name) {
        return new Promise((fulfill, reject) => {
          this.channelList({ channel_name })
            .then(channel => fulfill(channel[0]))
            .catch(reject)
        })
    }


    /**
     * Displays detailed configuration information about a channel including ID, topic, description, etc.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @return {Promise.<object>}
     */
    channelInfo(cid) {
        return this.execute("channelinfo", { cid })
    }


    /**
     * Moves a channel to a new parent channel with the ID cpid. If order is specified, the channel will be sorted right under the channel with the specified ID. If order is set to 0, the channel will be sorted right below the new parent.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {number} cpid - Channel Parent ID
     * @param {number} [order=0] - Channel Sort Order
     * @return {Promise.<object>}
     */
    channelMove(cid, cpid, order = 0) {
        return this.execute("channelmove", { cid, cpid, order })
    }


    /**
     * Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {number} [force=0] - If set to 1 the Channel will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    channelDelete(cid, force = 0) {
        return this.execute("channeldelete", { cid, force})
    }


    /**
     * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {object} [properties={}] - The Properties of the Channel which should get changed
     * @return {Promise.<object>}
     */
    channelEdit(cid, properties = {}) {
        properties.cid = cid
        return this.execute("channeledit", properties)
    }


    /**
     * Displays a list of permissions defined for a channel.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {boolean} [permsid=false] - Whether the Perm SID should be displayed aswell
     * @return {Promise.<object[]>}
     */
    channelPermList(cid, permsid = false) {
        return this.execute("channelpermlist", { cid }, (permsid) ? ["-permsid"] : null).then(this.toArray)
    }


    /**
     * Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - The Value which should be set
     * @param {boolean} [sid=false] - If the given Perm is a permsid
     * @return {Promise.<object>}
     */
    channelSetPerm(cid, perm, value, sid = false) {
        var properties = { cid }
        properties[(sid) ? "permsid" : "permid"] = perm
        properties.permvalue = value
        return this.execute("channeladdperm", properties)
    }


    /**
     * Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} sid - If the given Perm is a permsid
     * @return {Promise.<object>}
     */
    channelDelPerm(cid, perm, sid = false) {
        var prop = {cid: cid}
        prop[(sid) ? "permsid" : "permid"] = perm
        return this.execute("channeldelperm", prop)
    }


    /**
     * Retrieves a Single Client by the given Client ID
     * @version 1.0
     * @async
     * @param {number} clid - The Client Id
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByID(clid) {
        return new Promise((fulfill, reject) => {
          this.clientList({ clid })
            .then(clients => fulfill(clients[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a Single Client by the given Client Database ID
     * @version 1.0
     * @async
     * @param {number} client_database_id - The Client Database Id
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByDBID(client_database_id) {
        return new Promise((fulfill, reject) => {
          this.clientList({ client_database_id })
            .then(clients => fulfill(clients[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a Single Client by the given Client Unique Identifier
     * @version 1.0
     * @async
     * @param {string} client_unique_identifier - The Client Unique Identifier
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByUID(client_unique_identifier) {
        return new Promise((fulfill, reject) => {
          this.clientList({ client_unique_identifier })
            .then(clients => fulfill(clients[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a Single Client by the given Client Unique Identifier
     * @version 1.0
     * @async
     * @param {string} client_nickname - The Nickname of the Client
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByName(client_nickname) {
        return new Promise((fulfill, reject) => {
          this.clientList({ client_nickname })
            .then(clients => fulfill(clients[0]))
            .catch(reject)
        })
    }


    /**
     * Returns General Info of the Client, requires the Client to be online
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @returns {Promise.<object>} Promise with the Client Information
     */
    clientInfo(clid) {
        return this.execute("clientinfo", { clid })
    }


    /**
     * Returns the Clients Database List
     * @version 1.0.1
     * @async
     * @param {number} [start=0] - Start Offset
     * @param {number} [duration=1000] - Duration or Limit of Clients
     * @param {boolean} count - True when the results should be counted
     * @returns {Promise.<object>} Returns the Client Database Info
     */
    clientDBList(start = 0, duration = 1000, count = true) {
        return this.execute("clientdblist", { start, duration }, [(count) ? "-count" : null])
    }


    /**
     * Returns the Clients Database Info
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @returns {Promise.<object>} Returns the Client Database Info
     */
    clientDBInfo(cldbid) {
        return this.execute("clientdbinfo", { cldbid })
    }


    /**
     * Kicks the Client from the Server
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {number} reasonid - the reasonid
     * @param {string} reasonmsg - The Message the Client should receive when getting kicked
     * @returns {Promise.<object>} Promise Object
     */
    clientKick(clid, reasonid, reasonmsg) {
        return this.execute("clientkick", { clid, reasonid, reasonmsg })
    }


    /**
     * Moves the Client to a different Channel
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {number} cid - Channel ID in which the Client should get moved
     * @param {string} [cpw] - The Channel Password
     * @returns {Promise.<object>} Promise Object
     */
    clientMove(clid, cid, cpw) {
        return this.execute("clientmove", { clid, cid, cpw })
    }


    /**
     * Pokes the Client with a certain message
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    clientPoke(clid, msg) {
        return this.execute("clientpoke", { clid, msg })
    }


    /**
     * Displays a list of permissions defined for a client
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object>}
     */
    clientPermList(cldbid, permsid = false) {
        return this.execute("clientpermlist", { cldbid }, [(permsid) ? "-permsid" : null]).then(this.toArray)
    }


    /**
     * Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise.<object>}
     */
    clientAddPerm(cldbid, perm, value, permsid = false, skip = 0, negate = 0) {
        var properties = { cldbid }
        properties[(permsid) ? "permsid": "permid"] = perm
        properties.permvalue = value
        properties.permskip = skip
        properties.permnegated = negate
        return this.execute("clientaddperm", properties)
    }


    /**
     * Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @return {Promise.<object>}
     */
    clientDelPerm(cldbid, perm, permsid = false) {
        var properties = { cldbid }
        properties[(permsid) ? "permsid" : "permid"] = perm
        return this.execute("clientdelperm", properties)
    }


    /**
     * Searches for custom client properties specified by ident and value.
     * The value parameter can include regular characters and SQL wildcard characters (e.g. %).
     * @version 1.3
     * @async
     * @param {string} ident - the key to search for
     * @param {string} target - the search pattern to use
     * @returns {Promise.<object>} Promise Object
     */
    customSearch(ident, pattern) {
        return this.execute("customsearch", { ident, pattern })
    }


    /**
     * Displays a list of custom properties for the client specified with cldbid.
     * @version 1.3
     * @async
     * @param {number} cldbid - The Client Database ID which should be retrieved
     * @returns {Promise.<object>} Promise Object
     */
    customInfo(cldbid) {
        return this.execute("custominfo", { cldbid })
    }


    /**
     * Removes a custom property from a client specified by the cldbid.
     * This requires TeamSpeak Server Version 3.2.0 or newer.
     * @version 1.3
     * @async
     * @param {number} cldbid - The Client Database ID which should be changed
     * @param {string} ident - The Key which should be deleted
     * @returns {Promise.<object>} Promise Object
     */
    customDelete(cldbid, ident) {
        return this.execute("customdelete", { cldbid, ident })
    }


    /**
     * Creates or updates a custom property for client specified by the cldbid.
     * Ident and value can be any value, and are the key value pair of the custom property.
     * This requires TeamSpeak Server Version 3.2.0 or newer.
     * @version 1.3
     * @async
     * @param {number} cldbid - The Client Database ID which should be changed
     * @param {string} ident - The Key which should be set
     * @param {string} value - The Value which should be set
     * @returns {Promise.<object>} Promise Object
     */
    customSet(cldbid, ident, value) {
        return this.execute("customset", { cldbid, ident, value })
    }


    /**
     * Sends a text message a specified target.
     * The type of the target is determined by targetmode while target specifies the ID of the recipient, whether it be a virtual server, a channel or a client.
     * @version 1.0
     * @async
     * @param {string} target - target to message
     * @param {string} targetmode - targetmode (1: client, 2: channel, 3: server)
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    sendTextMessage(target, targetmode, msg) {
        return this.execute("sendtextmessage", { target, targetmode, msg})
    }


    /**
     * Retrieves a single ServerGroup by the given ServerGroup ID
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup Id
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
     */
    getServerGroupByID(sgid) {
        return new Promise((fulfill, reject) => {
          this.serverGroupList({ sgid })
            .then(groups => fulfill(groups[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a single ServerGroup by the given ServerGroup Name
     * @version 1.0
     * @async
     * @param {number} name - the ServerGroup name
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
     */
    getServerGroupByName(name) {
        return new Promise((fulfill, reject) => {
          this.serverGroupList({ name })
            .then(groups => fulfill(groups[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a single ChannelGroup by the given ChannelGroup ID
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup Id
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ChannelGroup or undefined if not found
     */
    getChannelGroupByID(cgid) {
        return new Promise((fulfill, reject) => {
          this.channelGroupList({ cgid })
            .then(groups => fulfill(groups[0]))
            .catch(reject)
        })
    }


    /**
     * Retrieves a single ChannelGroup by the given ChannelGroup Name
     * @version 1.0
     * @async
     * @param {number} name - the ChannelGroup name
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ChannelGroup or undefined if not found
     */
    getChannelGroupByName(name) {
        return new Promise((fulfill, reject) => {
          this.channelGroupList({ name })
            .then(groups => fulfill(groups[0]))
            .catch(reject)
        })
    }


    /**
     * Sets the channel group of a client
     * @version 1.0
     * @async
     * @param {number} cgid - The Channel Group which the Client should get assigned
     * @param {number} cid - The Channel in which the Client should be assigned the Group
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @return {Promise.<object>}
     */
    setClientChannelGroup(cgid, cid, cldbid) {
        return this.execute("setclientchannelgroup", { cgid, cldbid, cid })
    }


    /**
     * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {cgid} cgid - the channelgroup id
     * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    deleteChannelGroup(cgid, force = 0) {
        return this.execute("channelgroupdel", { cgid, force })
    }


    /**
     * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tcgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
     * @version 1.0
     * @async
     * @param {number} scgid - the source ChannelGroup
     * @param {number} [tcgid=0] - the target ChannelGroup (0 to create a new Group)
     * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
     * @param {(string|boolean)} [name=false] - Name of the Group
     * @return {Promise.<object>}
     */
    channelGroupCopy(scgid, tcgid = 0, type = 1, name = false) {
        var properties = { scgid, tcgid, type }
        if (typeof name === "string") properties.name = name
        return this.execute("channelgroupcopy", properties)
    }


    /**
     * Changes the name of the channel group
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id to rename
     * @param {string} name - new name of the ChannelGroup
     * @return {Promise.<object>}
     */
    channelGroupRename(cgid, name) {
        return this.execute("channelgrouprename", { cgid, name })
    }


    /**
     * Displays a list of permissions assigned to the channel group specified with cgid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id to list
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object[]>}
     */
    channelGroupPermList(cgid, permsid = false) {
        return this.execute("channelgrouppermlist", { cgid }, [(permsid) ? "-permsid" : null]).then(this.toArray)
    }


    /**
     * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise.<object>}
     */
    channelGroupAddPerm(cgid, perm, value, permsid = false, skip = 0, negate = 0) {
        var properties = { cgid }
        properties[(permsid) ? "permsid": "permid"] = perm
        properties.permvalue = value
        properties.permskip = skip
        properties.permnegated = negate
        return this.execute("channelgroupaddperm", properties)
    }


    /**
     * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @return {Promise.<object>}
     */
    channelGroupDelPerm(cgid, perm, permsid = false) {
        var properties = { cgid }
        properties[(permsid) ? "permsid" : "permid"] = perm
        return this.execute("channelgroupdelperm", properties)
    }


    /**
     * Displays the IDs of all clients currently residing in the channel group.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {number} [cid] - The Channel ID
     * @return {Promise.<TeamSpeakClient>}
     */
    channelGroupClientList(cgid, cid) {
        var properties = { cgid }
        if (typeof cid === "number") properties.cid = cid
        return this.execute("channelgroupclientlist", properties).then(this.toArray)
    }


    /**
     * Displays all permissions assigned to a client for the channel specified with cid. If permid is set to 0, all permissions will be displayed. A permission can be specified by permid or permsid.
     * @async
     * @param {number} cldbid - The Client Database ID
     * @param {number} cid - One or more Permission Names
     * @param {number} [permid] - One or more Permission IDs
     * @param {number} [permsid] - One or more Permission Names
     * @returns {Promise.<object>} retrieves assigned permissions
     */
    permOverview(cldbid, cid, permid, permsid) {
        var properties = { cldbid, cid }
        if (permid !== null && permid !== undefined) properties.permid = permid
        if (permsid !== null && permsid !== undefined) properties.permsid = permsid
        return this.execute("permoverview", properties)
    }


    /**
     * Retrieves a list of permissions available on the server instance including ID, name and description.
     * @version 1.0
     * @async
     * @returns {Promise.<object[]>} gets a list of permissions available
     */
    permissionList() {
        return this.execute("permissionlist").then(this.toArray)
    }


    /**
     * Retrieves the database ID of one or more permissions specified by permsid.
     * @version 1.0
     * @async
     * @param {(string|array)} permsid - One or more Permission Names
     * @returns {Promise.<object>} gets the specified permissions
     */
    permIdGetByName(permsid) {
        return this.execute("permidgetbyname", { permsid })
    }


    /**
     * Retrieves the current value of the permission for your own connection. This can be useful when you need to check your own privileges.
     * @version 1.0
     * @async
     * @param {number|string} key - Perm ID or Name which should be checked
     * @returns {Promise.<object>} gets the permissions
     */
    permGet(key) {
        return this.execute("permget", (typeof key === "string") ? { permsid: key } : { permid: key })
    }


    /**
     * Retrieves detailed information about all assignments of the permission. The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.
     * @version 1.0
     * @async
     * @param {(number|string)} perm - Perm ID or Name to get
     * @returns {Promise.<object>} gets the permissions
     */
    permFind(perm) {
        return this.execute("permfind", (typeof perm === "number") ? { permid: perm } : { permsid: perm })
    }


    /**
     * Restores the default permission settings on the selected virtual server and creates a new initial administrator token. Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.
     * @version 1.0
     * @async
     * @returns {Promise}
     */
    permReset() {
        return this.execute("permreset")
    }


    /**
     * Retrieves a list of privilege keys available including their type and group IDs.
     * @version 1.0
     * @async
     * @returns {Promise.<object>} gets a list of privilegekeys
     */
    privilegekeyList() {
        return this.execute("privilegekeylist").then(this.toArray)
    }


    /**
     * Create a new token. If type is set to 0, the ID specified with tokenid will be a server group ID. Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.
     * @version 1.0
     * @async
     * @param {number} tokentype - Token Type
     * @param {number} group - Depends on the Type given, add either a valid Channel Group or Server Group
     * @param {number} [cid] - Depends on the Type given, add a valid Channel ID
     * @param {string} [description] - Token Description
     * @returns {Promise.<object>}
     */
    privilegekeyAdd(tokentype, group, cid, description) {
        var properties = { tokentype, tokenid1: group }
        if (type === 1) properties.tokenid2 = cid
        if (description) properties.description = description
        return this.execute("privilegekeyadd", properties)
    }


    /**
     * Deletes an existing token matching the token key specified with token.
     * @version 1.0
     * @async
     * @param {string} token - The token which should be deleted
     * @returns {Promise.<object>}
     */
    privilegekeyDelete(token) {
        return this.execute("privilegekeydelete", { token })
    }


    /**
     * Use a token key gain access to a server or channel group. Please note that the server will automatically delete the token after it has been used.
     * @version 1.0
     * @async
     * @param {string} token - The token which should be used
     * @returns {Promise.<object>}
     */
    privilegekeyUse(token) {
        return this.execute("privilegekeyuse", { token })
    }


    /**
     * Displays a list of offline messages you've received. The output contains the senders unique identifier, the messages subject, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    messageList() {
        return this.execute("messagelist").then(this.toArray)
    }


    /**
     * Sends an offline message to the client specified by uid.
     * @version 1.0
     * @async
     * @param {string} cluid - Client Unique Identifier (uid)
     * @param {string} subject - Subject of the message
     * @param {string} text - Message Text
     * @returns {Promise.<object>}
     */
    messageAdd(cluid, subject, text) {
        return this.execute("messageadd", { cluid, subject, text })
    }


    /**
     * Sends an offline message to the client specified by uid.
     * @version 1.0
     * @async
     * @param {number} msgid - The Message ID which should be deleted
     * @returns {Promise.<object>}
     */
    messageDel(msgid) {
        return this.execute("messagedel", { msgid })
    }


    /**
     * Displays an existing offline message with the given id from the inbox.
     * @version 1.0
     * @async
     * @param {number} msgid - Gets the content of the Message
     * @returns {Promise.<object>}
     */
    messageGet(msgid) {
        return this.execute("messageget", { msgid })
    }


    /**
     * Displays an existing offline message with the given id from the inbox.
     * @version 1.0
     * @async
     * @param {number} msgid - Gets the content of the Message
     * @param {number} [flag=1] - If flag is set to 1 the message will be marked as read
     * @returns {Promise.<object>}
     */
    messageUpdate(msgid, flag = 1) {
        return this.execute("messageupdateflag", { msgid, flag })
    }


    /**
     * Displays a list of complaints on the selected virtual server. If dbid is specified, only complaints about the targeted client will be shown.
     * @version 1.0
     * @async
     * @param {number} [cldbid] - Filter only for certain Client with the given Database ID
     * @returns {Promise.<object>}
     */
    complainList(dbid) {
        return this.execute("complainlist", { cldbid }).then(this.toArray)
    }


    /**
     * Submits a complaint about the client with database ID dbid to the server.
     * @version 1.0
     * @async
     * @param {number} cldbid - Filter only for certain Client with the given Database ID
     * @param {string} [message] - The Message which should be added
     * @returns {Promise.<object>}
     */
    complainAdd(cldbid, message = "") {
        return this.execute("complainadd", { cldbid, message })
    }


    /**
     * Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server. If dbid will be left empty all complaints for the tdbid will be deleted
     * @version 1.0
     * @async
     * @param {number} tcldbid - The Target Client Database ID
     * @param {number} fcldbid - The Client Database ID which filed the Report
     * @returns {Promise.<object>}
     */
    complainDel(tcldbid, fcldbid = false) {
        var cmd = (fcldbid === false) ? "complaindelall" : "complaindel"
        var properties = { tcldbid }
        if (fcldbid === false) properties.fcldbid = fcldbid
        return this.execute(cmd, properties)
    }


    /**
     * Displays a list of active bans on the selected virtual server.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    banList() {
        return this.execute("banlist").then(this.toArray)
    }


    /**
     * Adds a new ban rule on the selected virtual server. All parameters are optional but at least one of the following must be set: ip, name, or uid.
     * @version 1.0
     * @async
     * @param {string} [ip] - IP Regex
     * @param {string} [name] - Name Regex
     * @param {string} [uid] - UID Regex
     * @param {number} time - Bantime in Seconds, if left empty it will result in a permaban
     * @param {string} banreason - Ban Reason
     * @returns {Promise.<object>}
     */
    banAdd(ip, name, uid, time, banreason) {
        return this.execute("banadd", { ip, name, uid, time, banreason })
    }


    /**
     * Removes one or all bans from the server
     * @version 1.0
     * @async
     * @param {number} [banid] - The BanID to remove, if not provided it will remove all bans
     * @returns {Promise.<object>}
     */
    banDel(banid = false) {
        return this.execute(
            (id !== false) ? "bandel" : "bandelall",
            (id !== false) ? { banid } : null
        )
    }


    /**
     * Displays a specified number of entries from the servers log. If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.
     * @version 1.0
     * @async
     * @param {number} [lines=1000] - Lines to receive
     * @param {number} [reverse=0] - Invert Output
     * @param {number} [instance=0] - Instance or Virtual Server Log
     * @param {number} [begin_pos=0] - Begin at Position
     * @returns {Promise.<object>}
     */
    logView(lines = 1000, reverse = 0, instance = 0, begin_pos = 0) {
        return this.execute("logview", { lines, reverse, instance, begin_pos })
    }


    /**
     * Writes a custom entry into the servers log. Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log. The loglevel parameter specifies the type of the entry
     * @version 1.0
     * @async
     * @param {number} loglevel - Level 1 to 4
     * @param {string} logmsg - Message to log
     * @returns {Promise.<object>}
     */
    logAdd(loglevel, logmsg) {
        return this.execute("logadd", { loglevel, logmsg })
    }


    /**
     * Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.
     * @version 1.0
     * @async
     * @param {string} msg - Message which will be sent to all instances
     * @returns {Promise.<object>}
     */
    gm(msg) {
        return this.execute("gm", { msg })
    }


    /**
     * Displays detailed database information about a client including unique ID, creation date, etc.
     * @version 1.0
     * @async
     * @param {number} cldbid - The Client Database ID which should be searched for
     * @returns {Promise.<object>}
     */
    clientDBInfo(cldbid) {
        return this.execute("clientdbinfo", { cldbid })
    }


    /**
     * Displays a list of client database IDs matching a given pattern. You can either search for a clients last known nickname or his unique identity by using the -uid option.
     * @version 1.0
     * @async
     * @param {string} pattern - The Pattern which should be searched for
     * @param {boolean} isUid - True when instead of the Name it should be searched for a uid
     * @returns {Promise.<object>}
     */
    clientDBFind(pattern, isUid = false) {
        return this.execute("clientdbfind", { pattern }, (isUid) ? ["-uid"] : [])
    }


    /**
     * Changes a clients settings using given properties.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be edited
     * @param {object} [properties={}] - The Properties which should be modified
     * @returns {Promise.<object>}
     */
    clientDBEdit(cldbid, properties = {}) {
        properties.cldbid = cldbid
        return this.execute("clientdbedit", properties)
    }


    /**
     * Deletes a clients properties from the database.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be edited
     * @param {object} properties - The Properties which should be modified
     * @returns {Promise.<object>}
     */
    clientDBDelete(cldbid) {
        return this.execute("clientdbdelete", { cldbid })
    }


    /**
     * Displays a list of virtual servers including their ID, status, number of clients online, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<TeamSpeakServer[]>}
     */
    serverList(filter = {}) {
        return this.execute("serverlist", ["-uid", "-all"])
          .then(this.toArray)
          .then(servers => this._handleCache(this._servers, servers, "virtualserver_id", TeamSpeakServer))
          .then(servers => this.constructor._filter(servers, filter))
          .then(servers => new Promise((fulfill, reject) => fulfill(servers.map(s => this._servers[s.virtualserver_id]))))
    }


    /**
     * Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise.<TeamSpeakChannelGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
     */
    channelGroupList(filter = {}) {
        return this.execute("channelgrouplist")
          .then(this.toArray)
          .then(groups => this._handleCache(this._channelgroups, groups, "cgid", TeamSpeakChannelGroup))
          .then(groups =>  this.constructor._filter(groups, filter))
          .then(groups => new Promise((fulfill, reject) => fulfill(groups.map(g => this._channelgroups[g.cgid]))))
    }


    /**
     * Displays a list of server groups available. Depending on your permissions, the output may also contain global ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise.<TeamSpeakServerGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
     */
    serverGroupList(filter = {}) {
        return this.execute("servergrouplist")
          .then(this.toArray)
          .then(groups => this._handleCache(this._servergroups, groups, "sgid", TeamSpeakServerGroup))
          .then(groups => this.constructor._filter(groups, filter))
          .then(groups => new Promise((fulfill, reject) => fulfill(groups.map(g => this._servergroups[g.sgid]))))
    }


    /**
     * Lists all Channels with a given Filter
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise<TeamSpeakChannel[]>} Promise object which returns an Array of TeamSpeak Channels
     */
    channelList(filter = {}) {
        return this.execute("channellist", ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty"])
          .then(this.toArray)
          .then(channels => this._handleCache(this._channels, channels, "cid", TeamSpeakChannel))
          .then(channels => this.constructor._filter(channels, filter))
          .then(channels => new Promise((fulfill, reject) => fulfill(channels.map(c => this._channels[c.cid]))))
    }


    /**
     * Lists all Clients with a given Filter
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise<TeamSpeakClient[]>} Promise object which returns an Array of TeamSpeak Clients
     */
    clientList(filter = {}) {
        return this.execute("clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country"])
        .then(this.toArray)
        .then(clients => this._handleCache(this._clients, clients, "clid", TeamSpeakClient))
        .then(clients => this.constructor._filter(clients, filter))
        .then(clients => new Promise((fulfill, reject) => fulfill(clients.map(c => this._clients[String(c.clid)]))))
    }


    /**
     * Displays a list of files and directories stored in the specified channels file repository.
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} [path=/] - the path to list
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftGetFileList(cid, path = "/", cpw = "") {
        return this.execute("ftgetfilelist", { cid, path, cpw }).then(this.toArray)
    }


    /**
     * Displays detailed information about one or more specified files stored in a channels file repository.
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} name - the filepath to receive
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftGetFileInfo(cid, name, cpw = "") {
        return this.execute("ftgetfileinfo", { cid, name, cpw })
    }


    /**
     * Stops the running file transfer with server-side ID serverftfid.
     * @version 1.6
     * @async
     * @param {number} serverftfid - Server File Transfer ID
     * @param {number} [del=1] - <Description Pending>
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftStop(serverftfid, del=1) {
        return this.execute("ftstop", { serverftfid, delete: del })
    }


    /**
     * Deletes one or more files stored in a channels file repository
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} name - path to the file to delete
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftDeleteFile(cid, name, cpw) {
        return this.execute("ftdeletefile", { cid, name, cpw })
    }


    /**
     * Creates new directory in a channels file repository
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} dirname - path to the directory
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftCreateDir(cid, dirname, cpw) {
        return this.execute("ftcreatedir", { cid, dirname, cpw })
    }


    /**
     * Renames a file in a channels file repository. If the two parameters tcid and tcpw are specified, the file will be moved into another channels file repository
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} oldname - the path to the file which should be renamed
     * @param {string} newname - the path to the file with the new name
     * @param {string} [tcid] - target channel id if the file should be moved to a different channel
     * @param {string} [cpw] - the channel password from where the file gets renamed
     * @param {string} [tcpw] - the channel password from where the file will get transferred to
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftRenameFile(cid, oldname, newname, tcid, cpw, tcpw) {
        return this.execute("ftrenamefile", { cid, oldname, newname, tcid, cpw, tcpw })
    }


    /**
     * Initializes a file transfer upload. clientftfid is an arbitrary ID to identify the file transfer on client-side.
     * On success, the server generates a new ftkey which is required to start uploading the file through TeamSpeak 3's file transfer interface.
     * @version 1.0
     * @async
     * @param {object} transfer - The Transfer Object
     * @param {object} [transfer.clientftfid] - Arbitary ID to Identify the Transfer
     * @param {string} transfer.name - Destination Filename
     * @param {number} transfer.size - Size of the File
     * @param {number} [transfer.cid=0] - Channel ID to upload to
     * @param {string} [transfer.cpw] - Channel Password of the Channel which will be uploaded to
     * @param {number} [transfer.overwrite=1] - <Description Pending>
     * @param {number} [transfer.resume=0] - <Description Pending>
     * @returns {Promise.<object>}
     */
    ftInitUpload(transfer) {
        if (!("clientftfid" in transfer)) transfer.clientftfid = Math.floor(Math.random() * 10000)
        if (!("cid" in transfer)) transfer.cid = 0
        if (!("resume" in transfer)) transfer.resume = 0
        if (!("overwrite" in transfer)) transfer.overwrite = 1
        return this.execute("ftinitupload", transfer)
    }


    /**
     * Initializes a file transfer download. clientftfid is an arbitrary ID to identify the file transfer on client-side.
     * On success, the server generates a new ftkey which is required to start downloading the file through TeamSpeak 3's file transfer interface.
     * @version 1.0
     * @async
     * @param {object} transfer - The Transfer Object
     * @param {string} transfer.name - Filename to Download
     * @param {number} [transfer.clientftfid] - Arbitary ID to Identify the Transfer
     * @param {number} [transfer.cid=0] - Channel ID to upload to
     * @param {string} [transfer.cpw=""] - Channel Password of the Channel which will be uploaded to
     * @param {number} [transfer.seekpos=0] - <Description Pending File Startposition?>
     * @returns {Promise.<object>}
     */
    ftInitDownload(transfer) {
        if (!("clientftfid" in transfer)) transfer.clientftfid = Math.floor(Math.random() * 10000)
        if (!("seekpos" in transfer)) transfer.seekpos = 0
        if (!("cpw" in transfer)) transfer.cpw = ""
        if (!("cid" in transfer)) transfer.cid = 0
        if (!("path" in transfer)) transfer.path = "/"
        return this.execute("ftinitdownload", transfer)
    }

    /**
     * Returns an Icon with the given Name
     * @version 1.0
     * @async
     * @param {string} path - the path whith the filename where the file should be uploaded to
     * @param {string|buffer} data - The data to upload
     * @param {number} cid - Channel ID to upload to
     * @param {string} cpw - Channel Password of the Channel which will be uploaded to
     * @returns {Promise.<object>}
     */
    uploadFile(path, data, cid, cpw) {
        return new Promise((fulfill, reject) => {
            path = name.split("/")
            var name = "/"+path.pop()
            if (typeof data === "string") data = Buffer.from(data)
            return this.ftInitUpload({ path, name, cid, cpw, size: data.byteLength })
                .then(res => {
                    if (res.size === 0) return reject(new Error(res.msg))
                    new FileTransfer(this._config.host, res.port)
                        .upload(res.ftkey, data)
                        .then(fulfill)
                        .catch(reject)
                })
        })
    }


    /**
     * Returns an Icon with the given Name
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Icon to retrieve
     * @returns {Promise.<object>}
     */
    downloadIcon(name) {
        return new Promise((fulfill, reject) => {
            return this.ftInitDownload({name: "/"+name})
                .then(res => {
                    if (res.size === 0) return reject(new Error(res.msg))
                    new FileTransfer(this._config.host, res.port)
                        .download(res.ftkey, res.size)
                        .then(fulfill)
                        .catch(reject)
                })
        })
    }


    /**
     * Gets the Icon Name of a resolveable Perm List
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    getIconName(permlist) {
        return new Promise((fulfill, reject) => {
            permlist.then(perms => {
                var found = perms.some(perm => {
                    if (perm.permsid === "i_icon_id") {
                        fulfill("icon_"+((perm.permvalue < 0) ? perm.permvalue>>>0 : perm.permvalue))
                        return true
                    }
                })
                if (!found) reject(new Error("no icon found"))
            })
        })
    }


    /**
     * Closes the ServerQuery connection to the TeamSpeak 3 Server instance.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    quit() {
        return this.execute("quit")
    }


    /**
     * Cleans up the cache after a server deselect
     * @version 1.0
     * @async
     * @private
     * @param {object} promise - The Promise which will be waited for before the cleanup
     * @returns {Promise.<object>}
     */
    _cacheCleanUp(promise) {
        return new Promise((fulfill, reject) => {
            promise.then(res => {
                this._servergroups = []
                this._channels = []
                this._clients = []
                this._channelgroups = []
                fulfill(res)
            }).catch(reject)
        })
    }


    /**
     * Parses the whole Cache by given Objects
     * @version 1.0
     * @async
     * @private
     * @param {object} cache - The Cache Object
     * @param {object} list - The List to check against the Cache
     * @param {string} key - The Key used to identify the Object inside the Cache
     * @param {object} class - The Class which should be used
     * @returns {Promise.<object>}
     */
    _handleCache(cache, list, key, Class) {
        return new Promise((fulfill, reject) => {
            var remainder = Object.keys(cache)
            list.forEach(l => {
                var k = String(l[key])
                if (remainder.indexOf(k) >= 0) {
                    cache[k].updateCache(l)
                    return remainder.splice(remainder.indexOf(k), 1)
                }
                cache[k] = new Class(this, l)
            })
            remainder.forEach(r => { delete cache[String(r)] })
            fulfill(list)
        })
    }


    /**
     * Filters an Object with given Option
     * @version 1.0
     * @private
     * @static
     * @async
     * @param {object} array - The Object which should get filtered
     * @param {object} filter - Filter Object
     * @returns {Promise.<object>}
     */
    static _filter(array, filter) {
       return new Promise(fulfill => {
           if (!Array.isArray(array)) array = [array]
           if (Object.keys(filter).length == 0)
               return fulfill(array)
           fulfill(array.filter(a => {
               return !Object.keys(filter).some(k => {
                   if (!(k in a)) return true
                   if (filter[k] instanceof RegExp) return !a[k].match(filter[k])
                   if (Array.isArray(filter[k])) return filter[k].indexOf(a[k]) === -1
                   switch (typeof a[k]) {
                       case "number": return a[k] !== parseFloat(filter[k])
                       case "string": return a[k] !== filter[k]
                       case "object": return !a[k].match(filter[k])
                   }
               })
           }))
       })
    }


    /**
     * Transforms an Input to an Array
     * @async
     * @version 1.0
     * @returns {any[]}
     */
    toArray(input) {
        return new Promise(fulfill => {
            if (typeof input == "undefined" || input === null) return fulfill([])
            if (!Array.isArray(input)) return fulfill([input])
            fulfill(input)
        })
    }


}


module.exports = TeamSpeak3
