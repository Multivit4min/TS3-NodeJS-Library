import { TeamSpeakServer } from "../node/Server"
import { ApiKeyScope, ClientType, Codec } from "./enum"
import { TeamSpeakQuery } from "../transport/TeamSpeakQuery"

export interface ClientSetServerQueryLogin extends TeamSpeakQuery.ResponseEntry {
  clientLoginPassword: string
}

export interface ClientFind extends TeamSpeakQuery.ResponseEntry {
  clid: string
  clientNickname: string
}

export interface ApiKeyAdd extends TeamSpeakQuery.ResponseEntry {
  apikey: string
  id: string
  sid: string
  cldbid: string
  scope: ApiKeyScope
  timeLeft: number
}

export type ApiKeyList = ApiKeyEntry[]

export interface ApiKeyEntry extends TeamSpeakQuery.ResponseEntry {
  count: number
  id: string
  sid: number
  cldbid: number
  scope: ApiKeyScope
  timeLeft: number
  createdAt: number
  expiresAt: number
}

export interface QueryErrorMessage extends TeamSpeakQuery.ResponseEntry {
  id: string
  msg: string
  extraMsg?: string
  failedPermid?: number
}

export type ClientList = ClientEntry[]
export interface ClientEntry extends TeamSpeakQuery.ResponseEntry {
  clid: string
  cid: string
  clientDatabaseId: string
  clientNickname: string
  clientType: number
  clientAway: number
  clientAwayMessage: string
  clientFlagTalking: boolean
  clientInputMuted: boolean
  clientOutputMuted: boolean
  clientInputHardware: boolean
  clientOutputHardware: boolean
  clientTalkPower: number
  clientIsTalker: boolean
  clientIsPrioritySpeaker: boolean
  clientIsRecording: boolean
  clientIsChannelCommander: number
  clientUniqueIdentifier: string
  clientServergroups: string[]
  clientChannelGroupId: string
  clientChannelGroupInheritedChannelId: number
  clientVersion: string
  clientPlatform: string
  clientIdleTime: number
  clientCreated: number
  clientLastconnected: number
  clientCountry: string
  connectionClientIp: string
  clientBadges: string
}

export type ChannelList = ChannelEntry[]
export interface ChannelEntry extends TeamSpeakQuery.ResponseEntry {
  cid: string
  pid: string
  channelOrder: number
  channelName: string
  channelTopic: string
  channelFlagDefault: boolean
  channelFlagPassword: boolean
  channelFlagPermanent: boolean
  channelFlagSemiPermanent: boolean
  channelCodec: Codec
  channelCodecQuality: number
  channelNeededTalkPower: number
  channelIconId: string
  secondsEmpty: number
  totalClientsFamily: number
  channelMaxclients: number
  channelMaxfamilyclients: number
  totalClients: number
  channelNeededSubscribePower: number
  /** only in server version >= 3.11.x */
  channelBannerGfxUrl: string
  /** only in server version >= 3.11.x */
  channelBannerMode: number
}


export type ServerGroupList = ServerGroupEntry[]
export interface ServerGroupEntry extends TeamSpeakQuery.ResponseEntry {
  sgid: string
  name: string
  type: number
  iconid: string
  savedb: number
  sortid: number
  namemode: number
  nModifyp: number
  nMemberAddp: number
  nMemberRemovep: number
}

export interface ServerGroupsByClientId extends TeamSpeakQuery.ResponseEntry {
  name: string
  sgid: string
  cldbid: string
}

export type ChannelClientPermIdList = ChannelClientPermIdEntry[]
export interface ChannelClientPermIdEntry extends TeamSpeakQuery.ResponseEntry {
  cid: string
  cldbid: string
  permid: number
  permvalue: number
  permnegated: boolean
  permskip: boolean
}


export type ChannelClientPermSidList = ChannelClientPermSidEntry[]
export interface ChannelClientPermSidEntry extends TeamSpeakQuery.ResponseEntry {
  cid: string
  cldbid: string
  permsid: string
  permvalue: number
  permnegated: boolean
  permskip: boolean
}


export type ChannelGroupList = ChannelGroupEntry[]
export interface ChannelGroupEntry extends TeamSpeakQuery.ResponseEntry {
  cgid: string
  name: string
  type: number
  iconid: string
  savedb: number
  sortid: number
  namemode: number
  nModifyp: number
  nMemberAddp: number
  nMemberRemovep: number
}


export type ServerList = ServerEntry[]
export interface ServerEntry extends TeamSpeakQuery.ResponseEntry {
  virtualserverId: string
  virtualserverPort: number
  virtualserverStatus: string
  virtualserverClientsonline: number
  virtualserverQueryclientsonline: number
  virtualserverMaxclients: number
  virtualserverUptime: number
  virtualserverName: string
  virtualserverAutostart: number
  virtualserverMachineId: string
  virtualserverUniqueIdentifier: string
}

export interface ServerCreate {
  token: string,
  server: TeamSpeakServer
}

export interface QueryLoginAdd extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
  sid: string
  clientLoginName: string
  clientLoginPassword: string
}

export type QueryLoginList = QueryLoginEntry[]
export interface QueryLoginEntry extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
  sid: string
  clientLoginName: string
}

export interface Version extends TeamSpeakQuery.ResponseEntry {
  version: string
  build: number
  platform: string
}

export interface HostInfo extends TeamSpeakQuery.ResponseEntry {
  instanceUptime: number
  hostTimestampUtc: number
  virtualserversRunningTotal: number
  virtualserversTotalMaxclients: number
  virtualserversTotalClientsOnline: number
  virtualserversTotalChannelsOnline: number
  connectionFiletransferBandwidthSent: number
  connectionFiletransferBandwidthReceived: number
  connectionFiletransferBytesSentTotal: number
  connectionFiletransferBytesReceivedTotal: number
  connectionPacketsSentTotal: number
  connectionBytesSentTotal: number
  connectionPacketsReceivedTotal: number
  connectionBytesReceivedTotal: number
  connectionBandwidthSentLastSecondTotal: number
  connectionBandwidthSentLastMinuteTotal: number
  connectionBandwidthReceivedLastSecondTotal: number
  connectionBandwidthReceivedLastMinuteTotal: number
}

export interface InstanceInfo extends TeamSpeakQuery.ResponseEntry {
  serverinstanceDatabaseVersion: number
  serverinstanceFiletransferPort: number
  serverinstanceMaxDownloadTotalBandwidth: number
  serverinstanceMaxUploadTotalBandwidth: number
  serverinstanceGuestServerqueryGroup: number
  serverinstanceServerqueryFloodCommands: number
  serverinstanceServerqueryFloodBanTime: number
  serverinstanceTemplateServeradminGroup: number
  serverinstanceTemplateServerdefaultGroup: string
  serverinstanceTemplateChanneladminGroup: string
  serverinstanceTemplateChanneldefaultGroup: string
  serverinstancePermissionsVersion: number
  serverinstancePendingConnectionsPerIp: number
  serverinstanceServerqueryMaxConnectionsPerIp: number
}

export type BindingList = BindingEntry[]
export interface BindingEntry extends TeamSpeakQuery.ResponseEntry {
  ip: string
}

export interface Whoami extends TeamSpeakQuery.ResponseEntry {
  virtualserverStatus: string
  virtualserverUniqueIdentifier: string
  virtualserverPort: number
  virtualserverId: string
  clientId: string
  clientChannelId: string
  clientNickname: string
  clientDatabaseId: string
  clientLoginName: string
  clientUniqueIdentifier: string
  clientOriginServerId: string
}

export interface ServerInfo extends TeamSpeakQuery.ResponseEntry {
  virtualserverUniqueIdentifier: string
  virtualserverName: string
  virtualserverWelcomemessage: string
  virtualserverMaxclients: number
  virtualserverPassword: string
  virtualserverCreated: number
  virtualserverCodecEncryptionMode: number
  virtualserverHostmessage: string
  virtualserverHostmessageMode: number
  virtualserverFilebase: string
  virtualserverDefaultServerGroup: string
  virtualserverDefaultChannelGroup: string
  virtualserverFlagPassword: boolean
  virtualserverDefaultChannelAdminGroup: string
  virtualserverMaxDownloadTotalBandwidth: number
  virtualserverMaxUploadTotalBandwidth: number
  virtualserverHostbannerUrl: string
  virtualserverHostbannerGfxUrl: string
  virtualserverHostbannerGfxInterval: number
  virtualserverComplainAutobanCount: number
  virtualserverComplainAutobanTime: number
  virtualserverComplainRemoveTime: number
  virtualserverMinClientsInChannelBeforeForcedSilence: number
  virtualserverPrioritySpeakerDimmModificator: number
  virtualserverAntifloodPointsTickReduce: number
  virtualserverAntifloodPointsNeededCommandBlock: number
  virtualserverAntifloodPointsNeededIpBlock: number
  virtualserverHostbuttonTooltip: string
  virtualserverHostbuttonUrl: string
  virtualserverHostbuttonGfxUrl: string
  virtualserverDownloadQuota: number
  virtualserverUploadQuota: number
  virtualserverNeededIdentitySecurityLevel: number
  virtualserverLogClient: number
  virtualserverLogQuery: number
  virtualserverLogChannel: number
  virtualserverLogPermissions: number
  virtualserverLogServer: number
  virtualserverLogFiletransfer: number
  virtualserverMinClientVersion: number
  virtualserverNamePhonetic: string
  virtualserverIconId: string
  virtualserverReservedSlots: number
  virtualserverWeblistEnabled: number
  virtualserverHostbannerMode: number
  virtualserverChannelTempDeleteDelayDefault: number
  virtualserverMinAndroidVersion: number
  virtualserverMinIosVersion: number
  virtualserverNickname: string
  virtualserverAntifloodPointsNeededPluginBlock: number
  virtualserverStatus: string
  virtualserverTotalPing: number
  virtualserverTotalPacketlossTotal: number
  virtualserverChannelsonline: number
  virtualserverTotalBytesUploaded: number
  virtualserverTotalBytesDownloaded: number
  virtualserverClientsonline: number
  virtualserverQueryclientsonline: number
  connectionFiletransferBandwidthSent: number
  connectionFiletransferBandwidthReceived: number
  connectionFiletransferBytesSentTotal: number
  connectionFiletransferBytesReceivedTotal: number
  connectionPacketsSentSpeech: number
  connectionBytesSentSpeech: number
  connectionPacketsReceivedSpeech: number
  connectionBytesReceivedSpeech: number
  connectionPacketsSentKeepalive: number
  connectionBytesSentKeepalive: number
  connectionPacketsReceivedKeepalive: number
  connectionBytesReceivedKeepalive: number
  connectionPacketsSentControl: number
  connectionBytesSentControl: number
  connectionPacketsReceivedControl: number
  connectionBytesReceivedControl: number
  connectionPacketsSentTotal: number
  connectionBytesSentTotal: number
  connectionPacketsReceivedTotal: number
  connectionBytesReceivedTotal: number
  connectionBandwidthSentLastSecondTotal: number
  connectionBandwidthSentLastMinuteTotal: number
  connectionBandwidthReceivedLastSecondTotal: number
  connectionBandwidthReceivedLastMinuteTotal: number
}

export interface ServerIdGetByPort extends TeamSpeakQuery.ResponseEntry {
  serverId: string
}

export interface ServerRequestConnectionInfo extends TeamSpeakQuery.ResponseEntry {
  connectionFiletransferBandwidthSent: number
  connectionFiletransferBandwidthReceived: number
  connectionFiletransferBytesSentTotal: number
  connectionFiletransferBytesReceivedTotal: number
  connectionPacketsSentTotal: number
  connectionBytesSentTotal: number
  connectionPacketsReceivedTotal: number
  connectionBytesReceivedTotal: number
  connectionBandwidthSentLastSecondTotal: number
  connectionBandwidthSentLastMinuteTotal: number
  connectionBandwidthReceivedLastSecondTotal: number
  connectionBandwidthReceivedLastMinuteTotal: number
  connectionConnectedTime: number
  connectionPacketlossTotal: number
  connectionPing: number
}

export type ServerGroupClientList = ServerGroupClientEntry[]
export interface ServerGroupClientEntry extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
  clientNickname: string
  clientUniqueIdentifier: string
}

export interface ServerGroupCopy extends TeamSpeakQuery.ResponseEntry {
  /** only available when a new group gets created */
  sgid?: string
}

export interface ChannelGroupCopy extends TeamSpeakQuery.ResponseEntry {
  /** only available when a new group gets created */
  cgid?: string
}

export type ServerTempPasswordList = ServerTempPasswordEntry[]
export interface ServerTempPasswordEntry extends TeamSpeakQuery.ResponseEntry {
  nickname: string
  uid: string
  desc: string
  pwClear: string
  start: number
  end: number
  tcid: string
}

export type ChannelGroupClientList = ChannelGroupClientEntry[]
export interface ChannelGroupClientEntry extends TeamSpeakQuery.ResponseEntry {
  cid?: string
  cldbid?: string
  cgid?: string
}

export type PermList = PermEntry[]
export interface PermEntry extends TeamSpeakQuery.ResponseEntry {
  permid?: number
  permsid?: string
  permvalue: number
  permnegated: boolean
  permskip: boolean
}

export interface ChannelFind extends TeamSpeakQuery.ResponseEntry {
  cid: string
  channelName: string
}

export interface ChannelInfo extends TeamSpeakQuery.ResponseEntry {
  pid: string
  channelName: string
  channelTopic: string
  channelDescription: string
  channelPassword: string
  channelCodec: number
  channelCodecQuality: number
  channelMaxclients: number
  channelMaxfamilyclients: number
  channelOrder: number
  channelFlagPermanent: boolean
  channelFlagSemiPermanent: boolean
  channelFlagDefault: boolean
  channelFlagPassword: boolean
  channelCodecLatencyFactor: number
  channelCodecIsUnencrypted: number
  channelSecuritySalt: string
  channelDeleteDelay: number
  channelFlagMaxclientsUnlimited: boolean
  channelFlagMaxfamilyclientsUnlimited: boolean
  channelFlagMaxfamilyclientsInherited: boolean
  channelFilepath: string
  channelNeededTalkPower: number
  channelForcedSilence: number
  channelNamePhonetic: string
  channelIconId: string
  channelBannerGfxUrl: string
  channelBannerMode: number
  secondsEmpty: number
}

export type ClientGetIds = ClientGetIdEntry[]
export interface ClientGetIdEntry extends TeamSpeakQuery.ResponseEntry {
  cluid: string
  clid: string
  name: string
}

export interface ClientGetDbidFromUid extends TeamSpeakQuery.ResponseEntry {
  cluid: string
  cldbid: string
}

export interface ClientGetNameFromUid extends TeamSpeakQuery.ResponseEntry {
  cluid: string
  cldbid: string
  name: string
}

export interface ClientGetUidFromClid extends TeamSpeakQuery.ResponseEntry {
  clid: string
  cluid: string
  nickname: string
}

export interface ClientGetNameFromDbid extends TeamSpeakQuery.ResponseEntry {
  cluid: string
  cldbid: string
  name: string
}

export interface ClientInfo extends TeamSpeakQuery.ResponseEntry {
  cid: string
  clientIdleTime: number
  clientUniqueIdentifier: string
  clientNickname: string
  clientVersion: string
  clientPlatform: string
  clientInputMuted: number
  clientOutputMuted: number
  clientOutputonlyMuted: number
  clientInputHardware: number
  clientOutputHardware: number
  clientDefaultChannel: string
  clientMetaData: string
  clientIsRecording: boolean
  clientVersionSign: string
  clientSecurityHash: string
  clientLoginName: string
  clientDatabaseId: number
  clientChannelGroupId: string
  clientServergroups: string[]
  clientCreated: number
  clientLastconnected: number
  clientTotalconnections: number
  clientAway: boolean
  clientAwayMessage: string
  clientType: ClientType
  clientFlagAvatar: string
  clientTalkPower: number
  clientTalkRequest: boolean
  clientTalkRequestMsg: string
  clientDescription: string
  clientIsTalker: boolean
  clientMonthBytesUploaded: number
  clientMonthBytesDownloaded: number
  clientTotalBytesUploaded: number
  clientTotalBytesDownloaded: number
  clientIsPrioritySpeaker: boolean
  clientNicknamePhonetic: string
  clientNeededServerqueryViewPower: number
  clientDefaultToken: string
  clientIconId: string
  clientIsChannelCommander: boolean
  clientCountry: string
  clientChannelGroupInheritedChannelId: string
  clientBadges: string
  clientMyteamspeakId: string
  clientIntegrations: string
  clientMyteamspeakAvatar: string
  clientSignedBadges: string
  clientBase64HashClientUID: string
  connectionFiletransferBandwidthSent: number
  connectionFiletransferBandwidthReceived: number
  connectionPacketsSentTotal: number
  connectionBytesSentTotal: number
  connectionPacketsReceivedTotal: number
  connectionBytesReceivedTotal: number
  connectionBandwidthSentLastSecondTotal: number
  connectionBandwidthSentLastMinuteTotal: number
  connectionBandwidthReceivedLastSecondTotal: number
  connectionBandwidthReceivedLastMinuteTotal: number
  connectionConnectedTime: number
  connectionClientIp: string
}

export type ClientDBList = ClientDBEntry[]
export interface ClientDBEntry extends TeamSpeakQuery.ResponseEntry {
  count: number
  cldbid: string
  clientUniqueIdentifier: string
  clientNickname: string
  clientCreated: number
  clientLastconnected: number
  clientTotalconnections: number
  clientDescription: string
  clientLastip: string
  clientLoginName: string
}

export interface ClientDBInfo extends TeamSpeakQuery.ResponseEntry {
  clientUniqueIdentifier: string
  clientNickname: string
  clientDatabaseId: string
  clientCreated: number
  clientLastconnected: number
  clientTotalconnections: number
  clientFlagAvatar: string
  clientDescription: string
  clientMonthBytesUploaded: number
  clientMonthBytesDownloaded: number
  clientTotalBytesUploaded: number
  clientTotalBytesDownloaded: number
  clientBase64HashClientUID: string
  clientLastip: string
}

export interface CustomSearch extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
  ident: string
  value: string
}

export interface CustomInfo extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
  ident: string
  value: string
}

export interface TokenCustomSet extends TeamSpeakQuery.ResponseEntry {
  ident: string
  value: string
}

export type PermOverview = PermOverviewEntry[]
export interface PermOverviewEntry extends TeamSpeakQuery.ResponseEntry {
  t: number
  id: number
  id2: number
  /** perm */
  p: number
  /** value */
  v: number
  /** negate */
  n: number
  /** skip */
  s: number
}

export type PermissionList = PermissionEntry[]
export interface PermissionEntry extends TeamSpeakQuery.ResponseEntry {
  permid: number
  permname: string
  permdesc: string
}

export interface PermIdGetByName extends TeamSpeakQuery.ResponseEntry {
  permsid: string
  permid: number
}

export interface PermGet extends TeamSpeakQuery.ResponseEntry {
  permsid: string
  permid: number
  permvalue: number
}

export interface PermFind extends TeamSpeakQuery.ResponseEntry {
  t: number
  id1: number
  id2: number
  p: number
}

export interface Token extends TeamSpeakQuery.ResponseEntry {
  token: string
}

export type PrivilegeKeyList = PrivilegeKeyEntry[]
export interface PrivilegeKeyEntry extends TeamSpeakQuery.ResponseEntry {
  token: string
  tokenType: number
  tokenId1: number
  tokenId2: number
  tokenCreated: number
  tokenDescription: string
  /** only in server version >= 3.11.x */
  tokenCustomset: TokenCustomSet[]
}

export type MessageList = MessageEntry[]
export interface MessageEntry extends TeamSpeakQuery.ResponseEntry {
  msgid: string
  cluid: string
  subject: string
  timestamp: number
  flagRead: boolean
}

export interface MessageGet extends TeamSpeakQuery.ResponseEntry {
  msgid: string
  cluid: string
  subject: string
  message: string
  timestamp: number
}

export type ComplainList = ComplainEntry[]
export interface ComplainEntry extends TeamSpeakQuery.ResponseEntry {
  tcldbid: string
  tname: string
  fcldbid: string
  fname: string
  message: string
  timestamp: number
}

export interface BanAdd extends TeamSpeakQuery.ResponseEntry {
  banid: string
}

export type BanList = BanEntry[]
export interface BanEntry extends TeamSpeakQuery.ResponseEntry {
  banid: string
  ip: string
  name: string
  uid: string
  mytsid: string
  lastnickname: string
  created: number
  duration: number
  invokername: string
  invokercldbid: string
  invokeruid: string
  reason: string
  enforcements: number
}

export interface LogView extends TeamSpeakQuery.ResponseEntry {
  lastPos: number
  fileSize: number
  l: string
}

export interface ClientDBFind extends TeamSpeakQuery.ResponseEntry {
  cldbid: string
}

export type FTList = FileTransferEntry[]
export interface FileTransferEntry extends TeamSpeakQuery.ResponseEntry {
  clid: string
  path: string
  name: string
  size: number
  sizedone: number
  clientftfid: number
  serverftfid: number
  sender: number
  status: number
  currentSpeed: number
  averageSpeed: number
  runtime: number
}

export type FTGetFileList = FTGetFileEntry[]
export interface FTGetFileEntry extends TeamSpeakQuery.ResponseEntry {
  cid: string
  path: string
  name: string
  size: number
  datetime: number
  /** 1=file 0=folder */
  type: number
}

export interface FTGetFileInfo extends TeamSpeakQuery.ResponseEntry {
  cid: string
  name: string
  size: number
  datetime: number
}

export interface FTInitUpload extends TeamSpeakQuery.ResponseEntry {
  clientftfid: number
  /** exists when an error occured */
  status?: number
  /** exists when an error occured */
  msg?: string
  /** exists when an error occured */
  size?: number
  /** exists when file is uploadable */
  serverftfid?: number
  /** exists when file is uploadable */
  ftkey?: string
  /** exists when file is uploadable */
  port?: number
  /** exists when file is uploadable */
  seekpos?: number
  /** exists when file is uploadable */
  proto?: number
}

export interface FTInitDownload extends TeamSpeakQuery.ResponseEntry {
  clientftfid: number
  size: number
  /** exists when an error occured */
  status?: number
  /** exists when an error occured */
  msg?: string
  /** exists when file is downloadable */
  serverftfid?: number
  /** exists when file is downloadable */
  ftkey?: string
  /** exists when file is downloadable */
  port?: number
  /** exists when file is downloadable */
  proto?: number
}

export interface SnapshotCreate extends TeamSpeakQuery.ResponseEntry {
  version: number,
  /** only exists when a password has been set otherwise it will be undefined */
  salt?: string,
  snapshot: string
}
