/**
 * @file ChannelGroup.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * workaround for vscode intellisense and documentation generation
 *
 * @typedef {import("../TeamSpeak3")} TeamSpeak3
 * @typedef {import("./Client")} TeamSpeakClient
 * @typedef {import("../helper/types").ChannelGroupListResponse} ChannelGroupListResponse
 * @typedef {import("../helper/types").ChannelGroupCopyResponse} ChannelGroupCopyResponse
 * @typedef {import("../helper/types").PermListResponse} PermListResponse
 * @ignore
 */


/**
 * Class representing a TeamSpeak ChannelGroup
 * @extends Abstract
 */
class TeamSpeakChannelGroup extends Abstract {

  /**
   * Creates a TeamSpeak Channel Group
   * @version 1.0
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
   * @version 1.0
   * @async
   * @param {number} [force=0] - If set to 1 the Channel Group will be deleted even when Clients are in it
   * @return {Promise} resolves on success
   */
  del(force) {
    return super.getParent().deleteChannelGroup(this.cgid, force)
  }


  /**
   * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @version 1.0
   * @async
   * @param {number} [tcgid=0] - The Target Group, 0 to create a new Group
   * @param {number} [type] - The Type of the Group (0 = Template Group | 1 = Normal Group)
   * @param {string} [name] - Name of the Group
   * @return {Promise<ChannelGroupCopyResponse>}
   */
  copy(tcgid, type, name) {
    return super.getParent().channelGroupCopy(this.cgid, tcgid, type, name)
  }


  /**
   * Changes the name of the channel group
   * @version 1.0
   * @async
   * @param {string} name - Name of the Group
   * @return {Promise} resolves on success
   */
  rename(name) {
    return super.getParent().channelGroupRename(this.cgid, name)
  }


  /**
   * Displays a list of permissions assigned to the channel group specified with cgid.
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @return {Promise<PermListResponse[]>}
   */
  permList(permsid = false) {
    return super.getParent().channelGroupPermList(this.cgid, permsid)
  }


  /**
   * Adds a specified permissions to the channel group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @return {Promise} resolves on success
   */
  addPerm(perm, value, skip = 0, negate = 0) {
    return super.getParent().channelGroupAddPerm(this.cgid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from the channel group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @return {Promise} resolves on success
   */
  delPerm(perm) {
    return super.getParent().channelGroupDelPerm(this.cgid, perm)
  }


  /**
   * Sets the channel group of a client
   * @version 1.0
   * @async
   * @param {number} cid - The Channel in which the Client should be assigned the Group
   * @param {number} cldbid - The Client Database ID which should be added to the Group
   * @return {Promise} resolves on success
   */
  setClient(cid, cldbid) {
    return super.getParent().setClientChannelGroup(this.cgid, cid, cldbid)
  }


  /**
   * Displays the IDs of all clients currently residing in the channel group.
   * @version 1.0
   * @async
   * @param {number} [cid] - The Channel ID
   * @return {Promise<TeamSpeakClient[]>}
   */
  clientList(cid) {
    return super.getParent().channelGroupClientList(this.cgid, cid)
  }



  /**
   * Returns a Buffer with the Icon of the Channel Group
   * @version 1.0
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the ChannelGroup Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Icon Name of the Channel Group
   * @version 1.0
   * @async
   * @return {Promise<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakChannelGroup