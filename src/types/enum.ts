
  /**
   * TeamSpeak Enums
   */

  export enum HostMessageMode {
    /** don't display anything */
    NONE = 0,
    /** display message in chatlog */
    LOG = 1,
    /** display message in modal dialog */
    MODAL = 2,
    /** display message in modal dialog and close connection */
    MODALQUIT = 3
  }

  export enum HostBannerMode {
    /** do not adjust */
    NOADJUST = 0,
    /** adjust but ignore aspect ratio (like TeamSpeak 2) */
    IGNOREASPECT = 1,
    /** adjust and keep aspect ratio */
    KEEPASPECT = 2
  }

  export enum Codec {
    /** speex narrowband (mono, 16bit, 8kHz) */
    SPEEX_NARROWBAND = 0,
    /** speex wideband (mono, 16bit, 16kHz) */
    SPEEX_WIDEBAND = 1,
    /** speex ultra-wideband (mono, 16bit, 32kHz) */
    SPEEX_ULTRAWIDEBAND = 2,
    /** celt mono (mono, 16bit, 48kHz) */
    CELT_MONO = 3,
    OPUS_VOICE = 4,
    OPUS_MUSIC = 5
  }

  export enum CodecEncryptionMode {
    /** configure per channel */
    INDIVIDUAL = 0,
    /** globally disabled */
    DISABLED = 1,
    /** globally enabled */
    ENABLED = 2
  }

  export enum TextMessageTargetMode {
    /** target is a client */
    CLIENT = 1,
    /** target is a channel */
    CHANNEL = 2,
    /** target is a virtual server */
    SERVER = 3
  }

  export enum LogLevel {
    /** everything that is really bad */
    ERROR = 1,
    /** everything that might be bad */
    WARNING = 2,
    /** output that might help find a problem */
    DEBUG = 3,
    /** informational output */
    INFO = 4
  }

  export enum ReasonIdentifier {
    /** kick client from channel */
    KICK_CHANNEL = 4,
    /** kick client from server */
    KICK_SERVER = 5
  }

  export enum PermissionGroupDatabaseTypes {
    /** template group (used for new virtual servers) */
    Template = 0,
    /** regular group (used for regular clients) */
    Regular = 1,
    /** global query group (used for ServerQuery clients) */
    Query = 2
  }

  export enum PermissionGroupTypes {
    /** server group permission */
    ServerGroup = 0,
    /** client specific permission */
    GlobalClient = 1,
    /** channel specific permission */
    Channel = 2,
    /** channel group permission */
    ChannelGroup = 3,
    /** channel-client specific permission */
    ChannelClient = 4
  }

  export enum TokenType {
    /** server group token (id1={groupID} id2=0) */
    ServerGroup = 0,
    /** channel group token (id1={groupID} id2={channelID}) */
    ChannelGroup = 1
  }

  export enum ClientType {
    Regular = 0,
    ServerQuery = 1
  }

  export enum ApiKeyScope {
    MANAGE = "manage",
    READ = "read",
    WRITE = "write"
  }