/**
 * @file Client.js
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty")
const FileTransfer = require(__dirname+"/../transport/FileTransfer")
const Promise = require("bluebird")

 /**
 * Class representing a TeamSpeak Client
 * @extends TeamSpeakProperty
 * @class
 */
class TeamSpeakClient extends TeamSpeakProperty {
    /**
     * Creates a TeamSpeak Client
     * @constructor
     * @version 1.0
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance
     * @param {object} c - This holds Basic Client data
     * @param {number} c.clid - The Client ID of the TeamSpeak Client
     * @param {number} c.client_database_id - The Client Database ID
     * @param {number} c.client_type - The Client Type
     */
    constructor(parent, c) {
        super(parent, c)
        this._static = {
            uid: c.client_unique_identifier,
            clid: c.clid,
            dbid: c.client_database_id,
            type: c.client_type
        }
        super.on("clientmoved", ev => {
            if (ev.client.getID() !== this.getID()) return
            this.emit("move", ev.channel)
        })
        super.on("textmessage", ev => {
            if (ev.invoker.getID() !== this.getID()) return
            this.emit("message", ev.msg)
        })
        super.on("clientdisconnect", ev => {
            if (ev.clid !== this.getID()) return
            super.removeAllListeners()
            this.emit("disconnect")
        })
    }


    /**
     * Returns the Database ID of the Client
     * @version 1.0
     * @returns {number} Returns the Clients Database ID
     */
    getDBID() {
        return this._static.dbid
    }


    /**
     * Returns the Client ID
     * @version 1.0
     * @returns {number} Returns the Client ID
     */
    getID() {
        return this._static.clid
    }


    /**
     * Returns the Client Unique ID
     * @version 1.0
     * @returns {string} Returns the Client UniqueID
     */
    getUID() {
        return this._static.uid
    }


    /**
     * Evaluates if the Client is a Query Client or a normal Client
     * @version 1.0
     * @returns {boolean} true when the Client is a Server Query Client
     */
    isQuery() {
        return this._static.type == 1
    }


    /**
     * Retrieves a displayable Client Link for the TeamSpeak Chat
     * @version 1.0
     * @returns {string} returns the TeamSpeak Client URL as Link
     */
    getURL() {
        var nick = super.getCache().client_nickname
        return "[URL=client://"+this._static.cid+"/"+this._static.uid+"~"+encodeURIComponent(nick)+"]"+nick+"[/URL]"
    }


    /**
     * Returns General Info of the Client, requires the Client to be online
     * @version 1.0
     * @async
     * @returns {Promise} Returns the Client Info
     */
    getInfo() {
        return super.execute(
            "clientinfo",
            {clid: this._static.clid},
            true
        )
    }


    /**
     * Returns the Clients Database Info
     * @version 1.0
     * @async
     * @returns {Promise} Returns the Client Database Info
     */
    getDBInfo() {
        return super.execute(
            "clientdbinfo",
            {cldbid: this._static.dbid},
            true
        )
    }


    /**
     * Kicks the Client from the Server
     * @version 1.0
     * @async
     * @param {string} msg - The Message the Client should receive when getting kicked
     * @returns {Promise} Promise Object
     */
    kickFromServer(msg) {
        return super.execute(
            "clientkick",
            {clid: this._static.clid, reasonid: 5, reasonmsg: msg}
        )
    }


    /**
     * Kicks the Client from their currently joined Channel
     * @version 1.0
     * @async
     * @param {string} msg - The Message the Client should receive when getting kicked (max 40 Chars)
     * @returns {Promise} Promise Object
     */
    kickFromChannel(msg) {
        return super.execute(
            "clientkick",
            {clid: this._static.clid, reasonid: 4, reasonmsg: msg}
        )
    }


    /**
     * Moves the Client to a different Channel
     * @version 1.0
     * @async
     * @param {number} cid - Channel ID in which the Client should get moved
     * @param {string} [cpw=""] - The Channel Password
     * @returns {Promise} Promise Object
     */
    move(cid, cpw = "") {
        return super.execute(
            "clientmove",
            {clid: this._static.clid, cid: cid, cpw:cpw}
        )
    }


    /**
     * Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.
     * @version 1.0
     * @async
     * @param {string} sgid - The Server Group ID which the Client should be added to
     * @returns {Promise} Promise Object
     */
    serverGroupAdd(sgid) {
        return super.execute("servergroupaddclient", {sgid: sgid, cldbid: this._static.dbid})
    }


    /**
     * Removes the client from the server group specified with sgid.
     * @version 1.0
     * @async
     * @param {string} sgid - The Server Group ID which the Client should be removed from
     * @returns {Promise} Promise Object
     */
    serverGroupDel(sgid) {
        return super.execute("servergroupdelclient", {sgid: sgid, cldbid: this._static.dbid})
    }


    /**
     * Pokes the Client with a certain message
     * @version 1.0
     * @async
     * @param {string} msg - The message the Client should receive
     * @returns {Promise} Promise Object
     */
    poke(msg) {
        return super.execute(
            "clientpoke",
            {clid: this._static.clid, msg: msg}
        )
    }


    /**
     * Sends a textmessage to the Client
     * @version 1.0
     * @async
     * @param {string} msg - The message the Client should receive
     * @returns {Promise} Promise Object
     */
    message(msg) {
        return super.execute(
            "sendtextmessage",
            {targetmode: 1, target: this._static.clid, msg: msg}
        )
    }

    
    /** 
     * Displays a list of permissions defined for a client
     * @version 1.0 
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise} 
     */ 
    permList(permsid = false) {
        return super.execute(
            "clientpermlist",
            {cldbid: this._static.dbid},
            [(permsid) ? "-permsid" : null]
        ).then(super.toArray)
    }

    
    /** 
     * Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - Value of the Permission
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @param {number} [skip=0] - Whether the skip flag should be set
     * @param {number} [negate=0] - Whether the negate flag should be set
     * @return {Promise} 
     */ 
    addPerm(perm, value, permsid = false, skip = 0, negate = 0) {
        var prop = {cldbid: this._static.dbid}
        prop[(permsid) ? "permsid": "permid"] = perm
        prop.permvalue = value
        prop.permskip = skip
        prop.permnegated = negate
        return super.execute("clientaddperm", prop)
    }

    
    /** 
     * Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @return {Promise} 
     */ 
    delPerm(perm, permsid = false) {
        var prop = {sgid: this._static.sgid}
        prop[(permsid) ? "permsid" : "permid"] = perm
        return super.execute("clientdelperm", prop)
    }



    /**
     * Returns a Buffer with the Avatar of the User
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getAvatar() {
        return this.getAvatarName()
            .then(name => {
                return super.getParent()
                    .ftInitDownload({clientftfid: Math.floor(Math.random() * 10000), name: "/"+name})
            }).then(res => {
                return new FileTransfer(super.getParent()._config.host, res.port)
                    .download(res.ftkey, res.size)
            })   
    }



    /**
     * Returns a Buffer with the Icon of the Client
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIcon() {
        return this.getIconName().then(name => super.getParent().getIcon(name))
    }



    /**
     * Gets the Avatar Name of the Client
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getAvatarName() {
        return new Promise((fulfill, reject) => {
            this.getDBInfo()
                .then(data => fulfill("avatar_"+data.client_base64HashClientUID))
                .catch(reject)
        })
    }



    /**
     * Gets the Icon Name of the Client
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIconName() {
        return super.getParent().getIconName(this.permList(true))
    }



}


module.exports = TeamSpeakClient