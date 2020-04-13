import { Abstract } from "../../src/node/Abstract"
import { TeamSpeak } from "../../src/TeamSpeak"
import { TeamSpeakQuery } from "../../src/transport/TeamSpeakQuery"

export class MockNode<T extends TeamSpeakQuery.ResponseEntry> extends Abstract<T> {
  constructor(ts3: TeamSpeak, props: T, namespace: string) {
    super(ts3, props, namespace)
  }
}