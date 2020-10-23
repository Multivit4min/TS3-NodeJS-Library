import { Abstract } from "./Abstract"
import { TeamSpeak } from "../TeamSpeak"
import { ClientEntry } from "../types/ResponseTypes"
import { ClientDBEdit, ClientEdit } from "../types/PropertyTypes"
import { ClientType } from "../types/enum"
import { TeamSpeakChannel } from "./Channel"
import { TeamSpeakServerGroup } from "./ServerGroup"
import { Permission } from "../util/Permission"

export class TeamSpeakClient extends Abstract<ClientEntry> {

  constructor(parent: TeamSpeak, list: ClientEntry) {
    super(parent, list, "client")
  }

  get clid() {
    return super.getPropertyByName("clid")
  }

  get cid() {
    return super.getPropertyByName("cid")
  }

  get databaseId() {
    return super.getPropertyByName("clientDatabaseId")
  }

  get nickname() {
    return super.getPropertyByName("clientNickname")
  }

  get type() {
    return super.getPropertyByName("clientType")
  }

  get uniqueIdentifier() {
    return super.getPropertyByName("clientUniqueIdentifier")
  }

  get away() {
    return super.getPropertyByName("clientAway")
  }

  get awayMessage() {
    return super.getPropertyByName("clientAwayMessage")
  }

  get flagTalking() {
    return super.getPropertyByName("clientFlagTalking")
  }

  get inputMuted() {
    return super.getPropertyByName("clientInputMuted")
  }

  get outputMuted() {
    return super.getPropertyByName("clientOutputMuted")
  }

  get inputHardware() {
    return super.getPropertyByName("clientInputHardware")
  }

  get outputHardware() {
    return super.getPropertyByName("clientOutputHardware")
  }

  get talkPower() {
    return super.getPropertyByName("clientTalkPower")
  }

  get isTalker() {
    return super.getPropertyByName("clientIsTalker")
  }

  get isPrioritySpeaker() {
    return super.getPropertyByName("clientIsPrioritySpeaker")
  }

  get isRecording() {
    return super.getPropertyByName("clientIsRecording")
  }

  get isChannelCommander() {
    return super.getPropertyByName("clientIsChannelCommander")
  }

  get servergroups() {
    return super.getPropertyByName("clientServergroups")
  }

  get channelGroupId() {
    return super.getPropertyByName("clientChannelGroupId")
  }

  get channelGroupInheritedChannelId() {
    return super.getPropertyByName("clientChannelGroupInheritedChannelId")
  }

  get version() {
    return super.getPropertyByName("clientVersion")
  }

  get platform() {
    return super.getPropertyByName("clientPlatform")
  }

  get idleTime() {
    return super.getPropertyByName("clientIdleTime")
  }

  get created() {
    return super.getPropertyByName("clientCreated")
  }

  get lastconnected() {
    return super.getPropertyByName("clientLastconnected")
  }

  get country() {
    return super.getPropertyByName("clientCountry")
  }

  get estimatedLocation() {
    return super.getPropertyByName("clientEstimatedLocation")
  }

  get connectionClientIp() {
    return super.getPropertyByName("connectionClientIp")
  }

  get badges() {
    return super.getPropertyByName("clientBadges")
  }

  /** evaluates if the client is a query client or a normal client */
  isQuery() {
    return this.type === ClientType.ServerQuery
  }

  /**
   * Retrieves a displayable Client Link for the TeamSpeak Chat
   */
  getUrl() {
    return `[URL=client://${this.clid}/${this.uniqueIdentifier}~${encodeURIComponent(this.nickname)}]${this.nickname}[/URL]`
  }

  /** returns general info of the client, requires the client to be online */
  getInfo() {
    return super.getParent().clientInfo(this).then(data => data[0])
  }

  /** returns the clients database info */
  getDBInfo() {
    return super.getParent().clientDbInfo(this).then(data => data[0])
  }

  /** returns a list of custom properties for the client */
  customInfo() {
    return super.getParent().customInfo(this)
  }

  /**
   * removes a custom property from the client
   * @param ident the key which should be deleted
   */
  customDelete(ident: string) {
    return super.getParent().customDelete(this, ident)
  }

  /**
   * creates or updates a custom property for the client
   * ident and value can be any value, and are the key value pair of the custom property
   * @param ident the key which should be set
   * @param value the value which should be set
   */
  customSet(ident: string, value: string) {
    return super.getParent().customSet(this, ident, value)
  }

  /**
   * kicks the client from the server
   * @param msg the message the client should receive when getting kicked
   */
  kickFromServer(msg: string) {
    return super.getParent().clientKick(this, 5, msg)
  }

  /**
   * kicks the client from their currently joined channel
   * @param msg the message the client should receive when getting kicked (max 40 Chars)
   */
  kickFromChannel(msg: string) {
    return super.getParent().clientKick(this, 4, msg)
  }

  /**
   * bans the chosen client with its uid
   * @param banreason ban reason
   * @param time bantime in seconds, if left empty it will result in a permaban
   */
  ban(banreason: string, time?: number) {
    return super.getParent().ban({ uid: this.uniqueIdentifier, time, banreason })
  }

  /**
   * moves the client to a different channel
   * @param cid channel id in which the client should get moved
   * @param cpw the channel password
   */
  move(cid: string|TeamSpeakChannel, cpw?: string) {
    return super.getParent().clientMove(this, cid, cpw)
  }

  /**
   * adds the client to one or more groups
   * @param sgid one or more servergroup ids which the client should be added to
   */
  addGroups(sgid: string|string[]|TeamSpeakServerGroup|TeamSpeakServerGroup[]) {
    return super.getParent().clientAddServerGroup(this, sgid)
  }

  /**
   * Removes the client from one or more groups
   * @param sgid one or more servergroup ids which the client should be added to
   */
  delGroups(sgid: string|string[]|TeamSpeakServerGroup|TeamSpeakServerGroup[]) {
    return super.getParent().clientDelServerGroup(this, sgid)
  }

  /**
   * edits the client
   * @param properties the properties to change
   */
  edit(properties: ClientEdit) {
    return this.getParent().clientEdit(this, properties)
  }

  /**
   * Changes a clients settings using given properties.
   * @param properties the properties which should be modified
   */
  dbEdit(properties: ClientDBEdit) {
    return this.getParent().clientDbEdit(this, properties)
  }

  /**
   * pokes the client with a certain message
   * @param msg the message the client should receive
   */
  poke(msg: string) {
    return super.getParent().clientPoke(this, msg)
  }

  /**
   * sends a textmessage to the client
   * @param msg the message the client should receive
   */
  message(msg: string) {
    return super.getParent().sendTextMessage(this, 1, msg)
  }

  /**
   * returns a list of permissions defined for the client
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid?: boolean) {
    return super.getParent().clientPermList(this, permsid)
  }

  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @param perm the permission object to set
   */
  addPerm(perm: Permission.PermType) {
    return super.getParent().clientAddPerm(this, perm)
  }

  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   */
  createPerm() {
    return super.getParent().clientAddPerm(this, undefined)
  }

  /**
   * Removes a set of specified permissions from a client.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().clientDelPerm(this, perm)
  }

  /** returns a Buffer with the avatar of the user */
  getAvatar() {
    return this.getAvatarName().then(name => super.getParent().downloadFile(`/${name}`))
  }

  /** returns a Buffer with the icon of the client */
  getIcon() {
    return this.getIconId().then(id => super.getParent().downloadIcon(id))
  }

  /** returns the avatar name of the client */
  getAvatarName() {
    return this.getDBInfo().then(data => `avatar_${data.clientBase64HashClientUID}`)
  }

  /** gets the icon name of the client */
  getIconId() {
    return super.getParent().getIconId(this.permList(true))
  }

  /** retrieves the client id from a string or teamspeak client */
  static getId<T extends TeamSpeakClient.ClientType>(client?: T): T extends undefined ? undefined : string
  static getId(client?: TeamSpeakClient.ClientType): string|undefined {
    return client instanceof TeamSpeakClient ? client.clid : client
  }

  /** retrieves the client dbid from a string or teamspeak client */
  static getDbid<T extends TeamSpeakClient.ClientType>(client?: T): T extends undefined ? undefined : string
  static getDbid(client?: TeamSpeakClient.ClientType): string|undefined {
    return client instanceof TeamSpeakClient ? client.databaseId : client
  }

  /** retrieves the client dbid from a string or teamspeak client */
  static getUid<T extends TeamSpeakClient.ClientType>(client?: T): T extends undefined ? undefined : string
  static getUid(client?: TeamSpeakClient.ClientType): string|undefined {
    return client instanceof TeamSpeakClient ? client.uniqueIdentifier : client
  }

  /** retrieves the clients from an array */
  static getMultipleIds(client: TeamSpeakClient.MultiClientType): string[] {
    const list = Array.isArray(client) ? client : [client]
    return list.map(c => TeamSpeakClient.getId(c)) as string[]
  }

  /** retrieves the clients from an array */
  static getMultipleDbids(client: TeamSpeakClient.MultiClientType): string[] {
    const list = Array.isArray(client) ? client : [client]
    return list.map(c => TeamSpeakClient.getDbid(c)) as string[]
  }

  /** retrieves the clients from an array */
  static getMultipleUids(client: TeamSpeakClient.MultiClientType): string[] {
    const list = Array.isArray(client) ? client : [client]
    return list.map(c => TeamSpeakClient.getUid(c)) as string[]
  }

}

export namespace TeamSpeakClient {
  export type ClientType = string|TeamSpeakClient
  export type MultiClientType = string[]|TeamSpeakClient[]|ClientType
}