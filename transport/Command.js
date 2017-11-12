/** 
 * @file Response.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com>
 */ 
const escape = require(__dirname+"/../helper/escape.js")



/**
 * TeamSpeak Query Command Class
 * @class
 */
class Command {
    /** 
     * Creates the Command Class
     * @constructor 
     * @version 1.0
     * @toc TRANSPORT.Command
     */ 
    constructor() {
        this._cmd = ""
        this._opts = {}
        this._flags = []
    }

	
    /** 
     * Sets the main command to send
     * @version 1.0 
     * @param {string} cmd - Sets the command which will be sent to the TeamSpeak Query
     */ 
    setCommand(cmd) {
        this._cmd = cmd.trim()
    }
	

    /** 
     *Sets the TeamSpeak Key Value Pairs
     * @version 1.0 
     * @param {object} opts - Sets the Object with the key value pairs which should get sent to the TeamSpeak Query
     */ 
    setOptions(opts) {
        this._opts = opts
    }


    /** 
     * Set TeamSpeak Flags
     * @version 1.0 
     * @param {object} flags - Sets the Flags which should get sent to the TeamSpeak Query
     */ 
    setFlags(flags) {
        this._flags = flags
    }


    /** 
     * Checks if a error has been received
     * @version 1.0 
     * @return {string} The parsed String which is readable for the TeamSpeak Query
     */ 
    build() {
        var cmd = escape(this._cmd)
        for (var k in this._opts) {
            if (!Array.isArray(this._opts[k])) 
                this._opts[k] = [this._opts[k]]
            cmd += " "+(this._opts[k].map(v => {
                return escape(k)+"="+escape(v)
            }).join("|"))
        }
        this._flags.forEach(f => {
            cmd += " "+escape(f)
        })
        return cmd
    }
}

module.exports = Command