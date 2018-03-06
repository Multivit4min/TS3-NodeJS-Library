## Classes

<dl>
<dt><a href="#TeamSpeak3">TeamSpeak3</a></dt>
<dd><p>Main TeamSpeak Query Class</p>
</dd>
<dt><a href="#Abstract">Abstract</a></dt>
<dd><p>Abstract Class</p>
</dd>
<dt><a href="#TeamSpeakClient">TeamSpeakClient</a> ⇐ <code><a href="#Abstract">Abstract</a></code></dt>
<dd><p>Class representing a TeamSpeak Client</p>
</dd>
<dt><a href="#TeamSpeakChannel">TeamSpeakChannel</a> ⇐ <code><a href="#Abstract">Abstract</a></code></dt>
<dd><p>Class representing a TeamSpeak Channel</p>
</dd>
<dt><a href="#TeamSpeakChannelGroup">TeamSpeakChannelGroup</a> ⇐ <code><a href="#Abstract">Abstract</a></code></dt>
<dd><p>Class representing a TeamSpeak ChannelGroup</p>
</dd>
<dt><a href="#TeamSpeakServer">TeamSpeakServer</a> ⇐ <code><a href="#Abstract">Abstract</a></code></dt>
<dd><p>Class representing a TeamSpeak Server</p>
</dd>
<dt><a href="#TeamSpeakServerGroup">TeamSpeakServerGroup</a> ⇐ <code><a href="#Abstract">Abstract</a></code></dt>
<dd><p>Class representing a TeamSpeak ServerGroup</p>
</dd>
</dl>

<a name="TeamSpeak3"></a>

## TeamSpeak3
Main TeamSpeak Query Class

**Kind**: global class  
**Emits**: [<code>ready</code>](#TeamSpeak3+event_ready), [<code>error</code>](#TeamSpeak3+event_error), [<code>close</code>](#TeamSpeak3+event_close), [<code>channeldelete</code>](#TeamSpeak3+event_channeldelete), [<code>channelmoved</code>](#TeamSpeak3+event_channelmoved), [<code>channelcreate</code>](#TeamSpeak3+event_channelcreate), [<code>channeledit</code>](#TeamSpeak3+event_channeledit), [<code>serveredit</code>](#TeamSpeak3+event_serveredit), [<code>clientmoved</code>](#TeamSpeak3+event_clientmoved), [<code>textmessage</code>](#TeamSpeak3+event_textmessage), [<code>clientdisconnect</code>](#TeamSpeak3+event_clientdisconnect), [<code>clientconnect</code>](#TeamSpeak3+event_clientconnect)  

* [TeamSpeak3](#TeamSpeak3)
    * [new TeamSpeak3([config])](#new_TeamSpeak3_new)
    * [.execute(Command, [Object], [Array])](#TeamSpeak3+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientUpdate(properties)](#TeamSpeak3+clientUpdate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.registerEvent(event, [id])](#TeamSpeak3+registerEvent) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.login(username, password)](#TeamSpeak3+login) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.logout()](#TeamSpeak3+logout) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.version()](#TeamSpeak3+version) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.hostInfo()](#TeamSpeak3+hostInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.instanceInfo()](#TeamSpeak3+instanceInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.instanceEdit(properties)](#TeamSpeak3+instanceEdit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.bindingList()](#TeamSpeak3+bindingList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.useByPort(port)](#TeamSpeak3+useByPort) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.useBySid(sid)](#TeamSpeak3+useBySid) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.whoami()](#TeamSpeak3+whoami) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverInfo()](#TeamSpeak3+serverInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverIdGetByPort(port)](#TeamSpeak3+serverIdGetByPort) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverEdit(properties)](#TeamSpeak3+serverEdit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverProcessStop()](#TeamSpeak3+serverProcessStop) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.connectionInfo()](#TeamSpeak3+connectionInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverCreate(properties)](#TeamSpeak3+serverCreate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverDelete(sid)](#TeamSpeak3+serverDelete) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverStart(sid)](#TeamSpeak3+serverStart) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverStop(sid)](#TeamSpeak3+serverStop) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupCreate(name, [type])](#TeamSpeak3+serverGroupCreate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupClientList(sgid)](#TeamSpeak3+serverGroupClientList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupAddClient(cldbid, sgid)](#TeamSpeak3+serverGroupAddClient) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupDelClient(cldbid, sgid)](#TeamSpeak3+serverGroupDelClient) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupDel(sgid, force)](#TeamSpeak3+serverGroupDel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupCopy(ssgid, [tsgid], [type], [name])](#TeamSpeak3+serverGroupCopy) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupRename(sgid, name)](#TeamSpeak3+serverGroupRename) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupPermList(sgid, [permsid])](#TeamSpeak3+serverGroupPermList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupAddPerm(sgid, perm, value, [permsid], [skip], [negate])](#TeamSpeak3+serverGroupAddPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupDelPerm(sgid, perm, [permsid])](#TeamSpeak3+serverGroupDelPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelCreate(name, [type])](#TeamSpeak3+channelCreate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupCreate(name, [type])](#TeamSpeak3+channelGroupCreate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getChannelByID(cid)](#TeamSpeak3+getChannelByID) ⇒ [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel)
    * [.getChannelByName(name)](#TeamSpeak3+getChannelByName) ⇒ [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel)
    * [.channelInfo(cid)](#TeamSpeak3+channelInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelMove(cid, cpid, [order])](#TeamSpeak3+channelMove) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelDelete(cid, force)](#TeamSpeak3+channelDelete) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelEdit(cid, properties)](#TeamSpeak3+channelEdit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelPermList(cid, permsid)](#TeamSpeak3+channelPermList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.channelSetPerm(cid, perm, value, sid)](#TeamSpeak3+channelSetPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelDelPerm(cid, perm, sid)](#TeamSpeak3+channelDelPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClientByID(clid)](#TeamSpeak3+getClientByID) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
    * [.getClientByDBID(cldbid)](#TeamSpeak3+getClientByDBID) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
    * [.getClientByUID(uid)](#TeamSpeak3+getClientByUID) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
    * [.getClientByName(name)](#TeamSpeak3+getClientByName) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
    * [.clientInfo(clid)](#TeamSpeak3+clientInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDBInfo(dbid)](#TeamSpeak3+clientDBInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientKick(clid, reasonid, msg)](#TeamSpeak3+clientKick) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientMove(clid, cid, [cpw])](#TeamSpeak3+clientMove) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientPoke(clid, msg)](#TeamSpeak3+clientPoke) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientPermList(dbid, [permsid])](#TeamSpeak3+clientPermList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientAddPerm(dbid, perm, value, [permsid], [skip], [negate])](#TeamSpeak3+clientAddPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDelPerm(dbid, perm, [permsid])](#TeamSpeak3+clientDelPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.sendTextMessage(target, targetmode, msg)](#TeamSpeak3+sendTextMessage) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getServerGroupByID(sgid)](#TeamSpeak3+getServerGroupByID) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
    * [.getServerGroupByName(name)](#TeamSpeak3+getServerGroupByName) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
    * [.getChannelGroupByID(cgid)](#TeamSpeak3+getChannelGroupByID) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
    * [.getChannelGroupByName(name)](#TeamSpeak3+getChannelGroupByName) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
    * [.setClientChannelGroup(cgid, cid, cldbid)](#TeamSpeak3+setClientChannelGroup) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.deleteChannelGroup(cgid, [force])](#TeamSpeak3+deleteChannelGroup) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupCopy(scgid, [tcgid], [type], [name])](#TeamSpeak3+channelGroupCopy) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupRename(cgid, name)](#TeamSpeak3+channelGroupRename) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupPermList(cgid, [permsid])](#TeamSpeak3+channelGroupPermList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.channelGroupAddPerm(cgid, perm, value, [permsid], [skip], [negate])](#TeamSpeak3+channelGroupAddPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupDelPerm(cgid, perm, [permsid])](#TeamSpeak3+channelGroupDelPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.channelGroupClientList(cgid, [cid])](#TeamSpeak3+channelGroupClientList) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
    * [.permissionList()](#TeamSpeak3+permissionList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.permIdGetByName(permsid)](#TeamSpeak3+permIdGetByName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permGet(key)](#TeamSpeak3+permGet) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permFind(perm)](#TeamSpeak3+permFind) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permReset()](#TeamSpeak3+permReset) ⇒ <code>Promise</code>
    * [.privilegekeyList()](#TeamSpeak3+privilegekeyList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.privilegekeyAdd(type, group, [cid], [description])](#TeamSpeak3+privilegekeyAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.privilegekeyDelete(token)](#TeamSpeak3+privilegekeyDelete) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.privilegekeyUse(token)](#TeamSpeak3+privilegekeyUse) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.messageList()](#TeamSpeak3+messageList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.messageAdd(uid, subject, text)](#TeamSpeak3+messageAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.messageDel(id)](#TeamSpeak3+messageDel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.messageGet(id)](#TeamSpeak3+messageGet) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.messageUpdate(id, read)](#TeamSpeak3+messageUpdate) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.complainList([dbid])](#TeamSpeak3+complainList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.complainAdd(dbid, [message])](#TeamSpeak3+complainAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.complainDel(tcldbid, fcldbid)](#TeamSpeak3+complainDel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.banList()](#TeamSpeak3+banList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.banAdd([ip], [name], [uid], time, reason)](#TeamSpeak3+banAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.banDel([id])](#TeamSpeak3+banDel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.logView([lines], [reverse], [instance], [begin_pos])](#TeamSpeak3+logView) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.logAdd(level, msg)](#TeamSpeak3+logAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.gm(msg)](#TeamSpeak3+gm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDBInfo(cldbid)](#TeamSpeak3+clientDBInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDBFind(pattern, isUid)](#TeamSpeak3+clientDBFind) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDBEdit(cldbid, properties)](#TeamSpeak3+clientDBEdit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientDBDelete(cldbid, properties)](#TeamSpeak3+clientDBDelete) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverList()](#TeamSpeak3+serverList) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakServer&gt;&gt;</code>
    * [.channelGroupList(filter)](#TeamSpeak3+channelGroupList) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakChannelGroup&gt;&gt;</code>
    * [.serverGroupList(filter)](#TeamSpeak3+serverGroupList) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakServerGroup&gt;&gt;</code>
    * [.channelList(filter)](#TeamSpeak3+channelList) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakChannel&gt;&gt;</code>
    * [.clientList(filter)](#TeamSpeak3+clientList) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakClient&gt;&gt;</code>
    * [.ftInitUpload(transfer)](#TeamSpeak3+ftInitUpload) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.ftInitDownload(transfer)](#TeamSpeak3+ftInitDownload) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIcon(name)](#TeamSpeak3+getIcon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIconName()](#TeamSpeak3+getIconName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.quit()](#TeamSpeak3+quit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.toArray()](#TeamSpeak3+toArray) ⇒ <code>Array.&lt;any&gt;</code>
    * ["ready"](#TeamSpeak3+event_ready)
    * ["error"](#TeamSpeak3+event_error) ⇒ <code>object</code>
    * ["close"](#TeamSpeak3+event_close) ⇒ <code>object</code>
    * ["clientconnect"](#TeamSpeak3+event_clientconnect)
    * ["clientdisconnect"](#TeamSpeak3+event_clientdisconnect)
    * ["textmessage"](#TeamSpeak3+event_textmessage)
    * ["clientmoved"](#TeamSpeak3+event_clientmoved)
    * ["serveredit"](#TeamSpeak3+event_serveredit)
    * ["channeledit"](#TeamSpeak3+event_channeledit)
    * ["channelcreate"](#TeamSpeak3+event_channelcreate)
    * ["channelmoved"](#TeamSpeak3+event_channelmoved)
    * ["channeldelete"](#TeamSpeak3+event_channeldelete)

<a name="new_TeamSpeak3_new"></a>

### new TeamSpeak3([config])
Represents a TeamSpeak Server Instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>object</code> |  | The Configuration Object |
| [config.host] | <code>string</code> | <code>&quot;127.0.0.1&quot;</code> | The Host on which the TeamSpeak Server runs |
| [config.queryport] | <code>number</code> | <code>10011</code> | The Queryport on which the TeamSpeak Server runs |
| [config.serverport] | <code>number</code> | <code>9987</code> | The Serverport on which the TeamSpeak Instance runs |
| [config.username] | <code>string</code> |  | The username to authenticate with the TeamSpeak Server |
| [config.password] | <code>string</code> |  | The password to authenticate with the TeamSpeak Server |
| [config.nickname] | <code>string</code> |  | The Nickname the Client should have |
| [config.antispam] | <code>boolean</code> | <code>false</code> | Whether the AntiSpam should be activated or deactivated |
| [config.antispamtimer] | <code>number</code> | <code>350</code> | The time between every command for the antispam (in ms) |
| [config.keepalive] | <code>boolean</code> | <code>true</code> | Whether the Query should seen a keepalive |

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

### teamSpeak3.clientUpdate(properties) ⇒ <code>Promise.&lt;object&gt;</code>
Change your ServerQuery clients settings using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>string</code> | The Properties which should be changed |

<a name="TeamSpeak3+registerEvent"></a>

### teamSpeak3.registerEvent(event, [id]) ⇒ <code>Promise.&lt;object&gt;</code>
Subscribes to an Event.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The Event on which should be subscribed |
| [id] | <code>number</code> | <code>false</code> | The Channel ID |

<a name="TeamSpeak3+login"></a>

### teamSpeak3.login(username, password) ⇒ <code>Promise.&lt;object&gt;</code>
Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The Username which you want to login with |
| password | <code>string</code> | The Password you want to login with |

<a name="TeamSpeak3+logout"></a>

### teamSpeak3.logout() ⇒ <code>Promise.&lt;object&gt;</code>
Deselects the active virtual server and logs out from the server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+version"></a>

### teamSpeak3.version() ⇒ <code>Promise.&lt;object&gt;</code>
Displays the servers version information including platform and build number.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+hostInfo"></a>

### teamSpeak3.hostInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed connection information about the server instance including uptime, number of virtual servers online, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceInfo"></a>

### teamSpeak3.instanceInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Displays the server instance configuration including database revision number, the file transfer port, default group IDs, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+instanceEdit"></a>

### teamSpeak3.instanceEdit(properties) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the server instance configuration using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The stuff you want to change |

<a name="TeamSpeak3+bindingList"></a>

### teamSpeak3.bindingList() ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of IP addresses used by the server instance on multi-homed machines.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+useByPort"></a>

### teamSpeak3.useByPort(port) ⇒ <code>Promise.&lt;object&gt;</code>
Selects the virtual server specified with the port to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Port the Server runs on |

<a name="TeamSpeak3+useBySid"></a>

### teamSpeak3.useBySid(sid) ⇒ <code>Promise.&lt;object&gt;</code>
Selects the virtual server specified with the sid to allow further interaction.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | The Server ID |

<a name="TeamSpeak3+whoami"></a>

### teamSpeak3.whoami() ⇒ <code>Promise.&lt;object&gt;</code>
Displays information about your current ServerQuery connection including your loginname, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which provides the Information about the QueryClient  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverInfo"></a>

### teamSpeak3.serverInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed configuration information about the selected virtual server including unique ID, number of clients online, configuration, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverIdGetByPort"></a>

### teamSpeak3.serverIdGetByPort(port) ⇒ <code>Promise.&lt;object&gt;</code>
Displays the database ID of the virtual server running on the UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | The Server Port where data should be retrieved |

<a name="TeamSpeak3+serverEdit"></a>

### teamSpeak3.serverEdit(properties) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the selected virtual servers configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the selected virtual server at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings which should be changed |

<a name="TeamSpeak3+serverProcessStop"></a>

### teamSpeak3.serverProcessStop() ⇒ <code>Promise.&lt;object&gt;</code>
Stops the entire TeamSpeak 3 Server instance by shutting down the process.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+connectionInfo"></a>

### teamSpeak3.connectionInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed connection information about the selected virtual server including uptime, traffic information, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+serverCreate"></a>

### teamSpeak3.serverCreate(properties) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a new virtual server using the given properties and displays its ID, port and initial administrator privilege key. If virtualserver_port is not specified, the server will test for the first unused UDP port

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - returns the server admin token for the new server and the response from the server creation  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | The Server Settings |

<a name="TeamSpeak3+serverDelete"></a>

### teamSpeak3.serverDelete(sid) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes a Server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | the server id |

<a name="TeamSpeak3+serverStart"></a>

### teamSpeak3.serverStart(sid) ⇒ <code>Promise.&lt;object&gt;</code>
Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | the server id |

<a name="TeamSpeak3+serverStop"></a>

### teamSpeak3.serverStop(sid) ⇒ <code>Promise.&lt;object&gt;</code>
Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>number</code> | the server id |

<a name="TeamSpeak3+serverGroupCreate"></a>

### teamSpeak3.serverGroupCreate(name, [type]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a new server group using the name specified with name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Server Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Server Group |

<a name="TeamSpeak3+serverGroupClientList"></a>

### teamSpeak3.serverGroupClientList(sgid) ⇒ <code>Promise.&lt;object&gt;</code>
Displays the IDs of all clients currently residing in the server group.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>number</code> | the ServerGroup id |

<a name="TeamSpeak3+serverGroupAddClient"></a>

### teamSpeak3.serverGroupAddClient(cldbid, sgid) ⇒ <code>Promise.&lt;object&gt;</code>
Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be added |
| sgid | <code>number</code> | The Server Group ID which the Client should be added to |

<a name="TeamSpeak3+serverGroupDelClient"></a>

### teamSpeak3.serverGroupDelClient(cldbid, sgid) ⇒ <code>Promise.&lt;object&gt;</code>
Removes the client from the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be removed |
| sgid | <code>number</code> | The Server Group ID which the Client should be removed from |

<a name="TeamSpeak3+serverGroupDel"></a>

### teamSpeak3.serverGroupDel(sgid, force) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sgid | <code>number</code> |  | the ServerGroup id |
| force | <code>number</code> | <code>0</code> | If set to 1 the ServerGroup will be deleted even when Clients are in it |

<a name="TeamSpeak3+serverGroupCopy"></a>

### teamSpeak3.serverGroupCopy(ssgid, [tsgid], [type], [name]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ssgid | <code>number</code> |  | the source ServerGroup |
| [tsgid] | <code>number</code> | <code>0</code> | the target ServerGroup, 0 to create a new Group |
| [type] | <code>number</code> | <code>1</code> | The Type of the Group (0 = Query Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeak3+serverGroupRename"></a>

### teamSpeak3.serverGroupRename(sgid, name) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the name of the server group

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>number</code> | the ServerGroup id |
| name | <code>string</code> | new name of the ServerGroup |

<a name="TeamSpeak3+serverGroupPermList"></a>

### teamSpeak3.serverGroupPermList(sgid, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of permissions assigned to the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sgid | <code>number</code> |  | the ServerGroup id |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeak3+serverGroupAddPerm"></a>

### teamSpeak3.serverGroupAddPerm(sgid, perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a specified permissions to the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sgid | <code>number</code> |  | the ServerGroup id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeak3+serverGroupDelPerm"></a>

### teamSpeak3.serverGroupDelPerm(sgid, perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sgid | <code>number</code> |  | the ServerGroup id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeak3+channelCreate"></a>

### teamSpeak3.channelCreate(name, [type]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a new channel using the given properties. Note that this command accepts multiple properties which means that you're able to specifiy all settings of the new channel at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel |
| [type] | <code>object</code> | <code>{}</code> | Properties of the Channel |

<a name="TeamSpeak3+channelGroupCreate"></a>

### teamSpeak3.channelGroupCreate(name, [type]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a new channel group using a given name. The optional type parameter can be used to create ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The Name of the Channel Group |
| [type] | <code>number</code> | <code>1</code> | Type of the Channel Group |

<a name="TeamSpeak3+getChannelByID"></a>

### teamSpeak3.getChannelByID(cid) ⇒ [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel)
Retrieves a Single Channel by the given Channel ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel) - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | The Channel Id |

<a name="TeamSpeak3+getChannelByName"></a>

### teamSpeak3.getChannelByName(name) ⇒ [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel)
Retrieves a Single Channel by the given Channel Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakChannel&gt;</code>](#TeamSpeakChannel) - Promise object which returns the Channel Object or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>number</code> | The Name of the Channel |

<a name="TeamSpeak3+channelInfo"></a>

### teamSpeak3.channelInfo(cid) ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed configuration information about a channel including ID, topic, description, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | the channel id |

<a name="TeamSpeak3+channelMove"></a>

### teamSpeak3.channelMove(cid, cpid, [order]) ⇒ <code>Promise.&lt;object&gt;</code>
Moves a channel to a new parent channel with the ID cpid. If order is specified, the channel will be sorted right under the channel with the specified ID. If order is set to 0, the channel will be sorted right below the new parent.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | the channel id |
| cpid | <code>number</code> |  | Channel Parent ID |
| [order] | <code>number</code> | <code>0</code> | Channel Sort Order |

<a name="TeamSpeak3+channelDelete"></a>

### teamSpeak3.channelDelete(cid, force) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | the channel id |
| force | <code>number</code> | <code>0</code> | If set to 1 the Channel will be deleted even when Clients are in it |

<a name="TeamSpeak3+channelEdit"></a>

### teamSpeak3.channelEdit(cid, properties) ⇒ <code>Promise.&lt;object&gt;</code>
Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | the channel id |
| properties | <code>number</code> | The Properties of the Channel which should get changed |

<a name="TeamSpeak3+channelPermList"></a>

### teamSpeak3.channelPermList(cid, permsid) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Displays a list of permissions defined for a channel.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | the channel id |
| permsid | <code>boolean</code> | <code>false</code> | Whether the Perm SID should be displayed aswell |

<a name="TeamSpeak3+channelSetPerm"></a>

### teamSpeak3.channelSetPerm(cid, perm, value, sid) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | the channel id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | The Value which should be set |
| sid | <code>boolean</code> | <code>false</code> | If the given Perm is a permsid |

<a name="TeamSpeak3+channelDelPerm"></a>

### teamSpeak3.channelDelPerm(cid, perm, sid) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | the channel id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| sid | <code>boolean</code> | <code>false</code> | If the given Perm is a permsid |

<a name="TeamSpeak3+getClientByID"></a>

### teamSpeak3.getClientByID(clid) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
Retrieves a Single Client by the given Client ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient) - Promise object which returns the Client or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | The Client Id |

<a name="TeamSpeak3+getClientByDBID"></a>

### teamSpeak3.getClientByDBID(cldbid) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
Retrieves a Single Client by the given Client Database ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient) - Promise object which returns the Client or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database Id |

<a name="TeamSpeak3+getClientByUID"></a>

### teamSpeak3.getClientByUID(uid) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient) - Promise object which returns the Client or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | The Client Unique Identifier |

<a name="TeamSpeak3+getClientByName"></a>

### teamSpeak3.getClientByName(name) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
Retrieves a Single Client by the given Client Unique Identifier

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient) - Promise object which returns the Client or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Nickname of the Client |

<a name="TeamSpeak3+clientInfo"></a>

### teamSpeak3.clientInfo(clid) ⇒ <code>Promise.&lt;object&gt;</code>
Returns General Info of the Client, requires the Client to be online

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the Client Information  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | the client id |

<a name="TeamSpeak3+clientDBInfo"></a>

### teamSpeak3.clientDBInfo(dbid) ⇒ <code>Promise.&lt;object&gt;</code>
Returns the Clients Database Info

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Returns the Client Database Info  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| dbid | <code>number</code> | the client database id |

<a name="TeamSpeak3+clientKick"></a>

### teamSpeak3.clientKick(clid, reasonid, msg) ⇒ <code>Promise.&lt;object&gt;</code>
Kicks the Client from the Server

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | the client id |
| reasonid | <code>number</code> | the reasonid |
| msg | <code>string</code> | The Message the Client should receive when getting kicked |

<a name="TeamSpeak3+clientMove"></a>

### teamSpeak3.clientMove(clid, cid, [cpw]) ⇒ <code>Promise.&lt;object&gt;</code>
Moves the Client to a different Channel

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clid | <code>number</code> |  | the client id |
| cid | <code>number</code> |  | Channel ID in which the Client should get moved |
| [cpw] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The Channel Password |

<a name="TeamSpeak3+clientPoke"></a>

### teamSpeak3.clientPoke(clid, msg) ⇒ <code>Promise.&lt;object&gt;</code>
Pokes the Client with a certain message

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| clid | <code>number</code> | the client id |
| msg | <code>string</code> | The message the Client should receive |

<a name="TeamSpeak3+clientPermList"></a>

### teamSpeak3.clientPermList(dbid, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of permissions defined for a client

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dbid | <code>number</code> |  | the client database id |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeak3+clientAddPerm"></a>

### teamSpeak3.clientAddPerm(dbid, perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dbid | <code>number</code> |  | the client database id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeak3+clientDelPerm"></a>

### teamSpeak3.clientDelPerm(dbid, perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dbid | <code>number</code> |  | the client database id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeak3+sendTextMessage"></a>

### teamSpeak3.sendTextMessage(target, targetmode, msg) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a text message a specified target. The type of the target is determined by targetmode while target specifies the ID of the recipient, whether it be a virtual server, a channel or a client.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | target to message |
| targetmode | <code>string</code> | targetmode (1: client, 2: channel, 3: server) |
| msg | <code>string</code> | The message the Client should receive |

<a name="TeamSpeak3+getServerGroupByID"></a>

### teamSpeak3.getServerGroupByID(sgid) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
Retrieves a single ServerGroup by the given ServerGroup ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup) - Promise object which returns the ServerGroup or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>number</code> | the ServerGroup Id |

<a name="TeamSpeak3+getServerGroupByName"></a>

### teamSpeak3.getServerGroupByName(name) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
Retrieves a single ServerGroup by the given ServerGroup Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup) - Promise object which returns the ServerGroup or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>number</code> | the ServerGroup name |

<a name="TeamSpeak3+getChannelGroupByID"></a>

### teamSpeak3.getChannelGroupByID(cgid) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
Retrieves a single ChannelGroup by the given ChannelGroup ID

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup) - Promise object which returns the ChannelGroup or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cgid | <code>number</code> | the ChannelGroup Id |

<a name="TeamSpeak3+getChannelGroupByName"></a>

### teamSpeak3.getChannelGroupByName(name) ⇒ [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup)
Retrieves a single ChannelGroup by the given ChannelGroup Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: [<code>Promise.&lt;TeamSpeakServerGroup&gt;</code>](#TeamSpeakServerGroup) - Promise object which returns the ChannelGroup or undefined if not found  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>number</code> | the ChannelGroup name |

<a name="TeamSpeak3+setClientChannelGroup"></a>

### teamSpeak3.setClientChannelGroup(cgid, cid, cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Sets the channel group of a client

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cgid | <code>number</code> | The Channel Group which the Client should get assigned |
| cid | <code>number</code> | The Channel in which the Client should be assigned the Group |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeak3+deleteChannelGroup"></a>

### teamSpeak3.deleteChannelGroup(cgid, [force]) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cgid | <code>cgid</code> |  | the channelgroup id |
| [force] | <code>number</code> | <code>0</code> | If set to 1 the Channel Group will be deleted even when Clients are in it |

<a name="TeamSpeak3+channelGroupCopy"></a>

### teamSpeak3.channelGroupCopy(scgid, [tcgid], [type], [name]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tcgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scgid | <code>number</code> |  | the source ChannelGroup |
| [tcgid] | <code>number</code> | <code>0</code> | the target ChannelGroup (0 to create a new Group) |
| [type] | <code>number</code> | <code>1</code> | The Type of the Group (0 = Template Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeak3+channelGroupRename"></a>

### teamSpeak3.channelGroupRename(cgid, name) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the name of the channel group

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cgid | <code>number</code> | the ChannelGroup id to rename |
| name | <code>string</code> | new name of the ChannelGroup |

<a name="TeamSpeak3+channelGroupPermList"></a>

### teamSpeak3.channelGroupPermList(cgid, [permsid]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Displays a list of permissions assigned to the channel group specified with cgid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cgid | <code>number</code> |  | the ChannelGroup id to list |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeak3+channelGroupAddPerm"></a>

### teamSpeak3.channelGroupAddPerm(cgid, perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cgid | <code>number</code> |  | the ChannelGroup id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeak3+channelGroupDelPerm"></a>

### teamSpeak3.channelGroupDelPerm(cgid, perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cgid | <code>number</code> |  | the ChannelGroup id |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeak3+channelGroupClientList"></a>

### teamSpeak3.channelGroupClientList(cgid, [cid]) ⇒ [<code>Promise.&lt;TeamSpeakClient&gt;</code>](#TeamSpeakClient)
Displays the IDs of all clients currently residing in the channel group.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cgid | <code>number</code> | the ChannelGroup id |
| [cid] | <code>number</code> | The Channel ID |

<a name="TeamSpeak3+permissionList"></a>

### teamSpeak3.permissionList() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Retrieves a list of permissions available on the server instance including ID, name and description.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - gets a list of permissions available  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+permIdGetByName"></a>

### teamSpeak3.permIdGetByName(permsid) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves the database ID of one or more permissions specified by permsid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - gets the specified permissions  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| permsid | <code>string</code> \| <code>array</code> | One or more Permission Names |

<a name="TeamSpeak3+permGet"></a>

### teamSpeak3.permGet(key) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves the current value of the permission for your own connection. This can be useful when you need to check your own privileges.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - gets the permissions  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> \| <code>string</code> | Perm ID or Name which should be checked |

<a name="TeamSpeak3+permFind"></a>

### teamSpeak3.permFind(perm) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves detailed information about all assignments of the permission. The output is similar to permoverview which includes the type and the ID of the client, channel or group associated with the permission.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - gets the permissions  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>number</code> \| <code>string</code> | Perm ID or Name to get |

<a name="TeamSpeak3+permReset"></a>

### teamSpeak3.permReset() ⇒ <code>Promise</code>
Restores the default permission settings on the selected virtual server and creates a new initial administrator token. Please note that in case of an error during the permreset call - e.g. when the database has been modified or corrupted - the virtual server will be deleted from the database.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyList"></a>

### teamSpeak3.privilegekeyList() ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves a list of privilege keys available including their type and group IDs.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;object&gt;</code> - gets a list of privilegekeys  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+privilegekeyAdd"></a>

### teamSpeak3.privilegekeyAdd(type, group, [cid], [description]) ⇒ <code>Promise.&lt;object&gt;</code>
Create a new token. If type is set to 0, the ID specified with tokenid will be a server group ID. Otherwise, tokenid is used as a channel group ID and you need to provide a valid channel ID using channelid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | Token Type |
| group | <code>number</code> | Depends on the Type given, add either a valid Channel Group or Server Group |
| [cid] | <code>number</code> | Depends on the Type given, add a valid Channel ID |
| [description] | <code>string</code> | Token Description |

<a name="TeamSpeak3+privilegekeyDelete"></a>

### teamSpeak3.privilegekeyDelete(token) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes an existing token matching the token key specified with token.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be deleted |

<a name="TeamSpeak3+privilegekeyUse"></a>

### teamSpeak3.privilegekeyUse(token) ⇒ <code>Promise.&lt;object&gt;</code>
Use a token key gain access to a server or channel group. Please note that the server will automatically delete the token after it has been used.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token which should be used |

<a name="TeamSpeak3+messageList"></a>

### teamSpeak3.messageList() ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of offline messages you've received. The output contains the senders unique identifier, the messages subject, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+messageAdd"></a>

### teamSpeak3.messageAdd(uid, subject, text) ⇒ <code>Promise.&lt;object&gt;</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Client Unique Identifier (uid) |
| subject | <code>string</code> | Subject of the message |
| text | <code>string</code> | Message Text |

<a name="TeamSpeak3+messageDel"></a>

### teamSpeak3.messageDel(id) ⇒ <code>Promise.&lt;object&gt;</code>
Sends an offline message to the client specified by uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Message ID which should be deleted |

<a name="TeamSpeak3+messageGet"></a>

### teamSpeak3.messageGet(id) ⇒ <code>Promise.&lt;object&gt;</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |

<a name="TeamSpeak3+messageUpdate"></a>

### teamSpeak3.messageUpdate(id, read) ⇒ <code>Promise.&lt;object&gt;</code>
Displays an existing offline message with the given id from the inbox.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Gets the content of the Message |
| read | <code>number</code> | If flag is set to 1 the message will be marked as read |

<a name="TeamSpeak3+complainList"></a>

### teamSpeak3.complainList([dbid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of complaints on the selected virtual server. If dbid is specified, only complaints about the targeted client will be shown.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [dbid] | <code>number</code> | Filter only for certain Client with the given Database ID |

<a name="TeamSpeak3+complainAdd"></a>

### teamSpeak3.complainAdd(dbid, [message]) ⇒ <code>Promise.&lt;object&gt;</code>
Submits a complaint about the client with database ID dbid to the server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| dbid | <code>number</code> | Filter only for certain Client with the given Database ID |
| [message] | <code>string</code> | The Message which should be added |

<a name="TeamSpeak3+complainDel"></a>

### teamSpeak3.complainDel(tcldbid, fcldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the complaint about the client with ID tdbid submitted by the client with ID fdbid from the server. If dbid will be left empty all complaints for the tdbid will be deleted

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| tcldbid | <code>number</code> | The Target Client Database ID |
| fcldbid | <code>number</code> | The Client Database ID which filed the Report |

<a name="TeamSpeak3+banList"></a>

### teamSpeak3.banList() ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of active bans on the selected virtual server.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+banAdd"></a>

### teamSpeak3.banAdd([ip], [name], [uid], time, reason) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a new ban rule on the selected virtual server. All parameters are optional but at least one of the following must be set: ip, name, or uid.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [ip] | <code>string</code> | IP Regex |
| [name] | <code>string</code> | Name Regex |
| [uid] | <code>string</code> | UID Regex |
| time | <code>number</code> | Bantime in Seconds, if left empty it will result in a permaban |
| reason | <code>string</code> | Ban Reason |

<a name="TeamSpeak3+banDel"></a>

### teamSpeak3.banDel([id]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes one or all bans from the server

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> | <code>false</code> | The BanID to remove, if not provided it will remove all bans |

<a name="TeamSpeak3+logView"></a>

### teamSpeak3.logView([lines], [reverse], [instance], [begin_pos]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a specified number of entries from the servers log. If instance is set to 1, the server will return lines from the master logfile (ts3server_0.log) instead of the selected virtual server logfile.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lines] | <code>number</code> | <code>1000</code> | Lines to receive |
| [reverse] | <code>number</code> | <code>0</code> | Invert Output |
| [instance] | <code>number</code> | <code>0</code> | Instance or Virtual Server Log |
| [begin_pos] | <code>number</code> | <code>0</code> | Begin at Position |

<a name="TeamSpeak3+logAdd"></a>

### teamSpeak3.logAdd(level, msg) ⇒ <code>Promise.&lt;object&gt;</code>
Writes a custom entry into the servers log. Depending on your permissions, you'll be able to add entries into the server instance log and/or your virtual servers log. The loglevel parameter specifies the type of the entry

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | Level 1 to 4 |
| msg | <code>string</code> | Message to log |

<a name="TeamSpeak3+gm"></a>

### teamSpeak3.gm(msg) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a text message to all clients on all virtual servers in the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message which will be sent to all instances |

<a name="TeamSpeak3+clientDBInfo"></a>

### teamSpeak3.clientDBInfo(cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed database information about a client including unique ID, creation date, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be searched for |

<a name="TeamSpeak3+clientDBFind"></a>

### teamSpeak3.clientDBFind(pattern, isUid) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of client database IDs matching a given pattern. You can either search for a clients last known nickname or his unique identity by using the -uid option.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pattern | <code>string</code> |  | The Pattern which should be searched for |
| isUid | <code>boolean</code> | <code>false</code> | True when instead of the Name it should be searched for a uid |

<a name="TeamSpeak3+clientDBEdit"></a>

### teamSpeak3.clientDBEdit(cldbid, properties) ⇒ <code>Promise.&lt;object&gt;</code>
Changes a clients settings using given properties.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be edited |
| properties | <code>object</code> | The Properties which should be modified |

<a name="TeamSpeak3+clientDBDelete"></a>

### teamSpeak3.clientDBDelete(cldbid, properties) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes a clients properties from the database.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>string</code> | The Client Database ID which should be edited |
| properties | <code>object</code> | The Properties which should be modified |

<a name="TeamSpeak3+serverList"></a>

### teamSpeak3.serverList() ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakServer&gt;&gt;</code>
Displays a list of virtual servers including their ID, status, number of clients online, etc.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+channelGroupList"></a>

### teamSpeak3.channelGroupList(filter) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakChannelGroup&gt;&gt;</code>
Displays a list of channel groups available. Depending on your permissions, the output may also contain template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;Array.&lt;TeamSpeakChannelGroup&gt;&gt;</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+serverGroupList"></a>

### teamSpeak3.serverGroupList(filter) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakServerGroup&gt;&gt;</code>
Displays a list of server groups available. Depending on your permissions, the output may also contain global ServerQuery groups and template groups.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;Array.&lt;TeamSpeakServerGroup&gt;&gt;</code> - Promise object which returns an Array of TeamSpeak Server Groups  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+channelList"></a>

### teamSpeak3.channelList(filter) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakChannel&gt;&gt;</code>
Lists all Channels with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;Array.&lt;TeamSpeakChannel&gt;&gt;</code> - Promise object which returns an Array of TeamSpeak Channels  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+clientList"></a>

### teamSpeak3.clientList(filter) ⇒ <code>Promise.&lt;Array.&lt;TeamSpeakClient&gt;&gt;</code>
Lists all Clients with a given Filter

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>Promise.&lt;Array.&lt;TeamSpeakClient&gt;&gt;</code> - Promise object which returns an Array of TeamSpeak Clients  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Filter Object |

<a name="TeamSpeak3+ftInitUpload"></a>

### teamSpeak3.ftInitUpload(transfer) ⇒ <code>Promise.&lt;object&gt;</code>
Initializes a file transfer upload. clientftfid is an arbitrary ID to identify the file transfer on client-side. On success, the server generates a new ftkey which is required to start uploading the file through TeamSpeak 3's file transfer interface.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| transfer | <code>object</code> | The Transfer Object |
| transfer.clientftfid | <code>object</code> | Arbitary ID to Identify the Transfer |
| transfer.name | <code>string</code> | Destination Filename |
| transfer.cid | <code>number</code> | Channel ID to upload to |
| transfer.cpw | <code>string</code> | Channel Password of the Channel which will be uploaded to |
| transfer.size | <code>number</code> | Size of the File |
| transfer.overwrite | <code>number</code> | <Description Pending> |
| transfer.resume | <code>number</code> | <Description Pending> |

<a name="TeamSpeak3+ftInitDownload"></a>

### teamSpeak3.ftInitDownload(transfer) ⇒ <code>Promise.&lt;object&gt;</code>
Initializes a file transfer download. clientftfid is an arbitrary ID to identify the file transfer on client-side. On success, the server generates a new ftkey which is required to start downloading the file through TeamSpeak 3's file transfer interface.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transfer | <code>object</code> |  | The Transfer Object |
| transfer.name | <code>string</code> |  | Filename to Download |
| [transfer.clientftfid] | <code>number</code> |  | Arbitary ID to Identify the Transfer |
| [transfer.cid] | <code>number</code> | <code>0</code> | Channel ID to upload to |
| [transfer.cpw] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Channel Password of the Channel which will be uploaded to |
| [transfer.seekpos] | <code>number</code> | <code>0</code> | <Description Pending File Startposition?> |

<a name="TeamSpeak3+getIcon"></a>

### teamSpeak3.getIcon(name) ⇒ <code>Promise.&lt;object&gt;</code>
Returns an Icon with the given Name

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Name of the Icon to retrieve |

<a name="TeamSpeak3+getIconName"></a>

### teamSpeak3.getIconName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Icon Name of a resolveable Perm List

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+quit"></a>

### teamSpeak3.quit() ⇒ <code>Promise.&lt;object&gt;</code>
Closes the ServerQuery connection to the TeamSpeak 3 Server instance.

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+toArray"></a>

### teamSpeak3.toArray() ⇒ <code>Array.&lt;any&gt;</code>
Transforms an Input to an Array

**Kind**: instance method of [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeak3+event_ready"></a>

### "ready"
Query Ready EventGets fired when the TeamSpeak Query has successfully connected and selected the virtual server

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
<a name="TeamSpeak3+event_error"></a>

### "error" ⇒ <code>object</code>
Query Error EventGets fired when the TeamSpeak Query had an error while trying to connectand also gets fired when there was an error after receiving an event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>object</code> - - return the error object  
<a name="TeamSpeak3+event_close"></a>

### "close" ⇒ <code>object</code>
Query Close EventGets fired when the Query disconnects from the TeamSpeak Server

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Returns**: <code>object</code> - - may return an error object  
<a name="TeamSpeak3+event_clientconnect"></a>

### "clientconnect"
Client Join Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>TeamSpeakClient</code>](#TeamSpeakClient) | The Client which joined the Server |

<a name="TeamSpeak3+event_clientdisconnect"></a>

### "clientdisconnect"
Client Disconnect EventEvents Object contains all available Informations returned by the query

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | <code>object</code> | The data from the last Client List Command |
| event | <code>object</code> | The Data from the disconnect event |

<a name="TeamSpeak3+event_textmessage"></a>

### "textmessage"
Textmessage event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which sent a textmessage |
| msg | <code>string</code> | The Message which has been sent |
| targetmode | <code>number</code> | The Targetmode (1 = Client, 2 = Channel, 3 = Virtual Server) |

<a name="TeamSpeak3+event_clientmoved"></a>

### "clientmoved"
Client Move Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | <code>class</code> | The Client which moved |
| channel | <code>class</code> | The Channel which the client has been moved to |
| reasonid | <code>number</code> | Reason ID why the Client has moved (4 = Channel Kick) |

<a name="TeamSpeak3+event_serveredit"></a>

### "serveredit"
Server Edit Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which edited the server |
| modified | <code>object</code> | The Properties which has been modified |

<a name="TeamSpeak3+event_channeledit"></a>

### "channeledit"
Channel Edit Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which edited a channel |
| channel | <code>class</code> | The Channel which has been edited |
| modified | <code>object</code> | The Properties which has been modified |

<a name="TeamSpeak3+event_channelcreate"></a>

### "channelcreate"
Channel Create Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which created the channel |
| channel | <code>class</code> | The Channel which has been created |
| modified | <code>object</code> | The Properties which has been modified |

<a name="TeamSpeak3+event_channelmoved"></a>

### "channelmoved"
Channel Move Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which moved the channel |
| channel | <code>class</code> | The Channel which has been moved |
| parent | <code>class</code> | The new Parent Channel |

<a name="TeamSpeak3+event_channeldelete"></a>

### "channeldelete"
Channel Delete Event

**Kind**: event emitted by [<code>TeamSpeak3</code>](#TeamSpeak3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| invoker | <code>class</code> | The Client which deleted the channel |
| cid | <code>class</code> | The Channel ID which has been deleted |

<a name="Abstract"></a>

## Abstract
Abstract Class

**Kind**: global class  

* [Abstract](#Abstract)
    * [new Abstract(parent, c)](#new_Abstract_new)
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)

<a name="new_Abstract_new"></a>

### new Abstract(parent, c)
Creates a new Abstract Class


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | The Properties |

<a name="Abstract+on"></a>

### abstract.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### abstract.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### abstract.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### abstract._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### abstract.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### abstract.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### abstract.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### abstract.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="TeamSpeakClient"></a>

## TeamSpeakClient ⇐ [<code>Abstract</code>](#Abstract)
Class representing a TeamSpeak Client

**Kind**: global class  
**Extends**: [<code>Abstract</code>](#Abstract)  
**Emits**: [<code>move</code>](#TeamSpeakClient+event_move), [<code>textmessage</code>](#TeamSpeakClient+event_textmessage), [<code>clientdisconnect</code>](#TeamSpeakClient+event_clientdisconnect)  

* [TeamSpeakClient](#TeamSpeakClient) ⇐ [<code>Abstract</code>](#Abstract)
    * [new TeamSpeakClient(parent, c)](#new_TeamSpeakClient_new)
    * [.getDBID()](#TeamSpeakClient+getDBID) ⇒ <code>number</code>
    * [.getID()](#TeamSpeakClient+getID) ⇒ <code>number</code>
    * [.getUID()](#TeamSpeakClient+getUID) ⇒ <code>string</code>
    * [.isQuery()](#TeamSpeakClient+isQuery) ⇒ <code>boolean</code>
    * [.getURL()](#TeamSpeakClient+getURL) ⇒ <code>string</code>
    * [.getInfo()](#TeamSpeakClient+getInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getDBInfo()](#TeamSpeakClient+getDBInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.kickFromServer(msg)](#TeamSpeakClient+kickFromServer) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.kickFromChannel(msg)](#TeamSpeakClient+kickFromChannel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.move(cid, [cpw])](#TeamSpeakClient+move) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupAdd(sgid)](#TeamSpeakClient+serverGroupAdd) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.serverGroupDel(sgid)](#TeamSpeakClient+serverGroupDel) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.poke(msg)](#TeamSpeakClient+poke) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.message(msg)](#TeamSpeakClient+message) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permList([permsid])](#TeamSpeakClient+permList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakClient+addPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakClient+delPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getAvatar()](#TeamSpeakClient+getAvatar) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIcon()](#TeamSpeakClient+getIcon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getAvatarName()](#TeamSpeakClient+getAvatarName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIconName()](#TeamSpeakClient+getIconName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
    * ["move"](#TeamSpeakClient+event_move) ⇒ [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)
    * ["textmessage"](#TeamSpeakClient+event_textmessage) ⇒ <code>string</code>
    * ["clientdisconnect"](#TeamSpeakClient+event_clientdisconnect)

<a name="new_TeamSpeakClient_new"></a>

### new TeamSpeakClient(parent, c)
Creates a TeamSpeak Client


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic Client Data received by the Client List Command |
| c.clid | <code>number</code> | The Client ID of the TeamSpeak Client |
| c.client_database_id | <code>number</code> | The Client Database ID |
| c.client_type | <code>number</code> | The Client Type (0 = Client, 1 = Query) |
| c.client_unique_identifier | <code>string</code> | The Client Unique ID |

<a name="TeamSpeakClient+getDBID"></a>

### teamSpeakClient.getDBID() ⇒ <code>number</code>
Returns the Database ID of the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>number</code> - Returns the Clients Database ID  
**Version**: 1.0  
<a name="TeamSpeakClient+getID"></a>

### teamSpeakClient.getID() ⇒ <code>number</code>
Returns the Client ID

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>number</code> - Returns the Client ID  
**Version**: 1.0  
<a name="TeamSpeakClient+getUID"></a>

### teamSpeakClient.getUID() ⇒ <code>string</code>
Returns the Client Unique ID

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>string</code> - Returns the Client UniqueID  
**Version**: 1.0  
<a name="TeamSpeakClient+isQuery"></a>

### teamSpeakClient.isQuery() ⇒ <code>boolean</code>
Evaluates if the Client is a Query Client or a normal Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>boolean</code> - true when the Client is a Server Query Client  
**Version**: 1.0  
<a name="TeamSpeakClient+getURL"></a>

### teamSpeakClient.getURL() ⇒ <code>string</code>
Retrieves a displayable Client Link for the TeamSpeak Chat

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>string</code> - returns the TeamSpeak Client URL as Link  
**Version**: 1.0  
<a name="TeamSpeakClient+getInfo"></a>

### teamSpeakClient.getInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Returns General Info of the Client, requires the Client to be online

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the Client Information  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+getDBInfo"></a>

### teamSpeakClient.getDBInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the Clients Database Info

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Returns the Client Database Info  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+kickFromServer"></a>

### teamSpeakClient.kickFromServer(msg) ⇒ <code>Promise.&lt;object&gt;</code>
Kicks the Client from the Server

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The Message the Client should receive when getting kicked |

<a name="TeamSpeakClient+kickFromChannel"></a>

### teamSpeakClient.kickFromChannel(msg) ⇒ <code>Promise.&lt;object&gt;</code>
Kicks the Client from their currently joined Channel

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The Message the Client should receive when getting kicked (max 40 Chars) |

<a name="TeamSpeakClient+move"></a>

### teamSpeakClient.move(cid, [cpw]) ⇒ <code>Promise.&lt;object&gt;</code>
Moves the Client to a different Channel

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | Channel ID in which the Client should get moved |
| [cpw] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The Channel Password |

<a name="TeamSpeakClient+serverGroupAdd"></a>

### teamSpeakClient.serverGroupAdd(sgid) ⇒ <code>Promise.&lt;object&gt;</code>
Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>string</code> | The Server Group ID which the Client should be added to |

<a name="TeamSpeakClient+serverGroupDel"></a>

### teamSpeakClient.serverGroupDel(sgid) ⇒ <code>Promise.&lt;object&gt;</code>
Removes the client from the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>string</code> | The Server Group ID which the Client should be removed from |

<a name="TeamSpeakClient+poke"></a>

### teamSpeakClient.poke(msg) ⇒ <code>Promise.&lt;object&gt;</code>
Pokes the Client with a certain message

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message the Client should receive |

<a name="TeamSpeakClient+message"></a>

### teamSpeakClient.message(msg) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a textmessage to the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message the Client should receive |

<a name="TeamSpeakClient+permList"></a>

### teamSpeakClient.permList([permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of permissions defined for a client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakClient+addPerm"></a>

### teamSpeakClient.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeakClient+delPerm"></a>

### teamSpeakClient.delPerm(perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakClient+getAvatar"></a>

### teamSpeakClient.getAvatar() ⇒ <code>Promise.&lt;object&gt;</code>
Returns a Buffer with the Avatar of the User

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the binary data of the avatar  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+getIcon"></a>

### teamSpeakClient.getIcon() ⇒ <code>Promise.&lt;object&gt;</code>
Returns a Buffer with the Icon of the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the binary data of the Client Icon  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+getAvatarName"></a>

### teamSpeakClient.getAvatarName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Avatar Name of the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Avatar Name  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+getIconName"></a>

### teamSpeakClient.getIconName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Icon Name of the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Async**:   
**Version**: 1.0  
<a name="Abstract+on"></a>

### teamSpeakClient.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### teamSpeakClient.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### teamSpeakClient.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### teamSpeakClient._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### teamSpeakClient.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### teamSpeakClient.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### teamSpeakClient.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### teamSpeakClient.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Version**: 1.0  
<a name="TeamSpeakClient+event_move"></a>

### "move" ⇒ [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)
Move event

**Kind**: event emitted by [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: [<code>TeamSpeakChannel</code>](#TeamSpeakChannel) - The Channel where the Client moved to  
<a name="TeamSpeakClient+event_textmessage"></a>

### "textmessage" ⇒ <code>string</code>
Textmessage event

**Kind**: event emitted by [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>string</code> - The Message which has been sent  
<a name="TeamSpeakClient+event_clientdisconnect"></a>

### "clientdisconnect"
Client Disconnect Event

**Kind**: event emitted by [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
<a name="TeamSpeakChannel"></a>

## TeamSpeakChannel ⇐ [<code>Abstract</code>](#Abstract)
Class representing a TeamSpeak Channel

**Kind**: global class  
**Extends**: [<code>Abstract</code>](#Abstract)  

* [TeamSpeakChannel](#TeamSpeakChannel) ⇐ [<code>Abstract</code>](#Abstract)
    * [new TeamSpeakChannel(parent, c)](#new_TeamSpeakChannel_new)
    * [.getInfo()](#TeamSpeakChannel+getInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.move(cpid, [order])](#TeamSpeakChannel+move) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.del(force)](#TeamSpeakChannel+del) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.edit(properties)](#TeamSpeakChannel+edit) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permList(permsid)](#TeamSpeakChannel+permList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.setPerm(perm, value, sid)](#TeamSpeakChannel+setPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.delPerm(perm, sid)](#TeamSpeakChannel+delPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClients(filter)](#TeamSpeakChannel+getClients) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIcon()](#TeamSpeakChannel+getIcon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIconName()](#TeamSpeakChannel+getIconName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)

<a name="new_TeamSpeakChannel_new"></a>

### new TeamSpeakChannel(parent, c)
Creates a TeamSpeak Channel


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic Channel Data received by the Channel List Command |
| c.cid | <code>number</code> | The Channel ID |

<a name="TeamSpeakChannel+getInfo"></a>

### teamSpeakChannel.getInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Displays detailed configuration information about a channel including ID, topic, description, etc.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakChannel+move"></a>

### teamSpeakChannel.move(cpid, [order]) ⇒ <code>Promise.&lt;object&gt;</code>
Moves a channel to a new parent channel with the ID cpid. If order is specified, the channel will be sorted right under the channel with the specified ID. If order is set to 0, the channel will be sorted right below the new parent.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cpid | <code>number</code> |  | Channel Parent ID |
| [order] | <code>number</code> | <code>0</code> | Channel Sort Order |

<a name="TeamSpeakChannel+del"></a>

### teamSpeakChannel.del(force) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the Channel will be deleted even when Clients are in it |

<a name="TeamSpeakChannel+edit"></a>

### teamSpeakChannel.edit(properties) ⇒ <code>Promise.&lt;object&gt;</code>
Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>number</code> | The Properties of the Channel which should get changed |

<a name="TeamSpeakChannel+permList"></a>

### teamSpeakChannel.permList(permsid) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Displays a list of permissions defined for a channel.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| permsid | <code>boolean</code> | <code>false</code> | Whether the Perm SID should be displayed aswell |

<a name="TeamSpeakChannel+setPerm"></a>

### teamSpeakChannel.setPerm(perm, value, sid) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | The Value which should be set |
| sid | <code>boolean</code> | <code>false</code> | If the given Perm is a permsid |

<a name="TeamSpeakChannel+delPerm"></a>

### teamSpeakChannel.delPerm(perm, sid) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| sid | <code>boolean</code> | <code>false</code> | If the given Perm is a permsid |

<a name="TeamSpeakChannel+getClients"></a>

### teamSpeakChannel.getClients(filter) ⇒ <code>Promise.&lt;object&gt;</code>
Gets a List of Clients in the current Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | The Filter Object |

<a name="TeamSpeakChannel+getIcon"></a>

### teamSpeakChannel.getIcon() ⇒ <code>Promise.&lt;object&gt;</code>
Returns a Buffer with the Icon of the Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the binary data of the Channel Icon  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakChannel+getIconName"></a>

### teamSpeakChannel.getIconName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Icon Name of the Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  
<a name="Abstract+on"></a>

### teamSpeakChannel.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### teamSpeakChannel.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### teamSpeakChannel.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### teamSpeakChannel._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### teamSpeakChannel.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### teamSpeakChannel.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### teamSpeakChannel.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### teamSpeakChannel.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Version**: 1.0  
<a name="TeamSpeakChannelGroup"></a>

## TeamSpeakChannelGroup ⇐ [<code>Abstract</code>](#Abstract)
Class representing a TeamSpeak ChannelGroup

**Kind**: global class  
**Extends**: [<code>Abstract</code>](#Abstract)  

* [TeamSpeakChannelGroup](#TeamSpeakChannelGroup) ⇐ [<code>Abstract</code>](#Abstract)
    * [new TeamSpeakChannelGroup(parent, c)](#new_TeamSpeakChannelGroup_new)
    * [.del([force])](#TeamSpeakChannelGroup+del) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.copy([tcgid], [type], [name])](#TeamSpeakChannelGroup+copy) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.rename(name)](#TeamSpeakChannelGroup+rename) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permList([permsid])](#TeamSpeakChannelGroup+permList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakChannelGroup+addPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakChannelGroup+delPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.setClient(cid, cldbid)](#TeamSpeakChannelGroup+setClient) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientList([cid])](#TeamSpeakChannelGroup+clientList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIcon()](#TeamSpeakChannelGroup+getIcon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIconName()](#TeamSpeakChannelGroup+getIconName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)

<a name="new_TeamSpeakChannelGroup_new"></a>

### new TeamSpeakChannelGroup(parent, c)
Creates a TeamSpeak Channel Group


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic ServerGroup Data |
| c.cgid | <code>number</code> | The Channel Group ID |

<a name="TeamSpeakChannelGroup+del"></a>

### teamSpeakChannelGroup.del([force]) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [force] | <code>number</code> | <code>0</code> | If set to 1 the Channel Group will be deleted even when Clients are in it |

<a name="TeamSpeakChannelGroup+copy"></a>

### teamSpeakChannelGroup.copy([tcgid], [type], [name]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tcgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tcgid] | <code>number</code> | <code>0</code> | The Target Group, 0 to create a new Group |
| [type] | <code>number</code> |  | The Type of the Group (0 = Template Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeakChannelGroup+rename"></a>

### teamSpeakChannelGroup.rename(name) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the name of the channel group

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the Group |

<a name="TeamSpeakChannelGroup+permList"></a>

### teamSpeakChannelGroup.permList([permsid]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Displays a list of permissions assigned to the channel group specified with cgid.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakChannelGroup+addPerm"></a>

### teamSpeakChannelGroup.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeakChannelGroup+delPerm"></a>

### teamSpeakChannelGroup.delPerm(perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakChannelGroup+setClient"></a>

### teamSpeakChannelGroup.setClient(cid, cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Sets the channel group of a client

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | The Channel in which the Client should be assigned the Group |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeakChannelGroup+clientList"></a>

### teamSpeakChannelGroup.clientList([cid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays the IDs of all clients currently residing in the channel group.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [cid] | <code>number</code> | The Channel ID |

<a name="TeamSpeakChannelGroup+getIcon"></a>

### teamSpeakChannelGroup.getIcon() ⇒ <code>Promise.&lt;object&gt;</code>
Returns a Buffer with the Icon of the Channel Group

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the binary data of the ChannelGroup Icon  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakChannelGroup+getIconName"></a>

### teamSpeakChannelGroup.getIconName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Icon Name of the Channel Group

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  
<a name="Abstract+on"></a>

### teamSpeakChannelGroup.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### teamSpeakChannelGroup.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### teamSpeakChannelGroup.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### teamSpeakChannelGroup._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### teamSpeakChannelGroup.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### teamSpeakChannelGroup.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### teamSpeakChannelGroup.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### teamSpeakChannelGroup.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Version**: 1.0  
<a name="TeamSpeakServer"></a>

## TeamSpeakServer ⇐ [<code>Abstract</code>](#Abstract)
Class representing a TeamSpeak Server

**Kind**: global class  
**Extends**: [<code>Abstract</code>](#Abstract)  

* [TeamSpeakServer](#TeamSpeakServer) ⇐ [<code>Abstract</code>](#Abstract)
    * [new TeamSpeakServer(parent, s)](#new_TeamSpeakServer_new)
    * [.use()](#TeamSpeakServer+use) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getInfo()](#TeamSpeakServer+getInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.del()](#TeamSpeakServer+del) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.start()](#TeamSpeakServer+start) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.stop()](#TeamSpeakServer+stop) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)

<a name="new_TeamSpeakServer_new"></a>

### new TeamSpeakServer(parent, s)
Creates a TeamSpeak Server


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| s | <code>object</code> | This holds Basic ServerGroup Data |
| s.virtualserver_id | <code>number</code> | The Server ID |

<a name="TeamSpeakServer+use"></a>

### teamSpeakServer.use() ⇒ <code>Promise.&lt;object&gt;</code>
Selects the Virtual Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="TeamSpeakServer+getInfo"></a>

### teamSpeakServer.getInfo() ⇒ <code>Promise.&lt;object&gt;</code>
Gets basic Infos about the Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+del"></a>

### teamSpeakServer.del() ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the Server.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+start"></a>

### teamSpeakServer.start() ⇒ <code>Promise.&lt;object&gt;</code>
Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+stop"></a>

### teamSpeakServer.stop() ⇒ <code>Promise.&lt;object&gt;</code>
Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="Abstract+on"></a>

### teamSpeakServer.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### teamSpeakServer.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### teamSpeakServer.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### teamSpeakServer._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### teamSpeakServer.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### teamSpeakServer.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### teamSpeakServer.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### teamSpeakServer.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="TeamSpeakServerGroup"></a>

## TeamSpeakServerGroup ⇐ [<code>Abstract</code>](#Abstract)
Class representing a TeamSpeak ServerGroup

**Kind**: global class  
**Extends**: [<code>Abstract</code>](#Abstract)  

* [TeamSpeakServerGroup](#TeamSpeakServerGroup) ⇐ [<code>Abstract</code>](#Abstract)
    * [new TeamSpeakServerGroup(parent, c)](#new_TeamSpeakServerGroup_new)
    * [.getSGID()](#TeamSpeakServerGroup+getSGID) ⇒ <code>number</code>
    * [.del(force)](#TeamSpeakServerGroup+del) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.copy([tsgid], [type], [name])](#TeamSpeakServerGroup+copy) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.rename(name)](#TeamSpeakServerGroup+rename) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.permList([permsid])](#TeamSpeakServerGroup+permList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakServerGroup+addPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakServerGroup+delPerm) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.addClient(cldbid)](#TeamSpeakServerGroup+addClient) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.delClient(cldbid)](#TeamSpeakServerGroup+delClient) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.clientList()](#TeamSpeakServerGroup+clientList) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIcon()](#TeamSpeakServerGroup+getIcon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getIconName()](#TeamSpeakServerGroup+getIconName) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.on(name, cb)](#Abstract+on)
    * [.removeAllListeners()](#Abstract+removeAllListeners)
    * [.execute(Command, [Object], [Array], [Boolean])](#Abstract+execute) ⇒ <code>Promise.&lt;object&gt;</code>
    * [._commandCache(args)](#Abstract+_commandCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.filter(array, filter)](#Abstract+filter) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getCache()](#Abstract+getCache) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateCache()](#Abstract+updateCache)
    * [.getParent()](#Abstract+getParent) ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)

<a name="new_TeamSpeakServerGroup_new"></a>

### new TeamSpeakServerGroup(parent, c)
Creates a TeamSpeak Server Group


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic ServerGroup Data |
| c.sgid | <code>number</code> | The Server Group ID |

<a name="TeamSpeakServerGroup+getSGID"></a>

### teamSpeakServerGroup.getSGID() ⇒ <code>number</code>
Returns the Server Group ID

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  
<a name="TeamSpeakServerGroup+del"></a>

### teamSpeakServerGroup.del(force) ⇒ <code>Promise.&lt;object&gt;</code>
Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the ServerGroup will be deleted even when Clients are in it |

<a name="TeamSpeakServerGroup+copy"></a>

### teamSpeakServerGroup.copy([tsgid], [type], [name]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tsgid] | <code>number</code> | <code>0</code> | The Target Group, 0 to create a new Group |
| [type] | <code>number</code> |  | The Type of the Group (0 = Query Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeakServerGroup+rename"></a>

### teamSpeakServerGroup.rename(name) ⇒ <code>Promise.&lt;object&gt;</code>
Changes the name of the server group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the Group |

<a name="TeamSpeakServerGroup+permList"></a>

### teamSpeakServerGroup.permList([permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Displays a list of permissions assigned to the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakServerGroup+addPerm"></a>

### teamSpeakServerGroup.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a specified permissions to the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| value | <code>number</code> |  | Value of the Permission |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |
| [skip] | <code>number</code> | <code>0</code> | Whether the skip flag should be set |
| [negate] | <code>number</code> | <code>0</code> | Whether the negate flag should be set |

<a name="TeamSpeakServerGroup+delPerm"></a>

### teamSpeakServerGroup.delPerm(perm, [permsid]) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakServerGroup+addClient"></a>

### teamSpeakServerGroup.addClient(cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeakServerGroup+delClient"></a>

### teamSpeakServerGroup.delClient(cldbid) ⇒ <code>Promise.&lt;object&gt;</code>
Removes a client specified with cldbid from the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be removed from the Group |

<a name="TeamSpeakServerGroup+clientList"></a>

### teamSpeakServerGroup.clientList() ⇒ <code>Promise.&lt;object&gt;</code>
Displays the IDs of all clients currently residing in the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIcon"></a>

### teamSpeakServerGroup.getIcon() ⇒ <code>Promise.&lt;object&gt;</code>
Returns a Buffer with the Icon of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise with the binary data of the ServerGroup Icon  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIconName"></a>

### teamSpeakServerGroup.getIconName() ⇒ <code>Promise.&lt;object&gt;</code>
Gets the Icon Name of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  
<a name="Abstract+on"></a>

### teamSpeakServerGroup.on(name, cb)
Subscribes to parent Events

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Event Name which should be subscribed to |
| cb | <code>function</code> | The Callback |

<a name="Abstract+removeAllListeners"></a>

### teamSpeakServerGroup.removeAllListeners()
Safely unsubscribes to all Events

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  
<a name="Abstract+execute"></a>

### teamSpeakServerGroup.execute(Command, [Object], [Array], [Boolean]) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| Command | <code>string</code> | The Command which should get executed on the TeamSpeak Server |
| [Object] | <code>object</code> | Optional the Parameters |
| [Array] | <code>object</code> | Optional Flagwords |
| [Boolean] | <code>boolean</code> | Optional if the Command should be cached |

<a name="Abstract+_commandCache"></a>

### teamSpeakServerGroup._commandCache(args) ⇒ <code>Promise.&lt;object&gt;</code>
Sends a command to the TeamSpeak Server.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object which returns the Information about the Query executed  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | Arguments which the Query should execute |

<a name="Abstract+filter"></a>

### teamSpeakServerGroup.filter(array, filter) ⇒ <code>Promise.&lt;object&gt;</code>
Filters an Object with given Option

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>object</code> | The Object which should get filtered |
| filter | <code>object</code> | Filter Object |

<a name="Abstract+getCache"></a>

### teamSpeakServerGroup.getCache() ⇒ <code>Promise.&lt;object&gt;</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### teamSpeakServerGroup.updateCache()
Sets the Data from the Last List Command

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### teamSpeakServerGroup.getParent() ⇒ [<code>TeamSpeak3</code>](#TeamSpeak3)
Returns the Parent Class

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Version**: 1.0  
