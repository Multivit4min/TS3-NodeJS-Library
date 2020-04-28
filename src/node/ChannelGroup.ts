import { Abstract } from "./Abstract"
import { TeamSpeak } from "../TeamSpeak"
import { ChannelGroupEntry } from "../types/ResponseTypes"
import { TeamSpeakChannel } from "./Channel"
import { TeamSpeakClient } from "./Client"
import { Permission } from "util/Permission"

export class TeamSpeakChannelGroup extends Abstract<ChannelGroupEntry> {

  constructor(parent: TeamSpeak, list: ChannelGroupEntry) {
    super(parent, list, "channelgroup")
  }

  get cgid() {
    return super.getPropertyByName("cgid")!
  }

  get name() {
    return super.getPropertyByName("name")!
  }

  get type() {
    return super.getPropertyByName("type")!
  }

  get iconid() {
    return super.getPropertyByName("iconid")!
  }

  get savedb() {
    return super.getPropertyByName("savedb")!
  }

  get sortid() {
    return super.getPropertyByName("sortid")!
  }

  get namemode() {
    return super.getPropertyByName("namemode")!
  }

  get nModifyp() {
    return super.getPropertyByName("nModifyp")!
  }

  get nMemberAddp() {
    return super.getPropertyByName("nMemberAddp")!
  }

  get nMemberRemovep() {
    return super.getPropertyByName("nMemberRemovep")!
  }

  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @param force if set to 1 the channelgroup will be deleted even when clients are in it
   */
  del(force?: boolean) {
    return super.getParent().deleteChannelGroup(this, force)
  }

  /**
   * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param tcgid the target group, 0 to create a new group
   * @param type the type of the group (0 = Template Group | 1 = Normal Group)
   * @param name name of the group
   */
  copy(tcgid: string|TeamSpeakChannelGroup, type: number, name: string) {
    return super.getParent().channelGroupCopy(this, tcgid, type, name)
  }

  /**
   * changes the name of the channelgroup
   * @param name new name of the group
   */
  rename(name: string) {
    return super.getParent().channelGroupRename(this, name)
  }

  /**
   * returns a list of permissions assigned to the channel group specified with cgid.
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid: boolean = false) {
    return super.getParent().channelGroupPermList(this, permsid)
  }

  /**
   * Adds a specified permissions to the channel group.
   * A permission can be specified by permid or permsid.
   * @param perm the permission object
   */
  addPerm(perm: Permission.PermType) {
    return super.getParent().channelGroupAddPerm(this, perm)
  }

  /**
   * Adds a specified permissions to the channel group.
   * A permission can be specified by permid or permsid.
   */
  createPerm() {
    return super.getParent().channelGroupAddPerm(this)
  }

  /**
   * Removes a set of specified permissions from the channel group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().channelGroupDelPerm(this, perm)
  }

  /**
   * sets the channel group of a client
   * @param channel the channel in which the client should be assigned the Group
   * @param client the client database id which should be added to the Group
   */
  setClient(channel: string|TeamSpeakChannel, client: string|TeamSpeakClient) {
    return super.getParent().setClientChannelGroup(this, channel, client)
  }

  /**
   * returns the ids of all clients currently residing in the channelgroup
   * @param channel the channel id
   */
  clientList(channel: string|TeamSpeakChannel) {
    return super.getParent().channelGroupClientList(this, channel)
  }

  /** returns a buffer with the icon of the channelgroup */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }

  /** gets the icon name of the channelgroup */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

  /** retrieves the client id from a string or teamspeak client */
  static getId<T extends TeamSpeakChannelGroup.GroupType>(channel?: T): T extends undefined ? undefined : string
  static getId(channel?: TeamSpeakChannelGroup.GroupType): string|undefined {
    return channel instanceof TeamSpeakChannelGroup ? channel.cgid : channel
  }

  /** retrieves the clients from an array */
  static getMultipleIds(client: TeamSpeakChannelGroup.MultiGroupType): string[] {
    const list = Array.isArray(client) ? client : [client]
    return list.map(c => TeamSpeakChannelGroup.getId(c)) as string[]
  }

}
export namespace TeamSpeakChannelGroup {
  export type GroupType = string|TeamSpeakChannelGroup
  export type MultiGroupType = string[]|TeamSpeakChannelGroup[]|GroupType
}