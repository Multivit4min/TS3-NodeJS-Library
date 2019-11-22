export enum SelectType {
  NONE,
  SID,
  PORT
}

export interface ActiveEvent {
  event: string
  id?: number
}

export interface LoginInfo {
  username: string
  password: string
}

export interface Context {
  selectType: SelectType
  selected: number
  events: ActiveEvent[]
  client_nickname?: string
  login?: LoginInfo
}