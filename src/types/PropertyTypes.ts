import * as ENUM from "./enum"
import { TeamSpeakQuery } from "../transport/TeamSpeakQuery"

export interface ApiKeyList extends TeamSpeakQuery.ResponseEntry {
  /** database ids to list  */
  cldbid?: string|"*"
  /** offset from where the list should start */
  start?: number
  /** amount of entries to retrieve */
  duration?: number
}

export interface ApiKeyAdd extends TeamSpeakQuery.ResponseEntry {
  scope: ENUM.ApiKeyScope
  /* validity of token in days */
  lifetime?: number
  cldbid?: string
}

export interface ClientUpdate extends TeamSpeakQuery.ResponseEntry {
  clientNickname: string
}

export interface ClientDBEdit extends TeamSpeakQuery.ResponseEntry {
  clientDescription: string
}

export interface ClientEdit extends TeamSpeakQuery.ResponseEntry {
  clientDescription?: string
  clientIsTalker?: boolean
}

export interface ServerEdit extends TeamSpeakQuery.ResponseEntry {
  virtualserverName?: string
  virtualserverWelcomemessage?: string
  virtualserverMaxclients?: number
  virtualserverPassword?: string
  virtualserverHostmessage?: string
  virtualserverHostmessageMode?: ENUM.HostMessageMode
  virtualserverDefaultServerGroup?: number
  virtualserverDefaultChannelGroup?: number
  virtualserverDefaultChannelAdminGroup?: number
  virtualserverMaxDownloadTotalBandwidth?: number
  virtualserverMaxUploadTotalBandwidth?: number
  virtualserverHostbannerUrl?: string
  virtualserverHostbannerGfxUrl?: string
  virtualserverHostbannerGfxInterval?: number
  virtualserverComplainAutobanCount?: number
  virtualserverComplainAutobanTime?: number
  virtualserverComplainRemoveTime?: number
  virtualserverMinClientsInChannelBeforeForcedSilence?: number
  virtualserverPrioritySpeakerDimmModificator?: number
  virtualserverAntifloodPointsTickReduce?: number
  virtualserverAntifloodPointsNeededCommandBlock?: number
  virtualserverAntifloodPointsNeededPluginBlock?: number
  virtualserverAntifloodPointsNeededIpBlock?: number
  virtualserverHostbannerMode?: ENUM.HostBannerMode
  virtualserverHostbuttonTooltip?: string
  virtualserverHostbuttonGfxUrl?: string
  virtualserverHostbuttonUrl?: string
  virtualserverDownloadQuota?: number
  virtualserverUploadQuota?: number
  virtualserverMachineId?: string
  virtualserverPort?: number
  virtualserverAutostart?: number
  virtualserverStatus?: string
  virtualserverLogClient?: number
  virtualserverLogQuery?: number
  virtualserverLogChannel?: number
  virtualserverLogPermissions?: number
  virtualserverLogServer?: number
  virtualserverLogFiletransfer?: number
  virtualserverMinClientVersion?: number
  virtualserverMinAndroidVersion?: number
  virtualserverMinIosVersion?: number
  virtualserverNeededIdentitySecurityLevel?: number
  virtualserverNamePhonetic?: string
  virtualserverIconId?: number
  virtualserverReservedSlots?: number
  virtualserverWeblistEnabled?: number
  virtualserverCodecEncryptionMode?: ENUM.CodecEncryptionMode
}

export interface ChannelEdit extends TeamSpeakQuery.ResponseEntry {
  cid?: string
  cpid?: string
  channelName?: string
  channelTopic?: string
  channelPassword?: string
  channelDescription?: string
  channelCodec?: ENUM.Codec
  channelCodecQuality?: number
  channelMaxclients?: number
  channelMaxfamilyclients?: number
  channelOrder?: number
  channelFlagPermanent?: boolean
  channelFlagSemiPermanent?: boolean
  channelFlagTemporary?: boolean
  channelFlagDefault?: boolean
  channelFlagMaxclientsUnlimited?: boolean
  channelFlagMaxfamilyclientsInherited?: boolean
  channelNeededTalkPower?: number
  channelNamePhonetic?: string
  channelCodecIsUnencrypted?: boolean
}

export interface InstanceEdit extends TeamSpeakQuery.ResponseEntry {
  serverinstanceTemplateServeradminGroup?: string
  serverinstanceFiletransferPort?: number
  serverinstanceMaxDownloadTotalBandwidth?: number
  serverinstanceMaxUploadTotalBandwidth?: number
  serverinstanceTemplateServerdefaultGroup?: string
  serverinstanceTemplateChanneldefaultGroup?: string
  serverinstanceTemplateChanneladminGroup?: string
  serverinstanceServerqueryFloodCommands?: number
  serverinstanceServerqueryFloodTime?: number
  serverinstanceServerqueryFloodBanTime?: number
}

export interface ServerTempPasswordAdd extends TeamSpeakQuery.ResponseEntry {
  /** the temporary password */
  pw: string
  /** description of the password */
  desc?: string
  /** the duration the password is valid in seconds */
  duration: number
  /** the channel to let the user join */
  tcid?: string
  /** the password to the channel */
  tcpw?: string
}

export interface BanAdd extends TeamSpeakQuery.ResponseEntry {
  /** ip regular expression */
  ip?: string
  /** name regular expression */
  name?: string
  /** uid regular expression */
  uid?: string
  /** myteamspeak id, use "empty" to ban all clients without connected myteamspeak */
  mytsid?: string
  /** bantime in seconds, if left empty it will result in a permaban */
  time?: number
  /** ban reason */
  banreason: string
}

export interface BanClient extends TeamSpeakQuery.ResponseEntry {
  clid: string
  /** myteamspeak id, use "empty" to ban all clients without connected myteamspeak */
  mytsid?: string
  /** bantime in seconds, if left empty it will result in a permaban */
  time?: number
  /** ban reason */
  banreason: string
}

export interface TransferUpload extends TeamSpeakQuery.ResponseEntry {
  /** arbitary id to identify the transfer */
  clientftfid?: number
  /** destination filename */
  name: string
  /** size of the file */
  size: number
  /** channel id to upload to */
  cid?: string
  /** channel password of the channel which will be uploaded to */
  cpw?: string
  /** overwrites an existing file */
  overwrite?: number
  resume?: number
}

export interface TransferDownload extends TeamSpeakQuery.ResponseEntry {
  /** arbitary id to identify the transfer */
  clientftfid?: number
  /** destination filename */
  name: string
  /** channel id to upload to */
  cid?: string
  /** channel password of the channel which will be uploaded to */
  cpw?: string
  seekpos?: number
}