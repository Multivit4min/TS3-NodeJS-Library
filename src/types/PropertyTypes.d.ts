export interface ClientUpdateProps {
  client_nickname: string
}

export interface ClientDBEditProps {
  cldbid: number 
  client_description: string 
}

export interface ServerEditProps {
  virtualserver_name?: string 
  virtualserver_welcomemessage?: string 
  virtualserver_maxclients?: number 
  virtualserver_password?: string 
  virtualserver_hostmessage?: string 
  virtualserver_hostmessage_mode?: number 
  virtualserver_default_server_group?: number 
  virtualserver_default_channel_group?: number 
  virtualserver_default_channel_admin_group?: number 
  virtualserver_max_download_total_bandwidth?: number 
  virtualserver_max_upload_total_bandwidth?: number 
  virtualserver_hostbanner_url?: string 
  virtualserver_hostbanner_gfx_url?: string 
  virtualserver_hostbanner_gfx_interval?: number 
  virtualserver_complain_autoban_count?: number 
  virtualserver_complain_autoban_time?: number 
  virtualserver_complain_remove_time?: number 
  virtualserver_min_clients_in_channel_before_forced_silence?: number 
  virtualserver_priority_speaker_dimm_modificator?: number 
  virtualserver_antiflood_points_tick_reduce?: number 
  virtualserver_antiflood_points_needed_command_block?: number 
  virtualserver_antiflood_points_needed_plugin_block?: number 
  virtualserver_antiflood_points_needed_ip_block?: number 
  virtualserver_hostbanner_mode?: number 
  virtualserver_hostbutton_tooltip?: string 
  virtualserver_hostbutton_gfx_url?: string 
  virtualserver_hostbutton_url?: string 
  virtualserver_download_quota?: number 
  virtualserver_upload_quota?: number 
  virtualserver_machine_id?: string 
  virtualserver_port?: number 
  virtualserver_autostart?: number 
  virtualserver_status?: string 
  virtualserver_log_client?: number 
  virtualserver_log_query?: number 
  virtualserver_log_channel?: number 
  virtualserver_log_permissions?: number 
  virtualserver_log_server?: number 
  virtualserver_log_filetransfer?: number 
  virtualserver_min_client_version?: number 
  virtualserver_min_android_version?: number 
  virtualserver_min_ios_version?: number 
  virtualserver_needed_identity_security_level?: number 
  virtualserver_name_phonetic?: string 
  virtualserver_icon_id?: number 
  virtualserver_reserved_slots?: number 
  virtualserver_weblist_enabled?: number 
  virtualserver_codec_encryption_mode?: number 
}

export interface ChannelEditProps {
  cid?: number 
  channel_name?: string 
  channel_topic?: string 
  channel_description?: string 
  channel_codec?: number 
  channel_codec_quality?: number 
  channel_maxclients?: number 
  channel_maxfamilyclients?: number 
  channel_order?: number 
  channel_flag_permanent?: number 
  channel_flag_semi_permanent?: number 
  channel_flag_temporary?: number 
  channel_flag_default?: number 
  channel_flag_maxclients_unlimited?: number
  channel_flag_maxfamilyclients_inherited?: number 
  channel_needed_talk_power?: number 
  channel_name_phonetic?: string 
  channel_codec_is_unencrypted?: number 
  channel_cpid?: number 
}

export interface InstanceEditProps {
  serverinstance_template_serveradmin_group?: number 
  serverinstance_filetransfer_port?: number 
  serverinstance_max_download_total_bandwidth?: number 
  serverinstance_max_upload_total_bandwidth?: number 
  serverinstance_template_serverdefault_group?: number 
  serverinstance_template_channeldefault_group?: number 
  serverinstance_template_channeladmin_group?: number 
  serverinstance_serverquery_flood_commands?: number 
  serverinstance_serverquery_flood_time?: number 
  serverinstance_serverquery_flood_ban_time?: number 
}

export interface ServerTempPasswordAddProps {
  /** the temporary password */
  pw: string
  /** description of the password */
  desc?: string
  /** the duration the password is valid in seconds */
  duration: number
  /** the channel to let the user join */
  tcid?: number
  /** the password to the channel */
  tcpw?: string
}

export interface BanAddProps {
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

export interface TransferUploadProps {
  /** arbitary id to identify the transfer */
  clientftfid?: number
  /** destination filename */
  name: string
  /** size of the file */
  size: number
  /** channel id to upload to */
  cid?: number
  /** channel password of the channel which will be uploaded to */
  cpw?: string
  /** overwrites an existing file */
  overwrite?: number
  resume?: number
}

export interface TransferDownloadProps {
  /** arbitary id to identify the transfer */
  clientftfid?: number
  /** destination filename */
  name: string
  /** channel id to upload to */
  cid?: number
  /** channel password of the channel which will be uploaded to */
  cpw?: string
  seekpos?: number
}