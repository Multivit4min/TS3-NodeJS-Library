<a name="TeamSpeakChannel"></a>

## TeamSpeakChannel ⇐ <code>Abstract</code>
Class representing a TeamSpeak Channel

**Kind**: global class  
**Extends**: <code>Abstract</code>  

* [TeamSpeakChannel](#TeamSpeakChannel) ⇐ <code>Abstract</code>
    * [new TeamSpeakChannel(parent, c)](#new_TeamSpeakChannel_new)
    * [.getInfo()](#TeamSpeakChannel+getInfo) ⇒ <code>Promise</code>
    * [.move(cpid, [order])](#TeamSpeakChannel+move) ⇒ <code>Promise</code>
    * [.del(force)](#TeamSpeakChannel+del) ⇒ <code>Promise</code>
    * [.edit(properties)](#TeamSpeakChannel+edit) ⇒ <code>Promise</code>
    * [.permList(permsid)](#TeamSpeakChannel+permList) ⇒ <code>Promise</code>
    * [.setPerm(perm, value, sid)](#TeamSpeakChannel+setPerm) ⇒ <code>Promise</code>
    * [.delPerm(perm, sid)](#TeamSpeakChannel+delPerm) ⇒ <code>Promise</code>
    * [.getClients(filter)](#TeamSpeakChannel+getClients) ⇒ <code>Promise</code>
    * [.getIcon()](#TeamSpeakChannel+getIcon) ⇒ <code>Promise</code>
    * [.getIconName()](#TeamSpeakChannel+getIconName) ⇒ <code>Promise</code>

<a name="new_TeamSpeakChannel_new"></a>

### new TeamSpeakChannel(parent, c)
Creates a TeamSpeak Channel


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic Channel Data received by the Channel List Command |
| c.cid | <code>number</code> | The Channel ID |

<a name="TeamSpeakChannel+getInfo"></a>

### teamSpeakChannel.getInfo() ⇒ <code>Promise</code>
Displays detailed configuration information about a channel including ID, topic, description, etc.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakChannel+move"></a>

### teamSpeakChannel.move(cpid, [order]) ⇒ <code>Promise</code>
Moves a channel to a new parent channel with the ID cpid. If order is specified, the channel will be sorted right under the channel with the specified ID. If order is set to 0, the channel will be sorted right below the new parent.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cpid | <code>number</code> |  | Channel Parent ID |
| [order] | <code>number</code> | <code>0</code> | Channel Sort Order |

<a name="TeamSpeakChannel+del"></a>

### teamSpeakChannel.del(force) ⇒ <code>Promise</code>
Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the Channel will be deleted even when Clients are in it |

<a name="TeamSpeakChannel+edit"></a>

### teamSpeakChannel.edit(properties) ⇒ <code>Promise</code>
Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>number</code> | The Properties of the Channel which should get changed |

<a name="TeamSpeakChannel+permList"></a>

### teamSpeakChannel.permList(permsid) ⇒ <code>Promise</code>
Displays a list of permissions defined for a channel.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| permsid | <code>boolean</code> | <code>false</code> | Whether the Perm SID should be displayed aswell |

<a name="TeamSpeakChannel+setPerm"></a>

### teamSpeakChannel.setPerm(perm, value, sid) ⇒ <code>Promise</code>
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

### teamSpeakChannel.delPerm(perm, sid) ⇒ <code>Promise</code>
Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| sid | <code>boolean</code> | <code>false</code> | If the given Perm is a permsid |

<a name="TeamSpeakChannel+getClients"></a>

### teamSpeakChannel.getClients(filter) ⇒ <code>Promise</code>
Gets a List of Clients in the current Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | The Filter Object |

<a name="TeamSpeakChannel+getIcon"></a>

### teamSpeakChannel.getIcon() ⇒ <code>Promise</code>
Returns a Buffer with the Icon of the Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakChannel+getIconName"></a>

### teamSpeakChannel.getIconName() ⇒ <code>Promise</code>
Gets the Icon Name of the Channel

**Kind**: instance method of [<code>TeamSpeakChannel</code>](#TeamSpeakChannel)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
