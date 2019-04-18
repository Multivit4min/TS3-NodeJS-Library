/**
 * EventEmitter
 */
declare class EventEmitter {
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    addListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    on(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    once(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependOnceListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    removeListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    off(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @returns {ThisType}
     */
    removeAllListeners(event: string | symbol): ThisType;
    /**
     *
     * @param {number} n
     * @returns {ThisType}
     */
    setMaxListeners(n: number): ThisType;
    /**
     *
     * @returns {number}
     */
    getMaxListeners(): number;
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    listeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    rawListeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     *
     * @returns {string[]|symbol[]}
     */
    eventNames(): string[] | symbol[];
    /**
     *
     * @param {string|symbol} type
     * @returns {number}
     */
    listenerCount(type: string | symbol): number;
}

/**
 * the TeamSpeak configuration object
 * @typedef {object} ConnectionParams
 * @param {string} [protocol=raw] - The Protocol to use, valid is ssh or raw
 * @param {string} [host="127.0.0.1"] - The Host on which the TeamSpeak Server runs
 * @param {number} [queryport=10011] - The Queryport on which the TeamSpeak Server runs
 * @param {number} [serverport=9987] - The Serverport on which the TeamSpeak Instance runs
 * @param {string} [username] - The username to authenticate with the TeamSpeak Server
 * @param {string} [password] - The password to authenticate with the TeamSpeak Server
 * @param {string} [nickname] - The Nickname the Client should have
 * @param {number} [readyTimeout=20000] - Maximum wait time for the connection to get established
 */
declare type ConnectionParams = any;

/**
 * Main TeamSpeak Query Class
 * @extends EventEmitter
 */
declare class TeamSpeak3 extends EventEmitter {
    constructor(config?: ConnectionParams);
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
    execute(...args: any[]): Promise<any>;
    /**
     * Adds a new query client login, or enables query login for existing clients.
     * When no virtual server has been selected, the command will create global query logins.
     * Otherwise the command enables query login for existing client, and cldbid must be specified.
     * @param {string} client_login_name - the login name
     * @param {number} [cldbid] - the database id which should be used
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed
     */
    queryLoginAdd(client_login_name: string, cldbid?: number): Promise<any>;
    /**
     * Deletes an existing server query login on selected server.
     * When no virtual server has been selected, deletes global query logins instead.
     * @param {number} cldbid - deletes the querylogin of this client
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed
     */
    queryLoginDel(cldbid: number): Promise<any>;
    /**
     * List existing query client logins.
     * The pattern parameter can include regular characters and SQL wildcard characters (e.g. %).
     * Only displays query logins of the selected virtual server, or all query logins when no virtual server have been  selected.
     * @param {string} [pattern] - the pattern to filter for client login names
     * @param {number} [start] - the offset from where clients should be listed
     * @param {number} [duration] - how many clients should be listed
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed
     */
    queryLoginList(pattern?: string, start?: number, duration?: number): Promise<any>;
    /**
     * Change your ServerQuery clients settings using given properties.
     * @version 1.0
     * @async
     * @param {object} properties - The Properties which should be changed
     * @returns {Promise.<object>}
     */
    clientUpdate(properties: any): Promise<any>;
    /**
     * Subscribes to an Event.
     * @version 1.0
     * @async
     * @param {string} event - The Event on which should be subscribed
     * @param {number} [id] - The Channel ID, only required when subscribing to the "channel" event
     * @returns {Promise.<object>}
     */
    registerEvent(event: string, id?: number): Promise<any>;
    /**
     * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.
     * @version 1.0
     * @async
     * @param {string} username - The Username which you want to login with
     * @param {string} password - The Password you want to login with
     * @returns {Promise.<object>}
     */
    login(username: string, password: string): Promise<any>;
    /**
     * Deselects the active virtual server and logs out from the server instance.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    logout(): Promise<any>;
    /**
     * Displays the servers version information including platform and build number.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    version(): Promise<any>;
    /**
     * Displays detailed connection information about the server instance including uptime,
     * number of virtual servers online, traffic information, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    hostInfo(): Promise<any>;
    /**
     * Displays the server instance configuration including database revision number,
     * the file transfer port, default group IDs, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    instanceInfo(): Promise<any>;
    /**
     * Changes the server instance configuration using given properties.
     * @version 1.0
     * @async
     * @param {object} properties - The stuff you want to change
     * @returns {Promise.<object>}
     */
    instanceEdit(properties: any): Promise<any>;
    /**
     * Displays a list of IP addresses used by the server instance on multi-homed machines.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    bindingList(): Promise<any>;
    /**
     * Selects the virtual server specified with the port to allow further interaction.
     * @version 1.0
     * @async
     * @param {number} port - The Port the Server runs on
     * @param {string} [client_nickname] - Set Nickname when selecting a server
     * @returns {Promise.<object>}
     */
    useByPort(port: number, client_nickname?: string): Promise<any>;
    /**
     * Selects the virtual server specified with the sid to allow further interaction.
     * @version 1.0
     * @async
     * @param {number} sid - The Server ID
     * @param {string} [client_nickname] - Set Nickname when selecting a server
     * @returns {Promise.<object>}
     */
    useBySid(sid: number, client_nickname?: string): Promise<any>;
    /**
     * Displays information about your current ServerQuery connection including your loginname, etc.
     * @version 1.0
     * @async
     * @returns {Promise<object>} Promise object which provides the Information about the QueryClient
     */
    whoami(): Promise<any>;
    /**
     * Displays detailed configuration information about the selected virtual server
     * including unique ID, number of clients online, configuration, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    serverInfo(): Promise<any>;
    /**
     * Displays the database ID of the virtual server running on the UDP port
     * @version 1.0
     * @async
     * @param {number} virtualserver_port - The Server Port where data should be retrieved
     * @returns {Promise.<object>}
     */
    serverIdGetByPort(virtualserver_port: number): Promise<any>;
    /**
     * Changes the selected virtual servers configuration using given properties.
     * Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.
     * @version 1.0
     * @async
     * @param {object} properties - The Server Settings which should be changed
     * @returns {Promise.<object>}
     */
    serverEdit(properties: any): Promise<any>;
    /**
     * Stops the entire TeamSpeak 3 Server instance by shutting down the process.
     * @version 1.0
     * @async
     * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
     * @returns {Promise.<object>}
     */
    serverProcessStop(reasonmsg?: string): Promise<any>;
    /**
     * Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    connectionInfo(): Promise<any>;
    /**
     * Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key.
     * If virtualserver_port is not specified, the server will test for the first unused UDP port
     * @version 1.0
     * @async
     * @param {object} properties - The Server Settings
     * @returns {Promise.<object>} returns the server admin token for the new server and the response from the server creation
     */
    serverCreate(properties: any): Promise<any>;
    /**
     * Deletes a Server.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @returns {Promise.<object>}
     */
    serverDelete(sid: number): Promise<any>;
    /**
     * Starts the virtual server. Depending on your permissions,
     * you're able to start either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @returns {Promise.<object>}
     */
    serverStart(sid: number): Promise<any>;
    /**
     * Stops the virtual server. Depending on your permissions,
     * you're able to stop either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @param {number} sid - the server id
     * @param {string} [reasonmsg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
     * @returns {Promise.<object>}
     */
    serverStop(sid: number, reasonmsg?: string): Promise<any>;
    /**
     * Creates a new server group using the name specified with name.
     * The optional type parameter can be used to create ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Server Group
     * @param {number} [type=1] - Type of the Server Group
     * @returns {Promise.<object>}
     */
    serverGroupCreate(name: string, type?: number): Promise<any>;
    /**
     * Displays the IDs of all clients currently residing in the server group.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @returns {Promise.<object>}
     */
    serverGroupClientList(sgid: number): Promise<any>;
    /**
     * Adds the client to the server group specified with sgid.
     * Please note that a client cannot be added to default groups or template groups.
     * @version 1.0
     * @async
     * @param {number} cldbid - The Client Database ID which should be added
     * @param {number} sgid - The Server Group ID which the Client should be added to
     * @returns {Promise.<object>}
     */
    serverGroupAddClient(cldbid: number, sgid: number): Promise<any>;
    /**
     * Removes the client from the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {number} cldbid - The Client Database ID which should be removed
     * @param {number} sgid - The Server Group ID which the Client should be removed from
     * @returns {Promise.<object>}
     */
    serverGroupDelClient(cldbid: number, sgid: number): Promise<any>;
    /**
     * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {number} [force=0] - If set to 1 the ServerGroup will be deleted even when Clients are in it
     * @returns {Promise.<object>}
     */
    serverGroupDel(sgid: number, force?: number): Promise<any>;
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
     * @returns {Promise.<object>}
     */
    serverGroupCopy(ssgid: number, tsgid?: number, type?: number, name?: string | boolean): Promise<any>;
    /**
     * Changes the name of the server group
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {string} name - new name of the ServerGroup
     * @returns {Promise.<object>}
     */
    serverGroupRename(sgid: number, name: string): Promise<any>;
    /**
     * Displays a list of permissions assigned to the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @returns {Promise.<object>}
     */
    serverGroupPermList(sgid: number, permsid?: boolean): Promise<any>;
    /**
     * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @returns {Promise.<object>}
     */
    serverGroupAddPerm(sgid: number, perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from the server group.
     * A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup id
     * @param {string|number} perm - The permid or permsid
     * @returns {Promise.<object>}
     */
    serverGroupDelPerm(sgid: number, perm: string | number): Promise<any>;
    /**
     * Creates a new channel using the given properties.
     * Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Channel
     * @param {object} [properties={}] - Properties of the Channel
     * @returns {Promise.<object>}
     */
    channelCreate(name: string, properties?: any): Promise<any>;
    /**
     * Creates a new channel group using a given name.
     * The optional type parameter can be used to create ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Channel Group
     * @param {number} [type=1] - Type of the Channel Group
     * @returns {Promise.<object>}
     */
    channelGroupCreate(name: string, type?: number): Promise<any>;
    /**
     * Retrieves a Single Channel by the given Channel ID
     * @version 1.0
     * @async
     * @param {number} cid - The Channel Id
     * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
     */
    getChannelByID(cid: number): Promise<TeamSpeakChannel>;
    /**
     * Retrieves a Single Channel by the given Channel Name
     * @version 1.0
     * @async
     * @param {number} channel_name - The Name of the Channel
     * @returns {Promise<TeamSpeakChannel>} Promise object which returns the Channel Object or undefined if not found
     */
    getChannelByName(channel_name: number): Promise<TeamSpeakChannel>;
    /**
     * Displays detailed configuration information about a channel including ID, topic, description, etc.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @return {Promise.<object>}
     */
    channelInfo(cid: number): Promise<any>;
    /**
     * Moves a channel to a new parent channel with the ID cpid.
     * If order is specified, the channel will be sorted right under the channel with the specified ID.
     * If order is set to 0, the channel will be sorted right below the new parent.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {number} cpid - Channel Parent ID
     * @param {number} [order=0] - Channel Sort Order
     * @return {Promise.<object>}
     */
    channelMove(cid: number, cpid: number, order?: number): Promise<any>;
    /**
     * Deletes an existing channel by ID.
     * If force is set to 1, the channel will be deleted even if there are clients within.
     * The clients will be kicked to the default channel with an appropriate reason message.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {number} [force=0] - If set to 1 the Channel will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    channelDelete(cid: number, force?: number): Promise<any>;
    /**
     * Changes a channels configuration using given properties.
     * Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {object} [properties={}] - The Properties of the Channel which should get changed
     * @return {Promise.<object>}
     */
    channelEdit(cid: number, properties?: any): Promise<any>;
    /**
     * Displays a list of permissions defined for a channel.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {boolean} [permsid=false] - Whether the Perm SID should be displayed aswell
     * @return {Promise.<object[]>}
     */
    channelPermList(cid: number, permsid?: boolean): Promise<any[]>;
    /**
     * Adds a set of specified permissions to a channel.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - The Value which should be set
     * @return {Promise.<object>}
     */
    channelSetPerm(cid: number, perm: string | number, value: number): Promise<any>;
    /**
     * Adds a set of specified permissions to a channel.
     * A permission can be specified by permid or permsid.
     * @version 1.11.1
     * @async
     * @param {number} cid - the channel id
     * @param {array} permissions - the permissions to assign
     * @return {Promise.<object>}
     * @example
     * TeamSpeak3.channelSetPerms(5, [{ permsid: "i_channel_needed_modify_power", permvalue: 75 }])
     */
    channelSetPerms(cid: number, permissions: array): Promise<any>;
    /**
     * Removes a set of specified permissions from a channel.
     * Multiple permissions can be removed at once.
     * A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cid - the channel id
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    channelDelPerm(cid: number, perm: string | number): Promise<any>;
    /**
     * Retrieves a Single Client by the given Client ID
     * @version 1.0
     * @async
     * @param {number} clid - The Client Id
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByID(clid: number): Promise<TeamSpeakClient>;
    /**
     * Retrieves a Single Client by the given Client Database ID
     * @version 1.0
     * @async
     * @param {number} client_database_id - The Client Database Id
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByDBID(client_database_id: number): Promise<TeamSpeakClient>;
    /**
     * Retrieves a Single Client by the given Client Unique Identifier
     * @version 1.0
     * @async
     * @param {string} client_unique_identifier - The Client Unique Identifier
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByUID(client_unique_identifier: string): Promise<TeamSpeakClient>;
    /**
     * Retrieves a Single Client by the given Client Unique Identifier
     * @version 1.0
     * @async
     * @param {string} client_nickname - The Nickname of the Client
     * @returns {Promise.<TeamSpeakClient>} Promise object which returns the Client or undefined if not found
     */
    getClientByName(client_nickname: string): Promise<TeamSpeakClient>;
    /**
     * Returns General Info of the Client, requires the Client to be online
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @returns {Promise.<object>} Promise with the Client Information
     */
    clientInfo(clid: number): Promise<any>;
    /**
     * Returns the Clients Database List
     * @version 1.0.1
     * @async
     * @param {number} [start=0] - Start Offset
     * @param {number} [duration=1000] - Duration or Limit of Clients
     * @param {boolean} count - True when the results should be counted
     * @returns {Promise.<object>} Returns the Client Database Info
     */
    clientDBList(start?: number, duration?: number, count?: boolean): Promise<any>;
    /**
     * Returns the Clients Database Info
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @returns {Promise.<object>} Returns the Client Database Info
     */
    clientDBInfo(cldbid: number): Promise<any>;
    /**
     * Kicks the Client from the Server
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {number} reasonid - the reasonid
     * @param {string} reasonmsg - The Message the Client should receive when getting kicked
     * @returns {Promise.<object>} Promise Object
     */
    clientKick(clid: number, reasonid: number, reasonmsg: string): Promise<any>;
    /**
     * Moves the Client to a different Channel
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {number} cid - Channel ID in which the Client should get moved
     * @param {string} [cpw] - The Channel Password
     * @returns {Promise.<object>} Promise Object
     */
    clientMove(clid: number, cid: number, cpw?: string): Promise<any>;
    /**
     * Pokes the Client with a certain message
     * @version 1.0
     * @async
     * @param {number} clid - the client id
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    clientPoke(clid: number, msg: string): Promise<any>;
    /**
     * Displays a list of permissions defined for a client
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object>}
     */
    clientPermList(cldbid: number, permsid?: boolean): Promise<any>;
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
     * @return {Promise.<object>}
     */
    clientAddPerm(cldbid: number, perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from a client.
     * Multiple permissions can be removed at once.
     * A permission can be specified by permid or permsid
     * @version 1.0
     * @async
     * @param {number} cldbid - the client database id
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    clientDelPerm(cldbid: number, perm: string | number): Promise<any>;
    /**
     * Searches for custom client properties specified by ident and value.
     * The value parameter can include regular characters and SQL wildcard characters (e.g. %).
     * @version 1.3
     * @async
     * @param {string} ident - the key to search for
     * @param {string} pattern - the search pattern to use
     * @returns {Promise.<object>} Promise Object
     */
    customSearch(ident: string, pattern: string): Promise<any>;
    /**
     * Displays a list of custom properties for the client specified with cldbid.
     * @version 1.3
     * @async
     * @param {number} cldbid - The Client Database ID which should be retrieved
     * @returns {Promise.<object>} Promise Object
     */
    customInfo(cldbid: number): Promise<any>;
    /**
     * Removes a custom property from a client specified by the cldbid.
     * This requires TeamSpeak Server Version 3.2.0 or newer.
     * @version 1.3
     * @async
     * @param {number} cldbid - The Client Database ID which should be changed
     * @param {string} ident - The Key which should be deleted
     * @returns {Promise.<object>} Promise Object
     */
    customDelete(cldbid: number, ident: string): Promise<any>;
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
    customSet(cldbid: number, ident: string, value: string): Promise<any>;
    /**
     * Sends a text message a specified target.
     * The type of the target is determined by targetmode while target specifies the ID of the recipient,
     * whether it be a virtual server, a channel or a client.
     * @version 1.0
     * @async
     * @param {number} target - target client id which should receive the message
     * @param {number} targetmode - targetmode (1: client, 2: channel, 3: server)
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    sendTextMessage(target: number, targetmode: number, msg: string): Promise<any>;
    /**
     * Retrieves a single ServerGroup by the given ServerGroup ID
     * @version 1.0
     * @async
     * @param {number} sgid - the ServerGroup Id
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
     */
    getServerGroupByID(sgid: number): Promise<TeamSpeakServerGroup>;
    /**
     * Retrieves a single ServerGroup by the given ServerGroup Name
     * @version 1.0
     * @async
     * @param {number} name - the ServerGroup name
     * @returns {Promise.<TeamSpeakServerGroup>} Promise object which returns the ServerGroup or undefined if not found
     */
    getServerGroupByName(name: number): Promise<TeamSpeakServerGroup>;
    /**
     * Retrieves a single ChannelGroup by the given ChannelGroup ID
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup Id
     * @returns {Promise.<TeamSpeakChannelGroup>} Promise object which returns the ChannelGroup or undefined if not found
     */
    getChannelGroupByID(cgid: number): Promise<TeamSpeakChannelGroup>;
    /**
     * Retrieves a single ChannelGroup by the given ChannelGroup Name
     * @version 1.0
     * @async
     * @param {number} name - the ChannelGroup name
     * @returns {Promise.<TeamSpeakChannelGroup>} Promise object which returns the ChannelGroup or undefined if not found
     */
    getChannelGroupByName(name: number): Promise<TeamSpeakChannelGroup>;
    /**
     * Sets the channel group of a client
     * @version 1.0
     * @async
     * @param {number} cgid - The Channel Group which the Client should get assigned
     * @param {number} cid - The Channel in which the Client should be assigned the Group
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @return {Promise.<object>}
     */
    setClientChannelGroup(cgid: number, cid: number, cldbid: number): Promise<any>;
    /**
     * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {number} cgid - the channelgroup id
     * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    deleteChannelGroup(cgid: number, force?: number): Promise<any>;
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
     * @return {Promise.<object>}
     */
    channelGroupCopy(scgid: number, tcgid?: number, type?: number, name?: string): Promise<any>;
    /**
     * Changes the name of the channel group
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id to rename
     * @param {string} name - new name of the ChannelGroup
     * @return {Promise.<object>}
     */
    channelGroupRename(cgid: number, name: string): Promise<any>;
    /**
     * Displays a list of permissions assigned to the channel group specified with cgid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id to list
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object[]>}
     */
    channelGroupPermList(cgid: number, permsid?: boolean): Promise<any[]>;
    /**
     * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise.<object>}
     */
    channelGroupAddPerm(cgid: number, perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    channelGroupDelPerm(cgid: number, perm: string | number): Promise<any>;
    /**
     * Displays the IDs of all clients currently residing in the channel group.
     * @version 1.0
     * @async
     * @param {number} cgid - the ChannelGroup id
     * @param {number} [cid] - The Channel ID
     * @return {Promise.<TeamSpeakClient[]>}
     */
    channelGroupClientList(cgid: number, cid?: number): Promise<TeamSpeakClient[]>;
    /**
     * Displays all permissions assigned to a client for the channel specified with cid.
     * If permid is set to 0, all permissions will be displayed.
     * A permission can be specified by permid or permsid.
     * @async
     * @param {number} cldbid - The Client Database ID
     * @param {number} cid - One or more Permission Names
     * @param {number} [permid] - One or more Permission IDs
     * @param {number} [permsid] - One or more Permission Names
     * @returns {Promise.<object>} retrieves assigned permissions
     */
    permOverview(cldbid: number, cid: number, permid?: number, permsid?: number): Promise<any>;
    /**
     * Retrieves a list of permissions available on the server instance including ID, name and description.
     * @version 1.0
     * @async
     * @returns {Promise.<object[]>} gets a list of permissions available
     */
    permissionList(): Promise<any[]>;
    /**
     * Retrieves the database ID of one or more permissions specified by permsid.
     * @version 1.0
     * @async
     * @param {string|array} permsid - One or more Permission Names
     * @returns {Promise.<object>} gets the specified permissions
     */
    permIdGetByName(permsid: string | array): Promise<any>;
    /**
     * Retrieves the current value of the permission for your own connection.
     * This can be useful when you need to check your own privileges.
     * @version 1.0
     * @async
     * @param {number|string} key - Perm ID or Name which should be checked
     * @returns {Promise.<object>} gets the permissions
     */
    permGet(key: number | string): Promise<any>;
    /**
     * Retrieves detailed information about all assignments of the permission.
     * The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.
     * @version 1.0
     * @async
     * @param {number|string} perm - Perm ID or Name to get
     * @returns {Promise.<object>} gets the permissions
     */
    permFind(perm: number | string): Promise<any>;
    /**
     * Restores the default permission settings on the selected virtual server and creates a new initial administrator token.
     * Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.
     * @version 1.0
     * @async
     * @returns {Promise}
     */
    permReset(): Promise;
    /**
     * Retrieves a list of privilege keys available including their type and group IDs.
     * @version 1.0
     * @async
     * @returns {Promise.<object>} gets a list of privilegekeys
     */
    privilegeKeyList(): Promise<any>;
    /**
     * Create a new token.
     * If type is set to 0, the ID specified with tokenid will be a server group ID.
     * Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.
     * @version 1.0
     * @async
     * @param {number} tokentype - Token Type
     * @param {number} group - Depends on the Type given, add either a valid Channel Group or Server Group
     * @param {number} [cid=0] - Depends on the Type given, add a valid Channel ID
     * @param {string} [description] - Token Description
     * @returns {Promise.<object>}
     */
    privilegeKeyAdd(tokentype: number, group: number, cid?: number, description?: string): Promise<any>;
    /**
     * Create a new privilegekey token for a ServerGroup with the given description
     * @version 1.10
     * @async
     * @param {number} group - Server Group which should be generated the token for
     * @param {string} [description] - Token Description
     * @returns {Promise.<object>}
     */
    serverGroupPrivilegeKeyAdd(group: number, description?: string): Promise<any>;
    /**
     * Create a new privilegekey token for a Channel Group and assigned Channel ID with the given description
     * @version 1.10
     * @async
     * @param {number} group - The Channel Group for which the token should be valid
     * @param {number} cid - Channel ID for which the token should be valid
     * @param {string} [description] - Token Description
     * @returns {Promise.<object>}
     */
    channelGroupPrivilegeKeyAdd(group: number, cid: number, description?: string): Promise<any>;
    /**
     * Deletes an existing token matching the token key specified with token.
     * @version 1.0
     * @async
     * @param {string} token - The token which should be deleted
     * @returns {Promise.<object>}
     */
    privilegeKeyDelete(token: string): Promise<any>;
    /**
     * Use a token key gain access to a server or channel group.
     * Please note that the server will automatically delete the token after it has been used.
     * @version 1.0
     * @async
     * @param {string} token - The token which should be used
     * @returns {Promise.<object>}
     */
    privilegeKeyUse(token: string): Promise<any>;
    /**
     * Displays a list of offline messages you've received.
     * The output contains the senders unique identifier, the messages subject, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    messageList(): Promise<any>;
    /**
     * Sends an offline message to the client specified by uid.
     * @version 1.0
     * @async
     * @param {string} cluid - Client Unique Identifier (uid)
     * @param {string} subject - Subject of the message
     * @param {string} text - Message Text
     * @returns {Promise.<object>}
     */
    messageAdd(cluid: string, subject: string, text: string): Promise<any>;
    /**
     * Sends an offline message to the client specified by uid.
     * @version 1.0
     * @async
     * @param {number} msgid - The Message ID which should be deleted
     * @returns {Promise.<object>}
     */
    messageDel(msgid: number): Promise<any>;
    /**
     * Displays an existing offline message with the given id from the inbox.
     * @version 1.0
     * @async
     * @param {number} msgid - Gets the content of the Message
     * @returns {Promise.<object>}
     */
    messageGet(msgid: number): Promise<any>;
    /**
     * Displays an existing offline message with the given id from the inbox.
     * @version 1.0
     * @async
     * @param {number} msgid - Gets the content of the Message
     * @param {number} [flag=1] - If flag is set to 1 the message will be marked as read
     * @returns {Promise.<object>}
     */
    messageUpdate(msgid: number, flag?: number): Promise<any>;
    /**
     * Displays a list of complaints on the selected virtual server.
     * If dbid is specified, only complaints about the targeted client will be shown.
     * @version 1.0
     * @async
     * @param {number} [cldbid] - Filter only for certain Client with the given Database ID
     * @returns {Promise.<object>}
     */
    complainList(cldbid?: number): Promise<any>;
    /**
     * Submits a complaint about the client with database ID dbid to the server.
     * @version 1.0
     * @async
     * @param {number} cldbid - Filter only for certain Client with the given Database ID
     * @param {string} [message] - The Message which should be added
     * @returns {Promise.<object>}
     */
    complainAdd(cldbid: number, message?: string): Promise<any>;
    /**
     * Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server.
     * If dbid will be left empty all complaints for the tdbid will be deleted
     * @version 1.0
     * @async
     * @param {number} tcldbid - The Target Client Database ID
     * @param {number} [fcldbid] - The Client Database ID which filed the Report
     * @returns {Promise.<object>}
     */
    complainDel(tcldbid: number, fcldbid?: number): Promise<any>;
    /**
     * Displays a list of active bans on the selected virtual server.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    banList(): Promise<any>;
    /**
     * Adds a new ban rule on the selected virtual server.
     * All parameters are optional but at least one of the following must be set: ip, name, or uid.
     * @version 1.0
     * @async
     * @param {string} [ip] - IP Regex
     * @param {string} [name] - Name Regex
     * @param {string} [uid] - UID Regex
     * @param {number} time - Bantime in Seconds, if left empty it will result in a permaban
     * @param {string} banreason - Ban Reason
     * @returns {Promise.<object>}
     */
    banAdd(ip?: string, name?: string, uid?: string, time: number, banreason: string): Promise<any>;
    /**
     * Removes one or all bans from the server
     * @version 1.0
     * @async
     * @param {number} [banid] - The BanID to remove, if not provided it will remove all bans
     * @returns {Promise.<object>}
     */
    banDel(banid?: number): Promise<any>;
    /**
     * Displays a specified number of entries from the servers log.
     * If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.
     * @version 1.0
     * @async
     * @param {number} [lines=1000] - Lines to receive
     * @param {number} [reverse=0] - Invert Output
     * @param {number} [instance=0] - Instance or Virtual Server Log
     * @param {number} [begin_pos=0] - Begin at Position
     * @returns {Promise.<object>}
     */
    logView(lines?: number, reverse?: number, instance?: number, begin_pos?: number): Promise<any>;
    /**
     * Writes a custom entry into the servers log.
     * Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log.
     * The loglevel parameter specifies the type of the entry
     * @version 1.0
     * @async
     * @param {number} loglevel - Level 1 to 4
     * @param {string} logmsg - Message to log
     * @returns {Promise.<object>}
     */
    logAdd(loglevel: number, logmsg: string): Promise<any>;
    /**
     * Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.
     * @version 1.0
     * @async
     * @param {string} msg - Message which will be sent to all instances
     * @returns {Promise.<object>}
     */
    gm(msg: string): Promise<any>;
    /**
     * Displays a list of client database IDs matching a given pattern.
     * You can either search for a clients last known nickname or his unique identity by using the -uid option.
     * @version 1.0
     * @async
     * @param {string} pattern - The Pattern which should be searched for
     * @param {boolean} isUid - True when instead of the Name it should be searched for a uid
     * @returns {Promise.<object>}
     */
    clientDBFind(pattern: string, isUid: boolean): Promise<any>;
    /**
     * Changes a clients settings using given properties.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be edited
     * @param {object} [properties={}] - The Properties which should be modified
     * @returns {Promise.<object>}
     */
    clientDBEdit(cldbid: string, properties?: any): Promise<any>;
    /**
     * Deletes a clients properties from the database.
     * @version 1.0
     * @async
     * @param {string} cldbid - The Client Database ID which should be edited
     * @returns {Promise.<object>}
     */
    clientDBDelete(cldbid: string): Promise<any>;
    /**
     * Displays a list of virtual servers including their ID, status, number of clients online, etc.
     * @version 1.0
     * @async
     * @returns {Promise.<TeamSpeakServer[]>}
     */
    serverList(): Promise<TeamSpeakServer[]>;
    /**
     * Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise.<TeamSpeakChannelGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
     */
    channelGroupList(filter: any): Promise<TeamSpeakChannelGroup[]>;
    /**
     * Displays a list of server groups available.
     * Depending on your permissions, the output may also contain global ServerQuery groups and template groups.
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise.<TeamSpeakServerGroup[]>} Promise object which returns an Array of TeamSpeak Server Groups
     */
    serverGroupList(filter: any): Promise<TeamSpeakServerGroup[]>;
    /**
     * Lists all Channels with a given Filter
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise<TeamSpeakChannel[]>} Promise object which returns an Array of TeamSpeak Channels
     */
    channelList(filter: any): Promise<TeamSpeakChannel[]>;
    /**
     * Lists all Clients with a given Filter
     * @version 1.0
     * @async
     * @param {object} filter - Filter Object
     * @returns {Promise<TeamSpeakClient[]>} Promise object which returns an Array of TeamSpeak Clients
     */
    clientList(filter: any): Promise<TeamSpeakClient[]>;
    /**
     * Displays a list of files and directories stored in the specified channels file repository.
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} [path="/"] - the path to list
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftGetFileList(cid: number, path?: string, cpw?: string): Promise<any>;
    /**
     * Displays detailed information about one or more specified files stored in a channels file repository.
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} name - the filepath to receive
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftGetFileInfo(cid: number, name: string, cpw?: string): Promise<any>;
    /**
     * Stops the running file transfer with server-side ID serverftfid.
     * @version 1.6
     * @async
     * @param {number} serverftfid - Server File Transfer ID
     * @param {number} [del=1] - <Description Pending>
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftStop(serverftfid: number, del?: number): Promise<any>;
    /**
     * Deletes one or more files stored in a channels file repository
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} name - path to the file to delete
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftDeleteFile(cid: number, name: string, cpw?: string): Promise<any>;
    /**
     * Creates new directory in a channels file repository
     * @version 1.6
     * @async
     * @param {number} cid - the channel id to check for
     * @param {string} dirname - path to the directory
     * @param {string} [cpw] - the channel password
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftCreateDir(cid: number, dirname: string, cpw?: string): Promise<any>;
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
     * @returns {Promise.<object>} Promise object which returns an Array of Files
     */
    ftRenameFile(cid: number, oldname: string, newname: string, tcid?: string, cpw?: string, tcpw?: string): Promise<any>;
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
     * @returns {Promise.<object>}
     */
    ftInitUpload(transfer: {
        clientftfid?: any;
        name: string;
        size: number;
        cid?: number;
        cpw?: string;
        overwrite?: number;
        resume?: number;
    }): Promise<any>;
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
     * @returns {Promise.<object>}
     */
    ftInitDownload(transfer: {
        name: string;
        clientftfid?: number;
        cid?: number;
        cpw?: string;
        seekpos?: number;
    }): Promise<any>;
    /**
     * Uploads a file
     * @version 1.0
     * @async
     * @param {string} path - the path whith the filename where the file should be uploaded to
     * @param {string|Buffer} data - The data to upload
     * @param {number} [cid=0] - Channel ID to upload to
     * @param {string} [cpw] - Channel Password of the Channel which will be uploaded to
     * @returns {Promise.<object>}
     */
    uploadFile(path: string, data: string | Buffer, cid?: number, cpw?: string): Promise<any>;
    /**
     * Returns the file in the channel with the given path
     * @version 1.0
     * @async
     * @param {string} path - the path whith the filename where the file should be uploaded to
     * @param {number} [cid=0] - Channel ID to download from
     * @param {string} [cpw] - Channel Password of the Channel which will be uploaded to
     * @returns {Promise.<object>}
     */
    downloadFile(path: string, cid?: number, cpw?: string): Promise<any>;
    /**
     * Returns an Icon with the given Name
     * @version 1.0
     * @async
     * @param {string} name - The Name of the Icon to retrieve eg "icon_262672952"
     * @returns {Promise.<object>}
     */
    downloadIcon(name: string): Promise<any>;
    /**
     * Gets the Icon Name of a resolveable Perm List
     * @version 1.0
     * @async
     * @param {Promise} permlist expects a promise which resolves to a permission list
     * @returns {Promise.<object>}
     */
    getIconName(permlist: Promise): Promise<any>;
    /**
     * Closes the ServerQuery connection to the TeamSpeak 3 Server instance.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    quit(): Promise<any>;
    /**
     * Filters an Object with given Option
     * @version 1.0
     * @static
     * @async
     * @param {any[]} array - The Object which should get filtered
     * @param {object} filter - Filter Object
     * @returns {Promise.<object[]>}
     */
    static filter(array: any[], filter: any): Promise<any[]>;
    /**
     * Transforms an Input to an Array
     * @static
     * @async
     * @version 1.0
     * @param {any} input input data which should be converted to an array
     * @returns {Promise.<any[]>}
     */
    static toArray(input: any): Promise<any[]>;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    addListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    on(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    once(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependOnceListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    removeListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    off(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @returns {ThisType}
     */
    removeAllListeners(event: string | symbol): ThisType;
    /**
     *
     * @param {number} n
     * @returns {ThisType}
     */
    setMaxListeners(n: number): ThisType;
    /**
     *
     * @returns {number}
     */
    getMaxListeners(): number;
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    listeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    rawListeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     *
     * @returns {string[]|symbol[]}
     */
    eventNames(): string[] | symbol[];
    /**
     *
     * @param {string|symbol} type
     * @returns {number}
     */
    listenerCount(type: string | symbol): number;
}

/**
 * Abstract Class
 * @extends EventEmitter
 */
declare class Abstract extends EventEmitter {
    constructor(parent: TeamSpeak3, props: any, namespace: string);
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    addListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    on(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    once(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependOnceListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    removeListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    off(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @returns {ThisType}
     */
    removeAllListeners(event: string | symbol): ThisType;
    /**
     *
     * @param {number} n
     * @returns {ThisType}
     */
    setMaxListeners(n: number): ThisType;
    /**
     *
     * @returns {number}
     */
    getMaxListeners(): number;
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    listeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    rawListeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     *
     * @returns {string[]|symbol[]}
     */
    eventNames(): string[] | symbol[];
    /**
     *
     * @param {string|symbol} type
     * @returns {number}
     */
    listenerCount(type: string | symbol): number;
}

/**
 * the response of the channellist command for a single channel
 * @typedef {object} ChannelListResponse
 * @param {number} id the current id of the channel
 * @param {...any} [any]
 */
declare type ChannelListResponse = any;

/**
 * Class representing a TeamSpeak Channel
 * @extends Abstract
 */
declare class TeamSpeakChannel extends Abstract {
    constructor(parent: TeamSpeak3, list: ChannelListResponse);
    /**
     * Returns the ID of the Channel
     * @returns {number} Returns the Channels ID
     */
    getID(): number;
    /**
     * Displays detailed configuration information about a channel including ID, topic, description, etc.
     * @version 1.0
     * @async
     * @return {Promise.<object>}
     */
    getInfo(): Promise<any>;
    /**
     * Moves a channel to a new parent channel with the ID cpid.
     * If order is specified, the channel will be sorted right under the channel with the specified ID.
     * If order is set to 0, the channel will be sorted right below the new parent.
     * @version 1.0
     * @async
     * @param {number} cpid - Channel Parent ID
     * @param {number} [order=0] - Channel Sort Order
     * @return {Promise.<object>}
     */
    move(cpid: number, order?: number): Promise<any>;
    /**
     * Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.
     * @version 1.0
     * @async
     * @param {number} force - If set to 1 the Channel will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    del(force: number): Promise<any>;
    /**
     * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
     * @version 1.0
     * @async
     * @param {object} properties - The Properties of the Channel which should get changed
     * @return {Promise.<object>}
     */
    edit(properties: any): Promise<any>;
    /**
     * Displays a list of permissions defined for a channel.
     * @version 1.0
     * @async
     * @param {boolean} [permsid=false] - Whether the Perm SID should be displayed aswell
     * @return {Promise.<object[]>}
     */
    permList(permsid?: boolean): Promise<any[]>;
    /**
     * Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - The Value which should be set
     * @return {Promise.<object>}
     */
    setPerm(perm: string | number, value: number): Promise<any>;
    /**
     * Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    delPerm(perm: string | number): Promise<any>;
    /**
     * Gets a List of Clients in the current Channel
     * @version 1.0
     * @async
     * @param {object} filter - The Filter Object
     * @return {Promise.<object>}
     */
    getClients(filter: any): Promise<any>;
    /**
     * Returns a Buffer with the Icon of the Channel
     * @version 1.0
     * @async
     * @returns {Promise.<Buffer>} Promise with the binary data of the Channel Icon
     */
    getIcon(): Promise<Buffer>;
    /**
     * Gets the Icon Name of the Channel
     * @version 1.0
     * @async
     * @returns {Promise.<string>}
     */
    getIconName(): Promise<string>;
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
}

/**
 * the response of the channelgrouplist command for a single channelgroup
 * @typedef {object} ChannelGroupListResponse
 * @param {number} cgid the current id of the channelgroup
 * @param {...any} [any]
 */
declare type ChannelGroupListResponse = any;

/**
 * Class representing a TeamSpeak ChannelGroup
 * @extends Abstract
 */
declare class TeamSpeakChannelGroup extends Abstract {
    constructor(parent: TeamSpeak3, list: ChannelGroupListResponse);
    /**
     * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
     * @return {Promise.<object>}
     */
    del(force?: number): Promise<any>;
    /**
     * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
     * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
     * If a target group is set, the name parameter will be ignored.
     * @version 1.0
     * @async
     * @param {number} [tcgid=0] - The Target Group, 0 to create a new Group
     * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
     * @param {string|boolean} [name=false] - Name of the Group
     * @return {Promise.<object>}
     */
    copy(tcgid?: number, type?: number, name?: string | boolean): Promise<any>;
    /**
     * Changes the name of the channel group
     * @version 1.0
     * @async
     * @param {string} name - Name of the Group
     * @return {Promise.<object>}
     */
    rename(name: string): Promise<any>;
    /**
     * Displays a list of permissions assigned to the channel group specified with cgid.
     * @version 1.0
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object[]>}
     */
    permList(permsid?: boolean): Promise<any[]>;
    /**
     * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise.<object>}
     */
    addPerm(perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    delPerm(perm: string | number): Promise<any>;
    /**
     * Sets the channel group of a client
     * @version 1.0
     * @async
     * @param {number} cid - The Channel in which the Client should be assigned the Group
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @return {Promise.<object>}
     */
    setClient(cid: number, cldbid: number): Promise<any>;
    /**
     * Displays the IDs of all clients currently residing in the channel group.
     * @version 1.0
     * @async
     * @param {number} [cid] - The Channel ID
     * @return {Promise.<object>}
     */
    clientList(cid?: number): Promise<any>;
    /**
     * Returns a Buffer with the Icon of the Channel Group
     * @version 1.0
     * @async
     * @returns {Promise.<Buffer>} Promise with the binary data of the ChannelGroup Icon
     */
    getIcon(): Promise<Buffer>;
    /**
     * Gets the Icon Name of the Channel Group
     * @version 1.0
     * @async
     * @return {Promise.<string>}
     */
    getIconName(): Promise<string>;
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
}

/**
 * the response of the clientlist command for a single client
 * @typedef {object} ClientListResponse
 * @param {number} clid the client id
 * @param {number} client_database_id the client database id
 * @param {number} client_type the client type (0 = client, 1 = query)
 * @param {string} client_unique_identifier the client unique id
 * @param {...any} [any]
 */
declare type ClientListResponse = any;

/**
 * Class representing a TeamSpeak Client
 * @extends Abstract
 */
declare class TeamSpeakClient extends Abstract {
    constructor(parent: TeamSpeak3, list: ClientListResponse);
    /**
     * Returns the Database ID of the Client
     * @version 1.0
     * @returns {number} Returns the Clients Database ID
     */
    getDBID(): number;
    /**
     * Returns the Client ID
     * @version 1.0
     * @returns {number} Returns the Client ID
     */
    getID(): number;
    /**
     * Returns the Client Unique ID
     * @version 1.0
     * @returns {string} Returns the Client UniqueID
     */
    getUID(): string;
    /**
     * Evaluates if the Client is a Query Client or a normal Client
     * @version 1.0
     * @returns {boolean} true when the Client is a Server Query Client
     */
    isQuery(): boolean;
    /**
     * Retrieves a displayable Client Link for the TeamSpeak Chat
     * @version 1.0
     * @returns {string} returns the TeamSpeak Client URL as Link
     */
    getURL(): string;
    /**
     * Returns General Info of the Client, requires the Client to be online
     * @version 1.0
     * @async
     * @returns {Promise.<object>} Promise with the Client Information
     */
    getInfo(): Promise<any>;
    /**
     * Returns the Clients Database Info
     * @version 1.0
     * @async
     * @returns {Promise.<object>} Returns the Client Database Info
     */
    getDBInfo(): Promise<any>;
    /**
     * Displays a list of custom properties for the client
     * @version 1.3
     * @async
     * @returns {Promise.<object>}
     */
    customInfo(): Promise<any>;
    /**
     * Removes a custom property from the client
     * This requires TeamSpeak Server Version 3.2.0 or newer.
     * @version 1.3
     * @async
     * @param {string} ident - The Key which should be deleted
     * @returns {Promise.<object>}
     */
    customDelete(ident: string): Promise<any>;
    /**
     * Creates or updates a custom property for the client.
     * Ident and value can be any value, and are the key value pair of the custom property.
     * This requires TeamSpeak Server Version 3.2.0 or newer.
     * @version 1.3
     * @async
     * @param {string} ident - The Key which should be set
     * @param {string} value - The Value which should be set
     * @returns {Promise.<object>}
     */
    customSet(ident: string, value: string): Promise<any>;
    /**
     * Kicks the Client from the Server
     * @version 1.0
     * @async
     * @param {string} msg - The Message the Client should receive when getting kicked
     * @returns {Promise.<object>} Promise Object
     */
    kickFromServer(msg: string): Promise<any>;
    /**
     * Kicks the Client from their currently joined Channel
     * @version 1.0
     * @async
     * @param {string} msg - The Message the Client should receive when getting kicked (max 40 Chars)
     * @returns {Promise.<object>} Promise Object
     */
    kickFromChannel(msg: string): Promise<any>;
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
    banAdd(ip?: string, name?: string, uid?: string, time: number, banreason: string): Promise<any>;
    /**
     * creates a new ban with the clients uid
     * @version 1.9
     * @async
     * @param {string} [banreason] - reason message
     * @param {number} [time] - the time in seconds a client should be banned, leave empty if it should result in a permanent ban
     * @returns {Promise.<object>} Promise Object
     */
    ban(banreason?: string, time?: number): Promise<any>;
    /**
     * Moves the Client to a different Channel
     * @version 1.0
     * @async
     * @param {number} cid - Channel ID in which the Client should get moved
     * @param {string} [cpw=""] - The Channel Password
     * @returns {Promise.<object>} Promise Object
     */
    move(cid: number, cpw?: string): Promise<any>;
    /**
     * Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.
     * @version 1.0
     * @async
     * @param {number} sgid - The Server Group ID which the Client should be added to
     * @returns {Promise.<object>} Promise Object
     */
    serverGroupAdd(sgid: number): Promise<any>;
    /**
     * Removes the client from the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {number} sgid - The Server Group ID which the Client should be removed from
     * @returns {Promise.<object>} Promise Object
     */
    serverGroupDel(sgid: number): Promise<any>;
    /**
     * Pokes the Client with a certain message
     * @version 1.0
     * @async
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    poke(msg: string): Promise<any>;
    /**
     * Sends a textmessage to the Client
     * @version 1.0
     * @async
     * @param {string} msg - The message the Client should receive
     * @returns {Promise.<object>} Promise Object
     */
    message(msg: string): Promise<any>;
    /**
     * Displays a list of permissions defined for a client
     * @version 1.0
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise.<object>}
     */
    permList(permsid?: boolean): Promise<any>;
    /**
     * Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise.<object>}
     */
    addPerm(perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @return {Promise.<object>}
     */
    delPerm(perm: string | number): Promise<any>;
    /**
     * Returns a Buffer with the Avatar of the User
     * @version 1.0
     * @async
     * @returns {Promise.<object>} Promise with the binary data of the avatar
     */
    getAvatar(): Promise<any>;
    /**
     * Returns a Buffer with the Icon of the Client
     * @version 1.0
     * @async
     * @returns {Promise.<object>} Promise with the binary data of the Client Icon
     */
    getIcon(): Promise<any>;
    /**
     * Gets the Avatar Name of the Client
     * @version 1.0
     * @async
     * @returns {Promise.<string>} Avatar Name
     */
    getAvatarName(): Promise<string>;
    /**
     * Gets the Icon Name of the Client
     * @version 1.0
     * @async
     * @returns {Promise.<string>}
     */
    getIconName(): Promise<string>;
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
}

/**
 * the response of the serverlist command for a single virtual server
 * @typedef {object} ServerListResponse
 * @param {number} virtualserver_id the current id of the virtual server
 * @param {...any} [any]
 */
declare type ServerListResponse = any;

/**
 * Class representing a TeamSpeak Server
 * @extends Abstract
 */
declare class TeamSpeakServer extends Abstract {
    constructor(parent: TeamSpeak3, list: ServerListResponse);
    /**
     * Selects the Virtual Server
     * @version 1.0
     * @param {string} [client_nickname] - Set Nickname when selecting a server
     * @returns {Promise.<object>}
     */
    use(client_nickname?: string): Promise<any>;
    /**
     * Gets basic Infos about the Server
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    getInfo(): Promise<any>;
    /**
     * Deletes the Server.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    del(): Promise<any>;
    /**
     * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    start(): Promise<any>;
    /**
     * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0
     * @async
     * @param {string} [msg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
     * @returns {Promise.<object>}
     */
    stop(msg?: string): Promise<any>;
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
}

/**
 * the response of the servergrouplist command for a single servergroup
 * @typedef {object} ServerGroupListResponse
 * @param {number} sgid the current id of the servergroup
 * @param {...any} [any]
 */
declare type ServerGroupListResponse = any;

/**
 * Class representing a TeamSpeak ServerGroup
 * @extends Abstract
 */
declare class TeamSpeakServerGroup extends Abstract {
    constructor(parent: TeamSpeak3, list: ServerGroupListResponse);
    /**
     * Returns the Server Group ID
     * @version 1.0
     * @return {number}
     */
    getSGID(): number;
    /**
     * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
     * @version 1.0
     * @async
     * @param {number} force - If set to 1 the ServerGroup will be deleted even when Clients are in it
     * @returns {Promise.<object>}
     */
    del(force: number): Promise<any>;
    /**
     * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
     * @version 1.0
     * @async
     * @param {number} [tsgid=0] - The Target Group, 0 to create a new Group
     * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
     * @param {string|boolean} [name=false] - Name of the Group
     * @returns {Promise.<object>}
     */
    copy(tsgid?: number, type?: number, name?: string | boolean): Promise<any>;
    /**
     * Changes the name of the server group
     * @version 1.0
     * @async
     * @param {string} name - Name of the Group
     * @returns {Promise.<object>}
     */
    rename(name: string): Promise<any>;
    /**
     * Displays a list of permissions assigned to the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @returns {Promise.<object>}
     */
    permList(permsid?: boolean): Promise<any>;
    /**
     * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @returns {Promise.<object>}
     */
    addPerm(perm: string | number, value: number, skip?: number, negate?: number): Promise<any>;
    /**
     * Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.
     * @version 1.0
     * @async
     * @param {string|number} perm - The permid or permsid
     * @returns {Promise.<object>}
     */
    delPerm(perm: string | number): Promise<any>;
    /**
     * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
     * @version 1.0
     * @async
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @returns {Promise.<object>}
     */
    addClient(cldbid: number): Promise<any>;
    /**
     * Removes a client specified with cldbid from the server group.
     * @version 1.0
     * @async
     * @param {number} cldbid - The Client Database ID which should be removed from the Group
     * @returns {Promise.<object>}
     */
    delClient(cldbid: number): Promise<any>;
    /**
     * Displays the IDs of all clients currently residing in the server group.
     * @version 1.0
     * @async
     * @returns {Promise.<object>}
     */
    clientList(): Promise<any>;
    /**
     * Returns a Buffer with the Icon of the Server Group
     * @version 1.0
     * @async
     * @returns {Promise.<Buffer>} Promise with the binary data of the ServerGroup Icon
     */
    getIcon(): Promise<Buffer>;
    /**
     * Gets the Icon Name of the Server Group
     * @version 1.0
     * @async
     * @returns {Promise.<string>}
     */
    getIconName(): Promise<string>;
    /**
     * retrieves the namespace of this class
     * @returns {string} the current namespace
     */
    getNameSpace(): string;
    /**
     * returns JSONifyable data
     */
    toJSON(): void;
    /**
     * retrieves a single property value by the given name
     * @param {string} name the name from where the value should be retrieved
     */
    getPropertyByName(name: string): void;
    /**
     * translates a TeamSpeak property key to a JavaScript conform name
     * @param {string} name the name which will get converted
     * @returns {string} returns the JavaScript conform name
     * @example
     *  //given that the abstract is extending a TeamSpeakClient
     *  client.translatePropName("client_nickname") //returns "nickname"
     *  client.translatePropName("client_is_talker") //returns "isTalker"
     *  client.translatePropName("client_channel_group_id") //returns "channelGroupId"
     */
    translatePropName(name: string): string;
    /**
     * Safely unsubscribes from all Events
     * @version 1.0
     */
    destruct(): void;
    /**
     * Returns the data from the last List Command
     * @version 1.0
     * @return {object}
     */
    getCache(): any;
    /**
     * Sets the Data from the Last List Command
     * @param {object} info a object with new key values from the list command
     * @version 1.0
     */
    updateCache(info: any): void;
    /**
     * Returns the Parent Class
     * @version 1.0
     * @returns {TeamSpeak3} the teamspeak instance
     */
    getParent(): TeamSpeak3;
}

/**
 * TeamSpeak Query Command Class
 */
declare class Command {
    constructor();
    /**
     * Initializes the Respone with default values
     * @version 1.8
     * @returns {this}
     */
    reset(): this;
    /**
     * Sets the main command to send
     * @version 1.0
     * @param {string} cmd - Sets the command which will be sent to the TeamSpeak Query
     * @returns {this}
     */
    setCommand(cmd: string): this;
    /**
     * Sets the TeamSpeak Key Value Pairs
     * @version 1.0
     * @param {object} opts - Sets the Object with the key value pairs which should get sent to the TeamSpeak Query
     * @returns {this}
     */
    setOptions(opts: any): this;
    /**
     * Sets the TeamSpeak Key Value Pairs
     * @version 1.11
     * @param {array} opts - Sets the Object with the key value pairs which should get sent to the TeamSpeak Query
     * @returns {this}
     */
    setMultiOptions(opts: array): this;
    /**
     * Checks wether there are options used with this command
     * @version 1.7
     * @returns {boolean}
     */
    hasOptions(): boolean;
    /**
     * Checks wether there are options used with this command
     * @version 1.11
     * @returns {boolean}
     */
    hasMultiOptions(): boolean;
    /**
     * Set TeamSpeak Flags
     * @version 1.0
     * @param {object} flags - Sets the Flags which should get sent to the TeamSpeak Query
     * @returns {this}
     */
    setFlags(flags: any): this;
    /**
     * Checks wether there are flags used with this command
     * @version 1.7
     * @returns {boolean}
     */
    hasFlags(): boolean;
    /**
     * Set the Line which has been received from the TeamSpeak Query
     * @version 1.0
     * @param {string} line - The Line which has been received from the TeamSpeak Query
     * @returns {this}
     */
    setResponse(line: string): this;
    /**
     * Set the error line which has been received from the TeamSpeak Query
     * @version 1.0
     * @param {string} error - The error Line which has been received from the TeamSpeak Query
     * @returns {this}
     */
    setError(error: string): this;
    /**
     * Get the Parsed Error Object which has been received from the TeamSpeak Query
     * @version 1.0
     * @return {object} Returns the Parsed Error Object
     */
    getError(): any;
    /**
     * Checks if a error has been received
     * @version 1.0
     * @return {boolean} Returns true when a error has been received
     */
    hasError(): boolean;
    /**
     * Get the Parsed Response Object which has been received from the TeamSpeak Query
     * @version 1.0
     * @return {object} Returns the Parsed Response Object
     */
    getResponse(): any;
    /**
     * Parses a Query Response
     * @version 1.0
     * @static
     * @param {string} data - The Line which has been received
     * @return {object} Returns the parsed Data
     */
    static parse(data: string): any;
    /**
     * Checks if a error has been received
     * @version 1.0
     * @return {string} The parsed String which is readable by the TeamSpeak Query
     */
    build(): string;
    /**
     * Parses a value to the type which the key represents
     * @version 1.0
     * @static
     * @param {string} k - The Key which should get looked up
     * @param {string} v - The value which should get parsed
     * @return {any} Returns the parsed Data
     */
    static parseValue(k: string, v: string): any;
    /**
     * unescapes a string
     * @static
     * @param {string} str the string to escape
     * @returns {string} the unescaped string
     */
    static unescape(str: string): string;
    /**
     * escapes a string
     * @static
     * @param {string} str the string to escape
     * @returns {string} the escaped string
     */
    static escape(str: string): string;
}

/**
 * Class representing a File Transfer
 * @class
 */
declare class FileTransfer {
    constructor(host: string, port?: number, timeout?: number);
    /**
     * Starts the download of a File
     * @param {string} ftkey - The Filetransfer Key
     * @param {number} size - The Data Length
     * @version 1.0
     * @returns {Promise<Buffer>} Returns a buffer with the binary data
     */
    download(ftkey: string, size: number): Promise<Buffer>;
    /**
     * Starts the upload of a File
     * @param {string} ftkey - the Filetransfer Key
     * @param {string|Buffer} data - the data to send
     * @version 1.6
     * @returns {Promise}
     */
    upload(ftkey: string, data: string | Buffer): Promise;
}

/**
 * TS3 Query Connection
 * @extends EventEmitter
 */
declare class TS3Query extends EventEmitter {
    constructor(config: ConnectionParams);
    /**
     * Handles any TeamSpeak Query Response Line
     *
     * @version 1.8
     * @param {string} line - error line from teamspeak
     */
    handleLine(line: string): void;
    /**
     * Handles the error line which finnishes a command
     *
     * @version 1.8
     * @param {string} line - error line from teamspeak
     */
    handleQueryError(line: string): void;
    /**
     * Handles an event which has been received from the TeamSpeak Server
     *
     * @version 1.8
     * @param {string} line - event line from TeamSpeak
     */
    handleQueryEvent(line: string): void;
    /**
     * Emits an Error which the given arguments
     *
     * @version 1.8
     * @param {...any} args arguments which gets passed to the error event
     */
    handleError(...args: any[]): void;
    /**
     * Sends keepalive to the TeamSpeak Server so the connection will not be closed
     * @version 1.0
     */
    keepAlive(): void;
    /**
     * Whether Double Events should be handled or not
     * @version 1.0
     * @param {boolean} [b=true] - Parameter enables or disables the Double Event Handling
     */
    handleDoubleEvents(b?: boolean): void;
    /**
     * Sends a command to the TeamSpeak Server.
     * @version 1.0
     * @async
     * @param {...any} args parameters which should get executed
     * @returns {Promise.<object>} Promise object which returns the Information about the Query executed
     */
    execute(...args: any[]): Promise<any>;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    addListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {function} listener
     * @returns {ThisType}
     */
    on(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    once(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    prependOnceListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    removeListener(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @param {Function} listener
     * @returns {ThisType}
     */
    off(event: string | symbol, listener: (...params: any[]) => any): ThisType;
    /**
     *
     * @param {string|symbol} event
     * @returns {ThisType}
     */
    removeAllListeners(event: string | symbol): ThisType;
    /**
     *
     * @param {number} n
     * @returns {ThisType}
     */
    setMaxListeners(n: number): ThisType;
    /**
     *
     * @returns {number}
     */
    getMaxListeners(): number;
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    listeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @returns {Function[]}
     */
    rawListeners(event: string | symbol): ((...params: any[]) => any)[];
    /**
     *
     * @param {string|symbol} event
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     *
     * @returns {string[]|symbol[]}
     */
    eventNames(): string[] | symbol[];
    /**
     *
     * @param {string|symbol} type
     * @returns {number}
     */
    listenerCount(type: string | symbol): number;
}

