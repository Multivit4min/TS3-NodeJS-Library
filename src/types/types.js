/**
 * @typedef {import("../property/Client")} TeamSpeakClient
 * @typedef {import("../property/Channel")} TeamSpeakChannel
 */

/**
 * the TeamSpeak configuration object
 * @typedef {object} ConnectionParams
 * @property {string} [protocol=raw] - The Protocol to use, valid is ssh or raw
 * @property {string} [host="127.0.0.1"] - The Host on which the TeamSpeak Server runs
 * @property {number} [queryport=10011] - The Queryport on which the TeamSpeak Server runs
 * @property {number} [serverport=9987] - The Serverport on which the TeamSpeak Instance runs
 * @property {string} [username] - The username to authenticate with the TeamSpeak Server
 * @property {string} [password] - The password to authenticate with the TeamSpeak Server
 * @property {string} [nickname] - The Nickname the Client should have
 * @property {number} [readyTimeout=20000] - Maximum wait time for the connection to get established
 * @property {boolean} [keepAlive=true] - wether a keepalive should be sent or not
 */

/**
 * clientlist response
 * @typedef {object} ClientListResponse
 * @property {number} clid
 * @property {number} cid
 * @property {number} client_database_id
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
 * @property {string} client_country
 * @property {string} connection_client_ip
 * @property {string} client_badges
 */

/**
 * clientlist filter
 * @typedef {object} ClientListFilter
 * @property {number} [clid]
 * @property {number} [cid]
 * @property {number} [client_database_id]
 * @property {string} [client_nickname]
 * @property {number} [client_type]
 * @property {number} [client_away]
 * @property {string} [client_away_message]
 * @property {number} [client_flag_talking]
 * @property {number} [client_input_muted]
 * @property {number} [client_output_muted]
 * @property {number} [client_input_hardware]
 * @property {number} [client_output_hardware]
 * @property {number} [client_talk_power]
 * @property {number} [client_is_talker]
 * @property {number} [client_is_priority_speaker]
 * @property {number} [client_is_recording]
 * @property {number} [client_is_channel_commander]
 * @property {string} [client_unique_identifier]
 * @property {number[]} [client_servergroups]
 * @property {number} [client_channel_group_id]
 * @property {number} [client_channel_group_inherited_channel_id]
 * @property {string} [client_version]
 * @property {string} [client_platform]
 * @property {number} [client_idle_time]
 * @property {number} [client_created]
 * @property {number} [client_lastconnected]
 * @property {string} [client_country]
 * @property {string} [connection_client_ip]
 * @property {string} [client_badges]
 */

/**
 * channellist response
 * @typedef {object} ChannelListResponse
 * @property {number} cid
 * @property {number} pid
 * @property {number} channel_order
 * @property {string} channel_name
 * @property {string} channel_topic
 * @property {number} channel_flag_default
 * @property {number} channel_flag_password
 * @property {number} channel_flag_permanent
 * @property {number} channel_flag_semi_permanent
 * @property {number} channel_codec
 * @property {number} channel_codec_quality
 * @property {number} channel_needed_talk_power
 * @property {number} channel_icon_id
 * @property {number} seconds_empty
 * @property {number} total_clients_family
 * @property {number} channel_maxclients
 * @property {number} channel_maxfamilyclients
 * @property {number} total_clients
 * @property {number} channel_needed_subscribe_power
 */

/**
 * channellist filter
 * @typedef {object} ChannelListFilter
 * @property {number} [cid]
 * @property {number} [pid]
 * @property {number} [channel_order]
 * @property {string} [channel_name]
 * @property {string} [channel_topic]
 * @property {number} [channel_flag_default]
 * @property {number} [channel_flag_password]
 * @property {number} [channel_flag_permanent]
 * @property {number} [channel_flag_semi_permanent]
 * @property {number} [channel_codec]
 * @property {number} [channel_codec_quality]
 * @property {number} [channel_needed_talk_power]
 * @property {number} [channel_icon_id]
 * @property {number} [seconds_empty]
 * @property {number} [total_clients_family]
 * @property {number} [channel_maxclients]
 * @property {number} [channel_maxfamilyclients]
 * @property {number} [total_clients]
 * @property {number} [channel_needed_subscribe_power]
 */

/**
 * servergrouplist response
 * @typedef {object} ServerGroupListResponse
 * @property {number} sgid
 * @property {string} name
 * @property {number} type
 * @property {number} iconid
 * @property {number} savedb
 * @property {number} sortid
 * @property {number} namemode
 * @property {number} n_modifyp
 * @property {number} n_member_addp
 * @property {number} n_member_removep
 */

/**
 * servergrouplist filter
 * @typedef {object} ServerGroupListFilter
 * @property {number} [sgid]
 * @property {string} [name]
 * @property {number} [type]
 * @property {number} [iconid]
 * @property {number} [savedb]
 * @property {number} [sortid]
 * @property {number} [namemode]
 * @property {number} [n_modifyp]
 * @property {number} [n_member_addp]
 * @property {number} [n_member_removep]
 */

/**
 * channelgrouplist response
 * @typedef {object} ChannelGroupListResponse
 * @property {number} cgid
 * @property {string} name
 * @property {number} type
 * @property {number} iconid
 * @property {number} savedb
 * @property {number} sortid
 * @property {number} namemode
 * @property {number} n_modifyp
 * @property {number} n_member_addp
 * @property {number} n_member_removep
 */

/**
 * channelgrouplist filter
 * @typedef {object} ChannelGroupListFilter
 * @property {number} [cgid]
 * @property {string} [name]
 * @property {number} [type]
 * @property {number} [iconid]
 * @property {number} [savedb]
 * @property {number} [sortid]
 * @property {number} [namemode]
 * @property {number} [n_modifyp]
 * @property {number} [n_member_addp]
 * @property {number} [n_member_removep]
 */

/**
 * serverlist response
 * @typedef {object} ServerListResponse
 * @property {number} virtualserver_id
 * @property {number} virtualserver_port
 * @property {string} virtualserver_status
 * @property {number} virtualserver_clientsonline
 * @property {number} virtualserver_queryclientsonline
 * @property {number} virtualserver_maxclients
 * @property {number} virtualserver_uptime
 * @property {string} virtualserver_name
 * @property {number} virtualserver_autostart
 * @property {string} virtualserver_machine_id
 * @property {string} virtualserver_unique_identifier
 */

/**
 * serverlist filter
 * @typedef {object} ServerListFilter
 * @property {number} [virtualserver_id]
 * @property {number} [virtualserver_port]
 * @property {string} [virtualserver_status]
 * @property {number} [virtualserver_clientsonline]
 * @property {number} [virtualserver_queryclientsonline]
 * @property {number} [virtualserver_maxclients]
 * @property {number} [virtualserver_uptime]
 * @property {string} [virtualserver_name]
 * @property {number} [virtualserver_autostart]
 * @property {string} [virtualserver_machine_id]
 * @property {string} [virtualserver_unique_identifier]
 */

/**
 * servercreate response
 * @typedef {object} ServerCreateResponse
 * @property {string} token the server token for the channel admin
 * @property {import("../property/Server")} server the server object
 */


/**
 * queryloginadd response
 * @typedef {object} QueryLoginAddResponse
 * @property {number} cldbid
 * @property {number} sid
 * @property {string} client_login_name
 * @property {string} client_login_password
 */


/**
 * queryloginlist response
 * @typedef {object} QueryLoginListResponse
 * @property {number} cldbid
 * @property {number} sid
 * @property {string} client_login_name
 */


/**
 * version response
 * @typedef {object} VersionResponse
 * @property {string} version
 * @property {number} build
 * @property {string} platform
 */


/**
 * hostinfo response
 * @typedef {object} HostInfoResponse
 * @property {number} instance_uptime
 * @property {number} host_timestamp_utc
 * @property {number} virtualservers_running_total
 * @property {number} virtualservers_total_maxclients
 * @property {number} virtualservers_total_clients_online
 * @property {number} virtualservers_total_channels_online
 * @property {number} connection_filetransfer_bandwidth_sent
 * @property {number} connection_filetransfer_bandwidth_received
 * @property {number} connection_filetransfer_bytes_sent_total
 * @property {number} connection_filetransfer_bytes_received_total
 * @property {number} connection_packets_sent_total
 * @property {number} connection_bytes_sent_total
 * @property {number} connection_packets_received_total
 * @property {number} connection_bytes_received_total
 * @property {number} connection_bandwidth_sent_last_second_total
 * @property {number} connection_bandwidth_sent_last_minute_total
 * @property {number} connection_bandwidth_received_last_second_total
 * @property {number} connection_bandwidth_received_last_minute_total
 */


/**
 * instanceinfo response
 * @typedef {object} InstanceInfoResponse
 * @property {number} serverinstance_database_version
 * @property {number} serverinstance_filetransfer_port
 * @property {number} serverinstance_max_download_total_bandwidth
 * @property {number} serverinstance_max_upload_total_bandwidth
 * @property {number} serverinstance_guest_serverquery_group
 * @property {number} serverinstance_serverquery_flood_commands
 * @property {number} serverinstance_serverquery_flood_ban_time
 * @property {number} serverinstance_template_serveradmin_group
 * @property {number} serverinstance_template_serverdefault_group
 * @property {number} serverinstance_template_channeladmin_group
 * @property {number} serverinstance_template_channeldefault_group
 * @property {number} serverinstance_permissions_version
 * @property {number} serverinstance_pending_connections_per_ip
 * @property {number} serverinstance_serverquery_max_connections_per_ip
 */


/**
 * bindinglist response
 * @typedef {object} BindingListResponse
 * @property {string} ip
 */


/**
 * whoami response
 * @typedef {object} WhoamiResponse
 * @property {string} virtualserver_status
 * @property {string} virtualserver_unique_identifier
 * @property {number} virtualserver_port
 * @property {number} virtualserver_id
 * @property {number} client_id
 * @property {number} client_channel_id
 * @property {string} client_nickname
 * @property {number} client_database_id
 * @property {string} client_login_name
 * @property {string} client_unique_identifier
 * @property {number} client_origin_server_id
 */


/**
 * serverinfo response
 * @typedef {object} ServerInfoResponse
 * @property {string} virtualserver_unique_identifier
 * @property {string} virtualserver_name
 * @property {string} virtualserver_welcomemessage
 * @property {number} virtualserver_maxclients
 * @property {string} virtualserver_password
 * @property {number} virtualserver_created
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
 * @property {number} virtualserver_antiflood_points_tick_reduce
 * @property {number} virtualserver_antiflood_points_needed_command_block
 * @property {number} virtualserver_antiflood_points_needed_ip_block
 * @property {string} virtualserver_hostbutton_tooltip
 * @property {string} virtualserver_hostbutton_url
 * @property {string} virtualserver_hostbutton_gfx_url
 * @property {number} virtualserver_download_quota
 * @property {number} virtualserver_upload_quota
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
 * @property {number} virtualserver_weblist_enabled
 * @property {number} virtualserver_hostbanner_mode
 * @property {number} virtualserver_channel_temp_delete_delay_default
 * @property {number} virtualserver_min_android_version
 * @property {number} virtualserver_min_ios_version
 * @property {string} virtualserver_nickname
 * @property {number} virtualserver_antiflood_points_needed_plugin_block
 * @property {string} virtualserver_status
 */


/**
 * serveridgetbyport response
 * @typedef {object} ServerIdGetByPortResponse
 * @property {number} server_id
 */


/**
 * serverrequestconnectioninfo response
 * @typedef {object} ServerRequestConnectionInfoResponse
 * @property {number} connection_filetransfer_bandwidth_sent
 * @property {number} connection_filetransfer_bandwidth_received
 * @property {number} connection_filetransfer_bytes_sent_total
 * @property {number} connection_filetransfer_bytes_received_total
 * @property {number} connection_packets_sent_total
 * @property {number} connection_bytes_sent_total
 * @property {number} connection_packets_received_total
 * @property {number} connection_bytes_received_total
 * @property {number} connection_bandwidth_sent_last_second_total
 * @property {number} connection_bandwidth_sent_last_minute_total
 * @property {number} connection_bandwidth_received_last_second_total
 * @property {number} connection_bandwidth_received_last_minute_total
 * @property {number} connection_connected_time
 * @property {number} connection_packetloss_total
 * @property {number} connection_ping
 */


/**
 * servergroupclientlist response
 * @typedef {object} ServerGroupClientListResponse
 * @property {number} cldbid
 * @property {string} client_nickname
 * @property {string} client_unique_identifier
 */


/**
 * servergroupcopy response
 * @typedef {object} ServerGroupCopyResponse
 * @property {number} [sgid] only available when a new group has been creeated
 */


/**
 * servergroupcopy response
 * @typedef {object} ChannelGroupCopyResponse
 * @property {number} [cgid] only available when a new group has been creeated
 */


/**
 * servertemppasswordlist response
 * @typedef {object} ServerTempPasswordListResponse
 * @property {string} nickname
 * @property {string} uid
 * @property {string} desc
 * @property {string} pw_clear
 * @property {number} start
 * @property {number} end
 * @property {number} tcid
 */


/**
 * channelgroupclientlist response
 * @typedef {object} ChannelGroupClientListResponse
 * @property {number} [cid]
 * @property {number} [cldbid]
 * @property {number} [cgid]
 */

/**
 * permission response
 * @typedef {object} PermListResponse
 * @property {number} [permid]
 * @property {string} [permsid]
 * @property {number} permvalue
 * @property {number} permnegated
 * @property {number} permskip
 */


/**
 * channelinfo response
 * @typedef {object} ChannelInfoResponse
 * @property {number} pid
 * @property {string} channel_name
 * @property {string} channel_topic
 * @property {string} channel_description
 * @property {string} channel_password
 * @property {number} channel_codec
 * @property {number} channel_codec_quality
 * @property {number} channel_maxclients
 * @property {number} channel_maxfamilyclients
 * @property {number} channel_order
 * @property {number} channel_flag_permanent
 * @property {number} channel_flag_semi_permanent
 * @property {number} channel_flag_default
 * @property {number} channel_flag_password
 * @property {number} channel_codec_latency_factor
 * @property {number} channel_codec_is_unencrypted
 * @property {string} channel_security_salt
 * @property {number} channel_delete_delay
 * @property {number} channel_flag_maxclients_unlimited
 * @property {number} channel_flag_maxfamilyclients_unlimited
 * @property {number} channel_flag_maxfamilyclients_inherited
 * @property {string} channel_filepath
 * @property {number} channel_needed_talk_power
 * @property {number} channel_forced_silence
 * @property {string} channel_name_phonetic
 * @property {number} channel_icon_id
 * @property {string} channel_banner_gfx_url
 * @property {number} channel_banner_mode
 * @property {number} seconds_empty
 */


/**
 * clientinfo response
 * @typedef {object} ClientInfoResponse
 * @property {number} cid
 * @property {number} client_idle_time
 * @property {string} client_unique_identifier
 * @property {string} client_nickname
 * @property {string} client_version
 * @property {string} client_platform
 * @property {number} client_input_muted
 * @property {number} client_output_muted
 * @property {number} client_outputonly_muted
 * @property {number} client_input_hardware
 * @property {number} client_output_hardware
 * @property {number} client_default_channel
 * @property {string} client_meta_data
 * @property {number} client_is_recording
 * @property {string} client_version_sign
 * @property {string} client_security_hash
 * @property {string} client_login_name
 * @property {number} client_database_id
 * @property {number} client_channel_group_id
 * @property {number[]} client_servergroups
 * @property {number} client_created
 * @property {number} client_lastconnected
 * @property {number} client_totalconnections
 * @property {number} client_away
 * @property {string} client_away_message
 * @property {number} client_type
 * @property {number} client_flag_avatar
 * @property {number} client_talk_power
 * @property {number} client_talk_request
 * @property {string} client_talk_request_msg
 * @property {string} client_description
 * @property {number} client_is_talker
 * @property {number} client_month_bytes_uploaded
 * @property {number} client_month_bytes_downloaded
 * @property {number} client_total_bytes_uploaded
 * @property {number} client_total_bytes_downloaded
 * @property {number} client_is_priority_speaker
 * @property {string} client_nickname_phonetic
 * @property {number} client_needed_serverquery_view_power
 * @property {string} client_default_token
 * @property {number} client_icon_id
 * @property {number} client_is_channel_commander
 * @property {string} client_country
 * @property {number} client_channel_group_inherited_channel_id
 * @property {string} client_badges
 * @property {string} client_myteamspeak_id
 * @property {string} client_integrations
 * @property {string} client_myteamspeak_avatar
 * @property {string} client_signed_badges
 * @property {string} client_base64HashClientUID
 * @property {number} connection_filetransfer_bandwidth_sent
 * @property {number} connection_filetransfer_bandwidth_received
 * @property {number} connection_packets_sent_total
 * @property {number} connection_bytes_sent_total
 * @property {number} connection_packets_received_total
 * @property {number} connection_bytes_received_total
 * @property {number} connection_bandwidth_sent_last_second_total
 * @property {number} connection_bandwidth_sent_last_minute_total
 * @property {number} connection_bandwidth_received_last_second_total
 * @property {number} connection_bandwidth_received_last_minute_total
 * @property {number} connection_connected_time
 * @property {string} connection_client_ip
 */


/**
 * clientdblist response
 * @typedef {object} ClientDBListResponse
 * @property {number} [count] available in the first element and only if count flag has been set
 * @property {number} cldbid
 * @property {string} client_unique_identifier
 * @property {string} client_nickname
 * @property {number} client_created
 * @property {number} client_lastconnected
 * @property {number} client_totalconnections
 * @property {string} client_description
 * @property {string} client_lastip
 * @property {string} client_login_name
 */


/**
 * clientdbinfo
 * @typedef {object} ClientDBInfoResponse
 * @property {string} client_unique_identifier
 * @property {string} client_nickname
 * @property {number} client_database_id
 * @property {number} client_created
 * @property {number} client_lastconnected
 * @property {number} client_totalconnections
 * @property {number} client_flag_avatar
 * @property {string} client_description
 * @property {number} client_month_bytes_uploaded
 * @property {number} client_month_bytes_downloaded
 * @property {number} client_total_bytes_uploaded
 * @property {number} client_total_bytes_downloaded
 * @property {string} client_base64HashClientUID
 * @property {string} client_lastip
 */


/**
 * customsearch response
 * @typedef {object} CustomSearchResponse
 * @property {number} cldbid
 * @property {string} ident
 * @property {string} value
 */


/**
 * custominfo response
 * @typedef {object} CustomInfoResponse
 * @property {number} [cldbid] only available in the first element of the response array
 * @property {string} ident
 * @property {string} value
 */


/**
 * permoverview response
 * @typedef {object} PermOverviewResponse
 * @property {number} t
 * @property {number} id
 * @property {number} id2
 * @property {number} p perm
 * @property {number} v value
 * @property {number} n negate
 * @property {number} s skip
 */


/**
 * permissionlist response
 * @typedef {object} PermissionListResponse
 * @property {number} permid
 * @property {string} permname
 * @property {string} permdesc
 */


/**
 * permidgetbyname response
 * @typedef {object} PermIdGetByNameResponse
 * @property {string} permsid
 * @property {number} permid
 */


/**
 * permget response
 * @typedef {object} PermGetResponse
 * @property {string} permsid
 * @property {number} permid
 * @property {number} permvalue
 */


/**
 * permfind response
 * @typedef {object} PermFindResponse
 * @property {number} t
 * @property {number} id1
 * @property {number} id2
 * @property {number} p
 */


/**
 * token response
 * @typedef {object} TokenResponse
 * @property {string} token
 */


/**
 * privilegekeylist response
 * @typedef {object} PrivilegeKeyListResponse
 * @property {number} token
 * @property {number} token_type
 * @property {number} token_id1
 * @property {number} token_id2
 * @property {number} token_created
 * @property {string} token_description
 */


/**
 * messagelist response
 * @typedef {object} MessageListResponse
 * @property {number} msgid
 * @property {string} cluid
 * @property {string} subject
 * @property {number} timestamp
 * @property {number} flag_read
 */


/**
 * messageget response
 * @typedef {object} MessageGetResponse
 * @property {number} msgid
 * @property {string} cluid
 * @property {string} subject
 * @property {string} message
 * @property {number} timestamp
 */


/**
 * complainlist response
 * @typedef {object} ComplainListResponse
 * @property {number} tcldbid
 * @property {string} tname
 * @property {number} fcldbid
 * @property {string} fname
 * @property {string} message
 * @property {number} timestamp
 */


/**
 * banadd response
 * @typedef {object} BanAddResponse
 * @property {number} banid
 */


/**
 * banlist response
 * @typedef {object} BanListResponse
 * @property {number} banid
 * @property {string} ip
 * @property {string} name
 * @property {string} uid
 * @property {string} mytsid
 * @property {string} lastnickname
 * @property {number} created
 * @property {number} duration
 * @property {string} invokername
 * @property {number} invokercldbid
 * @property {string} invokeruid
 * @property {string} reason
 * @property {number} enforcements
 */


/**
 * logview response
 * @typedef {object} LogViewResponse
 * @property {number} [last_pos] only available in the first element of the response array
 * @property {number} [file_size] only available in the first element of the response array
 * @property {string} l
 */


/**
 * clientdbfind response
 * @typedef {object} ClientDBFindResponse
 * @property {number} cldbid
 */


/**
 * ftgetfilelist response
 * @typedef {object} FTGetFileListResponse
 * @property {number} cid
 * @property {string} path
 * @property {string} name
 * @property {number} size
 * @property {number} datetime
 * @property {number} type 1=file 0=folder
 */


/**
 * ftgetfileinfo response
 * @typedef {object} FTGetFileInfoResponse
 * @property {number} cid
 * @property {string} name
 * @property {number} size
 * @property {number} datetime
 */


/**
 * ftinitupload response
 * @typedef {object} FTInitUploadResponse
 * @property {number} clientftfid
 * @property {number} [status] exists when an error occured
 * @property {string} [msg] exists when an error occured
 * @property {number} [size] exists when an error occured
 * @property {number} [serverftfid] exists when file is uploadable
 * @property {string} [ftkey] exists when file is uploadable
 * @property {number} [port] exists when file is uploadable
 * @property {number} [seekpos] exists when file is uploadable
 * @property {number} [proto] exists when file is uploadable
 */


/**
 * ftinitdownload response
 * @typedef {object} FTInitDownloadResponse
 * @property {number} clientftfid
 * @property {number} size
 * @property {number} [status] exists when an error occured
 * @property {string} [msg] exists when an error occured
 * @property {number} [serverftfid] exists when file is uploadable
 * @property {string} [ftkey] exists when file is uploadable
 * @property {number} [port] exists when file is uploadable
 * @property {number} [proto] exists when file is uploadable
 */

/**
 * clientupdate properties
 * @typedef {object} ClientUpdateProps
 * @property {string} [client_nickname]
 */

/**
 * clientdbedit properties
 * @typedef {object} ClientDBEditProps
 * @property {number} [cldbid]
 * @property {string} [client_description]
 */

/**
 * serveredit properties
 * @typedef {object} ServerEditProps
 * @property {string} [virtualserver_name]
 * @property {string} [virtualserver_welcomemessage]
 * @property {number} [virtualserver_maxclients]
 * @property {string} [virtualserver_password]
 * @property {string} [virtualserver_hostmessage]
 * @property {number} [virtualserver_hostmessage_mode]
 * @property {number} [virtualserver_default_server_group]
 * @property {number} [virtualserver_default_channel_group]
 * @property {number} [virtualserver_default_channel_admin_group]
 * @property {number} [virtualserver_max_download_total_bandwidth]
 * @property {number} [virtualserver_max_upload_total_bandwidth]
 * @property {string} [virtualserver_hostbanner_url]
 * @property {string} [virtualserver_hostbanner_gfx_url]
 * @property {number} [virtualserver_hostbanner_gfx_interval]
 * @property {number} [virtualserver_complain_autoban_count]
 * @property {number} [virtualserver_complain_autoban_time]
 * @property {number} [virtualserver_complain_remove_time]
 * @property {number} [virtualserver_min_clients_in_channel_before_forced_silence]
 * @property {number} [virtualserver_priority_speaker_dimm_modificator]
 * @property {number} [virtualserver_antiflood_points_tick_reduce]
 * @property {number} [virtualserver_antiflood_points_needed_command_block]
 * @property {number} [virtualserver_antiflood_points_needed_plugin_block]
 * @property {number} [virtualserver_antiflood_points_needed_ip_block]
 * @property {string} [virtualserver_hostbanner_mode]
 * @property {string} [virtualserver_hostbutton_tooltip]
 * @property {string} [virtualserver_hostbutton_gfx_url]
 * @property {string} [virtualserver_hostbutton_url]
 * @property {number} [virtualserver_download_quota]
 * @property {number} [virtualserver_upload_quota]
 * @property {string} [virtualserver_machine_id]
 * @property {number} [virtualserver_port]
 * @property {number} [virtualserver_autostart]
 * @property {number} [virtualserver_status]
 * @property {number} [virtualserver_log_client]
 * @property {number} [virtualserver_log_query]
 * @property {number} [virtualserver_log_channel]
 * @property {number} [virtualserver_log_permissions]
 * @property {number} [virtualserver_log_server]
 * @property {number} [virtualserver_log_filetransfer]
 * @property {number} [virtualserver_min_client_version]
 * @property {number} [virtualserver_min_android_version]
 * @property {number} [virtualserver_min_ios_version]
 * @property {number} [virtualserver_needed_identity_security_level]
 * @property {string} [virtualserver_name_phonetic]
 * @property {number} [virtualserver_icon_id]
 * @property {number} [virtualserver_reserved_slots]
 * @property {number} [virtualserver_weblist_enabled]
 * @property {number} [virtualserver_codec_encryption_mode]
 */

/**
 * channeledit properties
 * @typedef {object} ChannelEditProps
 * @property {number} [cid]
 * @property {string} [channel_name]
 * @property {string} [channel_topic]
 * @property {string} [channel_description]
 * @property {number} [channel_codec]
 * @property {number} [channel_codec_quality]
 * @property {number} [channel_maxclients]
 * @property {number} [channel_maxfamilyclients]
 * @property {number} [channel_order]
 * @property {number} [channel_flag_permanent]
 * @property {number} [channel_flag_semi_permanent]
 * @property {number} [channel_flag_temporary]
 * @property {number} [channel_flag_default]
 * @property {number} [channel_flag_maxclients_unlimited]
 * @property {number} [channel_flag_maxclients_unlimited]
 * @property {number} [channel_flag_maxfamilyclients_inherited]
 * @property {number} [channel_needed_talk_power]
 * @property {string} [channel_name_phonetic]
 * @property {number} [channel_codec_is_unencrypted]
 * @property {number} [channel_cpid]
 */

/**
 * instanceedit properties
 * @typedef {object} InstanceEditProps
 * @property {number} [serverinstance_template_serveradmin_group]
 * @property {number} [serverinstance_filetransfer_port]
 * @property {number} [serverinstance_max_download_total_bandwidth]
 * @property {number} [serverinstance_max_upload_total_bandwidth]
 * @property {number} [serverinstance_template_serverdefault_group]
 * @property {number} [serverinstance_template_channeldefault_group]
 * @property {number} [serverinstance_template_channeladmin_group]
 * @property {number} [serverinstance_serverquery_flood_commands]
 * @property {number} [serverinstance_serverquery_flood_time]
 * @property {number} [serverinstance_serverquery_flood_ban_time]
 */

/**
 * debug events fired from the query handler
 * @typedef {object} DebugEvent
 * @property {string} type
 * @property {string} [data]
 */

/**
 * @typedef {object} ClientConnectEvent
 * @property {TeamSpeakClient} client
 */

/**
 * @typedef {object} ClientDisconnectEvent
 * @property {ClientListResponse} client
 * @property {object} event
 */

/**
 * @typedef {object} TextMessageEvent
 * @property {TeamSpeakClient} invoker
 * @property {string} msg
 * @property {number} targetmode (1 = Client, 2 = Channel, 3 = Virtual Server)
 */

/**
 * @typedef {object} ClientMovedEvent
 * @property {TeamSpeakClient} client the client which was moved
 * @property {TeamSpeakChannel} channel the channel where the client has been moved to
 * @property {number} reasonid (4 = Channel Kick)
 */

/**
 * @typedef {object} ServerEditEvent
 * @property {TeamSpeakClient} invoker the Client which edited the server
 * @property {object} modified properties as key => value which has been modified
 * @property {number} reasonid
 */

/**
 * @typedef {object} ChannelEditEvent
 * @property {TeamSpeakClient} invoker the client which edited the channel
 * @property {TeamSpeakChannel} channel the channel which has been edited
 * @property {object} modified properties as key => value which has been modified
 * @property {number} reasonid
 */

/**
 * @typedef {object} ChannelCreateEvent
 * @property {TeamSpeakClient} invoker the client which created the channel
 * @property {TeamSpeakChannel} channel the channel which has been created
 * @property {object} modified properties as key => value which has been modified
 * @property {number} cpid the new channel parent id
 */

/**
 * @typedef {object} ChannelMoveEvent
 * @property {TeamSpeakClient} invoker the client which moved the channel
 * @property {TeamSpeakChannel} channel the channel which has been moved
 * @property {TeamSpeakChannel} parent the new parent channel
 * @property {number} order
 */

/**
 * @typedef {object} ChannelDeleteEvent
 * @property {TeamSpeakClient} invoker the client which deleted the channel
 * @property {number} cid the channel id which has been deleted
 */

module.exports = {}