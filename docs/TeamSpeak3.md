<a name="TeamSpeak3"></a>

## TeamSpeak3
Main TeamSpeak Query Class

**Kind**: global class  

* [TeamSpeak3](#TeamSpeak3)
    * [new TeamSpeak3([config])](#new_TeamSpeak3_new)
    * [.execute(Command, [Object], [Array])](#TeamSpeak3+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientUpdate(properties)](#TeamSpeak3+clientUpdate) ⇒ <code>Promise</code>
    * [.registerEvent(event, [id])](#TeamSpeak3+registerEvent) ⇒ <code>Promise</code>
    * [.login(username, password)](#TeamSpeak3+login) ⇒ <code>Promise</code>
    * [.logout()](#TeamSpeak3+logout) ⇒ <code>Promise</code>
    * [.version()](#TeamSpeak3+version) ⇒ <code>Promise</code>
    * [.hostInfo()](#TeamSpeak3+hostInfo) ⇒ <code>Promise</code>
    * [.instanceInfo()](#TeamSpeak3+instanceInfo) ⇒ <code>Promise</code>
    * [.instanceEdit(properties)](#TeamSpeak3+instanceEdit) ⇒ <code>Promise</code>
    * [.bindingList()](#TeamSpeak3+bindingList) ⇒ <code>Promise</code>
    * [.useByPort(port)](#TeamSpeak3+useByPort) ⇒ <code>Promise</code>
    * [.useBySid(sid)](#TeamSpeak3+useBySid) ⇒ <code>Promise</code>
    * [.whoami()](#TeamSpeak3+whoami) ⇒ <code>Promise</code>
    * [.serverInfo()](#TeamSpeak3+serverInfo) ⇒ <code>Promise</code>
    * [.serverIdGetByPort(port)](#TeamSpeak3+serverIdGetByPort) ⇒ <code>Promise</code>
    * [.serverEdit(properties)](#TeamSpeak3+serverEdit) ⇒ <code>Promise</code>
    * [.serverProcessStop()](#TeamSpeak3+serverProcessStop) ⇒ <code>Promise</code>
    * [.connectionInfo()](#TeamSpeak3+connectionInfo) ⇒ <code>Promise</code>
    * [.serverCreate(properties)](#TeamSpeak3+serverCreate) ⇒ <code>Promise</code>
    * [.channelCreate(name, [type])](#TeamSpeak3+channelCreate) ⇒ <code>Promise</code>
    * [.serverGroupCreate(name, [type])](#TeamSpeak3+serverGroupCreate) ⇒ <code>Promise</code>
    * [.channelGroupCreate(name, [type])](#TeamSpeak3+channelGroupCreate) ⇒ <code>Promise</code>
    * [.getChannelByID(cid)](#TeamSpeak3+getChannelByID) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getChannelByName(name)](#TeamSpeak3+getChannelByName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClientByID(clid)](#TeamSpeak3+getClientByID) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClientByDBID(cldbid)](#TeamSpeak3+getClientByDBID) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClientByUID(uid)](#TeamSpeak3+getClientByUID) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClientByName(name)](#TeamSpeak3+getClientByName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permissionList()](#TeamSpeak3+permissionList) ⇒ <code>Promise</code>
    * [.permIdGetByName(permsid)](#TeamSpeak3+permIdGetByName) ⇒ <code>Promise</code>
    * [.permGet(key)](#TeamSpeak3+permGet) ⇒ <code>Promise</code>
    * [.permFind(perm)](#TeamSpeak3+permFind) ⇒ <code>Promise</code>
    * [.permReset()](#TeamSpeak3+permReset) ⇒ <code>Promise</code>
    * [.privilegekeyList()](#TeamSpeak3+privilegekeyList) ⇒ <code>Promise</code>
    * [.privilegekeyAdd(type, group, [cid], [description])](#TeamSpeak3+privilegekeyAdd) ⇒ <code>Promise</code>
    * [.privilegekeyDelete(token)](#TeamSpeak3+privilegekeyDelete) ⇒ <code>Promise</code>
    * [.privilegekeyUse(token)](#TeamSpeak3+privilegekeyUse) ⇒ <code>Promise</code>
    * [.messageList()](#TeamSpeak3+messageList) ⇒ <code>Promise</code>
    * [.messageAdd(uid, subject, text)](#TeamSpeak3+messageAdd) ⇒ <code>Promise</code>
    * [.messageDel(id)](#TeamSpeak3+messageDel) ⇒ <code>Promise</code>
    * [.messageGet(id)](#TeamSpeak3+messageGet) ⇒ <code>Promise</code>
    * [.messageUpdate(id, read)](#TeamSpeak3+messageUpdate) ⇒ <code>Promise</code>
    * [.complainList([dbid])](#TeamSpeak3+complainList) ⇒ <code>Promise</code>
    * [.complainAdd(dbid, [message])](#TeamSpeak3+complainAdd) ⇒ <code>Promise</code>
    * [.complainDel(tcldbid, fcldbid)](#TeamSpeak3+complainDel) ⇒ <code>Promise</code>
    * [.banList()](#TeamSpeak3+banList) ⇒ <code>Promise</code>
    * [.banAdd(ip, name, uid, time, reason)](#TeamSpeak3+banAdd) ⇒ <code>Promise</code>
    * [.banDel([id])](#TeamSpeak3+banDel) ⇒ <code>Promise</code>
    * [.logView([lines], [reverse], [instance], [begin_pos])](#TeamSpeak3+logView) ⇒ <code>Promise</code>
    * [.logAdd(level, msg)](#TeamSpeak3+logAdd) ⇒ <code>Promise</code>
    * [.gm(msg)](#TeamSpeak3+gm) ⇒ <code>Promise</code>
    * [.serverList()](#TeamSpeak3+serverList) ⇒ <code>Promise</code>
    * [.channelGroupList(filter)](#TeamSpeak3+channelGroupList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupList(filter)](#TeamSpeak3+serverGroupList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelList(filter)](#TeamSpeak3+channelList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientList(filter)](#TeamSpeak3+clientList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.quit()](#TeamSpeak3+quit) ⇒ <code>Promise</code>

<a name="new_TeamSpeak3_new"></a>

### new TeamSpeak3([config])
Represents a TeamSpeak Server Instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>object</code> |  | The Configuration Object |
| [config.host] | <code>string</code> | <code>&quot;&#x27;127.0.0.1&#x27;&quot;</code> | The Host on which the TeamSpeak Server runs |
| [config.queryport] | <code>number</code> | <code>10011</code> | The Queryport on which the TeamSpeak Server runs |
| [config.serverport] | <code>number</code> | <code>9987</code> | The Serverport on which the TeamSpeak Instance runs |
| [config.username] | <code>string</code> |  | The username to authenticate with the TeamSpeak Server |
| [config.password] | <code>string</code> |  | The password to authenticate with the TeamSpeak Server |
| [config.nickname] | <code>string</code> |  | The Nickname the Client should have |
| [config.antispam] | <code>boolean</code> | <code>false</code> | Whether the AntiSpam should be activated or deactivated |
| [config.antispamtimer] | <code>number</code> | <code>350</code> | The time between every command for the antispam (in ms) |
| [config.keepalive] | <code>boolean</code> | <code>true</code> | Whether the Query should seen a keepalive |
| [config.clientconnect_on_select] | <code>boolean</code> | <code>false</code> | Sends a clientconnect event on every already connected client when server gets switched |

<a name="TeamSpeak3+execute"></a>

### teamSpeak3.execute(Command, [Object], [Array]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |

<a name="TeamSpeak3+clientUpdate"></a>

### teamSpeak3.clientUpdate(properties) ⇒ <code>Promise</code>
Change your ServerQuery clients settings using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>string</code> | The Properties which should be changed |

<a name="TeamSpeak3+registerEvent"></a>

### teamSpeak3.registerEvent(event, [id]) ⇒ <code>Promise</code>
Subscribes to an Event.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The Event on which should be subscribed |
| [id] | <code>number</code> | <code>false</code> | The Channel ID |

<a name="TeamSpeak3+login"></a>

### teamSpeak3.login(username, password) ⇒ <code>Promise</code>
Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The Username which you want to login with |
| password | <code>string</code> | The Password you want to login with |

<a name="TeamSpeak3+logout"></a>

### teamSpeak3.logout() ⇒ <code>Promise</code>
Deselects the active virtual server and logs out from the server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+version"></a>

### teamSpeak3.version() ⇒ <code>Promise</code>
Displays the servers version information including platform and build number.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+hostInfo"></a>

### teamSpeak3.hostInfo() ⇒ <code>Promise</code>
Displays detailed connection information about the server instance including uptime, number of virtual servers online, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceInfo"></a>

### teamSpeak3.instanceInfo() ⇒ <code>Promise</code>
Displays the server instance configuration including database revision number, the file transfer port, default group IDs, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceEdit"></a>

### teamSpeak3.instanceEdit(properties) ⇒ <code>Promise</code>
Changes the server instance configuration using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The stuff you want to change |

<a name="TeamSpeak3+bindingList"></a>

### teamSpeak3.bindingList() ⇒ <code>Promise</code>
Displays a list of IP addresses used by the server instance on multi-homed machines.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+useByPort"></a>

### teamSpeak3.useByPort(port) ⇒ <code>Promise</code>
Selects the virtual server specified with the port to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Port the Server runs on |

<a name="TeamSpeak3+useBySid"></a>

### teamSpeak3.useBySid(sid) ⇒ <code>Promise</code>
Selects the virtual server specified with the sid to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | The Server ID |

<a name="TeamSpeak3+whoami"></a>

### teamSpeak3.whoami() ⇒ <code>Promise</code>
Displays information about your current ServerQuery connection including your loginname, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which provides the Information about the QueryClient  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverInfo"></a>

### teamSpeak3.serverInfo() ⇒ <code>Promise</code>
Displays detailed configuration information about the selected virtual server including unique ID, number of clients online, configuration, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverIdGetByPort"></a>

### teamSpeak3.serverIdGetByPort(port) ⇒ <code>Promise</code>
Displays the database ID of the virtual server running on the UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Server Port where data should be retrieved |

<a name="TeamSpeak3+serverEdit"></a>

### teamSpeak3.serverEdit(properties) ⇒ <code>Promise</code>
Changes the selected virtual servers configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings which should be changed |

<a name="TeamSpeak3+serverProcessStop"></a>

### teamSpeak3.serverProcessStop() ⇒ <code>Promise</code>
Stops the entire TeamSpeak 3 Server instance by shutting down the process.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+connectionInfo"></a>

### teamSpeak3.connectionInfo() ⇒ <code>Promise</code>
Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverCreate"></a>

### teamSpeak3.serverCreate(properties) ⇒ <code>Promise</code>
Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key. If virtualserver_port is not specified, the server will test for the first unused UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings |

<a name="TeamSpeak3+channelCreate"></a>

### teamSpeak3.channelCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new channel using the given properties. Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel |
| [type] | <code>object</code> | <code>{}</code> | Properties of the Channel |

<a name="TeamSpeak3+serverGroupCreate"></a>

### teamSpeak3.serverGroupCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new server group using the name specified with name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Server Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Server Group |

<a name="TeamSpeak3+channelGroupCreate"></a>

### teamSpeak3.channelGroupCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new channel group using a given name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Channel Group |

<a name="TeamSpeak3+getChannelByID"></a>

### teamSpeak3.getChannelByID(cid) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Channel by the given Channel ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | The Channel Id |

<a name="TeamSpeak3+getChannelByName"></a>

### teamSpeak3.getChannelByName(name) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Channel by the given Channel Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>number</code> | The Name of the Channel |

<a name="TeamSpeak3+getClientByID"></a>

### teamSpeak3.getClientByID(clid) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Client by the given Client ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | The Client Id |

<a name="TeamSpeak3+getClientByDBID"></a>

### teamSpeak3.getClientByDBID(cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Client by the given Client Database ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database Id |

<a name="TeamSpeak3+getClientByUID"></a>

### teamSpeak3.getClientByUID(uid) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | The Client Unique Identifier |

<a name="TeamSpeak3+getClientByName"></a>

### teamSpeak3.getClientByName(name) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Nickname of the Client |

<a name="TeamSpeak3+permissionList"></a>

### teamSpeak3.permissionList() ⇒ <code>Promise</code>
Displays a list of permissions available on the server instance including ID, name and description.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+permIdGetByName"></a>

### teamSpeak3.permIdGetByName(permsid) ⇒ <code>Promise</code>
Displays the database ID of one or more permissions specified by permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| permsid | <code>string</code> \| <code>array</code> | One or more Permission Names |

<a name="TeamSpeak3+permGet"></a>

### teamSpeak3.permGet(key) ⇒ <code>Promise</code>
Displays the current value of the permission for your own connection. This can be useful when you need to check your own privileges.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> \| <code>string</code> | Perm ID or Name which should be checked |

<a name="TeamSpeak3+permFind"></a>

### teamSpeak3.permFind(perm) ⇒ <code>Promise</code>
Displays detailed information about all assignments of the permission. The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>number</code> \| <code>string</code> | Perm ID or Name to get |

<a name="TeamSpeak3+permReset"></a>

### teamSpeak3.permReset() ⇒ <code>Promise</code>
Restores the default permission settings on the selected virtual server and creates a new initial administrator token. Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyList"></a>

### teamSpeak3.privilegekeyList() ⇒ <code>Promise</code>
Displays a list of privilege keys available including their type and group IDs.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyAdd"></a>

### teamSpeak3.privilegekeyAdd(type, group, [cid], [description]) ⇒ <code>Promise</code>
Create a new token. If type is set to 0, the ID specified with tokenid will be a server group ID. Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | Token Type |
| group | <code>number</code> | Depends on the Type given, add either a valid Channel Group or Server Group |
| [cid] | <code>number</code> | Depends on the Type given, add a valid Channel ID |
| [description] | <code>string</code> | Token Description |

<a name="TeamSpeak3+privilegekeyDelete"></a>

### teamSpeak3.privilegekeyDelete(token) ⇒ <code>Promise</code>
Deletes an existing token matching the token key specified with token.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be deleted |

<a name="TeamSpeak3+privilegekeyUse"></a>

### teamSpeak3.privilegekeyUse(token) ⇒ <code>Promise</code>
Use a token key gain access to a server or channel group. Please note that the server will automatically delete the token after it has been used.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be used |

<a name="TeamSpeak3+messageList"></a>

### teamSpeak3.messageList() ⇒ <code>Promise</code>
Displays a list of offline messages you've received. The output contains the senders unique identifier, the messages subject, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+messageAdd"></a>

### teamSpeak3.messageAdd(uid, subject, text) ⇒ <code>Promise</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Client Unique Identifier (uid) |
| subject | <code>string</code> | Subject of the message |
| text | <code>string</code> | Message Text |

<a name="TeamSpeak3+messageDel"></a>

### teamSpeak3.messageDel(id) ⇒ <code>Promise</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Message ID which should be deleted |

<a name="TeamSpeak3+messageGet"></a>

### teamSpeak3.messageGet(id) ⇒ <code>Promise</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |

<a name="TeamSpeak3+messageUpdate"></a>

### teamSpeak3.messageUpdate(id, read) ⇒ <code>Promise</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |
| read | <code>number</code> | If flag is set to 1 the message will be marked as read |

<a name="TeamSpeak3+complainList"></a>

### teamSpeak3.complainList([dbid]) ⇒ <code>Promise</code>
Displays a list of complaints on the selected virtual server. If dbid is specified, only complaints about the targeted client will be shown.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [dbid] | <code>number</code> | Filter only for certain Client with the given Database ID |

<a name="TeamSpeak3+complainAdd"></a>

### teamSpeak3.complainAdd(dbid, [message]) ⇒ <code>Promise</code>
Submits a complaint about the client with database ID dbid to the server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| dbid | <code>number</code> | Filter only for certain Client with the given Database ID |
| [message] | <code>string</code> | The Message which should be added |

<a name="TeamSpeak3+complainDel"></a>

### teamSpeak3.complainDel(tcldbid, fcldbid) ⇒ <code>Promise</code>
Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server. If dbid will be left empty all complaints for the tdbid will be deleted

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| tcldbid | <code>number</code> | The Target Client Database ID |
| fcldbid | <code>number</code> | The Client Database ID which filed the Report |

<a name="TeamSpeak3+banList"></a>

### teamSpeak3.banList() ⇒ <code>Promise</code>
Displays a list of active bans on the selected virtual server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+banAdd"></a>

### teamSpeak3.banAdd(ip, name, uid, time, reason) ⇒ <code>Promise</code>
Adds a new ban rule on the selected virtual server. All parameters are optional but at least one of the following must be set: ip, name, or uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | IP Regex |
| name | <code>string</code> | Name Regex |
| uid | <code>string</code> | UID Regex |
| time | <code>number</code> | Bantime in Seconds, if left empty it will result in a permaban |
| reason | <code>string</code> | Ban Reason |

<a name="TeamSpeak3+banDel"></a>

### teamSpeak3.banDel([id]) ⇒ <code>Promise</code>
Removes one or all bans from the server

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> | <code>false</code> | The BanID to remove, if not provided it will remove all bans |

<a name="TeamSpeak3+logView"></a>

### teamSpeak3.logView([lines], [reverse], [instance], [begin_pos]) ⇒ <code>Promise</code>
Displays a specified number of entries from the servers log. If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lines] | <code>number</code> | <code>1000</code> | Lines to receive |
| [reverse] | <code>number</code> | <code>0</code> | Invert Output |
| [instance] | <code>number</code> | <code>0</code> | Instance or Virtual Server Log |
| [begin_pos] | <code>number</code> | <code>0</code> | Begin at Position |

<a name="TeamSpeak3+logAdd"></a>

### teamSpeak3.logAdd(level, msg) ⇒ <code>Promise</code>
Writes a custom entry into the servers log. Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log. The loglevel parameter specifies the type of the entry

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | Level 1 to 4 |
| msg | <code>string</code> | Message to log |

<a name="TeamSpeak3+gm"></a>

### teamSpeak3.gm(msg) ⇒ <code>Promise</code>
Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message which will be sent to all instances |

<a name="TeamSpeak3+serverList"></a>

### teamSpeak3.serverList() ⇒ <code>Promise</code>
Displays a list of virtual servers including their ID, status, number of clients online, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+channelGroupList"></a>

### teamSpeak3.channelGroupList(filter) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+serverGroupList"></a>

### teamSpeak3.serverGroupList(filter) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of server groups available. Depending on your permissions, the output may also contain global ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+channelList"></a>

### teamSpeak3.channelList(filter) ⇒ <code>Promise.&lt;object&gt;</code>
Lists all Channels with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns an Array of TeamSpeak Channels  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+clientList"></a>

### teamSpeak3.clientList(filter) ⇒ <code>Promise.&lt;object&gt;</code>
Lists all Clients with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns an Array of TeamSpeak Clients  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+quit"></a>

### teamSpeak3.quit() ⇒ <code>Promise</code>
Closes the ServerQuery connection to the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3"></a>

## TeamSpeak3
Main TeamSpeak Query Class

**Kind**: global class  

* [TeamSpeak3](#TeamSpeak3)
    * [new TeamSpeak3([config])](#new_TeamSpeak3_new)
    * [.execute(Command, [Object], [Array])](#TeamSpeak3+execute) ⇒ <code>Promise</code>
    * [.clientUpdate(properties)](#TeamSpeak3+clientUpdate) ⇒ <code>Promise</code>
    * [.registerEvent(event, [id])](#TeamSpeak3+registerEvent) ⇒ <code>Promise</code>
    * [.login(username, password)](#TeamSpeak3+login) ⇒ <code>Promise</code>
    * [.logout()](#TeamSpeak3+logout) ⇒ <code>Promise</code>
    * [.version()](#TeamSpeak3+version) ⇒ <code>Promise</code>
    * [.hostInfo()](#TeamSpeak3+hostInfo) ⇒ <code>Promise</code>
    * [.instanceInfo()](#TeamSpeak3+instanceInfo) ⇒ <code>Promise</code>
    * [.instanceEdit(properties)](#TeamSpeak3+instanceEdit) ⇒ <code>Promise</code>
    * [.bindingList()](#TeamSpeak3+bindingList) ⇒ <code>Promise</code>
    * [.useByPort(port)](#TeamSpeak3+useByPort) ⇒ <code>Promise</code>
    * [.useBySid(sid)](#TeamSpeak3+useBySid) ⇒ <code>Promise</code>
    * [.whoami()](#TeamSpeak3+whoami) ⇒ <code>Promise</code>
    * [.serverInfo()](#TeamSpeak3+serverInfo) ⇒ <code>Promise</code>
    * [.serverIdGetByPort(port)](#TeamSpeak3+serverIdGetByPort) ⇒ <code>Promise</code>
    * [.serverEdit(properties)](#TeamSpeak3+serverEdit) ⇒ <code>Promise</code>
    * [.serverProcessStop()](#TeamSpeak3+serverProcessStop) ⇒ <code>Promise</code>
    * [.connectionInfo()](#TeamSpeak3+connectionInfo) ⇒ <code>Promise</code>
    * [.serverCreate(properties)](#TeamSpeak3+serverCreate) ⇒ <code>Promise</code>
    * [.channelCreate(name, [type])](#TeamSpeak3+channelCreate) ⇒ <code>Promise</code>
    * [.serverGroupCreate(name, [type])](#TeamSpeak3+serverGroupCreate) ⇒ <code>Promise</code>
    * [.channelGroupCreate(name, [type])](#TeamSpeak3+channelGroupCreate) ⇒ <code>Promise</code>
    * [.getChannelByID(cid)](#TeamSpeak3+getChannelByID) ⇒ <code>Promise</code>
    * [.getChannelByName(name)](#TeamSpeak3+getChannelByName) ⇒ <code>Promise</code>
    * [.getClientByID(clid)](#TeamSpeak3+getClientByID) ⇒ <code>Promise</code>
    * [.getClientByDBID(cldbid)](#TeamSpeak3+getClientByDBID) ⇒ <code>Promise</code>
    * [.getClientByUID(uid)](#TeamSpeak3+getClientByUID) ⇒ <code>Promise</code>
    * [.getClientByName(name)](#TeamSpeak3+getClientByName) ⇒ <code>Promise</code>
    * [.permissionList()](#TeamSpeak3+permissionList) ⇒ <code>Promise</code>
    * [.permIdGetByName(permsid)](#TeamSpeak3+permIdGetByName) ⇒ <code>Promise</code>
    * [.permGet(key)](#TeamSpeak3+permGet) ⇒ <code>Promise</code>
    * [.permFind(perm)](#TeamSpeak3+permFind) ⇒ <code>Promise</code>
    * [.permReset()](#TeamSpeak3+permReset) ⇒ <code>Promise</code>
    * [.privilegekeyList()](#TeamSpeak3+privilegekeyList) ⇒ <code>Promise</code>
    * [.privilegekeyAdd(type, group, [cid], [description])](#TeamSpeak3+privilegekeyAdd) ⇒ <code>Promise</code>
    * [.privilegekeyDelete(token)](#TeamSpeak3+privilegekeyDelete) ⇒ <code>Promise</code>
    * [.privilegekeyUse(token)](#TeamSpeak3+privilegekeyUse) ⇒ <code>Promise</code>
    * [.messageList()](#TeamSpeak3+messageList) ⇒ <code>Promise</code>
    * [.messageAdd(uid, subject, text)](#TeamSpeak3+messageAdd) ⇒ <code>Promise</code>
    * [.messageDel(id)](#TeamSpeak3+messageDel) ⇒ <code>Promise</code>
    * [.messageGet(id)](#TeamSpeak3+messageGet) ⇒ <code>Promise</code>
    * [.messageUpdate(id, read)](#TeamSpeak3+messageUpdate) ⇒ <code>Promise</code>
    * [.complainList([dbid])](#TeamSpeak3+complainList) ⇒ <code>Promise</code>
    * [.complainAdd(dbid, [message])](#TeamSpeak3+complainAdd) ⇒ <code>Promise</code>
    * [.complainDel(tcldbid, fcldbid)](#TeamSpeak3+complainDel) ⇒ <code>Promise</code>
    * [.banList()](#TeamSpeak3+banList) ⇒ <code>Promise</code>
    * [.banAdd(ip, name, uid, time, reason)](#TeamSpeak3+banAdd) ⇒ <code>Promise</code>
    * [.banDel([id])](#TeamSpeak3+banDel) ⇒ <code>Promise</code>
    * [.logView([lines], [reverse], [instance], [begin_pos])](#TeamSpeak3+logView) ⇒ <code>Promise</code>
    * [.logAdd(level, msg)](#TeamSpeak3+logAdd) ⇒ <code>Promise</code>
    * [.gm(msg)](#TeamSpeak3+gm) ⇒ <code>Promise</code>
    * [.clientDBInfo(cldbid)](#TeamSpeak3+clientDBInfo) ⇒ <code>Promise</code>
    * [.clientDBFind(pattern, isUid)](#TeamSpeak3+clientDBFind) ⇒ <code>Promise</code>
    * [.clientDBEdit(cldbid, properties)](#TeamSpeak3+clientDBEdit) ⇒ <code>Promise</code>
    * [.clientDBDelete(cldbid, properties)](#TeamSpeak3+clientDBDelete) ⇒ <code>Promise</code>
    * [.serverList()](#TeamSpeak3+serverList) ⇒ <code>Promise</code>
    * [.channelGroupList(filter)](#TeamSpeak3+channelGroupList) ⇒ <code>Promise</code>
    * [.serverGroupList(filter)](#TeamSpeak3+serverGroupList) ⇒ <code>Promise</code>
    * [.channelList(filter)](#TeamSpeak3+channelList) ⇒ <code>Promise</code>
    * [.clientList(filter)](#TeamSpeak3+clientList) ⇒ <code>Promise</code>
    * [.quit()](#TeamSpeak3+quit) ⇒ <code>Promise</code>

<a name="new_TeamSpeak3_new"></a>

### new TeamSpeak3([config])
Represents a TeamSpeak Server Instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>object</code> |  | The Configuration Object |
| [config.host] | <code>string</code> | <code>&quot;&#x27;127.0.0.1&#x27;&quot;</code> | The Host on which the TeamSpeak Server runs |
| [config.queryport] | <code>number</code> | <code>10011</code> | The Queryport on which the TeamSpeak Server runs |
| [config.serverport] | <code>number</code> | <code>9987</code> | The Serverport on which the TeamSpeak Instance runs |
| [config.username] | <code>string</code> |  | The username to authenticate with the TeamSpeak Server |
| [config.password] | <code>string</code> |  | The password to authenticate with the TeamSpeak Server |
| [config.nickname] | <code>string</code> |  | The Nickname the Client should have |
| [config.antispam] | <code>boolean</code> | <code>false</code> | Whether the AntiSpam should be activated or deactivated |
| [config.antispamtimer] | <code>number</code> | <code>350</code> | The time between every command for the antispam (in ms) |
| [config.keepalive] | <code>boolean</code> | <code>true</code> | Whether the Query should seen a keepalive |

<a name="TeamSpeak3+execute"></a>

### teamSpeak3.execute(Command, [Object], [Array]) ⇒ <code>Promise</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |

<a name="TeamSpeak3+clientUpdate"></a>

### teamSpeak3.clientUpdate(properties) ⇒ <code>Promise</code>
Change your ServerQuery clients settings using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>string</code> | The Properties which should be changed |

<a name="TeamSpeak3+registerEvent"></a>

### teamSpeak3.registerEvent(event, [id]) ⇒ <code>Promise</code>
Subscribes to an Event.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The Event on which should be subscribed |
| [id] | <code>number</code> | <code>false</code> | The Channel ID |

<a name="TeamSpeak3+login"></a>

### teamSpeak3.login(username, password) ⇒ <code>Promise</code>
Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The Username which you want to login with |
| password | <code>string</code> | The Password you want to login with |

<a name="TeamSpeak3+logout"></a>

### teamSpeak3.logout() ⇒ <code>Promise</code>
Deselects the active virtual server and logs out from the server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+version"></a>

### teamSpeak3.version() ⇒ <code>Promise</code>
Displays the servers version information including platform and build number.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+hostInfo"></a>

### teamSpeak3.hostInfo() ⇒ <code>Promise</code>
Displays detailed connection information about the server instance including uptime, number of virtual servers online, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceInfo"></a>

### teamSpeak3.instanceInfo() ⇒ <code>Promise</code>
Displays the server instance configuration including database revision number, the file transfer port, default group IDs, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceEdit"></a>

### teamSpeak3.instanceEdit(properties) ⇒ <code>Promise</code>
Changes the server instance configuration using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The stuff you want to change |

<a name="TeamSpeak3+bindingList"></a>

### teamSpeak3.bindingList() ⇒ <code>Promise</code>
Displays a list of IP addresses used by the server instance on multi-homed machines.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+useByPort"></a>

### teamSpeak3.useByPort(port) ⇒ <code>Promise</code>
Selects the virtual server specified with the port to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Port the Server runs on |

<a name="TeamSpeak3+useBySid"></a>

### teamSpeak3.useBySid(sid) ⇒ <code>Promise</code>
Selects the virtual server specified with the sid to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | The Server ID |

<a name="TeamSpeak3+whoami"></a>

### teamSpeak3.whoami() ⇒ <code>Promise</code>
Displays information about your current ServerQuery connection including your loginname, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which provides the Information about the QueryClient  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverInfo"></a>

### teamSpeak3.serverInfo() ⇒ <code>Promise</code>
Displays detailed configuration information about the selected virtual server including unique ID, number of clients online, configuration, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverIdGetByPort"></a>

### teamSpeak3.serverIdGetByPort(port) ⇒ <code>Promise</code>
Displays the database ID of the virtual server running on the UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Server Port where data should be retrieved |

<a name="TeamSpeak3+serverEdit"></a>

### teamSpeak3.serverEdit(properties) ⇒ <code>Promise</code>
Changes the selected virtual servers configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings which should be changed |

<a name="TeamSpeak3+serverProcessStop"></a>

### teamSpeak3.serverProcessStop() ⇒ <code>Promise</code>
Stops the entire TeamSpeak 3 Server instance by shutting down the process.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+connectionInfo"></a>

### teamSpeak3.connectionInfo() ⇒ <code>Promise</code>
Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverCreate"></a>

### teamSpeak3.serverCreate(properties) ⇒ <code>Promise</code>
Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key. If virtualserver_port is not specified, the server will test for the first unused UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings |

<a name="TeamSpeak3+channelCreate"></a>

### teamSpeak3.channelCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new channel using the given properties. Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel |
| [type] | <code>object</code> | <code>{}</code> | Properties of the Channel |

<a name="TeamSpeak3+serverGroupCreate"></a>

### teamSpeak3.serverGroupCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new server group using the name specified with name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Server Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Server Group |

<a name="TeamSpeak3+channelGroupCreate"></a>

### teamSpeak3.channelGroupCreate(name, [type]) ⇒ <code>Promise</code>
Creates a new channel group using a given name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Channel Group |

<a name="TeamSpeak3+getChannelByID"></a>

### teamSpeak3.getChannelByID(cid) ⇒ <code>Promise</code>
Retrieves a Single Channel by the given Channel ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | The Channel Id |

<a name="TeamSpeak3+getChannelByName"></a>

### teamSpeak3.getChannelByName(name) ⇒ <code>Promise</code>
Retrieves a Single Channel by the given Channel Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>number</code> | The Name of the Channel |

<a name="TeamSpeak3+getClientByID"></a>

### teamSpeak3.getClientByID(clid) ⇒ <code>Promise</code>
Retrieves a Single Client by the given Client ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | The Client Id |

<a name="TeamSpeak3+getClientByDBID"></a>

### teamSpeak3.getClientByDBID(cldbid) ⇒ <code>Promise</code>
Retrieves a Single Client by the given Client Database ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database Id |

<a name="TeamSpeak3+getClientByUID"></a>

### teamSpeak3.getClientByUID(uid) ⇒ <code>Promise</code>
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | The Client Unique Identifier |

<a name="TeamSpeak3+getClientByName"></a>

### teamSpeak3.getClientByName(name) ⇒ <code>Promise</code>
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns the Client Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Nickname of the Client |

<a name="TeamSpeak3+permissionList"></a>

### teamSpeak3.permissionList() ⇒ <code>Promise</code>
Displays a list of permissions available on the server instance including ID, name and description.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+permIdGetByName"></a>

### teamSpeak3.permIdGetByName(permsid) ⇒ <code>Promise</code>
Displays the database ID of one or more permissions specified by permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| permsid | <code>string</code> \| <code>array</code> | One or more Permission Names |

<a name="TeamSpeak3+permGet"></a>

### teamSpeak3.permGet(key) ⇒ <code>Promise</code>
Displays the current value of the permission for your own connection. This can be useful when you need to check your own privileges.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> \| <code>string</code> | Perm ID or Name which should be checked |

<a name="TeamSpeak3+permFind"></a>

### teamSpeak3.permFind(perm) ⇒ <code>Promise</code>
Displays detailed information about all assignments of the permission. The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>number</code> \| <code>string</code> | Perm ID or Name to get |

<a name="TeamSpeak3+permReset"></a>

### teamSpeak3.permReset() ⇒ <code>Promise</code>
Restores the default permission settings on the selected virtual server and creates a new initial administrator token. Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyList"></a>

### teamSpeak3.privilegekeyList() ⇒ <code>Promise</code>
Displays a list of privilege keys available including their type and group IDs.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyAdd"></a>

### teamSpeak3.privilegekeyAdd(type, group, [cid], [description]) ⇒ <code>Promise</code>
Create a new token. If type is set to 0, the ID specified with tokenid will be a server group ID. Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | Token Type |
| group | <code>number</code> | Depends on the Type given, add either a valid Channel Group or Server Group |
| [cid] | <code>number</code> | Depends on the Type given, add a valid Channel ID |
| [description] | <code>string</code> | Token Description |

<a name="TeamSpeak3+privilegekeyDelete"></a>

### teamSpeak3.privilegekeyDelete(token) ⇒ <code>Promise</code>
Deletes an existing token matching the token key specified with token.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be deleted |

<a name="TeamSpeak3+privilegekeyUse"></a>

### teamSpeak3.privilegekeyUse(token) ⇒ <code>Promise</code>
Use a token key gain access to a server or channel group. Please note that the server will automatically delete the token after it has been used.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be used |

<a name="TeamSpeak3+messageList"></a>

### teamSpeak3.messageList() ⇒ <code>Promise</code>
Displays a list of offline messages you've received. The output contains the senders unique identifier, the messages subject, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+messageAdd"></a>

### teamSpeak3.messageAdd(uid, subject, text) ⇒ <code>Promise</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Client Unique Identifier (uid) |
| subject | <code>string</code> | Subject of the message |
| text | <code>string</code> | Message Text |

<a name="TeamSpeak3+messageDel"></a>

### teamSpeak3.messageDel(id) ⇒ <code>Promise</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Message ID which should be deleted |

<a name="TeamSpeak3+messageGet"></a>

### teamSpeak3.messageGet(id) ⇒ <code>Promise</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |

<a name="TeamSpeak3+messageUpdate"></a>

### teamSpeak3.messageUpdate(id, read) ⇒ <code>Promise</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |
| read | <code>number</code> | If flag is set to 1 the message will be marked as read |

<a name="TeamSpeak3+complainList"></a>

### teamSpeak3.complainList([dbid]) ⇒ <code>Promise</code>
Displays a list of complaints on the selected virtual server. If dbid is specified, only complaints about the targeted client will be shown.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [dbid] | <code>number</code> | Filter only for certain Client with the given Database ID |

<a name="TeamSpeak3+complainAdd"></a>

### teamSpeak3.complainAdd(dbid, [message]) ⇒ <code>Promise</code>
Submits a complaint about the client with database ID dbid to the server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| dbid | <code>number</code> | Filter only for certain Client with the given Database ID |
| [message] | <code>string</code> | The Message which should be added |

<a name="TeamSpeak3+complainDel"></a>

### teamSpeak3.complainDel(tcldbid, fcldbid) ⇒ <code>Promise</code>
Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server. If dbid will be left empty all complaints for the tdbid will be deleted

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| tcldbid | <code>number</code> | The Target Client Database ID |
| fcldbid | <code>number</code> | The Client Database ID which filed the Report |

<a name="TeamSpeak3+banList"></a>

### teamSpeak3.banList() ⇒ <code>Promise</code>
Displays a list of active bans on the selected virtual server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+banAdd"></a>

### teamSpeak3.banAdd(ip, name, uid, time, reason) ⇒ <code>Promise</code>
Adds a new ban rule on the selected virtual server. All parameters are optional but at least one of the following must be set: ip, name, or uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | IP Regex |
| name | <code>string</code> | Name Regex |
| uid | <code>string</code> | UID Regex |
| time | <code>number</code> | Bantime in Seconds, if left empty it will result in a permaban |
| reason | <code>string</code> | Ban Reason |

<a name="TeamSpeak3+banDel"></a>

### teamSpeak3.banDel([id]) ⇒ <code>Promise</code>
Removes one or all bans from the server

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> | <code>false</code> | The BanID to remove, if not provided it will remove all bans |

<a name="TeamSpeak3+logView"></a>

### teamSpeak3.logView([lines], [reverse], [instance], [begin_pos]) ⇒ <code>Promise</code>
Displays a specified number of entries from the servers log. If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lines] | <code>number</code> | <code>1000</code> | Lines to receive |
| [reverse] | <code>number</code> | <code>0</code> | Invert Output |
| [instance] | <code>number</code> | <code>0</code> | Instance or Virtual Server Log |
| [begin_pos] | <code>number</code> | <code>0</code> | Begin at Position |

<a name="TeamSpeak3+logAdd"></a>

### teamSpeak3.logAdd(level, msg) ⇒ <code>Promise</code>
Writes a custom entry into the servers log. Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log. The loglevel parameter specifies the type of the entry

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | Level 1 to 4 |
| msg | <code>string</code> | Message to log |

<a name="TeamSpeak3+gm"></a>

### teamSpeak3.gm(msg) ⇒ <code>Promise</code>
Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message which will be sent to all instances |

<a name="TeamSpeak3+clientDBInfo"></a>

### teamSpeak3.clientDBInfo(cldbid) ⇒ <code>Promise</code>
Displays detailed database information about a client including unique ID, creation date, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be searched for |

<a name="TeamSpeak3+clientDBFind"></a>

### teamSpeak3.clientDBFind(pattern, isUid) ⇒ <code>Promise</code>
Displays a list of client database IDs matching a given pattern. You can either search for a clients last known nickname or his unique identity by using the -uid option.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pattern | <code>string</code> |  | The Pattern which should be searched for |
| isUid | <code>boolean</code> | <code>false</code> | True when instead of the Name it should be searched for a uid |

<a name="TeamSpeak3+clientDBEdit"></a>

### teamSpeak3.clientDBEdit(cldbid, properties) ⇒ <code>Promise</code>
Changes a clients settings using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be edited |
| properties | <code>object</code> | The Properties which should be modified |

<a name="TeamSpeak3+clientDBDelete"></a>

### teamSpeak3.clientDBDelete(cldbid, properties) ⇒ <code>Promise</code>
Deletes a clients properties from the database.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be edited |
| properties | <code>object</code> | The Properties which should be modified |

<a name="TeamSpeak3+serverList"></a>

### teamSpeak3.serverList() ⇒ <code>Promise</code>
Displays a list of virtual servers including their ID, status, number of clients online, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+channelGroupList"></a>

### teamSpeak3.channelGroupList(filter) ⇒ <code>Promise</code>
Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+serverGroupList"></a>

### teamSpeak3.serverGroupList(filter) ⇒ <code>Promise</code>
Displays a list of server groups available. Depending on your permissions, the output may also contain global ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+channelList"></a>

### teamSpeak3.channelList(filter) ⇒ <code>Promise</code>
Lists all Channels with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns an Array of TeamSpeak Channels  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+clientList"></a>

### teamSpeak3.clientList(filter) ⇒ <code>Promise</code>
Lists all Clients with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object which returns an Array of TeamSpeak Clients  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+quit"></a>

### teamSpeak3.quit() ⇒ <code>Promise</code>
Closes the ServerQuery connection to the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise</code> - Promise object  
**Async**:   
**Version**: 1.0  
