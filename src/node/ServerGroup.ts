import { Abstract } from "./Abstract"
import { TeamSpeak } from "../TeamSpeak"
import { ServerGroupList } from "../types/ResponseTypes"

export class TeamSpeakServerGroup extends Abstract {

  constructor(parent: TeamSpeak, list: ServerGroupList) {
    super(parent, list, "servergroup")
  }

  get sgid() {
    return super.getPropertyByName("sgid")!
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
   * Deletes the server group.
   * If force is set to 1, the server group will be deleted even if there are clients within.
   * @param force if set to 1 the servergroup will be deleted even when clients are in it
   */
  del(force?: number) {
    return super.getParent().serverGroupDel(this.sgid, force)
  }

  /**
   * Creates a copy of the server group specified with ssgid. If tsgid is set to 0, the server will create a new group.
   * To overwrite an existing group, simply set tsgid to the ID of a designated target group.
   * If a target group is set, the name parameter will be ignored.
   * @param tsgid the target group, 0 to create a new group
   * @param type type of the group (0 = Query Group | 1 = Normal Group)
   * @param name name of the group
   */
  copy(tsgid: number, type: number, name: string) {
    return super.getParent().serverGroupCopy(this.sgid, tsgid, type, name)
  }

  /**
   * changes the name of the server group
   * @param name new name of the group
   */
  rename(name: string) {
    return super.getParent().serverGroupRename(this.sgid, name)
  }

  /**
   * returns a list of permissions assigned to the server group specified with sgid
   * @param permsid if the permsid option is set to true the output will contain the permission names
   */
  permList(permsid: boolean) {
    return super.getParent().serverGroupPermList(this.sgid, permsid)
  }

  /**
   * Adds a specified permissions to the server group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   * @param value value of the permission
   * @param skip whether the skip flag should be set
   * @param negate whether the negate flag should be set
   */
  addPerm(perm: string|number, value: number, skip?: number, negate?: number) {
    return super.getParent().serverGroupAddPerm(this.sgid, perm, value, skip, negate)
  }

  /**
   * rmoves a set of specified permissions from the server group.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().serverGroupDelPerm(this.sgid, perm)
  }

  /**
   * Adds a client to the server group. Please note that a client cannot be added to default groups or template groups.
   * @param cldbid the client database id which should be added to the Group
   */
  addClient(cldbid: number) {
    return super.getParent().serverGroupAddClient(cldbid, this.sgid)
  }

  /**
   * removes a client specified with cldbid from the servergroup
   * @param cldbid the client database id which should be removed from the group
   */
  delClient(cldbid: number) {
    return super.getParent().serverGroupDelClient(cldbid, this.sgid)
  }

  /** returns the ids of all clients currently residing in the server group */
  clientList() {
    return super.getParent().serverGroupClientList(this.sgid)
  }

  /** returns a buffer with the icon of the servergroup */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }

  /** gets the icon name of the servergroup */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}