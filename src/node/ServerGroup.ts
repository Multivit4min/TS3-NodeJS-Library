import { Abstract } from "./Abstract"
import { TeamSpeak } from "../TeamSpeak"
import { ServerGroupEntry } from "../types/ResponseTypes"
import { TeamSpeakClient } from "./Client"

export class TeamSpeakServerGroup extends Abstract<ServerGroupEntry> {

  constructor(parent: TeamSpeak, list: ServerGroupEntry) {
    super(parent, list, "servergroup")
  }

  get sgid() {
    return super.getPropertyByName("sgid")
  }

  get name() {
    return super.getPropertyByName("name")
  }

  get type() {
    return super.getPropertyByName("type")
  }

  get iconid() {
    return super.getPropertyByName("iconid")
  }

  get savedb() {
    return super.getPropertyByName("savedb")
  }

  get sortid() {
    return super.getPropertyByName("sortid")
  }

  get namemode() {
    return super.getPropertyByName("namemode")
  }

  get nModifyp() {
    return super.getPropertyByName("nModifyp")
  }

  get nMemberAddp() {
    return super.getPropertyByName("nMemberAddp")
  }

  get nMemberRemovep() {
    return super.getPropertyByName("nMemberRemovep")
  }

  /**
   * Deletes the server group.
   * If force is set to 1, the server group will be deleted even if there are clients within.
   * @param force if set to 1 the servergroup will be deleted even when clients are in it
   */
  del(force?: boolean) {
    return super.getParent().serverGroupDel(this, force)
  }

  /**
   * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tsgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param tsgid the target group, 0 to create a new group
   * @param type type of the group (0 = Query Group | 1 = Normal Group)
   * @param name name of the group
   */
  copy(targetGroup: string|TeamSpeakServerGroup, type: number, name: string) {
    return super.getParent().serverGroupCopy(this, targetGroup, type, name)
  }

  /**
   * changes the name of the server group
   * @param name new name of the group
   */
  rename(name: string) {
    return super.getParent().serverGroupRename(this, name)
  }

  /**
   * returns a list of permissions assigned to the server group specified with sgid
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid: boolean) {
    return super.getParent().serverGroupPermList(this, permsid)
  }

  /**
   * Adds a specified permissions to the server group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   * @param value value of the permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  addPerm(perm: string|number, value: string, skip?: number, negate?: number) {
    return super.getParent().serverGroupAddPerm(this, perm, value, skip, negate)
  }

  /**
   * rmoves a set of specified permissions from the server group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().serverGroupDelPerm(this, perm)
  }

  /**
   * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
   * @param client the client database id which should be added to the Group
   */
  addClient(client: TeamSpeakClient.ClientType) {
    return super.getParent().serverGroupAddClient(client, this)
  }

  /**
   * removes a client specified with cldbid from the servergroup
   * @param client the client database id which should be removed from the group
   */
  delClient(client: TeamSpeakClient.ClientType) {
    return super.getParent().serverGroupDelClient(client, this)
  }

  /** returns the ids of all clients currently residing in the server group */
  clientList() {
    return super.getParent().serverGroupClientList(this)
  }

  /** returns a buffer with the icon of the servergroup */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }

  /** gets the icon name of the servergroup */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

  /** retrieves the client id from a string or teamspeak client */
  static getId<T extends TeamSpeakServerGroup.GroupType>(group?: T): T extends undefined ? undefined : string
  static getId(group?: TeamSpeakServerGroup.GroupType): string|undefined {
    return group instanceof TeamSpeakServerGroup ? group.sgid : group
  }

  /** retrieves the clients from an array */
  static getMultipleIds(groups: TeamSpeakServerGroup.MultiGroupType) {
    const list = Array.isArray(groups) ? groups : [groups]
    return list.map(c => TeamSpeakServerGroup.getId(c)) as string[]
  }

}

export namespace TeamSpeakServerGroup {
  export type GroupType = string|TeamSpeakServerGroup
  export type MultiGroupType = string[]|TeamSpeakServerGroup[]|GroupType
}