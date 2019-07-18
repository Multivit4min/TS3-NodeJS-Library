import * as mocks from "./mockresponse"

export function channellist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.channellist({
    cid: i+1,
    channel_name: `Channel ${i+1}`
  }))
}

export function clientlist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.clientlist({
    clid: i+1,
    client_database_id: i+1,
    client_unique_identifier: `foobar${i+1}=`,
    client_nickname: `Client ${i+1}`
  }))
}

export function servergrouplist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.servergrouplist({
    sgid: i+1,
    name: `Group ${i+1}`
  }))
}

export function channelgrouplist(count: number) {
  return Array(count).fill(null).map((_, i) => mocks.channelgrouplist({
    cgid: i+1,
    name: `Group ${i+1}`
  }))
}