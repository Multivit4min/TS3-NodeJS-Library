import { QueryResponseTypes, QueryResponse } from "../types/QueryResponse"
import { ResponseError } from "../exception/ResponseError"
import { QueryErrorMessage } from "../types/ResponseTypes"

export class Command {
  private parser: Command.parser = Command.parse
  private cmd: string = ""
  private options: Command.options = {}
  private multiOpts: Command.multiOpts = []
  private flags: string[] = []
  private response: QueryResponse[] = []
  private error: QueryErrorMessage|null = null

  /** Initializes the Respone with default values */
  reset(): Command {
    this.response = []
    this.error = null
    return this
  }

  /** Sets the main command to send */
  setCommand(cmd: string): Command {
    this.cmd = cmd.trim()
    return this
  }

  /**
   * Sets the TeamSpeak Key Value Pairs
   * @param opts sets the Object with the key value pairs which should get sent to the TeamSpeak Query
   */
  setOptions(options: Command.options): Command {
    this.options = options
    return this
  }

  /**
   * Sets the TeamSpeak Key Value Pairs
   * @param opts sets the Object with the key value pairs which should get sent to the TeamSpeak Query
   */
  setMultiOptions (options: Command.multiOpts): Command {
    this.multiOpts = options
    return this
  }

  /**
   * adds a customparser
   * @param parser
   */
  setParser(parser: Command.parser) {
    this.parser = parser
    return this
  }

  /** checks wether there are options used with this command */
  hasOptions(): boolean {
    return Object.values(this.options).length > 0 || this.hasMultiOptions()
  }

  /** checks wether there are options used with this command */
  hasMultiOptions() {
    return this.multiOpts.length > 0
  }

  /**
   * set TeamSpeak flags
   * @param flags sets the flags which should get sent to the teamspeak query
   */
  setFlags(flags: Array<string>): Command {
    this.flags = flags
    return this
  }

  /** checks wether there are flags used with this command */
  hasFlags(): boolean {
    return this.flags.length > 0
  }

  /**
   * set the Line which has been received from the TeamSpeak Query
   * @param line the line which has been received from the teamSpeak query
   */
  setResponse(line: string): Command {
    this.response = this.parse(line)
    return this
  }

  /**
   * Set the error line which has been received from the TeamSpeak Query
   * @param error the error line which has been received from the TeamSpeak Query
   */
  setError(error: string): Command {
    this.error = <QueryErrorMessage>this.parse(error)[0]
    return this
  }

  /** get the parsed error object which has been received from the TeamSpeak Query */
  getError() {
    if (!this.hasError()) return null
    return new ResponseError(this.error!)
  }

  /** checks if a error has been received */
  hasError() {
    return (
      this.error !== null &&
      typeof this.error === "object" &&
      typeof this.error.id === "number" &&
      this.error.id > 0
    )
  }

  /** get the parsed response object which has been received from the TeamSpeak Query */
  getResponse() {
    return this.response
  }

  /** runs the parser of this instance */
  parse(raw: string) {
    return this.parser({ raw, cmd: Command })
  }

  static parseSnapshotCreate({ raw }: Pick<Command.ParserArgument, "raw">) {
    const [data, snapshot] = raw.split("|")
    return <Partial<QueryResponse>[]>[{
      ...Command.parse({ raw: data })[0],
      snapshot
    }]
  }

  /**
   * parses a query response
   * @param data the query response received
   */
  static parse({ raw }: Pick<Command.ParserArgument, "raw">) {
    return <Partial<QueryResponse>[]> raw
      .split("|")
      .map(entry => {
        const res: Partial<Record<keyof QueryResponseTypes|string, QueryResponseTypes[keyof QueryResponseTypes]|string|undefined>> = {}
        entry.split(" ").forEach(str => {
          const { key, value } = Command.unescapeKeyValue(str)
          res[key] = Command.parseValue(key, value)
        })
        return res
      })
      .map((entry, _, original) => Command.mergeObjects(entry, original[0]))
  }

  /**
   * merges two objects into each other, if one key does not exist in target
   * which exists in source then target gets this key added
   * @param target object which gets keys from source
   * @param source the additional keys which get added to target
   */
  static mergeObjects(target: Record<string, any>, source: Record<string, any>) {
    const t = { ...target }
    Object.keys(source).forEach(key => {
      if (Object.keys(target).includes(key)) return
      t[key] = source[key]
    })
    return t
  }

  /**
   * Checks if a error has been received
   * @return The parsed String which is readable by the TeamSpeak Query
   */
  build() {
    let cmd = Command.escape(this.cmd)
    if (this.hasFlags()) cmd += ` ${this.buildFlags()}`
    if (this.hasOptions()) cmd += ` ${this.buildOptions()}`
    return cmd
  }

  /**
   * builds the query string for options
   * @return the parsed String which is readable by the TeamSpeak Querytt
   */
  private buildOptions() {
    const options = this.buildOption(this.options)
    if (!this.hasMultiOptions()) return options
    return `${options} ${this.multiOpts.map(this.buildOption.bind(this)).join("|")}`
  }

  /** builds the query string for options */
  buildOption(options: Record<string, any>): string {
    return Object
      .keys(options)
      .filter(key => ![undefined, null].includes(options[key]))
      .filter(key => typeof options[key] !== "number" || !isNaN(options[key]))
      .map(key => Command.escapeKeyValue(key, options[key]))
      .join(" ")
  }

  /**
   * escapes a key value pair
   * @param {string} key the key used
   * @param {string|string[]} value the value or an array of values
   * @return the parsed String which is readable by the TeamSpeak Query
   */
  static escapeKeyValue(key: string, value: string|string[]): string {
    if (Array.isArray(value)) {
      return value.map(v => `${Command.escape(key)}=${Command.escape(v)}`).join("|")
    } else {
      return `${Command.escape(key)}=${Command.escape(value)}`
    }
  }

  /**
   * unescapes a key value pair
   * @param str the key value pair to unescape eg foo=bar
   */
  static unescapeKeyValue(str: string): { key: string, value: string|undefined } {
    const [key, ...rest] = str.split("=")
    const value = rest.join("=")
    return { key, value: value === "" ? undefined : value }
  }

  /** builds the query string for flags */
  private buildFlags(): string {
    return this.flags.map(f => Command.escape(f)).join(" ")
  }

  /**
   * Parses a value to the type which the key represents
   * @param k the key which should get looked up
   * @param v the value which should get parsed
   */
  static parseValue(k: string, v: string|undefined) {
    if (typeof v === "undefined") return undefined
    if (Object.keys(Command.Identifier).includes(k)) { 
      return Command.Identifier[<keyof typeof Command.Identifier>k](v)
    } else {
      return this.parseString(v)
    }
  }

  /**
   * parses a string value
   * @param value string to parse
   */
  static parseString(value: string) {
    return Command.unescape(value)
  }

  static parseRecursive(value: string) {
    return Command.parse({ raw: Command.unescape(value) })
  }

  /**
   * parses a string array
   * @param value string to parse
   */
  static parseStringArray(value: string) {
    return value.split(",").map(v => Command.parseString(v))
  }

  /**
   * parses a number
   * @param value string to parse
   */
  static parseNumber(value: string) {
    return parseFloat(value)
  }

  /**
   * parses a number array
   * @param value string to parse
   */
  static parseNumberArray(value: string) {
    return value.split(",").map(v => Command.parseNumber(v))
  }

  /** unescapes a string */
  static unescape(str: string): string {
    return String(str)
      .replace(/\\s/g, " ")
      .replace(/\\p/g, "|")
      .replace(/\\n/g, "\n")
      .replace(/\\f/g, "\f")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\v/g, "\v")
      .replace(/\\\//g, "/")
      .replace(/\\\\/g, "\\")
  }

  /** escapes a string */
  static escape(str: string): string {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")
      .replace(/\|/g, "\\p")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\v/g, "\\v")
      .replace(/\f/g, "\\f")
      .replace(/ /g, "\\s")
  }
}

export namespace Command {

  export interface ParserArgument {
    cmd: typeof Command
    raw: string
  }
  export type parser = (data: ParserArgument) => QueryResponse[]
  export type options = Record<string, string|number|undefined|null>
  export type multiOpts = Command.options[]
  export type flags = string[]

  export const Identifier: Record<keyof QueryResponseTypes, (value: string) => any> = {
    sid: Command.parseNumber,
    server_id: Command.parseNumber,
    virtualserver_nickname: Command.parseString,
    virtualserver_unique_identifier: Command.parseString,
    virtualserver_name: Command.parseString,
    virtualserver_welcomemessage: Command.parseString,
    virtualserver_platform: Command.parseString,
    virtualserver_version: Command.parseString,
    virtualserver_maxclients: Command.parseNumber,
    virtualserver_password: Command.parseString,
    virtualserver_clientsonline: Command.parseNumber,
    virtualserver_channelsonline: Command.parseNumber,
    virtualserver_created: Command.parseNumber,
    virtualserver_uptime: Command.parseNumber,
    virtualserver_codec_encryption_mode: Command.parseNumber,
    virtualserver_hostmessage: Command.parseString,
    virtualserver_hostmessage_mode: Command.parseNumber,
    virtualserver_filebase: Command.parseString,
    virtualserver_default_server_group: Command.parseNumber,
    virtualserver_default_channel_group: Command.parseNumber,
    virtualserver_flag_password: Command.parseNumber,
    virtualserver_default_channel_admin_group: Command.parseNumber,
    virtualserver_max_download_total_bandwidth: Command.parseNumber,
    virtualserver_max_upload_total_bandwidth: Command.parseNumber,
    virtualserver_hostbanner_url: Command.parseString,
    virtualserver_hostbanner_gfx_url: Command.parseString,
    virtualserver_hostbanner_gfx_interval: Command.parseNumber,
    virtualserver_complain_autoban_count: Command.parseNumber,
    virtualserver_complain_autoban_time: Command.parseNumber,
    virtualserver_complain_remove_time: Command.parseNumber,
    virtualserver_min_clients_in_channel_before_forced_silence: Command.parseNumber,
    virtualserver_priority_speaker_dimm_modificator: Command.parseNumber,
    virtualserver_id: Command.parseNumber,
    virtualserver_antiflood_points_needed_plugin_block: Command.parseNumber,
    virtualserver_antiflood_points_tick_reduce: Command.parseNumber,
    virtualserver_antiflood_points_needed_command_block: Command.parseNumber,
    virtualserver_antiflood_points_needed_ip_block: Command.parseNumber,
    virtualserver_client_connections: Command.parseNumber,
    virtualserver_query_client_connections: Command.parseNumber,
    virtualserver_hostbutton_tooltip: Command.parseString,
    virtualserver_hostbutton_url: Command.parseString,
    virtualserver_hostbutton_gfx_url: Command.parseString,
    virtualserver_queryclientsonline: Command.parseNumber,
    virtualserver_download_quota: Command.parseNumber,
    virtualserver_upload_quota: Command.parseNumber,
    virtualserver_month_bytes_downloaded: Command.parseNumber,
    virtualserver_month_bytes_uploaded: Command.parseNumber,
    virtualserver_total_bytes_downloaded: Command.parseNumber,
    virtualserver_total_bytes_uploaded: Command.parseNumber,
    virtualserver_port: Command.parseNumber,
    virtualserver_autostart: Command.parseNumber,
    virtualserver_machine_id: Command.parseString,
    virtualserver_needed_identity_security_level: Command.parseNumber,
    virtualserver_log_client: Command.parseNumber,
    virtualserver_log_query: Command.parseNumber,
    virtualserver_log_channel: Command.parseNumber,
    virtualserver_log_permissions: Command.parseNumber,
    virtualserver_log_server: Command.parseNumber,
    virtualserver_log_filetransfer: Command.parseNumber,
    virtualserver_min_client_version: Command.parseNumber,
    virtualserver_name_phonetic: Command.parseString,
    virtualserver_icon_id: Command.parseNumber,
    virtualserver_reserved_slots: Command.parseNumber,
    virtualserver_total_packetloss_speech: Command.parseNumber,
    virtualserver_total_packetloss_keepalive: Command.parseNumber,
    virtualserver_total_packetloss_control: Command.parseNumber,
    virtualserver_total_packetloss_total: Command.parseNumber,
    virtualserver_total_ping: Command.parseNumber,
    virtualserver_ip: Command.parseStringArray,
    virtualserver_weblist_enabled: Command.parseNumber,
    virtualserver_ask_for_privilegekey: Command.parseNumber,
    virtualserver_hostbanner_mode: Command.parseNumber,
    virtualserver_channel_temp_delete_delay_default: Command.parseNumber,
    virtualserver_min_android_version: Command.parseNumber,
    virtualserver_min_ios_version: Command.parseNumber,
    virtualserver_status: Command.parseString,
    connection_filetransfer_bandwidth_sent: Command.parseNumber,
    connection_filetransfer_bandwidth_received: Command.parseNumber,
    connection_filetransfer_bytes_sent_total: Command.parseNumber,
    connection_filetransfer_bytes_received_total: Command.parseNumber,
    connection_packets_sent_speech: Command.parseNumber,
    connection_bytes_sent_speech: Command.parseNumber,
    connection_packets_received_speech: Command.parseNumber,
    connection_bytes_received_speech: Command.parseNumber,
    connection_packets_sent_keepalive: Command.parseNumber,
    connection_bytes_sent_keepalive: Command.parseNumber,
    connection_packets_received_keepalive: Command.parseNumber,
    connection_bytes_received_keepalive: Command.parseNumber,
    connection_packets_sent_control: Command.parseNumber,
    connection_bytes_sent_control: Command.parseNumber,
    connection_packets_received_control: Command.parseNumber,
    connection_bytes_received_control: Command.parseNumber,
    connection_packets_sent_total: Command.parseNumber,
    connection_bytes_sent_total: Command.parseNumber,
    connection_packets_received_total: Command.parseNumber,
    connection_bytes_received_total: Command.parseNumber,
    connection_bandwidth_sent_last_second_total: Command.parseNumber,
    connection_bandwidth_sent_last_minute_total: Command.parseNumber,
    connection_bandwidth_received_last_second_total: Command.parseNumber,
    connection_bandwidth_received_last_minute_total: Command.parseNumber,
    connection_packetloss_total: Command.parseNumber,
    connection_ping: Command.parseNumber,
    clid: Command.parseNumber,
    client_id: Command.parseNumber,
    cldbid: Command.parseNumber,
    client_database_id: Command.parseNumber,
    client_channel_id: Command.parseNumber,
    client_origin_server_id: Command.parseNumber,
    client_nickname: Command.parseString,
    client_type: Command.parseNumber,
    client_away: Command.parseNumber,
    client_away_message: Command.parseString,
    client_flag_talking: Command.parseNumber,
    client_input_muted: Command.parseNumber,
    client_output_muted: Command.parseNumber,
    client_input_hardware: Command.parseNumber,
    client_output_hardware: Command.parseNumber,
    client_talk_power: Command.parseNumber,
    client_is_talker: Command.parseNumber,
    client_is_priority_speaker: Command.parseNumber,
    client_is_recording: Command.parseNumber,
    client_is_channel_commander: Command.parseNumber,
    client_unique_identifier: Command.parseString,
    client_servergroups: Command.parseNumberArray,
    client_channel_group_id: Command.parseNumber,
    client_channel_group_inherited_channel_id: Command.parseNumber,
    client_version: Command.parseString,
    client_platform: Command.parseString,
    client_idle_time: Command.parseNumber,
    client_created: Command.parseNumber,
    client_lastconnected: Command.parseNumber,
    client_icon_id: Command.parseNumber,
    client_country: Command.parseString,
    client_outputonly_muted: Command.parseNumber,
    client_default_channel: Command.parseNumber,
    client_meta_data: Command.parseString,
    client_version_sign: Command.parseString,
    client_security_hash: Command.parseString,
    client_login_name: Command.parseString,
    client_login_password: Command.parseString,
    client_totalconnections: Command.parseNumber,
    client_flag_avatar: Command.parseString,
    client_talk_request: Command.parseNumber,
    client_talk_request_msg: Command.parseString,
    client_month_bytes_uploaded: Command.parseNumber,
    client_month_bytes_downloaded: Command.parseNumber,
    client_total_bytes_uploaded: Command.parseNumber,
    client_total_bytes_downloaded: Command.parseNumber,
    client_nickname_phonetic: Command.parseString,
    client_default_token: Command.parseString,
    client_badges: Command.parseString,
    client_base64HashClientUID: Command.parseString,
    connection_connected_time: Command.parseNumber,
    connection_client_ip: Command.parseString,
    client_myteamspeak_id: Command.parseString,
    client_integrations: Command.parseString,
    client_description: Command.parseString,
    client_needed_serverquery_view_power: Command.parseNumber,
    client_myteamspeak_avatar: Command.parseString,
    client_signed_badges: Command.parseString,
    client_lastip: Command.parseString,
    cid: Command.parseNumber,
    pid: Command.parseNumber,
    cpid: Command.parseNumber,
    order: Command.parseNumber,
    channel_cpid: Command.parseNumber,
    channel_order: Command.parseNumber,
    channel_name: Command.parseString,
    channel_password: Command.parseString,
    channel_description: Command.parseString,
    channel_topic: Command.parseString,
    channel_flag_default: Command.parseNumber,
    channel_flag_password: Command.parseNumber,
    channel_flag_permanent: Command.parseNumber,
    channel_flag_semi_permanent: Command.parseNumber,
    channel_flag_temporary: Command.parseNumber,
    channel_codec: Command.parseNumber,
    channel_codec_quality: Command.parseNumber,
    channel_needed_talk_power: Command.parseNumber,
    channel_icon_id: Command.parseNumber,
    total_clients_family: Command.parseNumber,
    channel_maxclients: Command.parseNumber,
    channel_maxfamilyclients: Command.parseNumber,
    total_clients: Command.parseNumber,
    channel_needed_subscribe_power: Command.parseNumber,
    channel_codec_latency_factor: Command.parseNumber,
    channel_codec_is_unencrypted: Command.parseNumber,
    channel_security_salt: Command.parseString,
    channel_delete_delay: Command.parseNumber,
    channel_flag_maxclients_unlimited: Command.parseNumber,
    channel_flag_maxfamilyclients_unlimited: Command.parseNumber,
    channel_flag_maxfamilyclients_inherited: Command.parseNumber,
    channel_filepath: Command.parseString,
    channel_forced_silence: Command.parseNumber,
    channel_name_phonetic: Command.parseString,
    channel_flag_private: Command.parseNumber,
    channel_banner_gfx_url: Command.parseString,
    channel_banner_mode: Command.parseNumber,
    seconds_empty: Command.parseNumber,
    cgid: Command.parseNumber,
    sgid: Command.parseNumber,
    permid: Command.parseNumber,
    permvalue: Command.parseNumber,
    permnegated: Command.parseNumber,
    permskip: Command.parseNumber,
    permsid: Command.parseString,
    t: Command.parseNumber,
    id1: Command.parseNumber,
    id2: Command.parseNumber,
    p: Command.parseNumber,
    v: Command.parseNumber,
    n: Command.parseNumber,
    s: Command.parseNumber,
    reasonid: Command.parseNumber,
    reasonmsg: Command.parseString,
    ctid: Command.parseNumber,
    cfid: Command.parseNumber,
    targetmode: Command.parseNumber,
    target: Command.parseNumber,
    invokerid: Command.parseNumber,
    invokername: Command.parseString,
    invokeruid: Command.parseString,
    hash: Command.parseString,
    last_pos: Command.parseNumber,
    file_size: Command.parseNumber,
    l: Command.parseString,
    path: Command.parseString,
    size: Command.parseNumber,
    clientftfid: Command.parseNumber,
    serverftfid: Command.parseNumber,
    ftkey: Command.parseString,
    port: Command.parseNumber,
    proto: Command.parseNumber,
    datetime: Command.parseNumber,
    host_timestamp_utc: Command.parseNumber,
    instance_uptime: Command.parseNumber,
    virtualservers_running_total: Command.parseNumber,
    virtualservers_total_channels_online: Command.parseNumber,
    virtualservers_total_clients_online: Command.parseNumber,
    virtualservers_total_maxclients: Command.parseNumber,
    serverinstance_database_version: Command.parseNumber,
    serverinstance_filetransfer_port: Command.parseNumber,
    serverinstance_serverquery_max_connections_per_ip: Command.parseNumber,
    serverinstance_max_download_total_bandwidth: Command.parseNumber,
    serverinstance_max_upload_total_bandwidth: Command.parseNumber,
    serverinstance_guest_serverquery_group: Command.parseNumber,
    serverinstance_pending_connections_per_ip: Command.parseNumber,
    serverinstance_permissions_version: Command.parseNumber,
    serverinstance_serverquery_flood_ban_time: Command.parseNumber,
    serverinstance_serverquery_flood_commands: Command.parseNumber,
    serverinstance_serverquery_flood_time: Command.parseNumber,
    serverinstance_template_channeladmin_group: Command.parseNumber,
    serverinstance_template_channeldefault_group: Command.parseNumber,
    serverinstance_template_serveradmin_group: Command.parseNumber,
    serverinstance_template_serverdefault_group: Command.parseNumber,
    msgid: Command.parseNumber,
    timestamp: Command.parseNumber,
    cluid: Command.parseString,
    subject: Command.parseString,
    message: Command.parseString,
    version: Command.parseString,
    build: Command.parseNumber,
    platform: Command.parseString,
    name: Command.parseString,
    token: Command.parseString,
    tokencustomset: Command.parseRecursive,
    value: Command.parseString,
    banid: Command.parseNumber,
    id: Command.parseNumber,
    msg: Command.parseString,
    extra_msg: Command.parseString,
    failed_permid: Command.parseNumber,
    ident: Command.parseString,
    ip: Command.parseString,
    nickname: Command.parseString,
    uid: Command.parseString,
    desc: Command.parseString,
    pw_clear: Command.parseString,
    start: Command.parseNumber,
    end: Command.parseNumber,
    tcid: Command.parseNumber,
    permname: Command.parseString,
    permdesc: Command.parseString,
    token_type: Command.parseNumber,
    token1: Command.parseString,
    token2: Command.parseString,
    token_id1: Command.parseNumber,
    token_id2: Command.parseNumber,
    token_created: Command.parseNumber,
    token_description: Command.parseString,
    flag_read: Command.parseNumber,
    tcldbid: Command.parseNumber,
    tname: Command.parseString,
    fcldbid: Command.parseNumber,
    fname: Command.parseString,
    mytsid: Command.parseString,
    lastnickname: Command.parseString,
    created: Command.parseNumber,
    duration: Command.parseNumber,
    invokercldbid: Command.parseNumber,
    enforcements: Command.parseNumber,
    reason: Command.parseString,
    type: Command.parseNumber,
    iconid: Command.parseNumber,
    savedb: Command.parseNumber,
    namemode: Command.parseNumber,
    n_modifyp: Command.parseNumber,
    n_member_addp: Command.parseNumber,
    n_member_removep: Command.parseNumber,
    sortid: Command.parseNumber,
    count: Command.parseNumber,
    salt: Command.parseString,
    snapshot: Command.parseString
  }
}