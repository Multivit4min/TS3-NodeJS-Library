/**
 * @file Client.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")
const FileTransfer = require("./../transport/FileTransfer")

/**
 * workaround for vscode intellisense and documentation generation
 *
 * @typedef {import("../TeamSpeak3")} TeamSpeak3
 * @typedef {import("../helper/types").ClientListResponse} ClientListResponse
 * @typedef {import("../helper/types").ClientInfoResponse} ClientInfoResponse
 * @typedef {import("../helper/types").ClientDBInfoResponse} ClientDBInfoResponse
 * @typedef {import("../helper/types").CustomInfoResponse} CustomInfoResponse
 * @typedef {import("../helper/types").BanAddResponse} BanAddResponse
 * @typedef {import("../helper/types").PermListResponse} PermListResponse
 * @ignore
 */


/**
 * Class representing a TeamSpeak Client
 * @extends Abstract
 */
class TeamSpeakClient extends Abstract {

  /**
   * Creates a TeamSpeak Client
   * @version 1.0
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ClientListResponse} list response from the clientlist command
   */
  constructor(parent, list) {
    super(parent, list, "client")

    /**
     * Move event
     *
     * @event TeamSpeakClient#move
     * @memberof TeamSpeakClient
     * @returns {TeamSpeakChannel} The Channel where the Client moved to
     */
    super._onParent("clientmoved", ev => {
      if (ev.client.getID() !== this.getID()) return
      this.emit("move", ev.channel)
    })

    /**
     * Textmessage event
     *
     * @event TeamSpeakClient#textmessage
     * @memberof TeamSpeakClient
     * @returns {string} The Message which has been sent
     */
    super._onParent("textmessage", ev => {
      if (ev.invoker.getID() !== this.getID()) return
      this.emit("message", ev.msg)
    })

    /**
     * Client Disconnect Event
     *
     * @event TeamSpeakClient#clientdisconnect
     * @memberof TeamSpeakClient
     */
    super._onParent("clientdisconnect", ev => {
      if (ev.client.clid !== this.getID()) return
      this.emit("disconnect", ev.event)
      super.destruct()
    })
  }

  /** @type {number} */
  get clid() {
    return super.getPropertyByName("clid")
  }

  /** @type {number} */
  get cid() {
    return super.getPropertyByName("cid")
  }

  /** @type {number} */
  get databaseId() {
    return super.getPropertyByName("client_database_id")
  }

  /** @type {string} */
  get nickname() {
    return super.getPropertyByName("client_nickname")
  }

  /** @type {number} */
  get type() {
    return super.getPropertyByName("client_type")
  }

  /** @type {number} */
  get away() {
    return super.getPropertyByName("client_away")
  }

  /** @type {string} */
  get awayMessage() {
    return super.getPropertyByName("client_away_message")
  }

  /** @type {number} */
  get flagTalking() {
    return super.getPropertyByName("client_flag_talking")
  }

  /** @type {number} */
  get inputMuted() {
    return super.getPropertyByName("client_input_muted")
  }

  /** @type {number} */
  get outputMuted() {
    return super.getPropertyByName("client_output_muted")
  }

  /** @type {number} */
  get inputHardware() {
    return super.getPropertyByName("client_input_hardware")
  }

  /** @type {number} */
  get outputHardware() {
    return super.getPropertyByName("client_output_hardware")
  }

  /** @type {number} */
  get talkPower() {
    return super.getPropertyByName("client_talk_power")
  }

  /** @type {number} */
  get isTalker() {
    return super.getPropertyByName("client_is_talker")
  }

  /** @type {number} */
  get isPrioritySpeaker() {
    return super.getPropertyByName("client_is_priority_speaker")
  }

  /** @type {number} */
  get isRecording() {
    return super.getPropertyByName("client_is_recording")
  }

  /** @type {number} */
  get isChannelCommander() {
    return super.getPropertyByName("client_is_channel_commander")
  }

  /** @type {string} */
  get uniqueIdentifier() {
    return super.getPropertyByName("client_unique_identifier")
  }

  /** @type {string[]} */
  get servergroups() {
    return super.getPropertyByName("client_servergroups")
  }

  /** @type {number} */
  get channelGroupId() {
    return super.getPropertyByName("client_channel_group_id")
  }

  /** @type {number} */
  get channelGroupInheritedChannelId() {
    return super.getPropertyByName("client_channel_group_inherited_channel_id")
  }

  /** @type {string} */
  get version() {
    return super.getPropertyByName("client_version")
  }

  /** @type {string} */
  get platform() {
    return super.getPropertyByName("client_platform")
  }

  /** @type {number} */
  get idleTime() {
    return super.getPropertyByName("client_idle_time")
  }

  /** @type {number} */
  get created() {
    return super.getPropertyByName("client_created")
  }

  /** @type {number} */
  get lastconnected() {
    return super.getPropertyByName("client_lastconnected")
  }

  /** @type {string} */
  get country() {
    return super.getPropertyByName("client_country")
  }

  /** @type {string} */
  get connectionClientIp() {
    return super.getPropertyByName("connection_client_ip")
  }

  /** @type {string} */
  get badges() {
    return super.getPropertyByName("client_badges")
  }


  /**
   * Returns the Database ID of the Client
   * @version 1.0
   * @returns {number} Returns the Clients Database ID
   */
  getDBID() {
    return this.databaseId
  }


  /**
   * Returns the Client ID
   * @version 1.0
   * @returns {number} Returns the Client ID
   */
  getID() {
    return this.clid
  }


  /**
   * Returns the Client Unique ID
   * @version 1.0
   * @returns {string} Returns the Client UniqueID
   */
  getUID() {
    return this.uniqueIdentifier
  }


  /**
   * Evaluates if the Client is a Query Client or a normal Client
   * @version 1.0
   * @returns {boolean} true when the Client is a Server Query Client
   */
  isQuery() {
    return this.type === 1
  }


  /**
   * Retrieves a displayable Client Link for the TeamSpeak Chat
   * @version 1.0
   * @returns {string} returns the TeamSpeak Client URL as Link
   */
  getURL() {
    return `[URL=client://${this.clid}/${this.uniqueIdentifier}~${encodeURIComponent(this.nickname)}]${this.nickname}[/URL]`
  }


  /**
   * Returns General Info of the Client, requires the Client to be online
   * @version 1.0
   * @async
   * @returns {Promise<ClientInfoResponse>} Promise with the Client Information
   */
  getInfo() {
    return super.getParent().clientInfo(this.clid)
  }


  /**
   * Returns the Clients Database Info
   * @version 1.0
   * @async
   * @returns {Promise<ClientDBInfoResponse>} Returns the Client Database Info
   */
  getDBInfo() {
    return super.getParent().clientDBInfo(this.databaseId)
  }


  /**
   * Displays a list of custom properties for the client
   * @version 1.3
   * @async
   * @returns {Promise<CustomInfoResponse[]>}
   */
  customInfo() {
    return super.getParent().customInfo(this.databaseId)
  }


  /**
   * Removes a custom property from the client
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @version 1.3
   * @async
   * @param {string} ident - The Key which should be deleted
   * @return {Promise} resolves on success
   */
  customDelete(ident) {
    return super.getParent().customDelete(this.databaseId, ident)
  }


  /**
   * Creates or updates a custom property for the client.
   * Ident and value can be any value, and are the key value pair of the custom property.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @version 1.3
   * @async
   * @param {string} ident - The Key which should be set
   * @param {string} value - The Value which should be set
   * @return {Promise} resolves on success
   */
  customSet(ident, value) {
    return super.getParent().customSet(this.databaseId, ident, value)
  }


  /**
   * Kicks the Client from the Server
   * @version 1.0
   * @async
   * @param {string} msg - The Message the Client should receive when getting kicked
   * @return {Promise} resolves on success
   */
  kickFromServer(msg) {
    return super.getParent().clientKick(this.clid, 5, msg)
  }


  /**
   * Kicks the Client from their currently joined Channel
   * @version 1.0
   * @async
   * @param {string} msg - The Message the Client should receive when getting kicked (max 40 Chars)
   * @return {Promise} resolves on success
   */
  kickFromChannel(msg) {
    return super.getParent().clientKick(this.clid, 4, msg)
  }


  /**
   * Bans the chosen client with its uid
   * @version 1.14
   * @async
   * @param {string} banreason - Ban Reason
   * @param {number} time - Bantime in Seconds, if left empty it will result in a permaban
   * @return {Promise<BanAddResponse>}
   */
  ban(banreason, time) {
    return super.getParent().ban({ uid: this.uniqueIdentifier, time, banreason })
  }


  /**
   * Moves the Client to a different Channel
   * @version 1.0
   * @async
   * @param {number} cid - Channel ID in which the Client should get moved
   * @param {string} [cpw=""] - The Channel Password
   * @return {Promise} resolves on success
   */
  move(cid, cpw) {
    return super.getParent().clientMove(this.clid, cid, cpw)
  }


  /**
   * Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.
   * @version 1.0
   * @async
   * @param {number} sgid - The Server Group ID which the Client should be added to
   * @return {Promise} resolves on success
   */
  serverGroupAdd(sgid) {
    return super.getParent().serverGroupAddClient(this.databaseId, sgid)
  }


  /**
   * Removes the client from the server group specified with sgid.
   * @version 1.0
   * @async
   * @param {number} sgid - The Server Group ID which the Client should be removed from
   * @return {Promise} resolves on success
   */
  serverGroupDel(sgid) {
    return super.getParent().serverGroupDelClient(this.databaseId, sgid)
  }


  /**
   * Pokes the Client with a certain message
   * @version 1.0
   * @async
   * @param {string} msg - The message the Client should receive
   * @return {Promise} resolves on success
   */
  poke(msg) {
    return super.getParent().clientPoke(this.clid, msg)
  }


  /**
   * Sends a textmessage to the Client
   * @version 1.0
   * @async
   * @param {string} msg - The message the Client should receive
   * @return {Promise} resolves on success
   */
  message(msg) {
    return super.getParent().sendTextMessage(this.clid, 1, msg)
  }


  /**
   * Displays a list of permissions defined for a client
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @return {Promise<PermListResponse[]>}
   */
  permList(permsid) {
    return super.getParent().clientPermList(this.databaseId, permsid)
  }


  /**
   * Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @return {Promise} resolves on success
   */
  addPerm(perm, value, skip, negate) {
    return super.getParent().clientAddPerm(this.databaseId, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid
   * @version 1.0
   * @async
   * @param {string|number} perm - The permid or permsid
   * @return {Promise} resolves on success
   */
  delPerm(perm) {
    return super.getParent().clientDelPerm(this.databaseId, perm)
  }



  /**
   * Returns a Buffer with the Avatar of the User
   * @version 1.0
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the avatar
   */
  getAvatar() {
    return this.getAvatarName()
      .then(name => super.getParent().ftInitDownload({name: `/${name}`}))
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      .then(res => new FileTransfer(super.getParent()._config.host, res.port).download(res.ftkey, res.size))
  }



  /**
   * Returns a Buffer with the Icon of the Client
   * @version 1.0
   * @async
   * @returns {Promise<Buffer>} Promise with the binary data of the Client Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Avatar Name of the Client
   * @version 1.0
   * @async
   * @returns {Promise<string>} Avatar Name
   */
  getAvatarName() {
    return new Promise((fulfill, reject) => {
      this.getDBInfo()
        .then(data => fulfill(`avatar_${data.client_base64HashClientUID}`))
        .catch(reject)
    })
  }



  /**
   * Gets the Icon Name of the Client
   * @version 1.0
   * @async
   * @returns {Promise<string>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakClient