# Changelog

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
