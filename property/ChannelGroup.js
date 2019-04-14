/**
 * @file ChannelGroup.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * Class representing a TeamSpeak ChannelGroup
 * @extends Abstract
 * @class
 */
class TeamSpeakChannelGroup extends Abstract {

  /**
   * Creates a TeamSpeak Channel Group
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
   * retrieves the namespace of this class
   * @returns {string} the current namespace
   */
  getNameSpace() {
    return "channelgroup"
  }


  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @version 1.0
   * @async
   * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
   * @return {Promise.<object>}
   */
  del(force) {
    return super.getParent().deleteChannelGroup(this._static.cgid, force)
  }


  /**
   * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @version 1.0
   * @async
   * @param {number} [tcgid=0] - The Target Group, 0 to create a new Group
   * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
   * @param {(string|boolean)} [name=false] - Name of the Group
   * @return {Promise.<object>}
   */
  copy(tcgid, type, name) {
    return super.getParent().channelGroupCopy(this._static.cgid, tcgid, type, name)
  }


  /**
   * Changes the name of the channel group
   * @version 1.0
   * @async
   * @param {string} name - Name of the Group
   * @return {Promise.<object>}
   */
  rename(name) {
    return super.getParent().channelGroupRename(this._static.cgid, name)
  }


  /**
   * Displays a list of permissions assigned to the channel group specified with cgid.
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @return {Promise.<object[]>}
   */
  permList(permsid = false) {
    return super.getParent().channelGroupPermList(this._static.cgid, permsid)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @return {Promise.<object>}
   */
  addPerm(perm, value, skip = 0, negate = 0) {
    return super.getParent().channelGroupAddPerm(this._static.cgid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @param {boolean} [permsid=false] - Whether a permsid or permid should be used
   * @return {Promise.<object>}
   */
  delPerm(perm) {
    return super.getParent().channelGroupDelPerm(this._static.cgid, perm)
  }


  /**
   * Sets the channel group of a client
   * @version 1.0
   * @async
   * @param {number} cid - The Channel in which the Client should be assigned the Group
   * @param {number} cldbid - The Client Database ID which should be added to the Group
   * @return {Promise.<object>}
   */
  setClient(cid, cldbid) {
    return super.getParent().setClientChannelGroup(this._static.cgid, cid, cldbid)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @version 1.0
   * @async
   * @param {number} [cid] - The Channel ID
   * @return {Promise.<object>}
   */
  clientList(cid) {
    return super.getParent().channelGroupClientList(this._static.cgid, cid)
  }



  /**
   * Returns a Buffer with the Icon of the Channel Group
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Promise with the binary data of the ChannelGroup Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Icon Name of the Channel Group
   * @version 1.0
   * @async
   * @return {Promise.<object>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakChannelGroup