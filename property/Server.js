/**
 * @file Server.js
 * @ignore
 * @copyright David Kartnaller 2017
 * @license GNU GPLv3
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */

const Abstract = require("./Abstract")

/**
 * Class representing a TeamSpeak Server
 * @extends Abstract
 * @class
 */
class TeamSpeakServer extends Abstract {

  /**
   * Creates a TeamSpeak Server
   * @version 1.0
   * @param {object} parent - The Parent Object which is a TeamSpeak Instance
   * @param {object} s - This holds Basic ServerGroup Data
   * @param {number} s.virtualserver_id - The Server ID
   */
  constructor(parent, s) {
    super(parent, s)
    this._static = {
      sid: s.virtualserver_id
    }
  }

  /**
   * retrieves the namespace of this class
   * @returns {string} the current namespace
   */
  getNameSpace() {
    return "virtualserver"
  }

  /**
     * Selects the Virtual Server
     * @version 1.0
     * @param {string} [client_nickname] - Set Nickname when selecting a server
     * @returns {Promise.<object>}
     */
  use(client_nickname) {
    return super.getParent().useBySid(this._static.sid, client_nickname)
  }


  /**
   * Gets basic Infos about the Server
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  getInfo() {
    return this.getCache()
  }


  /**
   * Deletes the Server.
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  del() {
    return super.getParent().serverDelete(this._static.sid)
  }


  /**
   * Starts the virtual server. Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @returns {Promise.<object>}
   */
  start() {
    return super.getParent().serverStart(this._static.sid)
  }


  /**
   * Stops the virtual server. Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @version 1.0
   * @async
   * @param {string} [msg] - Specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   * @returns {Promise.<object>}
   */
  stop(msg) {
    return super.getParent().serverStop(this._static.sid, msg)
  }

}

module.exports = TeamSpeakServer