/**
 * @typedef {object} RawQueryResponse
 * @property {number} sid
 * @property {number} server_id
 * @property {string} virtualserver_nickname
 * @property {string} virtualserver_unique_identifier
 * @property {string} virtualserver_name
 * @property {string} virtualserver_welcomemessage
 * @property {string} virtualserver_platform
 * @property {string} virtualserver_version
 * @property {number} virtualserver_maxclients
 * @property {string} virtualserver_password
 * @property {number} virtualserver_clientsonline
 * @property {number} virtualserver_channelsonline
 * @property {number} virtualserver_created
 * @property {number} virtualserver_uptime
 * @property {number} virtualserver_codec_encryption_mode
 * @property {string} virtualserver_hostmessage
 * @property {number} virtualserver_hostmessage_mode
 * @property {string} virtualserver_filebase
 * @property {number} virtualserver_default_server_group
 * @property {number} virtualserver_default_channel_group
 * @property {number} virtualserver_flag_password
 * @property {number} virtualserver_default_channel_admin_group
 * @property {number} virtualserver_max_download_total_bandwidth
 * @property {number} virtualserver_max_upload_total_bandwidth
 * @property {string} virtualserver_hostbanner_url
 * @property {string} virtualserver_hostbanner_gfx_url
 * @property {number} virtualserver_hostbanner_gfx_interval
 * @property {number} virtualserver_complain_autoban_count
 * @property {number} virtualserver_complain_autoban_time
 * @property {number} virtualserver_complain_remove_time
 * @property {number} virtualserver_min_clients_in_channel_before_forced_silence
 * @property {number} virtualserver_priority_speaker_dimm_modificator
 * @property {number} virtualserver_id
 * @property {number} virtualserver_antiflood_points_needed_plugin_block
 * @property {number} virtualserver_antiflood_points_tick_reduce
 * @property {number} virtualserver_antiflood_points_needed_command_block
 * @property {number} virtualserver_antiflood_points_needed_ip_block
 * @property {number} virtualserver_client_connections
 * @property {number} virtualserver_query_client_connections
 * @property {string} virtualserver_hostbutton_tooltip
 * @property {string} virtualserver_hostbutton_url
 * @property {string} virtualserver_hostbutton_gfx_url
 * @property {number} virtualserver_queryclientsonline
 * @property {number} virtualserver_download_quota
 * @property {number} virtualserver_upload_quota
 * @property {number} virtualserver_month_bytes_downloaded
 * @property {number} virtualserver_month_bytes_uploaded
 * @property {number} virtualserver_total_bytes_downloaded
 * @property {number} virtualserver_total_bytes_uploaded
 * @property {number} virtualserver_port
 * @property {number} virtualserver_autostart
 * @property {number} virtualserver_machine_id
 * @property {number} virtualserver_needed_identity_security_level
 * @property {number} virtualserver_log_client
 * @property {number} virtualserver_log_query
 * @property {number} virtualserver_log_channel
 * @property {number} virtualserver_log_permissions
 * @property {number} virtualserver_log_server
 * @property {number} virtualserver_log_filetransfer
 * @property {number} virtualserver_min_client_version
 * @property {string} virtualserver_name_phonetic
 * @property {number} virtualserver_icon_id
 * @property {number} virtualserver_reserved_slots
 * @property {number} virtualserver_total_packetloss_speech
 * @property {number} virtualserver_total_packetloss_keepalive
 * @property {number} virtualserver_total_packetloss_control
 * @property {number} virtualserver_total_packetloss_total
 * @property {number} virtualserver_total_ping
 * @property {string[]} virtualserver_ip
 * @property {number} virtualserver_weblist_enabled
 * @property {number} virtualserver_ask_for_privilegekey
 * @property {number} virtualserver_hostbanner_mode
 * @property {number} virtualserver_channel_temp_delete_delay_default
 * @property {number} virtualserver_min_android_version
 * @property {number} virtualserver_min_ios_version
 * @property {string} virtualserver_status
 * @property {number} connection_filetransfer_bandwidth_sent
 * @property {number} connection_filetransfer_bandwidth_received
 * @property {number} connection_filetransfer_bytes_sent_total
 * @property {number} connection_filetransfer_bytes_received_total
 * @property {number} connection_packets_sent_speech
 * @property {number} connection_bytes_sent_speech
 * @property {number} connection_packets_received_speech
 * @property {number} connection_bytes_received_speech
 * @property {number} connection_packets_sent_keepalive
 * @property {number} connection_bytes_sent_keepalive
 * @property {number} connection_packets_received_keepalive
 * @property {number} connection_bytes_received_keepalive
 * @property {number} connection_packets_sent_control
 * @property {number} connection_bytes_sent_control
 * @property {number} connection_packets_received_control
 * @property {number} connection_bytes_received_control
 * @property {number} connection_packets_sent_total
 * @property {number} connection_bytes_sent_total
 * @property {number} connection_packets_received_total
 * @property {number} connection_bytes_received_total
 * @property {number} connection_bandwidth_sent_last_second_total
 * @property {number} connection_bandwidth_sent_last_minute_total
 * @property {number} connection_bandwidth_received_last_second_total
 * @property {number} connection_bandwidth_received_last_minute_total
 * @property {number} connection_packetloss_total
 * @property {number} connection_ping
 * @property {number} clid
 * @property {number} client_id
 * @property {number} cldbid
 * @property {number} client_database_id
 * @property {number} client_channel_id
 * @property {number} client_origin_server_id
 * @property {string} client_nickname
 * @property {number} client_type
 * @property {number} client_away
 * @property {string} client_away_message
 * @property {number} client_flag_talking
 * @property {number} client_input_muted
 * @property {number} client_output_muted
 * @property {number} client_input_hardware
 * @property {number} client_output_hardware
 * @property {number} client_talk_power
 * @property {number} client_is_talker
 * @property {number} client_is_priority_speaker
 * @property {number} client_is_recording
 * @property {number} client_is_channel_commander
 * @property {string} client_unique_identifier
 * @property {number[]} client_servergroups
 * @property {number} client_channel_group_id
 * @property {number} client_channel_group_inherited_channel_id
 * @property {string} client_version
 * @property {string} client_platform
 * @property {number} client_idle_time
 * @property {number} client_created
 * @property {number} client_lastconnected
 * @property {number} client_icon_id
 * @property {string} client_country
 * @property {number} client_outputonly_muted
 * @property {number} client_default_channel
 * @property {string} client_meta_data
 * @property {string} client_version_sign
 * @property {string} client_security_hash
 * @property {string} client_login_name
 * @property {string} client_login_password
 * @property {number} client_totalconnections
 * @property {number} client_flag_avatar
 * @property {number} client_talk_request
 * @property {string} client_talk_request_msg
 * @property {number} client_month_bytes_uploaded
 * @property {number} client_month_bytes_downloaded
 * @property {number} client_total_bytes_uploaded
 * @property {number} client_total_bytes_downloaded
 * @property {string} client_nickname_phonetic
 * @property {string} client_default_token
 * @property {string} client_badges
 * @property {string} client_base64HashClientUID
 * @property {number} connection_connected_time
 * @property {string} connection_client_ip
 * @property {string} client_myteamspeak_id
 * @property {string} client_integrations
 * @property {string} client_description
 * @property {number} client_needed_serverquery_view_power
 * @property {string} client_myteamspeak_avatar
 * @property {string} client_signed_badges
 * @property {string} client_lastip
 * @property {number} cid
 * @property {number} pid
 * @property {number} cpid
 * @property {number} order
 * @property {number} channel_cpid
 * @property {number} channel_order
 * @property {string} channel_name
 * @property {string} channel_password
 * @property {string} channel_description
 * @property {string} channel_topic
 * @property {number} channel_flag_default
 * @property {number} channel_flag_password
 * @property {number} channel_flag_permanent
 * @property {number} channel_flag_semi_permanent
 * @property {number} channel_flag_temporary
 * @property {number} channel_codec
 * @property {number} channel_codec_quality
 * @property {number} channel_needed_talk_power
 * @property {number} channel_icon_id
 * @property {number} total_clients_family
 * @property {number} channel_maxclients
 * @property {number} channel_maxfamilyclients
 * @property {number} total_clients
 * @property {number} channel_needed_subscribe_power
 * @property {number} channel_codec_latency_factor
 * @property {number} channel_codec_is_unencrypted
 * @property {string} channel_security_salt
 * @property {number} channel_delete_delay
 * @property {number} channel_flag_maxclients_unlimited
 * @property {number} channel_flag_maxfamilyclients_unlimited
 * @property {number} channel_flag_maxfamilyclients_inherited
 * @property {string} channel_filepath
 * @property {number} channel_forced_silence
 * @property {string} channel_name_phonetic
 * @property {number} channel_flag_private
 * @property {string} channel_banner_gfx_url
 * @property {number} channel_banner_mode
 * @property {number} seconds_empty
 * @property {number} cgid
 * @property {number} sgid
 * @property {number} permid
 * @property {number} permvalue
 * @property {number} permnegated
 * @property {number} permskip
 * @property {string} permsid
 * @property {number} t
 * @property {number} id1
 * @property {number} id2
 * @property {number} p
 * @property {number} v
 * @property {number} n
 * @property {number} s
 * @property {number} reasonid
 * @property {string} reasonmsg
 * @property {number} ctid
 * @property {number} cfid
 * @property {number} targetmode
 * @property {number} target
 * @property {number} invokerid
 * @property {string} invokername
 * @property {string} invokeruid
 * @property {string} hash
 * @property {number} last_pos
 * @property {number} file_size
 * @property {string} l
 * @property {string} path
 * @property {number} size
 * @property {number} clientftfid
 * @property {number} serverftfid
 * @property {string} ftkey
 * @property {number} port
 * @property {number} proto
 * @property {number} datetime
 * @property {number} host_timestamp_utc
 * @property {number} instance_uptime
 * @property {number} virtualservers_running_total
 * @property {number} virtualservers_total_channels_online
 * @property {number} virtualservers_total_clients_online
 * @property {number} virtualservers_total_maxclients
 * @property {number} serverinstance_database_version
 * @property {number} serverinstance_filetransfer_port
 * @property {number} serverinstance_serverquery_max_connections_per_ip
 * @property {number} serverinstance_max_download_total_bandwidth
 * @property {number} serverinstance_max_upload_total_bandwidth
 * @property {number} serverinstance_guest_serverquery_group
 * @property {number} serverinstance_pending_connections_per_ip
 * @property {number} serverinstance_permissions_version
 * @property {number} serverinstance_serverquery_flood_ban_time
 * @property {number} serverinstance_serverquery_flood_commands
 * @property {number} serverinstance_serverquery_flood_time
 * @property {number} serverinstance_template_channeladmin_group
 * @property {number} serverinstance_template_channeldefault_group
 * @property {number} serverinstance_template_serveradmin_group
 * @property {number} serverinstance_template_serverdefault_group
 * @property {number} msgid
 * @property {number} timestamp
 * @property {string} cluid
 * @property {string} subject
 * @property {string} message
 * @property {string} version
 * @property {number} build
 * @property {string} platform
 * @property {string} name
 * @property {string} token
 * @property {string} value
 * @property {number} banid
 * @property {number} id
 * @property {string} msg
 * @property {string} extra_msg
 * @property {number} failed_permid
 * @property {string} ident
 */
module.exports = {
  //Server specific
  sid: Number,
  server_id: Number,
  virtualserver_nickname: String,
  virtualserver_unique_identifier: String,
  virtualserver_name: String,
  virtualserver_welcomemessage: String,
  virtualserver_platform: String,
  virtualserver_version: String,
  virtualserver_maxclients: Number,
  virtualserver_password: String,
  virtualserver_clientsonline: Number,
  virtualserver_channelsonline: Number,
  virtualserver_created: Number,
  virtualserver_uptime: Number,
  virtualserver_codec_encryption_mode: Number,
  virtualserver_hostmessage: String,
  virtualserver_hostmessage_mode: Number,
  virtualserver_filebase: String,
  virtualserver_default_server_group: Number,
  virtualserver_default_channel_group: Number,
  virtualserver_flag_password: Number,
  virtualserver_default_channel_admin_group: Number,
  virtualserver_max_download_total_bandwidth: Number,
  virtualserver_max_upload_total_bandwidth: Number,
  virtualserver_hostbanner_url: String,
  virtualserver_hostbanner_gfx_url: String,
  virtualserver_hostbanner_gfx_interval: Number,
  virtualserver_complain_autoban_count: Number,
  virtualserver_complain_autoban_time: Number,
  virtualserver_complain_remove_time: Number,
  virtualserver_min_clients_in_channel_before_forced_silence: Number,
  virtualserver_priority_speaker_dimm_modificator: Number,
  virtualserver_id: Number,
  virtualserver_antiflood_points_needed_plugin_block: Number,
  virtualserver_antiflood_points_tick_reduce: Number,
  virtualserver_antiflood_points_needed_command_block: Number,
  virtualserver_antiflood_points_needed_ip_block: Number,
  virtualserver_client_connections: Number,
  virtualserver_query_client_connections: Number,
  virtualserver_hostbutton_tooltip: String,
  virtualserver_hostbutton_url: String,
  virtualserver_hostbutton_gfx_url: String,
  virtualserver_queryclientsonline: Number,
  virtualserver_download_quota: Number,
  virtualserver_upload_quota: Number,
  virtualserver_month_bytes_downloaded: Number,
  virtualserver_month_bytes_uploaded: Number,
  virtualserver_total_bytes_downloaded: Number,
  virtualserver_total_bytes_uploaded: Number,
  virtualserver_port: Number,
  virtualserver_autostart: Number,
  virtualserver_machine_id: Number,
  virtualserver_needed_identity_security_level: Number,
  virtualserver_log_client: Number,
  virtualserver_log_query: Number,
  virtualserver_log_channel: Number,
  virtualserver_log_permissions: Number,
  virtualserver_log_server: Number,
  virtualserver_log_filetransfer: Number,
  virtualserver_min_client_version: Number,
  virtualserver_name_phonetic: String,
  virtualserver_icon_id: Number,
  virtualserver_reserved_slots: Number,
  virtualserver_total_packetloss_speech: Number,
  virtualserver_total_packetloss_keepalive: Number,
  virtualserver_total_packetloss_control: Number,
  virtualserver_total_packetloss_total: Number,
  virtualserver_total_ping: Number,
  virtualserver_ip: "ArrayOfString",
  virtualserver_weblist_enabled: Number,
  virtualserver_ask_for_privilegekey: Number,
  virtualserver_hostbanner_mode: Number,
  virtualserver_channel_temp_delete_delay_default: Number,
  virtualserver_min_android_version: Number,
  virtualserver_min_ios_version: Number,
  virtualserver_status: String,

  //Data Transfer
  connection_filetransfer_bandwidth_sent: Number,
  connection_filetransfer_bandwidth_received: Number,
  connection_filetransfer_bytes_sent_total: Number,
  connection_filetransfer_bytes_received_total: Number,
  connection_packets_sent_speech: Number,
  connection_bytes_sent_speech: Number,
  connection_packets_received_speech: Number,
  connection_bytes_received_speech: Number,
  connection_packets_sent_keepalive: Number,
  connection_bytes_sent_keepalive: Number,
  connection_packets_received_keepalive: Number,
  connection_bytes_received_keepalive: Number,
  connection_packets_sent_control: Number,
  connection_bytes_sent_control: Number,
  connection_packets_received_control: Number,
  connection_bytes_received_control: Number,
  connection_packets_sent_total: Number,
  connection_bytes_sent_total: Number,
  connection_packets_received_total: Number,
  connection_bytes_received_total: Number,
  connection_bandwidth_sent_last_second_total: Number,
  connection_bandwidth_sent_last_minute_total: Number,
  connection_bandwidth_received_last_second_total: Number,
  connection_bandwidth_received_last_minute_total: Number,
  connection_packetloss_total: Number,
  connection_ping: Number,

  //Client specific
  clid: Number,
  client_id: Number,
  cldbid: Number,
  client_database_id: Number,
  client_channel_id: Number,
  client_origin_server_id: Number,
  client_nickname: String,
  client_type: Number,
  client_away: Number,
  client_away_message: String,
  client_flag_talking: Number,
  client_input_muted: Number,
  client_output_muted: Number,
  client_input_hardware: Number,
  client_output_hardware: Number,
  client_talk_power: Number,
  client_is_talker: Number,
  client_is_priority_speaker: Number,
  client_is_recording: Number,
  client_is_channel_commander: Number,
  client_unique_identifier: String,
  client_servergroups: "ArrayOfInt",
  client_channel_group_id: Number,
  client_channel_group_inherited_channel_id: Number,
  client_version: String,
  client_platform: String,
  client_idle_time: Number,
  client_created: Number,
  client_lastconnected: Number,
  client_icon_id: Number,
  client_country: String,
  client_outputonly_muted: Number,
  client_default_channel: Number,
  client_meta_data: String,
  client_version_sign: String,
  client_security_hash: String,
  client_login_name: String,
  client_login_password: String,
  client_totalconnections: Number,
  client_flag_avatar: Number,
  client_talk_request: Number,
  client_talk_request_msg: String,
  client_month_bytes_uploaded: Number,
  client_month_bytes_downloaded: Number,
  client_total_bytes_uploaded: Number,
  client_total_bytes_downloaded: Number,
  client_nickname_phonetic: String,
  client_default_token: String,
  client_badges: String,
  client_base64HashClientUID: String,
  connection_connected_time: Number,
  connection_client_ip: String,
  client_myteamspeak_id: String,
  client_integrations: String,
  client_description: String,
  client_needed_serverquery_view_power: Number,
  client_myteamspeak_avatar: String,
  client_signed_badges: String,
  client_lastip: String,

  //Channel specific
  cid: Number,
  pid: Number,
  cpid: Number,
  order: Number,
  channel_cpid: Number,
  channel_order: Number,
  channel_name: String,
  channel_password: String,
  channel_description: String,
  channel_topic: String,
  channel_flag_default: Number,
  channel_flag_password: Number,
  channel_flag_permanent: Number,
  channel_flag_semi_permanent: Number,
  channel_flag_temporary: Number,
  channel_codec: Number,
  channel_codec_quality: Number,
  channel_needed_talk_power: Number,
  channel_icon_id: Number,
  total_clients_family: Number,
  channel_maxclients: Number,
  channel_maxfamilyclients: Number,
  total_clients: Number,
  channel_needed_subscribe_power: Number,
  channel_codec_latency_factor: Number,
  channel_codec_is_unencrypted: Number,
  channel_security_salt: String,
  channel_delete_delay: Number,
  channel_flag_maxclients_unlimited: Number,
  channel_flag_maxfamilyclients_unlimited: Number,
  channel_flag_maxfamilyclients_inherited: Number,
  channel_filepath: String,
  channel_forced_silence: Number,
  channel_name_phonetic: String,
  channel_flag_private: Number,
  channel_banner_gfx_url: String,
  channel_banner_mode: Number,
  seconds_empty: Number,

  //Group Specific
  cgid: Number,
  sgid: Number,

  //Permission Specific
  permid: Number,
  permvalue: Number,
  permnegated: Number,
  permskip: Number,
  permsid: String,
  t: Number,
  id1: Number,
  id2: Number,
  //permission
  p: Number,
  //value
  v: Number,
  //negate
  n: Number,
  //skip
  s: Number,

  //Events
  reasonid: Number,
  reasonmsg: String,
  ctid: Number,
  cfid: Number,
  targetmode: Number,
  target: Number,
  invokerid: Number,
  invokername: String,
  invokeruid: String,

  //Snapshot
  hash: String,

  //Logs
  last_pos: Number,
  file_size: Number,
  l: String,

  //FileTransfer
  path: String,
  size: Number,
  clientftfid: Number,
  serverftfid: Number,
  ftkey: String,
  port: Number,
  proto: Number,
  datetime: Number,

  //Host Info
  host_timestamp_utc: Number,
  instance_uptime: Number,
  virtualservers_running_total: Number,
  virtualservers_total_channels_online: Number,
  virtualservers_total_clients_online: Number,
  virtualservers_total_maxclients: Number,

  //Instance Info
  serverinstance_database_version: Number,
  serverinstance_filetransfer_port: Number,
  serverinstance_serverquery_max_connections_per_ip: Number,
  serverinstance_max_download_total_bandwidth: Number,
  serverinstance_max_upload_total_bandwidth: Number,
  serverinstance_guest_serverquery_group: Number,
  serverinstance_pending_connections_per_ip: Number,
  serverinstance_permissions_version: Number,
  serverinstance_serverquery_ban_time: Number,
  serverinstance_serverquery_flood_commands: Number,
  serverinstance_serverquery_flood_time: Number,
  serverinstance_template_channeladmin_group: Number,
  serverinstance_template_channeldefault_group: Number,
  serverinstance_template_serveradmin_group: Number,
  serverinstance_template_serverdefault_group: Number,

  //message
  msgid: Number,
  timestamp: Number,
  cluid: String,
  subject: String,
  message: String,

  //version
  version: String,
  build: Number,
  platform: String,

  //General
  name: String,
  token: String,
  value: String,

  //ban
  banid: Number,

  //Reponse Error
  id: Number,
  msg: String,
  extra_msg: String,
  failed_permid: Number,

  //CustomSearch
  ident: String

}