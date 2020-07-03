import { TeamSpeak } from "../TeamSpeak"

export class Permission<T extends {} = any> {

  private teamspeak: TeamSpeak
  private _perm?: string|number
  private _value: number = 0
  private _skip: boolean = false
  private _negate: boolean = false
  private withSkipNegate: boolean
  private cmdUpdate: string
  private cmdRemove: string
  private context: T

  constructor(config: Permission.IConfig<T>) {
    this.cmdUpdate = config.update
    this.cmdRemove = config.remove
    this.teamspeak = config.teamspeak
    this.withSkipNegate = config.allowSkipNegate === false ? false : true
    this.context = config.context
  }

  /** retrieves the current permission */
  getPerm() {
    return this._perm
  }

  /** retrieves the permission value */
  getValue() {
    return this._value
  }

  /** retrieves wether skip has been set */
  getSkip() {
    return this._skip || false
  }

  /** retrieves wether negate has been set */
  getNegate() {
    return this._negate || false
  }

  /** sets/gets the permid or permsid */
  perm(perm: string|number): Permission<T> {
    this._perm = perm
    return this
  }

  /** sets/gets the value for the permission */
  value(value: number): Permission<T> {
    this._value = value
    return this
  }

  /** sets/gets the skip value */
  skip(skip: boolean): Permission<T> {
    this._skip = skip
    return this
  }

  /** sets/gets the negate value */
  negate(negate: boolean): Permission<T> {
    this._negate = negate
    return this
  }

  /** retrieves the permission object */
  get(): Permission.PermId|Permission.PermSid {
    if (!this._perm) throw new Error("Permission#perm has not been called yet")
    if (typeof this._perm === "string") return this.getAsPermSid()
    return this.getAsPermId()
  }

  /** retrieves skip and negate flags */
  private getFlags() {
    if (!this.withSkipNegate) return {}
    return { permskip: this._skip, permnegated: this._negate }
  }

  /** retrieves a raw object with permid */
  private getAsPermId(): Permission.PermId {
    if (typeof this._perm !== "number")
      throw new Error(`permission needs to be a number but got '${this._perm}'`)
    return {
      permid: this._perm,
      permvalue: this._value,
      ...this.getFlags()
    }
  }

  /** retrieves a raw object with permsid */
  private getAsPermSid(): Permission.PermSid {
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

  static getDefaults(perm: Partial<Permission.PermType>): Partial<Permission.PermType> {
    return {
      permskip: false,
      permnegated: false,
      ...perm
    }
  }

}

export namespace Permission {
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
    permskip?: boolean
    permnegated?: boolean
  }
}