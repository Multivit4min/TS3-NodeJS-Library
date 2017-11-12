/** 
 * @file Server.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */ 
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty")
const Promise = require("bluebird")

 /**
 * Class representing a TeamSpeak Server
 * @extends TeamSpeakProperty
 * @class
 */
class TeamSpeakServer extends TeamSpeakProperty {
    /** 
     * Creates a TeamSpeak Server
     * @constructor 
     * @version 1.0 
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance
     * @param {object} s - This holds Basic ServerGroup Data
     * @param {number} s.virtualserver_id - The Server ID
     */ 
    constructor(parent, s) {
        super(parent)
        this._static = {
            sid: s.virtualserver_id,
        }
    }


    /** 
     * Selects the Virtual Server
     * @version 1.0 
     * @return {Promise} 
     */ 
    use() {
        return this.execute("use", {sid: this._static.sid})
    }


    /** 
     * Gets basic Infos about the Server
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    getInfo() {
        return this.execute(
            "serverlist", ["-uid", "-all"], true
        ).then(servers => {
            return super.filter(servers, {virtualserver_id: this._static.sid})
        }).then(servers => {
            return new Promise((fulfill, reject) => {
                if (servers.length == 1)
                    return fulfill(servers[0])
                reject()
            })
        })
    }


    /** 
     * Deletes the Server.
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    del() {
        return super.execute("serverdelete", {sid: this._static.sid})
    }

    
    /** 
     * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    start() {
        return super.execute("serverstart", {sid: this._static.sid})
    }

    
    /** 
     * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    stop() {
        return super.execute("serverstop", {sid: this._static.sid})
    }

    

}

module.exports = TeamSpeakServer