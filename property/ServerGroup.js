/**
 * @file ServerGroup.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * Class representing a TeamSpeak ServerGroup
 * @extends Abstract
 * @class
 */
class TeamSpeakServerGroup extends Abstract {

  /**
   * Creates a TeamSpeak Server Group
   * @version 1.0
   * @param {object} parent - The Parent Object which is a TeamSpeak Instance
   * @param {object} s - This holds Basic ServerGroup Data
   * @param {number} s.sgid - The Server Group ID
   */
  constructor(parent, s) {
    super(parent, s, "servergroup")
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
   * @returns {Promise.<object>}
   */
  del(force = 0) {
    return super.getParent().serverGroupDel(this._static.sgid, force)
  }


  /**
   * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
   * @version 1.0
   * @async
   * @param {number} [tsgid=0] - The Target Group, 0 to create a new Group
   * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
   * @param {(string|boolean)} [name=false] - Name of the Group
   * @returns {Promise.<object>}
   */
  copy(tsgid, type, name) {
    return super.getParent().serverGroupCopy(this._static.sgid, tsgid, type, name)
  }


  /**
   * Changes the name of the server group
   * @version 1.0
   * @async
   * @param {string} name - Name of the Group
   * @returns {Promise.<object>}
   */
  rename(name) {
    return super.getParent().serverGroupRename(this._static.sgid, name)
  }


  /**
   * Displays a list of permissions assigned to the server group specified with sgid.
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @returns {Promise.<object>}
   */
  permList(permsid) {
    return super.getParent().serverGroupPermList(this._static.sgid, permsid)
  }


  /**
   * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @returns {Promise.<object>}
   */
  addPerm(perm, value, skip, negate) {
    return super.getParent().serverGroupAddPerm(this._static.sgid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @returns {Promise.<object>}
   */
  delPerm(perm) {
    return super.getParent().serverGroupDelPerm(this._static.sgid, perm)
  }


  /**
   * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be added to the Group
   * @returns {Promise.<object>}
   */
  addClient(cldbid) {
    return super.getParent().serverGroupAddClient(cldbid, this._static.sgid)
  }


  /**
   * Removes a client specified with cldbid from the server group.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be removed from the Group
   * @returns {Promise.<object>}
   */
  delClient(cldbid) {
    return super.getParent().serverGroupDelClient(cldbid, this._static.sgid)
  }


  /**
   * Displays the IDs of all clients currently residing in the server group.
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  clientList() {
    return super.getParent().serverGroupClientList(this._static.sgid)
  }



  /**
   * Returns a Buffer with the Icon of the Server Group
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Promise with the binary data of the ServerGroup Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Icon Name of the Server Group
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakServerGroup