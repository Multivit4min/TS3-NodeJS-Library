import { Abstract } from "./Abstract"
import { TeamSpeak } from "../TeamSpeak"
import { ServerEntry } from "../types/ResponseTypes"

export class TeamSpeakServer extends Abstract<ServerEntry> {

  constructor(parent: TeamSpeak, list: ServerEntry) {
    super(parent, list, "virtualserver")
  }

  get id() {
    return super.getPropertyByName("virtualserverId")
  }

  get port() {
    return super.getPropertyByName("virtualserverPort")
  }

  get status() {
    return super.getPropertyByName("virtualserverStatus")
  }

  get clientsonline() {
    return super.getPropertyByName("virtualserverClientsonline")
  }

  get queryclientsonline() {
    return super.getPropertyByName("virtualserverQueryclientsonline")
  }

  get maxclients() {
    return super.getPropertyByName("virtualserverMaxclients")
  }

  get uptime() {
    return super.getPropertyByName("virtualserverUptime")
  }

  get name() {
    return super.getPropertyByName("virtualserverName")
  }

  get autostart() {
    return super.getPropertyByName("virtualserverAutostart")
  }

  get machineId() {
    return super.getPropertyByName("virtualserverMachineId")
  }

  get uniqueIdentifier() {
    return super.getPropertyByName("virtualserverUniqueIdentifier")
  }

  /**
   * selects a virtual server
   * @param client_nickname sets the nickname when selecting a server
   */
  use(clientNickname?: string) {
    return super.getParent().useBySid(this, clientNickname)
  }

  /** deletes the server */
  del() {
    return super.getParent().serverDelete(this)
  }

  /**
   * Starts the virtual server.
   * Depending on your permissions, you're able to start either your own virtual server only or all virtual servers in the server instance.
   */
  start() {
    return super.getParent().serverStart(this)
  }

  /**
   * Stops the virtual server.
   * Depending on your permissions, you're able to stop either your own virtual server only or all virtual servers in the server instance.
   * @param msg specifies a text message that is sent to the clients before the client disconnects (requires TeamSpeak Server 3.2.0 or newer).
   */
  stop(msg?: string) {
    return super.getParent().serverStop(this, msg)
  }

  /** retrieves the client id from a string or teamspeak client */
  static getId<T extends TeamSpeakServer.ServerType>(server?: T): T extends undefined ? undefined : string
  static getId(server?: TeamSpeakServer.ServerType): string|undefined {
    return server instanceof TeamSpeakServer ? server.id : server
  }

  /** retrieves the clients from an array */
  static getMultipleIds(servers: TeamSpeakServer.MultiServerType) {
    const list = Array.isArray(servers) ? servers : [servers]
    return list.map(c => TeamSpeakServer.getId(c)) as string[]
  }

}

export namespace TeamSpeakServer {
  export type ServerType = string|TeamSpeakServer
  export type MultiServerType = string[]|TeamSpeakServer[]|ServerType
}