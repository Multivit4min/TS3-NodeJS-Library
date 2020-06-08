import { ResponseError } from "../exception/ResponseError"
import { QueryErrorMessage } from "../types/ResponseTypes"
import { TeamSpeakQuery } from "./TeamSpeakQuery"

export class Command {

  static SNAKE_CASE_IDENTIFIER = "_"
  private requestParser: Command.RequestParser = Command.getParsers().request
  private responseParser: Command.ResponseParser = Command.getParsers().response
  private cmd: string = ""
  private options: Command.options = {}
  private multiOpts: Command.multiOpts = []
  private flags: string[] = []
  private response: TeamSpeakQuery.Response = []
  private error: QueryErrorMessage|null = null
  private stack: string = new Error().stack!

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
   * @param parsers
   */
  setParser(parsers: Command.ParserCallback) {
    const { response, request } = parsers(Command.getParsers())
    this.requestParser = request
    this.responseParser = response
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
  setFlags(flags: Command.flags): Command {
    this.flags = <string[]>flags
      .filter(flag => ["string", "number"].includes(typeof flag))
      .map(flag => String(flag))
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
    this.error = <QueryErrorMessage><unknown>this.parse(error)[0]
    return this
  }

  /** get the parsed error object which has been received from the TeamSpeak Query */
  getError() {
    if (!this.hasError()) return null
    return new ResponseError(this.error!, this.stack)
  }

  /** checks if a error has been received */
  hasError() {
    return (
      this.error !== null &&
      typeof this.error === "object" &&
      typeof this.error.id === "string" &&
      this.error.id !== "0"
    )
  }

  /** get the parsed response object which has been received from the TeamSpeak Query */
  getResponse() {
    return this.response
  }

  /** runs the parser of this instance */
  parse(raw: string) {
    return this.responseParser({ raw, cmd: Command })
  }

  /** runs the parser of this instance */
  build() {
    return this.requestParser(this)
  }

  /**
   * retrieves the default parsers
   */
  static getParsers(): Command.Parsers {
    return {
      response: Command.parse,
      request: Command.build
    }
  }

  /**
   * 
   * @param param0 the custom snapshot response parser
   */
  static parseSnapshotCreate({ raw }: Pick<Command.ParserArgument, "raw">) {
    const [data, snapshot] = raw.split("|")
    return <TeamSpeakQuery.Response>[{
      ...Command.parse({ raw: data })[0],
      snapshot
    }]
  }

  /**
   * the custom snapshot request parser
   * @param data snapshot string
   * @param cmd command object
   */
  static buildSnapshotDeploy(data: string, cmd: Command) {
    return [Command.build(cmd), data].join("|")
  }

  /**
   * parses a query response
   * @param data the query response received
   */
  static parse({ raw }: Pick<Command.ParserArgument, "raw">): TeamSpeakQuery.Response {
    return raw
      .split("|")
      .map(entry => {
        const res: TeamSpeakQuery.ResponseEntry = {}
        entry.split(" ").forEach(str => {
          const { key, value } = Command.getKeyValue(str)
          res[key] = Command.parseValue(key, value)
        })
        return res
      })
      .map((entry, _, original) => ({...original[0], ...entry }))
  }

  /**
   * Checks if a error has been received
   * @return The parsed String which is readable by the TeamSpeak Query
   */
  static build(command: Command) {
    let cmd = Command.escape(command.cmd)
    if (command.hasFlags()) cmd += ` ${command.buildFlags()}`
    if (command.hasOptions()) cmd += ` ${command.buildOptions()}`
    return cmd
  }

  /**
   * builds the query string for options
   * @return the parsed String which is readable by the TeamSpeak Querytt
   */
  buildOptions() {
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

  /** builds the query string for flags */
  buildFlags(): string {
    return this.flags.map(f => Command.escape(f)).join(" ")
  }

  /**
   * escapes a key value pair
   * @param {string} key the key used
   * @param {string|string[]} value the value or an array of values
   * @return the parsed String which is readable by the TeamSpeak Query
   */
  static escapeKeyValue(key: string, value: string|string[]|boolean): string {
    key = Command.toSnakeCase(key)
    if (typeof value === "boolean") value = value ? "1" : "0"
    if (Array.isArray(value)) {
      return value.map(v => `${Command.escape(key)}=${Command.escape(v)}`).join("|")
    } else {
      return `${Command.escape(key)}=${Command.escape(value)}`
    }
  }

  /**
   * retrieves the key value pair from a string
   * @param str the key value pair to unescape eg foo=bar
   */
  static getKeyValue(str: string): { key: string, value: string|undefined } {
    const index = str.indexOf("=")
    if (index === -1) return { key: str, value: undefined }
    const value = str.substring(index+1)
    return { key:
      Command.toCamelCase(str.substring(0, index)),
      value: value === "" ? undefined : value
    }
  }

  /**
   * Parses a value to the type which the key represents
   * @param k the key which should get looked up
   * @param v the value which should get parsed
   */
  static parseValue(k: string, v: string|undefined) {
    if (v === undefined) return undefined
    if (Object.keys(Command.Identifier).includes(k)) { 
      return Command.Identifier[k](v)
    } else {
      return this.parseString(v)
    }
  }

  /**
   * parses a number
   * @param value string to parse
   */
  static parseBoolean(value: string) {
    return Command.parseNumber(value) === 1
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

  /** converts a string to camel case */
  static toCamelCase(str: string) {
    let toUpper = false
    return str.split("").map(char => {
      if (char === Command.SNAKE_CASE_IDENTIFIER) {
        toUpper = true
        return ""
      } else if (toUpper) {
        toUpper = false
        return char.toUpperCase()
      } else {
        return char
      }
    }).join("")
  }

  /** converts a string to snake case */
  static toSnakeCase(str: string) {
    return str.split("").map(char => {
      const lower = char.toLowerCase()
      if (char !== lower) return `${Command.SNAKE_CASE_IDENTIFIER}${lower}`
      return char
    }).join("")
  }
}

export namespace Command {

  export interface ParserArgument {
    cmd: typeof Command
    raw: string
  }
  export interface Parsers {
    response: ResponseParser
    request: RequestParser
  }
  export type ParserCallback = (parser: Parsers) => Parsers
  export type ResponseParser = (data: ParserArgument) => TeamSpeakQuery.Response
  export type RequestParser = (cmd: Command) => string
  export type options = Record<string, TeamSpeakQuery.ValueTypes>
  export type multiOpts = Command.options[]
  export type flags = (number|string|null)[]

  export const Identifier = {
    sid: Command.parseString,
    serverId: Command.parseString,
    virtualserverNickname: Command.parseString,
    virtualserverUniqueIdentifier: Command.parseString,
    virtualserverName: Command.parseString,
    virtualserverWelcomemessage: Command.parseString,
    virtualserverPlatform: Command.parseString,
    virtualserverVersion: Command.parseString,
    virtualserverMaxclients: Command.parseNumber,
    virtualserverPassword: Command.parseString,
    virtualserverClientsonline: Command.parseNumber,
    virtualserverChannelsonline: Command.parseNumber,
    virtualserverCreated: Command.parseNumber,
    virtualserverUptime: Command.parseNumber,
    virtualserverCodecEncryptionMode: Command.parseNumber,
    virtualserverHostmessage: Command.parseString,
    virtualserverHostmessageMode: Command.parseNumber,
    virtualserverFilebase: Command.parseString,
    virtualserverDefaultServerGroup: Command.parseString,
    virtualserverDefaultChannelGroup: Command.parseString,
    virtualserverFlagPassword: Command.parseBoolean,
    virtualserverDefaultChannelAdminGroup: Command.parseString,
    virtualserverMaxDownloadTotalBandwidth: Command.parseNumber,
    virtualserverMaxUploadTotalBandwidth: Command.parseNumber,
    virtualserverHostbannerUrl: Command.parseString,
    virtualserverHostbannerGfxUrl: Command.parseString,
    virtualserverHostbannerGfxInterval: Command.parseNumber,
    virtualserverComplainAutobanCount: Command.parseNumber,
    virtualserverComplainAutobanTime: Command.parseNumber,
    virtualserverComplainRemoveTime: Command.parseNumber,
    virtualserverMinClientsInChannelBeforeForcedSilence: Command.parseNumber,
    virtualserverPrioritySpeakerDimmModificator: Command.parseNumber,
    virtualserverId: Command.parseString,
    virtualserverAntifloodPointsNeededPluginBlock: Command.parseNumber,
    virtualserverAntifloodPointsTickReduce: Command.parseNumber,
    virtualserverAntifloodPointsNeededCommandBlock: Command.parseNumber,
    virtualserverAntifloodPointsNeededIpBlock: Command.parseNumber,
    virtualserverClientConnections: Command.parseNumber,
    virtualserverQueryClientConnections: Command.parseNumber,
    virtualserverHostbuttonTooltip: Command.parseString,
    virtualserverHostbuttonUrl: Command.parseString,
    virtualserverHostbuttonGfxUrl: Command.parseString,
    virtualserverQueryclientsonline: Command.parseNumber,
    virtualserverDownloadQuota: Command.parseNumber,
    virtualserverUploadQuota: Command.parseNumber,
    virtualserverMonthBytesDownloaded: Command.parseNumber,
    virtualserverMonthBytesUploaded: Command.parseNumber,
    virtualserverTotalBytesDownloaded: Command.parseNumber,
    virtualserverTotalBytesUploaded: Command.parseNumber,
    virtualserverPort: Command.parseNumber,
    virtualserverAutostart: Command.parseNumber,
    virtualserverMachineId: Command.parseString,
    virtualserverNeededIdentitySecurityLevel: Command.parseNumber,
    virtualserverLogClient: Command.parseNumber,
    virtualserverLogQuery: Command.parseNumber,
    virtualserverLogChannel: Command.parseNumber,
    virtualserverLogPermissions: Command.parseNumber,
    virtualserverLogServer: Command.parseNumber,
    virtualserverLogFiletransfer: Command.parseNumber,
    virtualserverMinClientVersion: Command.parseNumber,
    virtualserverNamePhonetic: Command.parseString,
    virtualserverIconId: Command.parseString,
    virtualserverReservedSlots: Command.parseNumber,
    virtualserverTotalPacketlossSpeech: Command.parseNumber,
    virtualserverTotalPacketlossKeepalive: Command.parseNumber,
    virtualserverTotalPacketlossControl: Command.parseNumber,
    virtualserverTotalPacketlossTotal: Command.parseNumber,
    virtualserverTotalPing: Command.parseNumber,
    virtualserverIp: Command.parseStringArray,
    virtualserverWeblistEnabled: Command.parseNumber,
    virtualserverAskForPrivilegekey: Command.parseNumber,
    virtualserverHostbannerMode: Command.parseNumber,
    virtualserverChannelTempDeleteDelayDefault: Command.parseNumber,
    virtualserverMinAndroidVersion: Command.parseNumber,
    virtualserverMinIosVersion: Command.parseNumber,
    virtualserverStatus: Command.parseString,
    connectionFiletransferBandwidthSent: Command.parseNumber,
    connectionFiletransferBandwidthReceived: Command.parseNumber,
    connectionFiletransferBytesSentTotal: Command.parseNumber,
    connectionFiletransferBytesReceivedTotal: Command.parseNumber,
    connectionPacketsSentSpeech: Command.parseNumber,
    connectionBytesSentSpeech: Command.parseNumber,
    connectionPacketsReceivedSpeech: Command.parseNumber,
    connectionBytesReceivedSpeech: Command.parseNumber,
    connectionPacketsSentKeepalive: Command.parseNumber,
    connectionBytesSentKeepalive: Command.parseNumber,
    connectionPacketsReceivedKeepalive: Command.parseNumber,
    connectionBytesReceivedKeepalive: Command.parseNumber,
    connectionPacketsSentControl: Command.parseNumber,
    connectionBytesSentControl: Command.parseNumber,
    connectionPacketsReceivedControl: Command.parseNumber,
    connectionBytesReceivedControl: Command.parseNumber,
    connectionPacketsSentTotal: Command.parseNumber,
    connectionBytesSentTotal: Command.parseNumber,
    connectionPacketsReceivedTotal: Command.parseNumber,
    connectionBytesReceivedTotal: Command.parseNumber,
    connectionBandwidthSentLastSecondTotal: Command.parseNumber,
    connectionBandwidthSentLastMinuteTotal: Command.parseNumber,
    connectionBandwidthReceivedLastSecondTotal: Command.parseNumber,
    connectionBandwidthReceivedLastMinuteTotal: Command.parseNumber,
    connectionPacketlossTotal: Command.parseNumber,
    connectionPing: Command.parseNumber,
    clid: Command.parseString,
    clientId: Command.parseString,
    cldbid: Command.parseString,
    clientDatabaseId: Command.parseString,
    clientChannelId: Command.parseString,
    clientOriginServerId: Command.parseString,
    clientNickname: Command.parseString,
    clientType: Command.parseNumber,
    clientAway: Command.parseBoolean,
    clientAwayMessage: Command.parseString,
    clientFlagTalking: Command.parseBoolean,
    clientInputMuted: Command.parseBoolean,
    clientOutputMuted: Command.parseBoolean,
    clientInputHardware: Command.parseBoolean,
    clientOutputHardware: Command.parseBoolean,
    clientTalkPower: Command.parseNumber,
    clientIsTalker: Command.parseBoolean,
    clientIsPrioritySpeaker: Command.parseNumber,
    clientIsRecording: Command.parseBoolean,
    clientIsChannelCommander: Command.parseBoolean,
    clientUniqueIdentifier: Command.parseString,
    clientServergroups: Command.parseStringArray,
    clientChannelGroupId: Command.parseString,
    clientChannelGroupInheritedChannelId: Command.parseString,
    clientVersion: Command.parseString,
    clientPlatform: Command.parseString,
    clientIdleTime: Command.parseNumber,
    clientCreated: Command.parseNumber,
    clientLastconnected: Command.parseNumber,
    clientIconId: Command.parseString,
    clientCountry: Command.parseString,
    clientOutputonlyMuted: Command.parseNumber,
    clientDefaultChannel: Command.parseString,
    clientMetaData: Command.parseString,
    clientVersionSign: Command.parseString,
    clientSecurityHash: Command.parseString,
    clientLoginName: Command.parseString,
    clientLoginPassword: Command.parseString,
    clientTotalconnections: Command.parseNumber,
    clientFlagAvatar: Command.parseString,
    clientTalkRequest: Command.parseBoolean,
    clientTalkRequestMsg: Command.parseString,
    clientMonthBytesUploaded: Command.parseNumber,
    clientMonthBytesDownloaded: Command.parseNumber,
    clientTotalBytesUploaded: Command.parseNumber,
    clientTotalBytesDownloaded: Command.parseNumber,
    clientNicknamePhonetic: Command.parseString,
    clientDefaultToken: Command.parseString,
    clientBadges: Command.parseString,
    clientBase64HashClientUID: Command.parseString,
    connectionConnectedTime: Command.parseNumber,
    connectionClientIp: Command.parseString,
    clientMyteamspeakId: Command.parseString,
    clientIntegrations: Command.parseString,
    clientDescription: Command.parseString,
    clientNeededServerqueryViewPower: Command.parseNumber,
    clientMyteamspeakAvatar: Command.parseString,
    clientSignedBadges: Command.parseString,
    clientLastip: Command.parseString,
    cid: Command.parseString,
    pid: Command.parseString,
    cpid: Command.parseString,
    order: Command.parseNumber,
    channelOrder: Command.parseNumber,
    channelName: Command.parseString,
    channelPassword: Command.parseString,
    channelDescription: Command.parseString,
    channelTopic: Command.parseString,
    channelFlagDefault: Command.parseBoolean,
    channelFlagPassword: Command.parseBoolean,
    channelFlagPermanent: Command.parseBoolean,
    channelFlagSemiPermanent: Command.parseBoolean,
    channelFlagTemporary: Command.parseBoolean,
    channelCodec: Command.parseNumber,
    channelCodecQuality: Command.parseNumber,
    channelNeededTalkPower: Command.parseNumber,
    channelIconId: Command.parseString,
    totalClientsFamily: Command.parseNumber,
    channelMaxclients: Command.parseNumber,
    channelMaxfamilyclients: Command.parseNumber,
    totalClients: Command.parseNumber,
    channelNeededSubscribePower: Command.parseNumber,
    channelCodecLatencyFactor: Command.parseNumber,
    channelCodecIsUnencrypted: Command.parseNumber,
    channelSecuritySalt: Command.parseString,
    channelDeleteDelay: Command.parseNumber,
    channelFlagMaxclientsUnlimited: Command.parseBoolean,
    channelFlagMaxfamilyclientsUnlimited: Command.parseBoolean,
    channelFlagMaxfamilyclientsInherited: Command.parseBoolean,
    channelFilepath: Command.parseString,
    channelForcedSilence: Command.parseNumber,
    channelNamePhonetic: Command.parseString,
    channelFlagPrivate: Command.parseBoolean,
    channelBannerGfxUrl: Command.parseString,
    channelBannerMode: Command.parseNumber,
    secondsEmpty: Command.parseNumber,
    cgid: Command.parseString,
    sgid: Command.parseString,
    permid: Command.parseString,
    permvalue: Command.parseNumber,
    permnegated: Command.parseBoolean,
    permskip: Command.parseBoolean,
    permsid: Command.parseString,
    t: Command.parseNumber,
    id1: Command.parseString,
    id2: Command.parseString,
    p: Command.parseNumber,
    v: Command.parseNumber,
    n: Command.parseNumber,
    s: Command.parseNumber,
    reasonid: Command.parseString,
    reasonmsg: Command.parseString,
    ctid: Command.parseString,
    cfid: Command.parseString,
    targetmode: Command.parseNumber,
    target: Command.parseNumber,
    invokerid: Command.parseString,
    invokername: Command.parseString,
    invokeruid: Command.parseString,
    hash: Command.parseString,
    lastPos: Command.parseNumber,
    fileSize: Command.parseNumber,
    l: Command.parseString,
    path: Command.parseString,
    size: Command.parseNumber,
    clientftfid: Command.parseString,
    serverftfid: Command.parseString,
    currentSpeed: Command.parseNumber,
    averageSpeed: Command.parseNumber,
    runtime: Command.parseNumber,
    sizedone: Command.parseNumber,
    sender: Command.parseNumber,
    status: Command.parseNumber,
    ftkey: Command.parseString,
    port: Command.parseNumber,
    proto: Command.parseNumber,
    datetime: Command.parseNumber,
    hostTimestampUtc: Command.parseNumber,
    instanceUptime: Command.parseNumber,
    virtualserversRunningTotal: Command.parseNumber,
    virtualserversTotalChannelsOnline: Command.parseNumber,
    virtualserversTotalClientsOnline: Command.parseNumber,
    virtualserversTotalMaxclients: Command.parseNumber,
    serverinstanceDatabaseVersion: Command.parseNumber,
    serverinstanceFiletransferPort: Command.parseNumber,
    serverinstanceServerqueryMaxConnectionsPerIp: Command.parseNumber,
    serverinstanceMaxDownloadTotalBandwidth: Command.parseNumber,
    serverinstanceMaxUploadTotalBandwidth: Command.parseNumber,
    serverinstanceGuestServerqueryGroup: Command.parseNumber,
    serverinstancePendingConnectionsPerIp: Command.parseNumber,
    serverinstancePermissionsVersion: Command.parseNumber,
    serverinstanceServerqueryFloodBanTime: Command.parseNumber,
    serverinstanceServerqueryFloodCommands: Command.parseNumber,
    serverinstanceServerqueryFloodTime: Command.parseNumber,
    serverinstanceTemplateChanneladminGroup: Command.parseString,
    serverinstanceTemplateChanneldefaultGroup: Command.parseString,
    serverinstanceTemplateServeradminGroup: Command.parseNumber,
    serverinstanceTemplateServerdefaultGroup: Command.parseString,
    msgid: Command.parseString,
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
    banid: Command.parseString,
    id: Command.parseString,
    msg: Command.parseString,
    extraMsg: Command.parseString,
    failedPermid: Command.parseString,
    ident: Command.parseString,
    ip: Command.parseString,
    nickname: Command.parseString,
    uid: Command.parseString,
    desc: Command.parseString,
    pwClear: Command.parseString,
    start: Command.parseNumber,
    end: Command.parseNumber,
    tcid: Command.parseString,
    permname: Command.parseString,
    permdesc: Command.parseString,
    tokenType: Command.parseNumber,
    tokenCustomset: Command.parseRecursive,
    token1: Command.parseString,
    token2: Command.parseString,
    tokenId1: Command.parseString,
    tokenId2: Command.parseString,
    tokenCreated: Command.parseNumber,
    tokenDescription: Command.parseString,
    flagRead: Command.parseBoolean,
    tcldbid: Command.parseString,
    tname: Command.parseString,
    fcldbid: Command.parseString,
    fname: Command.parseString,
    mytsid: Command.parseString,
    lastnickname: Command.parseString,
    created: Command.parseNumber,
    duration: Command.parseNumber,
    invokercldbid: Command.parseString,
    enforcements: Command.parseNumber,
    reason: Command.parseString,
    type: Command.parseNumber,
    iconid: Command.parseString,
    savedb: Command.parseNumber,
    namemode: Command.parseNumber,
    nModifyp: Command.parseNumber,
    nMemberAddp: Command.parseNumber,
    nMemberRemovep: Command.parseNumber,
    sortid: Command.parseString,
    count: Command.parseNumber,
    salt: Command.parseString,
    snapshot: Command.parseString,
    apikey: Command.parseString,
    scope: Command.parseString,
    timeLeft: Command.parseNumber,
    createdAt: Command.parseNumber,
    expiresAt: Command.parseNumber
  }
}