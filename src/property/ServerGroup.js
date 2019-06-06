/**
 * @file ServerGroup.js
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
 * @typedef {import("../helper/types").ServerGroupListResponse} ServerGroupListResponse
 * @typedef {import("../helper/types").ServerGroupCopyResponse} ServerGroupCopyResponse
 * @typedef {import("../helper/types").PermListResponse} PermListResponse
 * @typedef {import("../helper/types").ServerGroupClientListResponse} ServerGroupClientListResponse
 * @ignore
 */

/**
 * Class representing a TeamSpeak ServerGroup
 * @extends Abstract
 */
class TeamSpeakServerGroup extends Abstract {

  /**
   * Creates a TeamSpeak Server Group
   * @version 1.0
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ServerGroupListResponse} list response from the servergrouplist command
   */
  constructor(parent, list) {
    super(parent, list, "servergroup")
  }

  /** @type {number} */
  get sgid() {
    return super.getPropertyByName("sgid")
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
   * Returns the Server Group ID
   * @version 1.0
   * @return {number}
   */
  getSGID() {
    return this.sgid
  }


  /**
   * Deletes the server group. If force is set to 1, the server group will be deleted even if there are clients within.
   * @version 1.0
   * @async
   * @param {number} force - If set to 1 the ServerGroup will be deleted even when Clients are in it
   * @return {Promise} resolves on success
   */
  del(force = 0) {
    return super.getParent().serverGroupDel(this.sgid, force)
  }


  /**
   * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group. To overwrite an existing group, simply set tsgid to the ID of a designated target group. If a target group is set, the name parameter will be ignored.
   * @version 1.0
   * @async
   * @param {number} [tsgid=0] - The Target Group, 0 to create a new Group
   * @param {number} [type] - The Type of the Group (0 = Query Group | 1 = Normal Group)
   * @param {string} [name] - Name of the Group
   * @return {Promise<ServerGroupCopyResponse>}
   */
  copy(tsgid, type, name) {
    return super.getParent().serverGroupCopy(this.sgid, tsgid, type, name)
  }


  /**
   * Changes the name of the server group
   * @version 1.0
   * @async
   * @param {string} name - Name of the Group
   * @return {Promise} resolves on success
   */
  rename(name) {
    return super.getParent().serverGroupRename(this.sgid, name)
  }


  /**
   * Displays a list of permissions assigned to the server group specified with sgid.
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @returns {Promise<PermListResponse[]>}
   */
  permList(permsid) {
    return super.getParent().serverGroupPermList(this.sgid, permsid)
  }


  /**
   * Adds a specified permissions to the server group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @return {Promise} resolves on success
   */
  addPerm(perm, value, skip, negate) {
    return super.getParent().serverGroupAddPerm(this.sgid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from the server group. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @return {Promise} resolves on success
   */
  delPerm(perm) {
    return super.getParent().serverGroupDelPerm(this.sgid, perm)
  }


  /**
   * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be added to the Group
   * @return {Promise} resolves on success
   */
  addClient(cldbid) {
    return super.getParent().serverGroupAddClient(cldbid, this.sgid)
  }


  /**
   * Removes a client specified with cldbid from the server group.
   * @version 1.0
   * @async
   * @param {number} cldbid - The Client Database ID which should be removed from the Group
   * @return {Promise} resolves on success
   */
  delClient(cldbid) {
    return super.getParent().serverGroupDelClient(cldbid, this.sgid)
  }


  /**
   * Displays the IDs of all clients currently residing in the server group.
   * @version 1.0
   * @async
   * @returns {Promise<ServerGroupClientListResponse>}
   */
  clientList() {
    return super.getParent().serverGroupClientList(this.sgid)
  }



  /**
   * Returns a Buffer with the Icon of the Server Group
   * @version 1.0
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the ServerGroup Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Icon Name of the Server Group
   * @version 1.0
   * @async
   * @returns {Promise<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakServerGroup