import { TeamSpeak } from "../TeamSpeak"

export class PermissionBuilder<T extends {} = any> {

  private teamspeak: TeamSpeak
  private _perm?: string|number
  private _value: number = 0
  private _skip: boolean = false
  private _negate: boolean = false
  private withSkipNegate: boolean
  private cmdUpdate: string
  private cmdRemove: string
  private context: T

  constructor(config: PermissionBuilder.IConfig<T>) {
    this.teamspeak = config.teamspeak
    this.withSkipNegate = config.allowSkipNegate || true
    this.context = config.context
  }

  /** sets/gets the permid or permsid */
  perm(perm: undefined): string|number|undefined
  perm(perm: string|number): PermissionBuilder<T>
  perm(perm?: string|number): string|number|undefined|PermissionBuilder<T> {
    if (perm === undefined) return this._perm
    this._perm = perm
    return this
  }

  /** sets/gets the value for the permission */
  value(perm: undefined): number
  value(perm: number): PermissionBuilder<T>
  value(value?: number): number|PermissionBuilder<T> {
    if (value === undefined) return this._value
    this._value = value
    return this
  }

  /** sets/gets the skip value */
  skip(skip: undefined): boolean
  skip(skip: boolean): PermissionBuilder<T>
  skip(skip?: boolean): boolean|PermissionBuilder<T> {
    if (skip === undefined) return this._skip
    this._skip = skip
    return this
  }

  /** sets/gets the negate value */
  negate(negate: undefined): boolean
  negate(negate: boolean): PermissionBuilder<T>
  negate(negate?: boolean): boolean|PermissionBuilder<T> {
    if (negate === undefined) return this._negate
    this._negate = negate
    return this
  }

  /** retrieves the permission object */
  get(): PermissionBuilder.PermId|PermissionBuilder.PermSid {
    if (!this._perm) throw new Error("PermissionBuilder#perm has not been called yet")
    if (typeof this._perm === "string") return this.getAsPermSid()
    return this.getAsPermid()
  }

  /** retrieves skip and negate flags */
  private getFlags() {
    if (this.withSkipNegate) return {}
    return { skip: this._skip, negate: this._negate }
  }

  /** retrieves a raw object with permid */
  private getAsPermid(): PermissionBuilder.PermId {
    if (typeof this._perm !== "number")
      throw new Error(`permission needs to be a number but got '${this._perm}'`)
    return {
      permid: this._perm,
      permvalue: this._value,
      ...this.getFlags()
    }
  }

  /** retrieves a raw object with permsid */
  private getAsPermSid(): PermissionBuilder.PermSid {
    if (typeof this._perm !== "string")
      throw new Error(`permission needs to be a string but got '${this._perm}'`) 
    return {
      permsid: this._perm,
      permvalue: this._value,
      ...this.getFlags()
    }
  }

  /** retrieves the correct permission name */
  private getPermName() {
    return typeof this._perm === "string" ? "permsid" : "permid"
  }

  /** updates or adds the permission to the teamspeak server */
  update() {
    return this.teamspeak.execute(this.cmdUpdate, {
      ...this.context,
      ...this.get()
    })
  }

  /** removes the specified permission */
  remove() {
    return this.teamspeak.execute(this.cmdRemove, {
      ...this.context,
      [this.getPermName()]: this._perm
    })
  }

  static getDefaults(perm: Partial<PermissionBuilder.PermType>) {
    return {
      skip: false,
      negate: false,
      ...perm
    }
  }

}

export namespace PermissionBuilder {
  export interface IConfig<T> {
    teamspeak: TeamSpeak
    remove: string,
    update: string,
    context: T
    allowSkipNegate?: boolean
  }

  export interface BasePermission {
    permvalue: number
    skip?: boolean
    negate?: boolean
  }

  export interface PermSid extends BasePermission {
    permsid: string
  }

  export interface PermId extends BasePermission {
    permid: number
  }

  export type PermType = {
    permname: string|number
    permvalue: number
    skip?: boolean
    negate?: boolean
  }
}