import { Abstract } from "./Abstract"
import TeamSpeak from "../TeamSpeak"
import { ChannelGroupList } from "../types/ResponseTypes"

export class TeamSpeakChannelGroup extends Abstract {

  constructor(parent: TeamSpeak, list: ChannelGroupList) {
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
    return super.getPropertyByName("n_modifyp")!
  }

  get nMemberAddp() {
    return super.getPropertyByName("n_member_addp")!
  }

  get nMemberRemovep() {
    return super.getPropertyByName("n_member_removep")!
  }

  /**
   * Deletes the channel group. If force is set to 1, the channel group will be deleted even if there are clients within.
   * @param force if set to 1 the channelgroup will be deleted even when clients are in it
   */
  del(force?: number) {
    return super.getParent().deleteChannelGroup(this.cgid, force)
  }

  /**
   * Creates a copy of the channel group. If tcgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tcgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param tcgid the target group, 0 to create a new group
   * @param type the type of the group (0 = Template Group | 1 = Normal Group)
   * @param name name of the group
   */
  copy(tcgid: number, type: number, name: string) {
    return super.getParent().channelGroupCopy(this.cgid, tcgid, type, name)
  }

  /**
   * changes the name of the channelgroup
   * @param name new name of the group
   */
  rename(name: string) {
    return super.getParent().channelGroupRename(this.cgid, name)
  }

  /**
   * returns a list of permissions assigned to the channel group specified with cgid.
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid: boolean = false) {
    return super.getParent().channelGroupPermList(this.cgid, permsid)
  }

  /**
   * Adds a specified permissions to the channel group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   * @param value value of the Permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  addPerm(perm: string|number, value: number, skip?: number, negate?: number) {
    return super.getParent().channelGroupAddPerm(this.cgid, perm, value, skip, negate)
  }

  /**
   * Removes a set of specified permissions from the channel group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().channelGroupDelPerm(this.cgid, perm)
  }

  /**
   * sets the channel group of a client
   * @param cid the channel in which the client should be assigned the Group
   * @param cldbid the client database id which should be added to the Group
   */
  setClient(cid: number, cldbid: number) {
    return super.getParent().setClientChannelGroup(this.cgid, cid, cldbid)
  }

  /**
   * returns the ids of all clients currently residing in the channelgroup
   * @param cid the channel id
   */
  clientList(cid: number) {
    return super.getParent().channelGroupClientList(this.cgid, cid)
  }

  /** returns a buffer with the icon of the channelgroup */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }

  /** gets the icon name of the channelgroup */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}