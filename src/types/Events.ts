import { TeamSpeakClient } from "../node/Client"
import { TeamSpeakChannel } from "../node/Channel"
import { QueryResponseTypes } from "./QueryResponse"
import { ClientList, CustomSet } from "./ResponseTypes"
import * as ENUM from "./enum"

export declare interface Debug {
  type: string,
  data: string
}

export declare interface ClientConnect {
 client: TeamSpeakClient
}

export declare interface ClientDisconnect {
  client: ClientList
  event: any
}

export declare interface TokenUsed {
  client: ClientList
  token: string
  token1: string
  token2: string
  tokencustomset: Array<CustomSet>
}

export declare interface TextMessage {
  invoker: TeamSpeakClient
  msg: string
  targetmode: ENUM.TextMessageTargetMode
}

export declare interface ClientMoved {
  client: TeamSpeakClient
  channel: TeamSpeakChannel
  reasonid: ENUM.ReasonIdentifier
}

export declare interface ServerEdit {
  invoker: TeamSpeakClient
  modified: Partial<QueryResponseTypes>
  reasonid: number
}

export declare interface ChannelEdit {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Partial<QueryResponseTypes>
  reasonid: number
}

export declare interface ChannelCreate {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Partial<QueryResponseTypes>
  cpid: number
}

export declare interface ChannelMove {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  parent: TeamSpeakChannel
  order: number
}

export declare interface ChannelDelete {
  invoker: TeamSpeakClient
  cid: number
}