import * as mocks from "./mockresponse"

export function channellist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.channellist({
    cid: String(i+1),
    channelName: `Channel ${i+1}`
  }))
}

export function clientlist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.clientlist({
    clid: String(i+1),
    clientDatabaseId: String(i+1),
    clientUniqueIdentifier: `foobar${i+1}=`,
    clientNickname: `Client ${i+1}`
  }))
}

export function servergrouplist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.servergrouplist({
    sgid: String(i+1),
    name: `Group ${i+1}`
  }))
}

export function channelgrouplist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.channelgrouplist({
    cgid: String(i+1),
    name: `Group ${i+1}`
  }))
}

export function serverlist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.serverlist({
    virtualserverId: String(i+1),
    virtualserverName: `Server ${i+1}`
  }))
}