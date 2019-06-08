/**
 * @file ChannelGroup.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * @typedef {import("../TeamSpeak3")} TeamSpeak3
 * @typedef {import("../helper/types").ChannelGroupListResponse} ChannelGroupListResponse
 * @typedef {import("../helper/types").ChannelGroupCopyResponse} ChannelGroupCopyResponse
 * @typedef {import("../helper/types").PermListResponse} PermListResponse
 * @typedef {import("../helper/types").ChannelGroupClientListResponse} ChannelGroupClientListResponse
 * @ignore
 */


/**
 * Class representing a TeamSpeak ChannelGroup
 * @extends Abstract
 */
class TeamSpeakChannelGroup extends Abstract {

  /**
   * Creates a TeamSpeak Channel Group
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ChannelGroupListResponse} list response from the channelgrouplist command
   */
  constructor(parent, list) {
    super(parent, list, "channelgroup")
  }

  /** @type {number} */
  get cgid() {
    return super.getPropertyByName("cgid")
  }

  /** @type {string} */
  get name() {
    return super.getPropertyByName("name")
  }

  /** @type {number} */
  get type() {
    return super.getPropertyByName("type")
  }

  /** @type {number} */
  get iconid() {
    return super.getPropertyByName("iconid")
  }

  /** @type {number} */
  get savedb() {
    return super.getPropertyByName("savedb")
  }

  /** @type {number} */
  get sortid() {
    return super.getPropertyByName("sortid")
  }

  /** @type {number} */
  get namemode() {
    return super.getPropertyByName("namemode")
  }

  /** @type {number} */
  get nModifyp() {
    return super.getPropertyByName("n_modifyp")
  }

  /** @type {number} */
  get nMemberAddp() {
    return super.getPropertyByName("n_member_addp")
  }

  /** @type {number} */
  get nMemberRemovep() {
    return super.getPropertyByName("n_member_removep")
  }


  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @async
   * @param {number} [force=0] if set to 1 the channelgroup will be deleted even when clients are in it
   * @return {Promise} resolves on success
   */
  del(force) {
    return super.getParent().deleteChannelGroup(this.cgid, force)
  }


  /**
   * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @async
   * @param {number} [tcgid=0] the target group, 0 to create a new group
   * @param {number} [type] the type of the group (0 = Template Group | 1 = Normal Group)
   * @param {string} [name] name of the group
   * @return {Promise<ChannelGroupCopyResponse>}
   */
  copy(tcgid, type, name) {
    return super.getParent().channelGroupCopy(this.cgid, tcgid, type, name)
  }


  /**
   * Changes the name of the channel group
   * @async
   * @param {string} name name of the group
   * @return {Promise} resolves on success
   */
  rename(name) {
    return super.getParent().channelGroupRename(this.cgid, name)
  }


  /**
   * Displays a list of permissions assigned to the channel group specified with cgid.
   * @async
   * @param {boolean} [permsid=false] if the permsid option is set to true the output will contain the permission names
   * @return {Promise<PermListResponse[]>}
   */
  permList(permsid = false) {
    return super.getParent().channelGroupPermList(this.cgid, permsid)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @async
   * @param {string|number} perm the permid or permsid
   * @param {number} value value of the Permission
   * @param {number} [skip=0] whether the skip flag should be set
   * @param {number} [negate=0] whether the negate flag should be set
   * @return {Promise} resolves on success
   */
  addPerm(perm, value, skip = 0, negate = 0) {
    return super.getParent().channelGroupAddPerm(this.cgid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
   * @async
   * @param {string|number} perm the permid or permsid
   * @return {Promise} resolves on success
   */
  delPerm(perm) {
    return super.getParent().channelGroupDelPerm(this.cgid, perm)
  }


  /**
   * Sets the channel group of a client
   * @async
   * @param {number} cid the channel in which the client should be assigned the Group
   * @param {number} cldbid the client database id which should be added to the Group
   * @return {Promise} resolves on success
   */
  setClient(cid, cldbid) {
    return super.getParent().setClientChannelGroup(this.cgid, cid, cldbid)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @async
   * @param {number} [cid] the channel id
   * @return {Promise<ChannelGroupClientListResponse[]>}
   */
  clientList(cid) {
    return super.getParent().channelGroupClientList(this.cgid, cid)
  }



  /**
   * Returns a Buffer with the Icon of the Channel Group
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the ChannelGroup Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Icon Name of the Channel Group
   * @async
   * @return {Promise<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakChannelGroup