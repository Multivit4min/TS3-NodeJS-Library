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
    * [.getCache()](#Abstract+getCache) ⇒ <code>object</code>
    * [.updateCache()](#Abstract+updateCache) ⇒ <code>object</code>
    * [.getParent()](#Abstract+getParent) ⇒ <code>object</code>
    * [.toArray()](#Abstract+toArray) ⇒ <code>object</code>

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

### abstract.getCache() ⇒ <code>object</code>
Returns the data from the last List Command

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+updateCache"></a>

### abstract.updateCache() ⇒ <code>object</code>
Sets the Data from the Last List Command

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+getParent"></a>

### abstract.getParent() ⇒ <code>object</code>
Returns the Parent Class

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+toArray"></a>

### abstract.toArray() ⇒ <code>object</code>
Transforms an Input to an Array

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Async**:   
**Version**: 1.0  
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
    * [.getParent()](#Abstract+getParent) ⇒ <code>TeamSpeak3</code>
    * [.toArray()](#Abstract+toArray) ⇒ <code>Array.&lt;any&gt;</code>

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

### abstract.getParent() ⇒ <code>TeamSpeak3</code>
Returns the Parent Class

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+toArray"></a>

### abstract.toArray() ⇒ <code>Array.&lt;any&gt;</code>
Transforms an Input to an Array

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Async**:   
**Version**: 1.0  
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
    * [.getParent()](#Abstract+getParent) ⇒ <code>TeamSpeak3</code>
    * [.toArray()](#Abstract+toArray) ⇒ <code>Array.&lt;any&gt;</code>

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

### abstract.getParent() ⇒ <code>TeamSpeak3</code>
Returns the Parent Class

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Version**: 1.0  
<a name="Abstract+toArray"></a>

### abstract.toArray() ⇒ <code>Array.&lt;any&gt;</code>
Transforms an Input to an Array

**Kind**: instance method of [<code>Abstract</code>](#Abstract)  
**Async**:   
**Version**: 1.0  
