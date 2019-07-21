import { Abstract } from "../../src/node/Abstract"
import { TeamSpeak } from "../../src/TeamSpeak"
import { QueryResponse } from "../../src/types/QueryResponse"

export class MockNode extends Abstract {
  constructor(ts3: TeamSpeak, props: Partial<QueryResponse>, namespace: string) {
    super(ts3, props, namespace)
  }
}