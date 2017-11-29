<a name="TeamSpeakChannelGroup"></a>

## TeamSpeakChannelGroup ⇐ <code>TeamSpeakProperty</code>
Class representing a TeamSpeak ChannelGroup

**Kind**: global class  
**Extends**: <code>TeamSpeakProperty</code>  

* [TeamSpeakChannelGroup](#TeamSpeakChannelGroup) ⇐ <code>TeamSpeakProperty</code>
    * [new TeamSpeakChannelGroup(parent, c)](#new_TeamSpeakChannelGroup_new)
    * [.del(force)](#TeamSpeakChannelGroup+del) ⇒ <code>Promise</code>
    * [.copy([tcgid], [type], [name])](#TeamSpeakChannelGroup+copy) ⇒ <code>Promise</code>
    * [.rename(name)](#TeamSpeakChannelGroup+rename) ⇒ <code>Promise</code>
    * [.permList([permsid])](#TeamSpeakChannelGroup+permList) ⇒ <code>Promise</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakChannelGroup+addPerm) ⇒ <code>Promise</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakChannelGroup+delPerm) ⇒ <code>Promise</code>
    * [.setClient(cid, cldbid)](#TeamSpeakChannelGroup+setClient) ⇒ <code>Promise</code>
    * [.clientList([cid], [cldbid])](#TeamSpeakChannelGroup+clientList) ⇒ <code>Promise</code>

<a name="new_TeamSpeakChannelGroup_new"></a>

### new TeamSpeakChannelGroup(parent, c)
Creates a TeamSpeak Channel Group


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic ServerGroup Data |
| c.cgid | <code>number</code> | The Channel Group ID |

<a name="TeamSpeakChannelGroup+del"></a>

### teamSpeakChannelGroup.del(force) ⇒ <code>Promise</code>
Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the Channel Group will be deleted even when Clients are in it |

<a name="TeamSpeakChannelGroup+copy"></a>

### teamSpeakChannelGroup.copy([tcgid], [type], [name]) ⇒ <code>Promise</code>
Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tcgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tcgid] | <code>number</code> | <code>0</code> | The Target Group, 0 to create a new Group |
| [type] | <code>number</code> | <code>1</code> | The Type of the Group (0 = Template Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeakChannelGroup+rename"></a>

### teamSpeakChannelGroup.rename(name) ⇒ <code>Promise</code>
Changes the name of the channel group

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the Group |

<a name="TeamSpeakChannelGroup+permList"></a>

### teamSpeakChannelGroup.permList([permsid]) ⇒ <code>Promise</code>
Displays a list of permissions assigned to the channel group specified with cgid.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakChannelGroup+addPerm"></a>

### teamSpeakChannelGroup.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise</code>
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

### teamSpeakChannelGroup.delPerm(perm, [permsid]) ⇒ <code>Promise</code>
Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakChannelGroup+setClient"></a>

### teamSpeakChannelGroup.setClient(cid, cldbid) ⇒ <code>Promise</code>
Sets the channel group of a client

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Returns**: <code>Promise</code> - Group  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>number</code> | The Channel in which the Client should be assigned the Group |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeakChannelGroup+clientList"></a>

### teamSpeakChannelGroup.clientList([cid], [cldbid]) ⇒ <code>Promise</code>
Displays the IDs of all clients currently residing in the channel group.

**Kind**: instance method of [<code>TeamSpeakChannelGroup</code>](#TeamSpeakChannelGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| [cid] | <code>number</code> | The Channel ID |
| [cldbid] | <code>number</code> | The Channel ID |

