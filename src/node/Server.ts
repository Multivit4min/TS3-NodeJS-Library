import { Abstract } from "./Abstract"
import TeamSpeak from "../TeamSpeak"
import { ServerList } from "../types/ResponseTypes"

export class TeamSpeakServer extends Abstract {

  constructor(parent: TeamSpeak, list: ServerList) {
    super(parent, list, "virtualserver")
  }

  get id() {
    return super.getPropertyByName("virtualserver_id")!
  }

  get port() {
    return super.getPropertyByName("virtualserver_port")!
  }

  get status() {
    return super.getPropertyByName("virtualserver_status")!
  }

  get clientsonline() {
    return super.getPropertyByName("virtualserver_clientsonline")!
  }

  get queryclientsonline() {
    return super.getPropertyByName("virtualserver_queryclientsonline")!
  }

  get maxclients() {
    return super.getPropertyByName("virtualserver_maxclients")!
  }

  get uptime() {
    return super.getPropertyByName("virtualserver_uptime")!
  }

  get name() {
    return super.getPropertyByName("virtualserver_name")!
  }

  get autostart() {
    return super.getPropertyByName("virtualserver_autostart")!
  }

  get machineId() {
    return super.getPropertyByName("virtualserver_machine_id")!
  }

  get uniqueIdentifier() {
    return super.getPropertyByName("virtualserver_unique_identifier")
  }

  /**
   * selects a virtual server
   * @param client_nickname sets the nickname when selecting a server
   */
  use(client_nickname?: string) {
    return super.getParent().useBySid(this.id, client_nickname)
  }

  /** deletes the server */
  del() {
    return super.getParent().serverDelete(this.id)
  }


  /**
   * Starts the virtual server.
   * Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
   */
  start() {
    return super.getParent().serverStart(this.id)
  }


  /**
   * Stops the virtual server.
   * Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @param msg specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   */
  stop(msg?: string) {
    return super.getParent().serverStop(this.id, msg)
  }

}