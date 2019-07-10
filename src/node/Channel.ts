import { Abstract } from "./Abstract"
import TeamSpeak from "../TeamSpeak"
import { ChannelList } from "../types/ResponseTypes"

export class TeamSpeakChannel extends Abstract {

  constructor(parent: TeamSpeak, list: ChannelList) {
    super(parent, list, "channel")
  }

  get cid() {
    return super.getPropertyByName("cid")!
  }

  get pid() {
    return super.getPropertyByName("pid")!
  }

  get order() {
    return super.getPropertyByName("channel_order")!
  }

  get name() {
    return super.getPropertyByName("channel_name")!
  }

  get topic() {
    return super.getPropertyByName("channel_topic")
  }

  get flagDefault() {
    return super.getPropertyByName("channel_flag_default")
  }

  get flagPassword() {
    return super.getPropertyByName("channel_flag_password")
  }

  get flagPermanent() {
    return super.getPropertyByName("channel_flag_permanent")
  }

  get flagSemiPermanent() {
    return super.getPropertyByName("channel_flag_semi_permanent")
  }

  get codec() {
    return super.getPropertyByName("channel_codec")
  }

  get codecQuality() {
    return super.getPropertyByName("channel_codec_quality")
  }

  get neededTalkPower() {
    return super.getPropertyByName("channel_needed_talk_power")
  }

  get iconId() {
    return super.getPropertyByName("channel_icon_id")
  }

  get secondsEmpty() {
    return super.getPropertyByName("seconds_empty")
  }

  get totalClientsFamily() {
    return super.getPropertyByName("total_clients_family")
  }

  get maxclients() {
    return super.getPropertyByName("channel_maxclients")
  }

  get maxfamilyclients() {
    return super.getPropertyByName("channel_maxfamilyclients")
  }

  get totalClients() {
    return super.getPropertyByName("total_clients")!
  }

  get neededSubscribePower() {
    return super.getPropertyByName("channel_needed_subscribe_power")!
  }

  /** returns detailed configuration information about a channel including ID, topic, description, etc */
  getInfo() {
    return super.getParent().channelInfo(this.cid)
  }

  /**
   * Moves a channel to a new parent channel with the ID cpid.
   * If order is specified, the channel will be sorted right under the channel with the specified ID.
   * If order is set to 0, the channel will be sorted right below the new parent.
   * @param cpid channel parent id
   * @param order channel sort order
   */
  move(cpid: number, order: number = 0) {
    return super.getParent().channelMove(this.cid, cpid, order)
  }

  /**
   * Deletes an existing channel by ID.
   * If force is set to 1, the channel will be deleted even if there are clients within.
   * The clients will be kicked to the default channel with an appropriate reason message.
   * @param {number} force if set to 1 the channel will be deleted even when clients are in it
   */
  del(force: number = 0) {
    return super.getParent().channelDelete(this.cid, force)
  }

  /**
   * @todo
   * Changes a channels configuration using given properties. Note that this command accepts multiple properties which means that you're able to change all settings of the channel specified with cid at once.
   * @param {ChannelEditProps} properties the properties of the channel which should get changed
   * @return {Promise} resolves on success
   */
  edit(properties: any) {
    return super.getParent().channelEdit(this.cid, properties)
  }

  /**
   * Displays a list of permissions defined for a channel.
   * @param permsid whether the permsid should be displayed aswell
   * @return {Promise<PermListResponse[]>}
   */
  permList(permsid: boolean = false) {
    return super.getParent().channelPermList(this.cid, permsid)
  }

  /**
   * Adds a set of specified permissions to a channel.
   * Multiple permissions can be added by providing the two parameters of each permission.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   * @param value the value which should be set
   */
  setPerm(perm: string|number, value: number) {
    return super.getParent().channelSetPerm(this.cid, perm, value)
  }

  /**
   * Removes a set of specified permissions from a channel.
   * Multiple permissions can be removed at once.
   * A permission can be specified by permid or permsid.
   * @param perm the permid or permsid
   */
  delPerm(perm: string|number) {
    return super.getParent().channelDelPerm(this.cid, perm)
  }

  /**
   * @todo
   * Gets a List of Clients in the current Channel
   * @param {ChannelListFilter} [filter] the filter object
   * @return {Promise<TeamSpeakClient[]>}
   */
  getClients(filter: any = {}) {
    filter.cid = this.cid
    return super.getParent().clientList(filter)
  }


  /** returns a buffer with the icon of the channel */
  getIcon() {
    return this.getIconName().then(name => super.getParent().downloadIcon(name))
  }


  /** returns the icon name of the channel */
  getIconName() {
    return super.getParent().getIconName(this.permList(true))
  }

}