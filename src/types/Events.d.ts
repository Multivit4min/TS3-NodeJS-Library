import { TeamSpeakClient } from "../node/Client"
import { TeamSpeakChannel } from "../node/Channel"
import { QueryResponseTypes } from "./QueryResponseType"
import { ClientList } from "./ResponseTypes"
import * as ENUM from "./enum"

export interface Debug {
  type: string,
  data: string
}

export interface ClientConnect {
 client: TeamSpeakClient
}

export interface ClientDisconnect {
  client: ClientList
  event: any
}

export interface TextMessage {
  invoker: TeamSpeakClient
  msg: string
  targetmode: ENUM.TextMessageTargetMode
}

export interface ClientMoved {
  client: TeamSpeakClient
  channel: TeamSpeakChannel
  reasonid: ENUM.ReasonIdentifier
}

export interface ServerEdit {
  invoker: TeamSpeakClient
  modified: Partial<QueryResponseTypes>
  reasonid: number
}

export interface ChannelEdit {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Partial<QueryResponseTypes>
  reasonid: number
}

export interface ChannelCreate {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Partial<QueryResponseTypes>
  cpid: number
}

export interface ChannelMove {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  parent: TeamSpeakChannel
  order: number
}

export interface ChannelDelete {
  invoker: TeamSpeakClient
  cid: number
}