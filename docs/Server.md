<a name="TeamSpeakServer"></a>

## TeamSpeakServer ⇐ <code>TeamSpeakProperty</code>
Class representing a TeamSpeak Server

**Kind**: global class  
**Extends**: <code>TeamSpeakProperty</code>  

* [TeamSpeakServer](#TeamSpeakServer) ⇐ <code>TeamSpeakProperty</code>
    * [new TeamSpeakServer(parent, s)](#new_TeamSpeakServer_new)
    * [.use()](#TeamSpeakServer+use) ⇒ <code>Promise</code>
    * [.getInfo()](#TeamSpeakServer+getInfo) ⇒ <code>Promise</code>
    * [.del()](#TeamSpeakServer+del) ⇒ <code>Promise</code>
    * [.start()](#TeamSpeakServer+start) ⇒ <code>Promise</code>
    * [.stop()](#TeamSpeakServer+stop) ⇒ <code>Promise</code>

<a name="new_TeamSpeakServer_new"></a>

### new TeamSpeakServer(parent, s)
Creates a TeamSpeak Server


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| s | <code>object</code> | This holds Basic ServerGroup Data |
| s.virtualserver_id | <code>number</code> | The Server ID |

<a name="TeamSpeakServer+use"></a>

### teamSpeakServer.use() ⇒ <code>Promise</code>
Selects the Virtual Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="TeamSpeakServer+getInfo"></a>

### teamSpeakServer.getInfo() ⇒ <code>Promise</code>
Gets basic Infos about the Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+del"></a>

### teamSpeakServer.del() ⇒ <code>Promise</code>
Deletes the Server.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+start"></a>

### teamSpeakServer.start() ⇒ <code>Promise</code>
Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+stop"></a>

### teamSpeakServer.stop() ⇒ <code>Promise</code>
Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer"></a>

## TeamSpeakServer ⇐ <code>Abstract</code>
Class representing a TeamSpeak Server

**Kind**: global class  
**Extends**: <code>Abstract</code>  

* [TeamSpeakServer](#TeamSpeakServer) ⇐ <code>Abstract</code>
    * [new TeamSpeakServer(parent, s)](#new_TeamSpeakServer_new)
    * [.use()](#TeamSpeakServer+use) ⇒ <code>Promise</code>
    * [.getInfo()](#TeamSpeakServer+getInfo) ⇒ <code>Promise</code>
    * [.del()](#TeamSpeakServer+del) ⇒ <code>Promise</code>
    * [.start()](#TeamSpeakServer+start) ⇒ <code>Promise</code>
    * [.stop()](#TeamSpeakServer+stop) ⇒ <code>Promise</code>

<a name="new_TeamSpeakServer_new"></a>

### new TeamSpeakServer(parent, s)
Creates a TeamSpeak Server


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>object</code> | The Parent Object which is a TeamSpeak Instance |
| s | <code>object</code> | This holds Basic ServerGroup Data |
| s.virtualserver_id | <code>number</code> | The Server ID |

<a name="TeamSpeakServer+use"></a>

### teamSpeakServer.use() ⇒ <code>Promise</code>
Selects the Virtual Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Version**: 1.0  
<a name="TeamSpeakServer+getInfo"></a>

### teamSpeakServer.getInfo() ⇒ <code>Promise</code>
Gets basic Infos about the Server

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+del"></a>

### teamSpeakServer.del() ⇒ <code>Promise</code>
Deletes the Server.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+start"></a>

### teamSpeakServer.start() ⇒ <code>Promise</code>
Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
<a name="TeamSpeakServer+stop"></a>

### teamSpeakServer.stop() ⇒ <code>Promise</code>
Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.

**Kind**: instance method of [<code>TeamSpeakServer</code>](#TeamSpeakServer)  
**Async**:   
**Version**: 1.0  
