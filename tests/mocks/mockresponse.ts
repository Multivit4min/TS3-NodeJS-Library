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
    instance_uptime: 0,
    host_timestamp_utc: 0,
    virtualservers_running_total: 0,
    virtualservers_total_maxclients: 0,
    virtualservers_total_clients_online: 0,
    virtualservers_total_channels_online: 0,
    connection_filetransfer_bandwidth_sent: 0,
    connection_filetransfer_bandwidth_received: 0,
    connection_filetransfer_bytes_sent_total: 0,
    connection_filetransfer_bytes_received_total: 0,
    connection_packets_sent_total: 0,
    connection_bytes_sent_total: 0,
    connection_packets_received_total: 0,
    connection_bytes_received_total: 0,
    connection_bandwidth_sent_last_second_total: 0,
    connection_bandwidth_sent_last_minute_total: 0,
    connection_bandwidth_received_last_second_total: 0,
    connection_bandwidth_received_last_minute_total: 0,
    ...props
  }
}

export function queryloginlist(props: Partial<Response.QueryLoginList> = {}): Response.QueryLoginList {
  return {
    cldbid: 1,
    sid: 1,
    client_login_name: "serveradmin",
    ...props
  }
}

export function queryloginadd(props: Partial<Response.QueryLoginAdd> = {}): Response.QueryLoginAdd {
  return {
    cldbid: 1,
    sid: 0,
    client_login_name: "serveradmin",
    client_login_password: "foobar",
    ...props
  }
}

export function serverlist(props: Partial<Response.ServerList> = {}): Response.ServerList {
  return {
    virtualserver_id: 1,
    virtualserver_port: 9987,
    virtualserver_status: "online",
    virtualserver_clientsonline: 1,
    virtualserver_queryclientsonline: 1,
    virtualserver_maxclients: 32,
    virtualserver_uptime: 0,
    virtualserver_name: "TeamSpeak Server",
    virtualserver_autostart: 1,
    virtualserver_machine_id: 1337,
    virtualserver_unique_identifier: "foobar=",
    ...props
  }
}

export function channelgrouplist(props: Partial<Response.ChannelGroupList> = {}): Response.ChannelGroupList {
  return {
    cgid: 1,
    name: "Channel Admin",
    type: 0,
    iconid: 0,
    savedb: 1,
    sortid: 10,
    namemode: 1,
    n_modifyp: 75,
    n_member_addp: 75,
    n_member_removep: 75,
    ...props
  }
}

export function servergrouplist(props: Partial<Response.ServerGroupList> = {}): Response.ServerGroupList {
  return {
    sgid: 1,
    name: "Server Admin",
    type: 0,
    iconid: 0,
    savedb: 1,
    sortid: 10,
    namemode: 1,
    n_modifyp: 75,
    n_member_addp: 75,
    n_member_removep: 75,
    ...props
  }
}

export function channellist(props: Partial<Response.ChannelList> = {}): Response.ChannelList {
  return {
    cid: 1,
    pid: 1,
    channel_order: 1,
    channel_name: "Entrance",
    channel_topic: "",
    channel_flag_default: 1,
    channel_flag_password: 0,
    channel_flag_permanent: 1,
    channel_flag_semi_permanent: 0,
    channel_codec: 1,
    channel_codec_quality: 10,
    channel_needed_talk_power: 0,
    channel_icon_id: 0,
    seconds_empty: 0,
    total_clients_family: 1,
    channel_maxclients: 1,
    channel_maxfamilyclients: 0,
    total_clients: 1,
    channel_needed_subscribe_power: 0,
    ...props
  }
}

export function clientlist(props: Partial<Response.ClientList> = {}): Response.ClientList {
  return {
    clid: 1,
    cid: 1,
    client_database_id: 1,
    client_nickname: "ServerAdmin",
    client_type: 1,
    client_away: 0,
    client_away_message: "",
    client_flag_talking: 0,
    client_input_muted: 0,
    client_output_muted: 0,
    client_input_hardware: 0,
    client_output_hardware: 0,
    client_talk_power: 0,
    client_is_talker: 0,
    client_is_priority_speaker: 0,
    client_is_recording: 0,
    client_is_channel_commander: 0,
    client_unique_identifier: "foobar=",
    client_servergroups: [1],
    client_channel_group_id: 1,
    client_channel_group_inherited_channel_id: 1,
    client_version: "5.0.0",
    client_platform: "Node",
    client_idle_time: 0,
    client_created: 0,
    client_lastconnected: 0,
    client_country: "AT",
    connection_client_ip: "127.0.0.1",
    client_badges: "",
    ...props
  }
}

export function bindinglist(props: Partial<Response.BindingList> = {}): Response.BindingList {
  return {
    ip: "127.0.0.1",
    ...props
  }
}

export function whoami(props: Partial<Response.Whoami> = {}): Response.Whoami {
  return {
    virtualserver_status: "online",
    virtualserver_unique_identifier: "foobar=",
    virtualserver_port: 9987,
    virtualserver_id: 1,
    client_id: 1,
    client_channel_id: 1,
    client_nickname: "TeamSpeak Query",
    client_database_id: 1,
    client_login_name: "serveradmin",
    client_unique_identifier: "foobar=",
    client_origin_server_id: 1,
    ...props
  }
}

export function serverinfo(props: Partial<Response.ServerInfo> = {}): Response.ServerInfo {
  return {
    virtualserver_unique_identifier: "foobar=",
    virtualserver_name: "TeamSpeak Server",
    virtualserver_welcomemessage: "",
    virtualserver_maxclients: 32,
    virtualserver_password: "",
    virtualserver_created: 0,
    virtualserver_codec_encryption_mode: 1,
    virtualserver_hostmessage: "",
    virtualserver_hostmessage_mode: 0,
    virtualserver_filebase: "files/",
    virtualserver_default_server_group: 1,
    virtualserver_default_channel_group: 1,
    virtualserver_flag_password: 0,
    virtualserver_default_channel_admin_group: 1,
    virtualserver_max_download_total_bandwidth: -1,
    virtualserver_max_upload_total_bandwidth: 1,
    virtualserver_hostbanner_url: "",
    virtualserver_hostbanner_gfx_url: "",
    virtualserver_hostbanner_gfx_interval: 0,
    virtualserver_complain_autoban_count: 10,
    virtualserver_complain_autoban_time: 300,
    virtualserver_complain_remove_time: 90,
    virtualserver_min_clients_in_channel_before_forced_silence: 100,
    virtualserver_priority_speaker_dimm_modificator: 100,
    virtualserver_antiflood_points_tick_reduce: 10,
    virtualserver_antiflood_points_needed_command_block: 10,
    virtualserver_antiflood_points_needed_ip_block: 10,
    virtualserver_hostbutton_tooltip: "",
    virtualserver_hostbutton_url: "",
    virtualserver_hostbutton_gfx_url: "",
    virtualserver_download_quota: -1,
    virtualserver_upload_quota: -1,
    virtualserver_needed_identity_security_level: 8,
    virtualserver_log_client: 0,
    virtualserver_log_query: 0,
    virtualserver_log_channel: 0,
    virtualserver_log_permissions: 0,
    virtualserver_log_server: 0,
    virtualserver_log_filetransfer: 0,
    virtualserver_min_client_version: 0,
    virtualserver_name_phonetic: "TeamSpeak Server",
    virtualserver_icon_id: 0,
    virtualserver_reserved_slots: 1,
    virtualserver_weblist_enabled: 1,
    virtualserver_hostbanner_mode: 0,
    virtualserver_channel_temp_delete_delay_default: 0,
    virtualserver_min_android_version: 0,
    virtualserver_min_ios_version: 0,
    virtualserver_nickname: "Server",
    virtualserver_antiflood_points_needed_plugin_block: 10,
    virtualserver_status: "online",
    ...props
  }
}

export function serveridgetbyport(props: Partial<Response.ServerIdGetByPort> = {}): Response.ServerIdGetByPort {
  return {
    server_id: 1,
    ...props
  }
}

export function serverrequestconnectioninfo(props: Partial<Response.ServerRequestConnectionInfo> = {}): Response.ServerRequestConnectionInfo {
  return {
    connection_filetransfer_bandwidth_sent: 0,
    connection_filetransfer_bandwidth_received: 0,
    connection_filetransfer_bytes_sent_total: 0,
    connection_filetransfer_bytes_received_total: 0,
    connection_packets_sent_total: 0,
    connection_bytes_sent_total: 0,
    connection_packets_received_total: 0,
    connection_bytes_received_total: 0,
    connection_bandwidth_sent_last_second_total: 0,
    connection_bandwidth_sent_last_minute_total: 0,
    connection_bandwidth_received_last_second_total: 0,
    connection_bandwidth_received_last_minute_total: 0,
    connection_connected_time: 0,
    connection_packetloss_total: 0,
    connection_ping: 0,
    ...props
  }
}

export function servergroupclientlist(props: Partial<Response.ServerGroupClientList> = {}): Response.ServerGroupClientList {
  return {
    cldbid: 1,
    client_nickname: "TeamSpeak Client",
    client_unique_identifier: "foobar=",
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

export function servertemppasswordlist(props: Partial<Response.ServerTempPasswordList> = {}): Response.ServerTempPasswordList {
  return {
    nickname: "",
    uid: "foobar=",
    desc: "",
    pw_clear: "",
    start: 0,
    end: 1000,
    tcid: 1,
    ...props
  }
}

export function channelgroupclientlist(props: Partial<Response.ChannelGroupClientList> = {}): Response.ChannelGroupClientList {
  return {
    cid: 1,
    cldbid: 1,
    cgid: 1,
    ...props
  }
}

export function permlist(props: Partial<Response.PermList> = {}): Response.PermList {
  return {
    permid: 1,
    permsid: "b_permission",
    permvalue: 75,
    permnegated: 0,
    permskip: 0,
    ...props
  }
}

export function channelinfo(props: Partial<Response.ChannelInfo> = {}): Response.ChannelInfo {
  return {
    pid: 1,
    channel_name: "Entrance",
    channel_topic: "",
    channel_description: "",
    channel_password: "",
    channel_codec: 1,
    channel_codec_quality: 10,
    channel_maxclients: -1,
    channel_maxfamilyclients: -1,
    channel_order: 1,
    channel_flag_permanent: 1,
    channel_flag_semi_permanent: 0,
    channel_flag_default: 1,
    channel_flag_password: 0,
    channel_codec_latency_factor: 1,
    channel_codec_is_unencrypted: 0,
    channel_security_salt: "",
    channel_delete_delay: 0,
    channel_flag_maxclients_unlimited: 1,
    channel_flag_maxfamilyclients_unlimited: 1,
    channel_flag_maxfamilyclients_inherited: 1,
    channel_filepath: "files/",
    channel_needed_talk_power: 100,
    channel_forced_silence: 100,
    channel_name_phonetic: "Entrance",
    channel_icon_id: 0,
    channel_banner_gfx_url: "",
    channel_banner_mode: 0,
    seconds_empty: 0,
    ...props
  }
}

export function clientinfo(props: Partial<Response.ClientInfo> = {}): Response.ClientInfo {
  return {
    cid: 1,
    client_idle_time: 0,
    client_unique_identifier: "foobar=",
    client_nickname: "TeamSpeak Query",
    client_version: "5.0.0",
    client_platform: "Node",
    client_input_muted: 0,
    client_output_muted: 0,
    client_outputonly_muted: 0,
    client_input_hardware: 0,
    client_output_hardware: 0,
    client_default_channel: 1,
    client_meta_data: "",
    client_is_recording: 0,
    client_version_sign: "5.0.0",
    client_security_hash: "",
    client_login_name: "serveradmin",
    client_database_id: 1,
    client_channel_group_id: 1,
    client_servergroups: [1],
    client_created: 0,
    client_lastconnected: 0,
    client_totalconnections: 0,
    client_away: 0,
    client_away_message: "",
    client_type: 1,
    client_flag_avatar: "0",
    client_talk_power: 0,
    client_talk_request: 0,
    client_talk_request_msg: "",
    client_description: "",
    client_is_talker: 0,
    client_month_bytes_uploaded: 0,
    client_month_bytes_downloaded: 0,
    client_total_bytes_uploaded: 0,
    client_total_bytes_downloaded: 0,
    client_is_priority_speaker: 0,
    client_nickname_phonetic: "TeamSpeak Query",
    client_needed_serverquery_view_power: 0,
    client_default_token: "",
    client_icon_id: 0,
    client_is_channel_commander: 0,
    client_country: "AT",
    client_channel_group_inherited_channel_id: 0,
    client_badges: "",
    client_myteamspeak_id: "",
    client_integrations: "",
    client_myteamspeak_avatar: "",
    client_signed_badges: "",
    client_base64HashClientUID: "",
    connection_filetransfer_bandwidth_sent: 0,
    connection_filetransfer_bandwidth_received: 0,
    connection_packets_sent_total: 0,
    connection_bytes_sent_total: 0,
    connection_packets_received_total: 0,
    connection_bytes_received_total: 0,
    connection_bandwidth_sent_last_second_total: 0,
    connection_bandwidth_sent_last_minute_total: 0,
    connection_bandwidth_received_last_second_total: 0,
    connection_bandwidth_received_last_minute_total: 0,
    connection_connected_time: 0,
    connection_client_ip: "127.0.0.1",
    ...props
  }
}

export function clientdblist(props: Partial<Response.ClientDBList> = {}): Response.ClientDBList {
  return {
    count: 0,
    cldbid: 0,
    client_unique_identifier: "",
    client_nickname: "",
    client_created: 0,
    client_lastconnected: 0,
    client_totalconnections: 0,
    client_description: "",
    client_lastip: "",
    client_login_name: "",
    ...props
  }
}

export function clientdbinfo(props: Partial<Response.ClientDBInfo> = {}): Response.ClientDBInfo {
  return {
    client_unique_identifier: "",
    client_nickname: "",
    client_database_id: 0,
    client_created: 0,
    client_lastconnected: 0,
    client_totalconnections: 0,
    client_flag_avatar: "0",
    client_description: "",
    client_month_bytes_uploaded: 0,
    client_month_bytes_downloaded: 0,
    client_total_bytes_uploaded: 0,
    client_total_bytes_downloaded: 0,
    client_base64HashClientUID: "",
    client_lastip: "",
    ...props
  }
}

export function customsearch(props: Partial<Response.CustomSearch> = {}): Response.CustomSearch {
  return {
    cldbid: 0,
    ident: "",
    value: "",
    ...props
  }
}

export function custominfo(props: Partial<Response.CustomInfo> = {}): Response.CustomInfo {
  return {
    cldbid: 0,
    ident: "",
    value: "",
    ...props
  }
}

export function permoverview(props: Partial<Response.PermOverview> = {}): Response.PermOverview {
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

export function permissionlist(props: Partial<Response.PermissionList> = {}): Response.PermissionList {
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

export function privilegekeylist(props: Partial<Response.PrivilegeKeyList> = {}): Response.PrivilegeKeyList {
  return {
    token: "",
    token_type: 0,
    token_id1: 0,
    token_id2: 0,
    token_created: 0,
    token_description: "",
    ...props
  }
}

export function messagelist(props: Partial<Response.MessageList> = {}): Response.MessageList {
  return {
    msgid: 0,
    cluid: "",
    subject: "",
    timestamp: 0,
    flag_read: 0,
    ...props
  }
}

export function messageget(props: Partial<Response.MessageGet> = {}): Response.MessageGet {
  return {
    msgid: 0,
    cluid: "",
    subject: "",
    message: "",
    timestamp: 0,
    ...props
  }
}

export function complainlist(props: Partial<Response.ComplainList> = {}): Response.ComplainList {
  return {
    tcldbid: 0,
    tname: "",
    fcldbid: 0,
    fname: "",
    message: "",
    timestamp: 0,
    ...props
  }
}

export function banadd(props: Partial<Response.BanAdd> = {}): Response.BanAdd {
  return {
    banid: 0,
    ...props
  }
}

export function banlist(props: Partial<Response.BanList> = {}): Response.BanList {
  return {
    banid: 0,
    ip: "",
    name: "",
    uid: "",
    mytsid: "",
    lastnickname: "",
    created: 0,
    duration: 0,
    invokername: "",
    invokercldbid: 0,
    invokeruid: "",
    reason: "",
    enforcements: 0,
    ...props
  }
}

export function logview(props: Partial<Response.LogView> = {}): Response.LogView {
  return {
    last_pos: 0,
    file_size: 0,
    l: "",
    ...props
  }
}

export function clientdbfind(props: Partial<Response.ClientDBFind> = {}): Response.ClientDBFind {
  return {
    cldbid: 0,
    ...props
  }
}

export function ftgetfilelist(props: Partial<Response.FTGetFileList> = {}): Response.FTGetFileList {
  return {
    cid: 0,
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
    cid: 0,
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
