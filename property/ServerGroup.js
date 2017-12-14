/** 
 * @file ServerGroup.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com> 
 */ 
const TeamSpeakProperty = require(__dirname+"/TeamSpeakProperty") 
 /**
 * Class representing a TeamSpeak ServerGroup
 * @extends TeamSpeakProperty
 * @class
 */
class TeamSpeakServerGroup extends TeamSpeakProperty {
    /** 
     * Creates a TeamSpeak Server Group
     * @constructor 
     * @version 1.0 
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance
     * @param {object} c - This holds Basic ServerGroup Data
     * @param {number} c.sgid - The Server Group ID
     */ 
    constructor(parent, s) {
        super(parent, s)
        this._static = {
            sgid: s.sgid
        }
    }

    
    /** 
     * Returns the Server Group ID
     * @version 1.0 
     * @return {number} 
     */ 
    getSGID() {
        return this._static.sgid
    }

    
    /** 
     * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
     * @version 1.0 
     * @async
     * @param {number} force - If set to 1 the ServerGroup will be deleted even when Clients are in it
     * @return {Promise} 
     */ 
    del(force = 0) {
        return super.execute(
            "servergroupdel", 
            {sgid: this._static.sgid, force: force}
        )
    }

    
    /** 
     * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
     * @version 1.0 
     * @async
     * @param {number} [tsgid=0] - The Target Group, 0 to create a new Group
     * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
     * @param {(string|boolean)} [name=false] - Name of the Group
     * @return {Promise} 
     */ 
    copy(tsgid = 0, type = 1, name = false) {
        var prop = {ssgid: this._static.sgid, tsgid: tsgid, type: type}
        if (typeof name === "string") 
            prop.name = name
        return super.execute("servergroupcopy", prop)
    }

    
    /** 
     * Changes the name of the server group
     * @version 1.0 
     * @async
     * @param {string} name - Name of the Group
     * @return {Promise} 
     */ 
    rename(name) {
        return super.execute("servergrouprename", {sgid: this._static.sgid, name: name})
    }

    
    /** 
     * Displays a list of permissions assigned to the server group specified with sgid. 
     * @version 1.0 
     * @async
     * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
     * @return {Promise} 
     */ 
    permList(permsid = false) {
        return super.execute(
            "servergrouppermlist", 
            {sgid: this._static.sgid},
            [(permsid) ? "-permsid" : null]
        ).then(super.toArray)
    }

    
    /** 
     * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
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
        var prop = {sgid: this._static.sgid}
        prop[(permsid) ? "permsid": "permid"] = perm
        prop.permvalue = value
        prop.permskip = skip
        prop.permnegated = negate
        return super.execute("servergroupaddperm", prop)
    }

    
    /** 
     * Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.
     * @version 1.0 
     * @async
     * @param {(string|number)} perm - The permid or permsid
     * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
     * @return {Promise} 
     */ 
    delPerm(perm, permsid = false) {
        var prop = {sgid: this._static.sgid}
        prop[(permsid) ? "permsid" : "permid"] = perm
        return super.execute("servergroupdelperm", prop)
    }

    
    /** 
     * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
     * @version 1.0 
     * @async
     * @param {number} cldbid - The Client Database ID which should be added to the Group
     * @return {Promise} 
     */ 
    addClient(cldbid) {
        return super.execute(
            "servergroupaddclient",
            {sgid: this._static.sgid, cldbid: cldbid}
        )
    }

    
    /** 
     * Removes a client specified with cldbid from the server group.
     * @version 1.0 
     * @async
     * @param {number} cldbid - The Client Database ID which should be removed from the Group
     * @return {Promise} 
     */ 
    delClient(cldbid) {
        return super.execute(
            "servergroupdelclient",
            {sgid: this._static.sgid, cldbid: cldbid}
        )
    }

    
    /** 
     * Displays the IDs of all clients currently residing in the server group.
     * @version 1.0 
     * @async
     * @return {Promise} 
     */ 
    clientList() {
        return super.execute(
            "servergroupclientlist",
            {sgid: this._static.sgid},
            ["-names"]
        )
    }



    /**
     * Returns a Buffer with the Icon of the Server Group
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIcon() {
        return this.getIconName().then(name => super.getParent().getIcon(name))
    }



    /**
     * Gets the Icon Name of the Server Group
     * @version 1.0
     * @async
     * @returns {Promise} Promise Object
     */
    getIconName() {
        return super.getParent().getIconName(this.permList(true))
    }
    

}

module.exports = TeamSpeakServerGroup