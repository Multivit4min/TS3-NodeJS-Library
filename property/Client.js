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
 * Class representing a TeamSpeak Client
 * @extends Abstract
 * @class
 * @fires TeamSpeakClient#move
 * @fires TeamSpeakClient#textmessage
 * @fires TeamSpeakClient#clientdisconnect
 */
class TeamSpeakClient extends Abstract {

  /**
   * Creates a TeamSpeak Client
   * @version 1.0
   * @param {object} parent - The Parent Object which is a TeamSpeak Instance
   * @param {object} c - This holds Basic Client Data received by the Client List Command
   * @param {number} c.clid - The Client ID of the TeamSpeak Client
   * @param {number} c.client_database_id - The Client Database ID
   * @param {number} c.client_type - The Client Type (0 = Client, 1 = Query)
   * @param {string} c.client_unique_identifier - The Client Unique ID
   */
  constructor(parent, c) {
    super(parent, c, "client")
    this._static = {
      uid: c.client_unique_identifier,
      clid: c.clid,
      dbid: c.client_database_id,
      type: c.client_type
    }

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

  /**
   * Returns the Database ID of the Client
   * @version 1.0
   * @returns {number} Returns the Clients Database ID
   */
  getDBID() {
    return this._static.dbid
  }


  /**
   * Returns the Client ID
   * @version 1.0
   * @returns {number} Returns the Client ID
   */
  getID() {
    return this._static.clid
  }


  /**
   * Returns the Client Unique ID
   * @version 1.0
   * @returns {string} Returns the Client UniqueID
   */
  getUID() {
    return this._static.uid
  }


  /**
   * Evaluates if the Client is a Query Client or a normal Client
   * @version 1.0
   * @returns {boolean} true when the Client is a Server Query Client
   */
  isQuery() {
    return this._static.type === 1
  }


  /**
   * Retrieves a displayable Client Link for the TeamSpeak Chat
   * @version 1.0
   * @returns {string} returns the TeamSpeak Client URL as Link
   */
  getURL() {
    const nick = super.getCache().client_nickname
    return `[URL=client://${this._static.clid}/${this._static.uid}~${encodeURIComponent(nick)}]${nick}[/URL]`
  }


  /**
   * Returns General Info of the Client, requires the Client to be online
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Promise with the Client Information
   */
  getInfo() {
    return super.getParent().clientInfo(this._static.clid)
  }


  /**
   * Returns the Clients Database Info
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Returns the Client Database Info
   */
  getDBInfo() {
    return super.getParent().clientDBInfo(this._static.dbid)
  }


  /**
   * Displays a list of custom properties for the client
   * @version 1.3
   * @async
   * @returns {Promise.<object>}
   */
  customInfo() {
    return super.getParent().customInfo(this._static.dbid)
  }


  /**
   * Removes a custom property from the client
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @version 1.3
   * @async
   * @param {string} ident - The Key which should be deleted
   * @returns {Promise.<object>}
   */
  customDelete(ident) {
    return super.getParent().customDelete(this._static.dbid, ident)
  }


  /**
   * Creates or updates a custom property for the client.
   * Ident and value can be any value, and are the key value pair of the custom property.
   * This requires TeamSpeak Server Version 3.2.0 or newer.
   * @version 1.3
   * @async
   * @param {string} ident - The Key which should be set
   * @param {string} value - The Value which should be set
   * @returns {Promise.<object>}
   */
  customSet(ident, value) {
    return super.getParent().customSet(this._static.dbid, ident, value)
  }


  /**
   * Kicks the Client from the Server
   * @version 1.0
   * @async
   * @param {string} msg - The Message the Client should receive when getting kicked
   * @returns {Promise.<object>} Promise Object
   */
  kickFromServer(msg) {
    return super.getParent().clientKick(this._static.clid, 5, msg)
  }


  /**
   * Kicks the Client from their currently joined Channel
   * @version 1.0
   * @async
   * @param {string} msg - The Message the Client should receive when getting kicked (max 40 Chars)
   * @returns {Promise.<object>} Promise Object
   */
  kickFromChannel(msg) {
    return super.getParent().clientKick(this._static.clid, 4, msg)
  }


  /**
   * Adds a new ban rule on the selected virtual server. All parameters are optional but at least one of the following must be set: ip, name, or uid.
   * @version 1.0
   * @async
   * @param {string} [ip] - IP Regex
   * @param {string} [name] - Name Regex
   * @param {string} [uid] - UID Regex
   * @param {number} time - Bantime in Seconds, if left empty it will result in a permaban
   * @param {string} banreason - Ban Reason
   * @returns {Promise.<object>}
   */
  banAdd(ip, name, uid, time, banreason) {
    return this.execute("banadd", { ip, name, uid, time, banreason })
  }


  /**
   * creates a new ban with the clients uid
   * @version 1.9
   * @async
   * @param {string} [banreason] - reason message
   * @param {number} [time] - the time in seconds a client should be banned, leave empty if it should result in a permanent ban
   * @returns {Promise.<object>} Promise Object
   */
  ban(banreason, time) {
    return super.getParent().banAdd(null, null, this._static.uid, time, banreason)
  }


  /**
   * Moves the Client to a different Channel
   * @version 1.0
   * @async
   * @param {number} cid - Channel ID in which the Client should get moved
   * @param {string} [cpw=""] - The Channel Password
   * @returns {Promise.<object>} Promise Object
   */
  move(cid, cpw) {
    return super.getParent().clientMove(this._static.clid, cid, cpw)
  }


  /**
   * Adds the client to the server group specified with sgid. Please note that a client cannot be added to default groups or template groups.
   * @version 1.0
   * @async
   * @param {number} sgid - The Server Group ID which the Client should be added to
   * @returns {Promise.<object>} Promise Object
   */
  serverGroupAdd(sgid) {
    return super.getParent().serverGroupAddClient(this._static.dbid, sgid)
  }


  /**
   * Removes the client from the server group specified with sgid.
   * @version 1.0
   * @async
   * @param {number} sgid - The Server Group ID which the Client should be removed from
   * @returns {Promise.<object>} Promise Object
   */
  serverGroupDel(sgid) {
    return super.getParent().serverGroupDelClient(this._static.dbid, sgid)
  }


  /**
   * Pokes the Client with a certain message
   * @version 1.0
   * @async
   * @param {string} msg - The message the Client should receive
   * @returns {Promise.<object>} Promise Object
   */
  poke(msg) {
    return super.getParent().clientPoke(this._static.clid, msg)
  }


  /**
   * Sends a textmessage to the Client
   * @version 1.0
   * @async
   * @param {string} msg - The message the Client should receive
   * @returns {Promise.<object>} Promise Object
   */
  message(msg) {
    return super.getParent().sendTextMessage(this._static.clid, 1, msg)
  }


  /**
   * Displays a list of permissions defined for a client
   * @version 1.0
   * @async
   * @param {boolean} [permsid=false] - If the permsid option is set to true the output will contain the permission names.
   * @return {Promise.<object>}
   */
  permList(permsid) {
    return super.getParent().clientPermList(this._static.dbid, permsid)
  }


  /**
   * Adds a set of specified permissions to a client. Multiple permissions can be added by providing the three parameters of each permission. A permission can be specified by permid or permsid.
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @param {number} value - Value of the Permission
   * @param {number} [skip=0] - Whether the skip flag should be set
   * @param {number} [negate=0] - Whether the negate flag should be set
   * @return {Promise.<object>}
   */
  addPerm(perm, value, skip, negate) {
    return super.getParent().clientAddPerm(this._static.dbid, perm, value, skip, negate)
  }


  /**
   * Removes a set of specified permissions from a client. Multiple permissions can be removed at once. A permission can be specified by permid or permsid
   * @version 1.0
   * @async
   * @param {(string|number)} perm - The permid or permsid
   * @return {Promise.<object>}
   */
  delPerm(perm) {
    return super.getParent().clientDelPerm(this._static.dbid, perm)
  }



  /**
   * Returns a Buffer with the Avatar of the User
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Promise with the binary data of the avatar
   */
  getAvatar() {
    return this.getAvatarName()
      .then(name => super.getParent().ftInitDownload({name: `/${name}`}))
      // eslint-disable-next-line no-underscore-dangle
      .then(res => new FileTransfer(super.getParent()._config.host, res.port).download(res.ftkey, res.size))
  }



  /**
   * Returns a Buffer with the Icon of the Client
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Promise with the binary data of the Client Icon
   */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }



  /**
   * Gets the Avatar Name of the Client
   * @version 1.0
   * @async
   * @returns {Promise.<object>} Avatar Name
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
   * @returns {Promise.<object>}
   */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}

module.exports = TeamSpeakClient