/** 
 * @file TeamSpeakProperty.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */ 
const CRC32 = require('crc-32') 
const Promise = require("bluebird")
const EventEmitter = require("events")

/**
 * TeamSpeak Property Class
 * @class
 */
 class TeamSpeakProperty extends EventEmitter { 
    /** 
     * Creates a new TeamSpeak Property 
     * @constructor 
     * @version 1.0 
     * @param {object} parent - The Parent Object which is a TeamSpeak Instance 
     */ 
    constructor(parent, c) {
        super()
        this._propcache = c
        this._parent = parent 
        this._cache = {} 
        this._cachetime = 50
        this._events = {}
    }


    /** 
     * Subscribes to parent Events 
     * @version 1.0
     * @param {string} name - The Event Name which should be subscribed to
     * @param {function} cb - The Callback
     * @returns {undefined}
     */ 
    on(name, cb) {
        if (!(name in this._events)) this._events[name] = []
        this._events[name].push(cb)
        this._parent.on(name, cb)
    }


    /** 
     * Safely unsubscribes to all Events
     * @version 1.0
     * @returns {undefined}
     */
    removeAllListeners() {
        Object.keys(this._events).forEach(k => {
            this._events[k].forEach(cb => {
                this._parent.removeListener(k, cb)
            })
        })
    }


    /** 
     * Sends a command to the TeamSpeak Server. 
     * @version 1.0 
     * @async 
     * @param {string} Command - The Command which should get executed on the TeamSpeak Server 
     * @param {object} [Object] - Optional the Parameters 
     * @param {object} [Array] - Optional Flagwords 
     * @param {boolean} [Boolean] - Optional if the Command should be cached 
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed 
     */ 
    execute() { 
        var args = Array.prototype.slice.call(arguments) 
        if (args.some(b => b === true)) 
            return this._commandCache(args.filter(a => a !== true)) 
        else 
            return this._parent.execute(...arguments) 
    }


    /** 
     * Sends a command to the TeamSpeak Server. 
     * @version 1.0 
     * @async 
     * @param {string} Command - The Command which should get executed on the TeamSpeak Server 
     * @param {object} [Object] - Optional the Parameters 
     * @param {object} [Array] - Optional Flagwords 
     * @param {boolean} [Boolean] - Optional if the Command should be cached 
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed 
     */ 
    execute() { 
        var args = Array.prototype.slice.call(arguments) 
        if (args.some(b => b === true)) 
            return this._commandCache(args.filter(a => a !== true)) 
        else 
            return this._parent.execute(...arguments) 
    }


   /** 
     * Sends a command to the TeamSpeak Server. 
     * @version 1.0 
     * @async 
     * @param {object} args - Arguments which the Query should execute 
     * @returns {Promise<object>} Promise object which returns the Information about the Query executed 
     */ 
    _commandCache(args) { 
        return new Promise((fulfill, reject) => { 
            let crc = this._getCommandCRC32(args)
            if (crc in this._cache) 
                return this._cache[crc].handle(fulfill, reject)
            this._cache[crc] = {
                handle: (fulfill, reject) => {
                    if ("res" in this._cache[crc])
                        return fulfill(this._cache[crc].res)
                    if ("err" in this._cache[crc])
                        return reject(this._cache[crc].err)
                    this._cache[crc].fulfill.push(fulfill)
                    this._cache[crc].reject.push(reject)
                },
                setResponse: (res) => {
                    this._cache[crc].res = res
                    this._cache[crc].setTimeout()
                    this._cache[crc].fulfill.forEach(f => f(res))
                },
                setError: (err) => {
                    this._cache[crc].err = err
                    this._cache[crc].setTimeout()
                    this._cache[crc].reject.forEach(r => r(err))
                },
                setTimeout: () => {
                    setTimeout(() => {
                        delete this._cache[crc]
                    }, this._cachetime)
                },
                fulfill: [],
                reject: []
            }
            this._cache[crc].handle(fulfill, reject)
            this._parent.execute(...args).then(res => {
                this._cache[crc].setResponse(res)
            }).catch(err => {
                this._cache[crc].setError(err)
            }) 
        })
    } 

        
    /** 
     * Returns the Command, Parameters and Flags as CRC32 hash 
     * @version 1.0 
     * @private 
     * @param {string} Command - The Command which should get executed on the TeamSpeak Server 
     * @param {object} [Object] - Optional the Parameters 
     * @param {object} [Array] - Optional Flagwords 
     * @returns {string} CRC32 String 
     */ 
    _getCommandCRC32(args) { 
        var cmd = ["", {}, []] 
        args.forEach(a => { 
            switch (typeof a) { 
                case "string": 
                    return cmd[0] = a 
                case "object": 
                    if (Array.isArray(a)) 
                        return cmd[2] = a 
                    return cmd[1] = a 
            } 
        })
        return CRC32.str(JSON.stringify(cmd)) 
    }


    /** 
     * Filters an Object with given Option
     * @version 1.0
     * @async
     * @param {object} array - The Object which should get filtered 
     * @param {object} filter - Filter Object 
     * @returns {Promise<object>} Promise object
     */ 
    filter(array, filter) {
        return this._parent.constructor._filter(array, filter)
    }

    /** 
     * Returns the data from the last List Command
     * @version 1.0
     * @returns {object}
     */ 
    getCache() {
        return this._propcache
    }


    /** 
     * Sets the Data from the Last List Command
     * @private
     * @version 1.0
     * @returns {object}
     */ 
    updateCache(info) {
        return this._propcache = info
    }

} 

module.exports = TeamSpeakProperty