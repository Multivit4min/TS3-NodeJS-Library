import { TeamSpeak } from "../TeamSpeak"
import { TeamSpeakQuery } from "../transport/TeamSpeakQuery"

export abstract class Abstract<T extends TeamSpeakQuery.ResponseEntry> {

  private namespace: string
  private propcache: T
  private parent: TeamSpeak

  constructor(parent: TeamSpeak, props: T, namespace: string) {
    this.namespace = namespace
    this.propcache = { ...props }
    this.parent = parent
  }

  /** retrieves the namespace of this class */
  getNameSpace() {
    return this.namespace
  }

  /** returns JSONifyable data */
  toJSON(includeNameSpace: boolean = true) {
    const res: Record<string, any> = { ...this.propcache }
    if (includeNameSpace) res._namespace = this.getNameSpace()
    return res
  }

  /**
   * retrieves a single property value by the given name
   * @param name the name from where the value should be retrieved
   */
  getPropertyByName<Y extends keyof T>(name: Y): T[Y] {
    return this.propcache[name]
  }

  /** updates the cache with the given object */
  updateCache(props: TeamSpeakQuery.ResponseEntry) {
    this.propcache = { ...this.propcache, ...props}
    return this
  }

  /** returns the parent class */
  getParent() {
    return this.parent
  }

}