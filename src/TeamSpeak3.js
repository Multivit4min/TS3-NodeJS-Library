/**
 * @file TeamSpeak3.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

/**
 * workaround for vscode intellisense and documentation generation
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
   * @version 1.0
   * @param {ConnectionParams} [config={}] - The Configuration Object
   */
  constructor(config = {}) {
    super()

    this._config = {
      protocol: "raw",
      host: "127.0.0.1",
      queryport: 10011,
      readyTimeout: 20000,
      keepAlive: true,
      ...config
    }

    this._resetCache()
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
     * @type {object}
     * @returns {object} - may return an error object
     */
    this._ts3.on("close", e => super.emit("close", e))

    /**
     * Query Error Event
     * Gets fired when the TeamSpeak Query had an error while trying to connect
     * and also gets fired when there was an error after receiving an event
     * @event TeamSpeak3#error
     * @memberof  TeamSpeak3
     * @returns {object} - return the error object
     */
    this._ts3.on("error", e => super.emit("error", e))

    /**
     * Query Flooding Error
     * Gets fired when the TeamSpeak Query gets flooding errors
     * @event TeamSpeak3#flooding
     * @memberof  TeamSpeak3
     * @returns {object} - return the error object
     */
    this._ts3.on("flooding", e => super.emit("flooding", e))

    /**
     * Forwards any debug messages
     * @event TeamSpeak3#debug
     * @memberof  TeamSpeak3
     * @returns {object} - debug data
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
   * @param {object} event the raw teamspeak event
   */
  _evcliententerview(event) {
    this.clientList()
      .then(clients => {
        const client = clients.find(client => client.getID() === event.clid)

        /**
         * Client Join Event
         * @event TeamSpeak3#clientconnect
         * @memberof TeamSpeak3
         * @type {object}
         * @property {TeamSpeakClient} client - The Client which joined the Server
         */
        super.emit("clientconnect", { client, cid: event.ctid })
      })
      .catch(error => this.emit("error", error))
  }


  /**
   * Gets called when a client discconnects from the TeamSpeak Server
   * @private
   * @param {object} event the raw teamspeak event
   */
  _evclientleftview(event) {
    const { clid } = event

    /**
     * Client Disconnect Event
     * Events Object contains all available Informations returned by the query
     * @event TeamSpeak3#clientdisconnect
     * @memberof TeamSpeak3
     * @type {object}
     * @property {TeamSpeakClient|object} client - The data from the last Client List Command
     * @property {object} event - The Data from the disconnect event
     */
    super.emit("clientdisconnect", {
      client: (String(clid) in this._clients) ? this._clients[clid].toJSON() : { clid },
      event
    })
    this._removeFromCache(this._clients, clid)
  }


  /**
   * Gets called when a chat message gets received
   * @private
   * @param {object} event the raw teamspeak event
   */
  _evtextmessage(event) {
    this.getClientByID(event.invokerid)
      .then(invoker => {

        /**
         * Textmessage event
         * @event TeamSpeak3#textmessage
         * @memberof TeamSpeak3
         * @type {object}
         * @property {TeamSpeakClient} invoker - The Client which sent a textmessage
         * @property {string} msg - The Message which has been sent
         * @property {number} targetmode - The Targetmode (1 = Client, 2 = Channel, 3 = Virtual Server)
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
   * @param {object} event the raw teamspeak event
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
       * @type {object}
       * @property {TeamSpeakClient} client - The Client which moved
       * @property {TeamSpeakChannel} channel - The Channel which the client has been moved to
       * @property {number} reasonid - Reason ID why the Client has moved (4 = Channel Kick)
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
   * @param {object} event the raw teamspeak event
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
         * @type {object}
         * @property {TeamSpeakClient} invoker - The Client which edited the server
         * @property {object} modified - The Properties which has been modified
         * @property {number} reasonid - ReasonID
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
   * @param {object} event the raw teamspeak event
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
       * @type {object}
       * @property {TeamSpeakClient} invoker - The Client which edited a channel
       * @property {TeamSpeakChannel} channel - The Channel which has been edited
       * @property {object} modified - The Properties which has been modified
       * @property {number} reasonid - ReasonID
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
   * @param {object} event the raw teamspeak event
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
       * @type {object}
       * @property {TeamSpeakClient} invoker - The Client which created the channel
       * @property {TeamSpeakChannel} channel - The Channel which has been created
       * @property {object} modified - The Properties which has been modified
       * @property {number} cpid - the new channel parent id
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
   * @param {object} event the raw teamspeak event
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
       * @type {object}
       * @property {TeamSpeakClient} invoker - The Client which moved the channel
       * @property {TeamSpeakChannel} channel - The Channel which has been moved
       * @property {TeamSpeakChannel} parent - The new Parent Channel
       */
      this.emit("channelmoved", { invoker, channel, parent, order: event.order })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets deleted
   * @private
   * @param {object} event the raw teamspeak event
   */
  _evchanneldeleted(event) {
    this.getClientByID(event.invokerid)
      .then(invoker => {

        /**
         * Channel Delete Event
         * @event TeamSpeak3#channeldelete
         * @memberof TeamSpeak3
         * @type {object}
         * @property {TeamSpeakClient} invoker - The Client which deleted the channel
         * @property {number} cid - The Channel ID which has been deleted
         */
        this.emit("channeldelete", { invoker, cid: event.cid })
      })
      .catch(e => this.emit("error", e))
  }


  /**
   * Sends a raw command to the TeamSpeak Server.
   * @example
   * ts3.execute("clientlist", ["-ip"])
   * ts3.execute("use", [9987], { client_nickname: "test" })
   * @version 1.0
   * @async
   * @param {...any} args - The Command which should get executed on the TeamSpeak Server
   * @returns {Promise<object>} Promise object which returns the Information about the Query executed
   */
  execute(...args) {
    return this._ts3.execute(...args)
  }


  /**
   * Adds a new query client login, or enables query login for existing clients.
   * When no virtual server has been selected, the command will create global query logins.
   * Otherwise the command enables query login for existing client, and cldbid must be specified.
   * @param {string} client_login_name - the login name
   * @param {number} [cldbid] - the database id which should be used
   * @returns {Promise<QueryLoginAddResponse>} Promise object which returns the Information about the Query executed
   */
  queryLoginAdd(client_login_name, cldbid) {
    return this.execute("queryloginadd", { client_login_name, cldbid })
  }

  /**
   * Deletes an existing server query login on selected server.
   * When no virtual server has been selected, deletes global query logins instead.
   * @param {number} cldbid - deletes the querylogin of this client
   * @returns {Promise} resolves on success
   */
  queryLoginDel(cldbid) {
    return this.execute("querylogindel", { cldbid })
  }

  /**
   * List existing query client logins.
   * The pattern parameter can include regular characters and SQL wildcard characters (e.g. %).
   * Only displays query logins of the selected virtual server, or all query logins when no virtual server have been  selected.
   * @param {string} [pattern] - the pattern to filter for client login names
   * @param {number} [start] - the offset from where clients should be listed
   * @param {number} [duration] - how many clients should be listed
   * @returns {Promise<QueryLoginListResponse[]>} Promise object which returns the Information about the Query executed
   */
  queryLoginList(pattern, start, duration) {
    return this.execute("queryloginlist", { pattern, start, duration }, ["-count"]).then(TeamSpeak3.toArray)
  }


  /**
   * Change your ServerQuery clients settings using given properties.
   * @version 1.0
   * @async
   * @param {object} properties - The Properties which should be changed
   * @returns {Promise} resolves on success
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
   * @version 1.0
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
   * @version 1.0
   * @async
   * @param {string} username - The Username which you want to login with
   * @param {string} password - The Password you want to login with
   * @returns {Promise} resolves on success
   */
  login(username, password) {
    return this.execute("login", [username, password])
  }


  /**
   * Deselects the active virtual server and logs out from the server instance.
   * @version 1.0
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
   * @version 1.0
   * @async
   * @returns {Promise<VersionResponse>}
   */
  version() {
    return this.execute("version")
  }


  /**
   * Displays detailed connection information about the server instance including uptime,
   * number of virtual servers online, traffic information, etc.
   * @version 1.0
   * @async
   * @returns {Promise<HostInfoResponse>}
   */
  hostInfo() {
    return this.execute("hostinfo")
  }


  /**
   * Displays the server instance configuration including database revision number,
   * the file transfer port, default group IDs, etc.
   * @version 1.0
   * @async
   * @returns {Promise<InstanceInfoResponse>}
   */
  instanceInfo() {
    return this.execute("instanceinfo")
  }


  /**
   * Changes the server instance configuration using given properties.
   * @version 1.0
   * @async
   * @param {object} properties - The stuff you want to change
   * @returns {Promise} resolves on success
   */
  instanceEdit(properties) {
    return this.execute("instanceedit", properties)
  }


  /**
   * Displays a list of IP addresses used by the server instance on multi-homed machines.
   * @version 1.0
   * @async
   * @returns {Promise<BindingListResponse[]>}
   */
  bindingList() {
    return this.execute("bindinglist").then(TeamSpeak3.toArray)
  }


  /**
   * Selects the virtual server specified with the port to allow further interaction.
   * @version 1.0
   * @async
   * @param {number} port - The Port the Server runs on
   * @param {string} [client_nickname] - Set Nickname when selecting a server
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
   * @version 1.0
   * @async
   * @param {number} sid - The Server ID
   * @param {string} [client_nickname] - Set Nickname when selecting a server
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
   * @version 1.0
   * @async
   * @returns {Promise<WhoamiResponse>} Promise object which provides the Information about the QueryClient
   */
  whoami() {
    return this.execute("whoami")
  }


  /**
   * Displays detailed configuration information about the selected virtual server
   * including unique ID, number of clients online, configuration, etc.
   * @version 1.0
   * @async
   * @returns {Promise<ServerInfoResponse>}
   */
  serverInfo() {
    return this.execute("serverinfo")
  }


  /**
   * Displays the database ID of the virtual server running on the UDP port
   * @version 1.0
   * @async
   * @param {number} virtualserver_port - The Server Port where data should be retrieved
   * @returns {Promise<ServerIdGetByPortResponse>}
   */
  serverIdGetByPort(virtualserver_port) {
    return this.execute("serveridgetbyport", { virtualserver_port })
  }


  /**
   * Changes the selected virtual servers configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.
   * @version 1.0
   * @async
   * @param {object} properties - The Server Settings which should be changed
   * @returns {Promise} resolves on success
   */
  serverEdit(properties) {
    return this.execute("serveredit", properties)
  }


  /**
   * Stops the entire TeamSpeak 3 Server instance by shutting down the process.
   * @version 1.0
   * @async
   * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise} resolves on success
   */
  serverProcessStop(reasonmsg) {
    return this.execute("serverprocessstop", { reasonmsg })
  }


  /**
   * Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.
   * @version 1.0
   * @async
   * @returns {Promise<ServerRequestConnectionInfoResponse>}
   */
  connectionInfo() {
    return this.execute("serverrequestconnectioninfo")
  }


  /**
   * Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key.
   * If virtualserver_port is not specified, the server will test for the first unused UDP port
   * @version 1.0
   * @async
   * @param {object} properties - The Server Settings
   * @returns {Promise<ServerCreateResponse>} returns the server admin token for the new server and the response from the server creation
   */
  serverCreate(properties) {
    let servertoken = ""
    return this.execute("servercreate", properties)
      .then(({ token, sid }) => {
        servertoken = token
        return this.serverList({ virtualserver_id: sid })
      })
      .then(([server]) => ({ server, token: servertoken }))
  }


  /**
   * Deletes a Server.
   * @version 1.0
   * @async
   * @param {number} sid - the server id
   * @returns {Promise} resolves on success
   */
  serverDelete(sid) {
    return this.execute("serverdelete", { sid })
  }


  /**
   * Starts the virtual server. Depending on your permissions,
   * you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @param {number} sid - the server id
   * @returns {Promise} resolves on success
   */
  serverStart(sid) {
    return this.execute("serverstart", { sid })
  }


  /**
   * Stops the virtual server. Depending on your permissions,
   * you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @param {number} sid - the server id
   * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise} resolves on success
   */
  serverStop(sid, reasonmsg) {
    return this.execute("serverstop", { sid, reasonmsg })
  }


  /**
   * Creates a new server group using the name specified with name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @version 1.0
   * @async
   * @param {string} name - The Name of the Server Group
   * @param {number} [type=1] - Type of the Server Group
   * @returns {Promise<TeamSpeakServerGroup>}
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
   * @returns {Promise<ServerGroupClientListResponse>}
   */
  serverGroupClientList(sgid) {
    return this.execute("servergroupclientlist", { sgid }, ["-names"])
  }


  /**
   * Adds the client to the server group specified with sgid.
   * Please note that a client cannot be added to default groups or template groups.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be added
   * @param {number} sgid - The Server Group ID which the Client should be added to
   * @returns {Promise} resolves on success
   */
  serverGroupAddClient(cldbid, sgid) {
    return this.execute("servergroupaddclient", { sgid, cldbid })
  }


  /**
   * Removes the client from the server group specified with sgid.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be removed
   * @param {number} sgid - The Server Group ID which the Client should be removed from
   * @returns {Promise} resolves on success
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
   * @version 1.0
   * @async
   * @param {number} ssgid - the source ServerGroup
   * @param {number} [tsgid=0] - the target ServerGroup, 0 to create a new Group
   * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
   * @param {string|boolean} [name=false] - Name of the Group
   * @returns {Promise<ServerGroupCopyResponse>}
   */
  serverGroupCopy(ssgid, tsgid = 0, type = 1, name = false) {
    const properties = { ssgid, tsgid, type }
    if (typeof name === "string") properties.name = name
    return this.execute("servergroupcopy", properties)
  }


  /**
   * Changes the name of the server group
   * @version 1.0
   * @async
   * @param {number} sgid - the ServerGroup id
   * @param {string} name - new name of the ServerGroup
   * @returns {Promise} resolves on success
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
   * @returns {Promise<PermListResponse[]>}
   */
  serverGroupPermList(sgid, permsid = false) {
    return this.execute("servergrouppermlist", { sgid }, [permsid ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {number} sgid - the ServerGroup id
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
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
   * @version 1.0
   * @async
   * @param {number} sgid - the ServerGroup id
   * @param {string|number} perm - The permid or permsid
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
   * @version 1.0
   * @async
   * @param {string} name - The Name of the Channel
   * @param {object} [properties={}] - Properties of the Channel
   * @returns {Promise<TeamSpeakChannel>}
   */
  channelCreate(name, properties = {}) {
    properties.channel_name = name
    return this.execute("channelcreate", properties)
      .then(({cid}) => this.channelList({ cid }))
      .then(([channel]) => channel)
  }


  /**
   * Creates a new channel group using a given name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @version 1.0
   * @async
   * @param {string} name - The Name of the Channel Group
   * @param {number} [type=1] - Type of the Channel Group
   * @returns {Promise<TeamSpeakChannelGroup>}
   */
  channelGroupCreate(name, type = 1) {
    return this.execute("channelgroupadd", { name, type })
      .then(({cgid}) => this.channelGroupList({ cgid }))
      .then(([group]) => group)
  }


  /**
   * Retrieves a Single Channel by the given Channel ID
   * @version 1.0
   * @async
   * @param {number} cid - The Channel Id
   * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
   */
  getChannelByID(cid) {
    return this.channelList({ cid })
      .then(([channel]) => channel)
  }


  /**
   * Retrieves a Single Channel by the given Channel Name
   * @version 1.0
   * @async
   * @param {number} channel_name - The Name of the Channel
   * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
   */
  getChannelByName(channel_name) {
    return this.channelList({ channel_name })
      .then(([channel]) => channel)
  }


  /**
   * Displays detailed configuration information about a channel including ID, topic, description, etc.
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @return {Promise<ChannelInfoResponse>}
   */
  channelInfo(cid) {
    return this.execute("channelinfo", { cid })
  }


  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @param {number} cpid - Channel Parent ID
   * @param {number} [order=0] - Channel Sort Order
   * @return {Promise} resolves on success
   */
  channelMove(cid, cpid, order = 0) {
    return this.execute("channelmove", { cid, cpid, order })
  }


  /**
   * Deletes an existing channel by ID.
   * If force is set to 1, the channel will be deleted even if there are clients within.
   * The clients will be kicked to the default channel with an appropriate reason message.
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @param {number} [force=0] - If set to 1 the Channel will be deleted even when Clients are in it
   * @return {Promise} resolves on success
   */
  channelDelete(cid, force = 0) {
    return this.execute("channeldelete", { cid, force})
  }


  /**
   * Changes a channels configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @param {object} [properties={}] - The Properties of the Channel which should get changed
   * @return {Promise} resolves on success
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
   * @return {Promise<PermListResponse[]>}
   */
  channelPermList(cid, permsid = false) {
    return this.execute("channelpermlist", { cid }, (permsid) ? ["-permsid"] : null).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a set of specified permissions to a channel.
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - The Value which should be set
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
   * @version 1.11.1
   * @async
   * @param {number} cid - the channel id
   * @param {array} permissions - the permissions to assign
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
   * @version 1.0
   * @async
   * @param {number} cid - the channel id
   * @param {string|number} perm - The permid or permsid
   * @return {Promise} resolves on success
   */
  channelDelPerm(cid, perm) {
    const prop = { cid }
    prop[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channeldelperm", prop)
  }


  /**
   * Retrieves a Single Client by the given Client ID
   * @version 1.0
   * @async
   * @param {number} clid - The Client Id
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
   */
  getClientByID(clid) {
    return this.clientList({ clid })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Database ID
   * @version 1.0
   * @async
   * @param {number} client_database_id - The Client Database Id
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
   */
  getClientByDBID(client_database_id) {
    return this.clientList({ client_database_id })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @version 1.0
   * @async
   * @param {string} client_unique_identifier - The Client Unique Identifier
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
   */
  getClientByUID(client_unique_identifier) {
    return this.clientList({ client_unique_identifier })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @version 1.0
   * @async
   * @param {string} client_nickname - The Nickname of the Client
   * @returns {Promise<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
   */
  getClientByName(client_nickname) {
    return this.clientList({ client_nickname })
      .then(([client]) => client)
  }


  /**
   * Returns General Info of the Client, requires the Client to be online
   * @version 1.0
   * @async
   * @param {number} clid - the client id
   * @returns {Promise<ClientInfoResponse>}
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
   * @returns {Promise<ClientDBListResponse[]>}
   */
  clientDBList(start = 0, duration = 1000, count = true) {
    return this.execute("clientdblist", { start, duration }, [count ? "-count" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Returns the Clients Database Info
   * @version 1.0
   * @async
   * @param {number} cldbid - the client database id
   * @returns {Promise<ClientDBInfoResponse>}
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
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
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
   * @return {Promise<PermListResponse[]>}
   */
  clientPermList(cldbid, permsid = false) {
    return this.execute("clientpermlist", { cldbid }, [(permsid) ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {number} cldbid - the client database id
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
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
   * @version 1.0
   * @async
   * @param {number} cldbid - the client database id
   * @param {string|number} perm - The permid or permsid
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
   * @version 1.3
   * @async
   * @param {string} ident - the key to search for
   * @param {string} pattern - the search pattern to use
   * @returns {Promise<CustomSearchResponse>} Promise Object
   */
  customSearch(ident, pattern) {
    return this.execute("customsearch", { ident, pattern })
  }


  /**
   * Displays a list of custom properties for the client specified with cldbid.
   * @version 1.3
   * @async
   * @param {number} cldbid - The Client Database ID which should be retrieved
   * @returns {Promise<CustomInfoResponse[]>}
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
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
   */
  customSet(cldbid, ident, value) {
    return this.execute("customset", { cldbid, ident, value })
  }


  /**
   * Sends a text message a specified target.
   * The type of the target is determined by targetmode while target specifies the ID of the recipient,
   * whether it be a virtual server, a channel or a client.
   * @version 1.0
   * @async
   * @param {number} target - target client id which should receive the message
   * @param {number} targetmode - targetmode (1: client, 2: channel, 3: server)
   * @param {string} msg - The message the Client should receive
   * @returns {Promise} resolves on success
   */
  sendTextMessage(target, targetmode, msg) {
    return this.execute("sendtextmessage", { target, targetmode, msg})
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup ID
   * @version 1.0
   * @async
   * @param {number} sgid - the ServerGroup Id
   * @returns {Promise<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
   */
  getServerGroupByID(sgid) {
    return this.serverGroupList({ sgid })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup Name
   * @version 1.0
   * @async
   * @param {number} name - the ServerGroup name
   * @returns {Promise<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
   */
  getServerGroupByName(name) {
    return this.serverGroupList({ name })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup ID
   * @version 1.0
   * @async
   * @param {number} cgid - the ChannelGroup Id
   * @returns {Promise<TeamSpeakChannelGroup>} Promise object which returns the ChannelGroup or undefined if not found
   */
  getChannelGroupByID(cgid) {
    return this.channelGroupList({ cgid })
      .then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup Name
   * @version 1.0
   * @async
   * @param {number} name - the ChannelGroup name
   * @returns {Promise<TeamSpeakChannelGroup>} Promise object which returns the ChannelGroup or undefined if not found
   */
  getChannelGroupByName(name) {
    return this.channelGroupList({ name })
      .then(([group]) => group)
  }


  /**
   * Sets the channel group of a client
   * @version 1.0
   * @async
   * @param {number} cgid - The Channel Group which the Client should get assigned
   * @param {number} cid - The Channel in which the Client should be assigned the Group
   * @param {number} cldbid - The Client Database ID which should be added to the Group
   * @return {Promise} resolves on success
   */
  setClientChannelGroup(cgid, cid, cldbid) {
    return this.execute("setclientchannelgroup", { cgid, cldbid, cid })
  }


  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @version 1.0
   * @async
   * @param {number} cgid - the channelgroup id
   * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
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
   * @version 1.0
   * @async
   * @param {number} scgid - the source ChannelGroup
   * @param {number} [tcgid=0] - the target ChannelGroup (0 to create a new Group)
   * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
   * @param {string} [name] - Name of the Group
   * @return {Promise<ChannelGroupCopyResponse>}
   */
  channelGroupCopy(scgid, tcgid = 0, type = 1, name) {
    const properties = { scgid, tcgid, type }
    if (typeof name === "string") properties.name = name
    return this.execute("channelgroupcopy", properties)
  }


  /**
   * Changes the name of the channel group
   * @version 1.0
   * @async
   * @param {number} cgid - the ChannelGroup id to rename
   * @param {string} name - new name of the ChannelGroup
   * @return {Promise} resolves on success
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
   * @return {Promise<PermListResponse[]>}
   */
  channelGroupPermList(cgid, permsid = false) {
    return this.execute("channelgrouppermlist", { cgid }, [(permsid) ? "-permsid" : null]).then(TeamSpeak3.toArray)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {number} cgid - the ChannelGroup id
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
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
   * @version 1.0
   * @async
   * @param {number} cgid - the ChannelGroup id
   * @param {string|number} perm - The permid or permsid
   * @return {Promise} resolves on success
   */
  channelGroupDelPerm(cgid, perm) {
    const properties = { cgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channelgroupdelperm", properties)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @version 1.0
   * @async
   * @param {number} cgid - the ChannelGroup id
   * @param {number} [cid] - The Channel ID
   * @return {Promise<TeamSpeakClient[]>}
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
   * @param {number} cldbid - The Client Database ID
   * @param {number} cid - One or more Permission Names
   * @param {number} [permid] - One or more Permission IDs
   * @param {number} [permsid] - One or more Permission Names
   * @returns {Promise<PermOverviewResponse[]>} retrieves assigned permissions
   */
  permOverview(cldbid, cid, permid, permsid) {
    const properties = { cldbid, cid }
    if (permid !== null && permid !== undefined) properties.permid = permid
    if (permsid !== null && permsid !== undefined) properties.permsid = permsid
    return this.execute("permoverview", properties).then(TeamSpeak3.toArray)
  }


  /**
   * Retrieves a list of permissions available on the server instance including ID, name and description.
   * @version 1.0
   * @async
   * @returns {Promise<PermissionListResponse[]>} gets a list of permissions available
   */
  permissionList() {
    return this.execute("permissionlist").then(TeamSpeak3.toArray)
  }


  /**
   * Retrieves the database ID of one or more permissions specified by permsid.
   * @version 1.0
   * @async
   * @param {string|array} permsid - One or more Permission Names
   * @returns {Promise<PermIdGetByNameResponse>}
   */
  permIdGetByName(permsid) {
    return this.execute("permidgetbyname", { permsid })
  }


  /**
   * Retrieves the current value of the permission for your own connection.
   * This can be useful when you need to check your own privileges.
   * @version 1.0
   * @async
   * @param {number|string} key - Perm ID or Name which should be checked
   * @returns {Promise<PermGetResponse>}
   */
  permGet(key) {
    return this.execute("permget", (typeof key === "string") ? { permsid: key } : { permid: key })
  }


  /**
   * Retrieves detailed information about all assignments of the permission.
   * The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.
   * @version 1.0
   * @async
   * @param {number|string} perm - Perm ID or Name to get
   * @returns {Promise<PermFindResponse[]>} gets the permissions
   */
  permFind(perm) {
    return this.execute("permfind", (typeof perm === "number") ? { permid: perm } : { permsid: perm })
      .then(TeamSpeak3.toArray)
  }


  /**
   * Restores the default permission settings on the selected virtual server and creates a new initial administrator token.
   * Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.
   * @version 1.0
   * @async
   * @returns {Promise<TokenResponse>}
   */
  permReset() {
    return this.execute("permreset")
  }


  /**
   * Retrieves a list of privilege keys available including their type and group IDs.
   * @version 1.0
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
   * @version 1.0
   * @async
   * @param {number} tokentype - Token Type
   * @param {number} group - Depends on the Type given, add either a valid Channel Group or Server Group
   * @param {number} [cid=0] - Depends on the Type given, add a valid Channel ID
   * @param {string} [description] - Token Description
   * @param {string} [customset] - token custom set
   * @returns {Promise<TokenResponse>}
   */
  privilegeKeyAdd(tokentype, group, cid = 0, description="", customset="") {
    return this.execute("privilegekeyadd", {
      tokentype,
      tokenid1: group,
      tokenid2: cid,
      tokendescription: description,
      tokencustomset: customset
    })
  }


  /**
   * Create a new privilegekey token for a ServerGroup with the given description
   * @version 1.10
   * @async
   * @param {number} group - Server Group which should be generated the token for
   * @param {string} [description] - Token Description
   * @param {string} [tokencustomset] - token custom set
   * @returns {Promise<TokenResponse>}
   */
  serverGroupPrivilegeKeyAdd(group, description, tokencustomset="") {
    return this.privilegeKeyAdd(0, group, 0, description, tokencustomset)
  }


  /**
   * Create a new privilegekey token for a Channel Group and assigned Channel ID with the given description
   * @version 1.10
   * @async
   * @param {number} group - The Channel Group for which the token should be valid
   * @param {number} cid - Channel ID for which the token should be valid
   * @param {string} [description] - Token Description
   * @param {string} [tokencustomset] - token custom set
   * @returns {Promise<TokenResponse>}
   */
  channelGroupPrivilegeKeyAdd(group, cid, description, tokencustomset="") {
    return this.privilegeKeyAdd(1, group, cid, description, tokencustomset)
  }


  /**
   * Deletes an existing token matching the token key specified with token.
   * @version 1.0
   * @async
   * @param {string} token - The token which should be deleted
   * @returns {Promise} resolves on success
   */
  privilegeKeyDelete(token) {
    return this.execute("privilegekeydelete", { token })
  }


  /**
   * Use a token key gain access to a server or channel group.
   * Please note that the server will automatically delete the token after it has been used.
   * @version 1.0
   * @async
   * @param {string} token - The token which should be used
   * @returns {Promise} resolves on success
   */
  privilegeKeyUse(token) {
    return this.execute("privilegekeyuse", { token })
  }


  /**
   * Displays a list of offline messages you've received.
   * The output contains the senders unique identifier, the messages subject, etc.
   * @version 1.0
   * @async
   * @returns {Promise<MessageListResponse[]>}
   */
  messageList() {
    return this.execute("messagelist").then(TeamSpeak3.toArray)
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @version 1.0
   * @async
   * @param {string} cluid - Client Unique Identifier (uid)
   * @param {string} subject - Subject of the message
   * @param {string} message - Message Text
   * @returns {Promise} resolves on success
   */
  messageAdd(cluid, subject, message) {
    return this.execute("messageadd", { cluid, subject, message })
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @version 1.0
   * @async
   * @param {number} msgid - The Message ID which should be deleted
   * @returns {Promise} resolves on success
   */
  messageDel(msgid) {
    return this.execute("messagedel", { msgid })
  }


  /**
   * Displays an existing offline message with the given id from the inbox.
   * @version 1.0
   * @async
   * @param {number} msgid - Gets the content of the Message
   * @returns {Promise<MessageGetResponse>}
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
   * @returns {Promise} resolves on success
   */
  messageUpdate(msgid, flag = 1) {
    return this.execute("messageupdateflag", { msgid, flag })
  }


  /**
   * Displays a list of complaints on the selected virtual server.
   * If dbid is specified, only complaints about the targeted client will be shown.
   * @version 1.0
   * @async
   * @param {number} [cldbid] - Filter only for certain Client with the given Database ID
   * @returns {Promise<ComplainListResponse[]>}
   */
  complainList(cldbid) {
    return this.execute("complainlist", { cldbid }).then(TeamSpeak3.toArray)
  }


  /**
   * Submits a complaint about the client with database ID dbid to the server.
   * @version 1.0
   * @async
   * @param {number} cldbid - Filter only for certain Client with the given Database ID
   * @param {string} [message] - The Message which should be added
   * @returns {Promise} resolves on success
   */
  complainAdd(cldbid, message = "") {
    return this.execute("complainadd", { cldbid, message })
  }


  /**
   * Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server.
   * If dbid will be left empty all complaints for the tdbid will be deleted
   * @version 1.0
   * @async
   * @param {number} tcldbid - The Target Client Database ID
   * @param {number} [fcldbid] - The Client Database ID which filed the Report
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
   * @version 1.0
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
   * @version 1.0
   * @async
   * @deprecated
   * @param {string} [ip] - IP Regex
   * @param {string} [name] - Name Regex
   * @param {string} [uid] - UID Regex
   * @param {number} time - Bantime in Seconds, if left empty it will result in a permaban
   * @param {string} banreason - Ban Reason
   * @returns {Promise<BanAddResponse>}
   */
  banAdd(ip, name, uid, time, banreason) {
    console.log("TeamSpeak3#banAdd is deprecated please use TeamSpeak3#ban instead!")
    return this.execute("banadd", { ip, name, uid, time, banreason })
  }


  /**
   * Adds a new ban rule on the selected virtual server.
   * All parameters are optional but at least one of the following must be set: ip, name, uid or mytsid.
   * @version 1.14
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
    return this.execute("banadd", { ip, name, uid, mytsid, time, banreason })
  }


  /**
   * Removes one or all bans from the server
   * @version 1.0
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
   * @version 1.0
   * @async
   * @param {number} [lines=1000] - Lines to receive
   * @param {number} [reverse=0] - Invert Output
   * @param {number} [instance=0] - Instance or Virtual Server Log
   * @param {number} [begin_pos=0] - Begin at Position
   * @returns {Promise<LogViewResponse>}
   */
  logView(lines = 1000, reverse = 0, instance = 0, begin_pos = 0) {
    return this.execute("logview", { lines, reverse, instance, begin_pos })
  }


  /**
   * Writes a custom entry into the servers log.
   * Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log.
   * The loglevel parameter specifies the type of the entry
   * @version 1.0
   * @async
   * @param {number} loglevel - Level 1 to 4
   * @param {string} logmsg - Message to log
   * @returns {Promise} resolves on success
   */
  logAdd(loglevel, logmsg) {
    return this.execute("logadd", { loglevel, logmsg })
  }


  /**
   * Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.
   * @version 1.0
   * @async
   * @param {string} msg - Message which will be sent to all instances
   * @returns {Promise} resolves on success
   */
  gm(msg) {
    return this.execute("gm", { msg })
  }


  /**
   * Displays a list of client database IDs matching a given pattern.
   * You can either search for a clients last known nickname or his unique identity by using the -uid option.
   * @version 1.0
   * @async
   * @param {string} pattern - The Pattern which should be searched for
   * @param {boolean} isUid - True when instead of the Name it should be searched for a uid
   * @returns {Promise<ClientDBFindResponse>}
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
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
   */
  clientDBDelete(cldbid) {
    return this.execute("clientdbdelete", { cldbid })
  }


  /**
   * Displays a list of virtual servers including their ID, status, number of clients online, etc.
   * @version 1.0
   * @async
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
   * @version 1.0
   * @async
   * @param {object} filter - Filter Object
   * @returns {Promise<TeamSpeakChannelGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
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
   * @version 1.0
   * @async
   * @param {object} filter - Filter Object
   * @returns {Promise<TeamSpeakServerGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
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
   * @version 1.0
   * @async
   * @param {object} filter - Filter Object
   * @returns {Promise<TeamSpeakChannel[]>} Promise object which returns an Array of TeamSpeak Channels
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
   * @version 1.0
   * @async
   * @param {object} filter - Filter Object
   * @returns {Promise<TeamSpeakClient[]>} Promise object which returns an Array of TeamSpeak Clients
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
   * @version 1.6
   * @async
   * @param {number} cid - the channel id to check for
   * @param {string} [path="/"] - the path to list
   * @param {string} [cpw] - the channel password
   * @returns {Promise<FTGetFileListResponse[]>} Promise object which returns an Array of Files
   */
  ftGetFileList(cid, path = "/", cpw) {
    return this.execute("ftgetfilelist", { cid, path, cpw }).then(TeamSpeak3.toArray)
  }


  /**
   * Displays detailed information about one or more specified files stored in a channels file repository.
   * @version 1.6
   * @async
   * @param {number} cid - the channel id to check for
   * @param {string} name - the filepath to receive
   * @param {string} [cpw] - the channel password
   * @returns {Promise<FTGetFileInfoResponse>} Promise object which returns an Array of Files
   */
  ftGetFileInfo(cid, name, cpw) {
    return this.execute("ftgetfileinfo", { cid, name, cpw })
  }


  /**
   * Stops the running file transfer with server-side ID serverftfid.
   * @version 1.6
   * @async
   * @param {number} serverftfid - Server File Transfer ID
   * @param {number} [del=1] - <Description Pending>
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
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
   * @returns {Promise} resolves on success
   */
  ftCreateDir(cid, dirname, cpw) {
    return this.execute("ftcreatedir", { cid, dirname, cpw })
  }


  /**
   * Renames a file in a channels file repository.
   * If the two parameters tcid and tcpw are specified, the file will be moved into another channels file repository
   * @version 1.6
   * @async
   * @param {number} cid - the channel id to check for
   * @param {string} oldname - the path to the file which should be renamed
   * @param {string} newname - the path to the file with the new name
   * @param {string} [tcid] - target channel id if the file should be moved to a different channel
   * @param {string} [cpw] - the channel password from where the file gets renamed
   * @param {string} [tcpw] - the channel password from where the file will get transferred to
   * @returns {Promise} resolves on success
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
   * @param {number} [transfer.overwrite=1] - Overwrites an existing file
   * @param {number} [transfer.resume=0] - <Description Pending>
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
    })
  }


  /**
   * Initializes a file transfer download. clientftfid is an arbitrary ID to identify the file transfer on client-side.
   * On success, the server generates a new ftkey which is required to start downloading the file through TeamSpeak 3's file transfer interface.
   * @version 1.0
   * @async
   * @param {object} transfer - The Transfer Object
   * @param {string} transfer.name - Filepath to Download
   * @param {number} [transfer.clientftfid] - Arbitary ID to Identify the Transfer
   * @param {number} [transfer.cid=0] - Channel ID to upload to
   * @param {string} [transfer.cpw=""] - Channel Password of the Channel which will be uploaded to
   * @param {number} [transfer.seekpos=0] - <Description Pending File Startposition?>
   * @returns {Promise<FTInitDownloadResponse>}
   */
  ftInitDownload(transfer) {
    return this.execute("ftinitdownload", {
      clientftfid: Math.floor(Math.random() * 10000),
      seekpos: 0,
      cpw: "",
      cid: 0,
      ...transfer
    })
  }

  /**
   * Uploads a file
   * @version 1.0
   * @async
   * @param {string} path - the path whith the filename where the file should be uploaded to
   * @param {string|Buffer} data - The data to upload
   * @param {number} [cid=0] - Channel ID to upload to
   * @param {string} [cpw] - Channel Password of the Channel which will be uploaded to
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
   * @version 1.0
   * @async
   * @param {string} path - the path whith the filename where the file should be uploaded to
   * @param {number} [cid=0] - Channel ID to download from
   * @param {string} [cpw] - Channel Password of the Channel which will be uploaded to
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
   * @version 1.0
   * @async
   * @param {string} name - The Name of the Icon to retrieve eg "icon_262672952"
   * @returns {Promise<Buffer>}
   */
  downloadIcon(name) {
    return this.downloadFile(`/${name}`)
  }


  /**
   * Gets the Icon Name of a resolveable Perm List
   * @version 1.0
   * @async
   * @param {Promise} permlist expects a promise which resolves to a permission list
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
   * @version 1.0
   * @async
   * @returns {Promise} resolves on success
   */
  quit() {
    return this.execute("quit")
  }


  /**
   * Forcefully closes the socket connection
   * @version 1.0
   * @async
   */
  forceQuit() {
    return this._ts3.forceQuit()
  }


  /**
   * Resets the cache to default values
   * @version 1.0
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
   * @version 1.0
   * @private
   * @param {object} cache - The Cache Object
   * @param {object} list - The List to check against the Cache
   * @param {string} key - The Key used to identify the Object inside the Cache
   * @param {object} Class - The Class which should be used
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
   * @version 1.0
   * @static
   * @async
   * @param {any[]} array - The Object which should get filtered
   * @param {any} filter - Filter Object
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
   * @async
   * @version 1.0
   * @param {any} input input data which should be converted to an array
   * @returns {any[]}
   */
  static toArray(input) {
    if (typeof input === "undefined" || input === null) return []
    if (!Array.isArray(input)) return [input]
    return input
  }

}

module.exports = TeamSpeak3