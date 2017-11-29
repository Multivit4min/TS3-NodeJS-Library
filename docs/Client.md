<a name="TeamSpeakClient"></a>

## TeamSpeakClient ⇐ <code>TeamSpeakProperty</code>
Class representing a TeamSpeak Client

**Kind**: global class  
**Extends**: <code>TeamSpeakProperty</code>  

* [TeamSpeakClient](#TeamSpeakClient) ⇐ <code>TeamSpeakProperty</code>
    * [new TeamSpeakClient(parent, c)](#new_TeamSpeakClient_new)
    * [.getDBID()](#TeamSpeakClient+getDBID) ⇒ <code>number</code>
    * [.getID()](#TeamSpeakClient+getID) ⇒ <code>number</code>
    * [.getUID()](#TeamSpeakClient+getUID) ⇒ <code>string</code>
    * [.isQuery()](#TeamSpeakClient+isQuery) ⇒ <code>boolean</code>
    * [.getInfo()](#TeamSpeakClient+getInfo) ⇒ <code>Promise</code>
    * [.getDBInfo()](#TeamSpeakClient+getDBInfo) ⇒ <code>Promise</code>
    * [.kickFromServer(msg)](#TeamSpeakClient+kickFromServer) ⇒ <code>Promise</code>
    * [.kickFromChannel(msg)](#TeamSpeakClient+kickFromChannel) ⇒ <code>Promise</code>
    * [.move(cid, [cpw])](#TeamSpeakClient+move) ⇒ <code>Promise</code>
    * [.serverGroupAdd(sgid)](#TeamSpeakClient+serverGroupAdd) ⇒ <code>Promise</code>
    * [.serverGroupDel(sgid)](#TeamSpeakClient+serverGroupDel) ⇒ <code>Promise</code>
    * [.poke(msg)](#TeamSpeakClient+poke) ⇒ <code>Promise</code>
    * [.message(msg)](#TeamSpeakClient+message) ⇒ <code>Promise</code>

<a name="new_TeamSpeakClient_new"></a>

### new TeamSpeakClient(parent, c)
Creates a TeamSpeak Client


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| c | <code>object</code> | This holds Basic Client data |
| c.clid | <code>number</code> | The Client ID of the TeamSpeak Client |
| c.client_database_id | <code>number</code> | The Client Database ID |
| c.client_type | <code>number</code> | The Client Type |

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
<a name="TeamSpeakClient+getInfo"></a>

### teamSpeakClient.getInfo() ⇒ <code>Promise</code>
Returns General Info of the Client, requires the Client to be online

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Returns the Client Info  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+getDBInfo"></a>

### teamSpeakClient.getDBInfo() ⇒ <code>Promise</code>
Returns the Clients Database Info

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Returns the Client Database Info  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakClient+kickFromServer"></a>

### teamSpeakClient.kickFromServer(msg) ⇒ <code>Promise</code>
Kicks the Client from the Server

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The Message the Client should receive when getting kicked |

<a name="TeamSpeakClient+kickFromChannel"></a>

### teamSpeakClient.kickFromChannel(msg) ⇒ <code>Promise</code>
Kicks the Client from their currently joined Channel

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The Message the Client should receive when getting kicked (max 40 Chars) |

<a name="TeamSpeakClient+move"></a>

### teamSpeakClient.move(cid, [cpw]) ⇒ <code>Promise</code>
Moves the Client to a different Channel

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cid | <code>number</code> |  | Channel ID in which the Client should get moved |
| [cpw] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The Channel Password |

<a name="TeamSpeakClient+serverGroupAdd"></a>

### teamSpeakClient.serverGroupAdd(sgid) ⇒ <code>Promise</code>
Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>string</code> | The Server Group ID which the Client should be added to |

<a name="TeamSpeakClient+serverGroupDel"></a>

### teamSpeakClient.serverGroupDel(sgid) ⇒ <code>Promise</code>
Removes the client from the server group specified with sgid.

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| sgid | <code>string</code> | The Server Group ID which the Client should be removed from |

<a name="TeamSpeakClient+poke"></a>

### teamSpeakClient.poke(msg) ⇒ <code>Promise</code>
Pokes the Client with a certain message

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message the Client should receive |

<a name="TeamSpeakClient+message"></a>

### teamSpeakClient.message(msg) ⇒ <code>Promise</code>
Sends a textmessage to the Client

**Kind**: instance method of [<code>TeamSpeakClient</code>](#TeamSpeakClient)  
**Returns**: <code>Promise</code> - Promise Object  
**Async**:   
**Version**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message the Client should receive |

