/** 
 * @file ChannelGroup.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */ 
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty")
 
 /**
 * Class representing a TeamSpeak ChannelGroup
 * @extends TeamSpeakProperty
 * @class
 */
class TeamSpeakChannelGroup extends TeamSpeakProperty {
    /** 
     * Creates a TeamSpeak Channel Group
     * @constructor 
     * @version 1.0 
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance
     * @param {object} c - This holds Basic ServerGroup Data
     * @param {number} c.cgid - The Channel Group ID
     */ 
    constructor(parent, c) {
        super(parent, c)
        this._static = {
            cgid: c.cgid
        }
    }

    
    /** 
     * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
     * @version 1.0 
     * @async
     * @param {number} force - If set to 1 the Channel Group will be deleted even when Clients are in it
     * @return {Promise} 
     */ 
    del(force = 0) {
        return super.execute(
            "channelgroupdel", 
            {cgid: this._static.cgid, force: force}
        )
    }

    
    /** 
     * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tcgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
     * @version 1.0 
     * @async
     * @param {number} [tcgid=0] - The Target Group, 0 to create a new Group
     * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
     * @param {(string|boolean)} [name=false] - Name of the Group
     * @return {Promise} 
     */ 
    copy(tcgid = 0, type = 1, name = false) {
        var prop = {scgid: this._static.cgid, tcgid: tcgid, type: type}
        if (typeof name === "string") 
            prop.name = name
        return super.execute("channelgroupcopy", prop)
    }

    
    /** 
     * Changes the name of the channel group
     * @version 1.0 
     * @async
     * @param {string} name - Name of the Group
     * @return {Promise} 
     */ 
    rename(name) {
        return super.execute("channelgrouprename", {cgid: this._static.cgid, name: name})
    }

    
    /** 
     * Displays a list of permissions assigned to the channel group specified with cgid. 
     * @version 1.0 
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise} 
     */ 
    permList(permsid = false) {
        return super.execute(
            "channelgrouppermlist", 
            {cgid: this._static.cgid},
            [(permsid) ? "-permsid" : null]
        ).then(super.toArray)
    }


    /** 
     * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
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
        var prop = {cgid: this._static.cgid}
        prop[(permsid) ? "permsid": "permid"] = perm
        prop.permvalue = value
        prop.permskip = skip
        prop.permnegated = negate
        return super.execute("channelgroupaddperm", prop)
    }

    
    /** 
     * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @return {Promise} 
     */ 
    delPerm(perm, permsid = false) {
        var prop = {cgid: this._static.cgid}
        prop[(permsid) ? "permsid" : "permid"] = perm
        return super.execute("channelgroupdelperm", prop)
    }


    /** 
     * Sets the channel group of a client
     * @version 1.0 
     * @async
     * @param {number} cid - The Channel in which the Client should be assigned the Group
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @return {Promise} Group
     */ 
    setClient(cid, cldbid) {
        return super.execute(
            "setclientchannelgroup",
            {cgid: this._static.cgid, cldbid: cldbid, cid: cid}
        )
    }

    
    /** 
     * Displays the IDs of all clients currently residing in the channel group.
     * @version 1.0 
     * @async
     * @param {number} [cid] - The Channel ID
     * @param {number} [cldbid] - The Channel ID
     * @return {Promise} 
     */ 
    clientList(cid, cldbid) {
        var prop = {cgid: this._static.cgid}
        if (typeof cid == "number") prop.cid = cid
        if (typeof cldbid == "number") prop.cldbid = cldbid
        return super.execute(
            "channelgroupclientlist",
           prop
        )
    }



    /**
     * Returns a Buffer with the Icon of the Channel Group
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIcon() {
        return this.getIconName().then(name => super.getParent().getIcon(name))
    }



    /**
     * Gets the Icon Name of the Channel Group
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIconName() {
        return super.getParent().getIconName(this.permList(true))
    }
    

}

module.exports = TeamSpeakChannelGroup