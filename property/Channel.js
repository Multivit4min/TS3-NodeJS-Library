/**
 * @file Channel.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

/**
 * the response of the channellist command for a single channel
 * @typedef {object} ChannelListResponse
 * @property {number} cid the current id of the channel
 * @property {...any} [any]
 */

const Abstract = require("./Abstract")

/**
 * Class representing a TeamSpeak Channel
 * @extends Abstract
 * @property {number} cid
 * @property {number} pid
 * @property {number} order
 * @property {string} name
 * @property {string} topic
 * @property {number} flagDefault
 * @property {number} flagPassword
 * @property {number} flagPermanent
 * @property {number} flagSemiPermanent
 * @property {number} codec
 * @property {number} codecQuality
 * @property {number} neededTalkPower
 * @property {number} iconId
 * @property {number} secondsEmpty
 * @property {number} totalClientsFamily
 * @property {number} maxclients
 * @property {number} maxfamilyclients
 * @property {number} totalClients
 * @property {number} neededSubscribePower
 */
class TeamSpeakChannel extends Abstract {

  /**
   * Creates a TeamSpeak Channel
   * @version 1.0
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ChannelListResponse} list response from the channellist command
   */
  constructor(parent, list) {
    super(parent, list, "channel")
    this._static = {
      cid: list.cid
    }
  }


  /**
   * Returns the ID of the Channel
   * @returns {number} Returns the Channels ID
   */
  getID() {
    return this._static.cid
  }


  /**
   * Displays detailed configuration information about a channel including ID, topic, description, etc.
   * @version 1.0
   * @async
   * @return {Promise.<object>}
   */
  getInfo() {
    return super.getParent().channelInfo(this._static.cid)
  }


  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @version 1.0
   * @async
   * @param {number} cpid - Channel Parent ID
   * @param {number} [order=0] - Channel Sort Order
   * @return {Promise.<object>}
   */
  move(cpid, order = 0) {
    return super.getParent().channelMove(this._static.cid, cpid, order)
  }


  /**
   * Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.
   * @version 1.0
   * @async
   * @param {number} force - If set to 1 the Channel will be deleted even when Clients are in it
   * @return {Promise.<object>}
   */
  del(force = 0) {
    return super.getParent().channelDelete(this._static.cid, force)
  }


  /**
   * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @version 1.0
   * @async
   * @param {object} properties - The Properties of the Channel which should get changed
   * @return {Promise.<object>}
   */
  edit(properties) {
    return super.getParent().channelEdit(this._static.cid, properties)
  }


  /**
   * Displays a list of permissions defined for a channel.
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - Whether the Perm SID should be displayed aswell
   * @return {Promise.<object[]>}
   */
  permList(permsid = false) {
    return super.getParent().channelPermList(this._static.cid, permsid)
  }


  /**
   * Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - The Value which should be set
   * @return {Promise.<object>}
   */
  setPerm(perm, value) {
    return super.getParent().channelSetPerm(this._static.cid, perm, value)
  }


  /**
   * Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @return {Promise.<object>}
   */
  delPerm(perm) {
    return super.getParent().channelDelPerm(this._static.cid, perm)
  }


  /**
   * Gets a List of Clients in the current Channel
   * @version 1.0
   * @async
   * @param {object} filter - The Filter Object
   * @return {Promise.<object>}
   */
  getClients(filter = {}) {
    filter.cid = this._static.cid
    return super.getParent().clientList(filter)
  }


  /**
   * Returns a Buffer with the Icon of the Channel
   * @version 1.0
   * @async
   * @returns {Promise.<Buffer>} Promise with the binary data of the Channel Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }


  /**
   * Gets the Icon Name of the Channel
   * @version 1.0
   * @async
   * @returns {Promise.<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakChannel