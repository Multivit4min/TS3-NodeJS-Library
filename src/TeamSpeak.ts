import { EventEmitter } from "events"
import { TeamSpeakQuery } from "./transport/TeamSpeakQuery"
import { FileTransfer } from "./transport/FileTransfer"
import { QueryResponse } from "./types/QueryResponse"
import { ResponseError } from "./exception/ResponseError"
import { TeamSpeakClient } from "./node/Client"
import { TeamSpeakServer } from "./node/Server"
import { TeamSpeakChannel } from "./node/Channel"
import { TeamSpeakServerGroup } from "./node/ServerGroup"
import { TeamSpeakChannelGroup } from "./node/ChannelGroup"
import * as Response from "./types/ResponseTypes"
import * as Event from "./types/Events"
import * as Props from "./types/PropertyTypes"
import { QueryProtocol, ReasonIdentifier, TextMessageTargetMode, TokenType, LogLevel } from "./types/enum"
import { Command } from "./transport/Command"

export * from "./types/enum"

/**
 * missing Query Commands 
 * @todo
 * channelclientaddperm
 * channelclientdelperm
 * servergroupautoaddperm
 * servergroupautodelperm
 * tokenadd
 * tokendelete
 * tokenlist
 * tokenuse
 * clientfind
 */


declare type NodeType = TeamSpeakClient|TeamSpeakChannel|TeamSpeakChannelGroup|TeamSpeakServer|TeamSpeakServerGroup
declare interface NodeConstructable<T> {
  new(parent: TeamSpeak, props: QueryResponse): T
}

export interface ConnectionParams {
  /** the host to connect to (default: 127.0.0.1) */
  host: string,
  /** the query protocol to use (default: @see QueryProtocol ) */
  protocol: QueryProtocol,
  /** the queryport to use (default: raw=10011 ssh=10022) */
  queryport: number,
  /** the server to select upon connect (default: none) */
  serverport?: number,
  /** the username to login with (default: none) */
  username?: string,
  /** the password to use with the login (default: none) */
  password?: string,
  /** the nickname to connect with */
  nickname?: string,
  /** time to wait until a timeout gets fired (default: 10000) */
  readyTimeout: number,
  /** wether a keepalive should get sent (default: true) */
  keepAlive: boolean,
  /** local address the socket should connect from */
  localAddress?: string
}

export interface TeamSpeak {
  on(event: "error", listener: (error: Error) => void): this
  on(event: "ready", listener: () => void): this
  on(event: "close", listener: (error?: Error) => void): this
  on(event: "flooding", listener: (error: ResponseError) => void): this
  on(event: "debug", listener: (event: Event.Debug) => void): this
  on(event: "clientconnect", listener: (event: Event.ClientConnect) => void): this
  on(event: "clientdisconnect", listener: (event: Event.ClientDisconnect) => void): this
  on(event: "tokenused", listener: (event: Event.TokenUsed) => void): this
  on(event: "textmessage", listener: (event: Event.TextMessage) => void): this
  on(event: "clientmoved", listener: (event: Event.ClientMoved) => void): this
  on(event: "serveredit", listener: (event: Event.ServerEdit) => void): this
  on(event: "channeledit", listener: (event: Event.ChannelEdit) => void): this
  on(event: "channelcreate", listener: (event: Event.ChannelCreate) => void): this
  on(event: "channelmoved", listener: (event: Event.ChannelMove) => void): this
  on(event: "channeldelete", listener: (event: Event.ChannelDelete) => void): this

  channelClientPermList(cid: number, cldbid: number, permsid: false): Promise<Response.ChannelClientPermListId[]>
  channelClientPermList(cid: number, cldbid: number, permsid: true): Promise<Response.ChannelClientPermListSid[]>
}

export class TeamSpeak extends EventEmitter {

  readonly config: ConnectionParams
  private clients: Record<string, TeamSpeakClient> = {}
  private servers: Record<string, TeamSpeakServer> = {}
  private servergroups: Record<string, TeamSpeakServerGroup> = {}
  private channels: Record<string, TeamSpeakChannel> = {}
  private channelgroups: Record<string, TeamSpeakChannelGroup> = {}
  private query: TeamSpeakQuery

  constructor(config: Partial<ConnectionParams>) {
    super()

    this.config = {
      protocol: QueryProtocol.RAW,
      host: "127.0.0.1",
      queryport: config.protocol === QueryProtocol.SSH ? 10022 : 10011,
      readyTimeout: 10000,
      keepAlive: true,
      ...config
    }
    this.query = new TeamSpeakQuery(this.config)
    this.query.on("cliententerview", this.evcliententerview.bind(this))
    this.query.on("clientleftview", this.evclientleftview.bind(this))
    this.query.on("tokenused", this.evtokenused.bind(this))
    this.query.on("serveredited", this.evserveredited.bind(this))
    this.query.on("channeledited", this.evchanneledited.bind(this))
    this.query.on("channelmoved", this.evchannelmoved.bind(this))
    this.query.on("channeldeleted", this.evchanneldeleted.bind(this))
    this.query.on("channelcreated", this.evchannelcreated.bind(this))
    this.query.on("clientmoved", this.evclientmoved.bind(this))
    this.query.on("textmessage", this.evtextmessage.bind(this))
    this.query.on("ready", this.handleReady.bind(this))
    this.query.on("close", (e?: string) => super.emit("close", e))
    this.query.on("error", (e: Error) => super.emit("error", e))
    this.query.on("flooding", (e: ResponseError) => super.emit("flooding", e))
    this.query.on("debug", (data: Event.Debug) => super.emit("debug", data))
  }

  /**
   * connects via a Promise wrapper
   * @param config config options to connect
   */
  static connect(config: Partial<ConnectionParams>): Promise<TeamSpeak> {
    return new Promise((fulfill, reject) => {
      const teamspeak = new TeamSpeak(config)
      teamspeak.once("ready", () => {
        teamspeak.removeAllListeners()
        fulfill(teamspeak)
      })
      teamspeak.once("error", error => {
        teamspeak.removeAllListeners()
        teamspeak.forceQuit()
        reject(error)
      })
      teamspeak.once("close", error => {
        teamspeak.removeAllListeners()
        if (error instanceof Error) return reject(error)
        reject(new Error("TeamSpeak Server prematurely closed the connection"))        
      })
    })
  }

  /** handle after successfully connecting to a TeamSpeak Server */
  private handleReady() {
    const exec: Promise<any>[] = []
    if (this.config.username && this.config.password && this.config.protocol === "raw")
      exec.push(this.login(this.config.username, this.config.password))
    if (this.config.serverport)
      exec.push(this.useByPort(this.config.serverport, this.config.nickname))
    Promise.all(exec)
      .then(() => super.emit("ready"))
      .catch(e => super.emit("error", e))
  }


  /**
   * Gets called when a client connects to the TeamSpeak Server
   * @param event the raw teamspeak event
   */
  private evcliententerview(event: QueryResponse) {
    this.clientList()
      .then(clients => {
        const client = clients.find(client => client.clid === event.clid)
        super.emit("clientconnect", { client, cid: event.ctid })
      })
      .catch(error => this.emit("error", error))
  }


  /**
   * Gets called when a client discconnects from the TeamSpeak Server
   * @param event the raw teamspeak event
   */
  private evclientleftview(event: QueryResponse) {
    const { clid } = event
    super.emit("clientdisconnect", {
      client: (String(clid) in this.clients) ? this.clients[String(clid)!].toJSON() : { clid },
      event
    })
    Reflect.deleteProperty(this.clients, String(clid))
  }

  /**
   * Gets called when a client uses a privilege key
   * @param event the raw teamspeak event
   */
  private evtokenused(event: QueryResponse) {
    this.getClientByID(event.clid!)
      .then(client => {
        super.emit("tokenused", {client, token: event.token, token1: event.token1, token2: event.token2, tokencustomset: event.tokencustomset })
      }).catch(e => super.emit("error", e))
  }


  /**
   * Gets called when a chat message gets received
   * @param event the raw teamspeak event
   */
  private evtextmessage(event: QueryResponse) {
    this.getClientByID(event.invokerid!)
      .then(invoker => {
        super.emit("textmessage", { invoker, msg: event.msg, targetmode: event.targetmode })
      }).catch(e => super.emit("error", e))
  }

  /**
   * Gets called when a client moves to a different channel
   * @param event the raw teamspeak event
   */
  private evclientmoved(event: QueryResponse) {
    Promise.all([
      this.getClientByID(event.clid!),
      this.getChannelByID(event.ctid!)
    ]).then(([client, channel]) => {
      this.emit("clientmoved", { client, channel, reasonid: event.reasonid })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when the server has been edited
   * @param event the raw teamspeak event
   */
  private async evserveredited(event: QueryResponse) {
    this.getClientByID(event.invokerid!)
      .then(invoker => {
        const modified: QueryResponse = {}
        Object.keys(event)
          .filter(k => k.startsWith("virtualserver_"))
          .forEach(<T extends keyof QueryResponse>(k: T) => modified[k] = event[k])
        this.emit("serveredit", { invoker, modified, reasonid: event.reasonid })
      }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets edited
   * @param event the raw teamspeak event
   */
  private evchanneledited(event: QueryResponse) {
    Promise.all([
      this.getClientByID(event.invokerid!),
      this.getChannelByID(event.cid!)
    ]).then(([invoker, channel]) => {
      const modified: Partial<QueryResponse> = {}
      Object.keys(event)
        .filter(k => k.startsWith("channel_"))
        .forEach(<T extends keyof QueryResponse>(k: T) => modified[k] = event[k])
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
   * @param event the raw teamspeak event
   */
  private evchannelcreated(event: QueryResponse) {
    Promise.all([
      this.getClientByID(event.invokerid!),
      this.getChannelByID(event.cid!)
    ]).then(([invoker, channel]) => {
      const modified: QueryResponse = {}
      Object.keys(event)
        .filter(k => k.startsWith("channel_"))
        .forEach(<T extends keyof QueryResponse>(k: T) => modified[k] = event[k])
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
   * @param event the raw teamspeak event
   */
  private evchannelmoved(event: QueryResponse) {
    Promise.all([
      this.getClientByID(event.invokerid!),
      this.getChannelByID(event.cid!),
      this.getChannelByID(event.cpid!)
    ]).then(([invoker, channel, parent]) => {
      this.emit("channelmoved", { invoker, channel, parent, order: event.order })
    }).catch(e => this.emit("error", e))
  }

  /**
   * Gets called when a channel gets deleted
   * @param event the raw teamspeak event
   */
  private evchanneldeleted(event: QueryResponse) {
    this.getClientByID(event.invokerid!)
      .then(invoker => this.emit("channeldelete", { invoker, cid: event.cid }))
      .catch(e => this.emit("error", e))
  }


  /**
   * Sends a raw command to the TeamSpeak Server.
   * @param {...any} args the command which should get executed on the teamspeak server
   * @example
   * ts3.execute("clientlist", ["-ip"])
   * ts3.execute("use", [9987], { client_nickname: "test" })
   */
  execute(cmd: string, ...args: TeamSpeakQuery.executeArgs[]) {
    return this.query.execute(cmd, ...args)
  }


  /**
   * Adds a new query client login, or enables query login for existing clients.
   * When no virtual server has been selected, the command will create global query logins.
   * Otherwise the command enables query login for existing client, and cldbid must be specified.
   * @param client_login_name the login name
   * @param cldbid the database id which should be used
   */
  queryLoginAdd(client_login_name: string, cldbid?: number): Promise<Response.QueryLoginAdd> {
    return this.execute("queryloginadd", { client_login_name, cldbid }).then(TeamSpeak.singleResponse)
  }

  /**
   * Deletes an existing server query login on selected server.
   * When no virtual server has been selected, deletes global query logins instead.
   * @param cldbid deletes the querylogin of this client
   */
  queryLoginDel(cldbid: number) {
    return this.execute("querylogindel", { cldbid })
  }

  /**
   * List existing query client logins.
   * The pattern parameter can include regular characters and SQL wildcard characters (e.g. %).
   * Only displays query logins of the selected virtual server, or all query logins when no virtual server have been  selected.
   * @param pattern the pattern to filter for client login names
   * @param start the offset from where clients should be listed
   * @param duration how many clients should be listed
   */
  queryLoginList(pattern?: string, start?: number, duration?: number): Promise<Response.QueryLoginList[]> {
    return this.execute("queryloginlist", { pattern, start, duration }, ["-count"]).then(TeamSpeak.toArray)
  }


  /**
   * Updates your own ServerQuery login credentials using a specified username.
   * The password will be auto-generated.
   * @param name 
   */
  clientSetServerQueryLogin(name: string): Promise<Response.ClientSetServerQueryLogin> {
    return this.execute("clientsetserverquerylogin", { client_login_name: name }).then(TeamSpeak.singleResponse)
  }


  /**
   * Change your ServerQuery clients settings using given properties.
   * @param properties the properties which should be changed
   */
  clientUpdate(properties: Props.ClientUpdate) {
    return this.execute("clientupdate", properties)
  }


  /**
   * Subscribes to an Event
   * @param event the event on which should be subscribed
   * @param id the channel id, only required when subscribing to the "channel" event
   */
  registerEvent(event: string, id?: number) {
    return this.execute("servernotifyregister", { event, id })
  }


  /**
   * Subscribes to an Event.
   */
  unregisterEvent() {
    return this.execute("servernotifyunregister")
  }


  /**
   * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.
   * @param username the username which you want to login with
   * @param password the password you want to login with
   */
  login(username: string, password: string) {
    return this.execute("login", [username, password])
  }


  /** Deselects the active virtual server and logs out from the server instance. */
  logout() {
    return this.execute("logout")
  }


  /** Displays the servers version information including platform and build number. */
  version(): Promise<Response.Version> {
    return this.execute("version").then(TeamSpeak.singleResponse)
  }


  /**
   * Displays detailed connection information about the server instance including uptime,
   * number of virtual servers online, traffic information, etc.
   */
  hostInfo(): Promise<Response.HostInfo> {
    return this.execute("hostinfo").then(TeamSpeak.singleResponse)
  }


  /**
   * Displays the server instance configuration including database revision number,
   * the file transfer port, default group IDs, etc.
   */
  instanceInfo(): Promise<Response.InstanceInfo> {
    return this.execute("instanceinfo").then(TeamSpeak.singleResponse)
  }


  /**
   * Changes the server instance configuration using given properties.
   * @param properties the props you want to change
   */
  instanceEdit(properties: Props.InstanceEdit) {
    return this.execute("instanceedit", properties)
  }


  /** returns a list of IP addresses used by the server instance on multi-homed machines. */
  bindingList(): Promise<Response.BindingList[]> {
    return this.execute("bindinglist").then(TeamSpeak.toArray)
  }


  /**
   * Selects the virtual server specified with the port to allow further interaction.
   * @param port the port the server runs on
   * @param client_nickname set nickname when selecting a server
   */
  useByPort(port: number, client_nickname?: string) {
    return this.execute("use", { port, client_nickname }, ["-virtual"])
  }


  /**
   * Selects the virtual server specified with the sid to allow further interaction.
   * @param sid the server id
   * @param client_nickname set nickname when selecting a server
   */
  useBySid(sid: number, client_nickname?: string) {
    return this.execute("use", [sid, "-virtual"], { client_nickname })
  }


  /** returns information about your current ServerQuery connection including your loginname, etc. */
  whoami(): Promise<Response.Whoami> {
    return this.execute("whoami").then(TeamSpeak.singleResponse)
  }


  /**
   * Displays detailed configuration information about the selected virtual server
   * including unique ID, number of clients online, configuration, etc.
   */
  serverInfo(): Promise<Response.ServerInfo> {
    return this.execute("serverinfo").then(TeamSpeak.singleResponse)
  }


  /**
   * Displays the database ID of the virtual server running on the UDP port
   * @param virtualserver_port the server port where data should be retrieved
   */
  serverIdGetByPort(virtualserver_port: number): Promise<Response.ServerIdGetByPort> {
    return this.execute("serveridgetbyport", { virtualserver_port }).then(TeamSpeak.singleResponse)
  }


  /**
   * Changes the selected virtual servers configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.
   */
  serverEdit(properties: Props.ServerEdit) {
    return this.execute("serveredit", properties)
  }


  /**
   * Stops the entire TeamSpeak 3 Server instance by shutting down the process.
   * @param reasonmsg specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   */
  serverProcessStop(reasonmsg?: string) {
    return this.execute("serverprocessstop", { reasonmsg })
  }


  /**
   * returns detailed connection information about the selected virtual server including uptime, traffic information, etc.
   */
  connectionInfo(): Promise<Response.ServerRequestConnectionInfo> {
    return this.execute("serverrequestconnectioninfo").then(TeamSpeak.singleResponse)
  }


  /**
   * Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key.
   * If virtualserver_port is not specified, the server will test for the first unused UDP port
   * @param properties the server properties
   */
  serverCreate(properties: Props.ServerEdit): Promise<Response.ServerCreate> {
    let servertoken = ""
    return this.execute("servercreate", properties)
      .then(TeamSpeak.singleResponse)
      .then(({ token, sid }) => {
        servertoken = token
        return this.serverList({ virtualserver_id: sid })
      })
      .then(([server]) => ({ server, token: servertoken }))
  }


  /**
   * deletes the server
   * @param sid the server id to delete
   */
  serverDelete(sid: number) {
    return this.execute("serverdelete", { sid })
  }


  /**
   * Starts the virtual server. Depending on your permissions,
   * you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @param sid the server id to start
   */
  serverStart(sid: number) {
    return this.execute("serverstart", { sid })
  }


  /**
   * Stops the virtual server. Depending on your permissions,
   * you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @param sid the server id to stop
   * @param reasonmsg Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   */
  serverStop(sid: number, reasonmsg?: string) {
    return this.execute("serverstop", { sid, reasonmsg })
  }


  /**
   * Creates a new server group using the name specified with name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @param name the name of the servergroup
   * @param type type of the servergroup
   */
  serverGroupCreate(name: string, type: number = 1): Promise<TeamSpeakServerGroup> {
    return this.execute("servergroupadd", { name, type })
      .then(TeamSpeak.singleResponse)
      .then(({sgid}) => this.serverGroupList({ sgid }))
      .then(group => group[0])
  }


  /**
   * returns the IDs of all clients currently residing in the server group.
   * @param sgid the servergroup id
   */
  serverGroupClientList(sgid: number): Promise<Response.ServerGroupClientList[]> {
    return this.execute("servergroupclientlist", { sgid }, ["-names"]).then(TeamSpeak.toArray)
  }


  /**
   * Adds one or more clients to a server group specified with sgid.
   * Please note that a client cannot be added to default groups or template groups
   * @param cldbid one or more client database ids which should be added
   * @param sgid the servergroup id which the client(s) should be added to
   */
  serverGroupAddClient(cldbid: number|number[], sgid: number) {
    return this.execute("servergroupaddclient", { sgid, cldbid })
  }


  /**
   * Removes one or more clients from the server group specified with sgid.
   * @param cldbid one or more client database ids which should be added
   * @param sgid the servergroup id which the client(s) should be removed from
   */
  serverGroupDelClient(cldbid: number|number[], sgid: number) {
    return this.execute("servergroupdelclient", { cldbid, sgid })
  }


  /**
   * displays all server groups the client specified with cldbid is currently residing in
   * @param cldbid the client database id to check
   */
  serverGroupsByClientId(cldbid: number): Promise<Response.ServerGroupsByClientId[]> {
    return this.execute("servergroupsbyclientid", { cldbid }).then(TeamSpeak.toArray)
  }


  /**
   * Adds one or more servergroups to a client.
   * Please note that a client cannot be added to default groups or template groups
   * @param cldbid one or more client database ids which should be added
   * @param sgid one or more servergroup ids which the client should be added to
   */
  clientAddServerGroup(cldbid: number, sgid: number|number[]) {
    return this.execute("clientaddservergroup", { sgid, cldbid })
  }


  /**
   * Removes one or more servergroups from the client.
   * @param cldbid one or more client database ids which should be added
   * @param sgid one or more servergroup ids which the client should be removed from
   */
  clientDelServerGroup(cldbid: number, sgid: number|number[]) {
    return this.execute("clientdelservergroup", { cldbid, sgid })
  }


  /**
   * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
   * @param sgid the servergroup id
   * @param force if set to 1 the servergoup will be deleted even when clients stil belong to this group
   */
  serverGroupDel(sgid: number, force: number = 0) {
    return this.execute("servergroupdel", {sgid, force})
  }


  /**
   * Creates a copy of the server group specified with ssgid.
   * If tsgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tsgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param ssgid the source ServerGroup
   * @param tsgid the target ServerGroup, 0 to create a new Group
   * @param type the type of the servergroup (0 = Query Group | 1 = Normal Group)
   * @param name name of the group
   */
  serverGroupCopy(ssgid: number, tsgid: number = 0, type: number = 1, name: string = "foo"): Promise<Response.ServerGroupCopy> {
    return this.execute("servergroupcopy",  { ssgid, tsgid, type, name }).then(TeamSpeak.singleResponse)
  }


  /**
   * Changes the name of the server group
   * @param sgid the servergroup id
   * @param name new name of the servergroup
   */
  serverGroupRename(sgid: number, name: string) {
    return this.execute("servergrouprename", { sgid, name })
  }


  /**
   * Displays a list of permissions assigned to the server group specified with sgid.
   * @param sgid the servergroup id
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  serverGroupPermList(sgid: number, permsid: boolean = false): Promise<Response.PermList[]> {
    return this.execute("servergrouppermlist", { sgid }, [permsid ? "-permsid" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
   * @param sgid the ServerGroup id
   * @param perm the permid or permsid
   * @param value value of the Permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  serverGroupAddPerm(sgid: number, perm: string|number, value: number, skip: number = 0, negate: number = 0) {
    const properties: Record<string, any> = { sgid, permvalue: value, permskip: skip, permnegated: negate }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("servergroupaddperm", properties)
  }


  /**
   * Removes a set of specified permissions from the server group.
   * A permission can be specified by permid or permsid.
   * @param sgid the servergroup id
   * @param perm the permid or permsid
   */
  serverGroupDelPerm(sgid: number, perm: string|number) {
    const properties: Record<string, any> = { sgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("servergroupdelperm", properties)
  }

  /**
   * Sets a new temporary server password specified with pw. The temporary
   * password will be valid for the number of seconds specified with duration. The
   * client connecting with this password will automatically join the channel
   * specified with tcid. If tcid is set to 0, the client will join the default
   * channel.
   */
  serverTempPasswordAdd(props: Props.ServerTempPasswordAdd) {
    return this.execute("servertemppasswordadd", { tcid: 0, tcpw: "", desc: "", ...props })
  }

  /**
   * Deletes the temporary server password specified with pw.
   * @param pw the password to delete
   */
  serverTempPasswordDel(pw: string) {
    return this.execute("servertemppassworddel", { pw })
  }

  /**
   * Returns a list of active temporary server passwords. The output contains the
   * clear-text password, the nickname and unique identifier of the creating
   * client.
   */
  serverTempPasswordList(): Promise<Response.ServerTempPasswordList[]> {
    return this.execute("servertemppasswordlist").then(TeamSpeak.toArray)
  }


  /**
   * Creates a new channel using the given properties.
   * Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.
   * @param name the name of the channel
   * @param properties properties of the channel
   */
  channelCreate(name: string, properties: Props.ChannelEdit = {}) {
    properties.channel_name = name
    return this.execute("channelcreate", properties)
      .then(TeamSpeak.singleResponse)
      .then(({cid}) => this.channelList({ cid }))
      .then(([channel]) => channel)
  }


  /**
   * Creates a new channel group using a given name.
   * The optional type parameter can be used to create ServerQuery groups and template groups.
   * @param name the name of the channelgroup
   * @param type type of the channelgroup
   */
  channelGroupCreate(name: string, type: number = 1) {
    return this.execute("channelgroupadd", { name, type })
      .then(TeamSpeak.singleResponse)
      .then(({cgid}) => this.channelGroupList({ cgid }))
      .then(([group]) => group)
  }


  /**
   * Retrieves a Single Channel by the given Channel ID
   * @param cid the channel id
   */
  getChannelByID(cid: number): Promise<TeamSpeakChannel|undefined> {
    return this.channelList({ cid }).then(([channel]) => channel)
  }


  /**
   * Retrieves a Single Channel by the given Channel Name
   * @param channel_name the name of the channel
   */
  getChannelByName(channel_name: string): Promise<TeamSpeakChannel|undefined> {
    return this.channelList({ channel_name }).then(([channel]) => channel)
  }

  /**
   * displays a list of channels matching a given name pattern
   * @param pattern the channel name pattern to search for
   */
  channelFind(pattern: string): Promise<Response.ChannelFind[]> {
    return this.execute("channelfind", { pattern })
  }


  /**
   * Displays detailed configuration information about a channel including ID, topic, description, etc.
   * @param cid the channel id
   */
  channelInfo(cid: number): Promise<Response.ChannelInfo> {
    return this.execute("channelinfo", { cid }).then(TeamSpeak.singleResponse)
  }


  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @param cid the channel id
   * @param cpid channel parent id
   * @param order channel sort order
   */
  channelMove(cid: number, cpid: number, order: number = 0) {
    return this.execute("channelmove", { cid, cpid, order })
  }


  /**
   * Deletes an existing channel by ID.
   * If force is set to 1, the channel will be deleted even if there are clients within.
   * The clients will be kicked to the default channel with an appropriate reason message.
   * @param cid the channel id
   * @param force if set to 1 the channel will be deleted even when client are in it
   */
  channelDelete(cid: number, force: number = 0) {
    return this.execute("channeldelete", { cid, force})
  }


  /**
   * Changes a channels configuration using given properties.
   * Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @param cid the channel id
   * @param properties the properties of the channel which should get changed
   */
  channelEdit(cid: number, properties: Props.ChannelEdit = {}) {
    properties.cid = cid
    return this.execute("channeledit", properties)
  }


  /**
   * Displays a list of permissions defined for a channel.
   * @param cid the channel id
   * @param permsid whether the permsid should be displayed aswell
   */
  channelPermList(cid: number, permsid: boolean = false): Promise<Response.PermList[]> {
    return this.execute("channelpermlist", { cid }, [permsid ? "-permsid" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Adds a set of specified permissions to a channel.
   * @param cid the channel id
   * @param perm the permid or permsid
   * @param value the value which should be set
   */
  channelSetPerm(cid: number, perm: string|number, value: number) {
    const properties: Record<string, any> = { cid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    properties.permvalue = value
    return this.execute("channeladdperm", properties)
  }


  /**
   * Adds a set of specified permissions to a channel.
   * A permission can be specified by permid or permsid.
   * @param cid the channel id
   * @param permissions the permissions to assign
   * @example
   * TeamSpeak.channelSetPerms(5, [{ permsid: "i_channel_needed_modify_power", permvalue: 75 }])
   */
  channelSetPerms(cid: number, permissions: any[]) {
    return this.execute("channeladdperm", { cid }, permissions)
  }


  /**
   * Removes a set of specified permissions from a channel.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid.
   * @param cid the channel id
   * @param perm the permid or permsid
   */
  channelDelPerm(cid: number, perm: string|number) {
    const prop: Record<string, any> = { cid }
    prop[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channeldelperm", prop)
  }


  /**
   * Retrieves a Single Client by the given Client ID
   * @param clid the client id
   */
  getClientByID(clid: number): Promise<TeamSpeakClient|undefined> {
    return this.clientList({ clid })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Database ID
   * @param client_database_id the client database Id
   */
  getClientByDBID(client_database_id: number): Promise<TeamSpeakClient|undefined> {
    return this.clientList({ client_database_id })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @param client_unique_identifier the client unique identifier
   */
  getClientByUID(client_unique_identifier: string): Promise<TeamSpeakClient|undefined> {
    return this.clientList({ client_unique_identifier })
      .then(([client]) => client)
  }


  /**
   * Retrieves a Single Client by the given Client Unique Identifier
   * @param client_nickname the nickname of the client
   */
  getClientByName(client_nickname: string): Promise<TeamSpeakClient|undefined> {
    return this.clientList({ client_nickname })
      .then(([client]) => client)
  }


  /**
   * Returns General Info of the Client, requires the Client to be online
   * @param clid one or more client ids to get
   */
  clientInfo(clid: number|number[]): Promise<Response.ClientInfo[]> {
    return this.execute("clientinfo", { clid }).then(TeamSpeak.toArray)
  }


  /**
   * Returns the Clients Database List
   * @param start start offset
   * @param duration amount of entries which should get retrieved
   * @param count retrieve the count of entries
   */
  clientDBList(start: number = 0, duration: number = 1000, count: boolean = true): Promise<Response.ClientDBList[]> {
    return this.execute("clientdblist", { start, duration },  [count ? "-count" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Returns the Clients Database Info
   * @param cldbid one or more client database ids to get
   */
  clientDBInfo(cldbid: number|number[]): Promise<Response.ClientDBInfo[]> {
    return this.execute("clientdbinfo", { cldbid }).then(TeamSpeak.toArray)
  }


  /**
   * Kicks the Client from the Server
   * @param clid the client id
   * @param reasonid the reasonid
   * @param reasonmsg the message the client should receive when getting kicked
   */
  clientKick(clid: number, reasonid: ReasonIdentifier, reasonmsg: string) {
    return this.execute("clientkick", { clid, reasonid, reasonmsg })
  }


  /**
   * Moves the Client to a different Channel
   * @param clid the client id
   * @param cid channel id in which the client should get moved
   * @param cpw the channel password
   */
  clientMove(clid: number, cid: number, cpw?: string) {
    return this.execute("clientmove", { clid, cid, cpw })
  }


  /**
   * Pokes the Client with a certain message
   * @param clid the client id
   * @param msg the message the client should receive
   */
  clientPoke(clid: number, msg: string) {
    return this.execute("clientpoke", { clid, msg })
  }


  /**
   * Displays a list of permissions defined for a client
   * @param cldbid the client database id
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  clientPermList(cldbid: number, permsid: boolean = false): Promise<Response.PermList[]> {
    return this.execute("clientpermlist", { cldbid }, [permsid ? "-permsid" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @param cldbid the client database id
   * @param perm the permid or permsid
   * @param value value of the permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  clientAddPerm(cldbid: number, perm: string|number, value: number, skip: number = 0, negate: number = 0) {
    const properties: Record<string, any> = { cldbid }
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
   * @param cldbid the client database id
   * @param perm the permid or permsid
   */
  clientDelPerm(cldbid: number, perm: string|number) {
    const properties: Record<string, any> = { cldbid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("clientdelperm", properties)
  }


  /**
   * Searches for custom client properties specified by ident and value.
   * The value parameter can include regular characters and SQL wildcard characters (e.g. %).
   * @param ident the key to search for
   * @param pattern the search pattern to use
   */
  customSearch(ident: string, pattern: string): Promise<Response.CustomSearch> {
    return this.execute("customsearch", { ident, pattern }).then(TeamSpeak.singleResponse)
  }


  /**
   * returns a list of custom properties for the client specified with cldbid.
   * @param cldbid the Client Database ID which should be retrieved
   */
  customInfo(cldbid: number): Promise<Response.CustomInfo[]> {
    return this.execute("custominfo", { cldbid })
  }


  /**
   * Removes a custom property from a client specified by the cldbid.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @param cldbid the client Database ID which should be changed
   * @param ident the key which should be deleted
   */
  customDelete(cldbid: number, ident: string) {
    return this.execute("customdelete", { cldbid, ident })
  }


  /**
   * Creates or updates a custom property for client specified by the cldbid.
   * Ident and value can be any value, and are the key value pair of the custom property.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @param cldbid the client database id which should be changed
   * @param ident the key which should be set
   * @param value the value which should be set
   */
  customSet(cldbid: number, ident: string, value: string) {
    return this.execute("customset", { cldbid, ident, value })
  }


  /**
   * Sends a text message a specified target.
   * The type of the target is determined by targetmode while target specifies the ID of the recipient,
   * whether it be a virtual server, a channel or a client.
   * @param target target client id which should receive the message
   * @param targetmode targetmode (1: client, 2: channel, 3: server)
   * @param msg the message the client should receive
   */
  sendTextMessage(target: number, targetmode: TextMessageTargetMode, msg: string) {
    return this.execute("sendtextmessage", { target, targetmode, msg})
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup ID
   * @param sgid the servergroup id
   */
  getServerGroupByID(sgid: number): Promise<TeamSpeakServerGroup|undefined> {
    return this.serverGroupList({ sgid }).then(([group]) => group)
  }


  /**
   * Retrieves a single ServerGroup by the given ServerGroup Name
   * @param name the servergroup name
   */
  getServerGroupByName(name: string): Promise<TeamSpeakServerGroup|undefined> {
    return this.serverGroupList({ name }).then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup ID
   * @param cgid the channelgroup Id
   */
  getChannelGroupByID(cgid: number): Promise<TeamSpeakChannelGroup|undefined> {
    return this.channelGroupList({ cgid }).then(([group]) => group)
  }


  /**
   * Retrieves a single ChannelGroup by the given ChannelGroup Name
   * @param name the channelGroup name
   */
  getChannelGroupByName(name: string): Promise<TeamSpeakChannelGroup|undefined> {
    return this.channelGroupList({ name })
      .then(([group]) => group)
  }


  /**
   * Sets the channel group of a client
   * @param cgid the channelgroup which the client should get assigned
   * @param cid the channel in which the client should be assigned the group
   * @param cldbid the client database id which should be added to the group
   */
  setClientChannelGroup(cgid: number, cid: number, cldbid: number) {
    return this.execute("setclientchannelgroup", { cgid, cldbid, cid })
  }


  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @param cgid the channelgroup id
   * @param force if set to 1 the channelgroup will be deleted even when clients are in it
   */
  deleteChannelGroup(cgid: number, force: number = 0) {
    return this.execute("channelgroupdel", { cgid, force })
  }


  /**
   * Creates a copy of the channel group.
   * If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param scgid the source channelgroup
   * @param tcgid the target channelgroup (0 to create a new group)
   * @param type the type of the group (0 = Template Group | 1 = Normal Group)
   * @param name name of the goup
   */
  channelGroupCopy(scgid: number, tcgid: number = 0, type: number = 1, name: string = "foo"): Promise<Response.ChannelGroupCopy> {
    return this.execute("channelgroupcopy", { scgid, tcgid, type, name }).then(TeamSpeak.singleResponse)
  }


  /**
   * Changes the name of the channel group
   * @param cgid the channelgroup id to rename
   * @param name new name of the ghannelgroup
   */
  channelGroupRename(cgid: number, name: string) {
    return this.execute("channelgrouprename", { cgid, name })
  }


  /**
   * Displays a list of permissions assigned to the channel group specified with cgid.
   * @param cgid the channelgroup id to list
   * @param permsid if the permsid option is set to true the output will contain the permission names.
   */
  channelGroupPermList(cgid: number, permsid: boolean = false): Promise<Response.PermList[]> {
    return this.execute("channelgrouppermlist", { cgid }, [permsid ?  "-permsid" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @param cgid the channelgroup id
   * @param perm the permid or permsid
   * @param value value of the permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  channelGroupAddPerm(cgid: number, perm: string|number, value: number, skip: number = 0, negate: number = 0) {
    const properties: Record<string, any> = { cgid }
    properties[typeof perm === "string" ? "permsid": "permid"] = perm
    properties.permvalue = value
    properties.permskip = skip
    properties.permnegated = negate
    return this.execute("channelgroupaddperm", properties)
  }


  /**
   * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
   * @param cgid the channelgroup id
   * @param perm the permid or permsid
   */
  channelGroupDelPerm(cgid: number, perm: string|number) {
    const properties: Record<string, any> = { cgid }
    properties[typeof perm === "string" ? "permsid" : "permid"] = perm
    return this.execute("channelgroupdelperm", properties)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @param cgid the channelgroup id
   * @param cid the channel id
   */
  channelGroupClientList(cgid: number, cid?: number): Promise<Response.ChannelGroupClientList[]> {
    const properties: Record<string, any> = { cgid }
    if (typeof cid === "number") properties.cid = cid
    return this.execute("channelgroupclientlist", properties).then(TeamSpeak.toArray)
  }


  /**
   * Displays all permissions assigned to a client for the channel specified with cid.
   * If permid is set to 0, all permissions will be displayed.
   * A permission can be specified by permid or permsid.
   * @param cldbid the client database id
   * @param cid one or more permission names
   * @param permid one or more permission ids
   * @param permsid one or more permission names
   */
  permOverview(cldbid: number, cid: number, perms: number[]|string[] = []): Promise<Response.PermOverview[]> {
    const properties: Record<string, any> = { cldbid, cid }
    if (typeof perms[0] === "string") properties.permsid = perms
    if (typeof perms[0] === "number") properties.permid = perms
    return this.execute("permoverview", properties).then(TeamSpeak.toArray)
  }


  /**
   * Retrieves a list of permissions available on the server instance including ID, name and description.
   */
  permissionList(): Promise<Response.PermissionList[]> {
    return this.execute("permissionlist").then(TeamSpeak.toArray)
  }


  /**
   * Retrieves the database ID of one or more permissions specified by permsid.
   * @param permsid one name
   */
  permIdGetByName(permsid: string): Promise<Response.PermIdGetByName> {
    return this.execute("permidgetbyname", { permsid }).then(TeamSpeak.singleResponse)
  }


  /**
   * Retrieves the database ID of one or more permissions specified by permsid.
   * @param permsid multiple permission names
   */
  permIdsGetByName(permsid: string[]): Promise<Response.PermIdGetByName[]> {
    return this.execute("permidgetbyname", { permsid }).then(TeamSpeak.toArray)
  }


  /**
   * Retrieves the current value of the permission for your own connection.
   * This can be useful when you need to check your own privileges.
   * @param perm perm id or name which should be checked
   */
  permGet(perm: number|string): Promise<Response.PermGet> {
    return this.execute("permget", typeof perm === "string" ? { permsid: perm } : { permid: perm }).then(TeamSpeak.singleResponse)
  }


  /**
   * Retrieves detailed information about all assignments of the permission.
   * The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.
   * @param perm perm id or name to retrieve
   */
  permFind(perm: number|string): Promise<Response.PermFind[]> {
    return this.execute("permfind", (typeof perm === "number") ? { permid: perm } : { permsid: perm }).then(TeamSpeak.toArray)
  }


  /**
   * Restores the default permission settings on the selected virtual server and creates a new initial administrator token.
   * Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.
   */
  permReset(): Promise<Response.Token> {
    return this.execute("permreset").then(TeamSpeak.singleResponse)
  }


  /**
   * Retrieves a list of privilege keys available including their type and group IDs.
   */
  privilegeKeyList(): Promise<Response.PrivilegeKeyList[]> {
    return this.execute("privilegekeylist").then(TeamSpeak.toArray)
  }


  /**
   * Create a new token.+
   * If type is set to 0, the ID specified with tokenid will be a server group ID.
   * Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.
   * @param tokentype token type
   * @param group depends on the type given, add either a valid channelgroup or servergroup
   * @param cid depends on the type given, add a valid channel id
   * @param description token description
   * @param customset token custom set
   */
  privilegeKeyAdd(tokentype: TokenType, group: number, cid: number = 0, description: string = "", customset: string = ""): Promise<Response.Token> {
    return this.execute("privilegekeyadd", {
      tokentype,
      tokenid1: group,
      tokenid2: cid,
      tokendescription: description,
      tokencustomset: customset
    }).then(TeamSpeak.singleResponse)
  }


  /**
   * Create a new privilegekey token for a ServerGroup with the given description
   * @param group servergroup which should be generated the token for
   * @param description token description
   * @param tokencustomset token custom set
   */
  serverGroupPrivilegeKeyAdd(group: number, description?: string, tokencustomset: string = ""): Promise<Response.Token> {
    return this.privilegeKeyAdd(0, group, 0, description, tokencustomset)
  }


  /**
   * Create a new privilegekey token for a Channel Group and assigned Channel ID with the given description
   * @param group the channel group for which the token should be valid
   * @param cid channel id for which the token should be valid
   * @param description token description
   * @param tokencustomset token custom set
   */
  channelGroupPrivilegeKeyAdd(group: number, cid: number, description?: string, tokencustomset: string = ""): Promise<Response.Token> {
    return this.privilegeKeyAdd(1, group, cid, description, tokencustomset)
  }


  /**
   * Deletes an existing token matching the token key specified with token.
   * @param token the token which should be deleted
   */
  privilegeKeyDelete(token: string) {
    return this.execute("privilegekeydelete", { token })
  }


  /**
   * Use a token key gain access to a server or channel group.
   * Please note that the server will automatically delete the token after it has been used.
   * @param token the token which should be used
   */
  privilegeKeyUse(token: string) {
    return this.execute("privilegekeyuse", { token })
  }


  /**
   * Displays a list of offline messages you've received.
   * The output contains the senders unique identifier, the messages subject, etc.
   */
  messageList(): Promise<Response.MessageList[]> {
    return this.execute("messagelist").then(TeamSpeak.toArray)
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @param cluid client unique identifier
   * @param subject subject of the message
   * @param message message text
   */
  messageAdd(cluid: string, subject: string, message: string) {
    return this.execute("messageadd", { cluid, subject, message })
  }


  /**
   * Sends an offline message to the client specified by uid.
   * @param msgid the message id which should be deleted
   */
  messageDel(msgid: number) {
    return this.execute("messagedel", { msgid })
  }


  /**
   * Displays an existing offline message with the given id from the inbox.
   * @param msgid the message id
   */
  messageGet(msgid: number): Promise<Response.MessageGet> {
    return this.execute("messageget", { msgid }).then(TeamSpeak.singleResponse)
  }


  /**
   * Displays an existing offline message with the given id from the inbox.
   * @param msgid the message id
   * @param flag if flag is set to 1 the message will be marked as read
   */
  messageUpdate(msgid: number, flag: number = 1) {
    return this.execute("messageupdateflag", { msgid, flag })
  }


  /**
   * Displays a list of complaints on the selected virtual server.
   * If dbid is specified, only complaints about the targeted client will be shown.
   * @param cldbid filter only for certain client with the given database id
   */
  complainList(cldbid?: number): Promise<Response.ComplainList[]> {
    return this.execute("complainlist", { cldbid }).then(TeamSpeak.toArray)
  }


  /**
   * Submits a complaint about the client with database ID dbid to the server.
   * @param cldbid filter only for certain client with the given database id
   * @param message the Message which should be added
   */
  complainAdd(cldbid: number, message: string = "") {
    return this.execute("complainadd", { cldbid, message })
  }


  /**
   * Deletes the complaint about the client with ID tcldbid submitted by the client with ID fdbid from the server.
   * If fcldbid will be left empty all complaints for the tcldbid will be deleted
   * @param tcldbid the target client database id
   * @param fcldbid the client database id which filed the report
   */
  complainDel(tcldbid: number, fcldbid: number = 0) {
    const cmd = fcldbid > 0 ? "complaindel" : "complaindelall"
    const properties: Record<string, any> = { tcldbid }
    if (fcldbid > 0) properties.fcldbid = fcldbid
    return this.execute(cmd, properties)
  }


  /**
   * Displays a list of active bans on the selected virtual server.
   * @param start optional start from where clients should be listed
   * @param duration optional duration on how much ban entries should be retrieved
   */
  banList(start?: number, duration?: number): Promise<Response.BanList[]> {
    return this.execute("banlist", { start, duration }).then(TeamSpeak.toArray)
  }


  /**
   * Adds a new ban rule on the selected virtual server.
   * All parameters are optional but at least one of the following must be set: ip, name, uid or mytsid.
   */
  ban(properties: Props.BanAdd): Promise<Response.BanAdd> {
    return this.execute("banadd", properties).then(TeamSpeak.singleResponse)
  }


  /**
   * Bans the client specified with ID clid from the server.
   * Please note that this will create two separate ban rules for the targeted clients IP address and his unique identifier.
   */
  banClient(properties: Props.BanClient): Promise<Response.BanAdd> {
    return this.execute("banclient", properties).then(TeamSpeak.singleResponse)
  }


  /**
   * Removes one or all bans from the server
   * @param banid the banid to remove, if not provided it will remove all bans
   */
  banDel(banid?: number) {
    if (isNaN(banid||NaN)) {
      return this.execute("bandelall")
    } else {
      return this.execute("bandel", { banid })
    }
  }


  /**
   * Displays a specified number of entries from the servers log.
   * If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.
   * @param lines amount of lines to receive
   * @param reverse invert output (like Array.reverse)
   * @param instance instance or virtualserver log
   * @param begin_pos begin at position
   */
  logView(lines: number = 1000, reverse: number = 0, instance: number = 0, begin_pos: number = 0): Promise<Response.LogView[]> {
    return this.execute("logview", { lines, reverse, instance, begin_pos }).then(TeamSpeak.toArray)
  }


  /**
   * Writes a custom entry into the servers log.
   * Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log.
   * The loglevel parameter specifies the type of the entry
   * @param loglevel level 1 to 4
   * @param logmsg message to log
   */
  logAdd(loglevel: LogLevel, logmsg: string) {
    return this.execute("logadd", { loglevel, logmsg })
  }


  /**
   * Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.
   * @param msg message which will be sent to all instances
   */
  gm(msg: string) {
    return this.execute("gm", { msg })
  }

  /**
   * displays a list of clients matching a given name pattern
   * @param pattern the pattern to search clients
   */
  clientFind(pattern: string): Promise<Response.ClientFind[]> {
    return this.execute("clientfind", { pattern })
  }

  /**
   * displays all client IDs matching the unique identifier specified by cluid
   * @param cluid the unique id to search for
   */
  clientGetIds(cluid: string): Promise<Response.ClientGetIds[]> {
    return this.execute("clientgetids", { cluid }).then(TeamSpeak.toArray)
  }

  /**
   * displays the database ID matching the unique identifier specified by cluid
   * @param cluid the unique id to search for
   */
  clientGetDbidFromUid(cluid: string): Promise<Response.ClientGetDbidFromUid> {
    return this.execute("clientgetdbidfromuid", { cluid }).then(TeamSpeak.singleResponse)
  }

  /**
   * displays the database ID and nickname matching the unique identifier specified by cluid
   * @param cluid the unique id to search for
   */
  clientGetNameFromUid(cluid: string): Promise<Response.ClientGetNameFromUid> {
    return this.execute("clientgetnamefromuid", { cluid }).then(TeamSpeak.singleResponse)
  }

  /**
   * displays the database ID and nickname matching the unique identifier specified by cluid
   * @param clid the client id to search from
   */
  clientGetUidFromClid(clid: number): Promise<Response.ClientGetUidFromClid> {
    return this.execute("clientgetuidfromclid", { clid }).then(TeamSpeak.singleResponse)
  }

  /**
   * displays the unique identifier and nickname matching the database ID specified by cldbid
   * @param cldbid client database it to search from
   */
  clientGetNameFromDbid(cldbid: number): Promise<Response.ClientGetNameFromDbid> {
    return this.execute("clientgetnamefromdbid", { cldbid }).then(TeamSpeak.singleResponse)
  }

  /**
   * edits a specific client
   * @param clid the client id to modify
   * @param properties the properties to change
   */
  clientEdit(clid: number, properties: Props.ClientEdit) {
    return this.execute("clientedit", { clid, ...properties })
  }

  /**
   * Displays a list of client database IDs matching a given pattern.
   * You can either search for a clients last known nickname or his unique identity by using the -uid option.
   * @param pattern the pattern which should be searched for
   * @param isUid true when instead of the Name it should be searched for an uid
   */
  clientDBFind(pattern: string, isUid: boolean = false): Promise<Response.ClientDBFind[]> {
    return this.execute("clientdbfind", { pattern },[ isUid ? "-uid" : null]).then(TeamSpeak.toArray)
  }


  /**
   * Changes a clients settings using given properties.
   * @param cldbid the client database id which should be edited
   * @param properties the properties which should be modified
   */
  clientDBEdit(cldbid: number, properties: Props.ClientDBEdit) {
    return this.execute("clientdbedit", { cldbid, ...properties})
  }


  /**
   * Deletes a clients properties from the database.
   * @param cldbid the client database id which should be deleted
   */
  clientDBDelete(cldbid: number) {
    return this.execute("clientdbdelete", { cldbid })
  }


  /**
   * Displays a list of virtual servers including their ID, status, number of clients online, etc.
   */
  serverList(filter: Partial<Response.ServerList> = {}): Promise<TeamSpeakServer[]> {
    return this.execute("serverlist", ["-uid", "-all"])
      .then(TeamSpeak.toArray)
      .then(servers => this.handleCache(this.servers, servers, "virtualserver_id", TeamSpeakServer))
      .then(servers => TeamSpeak.filter(servers, filter))
      .then(servers => servers.map(s => this.servers[s.virtualserver_id!]))
  }

  /**
   * displays a list of permissions defined for a client in a specific channel
   * @param cid the channel to search from
   * @param cldbid the client database id to get permissions from
   * @param permsid wether to retrieve permission names instead of ids
   */
  channelClientPermList(cid: number, cldbid: number, permsid: boolean = false) {
    return this.execute("channelclientpermlist", { cid, cldbid }, [permsid ? "-permsid" : null])
  }


  /**
   * Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.
   */
  channelGroupList(filter: Partial<Response.ChannelGroupList> = {}) {
    return this.execute("channelgrouplist")
      .then(TeamSpeak.toArray)
      .then(groups => this.handleCache(this.channelgroups, groups, "cgid", TeamSpeakChannelGroup))
      .then(groups => TeamSpeak.filter(groups, filter))
      .then(groups => groups.map(g => this.channelgroups[g.cgid!]))
  }


  /**
   * Displays a list of server groups available.
   * Depending on your permissions, the output may also contain global ServerQuery groups and template groups.
   */
  serverGroupList(filter: Partial<Response.ServerGroupList> = {}) {
    return this.execute("servergrouplist")
      .then(TeamSpeak.toArray)
      .then(groups => this.handleCache(this.servergroups, groups, "sgid", TeamSpeakServerGroup))
      .then(groups => TeamSpeak.filter(groups, filter))
      .then(groups => groups.map(g => this.servergroups[g.sgid!]))
  }


  /**
   * Lists all Channels with a given Filter
   */
  channelList(filter: Partial<Response.ChannelList> = {}) {
    return this.execute("channellist", ["-topic", "-flags", "-voice", "-limits", "-icon", "-secondsempty"])
      .then(TeamSpeak.toArray)
      .then(channels => this.handleCache(this.channels, channels, "cid", TeamSpeakChannel))
      .then(channels => TeamSpeak.filter(channels, filter))
      .then(channels => channels.map(c => this.channels[String(c.cid)]))
  }


  /**
   * Lists all Clients with a given Filter
   */
  clientList(filter: Partial<Response.ClientList> = {}) {
    return this.execute("clientlist", ["-uid", "-away", "-voice", "-times", "-groups", "-info", "-icon", "-country", "-ip"])
      .then(TeamSpeak.toArray)
      .then(clients => this.handleCache(this.clients, clients, "clid", TeamSpeakClient))
      .then(clients => TeamSpeak.filter(clients, filter))
      .then(clients => clients.map(c => this.clients[String(c.clid)]))
  }

  ftList(): Promise<Response.FTList[]> {
    return this.execute("ftlist")
  }


  /**
   * Displays a list of files and directories stored in the specified channels file repository.
   * @param cid the channel id to check for
   * @param path the path to list
   * @param cpw the channel password
   */
  ftGetFileList(cid: number, path: string = "/", cpw?: string): Promise<Response.FTGetFileList[]> {
    return this.execute("ftgetfilelist", { cid, path, cpw }).then(TeamSpeak.toArray)
  }


  /**
   * Displays detailed information about one or more specified files stored in a channels file repository.
   * @param cid the channel id to check for
   * @param name the filepath to receive
   * @param cpw the channel password
   */
  ftGetFileInfo(cid: number, name: string, cpw: string = ""): Promise<Response.FTGetFileInfo> {
    return this.execute("ftgetfileinfo", { cid, name, cpw }).then(TeamSpeak.singleResponse)
  }


  /**
   * Stops the running file transfer with server-side ID serverftfid.
   * @param serverftfid server file transfer id
   * @param del
   */
  ftStop(serverftfid: number, del: number = 1) {
    return this.execute("ftstop", { serverftfid, delete: del })
  }


  /**
   * Deletes one or more files stored in a channels file repository
   * @param cid the channel id to check for
   * @param name path to the file to delete
   * @param cpw the channel password
   */
  ftDeleteFile(cid: number, name: string, cpw?: string) {
    return this.execute("ftdeletefile", { cid, name, cpw })
  }


  /**
   * Creates new directory in a channels file repository
   * @param cid the channel id to check for
   * @param dirname path to the directory
   * @param cpw the channel password
   */
  ftCreateDir(cid: number, dirname: string, cpw?: string) {
    return this.execute("ftcreatedir", { cid, dirname, cpw })
  }


  /**
   * Renames a file in a channels file repository.
   * If the two parameters tcid and tcpw are specified, the file will be moved into another channels file repository
   * @param cid the channel id to check for
   * @param oldname the path to the file which should be renamed
   * @param newname the path to the file with the new name
   * @param tcid target channel id if the file should be moved to a different channel
   * @param cpw the channel password from where the file gets renamed
   * @param tcpw the channel password from where the file will get transferred to
   */
  ftRenameFile(cid: number, oldname: string, newname: string, tcid?: number, cpw?: string, tcpw?: string) {
    return this.execute("ftrenamefile", { cid, oldname, newname, tcid, cpw, tcpw })
  }


  /**
   * Initializes a file transfer upload. clientftfid is an arbitrary ID to identify the file transfer on client-side.
   * On success, the server generates a new ftkey which is required to start uploading the file through TeamSpeak 3's file transfer interface.
   */
  ftInitUpload(transfer: Props.TransferUpload): Promise<Response.FTInitUpload> {
    return this.execute("ftinitupload", {
      clientftfid: Math.floor(Math.random() * 10000),
      cid: 0,
      resume: 0,
      overwrite: 1,
      cpw: "",
      ...transfer
    }).then(TeamSpeak.singleResponse)
  }


  /**
   * Initializes a file transfer download. clientftfid is an arbitrary ID to identify the file transfer on client-side.
   * On success, the server generates a new ftkey which is required to start downloading the file through TeamSpeak 3's file transfer interface.
   */
  ftInitDownload(transfer: Props.TransferDownload): Promise<Response.FTInitDownload> {
    return this.execute("ftinitdownload", {
      clientftfid: Math.floor(Math.random() * 10000),
      seekpos: 0,
      cpw: "",
      cid: 0,
      ...transfer
    }).then(TeamSpeak.singleResponse)
  }

  /**
   * Uploads a file
   * @param path the path whith the filename where the file should be uploaded to
   * @param data the data to upload
   * @param cid channel id to upload to
   * @param cpw channel password of the channel which will be uploaded to
   */
  async uploadFile(path: string, data: string|Buffer, cid: number = 0, cpw: string = "") {
    if (typeof data === "string") data = Buffer.from(data)
    const res = await this.ftInitUpload({ name: path, cid, cpw, size: data.byteLength })
    if (res.size === 0) throw new Error(res.msg)
    await new FileTransfer(this.config.host, res.port).upload(res.ftkey!, data)
  }

  /**
   * Returns the file in the channel with the given path
   * @param path the path whith the filename where the file should be uploaded to
   * @param cid channel id to download from
   * @param cpw channel password of the channel which will be uploaded to
   */
  async downloadFile(path: string, cid: number = 0, cpw: string = "") {
    const res = await this.ftInitDownload({name: path, cid, cpw })
    if (res.size === 0) throw new Error(res.msg)
    return await new FileTransfer(this.config.host, res.port).download(res.ftkey!, res.size)
  }


  /**
   * Returns an Icon with the given Name
   * @param name the name of the icon to retrieve eg "icon_262672952"
   */
  downloadIcon(name: string) {
    return this.downloadFile(`/${name}`)
  }


  /**
   * Gets the Icon Name of a resolveable Perm List
   * @param permlist expects a promise which resolves to a permission list
   */
  getIconName(permlist: Promise<Response.PermList[]>): Promise<string> {
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
   * displays a snapshot of the selected virtual server containing all settings,
   * groups and known client identities. The data from a server snapshot can be
   * used to restore a virtual servers configuration, channels and permissions
   * using the serversnapshotdeploy command.
   * only supports version 2 (from server 3.10.0)
   * @param password the optional password to encrypt the snapshot
   */
  createSnapshot(password?: string): Promise<Response.SnapshotCreate> {
    return this.execute(
      "serversnapshotcreate", 
      { password },
      parsers => {
        parsers.response = ({ raw, cmd }) => cmd.parseSnapshotCreate({ raw })
        return parsers
      }
    ).then(([res]) => ({
      version: parseInt(res.version, 10),
      salt: res.salt,
      snapshot: res.snapshot
    }))
  }

  /**
   * displays a snapshot of the selected virtual server containing all settings,
   * groups and known client identities. The data from a server snapshot can be
   * used to restore a virtual servers configuration, channels and permissions
   * using the serversnapshotdeploy command.
   * only supports version 2 (from server 3.10.0)
   * @param salt if a password has been set provide the salt from the response
   * @param password the password which has been set while saving
   * @param keepfiles wether it should keep the file mapping
   */
  deploySnapshot(data: string, salt?: string, password?: string, keepfiles: boolean = true, ) {
    return this.execute(
      "serversnapshotdeploy",
      [keepfiles ? "-keepfiles" : null, "-mapping"],
      { password, salt, version: 2 },
      parsers => {
        parsers.request = cmd => Command.buildSnapshotDeploy(data, cmd)
        return parsers
      }
    )
  }


  /** closes the ServerQuery connection to the TeamSpeak server instance. */
  quit() {
    return this.execute("quit")
  }


  /** forcefully closes the socket connection */
  forceQuit() {
    return this.query.forceQuit()
  }


  /**
   * parses the whole cache by given objects
   * @param cache the cache object
   * @param list the list to check against the cache
   * @param key the key used to identify the object inside the cache
   * @param node the class which should be used
   */
  private handleCache(cache: Record<string, NodeType>, list: QueryResponse[], key: keyof QueryResponse, node: NodeConstructable<NodeType>) {
    const remainder = Object.keys(cache)
    list.forEach(l => {
      const k = String(l[key])
      if (remainder.includes(k)) {
        cache[k].updateCache(l)
        remainder.splice(remainder.indexOf(k), 1)
      } else {
        cache[k] = new node(this, l)
      }
    })
    remainder.forEach(k => Reflect.deleteProperty(cache, String(k)))
    return list
  }

  /**
   * filters an array with given filter
   * @param array the array which should get filtered
   * @param filter filter object
   */
  static filter<T extends QueryResponse>(array: T[], filter: T): T[] {
    if (!Array.isArray(array)) array = [array]
    if (Object.keys(filter).length === 0) return array
    return array.filter(entry => Object.keys(filter).every((key: keyof QueryResponse) => {
      if (!Object.keys(entry).includes(key)) return false
      //@ts-ignore
      if (filter[key] instanceof RegExp) return filter[key].test(entry[key])
      if (Array.isArray(filter[key])) {
        if (Array.isArray(entry[key])) {
          //@ts-ignore
          return filter[key].every((e: any) => entry[key].includes(e))
        } else {
          //@ts-ignore
          return filter[key].includes(entry[key])
        }
      } else if (Array.isArray(entry[key])) {
        //@ts-ignore
        return entry[key].includes(filter[key])
      } else {
        switch (typeof entry[key]) {
          //@ts-ignore
          case "number": return entry[key] === parseFloat(filter[key])
          case "string": return entry[key] === filter[key]
          default: return false
        }
      }
    }))
  }

  /**
   * Transforms an Input to an Array
   * @param input input data which should be converted to an array
   */
  static toArray<T>(input: T|T[]): T[] {
    if (typeof input === "undefined" || input === null) return []
    if (!Array.isArray(input)) return [input]
    return input
  }

  /**
   * retrieves the first element of an array
   * @param input the response input
   */
  static singleResponse<T>(input: T|T[]): T {
    if (!Array.isArray(input)) return input
    return input[0]
  }

}