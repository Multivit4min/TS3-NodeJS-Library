# Changelog

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
