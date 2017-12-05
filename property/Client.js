/**
 * @file Client.js
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty")
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
     * Evaluates if the Client is a Query Client or a normal Client
     * @version 1.0
     * @returns {boolean} true when the Client is a Server Query Client
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



}


module.exports = TeamSpeakClient
