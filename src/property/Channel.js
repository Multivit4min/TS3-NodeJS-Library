/**
 * @file Channel.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * @typedef {import("../TeamSpeak3")} TeamSpeak3
 * @typedef {import("./Client")} TeamSpeakClient
 * @typedef {import("../helper/types").ChannelListResponse} ChannelListResponse
 * @typedef {import("../helper/types").ChannelInfoResponse} ChannelInfoResponse
 * @typedef {import("../helper/types").PermListResponse} PermListResponse
 * @typedef {import("../helper/types").ChannelListFilter} ChannelListFilter
 * @typedef {import("../helper/types").ChannelEditProps} ChannelEditProps
 * @ignore
 */


/**
 * Class representing a TeamSpeak Channel
 * @extends Abstract
 */
class TeamSpeakChannel extends Abstract {

  /**
   * Creates a TeamSpeak Channel
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ChannelListResponse} list response from the channellist command
   */
  constructor(parent, list) {
    super(parent, list, "channel")
  }

  /** @type {number} */
  get cid() {
    return super.getPropertyByName("cid")
  }

  /** @type {number} */
  get pid() {
    return super.getPropertyByName("pid")
  }

  /** @type {number} */
  get order() {
    return super.getPropertyByName("channel_order")
  }

  /** @type {string} */
  get name() {
    return super.getPropertyByName("channel_name")
  }

  /** @type {string} */
  get topic() {
    return super.getPropertyByName("channel_topic")
  }

  /** @type {number} */
  get flagDefault() {
    return super.getPropertyByName("channel_flag_default")
  }

  /** @type {number} */
  get flagPassword() {
    return super.getPropertyByName("channel_flag_password")
  }

  /** @type {number} */
  get flagPermanent() {
    return super.getPropertyByName("channel_flag_permanent")
  }

  /** @type {number} */
  get flagSemiPermanent() {
    return super.getPropertyByName("channel_flag_semi_permanent")
  }

  /** @type {number} */
  get codec() {
    return super.getPropertyByName("channel_codec")
  }

  /** @type {number} */
  get codecQuality() {
    return super.getPropertyByName("channel_codec_quality")
  }

  /** @type {number} */
  get neededTalkPower() {
    return super.getPropertyByName("channel_needed_talk_power")
  }

  /** @type {number} */
  get iconId() {
    return super.getPropertyByName("channel_icon_id")
  }

  /** @type {number} */
  get secondsEmpty() {
    return super.getPropertyByName("seconds_empty")
  }

  /** @type {number} */
  get totalClientsFamily() {
    return super.getPropertyByName("total_clients_family")
  }

  /** @type {number} */
  get maxclients() {
    return super.getPropertyByName("channel_maxclients")
  }

  /** @type {number} */
  get maxfamilyclients() {
    return super.getPropertyByName("channel_maxfamilyclients")
  }

  /** @type {number} */
  get totalClients() {
    return super.getPropertyByName("total_clients")
  }

  /** @type {number} */
  get neededSubscribePower() {
    return super.getPropertyByName("channel_needed_subscribe_power")
  }


  /**
   * Returns the ID of the Channel
   * @returns {number} Returns the Channels ID
   */
  getID() {
    return this.cid
  }


  /**
   * Displays detailed configuration information about a channel including ID, topic, description, etc.
   * @async
   * @return {Promise<ChannelInfoResponse>}
   */
  getInfo() {
    return super.getParent().channelInfo(this.cid)
  }


  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @async
   * @param {number} cpid channel parent id
   * @param {number} [order=0] channel sort order
   * @return {Promise} resolves on success
   */
  move(cpid, order = 0) {
    return super.getParent().channelMove(this.cid, cpid, order)
  }


  /**
   * Deletes an existing channel by ID. If force is set to 1, the channel will be deleted even if there are clients within. The clients will be kicked to the default channel with an appropriate reason message.
   * @async
   * @param {number} force if set to 1 the channel will be deleted even when clients are in it
   * @return {Promise} resolves on success
   */
  del(force = 0) {
    return super.getParent().channelDelete(this.cid, force)
  }


  /**
   * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @async
   * @param {ChannelEditProps} properties the properties of the channel which should get changed
   * @return {Promise} resolves on success
   */
  edit(properties) {
    return super.getParent().channelEdit(this.cid, properties)
  }


  /**
   * Displays a list of permissions defined for a channel.
   * @async
   * @param {boolean} [permsid=false] whether the permsid should be displayed aswell
   * @return {Promise<PermListResponse[]>}
   */
  permList(permsid = false) {
    return super.getParent().channelPermList(this.cid, permsid)
  }


  /**
   * Adds a set of specified permissions to a channel. Multiple permissions can be added by providing the two parameters of each permission. A permission can be specified by permid or permsid.
   * @async
   * @param {string|number} perm the permid or permsid
   * @param {number} value the value which should be set
   * @return {Promise} resolves on success
   */
  setPerm(perm, value) {
    return super.getParent().channelSetPerm(this.cid, perm, value)
  }


  /**
   * Removes a set of specified permissions from a channel. Multiple permissions can be removed at once. A permission can be specified by permid or permsid.
   * @async
   * @param {string|number} perm the permid or permsid
   * @return {Promise} resolves on success
   */
  delPerm(perm) {
    return super.getParent().channelDelPerm(this.cid, perm)
  }


  /**
   * Gets a List of Clients in the current Channel
   * @async
   * @param {ChannelListFilter} [filter] the filter object
   * @return {Promise<TeamSpeakClient[]>}
   */
  getClients(filter = {}) {
    filter.cid = this.cid
    return super.getParent().clientList(filter)
  }


  /**
   * Returns a Buffer with the Icon of the Channel
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the Channel Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }


  /**
   * Gets the Icon Name of the Channel
   * @async
   * @returns {Promise<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakChannel