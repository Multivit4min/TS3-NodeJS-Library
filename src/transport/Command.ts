import { QueryResponseIdentifier, ResponseType } from "../types/QueryResponse"
import { ResponseError } from "../exception/ResponseError"
import { QueryErrorMessage } from "../types/ResponseTypes"
import { QueryResponseTypes, QueryResponse } from "../types/QueryResponseType";

export class Command {
  private cmd: string = ""
  private options: Record<string, string>
  private multiOpts: Record<string, string[]>[]
  private flags: Array<string> = []
  private response: Array<any>
  private error: QueryErrorMessage|null = null

  /**
   * Initializes the Respone with default values
   */
  reset(): Command {
    this.response = []
    this.error = null
    return this
  }

  /**
   * Sets the main command to send
   */
  setCommand(cmd: string): Command {
    this.cmd = cmd.trim()
    return this
  }


  /**
   * Sets the TeamSpeak Key Value Pairs
   * @param {object} opts sets the Object with the key value pairs which should get sent to the TeamSpeak Query
   */
  setOptions(options: Record<string, string>): Command {
    this.options = options
    return this
  }


  /**
   * Sets the TeamSpeak Key Value Pairs
   * @param {object[]} opts sets the Object with the key value pairs which should get sent to the TeamSpeak Query
   */
  setMultiOptions(options: Record<string, string[]>[]): Command {
    this.multiOpts = options
    return this
  }


  /**
   * checks wether there are options used with this command
   */
  hasOptions(): boolean {
    return Object.values(this.options).length > 0 || this.hasMultiOptions()
  }


  /**
   * Checks wether there are options used with this command
   */
  hasMultiOptions() {
    return this.multiOpts.length > 0
  }


  /**
   * set TeamSpeak flags
   * @param flags sets the flags which should get sent to the teamspeak query
   */
  setFlags(flags: Array<string>): Command {
    this.flags = flags
    return this
  }


  /**
   * checks wether there are flags used with this command
   */
  hasFlags(): boolean {
    return this.flags.length > 0
  }


  /**
   * set the Line which has been received from the TeamSpeak Query
   * @param line the line which has been received from the teamSpeak query
   */
  setResponse(line: string): Command {
    this.response = Command.parse(line)
    return this
  }


  /**
   * Set the error line which has been received from the TeamSpeak Query
   * @param error the error line which has been received from the TeamSpeak Query
   */
  setError(error: string): Command {
    const { id, msg, ...rest } = Command.parse(error)[0]
    if (typeof id !== "number" || typeof msg !== "string") return this
    this.error = { id, msg, ...rest }
    return this
  }


  /**
   * get the parsed error object which has been received from the TeamSpeak Query
   */
  getError() {
    if (!this.error) return null
    return new ResponseError(this.error)
  }


  /**
   * checks if a error has been received
   */
  hasError() {
    return this.error !== null && this.error.id > 0
  }


  /**
   * get the parsed response object which has been received from the TeamSpeak Query
   */
  getResponse() {
    return this.response || []
  }


  /**
   * parses a query response
   * @param data the query response received
   */
  static parse(data: string = "") {
    return data.split("|").map(entry => {
      const res: Partial<Record<keyof QueryResponseTypes|string, QueryResponseTypes[keyof QueryResponseTypes]|string|undefined>> = {}
      entry.split(" ").forEach(str => {
        const { key, value } = Command.unescapeKeyValue(str)
        if (value === undefined) {
          res[key] = undefined
        } else {
          res[key] = Command.parseValue(key, value)
        }
      })
      return res
    })
  }


  /**
   * Checks if a error has been received
   * @return The parsed String which is readable by the TeamSpeak Query
   */
  build() {
    let cmd = Command.escape(this.cmd)
    if (this.hasFlags()) cmd += ` ${this.buildFlags()}`
    if (this.hasOptions()) cmd += ` ${this.buildOptions()}`
    return cmd
  }


  /**
   * builds the query string for options
   * @return the parsed String which is readable by the TeamSpeak Querytt
   */
  private buildOptions() {
    const options = this.buildOption(this.options)
    if (!this.hasMultiOptions()) return options
    return `${options} ${this.multiOpts.map(this.buildOption.bind(this)).join("|")}`
  }


  /**
   * builds the query string for options
   */
  buildOption(options: Record<string, any>): string {
    return Object
      .keys(options)
      .filter(key => [undefined, null].indexOf(options[key]) === -1)
      .filter(key => typeof options[key] !== "number" || !isNaN(options[key]))
      .map(key => Command.escapeKeyValue(key, options[key]))
      .join(" ")
  }


  /**
   * escapes a key value pair
   * @param {string} key the key used
   * @param {string|string[]} value the value or an array of values
   * @return the parsed String which is readable by the TeamSpeak Query
   */
  static escapeKeyValue(key: string, value: string|string[]): string {
    if (Array.isArray(value)) {
      return value.map(v => `${Command.escape(key)}=${Command.escape(v)}`).join("|")
    } else {
      return `${Command.escape(key)}=${Command.escape(value)}`
    }
  }

  /**
   * unescapes a key value pair
   * @param str the key value pair to unescape eg foo=bar
   */
  static unescapeKeyValue(str: string): { key: string, value: string|undefined } {
    const [key, ...rest] = str.split("=")
    const value = rest.join("=")
    return { key, value: value === "" ? undefined : value }
  }


  /**
   * Builds the query string for flags
   */
  private buildFlags(): string {
    return this.flags.map(f => Command.escape(f)).join(" ")
  }


  /**
   * Parses a value to the type which the key represents
   * @param k the key which should get looked up
   * @param v the value which should get parsed
   */
  static parseValue(k: string, v: string) {
    //@ts-ignore
    switch (QueryResponseIdentifier[k]) {
      case ResponseType.ARRAY_OF_NUMBER: 
        return v.split(",").map(i => parseFloat(i))
      case ResponseType.ARRAY_OF_STRING:
          return v.split(",").map(i => String(i))
      case ResponseType.NUMBER:
        return parseFloat(v)
      case ResponseType.STRING:
        return String(v)
      default:
        return String(v)
    }
  }

  /**
   * unescapes a string
   */
  static unescape(str: string): string {
    return String(str)
      .replace(/\\s/g, " ")
      .replace(/\\p/g, "|")
      .replace(/\\n/g, "\n")
      .replace(/\\f/g, "\f")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\v/g, "\v")
      .replace(/\\\//g, "/")
      .replace(/\\\\/g, "\\")
  }

  /**
   * escapes a string
   */
  static escape(str: string): string {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")
      .replace(/\|/g, "\\p")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\v/g, "\\v")
      .replace(/\f/g, "\\f")
      .replace(/ /g, "\\s")
  }
}