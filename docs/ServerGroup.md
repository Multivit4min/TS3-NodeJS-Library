<a name="TeamSpeakServerGroup"></a>

## TeamSpeakServerGroup ⇐ <code>TeamSpeakProperty</code>
Class representing a TeamSpeak ServerGroup

**Kind**: global class  
**Extends**: <code>TeamSpeakProperty</code>  

* [TeamSpeakServerGroup](#TeamSpeakServerGroup) ⇐ <code>TeamSpeakProperty</code>
    * [new TeamSpeakServerGroup(parent, c)](#new_TeamSpeakServerGroup_new)
    * [.getSGID()](#TeamSpeakServerGroup+getSGID) ⇒ <code>number</code>
    * [.del(force)](#TeamSpeakServerGroup+del) ⇒ <code>Promise</code>
    * [.copy([tsgid], [type], [name])](#TeamSpeakServerGroup+copy) ⇒ <code>Promise</code>
    * [.rename(name)](#TeamSpeakServerGroup+rename) ⇒ <code>Promise</code>
    * [.permList([permsid])](#TeamSpeakServerGroup+permList) ⇒ <code>Promise</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakServerGroup+addPerm) ⇒ <code>Promise</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakServerGroup+delPerm) ⇒ <code>Promise</code>
    * [.addClient(cldbid)](#TeamSpeakServerGroup+addClient) ⇒ <code>Promise</code>
    * [.delClient(cldbid)](#TeamSpeakServerGroup+delClient) ⇒ <code>Promise</code>
    * [.clientList()](#TeamSpeakServerGroup+clientList) ⇒ <code>Promise</code>
    * [.getIcon()](#TeamSpeakServerGroup+getIcon) ⇒ <code>Promise</code>
    * [.getIconName()](#TeamSpeakServerGroup+getIconName) ⇒ <code>Promise</code>

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

### teamSpeakServerGroup.del(force) ⇒ <code>Promise</code>
Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the ServerGroup will be deleted even when Clients are in it |

<a name="TeamSpeakServerGroup+copy"></a>

### teamSpeakServerGroup.copy([tsgid], [type], [name]) ⇒ <code>Promise</code>
Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tsgid] | <code>number</code> | <code>0</code> | The Target Group, 0 to create a new Group |
| [type] | <code>number</code> | <code>1</code> | The Type of the Group (0 = Query Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeakServerGroup+rename"></a>

### teamSpeakServerGroup.rename(name) ⇒ <code>Promise</code>
Changes the name of the server group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the Group |

<a name="TeamSpeakServerGroup+permList"></a>

### teamSpeakServerGroup.permList([permsid]) ⇒ <code>Promise</code>
Displays a list of permissions assigned to the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakServerGroup+addPerm"></a>

### teamSpeakServerGroup.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise</code>
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

### teamSpeakServerGroup.delPerm(perm, [permsid]) ⇒ <code>Promise</code>
Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakServerGroup+addClient"></a>

### teamSpeakServerGroup.addClient(cldbid) ⇒ <code>Promise</code>
Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeakServerGroup+delClient"></a>

### teamSpeakServerGroup.delClient(cldbid) ⇒ <code>Promise</code>
Removes a client specified with cldbid from the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be removed from the Group |

<a name="TeamSpeakServerGroup+clientList"></a>

### teamSpeakServerGroup.clientList() ⇒ <code>Promise</code>
Displays the IDs of all clients currently residing in the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIcon"></a>

### teamSpeakServerGroup.getIcon() ⇒ <code>Promise</code>
Returns a Buffer with the Icon of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIconName"></a>

### teamSpeakServerGroup.getIconName() ⇒ <code>Promise</code>
Gets the Icon Name of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup"></a>

## TeamSpeakServerGroup ⇐ <code>TeamSpeakProperty</code>
Class representing a TeamSpeak ServerGroup

**Kind**: global class  
**Extends**: <code>TeamSpeakProperty</code>  

* [TeamSpeakServerGroup](#TeamSpeakServerGroup) ⇐ <code>TeamSpeakProperty</code>
    * [new TeamSpeakServerGroup(parent, c)](#new_TeamSpeakServerGroup_new)
    * [.getSGID()](#TeamSpeakServerGroup+getSGID) ⇒ <code>number</code>
    * [.del(force)](#TeamSpeakServerGroup+del) ⇒ <code>Promise</code>
    * [.copy([tsgid], [type], [name])](#TeamSpeakServerGroup+copy) ⇒ <code>Promise</code>
    * [.rename(name)](#TeamSpeakServerGroup+rename) ⇒ <code>Promise</code>
    * [.permList([permsid])](#TeamSpeakServerGroup+permList) ⇒ <code>Promise</code>
    * [.addPerm(perm, value, [permsid], [skip], [negate])](#TeamSpeakServerGroup+addPerm) ⇒ <code>Promise</code>
    * [.delPerm(perm, [permsid])](#TeamSpeakServerGroup+delPerm) ⇒ <code>Promise</code>
    * [.addClient(cldbid)](#TeamSpeakServerGroup+addClient) ⇒ <code>Promise</code>
    * [.delClient(cldbid)](#TeamSpeakServerGroup+delClient) ⇒ <code>Promise</code>
    * [.clientList()](#TeamSpeakServerGroup+clientList) ⇒ <code>Promise</code>
    * [.getIcon()](#TeamSpeakServerGroup+getIcon) ⇒ <code>Promise</code>
    * [.getIconName()](#TeamSpeakServerGroup+getIconName) ⇒ <code>Promise</code>

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

### teamSpeakServerGroup.del(force) ⇒ <code>Promise</code>
Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>number</code> | <code>0</code> | If set to 1 the ServerGroup will be deleted even when Clients are in it |

<a name="TeamSpeakServerGroup+copy"></a>

### teamSpeakServerGroup.copy([tsgid], [type], [name]) ⇒ <code>Promise</code>
Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tsgid] | <code>number</code> | <code>0</code> | The Target Group, 0 to create a new Group |
| [type] | <code>number</code> | <code>1</code> | The Type of the Group (0 = Query Group | 1 = Normal Group) |
| [name] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Name of the Group |

<a name="TeamSpeakServerGroup+rename"></a>

### teamSpeakServerGroup.rename(name) ⇒ <code>Promise</code>
Changes the name of the server group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the Group |

<a name="TeamSpeakServerGroup+permList"></a>

### teamSpeakServerGroup.permList([permsid]) ⇒ <code>Promise</code>
Displays a list of permissions assigned to the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [permsid] | <code>boolean</code> | <code>false</code> | If the permsid option is set to true the output will contain the permission names. |

<a name="TeamSpeakServerGroup+addPerm"></a>

### teamSpeakServerGroup.addPerm(perm, value, [permsid], [skip], [negate]) ⇒ <code>Promise</code>
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

### teamSpeakServerGroup.delPerm(perm, [permsid]) ⇒ <code>Promise</code>
Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| perm | <code>string</code> \| <code>number</code> |  | The permid or permsid |
| [permsid] | <code>boolean</code> | <code>false</code> | Whether a permsid or permid should be used |

<a name="TeamSpeakServerGroup+addClient"></a>

### teamSpeakServerGroup.addClient(cldbid) ⇒ <code>Promise</code>
Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be added to the Group |

<a name="TeamSpeakServerGroup+delClient"></a>

### teamSpeakServerGroup.delClient(cldbid) ⇒ <code>Promise</code>
Removes a client specified with cldbid from the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| cldbid | <code>number</code> | The Client Database ID which should be removed from the Group |

<a name="TeamSpeakServerGroup+clientList"></a>

### teamSpeakServerGroup.clientList() ⇒ <code>Promise</code>
Displays the IDs of all clients currently residing in the server group.

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIcon"></a>

### teamSpeakServerGroup.getIcon() ⇒ <code>Promise</code>
Returns a Buffer with the Icon of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServerGroup+getIconName"></a>

### teamSpeakServerGroup.getIconName() ⇒ <code>Promise</code>
Gets the Icon Name of the Server Group

**Kind**: instance method of [<code>TeamSpeakServerGroup</code>](#TeamSpeakServerGroup)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  
