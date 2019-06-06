/**
 * @file Server.js
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
 * @typedef {import("../helper/types").ServerListResponse} ServerListResponse
 * @ignore
 */


/**
 * Class representing a TeamSpeak Server
 * @extends Abstract
 */
class TeamSpeakServer extends Abstract {

  /**
   * Creates a TeamSpeak Server
   * @version 1.0
   * @param {TeamSpeak3} parent the teamspeak instance
   * @param {ServerListResponse} list response from the serverlist command
   */
  constructor(parent, list) {
    super(parent, list, "virtualserver")
  }

  /** @type {number} */
  get id() {
    return super.getPropertyByName("virtualserver_id")
  }

  /** @type {number} */
  get port() {
    return super.getPropertyByName("virtualserver_port")
  }

  /** @type {string} */
  get status() {
    return super.getPropertyByName("virtualserver_status")
  }

  /** @type {number} */
  get clientsonline() {
    return super.getPropertyByName("virtualserver_clientsonline")
  }

  /** @type {number} */
  get queryclientsonline() {
    return super.getPropertyByName("virtualserver_queryclientsonline")
  }

  /** @type {number} */
  get maxclients() {
    return super.getPropertyByName("virtualserver_maxclients")
  }

  /** @type {number} */
  get uptime() {
    return super.getPropertyByName("virtualserver_uptime")
  }

  /** @type {string} */
  get name() {
    return super.getPropertyByName("virtualserver_name")
  }

  /** @type {number} */
  get autostart() {
    return super.getPropertyByName("virtualserver_autostart")
  }

  /** @type {string} */
  get machineId() {
    return super.getPropertyByName("virtualserver_machine_id")
  }

  /** @type {string} */
  get uniqueIdentifier() {
    return super.getPropertyByName("virtualserver_unique_identifier")
  }

  /**
     * Selects the Virtual Server
     * @version 1.0
     * @param {string} [client_nickname] - Set Nickname when selecting a server
   * @return {Promise} resolves on success
     */
  use(client_nickname) {
    return super.getParent().useBySid(this.id, client_nickname)
  }


  /**
   * Gets basic Infos about the Server
   * @deprecated
   * @version 1.0
   * @async
   * @returns {Promise<ServerListResponse>}
   */
  getInfo() {
    return this.toJSON(false)
  }


  /**
   * Deletes the Server.
   * @version 1.0
   * @async
   * @return {Promise} resolves on success
   */
  del() {
    return super.getParent().serverDelete(this.id)
  }


  /**
   * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @return {Promise} resolves on success
   */
  start() {
    return super.getParent().serverStart(this.id)
  }


  /**
   * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @param {string} [msg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @return {Promise} resolves on success
   */
  stop(msg) {
    return super.getParent().serverStop(this.id, msg)
  }

}

module.exports = TeamSpeakServer