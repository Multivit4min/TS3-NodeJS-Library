# Changelog

### 2.2.0 - 31.10.2019
+ add createSnapshot()
+ add deploySnapshot()
* rewrote some internal function in order to be parse snapshot commands

### 2.1.0 - 21.09.2019
+ added event `tokenused` thanks to xIAlexanderIx for the pull request

### 2.0.2 - 04.08.2019
* changed property `client_flag_avatar` to get now really parsed as a string thanks to KhaledSoliman

### 2.0.1 - 04.08.2019
* fixed a bug in getAvatar() which did not resolve on error
* changed property `client_flag_avatar` to get parsed as a string instead of a number

### 2.0.0 - 22.07.2019
+ added method `TeamSpeak.connect()` in order to be able to connect via a Promise wrapper to a Server
+ added `listenAddress` to connection parameters
* rewrote code in `typescript`
* switch testing framework to `jest`
* switch documentation framework to `typedoc`
- removed all deprecated methods
- removed support for client events

### 1.16.1 - 22.07.2019
+ add -virtual flag to use command
* updated dependencies

### 1.16.0 - 25.06.2019
+ added TeamSpeak3#serverTempPasswordAdd()
+ added TeamSpeak3#serverTempPasswordDel()
+ added TeamSpeak3#serverTempPasswordDel()
+ added TeamSpeak3#clientAddServerGroup() (available in server 3.9.0)
+ added TeamSpeak3#clientDelServerGroup() (available in server 3.9.0)
+ added TeamSpeakClient#addGroups() to add multiple groups
+ added TeamSpeakClient#delGroups() to delete multiple groups
* added deprecation warning for TeamSpeakClient#serverGroupAdd()
* added deprecation warning for TeamSpeakClient#serverGroupDel()
* changed output format of clientdbinfo and clientinfo to an array response in order to allow info for multiple clients
- removed type icon_id from channeledit command (removed in server 3.9.0)
- less strict type checking for teamspeak connection configuration

### 1.15.0 - 08.06.2019
+ added pagination parameter to TeamSpeak3#banList for server version 3.8.0
+ added deprecation warning to Abstract#getCache()
+ added tokencustomset parameter to TeamSpeak3#privilegekeyadd()
+ added TeamSpeak3#forceQuit() method
+ library supports now intellisense autocomplete
+ added detailed response documentation for each query command
* removed some unnecessary Promises
* fixed TeamSpeak3#messageAdd parameter
* fixed a non catchable error when connecting with ssh to a server
* get client properties from clientlist when teamspeak event clientconnect gets fired
* improved documentation for Client/Server/Channel/... getters
* added nearly all types
* changed behaviour of the return value from TeamSpeak3#execute to always return an array with the responses

### 1.14.0 - 24.5.2019
+ added possibility to ban clients using the mytsid
+ added TeamSpeak3#ban method
- deprecated TeamSpeak3#banAdd method

### 1.13.1 - 19.4.2019
* fixed `null` type when adding it as flag

### 1.13.0 - 13.4.2019
* improved general filetransfer
	* added fileDownload method
	* improved optional parameters like cpw always requires an empty string
* added method `toJSON()` to the Abstract class in order to make a client class stringifyable
* added new way to read cached items from a client to make it more like the javascript way
	
	for examle on a client class the property `client_is_channel_commander` will translate to `isChannelCommander` it will remove the `client_` prefix and after each subsequent underscore it will remove the underscore and and make the next character to an UpperCase char. 
	Side Note: only properties which are readable from clientlist, channellist, ... are available like that

	```javascript
	//before
	client.getCache().client_unique_identifier
	client.getCache().client_nickname
	client.getCache().client_is_channel_commander
	channel.getCache().channel_flag_permanent
	channel.getCache().channel_name
	//now
	client.uniqueIdentifier
	client.nickname
	client.isChannelCommander
	channel.flagPermanent
	channel.name
	```
* added FileTransfer to automated tests

### 1.12.5 - 10.3.2019
* fixed a possible memory leak when remove clients/channels/etc from the teamspeak cache object - thanks to elipeF for reporting

### 1.12.4 - 6.2.2019
* changes to all *List Commands to return an array
  
### 1.12.3 - 4.2.2019
* fixed event channelcreate
* refactored code to use .eslintrc.json

### 1.12.2 - 30.1.2019
* fixed privilegekeyadd thanks to IronicPickle for the detailed report

### 1.12.1 - 21.1.2019
* added getID to channel property

### 1.12.0 - 15.1.2019
* update to TeamSpeak Server Version 3.6.0
* added queryloginadd command
* added querylogindel command
* added queryloginlist command
* updated dependencies

### 1.11.3 - 12.12.2018
* fixed invalid serverid upon connect for teamspeak servers < 3.5.0 thanks to Janl1

### 1.11.2 - 14.11.2018
* changed requires to not use \_\_dirname anymore
* removed finally in initialization in order to support older nodejs versions

### 1.11.1 - 4.11.2018
* added method channelSetPerms

### 1.11.0 - 4.11.2018
* added possibility to provide multiple options within a command, this should fix issue #26

### 1.10.3 - 12.10.2018
* fixed errors in handling of socket closing, correct ResponseError Object should now get emitted
* added parameter readyTimeout to prematurely close a connection while its still connecting

### 1.10.2 - 1.10.2018
* added ip parameter to clientList
* added initial variable for this.\_data in ssh
* fixed close event not displaying correct error data

### 1.10.1 - 22.9.2018
* fixed typo in ssh keepalive

### 1.10 - 22.9.2018
* added function channelGroupPrivilegeKeyAdd
* added function serverGroupPrivilegeKeyAdd
* fixed upercase function names for
	* privilege**k**eyList > privilege**K**eyList
	* privilege**k**eyAdd > privilege**K**eyAdd
	* privilege**k**eyDelete > privilege**K**eyDelete
	* privilege**k**eyUse > privilege**K**eyUse