/** 
 * @file Channel.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */ 
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty")

 /**
 * Class representing a TeamSpeak Channel
 * @extends TeamSpeakProperty
 * @class
 */
class TeamSpeakChannel extends TeamSpeakProperty {
    /** 
     * Creates a TeamSpeak Channel
     * @constructor 
     * @version 1.0 
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance
     * @param {object} c - This holds Basic Channel Data
     * @param {number} c.cid - The Channel ID
     */ 
    constructor(parent, c) {
        super(parent)
        this._static = {
            cid: c.cid
        }
    }

    
    /** 
     * Displays detailed configuration information about a channel including ID, topic, description, etc.
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    channelInfo() {
        return super.execute(
            "channelinfo", 
            {cid: this._static.cid}, 
            true
        )
    }
    
    
    /** 
     * Moves a channel to a new parent channel with the ID cpid. If order is specified, the channel will be sorted right under the channel with the specified ID. If order is set to 0, the channel will be sorted right below the new parent.
     * @version 1.0 
     * @async
     * @param {number} cpid - Channel Parent ID
     * @param {number} [order] - Channel Sort Order
     * @return {Promise} 
     */ 
    move(cpid, order = 0) {
        return super.execute(
            "channelmove", 
            {cid: this._static.cid, cpid: cpid, order: order}
        )
    }
    
    
    /** 
     * Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.
     * @version 1.0 
     * @async
     * @param {number} force - If set to 1 the Channel will be deleted even when Clients are in it
     * @return {Promise} 
     */ 
    del(force = 0) {
        return super.execute(
            "channeldelete", 
            {cid: this._static.cid, force: force}
        )
    }
    
    
    /** 
     * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
     * @version 1.0 
     * @async
     * @param {number} properties - The Properties of the Channel which should get changed
     * @return {Promise} 
     */ 
    edit(properties) {
        properties.cid = this._static.cid
        return super.execute("channeledit", properties)
    }
    
    
    /** 
     * Displays a list of permissions defined for a channel.
     * @version 1.0 
     * @async
     * @param {boolean} permsid - Whether the Perm SID should be displayed aswell
     * @return {Promise} 
     */ 
    permList(permsid = false) {     
        return super.execute(
            "channelpermlist", 
            {cid: this._static.cid},
            (permsid) ? ["-permsid"] : null
        )
    }
    
    
    /** 
     * Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {number} value - The Value which should be set
     * @param {boolean} sid - If the given Perm is a permsid
     * @return {Promise} 
     */ 
    setPerm(perm, value, sid = false) {
        var prop = {cid: this._static.cid}
        prop[(sid) ? "permsid" : "permid"] = perm
        prop.permvalue = value
        return super.execute("channeladdperm", prop)
    }
    
    
    /** 
     * Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} sid - If the given Perm is a permsid
     * @return {Promise} 
     */ 
    delPerm(perm, sid = false) {
        var prop = {cid: this._static.cid}
        prop[(sid) ? "permsid" : "permid"] = perm
        return super.execute("channeldelperm", prop)
    }
    
    
    /** 
     * Gets a List of Clients in the current Channel
     * @version 1.0 
     * @async
     * @param {object} filter - The Filter Object
     * @return {Promise} 
     */ 
    getClients(filter = {}) {
        filter.cid = this._static.cid
        return super._parent.clientList(filter)
    }

}

module.exports = TeamSpeakChannel