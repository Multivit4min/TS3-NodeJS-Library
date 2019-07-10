import { Abstract } from "./Abstract"
import TeamSpeak from "../TeamSpeak"
import { ClientList } from "../types/ResponseTypes"
import { ClientDBEditProps } from "../types/PropertyTypes";

const FileTransfer = require("../transport/FileTransfer")

export class TeamSpeakClient extends Abstract {

  constructor(parent: TeamSpeak, list: ClientList) {
    super(parent, list, "client")
  }

  get clid() {
    return super.getPropertyByName("clid")!
  }

  get cid() {
    return super.getPropertyByName("cid")!
  }

  get databaseId() {
    return super.getPropertyByName("client_database_id")!
  }

  get nickname() {
    return super.getPropertyByName("client_nickname")!
  }

  get type() {
    return super.getPropertyByName("client_type")!
  }

  get uniqueIdentifier() {
    return super.getPropertyByName("client_unique_identifier")!
  }

  get away() {
    return super.getPropertyByName("client_away")
  }

  get awayMessage() {
    return super.getPropertyByName("client_away_message")
  }

  get flagTalking() {
    return super.getPropertyByName("client_flag_talking")
  }

  get inputMuted() {
    return super.getPropertyByName("client_input_muted")
  }

  get outputMuted() {
    return super.getPropertyByName("client_output_muted")
  }

  get inputHardware() {
    return super.getPropertyByName("client_input_hardware")
  }

  get outputHardware() {
    return super.getPropertyByName("client_output_hardware")
  }

  get talkPower() {
    return super.getPropertyByName("client_talk_power")
  }

  get isTalker() {
    return super.getPropertyByName("client_is_talker")
  }

  get isPrioritySpeaker() {
    return super.getPropertyByName("client_is_priority_speaker")
  }

  get isRecording() {
    return super.getPropertyByName("client_is_recording")
  }

  get isChannelCommander() {
    return super.getPropertyByName("client_is_channel_commander")
  }

  get servergroups() {
    return super.getPropertyByName("client_servergroups")
  }

  get channelGroupId() {
    return super.getPropertyByName("client_channel_group_id")
  }

  get channelGroupInheritedChannelId() {
    return super.getPropertyByName("client_channel_group_inherited_channel_id")
  }

  get version() {
    return super.getPropertyByName("client_version")
  }

  get platform() {
    return super.getPropertyByName("client_platform")
  }

  get idleTime() {
    return super.getPropertyByName("client_idle_time")
  }

  get created() {
    return super.getPropertyByName("client_created")
  }

  get lastconnected() {
    return super.getPropertyByName("client_lastconnected")
  }

  get country() {
    return super.getPropertyByName("client_country")
  }

  get connectionClientIp() {
    return super.getPropertyByName("connection_client_ip")
  }

  get badges() {
    return super.getPropertyByName("client_badges")
  }

  /** evaluates if the client is a query client or a normal client */
  isQuery() {
    return this.type === 1
  }

  /**
   * Retrieves a displayable Client Link for the TeamSpeak Chat
   */
  getURL() {
    return `[URL=client://${this.clid}/${this.uniqueIdentifier}~${encodeURIComponent(this.nickname)}]${this.nickname}[/URL]`
  }

  /** returns general info of the client, requires the client to be online */
  getInfo() {
    return super.getParent().clientInfo(this.clid).then(data => data[0])
  }

  /** returns the clients database info */
  getDBInfo() {
    return super.getParent().clientDBInfo(this.databaseId).then(data => data[0])
  }

  /** returns a list of custom properties for the client */
  customInfo() {
    return super.getParent().customInfo(this.databaseId)
  }

  /**
   * removes a custom property from the client
   * @param ident the key which should be deleted
   */
  customDelete(ident: string) {
    return super.getParent().customDelete(this.databaseId, ident)
  }

  /**
   * creates or updates a custom property for the client
   * ident and value can be any value, and are the key value pair of the custom property
   * @param ident the key which should be set
   * @param value the value which should be set
   */
  customSet(ident: string, value: string) {
    return super.getParent().customSet(this.databaseId, ident, value)
  }

  /**
   * kicks the client from the server
   * @param msg the message the client should receive when getting kicked
   */
  kickFromServer(msg: string) {
    return super.getParent().clientKick(this.clid, 5, msg)
  }

  /**
   * kicks the client from their currently joined channel
   * @param msg the message the client should receive when getting kicked (max 40 Chars)
   */
  kickFromChannel(msg: string) {
    return super.getParent().clientKick(this.clid, 4, msg)
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
  move(cid: number, cpw?: string) {
    return super.getParent().clientMove(this.clid, cid, cpw)
  }

  /**
   * adds the client to one or more groups
   * @param sgid one or more servergroup ids which the client should be added to
   */
  addGroups(sgid: number|number[]) {
    return super.getParent().clientAddServerGroup(this.databaseId, sgid)
  }

  /**
   * Removes the client from one or more groups
   * @param sgid one or more servergroup ids which the client should be added to
   */
  delGroups(sgid: number|number[]) {
    return super.getParent().clientDelServerGroup(this.databaseId, sgid)
  }

  /**
   * Changes a clients settings using given properties.
   * @param properties the properties which should be modified
   */
  dbEdit(properties: ClientDBEditProps) {
    return this.getParent().clientDBEdit(this.databaseId, properties)
  }

  /**
   * pokes the client with a certain message
   * @param msg the message the client should receive
   */
  poke(msg: string) {
    return super.getParent().clientPoke(this.clid, msg)
  }

  /**
   * sends a textmessage to the client
   * @param msg the message the client should receive
   */
  message(msg: string) {
    return super.getParent().sendTextMessage(this.clid, 1, msg)
  }

  /**
   * returns a list of permissions defined for the client
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid?: boolean) {
    return super.getParent().clientPermList(this.databaseId, permsid)
  }

  /**
   * Adds a set of specified permissions to a client.
   * Multiple permissions can be added by providing the three parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   * @param value value of the permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  addPerm(perm: string|number, value: number, skip?: number, negate?: number) {
    return super.getParent().clientAddPerm(this.databaseId, perm, value, skip, negate)
  }

  /**
   * Removes a set of specified permissions from a client.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().clientDelPerm(this.databaseId, perm)
  }

  /** returns a Buffer with the avatar of the user */
  getAvatar() {
    return this.getAvatarName()
      .then(name => super.getParent().ftInitDownload({name: `/${name}`}))
      .then(res => new FileTransfer(super.getParent().config.host, res.port).download(res.ftkey, res.size))
  }

  /** returns a Buffer with the icon of the client */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }

  /** returns the avatar name of the client */
  getAvatarName() {
    return this.getDBInfo().then(data => `avatar_${data.client_base64HashClientUID}`)
  }

  /** gets the icon name of the client */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}