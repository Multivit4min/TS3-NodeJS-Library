import * as Response from "../../src/types/ResponseTypes"

export function version(props: Partial<Response.Version> = {}): Response.Version {
  return {
    version: "2.0.0",
    build: 0,
    platform: "node",
    ...props
  }
}

export function hostinfo(props: Partial<Response.HostInfo> = {}): Response.HostInfo {
  return {
    instanceUptime: 0,
    hostTimestampUtc: 0,
    virtualserversRunningTotal: 0,
    virtualserversTotalMaxclients: 0,
    virtualserversTotalClientsOnline: 0,
    virtualserversTotalChannelsOnline: 0,
    connectionFiletransferBandwidthSent: 0,
    connectionFiletransferBandwidthReceived: 0,
    connectionFiletransferBytesSentTotal: 0,
    connectionFiletransferBytesReceivedTotal: 0,
    connectionPacketsSentTotal: 0,
    connectionBytesSentTotal: 0,
    connectionPacketsReceivedTotal: 0,
    connectionBytesReceivedTotal: 0,
    connectionBandwidthSentLastSecondTotal: 0,
    connectionBandwidthSentLastMinuteTotal: 0,
    connectionBandwidthReceivedLastSecondTotal: 0,
    connectionBandwidthReceivedLastMinuteTotal: 0,
    ...props
  }
}

export function queryloginlist(props: Partial<Response.QueryLoginEntry> = {}): Response.QueryLoginEntry {
  return {
    cldbid: "1",
    sid: "1",
    clientLoginName: "serveradmin",
    ...props
  }
}

export function queryloginadd(props: Partial<Response.QueryLoginAdd> = {}): Response.QueryLoginAdd {
  return {
    cldbid: "1",
    sid: "0",
    clientLoginName: "serveradmin",
    clientLoginPassword: "foobar",
    ...props
  }
}

export function serverlist(props: Partial<Response.ServerEntry> = {}): Response.ServerEntry {
  return {
    virtualserverId: "1",
    virtualserverPort: 9987,
    virtualserverStatus: "online",
    virtualserverClientsonline: 1,
    virtualserverQueryclientsonline: 1,
    virtualserverMaxclients: 32,
    virtualserverUptime: 0,
    virtualserverName: "TeamSpeak Server",
    virtualserverAutostart: 1,
    virtualserverMachineId: "asdf",
    virtualserverUniqueIdentifier: "foobar=",
    ...props
  }
}

export function channelgrouplist(props: Partial<Response.ChannelGroupEntry> = {}): Response.ChannelGroupEntry {
  return {
    cgid: "1",
    name: "Channel Admin",
    type: 0,
    iconid: "0",
    savedb: 1,
    sortid: 10,
    namemode: 1,
    nModifyp: 75,
    nMemberAddp: 75,
    nMemberRemovep: 75,
    ...props
  }
}

export function servergrouplist(props: Partial<Response.ServerGroupEntry> = {}): Response.ServerGroupEntry {
  return {
    sgid: "1",
    name: "Server Admin",
    type: 0,
    iconid: "0",
    savedb: 1,
    sortid: 10,
    namemode: 1,
    nModifyp: 75,
    nMemberAddp: 75,
    nMemberRemovep: 75,
    ...props
  }
}

export function channellist(props: Partial<Response.ChannelEntry> = {}): Response.ChannelEntry {
  return {
    cid: "1",
    pid: "1",
    channelOrder: 1,
    channelName: "Entrance",
    channelTopic: "",
    channelFlagDefault: true,
    channelFlagPassword: false,
    channelFlagPermanent: true,
    channelFlagSemiPermanent: false,
    channelCodec: 1,
    channelCodecQuality: 10,
    channelNeededTalkPower: 0,
    channelIconId: "0",
    secondsEmpty: 0,
    totalClientsFamily: 1,
    channelMaxclients: 1,
    channelMaxfamilyclients: 0,
    totalClients: 1,
    channelNeededSubscribePower: 0,
    channelBannerGfxUrl: "https://example.tld",
    channelBannerMode: 0,
    ...props
  }
}

export function clientlist(props: Partial<Response.ClientEntry> = {}): Response.ClientEntry {
  return {
    clid: "1",
    cid: "1",
    clientDatabaseId: "1",
    clientNickname: "ServerAdmin",
    clientType: 1,
    clientAway: 0,
    clientAwayMessage: "",
    clientFlagTalking: false,
    clientInputMuted: false,
    clientOutputMuted: false,
    clientInputHardware: false,
    clientOutputHardware: false,
    clientTalkPower: 0,
    clientIsTalker: false,
    clientIsPrioritySpeaker: false,
    clientIsRecording: false,
    clientIsChannelCommander: 0,
    clientUniqueIdentifier: "foobar=",
    clientServergroups: ["1"],
    clientChannelGroupId: "1",
    clientChannelGroupInheritedChannelId: 1,
    clientVersion: "5.0.0",
    clientPlatform: "Node",
    clientIdleTime: 0,
    clientCreated: 0,
    clientLastconnected: 0,
    clientCountry: "AT",
    clientEstimatedLocation: "AT",
    connectionClientIp: "127.0.0.1",
    clientBadges: "",
    ...props
  }
}

export function bindinglist(props: Partial<Response.BindingEntry> = {}): Response.BindingEntry {
  return {
    ip: "127.0.0.1",
    ...props
  }
}

export function whoami(props: Partial<Response.Whoami> = {}): Response.Whoami {
  return {
    virtualserverStatus: "online",
    virtualserverUniqueIdentifier: "foobar=",
    virtualserverPort: 9987,
    virtualserverId: "1",
    clientId: "1",
    clientChannelId: "1",
    clientNickname: "TeamSpeak Query",
    clientDatabaseId: "1",
    clientLoginName: "serveradmin",
    clientUniqueIdentifier: "foobar=",
    clientOriginServerId: "1",
    ...props
  }
}

export function serverinfo(props: Partial<Response.ServerInfo> = {}): Response.ServerInfo {
  return {
    virtualserverUniqueIdentifier: "foobar=",
    virtualserverName: "TeamSpeak Server",
    virtualserverWelcomemessage: "",
    virtualserverMaxclients: 32,
    virtualserverPassword: "",
    virtualserverCreated: 0,
    virtualserverCodecEncryptionMode: 1,
    virtualserverHostmessage: "",
    virtualserverHostmessageMode: 0,
    virtualserverFilebase: "files/",
    virtualserverDefaultServerGroup: "1",
    virtualserverDefaultChannelGroup: "1",
    virtualserverFlagPassword: false,
    virtualserverDefaultChannelAdminGroup: "1",
    virtualserverMaxDownloadTotalBandwidth: -1,
    virtualserverMaxUploadTotalBandwidth: 1,
    virtualserverHostbannerUrl: "",
    virtualserverHostbannerGfxUrl: "",
    virtualserverHostbannerGfxInterval: 0,
    virtualserverComplainAutobanCount: 10,
    virtualserverComplainAutobanTime: 300,
    virtualserverComplainRemoveTime: 90,
    virtualserverMinClientsInChannelBeforeForcedSilence: 100,
    virtualserverPrioritySpeakerDimmModificator: 100,
    virtualserverAntifloodPointsTickReduce: 10,
    virtualserverAntifloodPointsNeededCommandBlock: 10,
    virtualserverAntifloodPointsNeededIpBlock: 10,
    virtualserverHostbuttonTooltip: "",
    virtualserverHostbuttonUrl: "",
    virtualserverHostbuttonGfxUrl: "",
    virtualserverDownloadQuota: -1,
    virtualserverUploadQuota: -1,
    virtualserverNeededIdentitySecurityLevel: 8,
    virtualserverLogClient: 0,
    virtualserverLogQuery: 0,
    virtualserverLogChannel: 0,
    virtualserverLogPermissions: 0,
    virtualserverLogServer: 0,
    virtualserverLogFiletransfer: 0,
    virtualserverMinClientVersion: 0,
    virtualserverNamePhonetic: "TeamSpeak Server",
    virtualserverIconId: "0",
    virtualserverReservedSlots: 1,
    virtualserverWeblistEnabled: 1,
    virtualserverHostbannerMode: 0,
    virtualserverChannelTempDeleteDelayDefault: 0,
    virtualserverMinAndroidVersion: 0,
    virtualserverMinIosVersion: 0,
    virtualserverNickname: "Server",
    virtualserverAntifloodPointsNeededPluginBlock: 10,
    virtualserverStatus: "online",connectionFiletransferBandwidthSent: 0,
    virtualserverTotalPing: 0,
    virtualserverTotalPacketlossTotal: 0,
    virtualserverChannelsonline: 0,
    virtualserverTotalBytesUploaded: 0,
    virtualserverTotalBytesDownloaded: 0,
    virtualserverClientsonline: 1,
    virtualserverQueryclientsonline: 1,
    connectionFiletransferBandwidthReceived: 0,
    connectionFiletransferBytesSentTotal: 4546,
    connectionFiletransferBytesReceivedTotal: 980,
    connectionPacketsSentSpeech: 1353,
    connectionBytesSentSpeech: 154122,
    connectionPacketsReceivedSpeech: 529515,
    connectionBytesReceivedSpeech: 64659599,
    connectionPacketsSentKeepalive: 7603283,
    connectionBytesSentKeepalive: 311734562,
    connectionPacketsReceivedKeepalive: 7602937,
    connectionBytesReceivedKeepalive: 319325301,
    connectionPacketsSentControl: 371530,
    connectionBytesSentControl: 56397556,
    connectionPacketsReceivedControl: 372588,
    connectionBytesReceivedControl: 40685454,
    connectionPacketsSentTotal: 7976166,
    connectionBytesSentTotal: 368286240,
    connectionPacketsReceivedTotal: 8505040,
    connectionBytesReceivedTotal: 424670354,
    connectionBandwidthSentLastSecondTotal: 81,
    connectionBandwidthSentLastMinuteTotal: 103,
    connectionBandwidthReceivedLastSecondTotal: 83,
    connectionBandwidthReceivedLastMinuteTotal: 449,
    ...props
  }
}

export function serveridgetbyport(props: Partial<Response.ServerIdGetByPort> = {}): Response.ServerIdGetByPort {
  return {
    serverId: "1",
    ...props
  }
}

export function serverrequestconnectioninfo(props: Partial<Response.ServerRequestConnectionInfo> = {}): Response.ServerRequestConnectionInfo {
  return {
    connectionFiletransferBandwidthSent: 0,
    connectionFiletransferBandwidthReceived: 0,
    connectionFiletransferBytesSentTotal: 0,
    connectionFiletransferBytesReceivedTotal: 0,
    connectionPacketsSentTotal: 0,
    connectionBytesSentTotal: 0,
    connectionPacketsReceivedTotal: 0,
    connectionBytesReceivedTotal: 0,
    connectionBandwidthSentLastSecondTotal: 0,
    connectionBandwidthSentLastMinuteTotal: 0,
    connectionBandwidthReceivedLastSecondTotal: 0,
    connectionBandwidthReceivedLastMinuteTotal: 0,
    connectionConnectedTime: 0,
    connectionPacketlossTotal: 0,
    connectionPing: 0,
    ...props
  }
}

export function servergroupclientlist(props: Partial<Response.ServerGroupClientEntry> = {}): Response.ServerGroupClientEntry {
  return {
    cldbid: "1",
    clientNickname: "TeamSpeak Client",
    clientUniqueIdentifier: "foobar=",
    ...props
  }
}

export function servergroupcopy(props: Partial<Response.ServerGroupCopy> = {}): Response.ServerGroupCopy {
  return {
    ...props
  }
}

export function channelgroupcopy(props: Partial<Response.ChannelGroupCopy> = {}): Response.ChannelGroupCopy {
  return {
    ...props
  }
}

export function servertemppasswordlist(props: Partial<Response.ServerTempPasswordEntry> = {}): Response.ServerTempPasswordEntry {
  return {
    nickname: "",
    uid: "foobar=",
    desc: "",
    pwClear: "",
    start: 0,
    end: 1000,
    tcid: "1",
    ...props
  }
}

export function channelgroupclientlist(props: Partial<Response.ChannelGroupClientEntry> = {}): Response.ChannelGroupClientEntry {
  return {
    cid: "1",
    cldbid: "1",
    cgid: "1",
    ...props
  }
}

export function permlist(props: Partial<Response.PermEntry> = {}): Response.PermEntry {
  return {
    permid: 1,
    permsid: "b_permission",
    permvalue: 75,
    permnegated: false,
    permskip: false,
    ...props
  }
}

export function channelinfo(props: Partial<Response.ChannelInfo> = {}): Response.ChannelInfo {
  return {
    pid: "1",
    channelName: "Entrance",
    channelTopic: "",
    channelDescription: "",
    channelPassword: "",
    channelCodec: 1,
    channelCodecQuality: 10,
    channelMaxclients: -1,
    channelMaxfamilyclients: -1,
    channelOrder: 1,
    channelFlagPermanent: true,
    channelFlagSemiPermanent: false,
    channelFlagDefault: true,
    channelFlagPassword: false,
    channelCodecLatencyFactor: 1,
    channelCodecIsUnencrypted: 0,
    channelSecuritySalt: "",
    channelDeleteDelay: 0,
    channelFlagMaxclientsUnlimited: true,
    channelFlagMaxfamilyclientsUnlimited: true,
    channelFlagMaxfamilyclientsInherited: true,
    channelFilepath: "files/",
    channelNeededTalkPower: 100,
    channelForcedSilence: 100,
    channelNamePhonetic: "Entrance",
    channelIconId: "0",
    channelBannerGfxUrl: "",
    channelBannerMode: 0,
    secondsEmpty: 0,
    ...props
  }
}

export function clientinfo(props: Partial<Response.ClientInfo> = {}): Response.ClientInfo {
  return {
    cid: "1",
    clientIdleTime: 0,
    clientUniqueIdentifier: "foobar=",
    clientNickname: "TeamSpeak Query",
    clientVersion: "5.0.0",
    clientPlatform: "Node",
    clientInputMuted: 0,
    clientOutputMuted: 0,
    clientOutputonlyMuted: 0,
    clientInputHardware: 0,
    clientOutputHardware: 0,
    clientDefaultChannel: "1",
    clientMetaData: "",
    clientIsRecording: false,
    clientVersionSign: "5.0.0",
    clientSecurityHash: "",
    clientLoginName: "serveradmin",
    clientDatabaseId: 1,
    clientChannelGroupId: "1",
    clientServergroups: ["1"],
    clientCreated: 0,
    clientLastconnected: 0,
    clientTotalconnections: 0,
    clientAway: false,
    clientAwayMessage: "",
    clientType: 1,
    clientFlagAvatar: "0",
    clientTalkPower: 0,
    clientTalkRequest: false,
    clientTalkRequestMsg: "",
    clientDescription: "",
    clientIsTalker: false,
    clientMonthBytesUploaded: 0,
    clientMonthBytesDownloaded: 0,
    clientTotalBytesUploaded: 0,
    clientTotalBytesDownloaded: 0,
    clientIsPrioritySpeaker: false,
    clientNicknamePhonetic: "TeamSpeak Query",
    clientNeededServerqueryViewPower: 0,
    clientDefaultToken: "",
    clientIconId: "0",
    clientIsChannelCommander: false,
    clientCountry: "AT",
    clientChannelGroupInheritedChannelId: "0",
    clientBadges: "",
    clientMyteamspeakId: "",
    clientIntegrations: "",
    clientMyteamspeakAvatar: "",
    clientSignedBadges: "",
    clientBase64HashClientUID: "",
    connectionFiletransferBandwidthSent: 0,
    connectionFiletransferBandwidthReceived: 0,
    connectionPacketsSentTotal: 0,
    connectionBytesSentTotal: 0,
    connectionPacketsReceivedTotal: 0,
    connectionBytesReceivedTotal: 0,
    connectionBandwidthSentLastSecondTotal: 0,
    connectionBandwidthSentLastMinuteTotal: 0,
    connectionBandwidthReceivedLastSecondTotal: 0,
    connectionBandwidthReceivedLastMinuteTotal: 0,
    connectionConnectedTime: 0,
    connectionClientIp: "127.0.0.1",
    ...props
  }
}

export function clientdblist(props: Partial<Response.ClientDBEntry> = {}): Response.ClientDBEntry {
  return {
    count: 0,
    cldbid: "0",
    clientUniqueIdentifier: "",
    clientNickname: "",
    clientCreated: 0,
    clientLastconnected: 0,
    clientTotalconnections: 0,
    clientDescription: "",
    clientLastip: "",
    clientLoginName: "",
    ...props
  }
}

export function clientdbinfo(props: Partial<Response.ClientDBInfo> = {}): Response.ClientDBInfo {
  return {
    clientUniqueIdentifier: "",
    clientNickname: "",
    clientDatabaseId: "0",
    clientCreated: 0,
    clientLastconnected: 0,
    clientTotalconnections: 0,
    clientFlagAvatar: "0",
    clientDescription: "",
    clientMonthBytesUploaded: 0,
    clientMonthBytesDownloaded: 0,
    clientTotalBytesUploaded: 0,
    clientTotalBytesDownloaded: 0,
    clientBase64HashClientUID: "",
    clientLastip: "",
    ...props
  }
}

export function customsearch(props: Partial<Response.CustomSearch> = {}): Response.CustomSearch {
  return {
    cldbid: "0",
    ident: "",
    value: "",
    ...props
  }
}

export function custominfo(props: Partial<Response.CustomInfo> = {}): Response.CustomInfo {
  return {
    cldbid: "0",
    ident: "",
    value: "",
    ...props
  }
}

export function permoverview(props: Partial<Response.PermOverviewEntry> = {}): Response.PermOverviewEntry {
  return {
    t: 0,
    id: 0,
    id2: 0,
    /** perm */
    p: 0,
    /** value */
    v: 0,
    /** negate */
    n: 0,
    /** skip */
    s: 0,
    ...props
  }
}

export function permissionlist(props: Partial<Response.PermissionEntry> = {}): Response.PermissionEntry {
  return {
    permid: 0,
    permname: "",
    permdesc: "",
    ...props
  }
}

export function permidgetbyname(props: Partial<Response.PermIdGetByName> = {}): Response.PermIdGetByName {
  return {
    permsid: "",
    permid: 0,
    ...props
  }
}

export function permget(props: Partial<Response.PermGet> = {}): Response.PermGet {
  return {
    permsid: "",
    permid: 0,
    permvalue: 0,
    ...props
  }
}

export function permfind(props: Partial<Response.PermFind> = {}): Response.PermFind {
  return {
    t: 0,
    id1: 0,
    id2: 0,
    p: 0,
    ...props
  }
}

export function token(props: Partial<Response.Token> = {}): Response.Token {
  return {
    token: "",
    ...props
  }
}

export function privilegekeylist(props: Partial<Response.PrivilegeKeyEntry> = {}): Response.PrivilegeKeyEntry {
  return {
    token: "",
    tokenType: 0,
    tokenId1: 0,
    tokenId2: 0,
    tokenCreated: 0,
    tokenDescription: "",
    tokenCustomset: [{ ident: "foo", value: "bar" }],
    ...props
  }
}

export function messagelist(props: Partial<Response.MessageEntry> = {}): Response.MessageEntry {
  return {
    msgid: "0",
    cluid: "",
    subject: "",
    timestamp: 0,
    flagRead: false,
    ...props
  }
}

export function messageget(props: Partial<Response.MessageGet> = {}): Response.MessageGet {
  return {
    msgid: "0",
    cluid: "",
    subject: "",
    message: "",
    timestamp: 0,
    ...props
  }
}

export function complainlist(props: Partial<Response.ComplainEntry> = {}): Response.ComplainEntry {
  return {
    tcldbid: "0",
    tname: "",
    fcldbid: "0",
    fname: "",
    message: "",
    timestamp: 0,
    ...props
  }
}

export function banadd(props: Partial<Response.BanAdd> = {}): Response.BanAdd {
  return {
    banid: "0",
    ...props
  }
}

export function banlist(props: Partial<Response.BanEntry> = {}): Response.BanEntry {
  return {
    banid: "0",
    ip: "",
    name: "",
    uid: "",
    mytsid: "",
    lastnickname: "",
    created: 0,
    duration: 0,
    invokername: "",
    invokercldbid: "0",
    invokeruid: "",
    reason: "",
    enforcements: 0,
    ...props
  }
}

export function logview(props: Partial<Response.LogView> = {}): Response.LogView {
  return {
    lastPos: 0,
    fileSize: 0,
    l: "",
    ...props
  }
}

export function clientdbfind(props: Partial<Response.ClientDBFind> = {}): Response.ClientDBFind {
  return {
    cldbid: "0",
    ...props
  }
}

export function ftgetfilelist(props: Partial<Response.FTGetFileEntry> = {}): Response.FTGetFileEntry {
  return {
    cid: "0",
    path: "",
    name: "",
    size: 0,
    datetime: 0,
    type: 0,
    ...props
  }
}

export function ftgetfileinfo(props: Partial<Response.FTGetFileInfo> = {}): Response.FTGetFileInfo {
  return {
    cid: "0",
    name: "",
    size: 0,
    datetime: 0,
    ...props
  }
}

export function ftinitupload(props: Partial<Response.FTInitUpload> = {}): Response.FTInitUpload {
  return {
    clientftfid: 0,
    status: 0,
    msg: "",
    size: 0,
    serverftfid: 0,
    ftkey: "",
    port: 0,
    seekpos: 0,
    proto: 0,
    ...props
  }
}

export function ftinitdownload(props: Partial<Response.FTInitDownload> = {}): Response.FTInitDownload {
  return {
    clientftfid: 0,
    size: 0,
    status: 0,
    msg: "",
    serverftfid: 0,
    ftkey: "",
    port: 0,
    proto: 0,
    ...props
  }
}
