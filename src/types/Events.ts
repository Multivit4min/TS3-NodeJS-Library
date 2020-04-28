import { TeamSpeakClient } from "../node/Client"
import { TeamSpeakChannel } from "../node/Channel"
import { ClientList } from "./ResponseTypes"
import {
  TextMessageTargetMode,
  ReasonIdentifier
} from "./enum"

export interface Debug {
  type: string,
  data: string
}

export interface ClientConnect {
 client: TeamSpeakClient
}

export interface ClientDisconnect {
  client?: TeamSpeakClient
  event: {
    cfid: number,
    ctid: number,
    reasonid: number,
    reasonmsg: string,
    clid: number
  }
}

export interface TokenUsed {
  client: ClientList
  token: string
  token1: string
  token2: string
}

export interface TextMessage {
  invoker: TeamSpeakClient
  msg: string
  targetmode: TextMessageTargetMode
}

export interface ClientMoved {
  client: TeamSpeakClient
  channel: TeamSpeakChannel
  reasonid: ReasonIdentifier
}

export interface ServerEdit {
  invoker: TeamSpeakClient
  modified: Record<string, any>
  reasonid: number
}

export interface ChannelEdit {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Record<string, any>
  reasonid: number
}

export interface ChannelCreate {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Record<string, any>
  cpid: number
}

export interface ChannelMove {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  parent: TeamSpeakChannel
  order: number
}

export interface ChannelDelete {
  invoker?: TeamSpeakClient
  cid: number
}