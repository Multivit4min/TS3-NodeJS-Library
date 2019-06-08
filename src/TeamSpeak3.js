/**
 * @file TeamSpeak3.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

/**
 * @typedef {import("./helper/keytypes").RawQueryResponse} RawQueryResponse
 *
 * @typedef {import("./property/Channel")} TeamSpeakChannel
 * @typedef {import("./property/Server")} TeamSpeakServer
 * @typedef {import("./property/Client")} TeamSpeakClient
 * @typedef {import("./property/ServerGroup")} TeamSpeakServerGroup
 * @typedef {import("./property/ChannelGroup")} TeamSpeakChannelGroup
 *
 * @typedef {import("./helper/types").InstanceEditProps} InstanceEditProps
 * @typedef {import("./helper/types").ChannelEditProps} ChannelEditProps
 * @typedef {import("./helper/types").ServerEditProps} ServerEditProps
 * @typedef {import("./helper/types").ClientDBEditProps} ClientDBEditProps
 * @typedef {import("./helper/types").ClientUpdateProps} ClientUpdateProps
 *
 * @typedef {import("./helper/types").ClientInfoResponse} ClientInfoResponse
 * @typedef {import("./helper/types").ConnectionParams} ConnectionParams
 * @typedef {import("./helper/types").QueryLoginAddResponse} QueryLoginAddResponse
 * @typedef {import("./helper/types").QueryLoginListResponse} QueryLoginListResponse
 * @typedef {import("./helper/types").VersionResponse} VersionResponse
 * @typedef {import("./helper/types").HostInfoResponse} HostInfoResponse
 * @typedef {import("./helper/types").InstanceInfoResponse} InstanceInfoResponse
 * @typedef {import("./helper/types").BindingListResponse} BindingListResponse
 * @typedef {import("./helper/types").WhoamiResponse} WhoamiResponse
 * @typedef {import("./helper/types").ServerInfoResponse} ServerInfoResponse
 * @typedef {import("./helper/types").ServerIdGetByPortResponse} ServerIdGetByPortResponse
 * @typedef {import("./helper/types").ServerRequestConnectionInfoResponse} ServerRequestConnectionInfoResponse
 * @typedef {import("./helper/types").ServerCreateResponse} ServerCreateResponse
 * @typedef {import("./helper/types").ServerGroupClientListResponse} ServerGroupClientListResponse
 * @typedef {import("./helper/types").ServerGroupCopyResponse} ServerGroupCopyResponse
 * @typedef {import("./helper/types").ChannelGroupClientListResponse} ChannelGroupClientListResponse
 * @typedef {import("./helper/types").PermListResponse} PermListResponse
 * @typedef {import("./helper/types").ChannelInfoResponse} ChannelInfoResponse
 * @typedef {import("./helper/types").ClientDBListResponse} ClientDBListResponse
 * @typedef {import("./helper/types").ClientDBInfoResponse} ClientDBInfoResponse
 * @typedef {import("./helper/types").CustomSearchResponse} CustomSearchResponse
 * @typedef {import("./helper/types").CustomInfoResponse} CustomInfoResponse
 * @typedef {import("./helper/types").ChannelGroupCopyResponse} ChannelGroupCopyResponse
 * @typedef {import("./helper/types").PermOverviewResponse} PermOverviewResponse
 * @typedef {import("./helper/types").PermissionListResponse} PermissionListResponse
 * @typedef {import("./helper/types").PermIdGetByNameResponse} PermIdGetByNameResponse
 * @typedef {import("./helper/types").PermGetResponse} PermGetResponse
 * @typedef {import("./helper/types").PermFindResponse} PermFindResponse
 * @typedef {import("./helper/types").TokenResponse} TokenResponse
 * @typedef {import("./helper/types").PrivilegeKeyListResponse} PrivilegeKeyListResponse
 * @typedef {import("./helper/types").MessageListResponse} MessageListResponse
 * @typedef {import("./helper/types").MessageGetResponse} MessageGetResponse
 * @typedef {import("./helper/types").ComplainListResponse} ComplainListResponse
 * @typedef {import("./helper/types").BanListResponse} BanListResponse
 * @typedef {import("./helper/types").BanAddResponse} BanAddResponse
 * @typedef {import("./helper/types").LogViewResponse} LogViewResponse
 * @typedef {import("./helper/types").ClientDBFindResponse} ClientDBFindResponse
 * @typedef {import("./helper/types").FTGetFileListResponse} FTGetFileListResponse
 * @typedef {import("./helper/types").FTGetFileInfoResponse} FTGetFileInfoResponse
 * @typedef {import("./helper/types").FTInitUploadResponse} FTInitUploadResponse
 * @typedef {import("./helper/types").FTInitDownloadResponse} FTInitDownloadResponse
 * @typedef {import("./helper/types").ServerGroupListFilter} ServerGroupListFilter
 * @typedef {import("./helper/types").ChannelGroupListFilter} ChannelGroupListFilter
 * @typedef {import("./helper/types").ClientListFilter} ClientListFilter
 * @typedef {import("./helper/types").ChannelListFilter} ChannelListFilter
 * @typedef {import("./helper/types").ServerListFilter} ServerListFilter
 *
 * @typedef {import("./exception/ResponseError") } ResponseError
 *
 * @typedef {import("./helper/types").DebugEvent } DebugEvent
 * @typedef {import("./helper/types").ClientConnectEvent } ClientConnectEvent
 * @typedef {import("./helper/types").ClientDisconnectEvent } ClientDisconnectEvent
 * @typedef {import("./helper/types").TextMessageEvent } TextMessageEvent
 * @typedef {import("./helper/types").ClientMovedEvent } ClientMovedEvent
 * @typedef {import("./helper/types").ServerEditEvent } ServerEditEvent
 * @typedef {import("./helper/types").ChannelEditEvent } ChannelEditEvent
 * @typedef {import("./helper/types").ChannelCreateEvent } ChannelCreateEvent
 * @typedef {import("./helper/types").ChannelMoveEvent } ChannelMoveEvent
 * @typedef {import("./helper/types").ChannelDeleteEvent } ChannelDeleteEvent
 * @ignore
 */



const TS3Query = require("./transport/TS3Query")
const FileTransfer = require("./transport/FileTransfer")
const TeamSpeakClient = require("./property/Client")
const TeamSpeakChannel = require("./property/Channel")
const TeamSpeakServer = require("./property/Server")
const TeamSpeakServerGroup = require("./property/ServerGroup")
const TeamSpeakChannelGroup = require("./property/ChannelGroup")

const EventEmitter = require("events")

/**
 * Main TeamSpeak Query Class
 * @extends EventEmitter
 */
class TeamSpeak3 extends EventEmitter {

  /**
   * Represents a TeamSpeak Server Instance
   * @param {ConnectionParams} [config={}] the configuration
   */
  constructor(config = {}) {
    super()

    /**
     * @type {ConnectionParams}
     * @private
     */
    this._config = {
      protocol: "raw",
      host: "127.0.0.1",
      queryport: 10011,
      readyTimeout: 20000,
      keepAlive: true,
      ...config
    }

    /**
     * @type {TeamSpeakServer[]}
     * @private
     */
    this._servers = []

    /**
     * @type {TeamSpeakServerGroup[]}
     * @private
     */
    this._servergroups = []

    /**
     * @type {TeamSpeakChannel[]}
     * @private
     */
    this._channels = []

    /**
     * @type {TeamSpeakClient[]}
     * @private
     */
    this._clients = []

    /**
     * @type {TeamSpeakChannelGroup[]}
     * @private
     */
    this._channelgroups = []

    this._notifyevents = []
    this._selected = { port: 0, sid: 0 }

    /**
     * @type {number}
     * @private
     */
    this._build = 0

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
    this._ts3.on("connect", this._handleConnect.bind(this))


    /**
     * Query Close Event
     * Gets fired when the Query disconnects from the TeamSpeak Server
     * @event TeamSpeak3#close
     * @memberof TeamSpeak3
     * @type {Error}
     */
    this._ts3.on("close", e => super.emit("close", e))

    /**
     * Query Error Event
     * Gets fired when the TeamSpeak Query had an error while trying to connect
     * and also gets fired when there was an error after receiving an event
     * @event TeamSpeak3#error
     * @memberof  TeamSpeak3
     * @type {Error} may not be present
     */
    this._ts3.on("error", e => super.emit("error", e))

    /**
     * Query Flooding Error
     * Gets fired when the TeamSpeak Query gets flooding errors
     * @event TeamSpeak3#flooding
     * @memberof  TeamSpeak3
     * @type {ResponseError} - return the error object
     */
    this._ts3.on("flooding", e => super.emit("flooding", e))

    /**
     * Forwards any debug messages
     * @event TeamSpeak3#debug
     * @memberof  TeamSpeak3
     * @type {DebugEvent}
     */
    this._ts3.on("debug", data => super.emit("debug", data))
  }


  /**
   * Handle after successfully connecting to a TeamSpeak Server
   * @private
   */
  _handleConnect() {
    const postInit = () => {
      const exec = []
      if (typeof this._config.username === "string" && this._config.protocol === "raw")
        exec.push(this.login(this._config.username, this._config.password))
      if (typeof this._config.serverport === "number" && this._build >= 1536564584)
        exec.push(this.useByPort(this._config.serverport, this._config.nickname))
      if (typeof this._config.serverport === "number" && this._build < 1536564584)
        exec.push(this.useByPort(this._config.serverport))
      if (typeof this._config.nickname === "string" && this._build < 1536564584)
        exec.push(this.clientUpdate({ client_nickname: this._config.nickname }))
      Promise.all(exec)

        /**
         * Query Ready Event
         * Gets fired when the TeamSpeak Query has successfully connected and selected the virtual server
         * @event TeamSpeak3#ready
         * @memberof TeamSpeak3
         */
        .then(() => super.emit("ready"))
        .catch(e => super.emit("error", e))
    }
    this.version()
      .then(({ build }) => {
        this._build = build
        postInit()
      })
      .catch(e => {
        this.emit("error", e)
        postInit()
      })
  }

  /**
   * Gets called when a client connects to the TeamSpeak Server
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evcliententerview(event) {
    this.clientList()
      .then(clients => {
        const client = clients.find(client => client.getID() === event.clid)

        /**
         * Client Join Event
         * @event TeamSpeak3#clientconnect
         * @memberof TeamSpeak3
         * @type {ClientConnectEvent}
         */
        super.emit("clientconnect", { client, cid: event.ctid })
      })
      .catch(error => this.emit("error", error))
  }


  /**
   * Gets called when a client discconnects from the TeamSpeak Server
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evclientleftview(event) {
    const { clid } = event

    /**
     * Client Disconnect Event
     * Events Object contains all available Informations returned by the query
     * @event TeamSpeak3#clientdisconnect
     * @memberof TeamSpeak3
     * @type {ClientDisconnectEvent}
     */
    super.emit("clientdisconnect", {
      client: (String(clid) in this._clients) ? this._clients[clid].toJSON() : { clid },
      event
    })
    this._removeFromCache(this._clients, String(clid))
  }


  /**
   * Gets called when a chat message gets received
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evtextmessage(event) {
    this.getClientByID(event.invokerid)
      .then(invoker => {

        /**
         * Textmessage event
         * @event TeamSpeak3#textmessage
         * @memberof TeamSpeak3
         * @type {TextMessageEvent}
         */
        super.emit("textmessage", {
          invoker,
          msg: event.msg,
          targetmode: event.targetmode
        })
      }).catch(e => super.emit("error", e))
  }

  /**
   * Gets called when a client moves to a different channel
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evclientmoved(event) {
    Promise.all([
      this.getClientByID(event.clid),
      this.getChannelByID(event.ctid)
    ]).then(([client, channel]) => {

      /**
       * Client Move Event
       * @event TeamSpeak3#clientmoved
       * @memberof TeamSpeak3
       * @type {ClientMovedEvent}
       */
      this.emit("clientmoved", {
        client,
        channel,
        reasonid: event.reasonid
      })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when the server has been edited
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evserveredited(event) {
    this.getClientByID(event.invokerid)
      .then(invoker => {
        const modified = {}
        Object.keys(event)
          .filter(k => k.indexOf("virtualserver_") === 0)
          .forEach(k => modified[k] = event[k])

        /**
         * Server Edit Event
         *
         * @event TeamSpeak3#serveredit
         * @memberof TeamSpeak3
         * @type {ServerEditEvent}
         */
        this.emit("serveredit", {
          invoker,
          modified,
          reasonid: event.reasonid
        })
      }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets edited
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evchanneledited(event) {
    Promise.all([
      this.getClientByID(event.invokerid),
      this.getChannelByID(event.cid)
    ]).then(([invoker, channel]) => {
      const modified = {}
      Object.keys(event)
        .filter(k => k.indexOf("channel_") === 0)
        .forEach(k => modified[k] = event[k])

      /**
       * Channel Edit Event
       * @event TeamSpeak3#channeledit
       * @memberof TeamSpeak3
       * @type {ChannelEditEvent}
       */
      this.emit("channeledit", {
        invoker,
        channel,
        modified,
        reasonid: event.reasonid
      })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets edited
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evchannelcreated(event) {
    Promise.all([
      this.getClientByID(event.invokerid),
      this.getChannelByID(event.cid)
    ]).then(([invoker, channel]) => {
      const modified = {}
      Object.keys(event)
        .filter(k => k.indexOf("channel_") === 0)
        .forEach(k => modified[k] = event[k])

      /**
       * Channel Create Event
       * @event TeamSpeak3#channelcreate
       * @memberof TeamSpeak3
       * @type {ChannelCreateEvent}
       */
      this.emit("channelcreate", {
        invoker,
        channel,
        modified,
        cpid: event.cpid
      })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets moved
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evchannelmoved(event) {
    Promise.all([
      this.getClientByID(event.invokerid),
      this.getChannelByID(event.cid),
      this.getChannelByID(event.cpid)
    ]).then(([invoker, channel, parent]) => {

      /**
       * Channel Move Event
       * @event TeamSpeak3#channelmoved
       * @memberof TeamSpeak3
       * @type {ChannelMoveEvent}
       */
      this.emit("channelmoved", { invoker, channel, parent, order: event.order })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets deleted
   * @private
   * @param {RawQueryResponse} event the raw teamspeak event
   */
  _evchanneldeleted(event) {
    this.getClientByID(event.invokerid)
      .then(invoker => {

        /**
         * Channel Delete Event
         * @event TeamSpeak3#channeldelete
         * @memberof TeamSpeak3
         * @type {ChannelDeleteEvent}
         */
        this.emit("channeldelete", { invoker, cid: event.cid })
      })
      .catch(e => this.emit("error", e))
  }


  /**
   * Sends a raw command to the TeamSpeak Server.
   * @async
   * @param {...any} args the command which should get executed on the teamspeak server
   * @returns {Promise<RawQueryResponse[]>} Promise object which returns the information about the query executed
   * @example
   * ts3.execute("clientlist", ["-ip"])
   * ts3.execute("use", [9987], { client_nickname: "test" })
   */
  execute(...args) {
    return this._ts3.execute(...args)
  }


  /**
   * Adds a new query client login, or enables query login for existing clients.
   * When no virtual server has been selected, the command will create global query logins.
   * Otherwise the command enables query login for existing client, and cldbid must be specified.
   * @param {string} client_login_name the login name
   * @param {number} [cldbid] the database id which should be used
   * @returns {Promise<QueryLoginAddResponse>} Promise object which returns the Information about the Query executed
   */
  queryLoginAdd(client_login_name, cldbid) {
    return this.execute("queryloginadd", { client_login_name, cldbid }).then(TeamSpeak3.singleResponse)
  }

  /**
   * Deletes an existing server query login on selected server.
   * When no virtual server has been selected, deletes global query logins instead.
   * @param {number} cldbid deletes the querylogin of this client
   * @returns {Promise} resolves on success
   */
  queryLoginDel(cldbid) {
    return this.execute("querylogindel", { cldbid })
  }

  /**
   * List existing query client logins.
   * The pattern parameter can include regular characters and SQL wildcard characters (e.g. %).
   * Only displays query logins of the selected virtual server, or all query logins when no virtual server have been  selected.
   * @param {string} [pattern] the pattern to filter for client login names
   * @param {number} [start] the offset from where clients should be listed
   * @param {number} [duration] how many clients should be listed
   * @returns {Promise<QueryLoginListResponse[]>} Promise object which returns the Information about the Query executed
   */
  queryLoginList(pattern, start, duration) {
    return this.execute("queryloginlist", { pattern, start, duration }, ["-count"]).then(TeamSpeak3.toArray)
  }


  /**
   * Change your ServerQuery clients settings using given properties.
   * @async
   * @param {ClientUpdateProps} properties the properties which should be changed
   * @returns {Promise} resolves on success
   */
  clientUpdate(properties) {
    return this.execute("clientupdate", properties)
  }


  /**
   * Subscribes to an Event.
   * @async
   * @param {string} event the event on which should be subscribed
   * @param {number} [id] the channel id, only required when subscribing to the "channel" event
   * @returns {Promise} resolves on success
   */
  registerEvent(event, id) {
    return this.execute("servernotifyregister", { event, id })
      .then(res => {
        this._notifyevents.push({ event, id })
        return res
      })
  }


  /**
   * Subscribes to an Event.
   * @async
   * @returns {Promise} resolves on success
   */
  unregisterEvent() {
    return this.execute("servernotifyunregister")
      .then(res => {
        this._resetCache()
        return res
      })
  }


  /**
   * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.
   * @async
   * @param {string} username the username which you want to login with
   * @param {string} password the password you want to login with
   * @returns {Promise} resolves on success
   */
  login(username, password) {
    return this.execute("login", [username, password])
  }


  /**
   * Deselects the active virtual server and logs out from the server instance.
   * @async
   * @returns {Promise} resolves on success
   */
  logout() {
    return this.execute("logout")
      .then(res => {
        this._resetCache()
        return res
      })
  }


  /**
   * Displays the servers version information including platform and build number.
   * @async
   * @returns {Promise<VersionResponse>}
   */
  version() {
    return this.execute("version").then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays detailed connection information about the server instance including uptime,
   * number of virtual servers online, traffic information, etc.
   * @async
   * @returns {Promise<HostInfoResponse>}
   */
  hostInfo() {
    return this.execute("hostinfo").then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays the server instance configuration including database revision number,
   * the file transfer port, default group IDs, etc.
   * @async
   * @returns {Promise<InstanceInfoResponse>}
   */
  instanceInfo() {
    return this.execute("instanceinfo").then(TeamSpeak3.singleResponse)
  }


  /**
   * Changes the server instance configuration using given properties.
   * @async
   * @param {InstanceEditProps} properties - The stuff you want to change
   * @returns {Promise} resolves on success
   */
  instanceEdit(properties) {
    return this.execute("instanceedit", properties)
  }


  /**
   * Displays a list of IP addresses used by the server instance on multi-homed machines.
   * @async
   * @returns {Promise<BindingListResponse[]>}
   */
  bindingList() {
    return this.execute("bindinglist").then(TeamSpeak3.toArray)
  }


  /**
   * Selects the virtual server specified with the port to allow further interaction.
   * @async
   * @param {number} port the port the server runs on
   * @param {string} [client_nickname] set nickname when selecting a server
   * @returns {Promise} resolves on success
   */
  useByPort(port, client_nickname) {
    return this.execute("use", { port, client_nickname })
      .then(res => {
        this._resetCache()
        this._selected.port = port
        return res
      })
  }


  /**
   * Selects the virtual server specified with the sid to allow further interaction.
   * @async
   * @param {number} sid the server id
   * @param {string} [client_nickname] set nickname when selecting a server
   * @returns {Promise} resolves on success
   */
  useBySid(sid, client_nickname) {
    return this.execute("use", [sid], { client_nickname })
      .then(res => {
        this._resetCache()
        this._selected.sid = sid
        return res
      })
  }


  /**
   * Displays information about your current ServerQuery connection including your loginname, etc.
   * @async
   * @returns {Promise<WhoamiResponse>} Promise object which provides the Information about the QueryClient
   */
  whoami() {
    return this.execute("whoami").then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays detailed configuration information about the selected virtual server
   * including unique ID, number of clients online, configuration, etc.
   * @async
   * @returns {Promise<ServerInfoResponse>}
   */
  serverInfo() {
    return this.execute("serverinfo").then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays the database ID of the virtual server running on the UDP port
   * @async
   * @param {number} virtualserver_port the server port where data should be retrieved
   * @returns {Promise<ServerIdGetByPortResponse>}
   */
  serverIdGetByPort(virtualserver_port) {
    return this.execute("serveridgetbyport", { virtualserver_port }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Changes the selected virtual servers configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.
   * @async
   * @param {ServerEditProps} properties the server settings which should be changed
   * @returns {Promise} resolves on success
   */
  serverEdit(properties) {
    return this.execute("serveredit", properties)
  }


  /**
   * Stops the entire TeamSpeak 3 Server instance by shutting down the process.
   * @async
   * @param {string} [reasonmsg] specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise} resolves on success
   */
  serverProcessStop(reasonmsg) {
    return this.execute("serverprocessstop", { reasonmsg })
  }


  /**
   * Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.
   * @async
   * @returns {Promise<ServerRequestConnectionInfoResponse>}
   */
  connectionInfo() {
    return this.execute("serverrequestconnectioninfo").then(TeamSpeak3.singleResponse)
  }


  /**
   * Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key.
   * If virtualserver_port is not specified, the server will test for the first unused UDP port
   * @async
   * @param {ServerEditProps} properties the server properties
   * @returns {Promise<ServerCreateResponse>} returns the server admin token for the new server and the response from the server creation
   */
  serverCreate(properties) {
    let servertoken = ""
    return this.execute("servercreate", properties)
      .then(TeamSpeak3.singleResponse)
      .then(({ token, sid }) => {
        servertoken = token
        return this.serverList({ virtualserver_id: sid })
      })
      .then(([server]) => ({ server, token: servertoken }))
  }


  /**
   * deletes the server
   * @async
   * @param {number} sid the server id to delete
   * @returns {Promise} resolves on success
   */
  serverDelete(sid) {
    return this.execute("serverdelete", { sid })
  }


  /**
   * Starts the virtual server. Depending on your permissions,
   * you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @async
   * @param {number} sid the server id to start
   * @returns {Promise} resolves on success
   */
  serverStart(sid) {
    return this.execute("serverstart", { sid })
  }


  /**
   * Stops the virtual server. Depending on your permissions,
   * you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @async
   * @param {number} sid the server id to stop
   * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise} resolves on success
   */
  serverStop(sid, reasonmsg) {
    return this.execute("serverstop", { sid, reasonmsg })
  }


  /**
   * Creates a new server group using the name specified with name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @async
   * @param {string} name the name of the servergroup
   * @param {number} [type=1] type of the servergroup
   * @returns {Promise<TeamSpeakServerGroup>}
   */
  serverGroupCreate(name, type = 1) {
    return this.execute("servergroupadd", { name, type })
      .then(TeamSpeak3.singleResponse)
      .then(({sgid}) => this.serverGroupList({ sgid }))
      .then(group => new Promise(fulfill => fulfill(group[0])))
  }


  /**
   * Displays the IDs of all clients currently residing in the server group.
   * @async
   * @param {number} sgid the servergroup id
   * @returns {Promise<ServerGroupClientListResponse[]>}
   */
  serverGroupClientList(sgid) {
    return this.execute("servergroupclientlist", { sgid }, ["-names"]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds the client to the server group specified with sgid.
   * Please note that a client cannot be added to default groups or template groups
   * @async
   * @param {number} cldbid the client database id which should be added
   * @param {number} sgid the server group id which the client should be added to
   * @returns {Promise} resolves on success
   */
  serverGroupAddClient(cldbid, sgid) {
    return this.execute("servergroupaddclient", { sgid, cldbid })
  }


  /**
   * Removes the client from the server group specified with sgid.
   * @async
   * @param {number} cldbid the client database id which should be removed
   * @param {number} sgid the servergroup id which the Client should be removed from
   * @returns {Promise} resolves on success
   */
  serverGroupDelClient(cldbid, sgid) {
    return this.execute("servergroupdelclient", { cldbid, sgid })
  }


  /**
   * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
   * @async
   * @param {number} sgid the servergroup id
   * @param {number} [force=0] if set to 1 the servergoup will be deleted even when clients stil belong to this group
   * @returns {Promise} resolves on success
   */
  serverGroupDel(sgid, force = 0) {
    return this.execute("servergroupdel", {sgid, force})
  }


  /**
   * Creates a copy of the server group specified with ssgid.
   * If tsgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tsgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @async
   * @param {number} ssgid the source ServerGroup
   * @param {number} [tsgid=0] the target ServerGroup, 0 to create a new Group
   * @param {number} [type] the type of the servergroup (0 = Query Group | 1 = Normal Group)
   * @param {string|boolean} [name=false] name of the group
   * @returns {Promise<ServerGroupCopyResponse>}
   */
  serverGroupCopy(ssgid, tsgid = 0, type = 1, name = false) {
    const properties = { ssgid, tsgid, type }
    if (typeof name === "string") properties.name = name
    return this.execute("servergroupcopy", properties).then(TeamSpeak3.singleResponse)
  }


  /**
   * Changes the name of the server group
   * @async
   * @param {number} sgid the servergroup id
   * @param {string} name new name of the servergroup
   * @returns {Promise} resolves on success
   */
  serverGroupRename(sgid, name) {
    return this.execute("servergrouprename", { sgid, name })
  }


  /**
   * Displays a list of permissions assigned to the server group specified with sgid.
   * @async
   * @param {number} sgid the servergroup id
   * @param {boolean} [permsid=false] if the permsid option is set to true the output will contain the permission names
   * @returns {Promise<PermListResponse[]>}
   */
  serverGroupPermList(sgid, permsid = false) {
    return this.execute("servergrouppermlist", { sgid }, [permsid ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
   * @async
   * @param {number} sgid the ServerGroup id
   * @param {string|number} perm the permid or permsid
   * @param {number} value value of the Permission
   * @param {number} [skip=0] whether the skip flag should be set
   * @param {number} [negate=0] whether the negate flag should be set
   * @returns {Promise} resolves on success
   */
  serverGroupAddPerm(sgid, perm, value, skip = 0, negate = 0) {
    const properties = { sgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    properties.permvalue = value
    properties.permskip = skip
    properties.permnegated = negate
    return this.execute("servergroupaddperm", properties)
  }


  /**
   * Removes a set of specified permissions from the server group.
   * A permission can be specified by permid or permsid.
   * @async
   * @param {number} sgid the servergroup id
   * @param {string|number} perm the permid or permsid
   * @returns {Promise} resolves on success
   */
  serverGroupDelPerm(sgid, perm) {
    const properties = { sgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("servergroupdelperm", properties)
  }


  /**
   * Creates a new channel using the given properties.
   * Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.
   * @async
   * @param {string} name the name of the channel
   * @param {ChannelEditProps} [properties={}] properties of the channel
   * @returns {Promise<TeamSpeakChannel>}
   */
  channelCreate(name, properties = {}) {
    properties.channel_name = name
    return this.execute("channelcreate", properties)
      .then(TeamSpeak3.singleResponse)
      .then(({cid}) => this.channelList({ cid }))
      .then(([channel]) => channel)
  }


  /**
   * Creates a new channel group using a given name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @async
   * @param {string} name the name of the channelgroup
   * @param {number} [type=1] type of the channelgroup
   * @returns {Promise<TeamSpeakChannelGroup>}
   */
  channelGroupCreate(name, type = 1) {
    return this.execute("channelgroupadd", { name, type })
      .then(TeamSpeak3.singleResponse)
      .then(({cgid}) => this.channelGroupList({ cgid }))
      .then(([group]) => group)
  }


  /**
   * Retrieves a Single Channel by the given Channel ID
   * @async
   * @param {number} cid the channel id
   * @returns {Promise<TeamSpeakChannel>} Promise object which returns the channel object or undefined if not found
   */
  getChannelByID(cid) {
    return this.channelList({ cid })
      .then(([channel]) => channel)
  }


  /**
   * Retrieves a Single Channel by the given Channel Name
   * @async
   * @param {string} channel_name the name of the channel
   * @returns {Promise<TeamSpeakChannel>} Promise object which returns the channel object or undefined if not found
   */
  getChannelByName(channel_name) {
    return this.channelList({ channel_name })
      .then(([channel]) => channel)
  }


  /**
   * Displays detailed configuration information about a channel including ID, topic, description, etc.
   * @async
   * @param {number} cid the channel id
   * @return {Promise<ChannelInfoResponse>}
   */
  channelInfo(cid) {
    return this.execute("channelinfo", { cid }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @async
   * @param {number} cid the channel id
   * @param {number} cpid channel parent id
   * @param {number} [order=0] channel sort order
   * @return {Promise} resolves on success
   */
  channelMove(cid, cpid, order = 0) {
    return this.execute("channelmove", { cid, cpid, order })
  }


  /**
   * Deletes an existing channel by ID.
   * If force is set to 1, the channel will be deleted even if there are clients within.
   * The clients will be kicked to the default channel with an appropriate reason message.
   * @async
   * @param {number} cid the channel id
   * @param {number} [force=0] if set to 1 the channel will be deleted even when client are in it
   * @return {Promise} resolves on success
   */
  channelDelete(cid, force = 0) {
    return this.execute("channeldelete", { cid, force})
  }


  /**
   * Changes a channels configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @async
   * @param {number} cid the channel id
   * @param {ChannelEditProps} [properties={}] the properties of the channel which should get changed
   * @return {Promise} resolves on success
   */
  channelEdit(cid, properties = {}) {
    properties.cid = cid
    return this.execute("channeledit", properties)
  }


  /**
   * Displays a list of permissions defined for a channel.
   * @async
   * @param {number} cid the channel id
   * @param {boolean} [permsid=false] whether the permsid should be displayed aswell
   * @return {Promise<PermListResponse[]>}
   */
  channelPermList(cid, permsid = false) {
    return this.execute("channelpermlist", { cid }, (permsid) ? ["-permsid"] : null).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a set of specified permissions to a channel.
   * @async
   * @param {number} cid the channel id
   * @param {string|number} perm the permid or permsid
   * @param {number} value the value which should be set
   * @return {Promise} resolves on success
   */
  channelSetPerm(cid, perm, value) {
    const properties = { cid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    properties.permvalue = value
    return this.execute("channeladdperm", properties)
  }


  /**
   * Adds a set of specified permissions to a channel.
   * A permission can be specified by permid or permsid.
   * @async
   * @param {number} cid the channel id
   * @param {array} permissions the permissions to assign
   * @return {Promise} resolves on success
   * @example
   * TeamSpeak3.channelSetPerms(5, [{ permsid: "i_channel_needed_modify_power", permvalue: 75 }])
   */
  channelSetPerms(cid, permissions) {
    return this.execute("channeladdperm", { cid }, permissions)
  }


  /**
   * Removes a set of specified permissions from a channel.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid.
   * @async
   * @param {number} cid the channel id
   * @param {string|number} perm the permid or permsid
   * @return {Promise} resolves on success
   */
  channelDelPerm(cid, perm) {
    const prop = { cid }
    prop[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channeldelperm", prop)
  }


  /**
   * Retrieves a Single Client by the given Client ID
   * @async
   * @param {number} clid the client id
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
   */
  getClientByID(clid) {
    return this.clientList({ clid })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Database ID
   * @async
   * @param {number} client_database_id the client database Id
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the client or undefined if not found
   */
  getClientByDBID(client_database_id) {
    return this.clientList({ client_database_id })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @async
   * @param {string} client_unique_identifier the client unique identifier
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the client or undefined if not found
   */
  getClientByUID(client_unique_identifier) {
    return this.clientList({ client_unique_identifier })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @async
   * @param {string} client_nickname the nickname of the client
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the client or undefined if not found
   */
  getClientByName(client_nickname) {
    return this.clientList({ client_nickname })
      .then(([client]) => client)
  }


  /**
   * Returns General Info of the Client, requires the Client to be online
   * @async
   * @param {number} clid the client id
   * @returns {Promise<ClientInfoResponse>}
   */
  clientInfo(clid) {
    return this.execute("clientinfo", { clid }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Returns the Clients Database List
   * @async
   * @param {number} [start=0] start offset
   * @param {number} [duration=1000] amount of entries which should get retrieved
   * @param {boolean} count retrieve the count of entries
   * @returns {Promise<ClientDBListResponse[]>}
   */
  clientDBList(start = 0, duration = 1000, count = true) {
    return this.execute("clientdblist", { start, duration }, [count ? "-count" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Returns the Clients Database Info
   * @async
   * @param {number} cldbid the client database id
   * @returns {Promise<ClientDBInfoResponse>}
   */
  clientDBInfo(cldbid) {
    return this.execute("clientdbinfo", { cldbid }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Kicks the Client from the Server
   * @async
   * @param {number} clid the client id
   * @param {number} reasonid the reasonid
   * @param {string} reasonmsg the message the client should receive when getting kicked
   * @returns {Promise} resolves on success
   */
  clientKick(clid, reasonid, reasonmsg) {
    return this.execute("clientkick", { clid, reasonid, reasonmsg })
  }


  /**
   * Moves the Client to a different Channel
   * @async
   * @param {number} clid the client id
   * @param {number} cid channel id in which the client should get moved
   * @param {string} [cpw] the channel password
   * @returns {Promise} resolves on success
   */
  clientMove(clid, cid, cpw) {
    return this.execute("clientmove", { clid, cid, cpw })
  }


  /**
   * Pokes the Client with a certain message
   * @async
   * @param {number} clid the client id
   * @param {string} msg the message the client should receive
   * @returns {Promise} resolves on success
   */
  clientPoke(clid, msg) {
    return this.execute("clientpoke", { clid, msg })
  }


  /**
   * Displays a list of permissions defined for a client
   * @async
   * @param {number} cldbid the client database id
   * @param {boolean} [permsid=false] if the permsid option is set to true the output will contain the permission names
   * @return {Promise<PermListResponse[]>}
   */
  clientPermList(cldbid, permsid = false) {
    return this.execute("clientpermlist", { cldbid }, [(permsid) ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @async
   * @param {number} cldbid the client database id
   * @param {string|number} perm the permid or permsid
   * @param {number} value value of the permission
   * @param {number} [skip=0] whether the skip flag should be set
   * @param {number} [negate=0] whether the negate flag should be set
   * @returns {Promise} resolves on success
   */
  clientAddPerm(cldbid, perm, value, skip = 0, negate = 0) {
    const properties = { cldbid }
    properties[typeof perm === "string" ? "permsid": "permid"] = perm
    properties.permvalue = value
    properties.permskip = skip
    properties.permnegated = negate
    return this.execute("clientaddperm", properties)
  }


  /**
   * Removes a set of specified permissions from a client.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid
   * @async
   * @param {number} cldbid the client database id
   * @param {string|number} perm the permid or permsid
   * @returns {Promise} resolves on success
   */
  clientDelPerm(cldbid, perm) {
    const properties = { cldbid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("clientdelperm", properties)
  }


  /**
   * Searches for custom client properties specified by ident and value.
   * The value parameter can include regular characters and SQL wildcard characters (e.g. %).
   * @async
   * @param {string} ident the key to search for
   * @param {string} pattern the search pattern to use
   * @returns {Promise<CustomSearchResponse>}
   */
  customSearch(ident, pattern) {
    return this.execute("customsearch", { ident, pattern }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays a list of custom properties for the client specified with cldbid.
   * @async
   * @param {number} cldbid the Client Database ID which should be retrieved
   * @returns {Promise<CustomInfoResponse[]>}
   */
  customInfo(cldbid) {
    return this.execute("custominfo", { cldbid })
  }


  /**
   * Removes a custom property from a client specified by the cldbid.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @async
   * @param {number} cldbid the client Database ID which should be changed
   * @param {string} ident the key which should be deleted
   * @returns {Promise} resolves on success
   */
  customDelete(cldbid, ident) {
    return this.execute("customdelete", { cldbid, ident })
  }


  /**
   * Creates or updates a custom property for client specified by the cldbid.
   * Ident and value can be any value, and are the key value pair of the custom property.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @async
   * @param {number} cldbid the client database id which should be changed
   * @param {string} ident the key which should be set
   * @param {string} value the value which should be set
   * @returns {Promise} resolves on success
   */
  customSet(cldbid, ident, value) {
    return this.execute("customset", { cldbid, ident, value })
  }


  /**
   * Sends a text message a specified target.
   * The type of the target is determined by targetmode while target specifies the ID of the recipient,
   * whether it be a virtual server, a channel or a client.
   * @async
   * @param {number} target target client id which should receive the message
   * @param {number} targetmode targetmode (1: client, 2: channel, 3: server)
   * @param {string} msg the message the client should receive
   * @returns {Promise} resolves on success
   */
  sendTextMessage(target, targetmode, msg) {
    return this.execute("sendtextmessage", { target, targetmode, msg})
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup ID
   * @async
   * @param {number} sgid the servergroup id
   * @returns {Promise<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
   */
  getServerGroupByID(sgid) {
    return this.serverGroupList({ sgid })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup Name
   * @async
   * @param {string} name the servergroup name
   * @returns {Promise<TeamSpeakServerGroup>} Promise object which returns the srvergroup or undefined if not found
   */
  getServerGroupByName(name) {
    return this.serverGroupList({ name })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup ID
   * @async
   * @param {number} cgid the channelgroup Id
   * @returns {Promise<TeamSpeakChannelGroup>} Promise object which returns the channelgroup or undefined if not found
   */
  getChannelGroupByID(cgid) {
    return this.channelGroupList({ cgid })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup Name
   * @async
   * @param {string} name the channelGroup name
   * @returns {Promise<TeamSpeakChannelGroup>} Promise object which returns the channelgroup or undefined if not found
   */
  getChannelGroupByName(name) {
    return this.channelGroupList({ name })
      .then(([group]) => group)
  }


  /**
   * Sets the channel group of a client
   * @async
   * @param {number} cgid the channelgroup which the client should get assigned
   * @param {number} cid the channel in which the client should be assigned the group
   * @param {number} cldbid the client database id which should be added to the group
   * @return {Promise} resolves on success
   */
  setClientChannelGroup(cgid, cid, cldbid) {
    return this.execute("setclientchannelgroup", { cgid, cldbid, cid })
  }


  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @async
   * @param {number} cgid the channelgroup id
   * @param {number} [force=0] if set to 1 the channelgroup will be deleted even when clients are in it
   * @return {Promise} resolves on success
   */
  deleteChannelGroup(cgid, force = 0) {
    return this.execute("channelgroupdel", { cgid, force })
  }


  /**
   * Creates a copy of the channel group.
   * If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @async
   * @param {number} scgid the source channelgroup
   * @param {number} [tcgid=0] the target channelgroup (0 to create a new group)
   * @param {number} [type] the type of the group (0 = Template Group | 1 = Normal Group)
   * @param {string} [name] name of the goup
   * @return {Promise<ChannelGroupCopyResponse>}
   */
  channelGroupCopy(scgid, tcgid = 0, type = 1, name) {
    const properties = { scgid, tcgid, type }
    if (typeof name === "string") properties.name = name
    return this.execute("channelgroupcopy", properties).then(TeamSpeak3.singleResponse)
  }


  /**
   * Changes the name of the channel group
   * @async
   * @param {number} cgid the channelgroup id to rename
   * @param {string} name new name of the ghannelgroup
   * @return {Promise} resolves on success
   */
  channelGroupRename(cgid, name) {
    return this.execute("channelgrouprename", { cgid, name })
  }


  /**
   * Displays a list of permissions assigned to the channel group specified with cgid.
   * @async
   * @param {number} cgid the channelgroup id to list
   * @param {boolean} [permsid=false] if the permsid option is set to true the output will contain the permission names.
   * @return {Promise<PermListResponse[]>}
   */
  channelGroupPermList(cgid, permsid = false) {
    return this.execute("channelgrouppermlist", { cgid }, [(permsid) ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @async
   * @param {number} cgid the channelgroup id
   * @param {string|number} perm the permid or permsid
   * @param {number} value value of the permission
   * @param {number} [skip=0] whether the skip flag should be set
   * @param {number} [negate=0] whether the negate flag should be set
   * @return {Promise} resolves on success
   */
  channelGroupAddPerm(cgid, perm, value, skip = 0, negate = 0) {
    const properties = { cgid }
    properties[typeof perm === "string" ? "permsid": "permid"] = perm
    properties.permvalue = value
    properties.permskip = skip
    properties.permnegated = negate
    return this.execute("channelgroupaddperm", properties)
  }


  /**
   * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
   * @async
   * @param {number} cgid the channelgroup id
   * @param {string|number} perm the permid or permsid
   * @return {Promise} resolves on success
   */
  channelGroupDelPerm(cgid, perm) {
    const properties = { cgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channelgroupdelperm", properties)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @async
   * @param {number} cgid the channelgroup id
   * @param {number} [cid] the channel id
   * @return {Promise<ChannelGroupClientListResponse[]>}
   */
  channelGroupClientList(cgid, cid) {
    const properties = { cgid }
    if (typeof cid === "number") properties.cid = cid
    return this.execute("channelgroupclientlist", properties).then(TeamSpeak3.toArray)
  }


  /**
   * Displays all permissions assigned to a client for the channel specified with cid.
   * If permid is set to 0, all permissions will be displayed.
   * A permission can be specified by permid or permsid.
   * @async
   * @param {number} cldbid the client database id
   * @param {number} cid one or more permission names
   * @param {number} [permid] one or more permission ids
   * @param {number} [permsid] one or more permission names
   * @returns {Promise<PermOverviewResponse[]>}
   */
  permOverview(cldbid, cid, permid, permsid) {
    const properties = { cldbid, cid }
    if (permid !== null && permid !== undefined) properties.permid = permid
    if (permsid !== null && permsid !== undefined) properties.permsid = permsid
    return this.execute("permoverview", properties).then(TeamSpeak3.toArray)
  }


  /**
   * Retrieves a list of permissions available on the server instance including ID, name and description.
   * @async
   * @returns {Promise<PermissionListResponse[]>}
   */
  permissionList() {
    return this.execute("permissionlist").then(TeamSpeak3.toArray)
  }


  /**
   * Retrieves the database ID of one or more permissions specified by permsid.
   * @async
   * @param {string|array} permsid one or more permission names
   * @returns {Promise<PermIdGetByNameResponse>}
   */
  permIdGetByName(permsid) {
    return this.execute("permidgetbyname", { permsid }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Retrieves the current value of the permission for your own connection.
   * This can be useful when you need to check your own privileges.
   * @async
   * @param {number|string} key perm id or name which should be checked
   * @returns {Promise<PermGetResponse>}
   */
  permGet(key) {
    return this.execute("permget", (typeof key === "string") ? { permsid: key } : { permid: key }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Retrieves detailed information about all assignments of the permission.
   * The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.
   * @async
   * @param {number|string} perm perm id or name to retrieve
   * @returns {Promise<PermFindResponse[]>}
   */
  permFind(perm) {
    return this.execute("permfind", (typeof perm === "number") ? { permid: perm } : { permsid: perm })
      .then(TeamSpeak3.toArray)
  }


  /**
   * Restores the default permission settings on the selected virtual server and creates a new initial administrator token.
   * Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.
   * @async
   * @returns {Promise<TokenResponse>}
   */
  permReset() {
    return this.execute("permreset").then(TeamSpeak3.singleResponse)
  }


  /**
   * Retrieves a list of privilege keys available including their type and group IDs.
   * @async
   * @returns {Promise<PrivilegeKeyListResponse[]>} gets a list of privilegekeys
   */
  privilegeKeyList() {
    return this.execute("privilegekeylist").then(TeamSpeak3.toArray)
  }


  /**
   * Create a new token.+
   * If type is set to 0, the ID specified with tokenid will be a server group ID.
   * Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.
   * @async
   * @param {number} tokentype token type
   * @param {number} group depends on the type given, add either a valid channelgroup or servergroup
   * @param {number} [cid=0] depends on the type given, add a valid channel id
   * @param {string} [description] token description
   * @param {string} [customset] token custom set
   * @returns {Promise<TokenResponse>}
   */
  privilegeKeyAdd(tokentype, group, cid = 0, description="", customset="") {
    return this.execute("privilegekeyadd", {
      tokentype,
      tokenid1: group,
      tokenid2: cid,
      tokendescription: description,
      tokencustomset: customset
    }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Create a new privilegekey token for a ServerGroup with the given description
   * @async
   * @param {number} group servergroup which should be generated the token for
   * @param {string} [description] token description
   * @param {string} [tokencustomset] token custom set
   * @returns {Promise<TokenResponse>}
   */
  serverGroupPrivilegeKeyAdd(group, description, tokencustomset="") {
    return this.privilegeKeyAdd(0, group, 0, description, tokencustomset)
  }


  /**
   * Create a new privilegekey token for a Channel Group and assigned Channel ID with the given description
   * @async
   * @param {number} group the channel group for which the token should be valid
   * @param {number} cid channel id for which the token should be valid
   * @param {string} [description] token description
   * @param {string} [tokencustomset] token custom set
   * @returns {Promise<TokenResponse>}
   */
  channelGroupPrivilegeKeyAdd(group, cid, description, tokencustomset="") {
    return this.privilegeKeyAdd(1, group, cid, description, tokencustomset)
  }


  /**
   * Deletes an existing token matching the token key specified with token.
   * @async
   * @param {string} token the token which should be deleted
   * @returns {Promise} resolves on success
   */
  privilegeKeyDelete(token) {
    return this.execute("privilegekeydelete", { token })
  }


  /**
   * Use a token key gain access to a server or channel group.
   * Please note that the server will automatically delete the token after it has been used.
   * @async
   * @param {string} token the token which should be used
   * @returns {Promise} resolves on success
   */
  privilegeKeyUse(token) {
    return this.execute("privilegekeyuse", { token })
  }


  /**
   * Displays a list of offline messages you've received.
   * The output contains the senders unique identifier, the messages subject, etc.
   * @async
   * @returns {Promise<MessageListResponse[]>}
   */
  messageList() {
    return this.execute("messagelist").then(TeamSpeak3.toArray)
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @async
   * @param {string} cluid client unique identifier
   * @param {string} subject subject of the message
   * @param {string} message message text
   * @returns {Promise} resolves on success
   */
  messageAdd(cluid, subject, message) {
    return this.execute("messageadd", { cluid, subject, message })
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @async
   * @param {number} msgid the message id which should be deleted
   * @returns {Promise} resolves on success
   */
  messageDel(msgid) {
    return this.execute("messagedel", { msgid })
  }


  /**
   * Displays an existing offline message with the given id from the inbox.
   * @async
   * @param {number} msgid the message id
   * @returns {Promise<MessageGetResponse>}
   */
  messageGet(msgid) {
    return this.execute("messageget", { msgid }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Displays an existing offline message with the given id from the inbox.
   * @async
   * @param {number} msgid the message id
   * @param {number} [flag=1] if flag is set to 1 the message will be marked as read
   * @returns {Promise} resolves on success
   */
  messageUpdate(msgid, flag = 1) {
    return this.execute("messageupdateflag", { msgid, flag })
  }


  /**
   * Displays a list of complaints on the selected virtual server.
   * If dbid is specified, only complaints about the targeted client will be shown.
   * @async
   * @param {number} [cldbid] -filter only for certain client with the given database id
   * @returns {Promise<ComplainListResponse[]>}
   */
  complainList(cldbid) {
    return this.execute("complainlist", { cldbid }).then(TeamSpeak3.toArray)
  }


  /**
   * Submits a complaint about the client with database ID dbid to the server.
   * @async
   * @param {number} cldbid filter only for certain client with the given database id
   * @param {string} [message] the Message which should be added
   * @returns {Promise} resolves on success
   */
  complainAdd(cldbid, message = "") {
    return this.execute("complainadd", { cldbid, message })
  }


  /**
   * Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server.
   * If dbid will be left empty all complaints for the tdbid will be deleted
   * @async
   * @param {number} tcldbid the target client database id
   * @param {number} [fcldbid] the client database id which filed the report
   * @returns {Promise} resolves on success
   */
  complainDel(tcldbid, fcldbid) {
    const cmd = fcldbid > 0 ? "complaindel" : "complaindelall"
    const properties = { tcldbid }
    if (fcldbid > 0) properties.fcldbid = fcldbid
    return this.execute(cmd, properties)
  }


  /**
   * Displays a list of active bans on the selected virtual server.
   * @async
   * @param {number} [start] optional start from where clients should be listed
   * @param {number} [duration] optional duration on how much ban entries should be retrieved
   * @returns {Promise<BanListResponse[]>}
   */
  banList(start, duration) {
    return this.execute("banlist", { start, duration }).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a new ban rule on the selected virtual server.
   * All parameters are optional but at least one of the following must be set: ip, name, or uid.
   * @async
   * @deprecated
   * @param {string} [ip] ip regex
   * @param {string} [name] name regex
   * @param {string} [uid] uid regex
   * @param {number} time bantime in seconds, if left empty it will result in a permaban
   * @param {string} banreason ban reason
   * @returns {Promise<BanAddResponse>}
   */
  banAdd(ip, name, uid, time, banreason) {
    console.log("TeamSpeak3#banAdd is deprecated please use TeamSpeak3#ban instead!")
    return this.execute("banadd", { ip, name, uid, time, banreason }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Adds a new ban rule on the selected virtual server.
   * All parameters are optional but at least one of the following must be set: ip, name, uid or mytsid.
   * @async
   * @param {object} rule the ban rule to add
   * @param {string} [rule.ip] ip regular expression
   * @param {string} [rule.name] name regular expression
   * @param {string} [rule.uid] uid regular expression
   * @param {string} [rule.mytsid] myteamspeak id, use "empty" to ban all clients without connected myteamspeak
   * @param {number} [rule.time] bantime in seconds, if left empty it will result in a permaban
   * @param {string} [rule.banreason] ban reason
   * @returns {Promise<BanAddResponse>}
   */
  ban({ ip, name, uid, mytsid, time, banreason }) {
    return this.execute("banadd", { ip, name, uid, mytsid, time, banreason }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Removes one or all bans from the server
   * @async
   * @param {number} [banid] - The BanID to remove, if not provided it will remove all bans
   * @returns {Promise} resolves on success
   */
  banDel(banid) {
    if (isNaN(banid)) {
      return this.execute("bandelall")
    } else {
      return this.execute("bandel", { banid })
    }
  }


  /**
   * Displays a specified number of entries from the servers log.
   * If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.
   * @async
   * @param {number} [lines=1000] amount of lines to receive
   * @param {number} [reverse=0] invert output (like Array.reverse)
   * @param {number} [instance=0] instance or virtualserver log
   * @param {number} [begin_pos=0] begin at position
   * @returns {Promise<LogViewResponse[]>}
   */
  logView(lines = 1000, reverse = 0, instance = 0, begin_pos = 0) {
    return this.execute("logview", { lines, reverse, instance, begin_pos }).then(TeamSpeak3.toArray)
  }


  /**
   * Writes a custom entry into the servers log.
   * Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log.
   * The loglevel parameter specifies the type of the entry
   * @async
   * @param {number} loglevel level 1 to 4
   * @param {string} logmsg message to log
   * @returns {Promise} resolves on success
   */
  logAdd(loglevel, logmsg) {
    return this.execute("logadd", { loglevel, logmsg })
  }


  /**
   * Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.
   * @async
   * @param {string} msg message which will be sent to all instances
   * @returns {Promise} resolves on success
   */
  gm(msg) {
    return this.execute("gm", { msg })
  }


  /**
   * Displays a list of client database IDs matching a given pattern.
   * You can either search for a clients last known nickname or his unique identity by using the -uid option.
   * @async
   * @param {string} pattern the pattern which should be searched for
   * @param {boolean} isUid true when instead of the Name it should be searched for an uid
   * @returns {Promise<ClientDBFindResponse[]>}
   */
  clientDBFind(pattern, isUid = false) {
    return this.execute("clientdbfind", { pattern }, (isUid) ? ["-uid"] : []).then(TeamSpeak3.toArray)
  }


  /**
   * Changes a clients settings using given properties.
   * @async
   * @param {number} cldbid the client database id which should be edited
   * @param {ClientDBEditProps} [properties={}] the properties which should be modified
   * @returns {Promise} resolves on success
   */
  clientDBEdit(cldbid, properties = {}) {
    properties.cldbid = cldbid
    return this.execute("clientdbedit", properties)
  }


  /**
   * Deletes a clients properties from the database.
   * @async
   * @param {string} cldbid the client database id which should be edited
   * @returns {Promise} resolves on success
   */
  clientDBDelete(cldbid) {
    return this.execute("clientdbdelete", { cldbid })
  }


  /**
   * Displays a list of virtual servers including their ID, status, number of clients online, etc.
   * @async
   * @param {ServerListFilter} filter filter object
   * @returns {Promise<TeamSpeakServer[]>}
   */
  serverList(filter = {}) {
    return this.execute("serverlist", ["-uid", "-all"])
      .then(TeamSpeak3.toArray)
      .then(servers => this._handleCache(this._servers, servers, "virtualserver_id", TeamSpeakServer))
      .then(servers => TeamSpeak3.filter(servers, filter))
      .then(servers => servers.map(s => this._servers[s.virtualserver_id]))
  }


  /**
   * Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.
   * @async
   * @param {ChannelGroupListFilter} filter filter object
   * @returns {Promise<TeamSpeakChannelGroup[]>}
   */
  channelGroupList(filter = {}) {
    return this.execute("channelgrouplist")
      .then(TeamSpeak3.toArray)
      .then(groups => this._handleCache(this._channelgroups, groups, "cgid", TeamSpeakChannelGroup))
      .then(groups => TeamSpeak3.filter(groups, filter))
      .then(groups => groups.map(g => this._channelgroups[g.cgid]))
  }


  /**
   * Displays a list of server groups available.
   * Depending on your permissions, the output may also contain global ServerQuery groups and template groups.
   * @async
   * @param {ServerGroupListFilter} filter filter object
   * @returns {Promise<TeamSpeakServerGroup[]>}
   */
  serverGroupList(filter = {}) {
    return this.execute("servergrouplist")
      .then(TeamSpeak3.toArray)
      .then(groups => this._handleCache(this._servergroups, groups, "sgid", TeamSpeakServerGroup))
      .then(groups => TeamSpeak3.filter(groups, filter))
      .then(groups => groups.map(g => this._servergroups[g.sgid]))
  }


  /**
   * Lists all Channels with a given Filter
   * @async
   * @param {ChannelListFilter} filter filter object
   * @returns {Promise<TeamSpeakChannel[]>}
   */
  channelList(filter = {}) {
    return this.execute("channellist", ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty"])
      .then(TeamSpeak3.toArray)
      .then(channels => this._handleCache(this._channels, channels, "cid", TeamSpeakChannel))
      .then(channels => TeamSpeak3.filter(channels, filter))
      .then(channels => channels.map(c => this._channels[c.cid]))
  }


  /**
   * Lists all Clients with a given Filter
   * @async
   * @param {ClientListFilter} filter filter object
   * @returns {Promise<TeamSpeakClient[]>}
   */
  clientList(filter = {}) {
    return this.execute("clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip"])
      .then(TeamSpeak3.toArray)
      .then(clients => this._handleCache(this._clients, clients, "clid", TeamSpeakClient))
      .then(clients => TeamSpeak3.filter(clients, filter))
      .then(clients => clients.map(c => this._clients[String(c.clid)]))
  }


  /**
   * Displays a list of files and directories stored in the specified channels file repository.
   * @async
   * @param {number} cid the channel id to check for
   * @param {string} [path="/"] the path to list
   * @param {string} [cpw] the channel password
   * @returns {Promise<FTGetFileListResponse[]>}
   */
  ftGetFileList(cid, path = "/", cpw) {
    return this.execute("ftgetfilelist", { cid, path, cpw }).then(TeamSpeak3.toArray)
  }


  /**
   * Displays detailed information about one or more specified files stored in a channels file repository.
   * @async
   * @param {number} cid the channel id to check for
   * @param {string} name the filepath to receive
   * @param {string} [cpw] the channel password
   * @returns {Promise<FTGetFileInfoResponse>}
   */
  ftGetFileInfo(cid, name, cpw) {
    return this.execute("ftgetfileinfo", { cid, name, cpw }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Stops the running file transfer with server-side ID serverftfid.
   * @async
   * @param {number} serverftfid server file transfer id
   * @param {number} [del=1]
   * @returns {Promise} resolves on success
   */
  ftStop(serverftfid, del=1) {
    return this.execute("ftstop", { serverftfid, delete: del })
  }


  /**
   * Deletes one or more files stored in a channels file repository
   * @async
   * @param {number} cid the channel id to check for
   * @param {string} name path to the file to delete
   * @param {string} [cpw] the channel password
   * @returns {Promise} resolves on success
   */
  ftDeleteFile(cid, name, cpw) {
    return this.execute("ftdeletefile", { cid, name, cpw })
  }


  /**
   * Creates new directory in a channels file repository
   * @async
   * @param {number} cid the channel id to check for
   * @param {string} dirname path to the directory
   * @param {string} [cpw] the channel password
   * @returns {Promise} resolves on success
   */
  ftCreateDir(cid, dirname, cpw) {
    return this.execute("ftcreatedir", { cid, dirname, cpw })
  }


  /**
   * Renames a file in a channels file repository.
   * If the two parameters tcid and tcpw are specified, the file will be moved into another channels file repository
   * @async
   * @param {number} cid the channel id to check for
   * @param {string} oldname the path to the file which should be renamed
   * @param {string} newname the path to the file with the new name
   * @param {string} [tcid] target channel id if the file should be moved to a different channel
   * @param {string} [cpw] the channel password from where the file gets renamed
   * @param {string} [tcpw] the channel password from where the file will get transferred to
   * @returns {Promise} resolves on success
   */
  ftRenameFile(cid, oldname, newname, tcid, cpw, tcpw) {
    return this.execute("ftrenamefile", { cid, oldname, newname, tcid, cpw, tcpw })
  }


  /**
   * Initializes a file transfer upload. clientftfid is an arbitrary ID to identify the file transfer on client-side.
   * On success, the server generates a new ftkey which is required to start uploading the file through TeamSpeak 3's file transfer interface.
   * @async
   * @param {object} transfer the transfer object
   * @param {number} [transfer.clientftfid] arbitary id to identify the transfer
   * @param {string} transfer.name destination filename
   * @param {number} transfer.size size of the file
   * @param {number} [transfer.cid=0] channel id to upload to
   * @param {string} [transfer.cpw] channel password of the channel which will be uploaded to
   * @param {number} [transfer.overwrite=1] overwrites an existing file
   * @param {number} [transfer.resume=0]
   * @returns {Promise<FTInitUploadResponse>}
   */
  ftInitUpload(transfer) {
    return this.execute("ftinitupload", {
      clientftfid: Math.floor(Math.random() * 10000),
      cid: 0,
      resume: 0,
      overwrite: 1,
      cpw: "",
      ...transfer
    }).then(TeamSpeak3.singleResponse)
  }


  /**
   * Initializes a file transfer download. clientftfid is an arbitrary ID to identify the file transfer on client-side.
   * On success, the server generates a new ftkey which is required to start downloading the file through TeamSpeak 3's file transfer interface.
   * @async
   * @param {object} transfer the transfer object
   * @param {string} transfer.name filepath to download
   * @param {number} [transfer.clientftfid] arbitary id to identify the transfer
   * @param {number} [transfer.cid=0] channel id to upload to
   * @param {string} [transfer.cpw=""] channel password of the channel which will be uploaded to
   * @param {number} [transfer.seekpos=0]
   * @returns {Promise<FTInitDownloadResponse>}
   */
  ftInitDownload(transfer) {
    return this.execute("ftinitdownload", {
      clientftfid: Math.floor(Math.random() * 10000),
      seekpos: 0,
      cpw: "",
      cid: 0,
      ...transfer
    }).then(TeamSpeak3.singleResponse)
  }

  /**
   * Uploads a file
   * @async
   * @param {string} path the path whith the filename where the file should be uploaded to
   * @param {string|Buffer} data the data to upload
   * @param {number} [cid=0] channel id to upload to
   * @param {string} [cpw] channel password of the channel which will be uploaded to
   * @returns {Promise} resolves on success
   */
  async uploadFile(path, data, cid = 0, cpw = "") {
    if (typeof data === "string") data = Buffer.from(data)
    const res = await this.ftInitUpload({ name: path, cid, cpw, size: data.byteLength })
    if (res.size === 0) throw new Error(res.msg)
    await new FileTransfer(this._config.host, res.port).upload(res.ftkey, data)
  }

  /**
   * Returns the file in the channel with the given path
   * @async
   * @param {string} path the path whith the filename where the file should be uploaded to
   * @param {number} [cid=0] channel id to download from
   * @param {string} [cpw] channel password of the channel which will be uploaded to
   * @returns {Promise<Buffer>}
   */
  async downloadFile(path, cid = 0, cpw = "") {
    const res = await this.ftInitDownload({name: path, cid, cpw })
    if (res.size === 0) throw new Error(res.msg)
    const file = await new FileTransfer(this._config.host, res.port).download(res.ftkey, res.size)
    return file
  }


  /**
   * Returns an Icon with the given Name
   * @async
   * @param {string} name the name of the icon to retrieve eg "icon_262672952"
   * @returns {Promise<Buffer>}
   */
  downloadIcon(name) {
    return this.downloadFile(`/${name}`)
  }


  /**
   * Gets the Icon Name of a resolveable Perm List
   * @async
   * @param {Promise<PermListResponse[]>} permlist expects a promise which resolves to a permission list
   * @returns {Promise<string>}
   */
  getIconName(permlist) {
    return new Promise((fulfill, reject) => {
      permlist.then(perms => {
        const found = perms.some(perm => {
          if (perm.permsid === "i_icon_id") {
            fulfill(`icon_${(perm.permvalue < 0) ? perm.permvalue>>>0 : perm.permvalue}`)
            return true
          }
          return false
        })
        if (!found) reject(new Error("no icon found"))
      })
    })
  }


  /**
   * Closes the ServerQuery connection to the TeamSpeak 3 Server instance.
   * @async
   * @returns {Promise} resolves on success
   */
  quit() {
    return this.execute("quit")
  }


  /**
   * Forcefully closes the socket connection
   * @async
   */
  forceQuit() {
    return this._ts3.forceQuit()
  }


  /**
   * Resets the cache to default values
   * @private
   */
  _resetCache() {
    this._servers = []
    this._servergroups = []
    this._channels = []
    this._clients = []
    this._channelgroups = []
    this._notifyevents = []
    this._selected = { port: 0, sid: 0 }
  }


  /**
   * Parses the whole Cache by given Objects
   * @private
   * @param {object} cache the cache object
   * @param {object} list the list to check against the cache
   * @param {string} key the key used to identify the object inside the cache
   * @param {object} Class the class which should be used
   * @returns {object[]}
   */
  _handleCache(cache, list, key, Class) {
    const remainder = Object.keys(cache)
    list.forEach(l => {
      const k = String(l[key])
      if (remainder.includes(k)) {
        cache[k].updateCache(l)
        remainder.splice(remainder.indexOf(k), 1)
      } else {
        cache[k] = new Class(this, l)
      }
    })
    remainder.forEach(k => this._removeFromCache(cache, k))
    return list
  }


  /**
   * Removes an item from cache and calls the .destruct() method on it
   * @private
   * @param {object} cache the cache object from where a key should be deleted
   * @param {string} key the key which should be deleted
   */
  _removeFromCache(cache, key) {
    if (cache[String(key)] === undefined) return
    cache[String(key)].destruct()
    Reflect.deleteProperty(cache, String(key))
  }

  /**
   * Filters an Object with given Option
   * @static
   * @param {any[]} array the object which should get filtered
   * @param {any} filter filter object
   * @returns {any[]}
   */
  static filter(array, filter) {
    if (!Array.isArray(array)) array = [array]
    if (Object.keys(filter).length === 0) return array
    return array.filter(a => !Object.keys(filter).some(k => {
      if (!(k in a)) return true
      if (filter[k] instanceof RegExp) return !a[k].match(filter[k])
      if (Array.isArray(filter[k])) return filter[k].indexOf(a[k]) === -1
      switch (typeof a[k]) {
        case "number": return a[k] !== parseFloat(filter[k])
        case "string": return a[k] !== filter[k]
        default: return false
      }
    }))
  }

  /**
   * Transforms an Input to an Array
   * @static
   * @param {any} input input data which should be converted to an array
   * @returns {any[]}
   */
  static toArray(input) {
    if (typeof input === "undefined" || input === null) return []
    if (!Array.isArray(input)) return [input]
    return input
  }

  /**
   * Retrieves the first element of the array
   * @static
   * @param {RawQueryResponse[]} input the response input
   * @returns {RawQueryResponse} single response output
   */
  static singleResponse(input) {
    if (Array.isArray(input) && input.length > 0) return input[0]
    return null
  }

}

module.exports = TeamSpeak3