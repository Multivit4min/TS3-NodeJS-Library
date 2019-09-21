import { TeamSpeakServer } from "../node/Server"

export declare interface QueryErrorMessage {
  id: number
  msg: string
  extra_msg?: string
  failed_permid?: number
}


export declare interface ClientList {
  clid: number
  cid: number
  client_database_id: number
  client_nickname: string
  client_type: number
  client_away: number
  client_away_message: string
  client_flag_talking: number
  client_input_muted: number
  client_output_muted: number
  client_input_hardware: number
  client_output_hardware: number
  client_talk_power: number
  client_is_talker: number
  client_is_priority_speaker: number
  client_is_recording: number
  client_is_channel_commander: number
  client_unique_identifier: string
  client_servergroups: number[]
  client_channel_group_id: number
  client_channel_group_inherited_channel_id: number
  client_version: string
  client_platform: string
  client_idle_time: number
  client_created: number
  client_lastconnected: number
  client_country: string
  connection_client_ip: string
  client_badges: string
}


export declare interface ChannelList {
  cid: number
  pid: number
  channel_order: number
  channel_name: string
  channel_topic: string
  channel_flag_default: number
  channel_flag_password: number
  channel_flag_permanent: number
  channel_flag_semi_permanent: number
  channel_codec: number
  channel_codec_quality: number
  channel_needed_talk_power: number
  channel_icon_id: number
  seconds_empty: number
  total_clients_family: number
  channel_maxclients: number
  channel_maxfamilyclients: number
  total_clients: number
  channel_needed_subscribe_power: number
}


export declare interface ServerGroupList {
  sgid: number
  name: string
  type: number
  iconid: number
  savedb: number
  sortid: number
  namemode: number
  n_modifyp: number
  n_member_addp: number
  n_member_removep: number
}


export declare interface ChannelGroupList {
  cgid: number
  name: string
  type: number
  iconid: number
  savedb: number
  sortid: number
  namemode: number
  n_modifyp: number
  n_member_addp: number
  n_member_removep: number
}


export declare interface ServerList {
  virtualserver_id: number
  virtualserver_port: number
  virtualserver_status: string
  virtualserver_clientsonline: number
  virtualserver_queryclientsonline: number
  virtualserver_maxclients: number
  virtualserver_uptime: number
  virtualserver_name: string
  virtualserver_autostart: number
  virtualserver_machine_id: string
  virtualserver_unique_identifier: string
}

export declare interface ServerCreate {
  token: string,
  server: TeamSpeakServer
}

export declare interface QueryLoginAdd {
  cldbid: number
  sid: number
  client_login_name: string
  client_login_password: string
}

export declare interface QueryLoginList {
  cldbid: number
  sid: number
  client_login_name: string
}

export declare interface Version {
  version: string
  build: number
  platform: string
}

export declare interface HostInfo {
  instance_uptime: number
  host_timestamp_utc: number
  virtualservers_running_total: number
  virtualservers_total_maxclients: number
  virtualservers_total_clients_online: number
  virtualservers_total_channels_online: number
  connection_filetransfer_bandwidth_sent: number
  connection_filetransfer_bandwidth_received: number
  connection_filetransfer_bytes_sent_total: number
  connection_filetransfer_bytes_received_total: number
  connection_packets_sent_total: number
  connection_bytes_sent_total: number
  connection_packets_received_total: number
  connection_bytes_received_total: number
  connection_bandwidth_sent_last_second_total: number
  connection_bandwidth_sent_last_minute_total: number
  connection_bandwidth_received_last_second_total: number
  connection_bandwidth_received_last_minute_total: number
}

export declare interface InstanceInfo {
  serverinstance_database_version: number
  serverinstance_filetransfer_port: number
  serverinstance_max_download_total_bandwidth: number
  serverinstance_max_upload_total_bandwidth: number
  serverinstance_guest_serverquery_group: number
  serverinstance_serverquery_flood_commands: number
  serverinstance_serverquery_flood_ban_time: number
  serverinstance_template_serveradmin_group: number
  serverinstance_template_serverdefault_group: number
  serverinstance_template_channeladmin_group: number
  serverinstance_template_channeldefault_group: number
  serverinstance_permissions_version: number
  serverinstance_pending_connections_per_ip: number
  serverinstance_serverquery_max_connections_per_ip: number
}

export declare interface BindingList {
  ip: string
}

export declare interface Whoami {
  virtualserver_status: string
  virtualserver_unique_identifier: string
  virtualserver_port: number
  virtualserver_id: number
  client_id: number
  client_channel_id: number
  client_nickname: string
  client_database_id: number
  client_login_name: string
  client_unique_identifier: string
  client_origin_server_id: number
}

export declare interface ServerInfo {
  virtualserver_unique_identifier: string
  virtualserver_name: string
  virtualserver_welcomemessage: string
  virtualserver_maxclients: number
  virtualserver_password: string
  virtualserver_created: number
  virtualserver_codec_encryption_mode: number
  virtualserver_hostmessage: string
  virtualserver_hostmessage_mode: number
  virtualserver_filebase: string
  virtualserver_default_server_group: number
  virtualserver_default_channel_group: number
  virtualserver_flag_password: number
  virtualserver_default_channel_admin_group: number
  virtualserver_max_download_total_bandwidth: number
  virtualserver_max_upload_total_bandwidth: number
  virtualserver_hostbanner_url: string
  virtualserver_hostbanner_gfx_url: string
  virtualserver_hostbanner_gfx_interval: number
  virtualserver_complain_autoban_count: number
  virtualserver_complain_autoban_time: number
  virtualserver_complain_remove_time: number
  virtualserver_min_clients_in_channel_before_forced_silence: number
  virtualserver_priority_speaker_dimm_modificator: number
  virtualserver_antiflood_points_tick_reduce: number
  virtualserver_antiflood_points_needed_command_block: number
  virtualserver_antiflood_points_needed_ip_block: number
  virtualserver_hostbutton_tooltip: string
  virtualserver_hostbutton_url: string
  virtualserver_hostbutton_gfx_url: string
  virtualserver_download_quota: number
  virtualserver_upload_quota: number
  virtualserver_needed_identity_security_level: number
  virtualserver_log_client: number
  virtualserver_log_query: number
  virtualserver_log_channel: number
  virtualserver_log_permissions: number
  virtualserver_log_server: number
  virtualserver_log_filetransfer: number
  virtualserver_min_client_version: number
  virtualserver_name_phonetic: string
  virtualserver_icon_id: number
  virtualserver_reserved_slots: number
  virtualserver_weblist_enabled: number
  virtualserver_hostbanner_mode: number
  virtualserver_channel_temp_delete_delay_default: number
  virtualserver_min_android_version: number
  virtualserver_min_ios_version: number
  virtualserver_nickname: string
  virtualserver_antiflood_points_needed_plugin_block: number
  virtualserver_status: string
}

export declare interface ServerIdGetByPort {
  server_id: number
}

export declare interface ServerRequestConnectionInfo {
  connection_filetransfer_bandwidth_sent: number
  connection_filetransfer_bandwidth_received: number
  connection_filetransfer_bytes_sent_total: number
  connection_filetransfer_bytes_received_total: number
  connection_packets_sent_total: number
  connection_bytes_sent_total: number
  connection_packets_received_total: number
  connection_bytes_received_total: number
  connection_bandwidth_sent_last_second_total: number
  connection_bandwidth_sent_last_minute_total: number
  connection_bandwidth_received_last_second_total: number
  connection_bandwidth_received_last_minute_total: number
  connection_connected_time: number
  connection_packetloss_total: number
  connection_ping: number
}

export declare interface ServerGroupClientList {
  cldbid: number
  client_nickname: string
  client_unique_identifier: string
}

export declare interface ServerGroupCopy {
  /** only available when a new group gets created */
  sgid?: number
}

export declare interface ChannelGroupCopy {
  /** only available when a new group gets created */
  cgid?: number
}

export declare interface ServerTempPasswordList {
  nickname: string
  uid: string
  desc: string
  pw_clear: string
  start: number
  end: number
  tcid: number
}

export declare interface ChannelGroupClientList {
  cid?: number
  cldbid?: number
  cgid?: number
}

export declare interface PermList {
  permid?: number
  permsid?: string
  permvalue: number
  permnegated: number
  permskip: number
}

export declare interface ChannelInfo {
  pid: number
  channel_name: string
  channel_topic: string
  channel_description: string
  channel_password: string
  channel_codec: number
  channel_codec_quality: number
  channel_maxclients: number
  channel_maxfamilyclients: number
  channel_order: number
  channel_flag_permanent: number
  channel_flag_semi_permanent: number
  channel_flag_default: number
  channel_flag_password: number
  channel_codec_latency_factor: number
  channel_codec_is_unencrypted: number
  channel_security_salt: string
  channel_delete_delay: number
  channel_flag_maxclients_unlimited: number
  channel_flag_maxfamilyclients_unlimited: number
  channel_flag_maxfamilyclients_inherited: number
  channel_filepath: string
  channel_needed_talk_power: number
  channel_forced_silence: number
  channel_name_phonetic: string
  channel_icon_id: number
  channel_banner_gfx_url: string
  channel_banner_mode: number
  seconds_empty: number
}

export declare interface ClientInfo {
  cid: number
  client_idle_time: number
  client_unique_identifier: string
  client_nickname: string
  client_version: string
  client_platform: string
  client_input_muted: number
  client_output_muted: number
  client_outputonly_muted: number
  client_input_hardware: number
  client_output_hardware: number
  client_default_channel: number
  client_meta_data: string
  client_is_recording: number
  client_version_sign: string
  client_security_hash: string
  client_login_name: string
  client_database_id: number
  client_channel_group_id: number
  client_servergroups: number[]
  client_created: number
  client_lastconnected: number
  client_totalconnections: number
  client_away: number
  client_away_message: string
  client_type: number
  client_flag_avatar: string
  client_talk_power: number
  client_talk_request: number
  client_talk_request_msg: string
  client_description: string
  client_is_talker: number
  client_month_bytes_uploaded: number
  client_month_bytes_downloaded: number
  client_total_bytes_uploaded: number
  client_total_bytes_downloaded: number
  client_is_priority_speaker: number
  client_nickname_phonetic: string
  client_needed_serverquery_view_power: number
  client_default_token: string
  client_icon_id: number
  client_is_channel_commander: number
  client_country: string
  client_channel_group_inherited_channel_id: number
  client_badges: string
  client_myteamspeak_id: string
  client_integrations: string
  client_myteamspeak_avatar: string
  client_signed_badges: string
  client_base64HashClientUID: string
  connection_filetransfer_bandwidth_sent: number
  connection_filetransfer_bandwidth_received: number
  connection_packets_sent_total: number
  connection_bytes_sent_total: number
  connection_packets_received_total: number
  connection_bytes_received_total: number
  connection_bandwidth_sent_last_second_total: number
  connection_bandwidth_sent_last_minute_total: number
  connection_bandwidth_received_last_second_total: number
  connection_bandwidth_received_last_minute_total: number
  connection_connected_time: number
  connection_client_ip: string
}

export declare interface ClientDBList {
  count: number
  cldbid: number
  client_unique_identifier: string
  client_nickname: string
  client_created: number
  client_lastconnected: number
  client_totalconnections: number
  client_description: string
  client_lastip: string
  client_login_name: string
}

export declare interface ClientDBInfo {
  client_unique_identifier: string
  client_nickname: string
  client_database_id: number
  client_created: number
  client_lastconnected: number
  client_totalconnections: number
  client_flag_avatar: string
  client_description: string
  client_month_bytes_uploaded: number
  client_month_bytes_downloaded: number
  client_total_bytes_uploaded: number
  client_total_bytes_downloaded: number
  client_base64HashClientUID: string
  client_lastip: string
}

export declare interface CustomSearch {
  cldbid: number
  ident: string
  value: string
}

export declare interface CustomInfo {
  cldbid: number
  ident: string
  value: string
}

export declare interface TokenCustomSet {
  ident: string
  value: string
}

export declare interface PermOverview {
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

export declare interface PermissionList {
  permid: number
  permname: string
  permdesc: string
}

export declare interface PermIdGetByName {
  permsid: string 
  permid: number 
}

export declare interface PermGet {
  permsid: string 
  permid: number 
  permvalue: number 
}

export declare interface PermFind {
  t: number 
  id1: number 
  id2: number 
  p: number 
}

export declare interface Token {
  token: string
}

export declare interface PrivilegeKeyList {
  token: string 
  token_type: number 
  token_id1: number 
  token_id2: number 
  token_created: number 
  token_description: string 
}

export declare interface MessageList {
  msgid: number 
  cluid: string 
  subject: string 
  timestamp: number 
  flag_read: number 
}

export declare interface MessageGet {
  msgid: number 
  cluid: string 
  subject: string 
  message: string 
  timestamp: number 
}

export declare interface ComplainList {
  tcldbid: number 
  tname: string 
  fcldbid: number 
  fname: string 
  message: string 
  timestamp: number 
}

export declare interface BanAdd {
  banid: number
}

export declare interface BanList {
  banid: number 
  ip: string 
  name: string 
  uid: string 
  mytsid: string 
  lastnickname: string 
  created: number 
  duration: number 
  invokername: string 
  invokercldbid: number 
  invokeruid: string 
  reason: string 
  enforcements: number 
}

export declare interface LogView {
  last_pos: number
  file_size: number
  l: string 
}

export declare interface ClientDBFind {
  cldbid: number
}

export declare interface FTGetFileList {
  cid: number 
  path: string 
  name: string 
  size: number 
  datetime: number 
  /** 1=file 0=folder */
  type: number 
}

export declare interface FTGetFileInfo {
  cid: number 
  name: string 
  size: number 
  datetime: number 
}

export declare interface FTInitUpload {
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

export declare interface FTInitDownload {
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