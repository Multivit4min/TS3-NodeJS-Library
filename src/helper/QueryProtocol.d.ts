import { ConnectionParams } from "../helper/types"

export interface QueryProtocol {
  send(str: string): void
  sendKeepAlive(): void
  close(): void
  on(name: string, cb: (...any) => void): QueryProtocol
}