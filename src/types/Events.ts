import { TeamSpeakClient } from "../node/Client"
import { TeamSpeakChannel } from "../node/Channel"
import { ClientList } from "./ResponseTypes"
import { TextMessageTargetMode } from "./enum"

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
    cfid: string
    ctid: string
    reasonid: string
    reasonmsg: string
    clid: string
    invokerid?: string
    invokername?: string
    invokeruid?: string
    bantime?: number
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
  reasonid: string
}

export interface ServerEdit {
  invoker: TeamSpeakClient
  modified: Record<string, any>
  reasonid: string
}

export interface ChannelEdit {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Record<string, any>
  reasonid: string
}

export interface ChannelCreate {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  modified: Record<string, any>
  cpid: string
}

export interface ChannelMove {
  invoker: TeamSpeakClient
  channel: TeamSpeakChannel
  parent: TeamSpeakChannel
  order: number
}

export interface ChannelDelete {
  invoker?: TeamSpeakClient
  cid: string
}