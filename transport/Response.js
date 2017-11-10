/** 
 * @file Response.js 
 * @copyright David Kartnaller 2017 
 * @license GNU GPLv3 
 * @author David Kartnaller <david.kartnaller@gmail.com> 
 */ 
const keytypes = require(__dirname+"/../helper/keytypes.js")
const unescape = require(__dirname+"/../helper/unescape.js")


/**
 * Response Handling Class
 * @class
 */
class Response {

    /** 
     * Set the Line which has been received from the TeamSpeak Query
     * @version 1.0 
     * @param {string} line - The Line which has been received from the TeamSpeak Query
     */ 
    setLine(line) {
        this._response = Response.parse(line)
    }

	
    /** 
     * Set the error line which has been received from the TeamSpeak Query
     * @version 1.0 
     * @param {string} error - The error Line which has been received from the TeamSpeak Query
     */ 
    finalize(error) {
        this._error = Response.parse(error)
    }

	
    /** 
     * Checks if a error has been received
     * @version 1.0 
     * @return {boolean} Returns true when a error has been received
     */ 
    hasError() {
        return Boolean(this._error) && this._error.id > 0
    }

	
    /** 
     * Get the Parsed Error Object which has been received from the TeamSpeak Query
     * @version 1.0 
     * @return {object} Returns the Parsed Error Object
     */ 
    getError() {
        var err = {
            id: this._error.id,
            msg: this._error.msg
        }
        if (this._error.extra_msg)
            err. extra_msg = this._error.extra_msg
        return err
    }

	
    /** 
     * Get the Parsed Response Object which has been received from the TeamSpeak Query
     * @version 1.0 
     * @return {object} Returns the Parsed Response Object
     */ 
    getResponse() {
        return this._response || null
    }

	
    /** 
     * Parses a TeamSpeak Response Line
     * @version 1.0
	 * @static
     * @param {string} data - The Line which has been received
     * @return {object} Returns the parsed Data
     */ 
    static parse(data = "") {
        var res = data.split("|").map(entry => {
            var res = {}
            entry.split(" ").map(str => {
                if (str.indexOf("=") >= 0) {
                    let k = unescape(str.substr(0, str.indexOf("=")))
                    res[k] = Response.parseValue(k, unescape(str.substr(str.indexOf("=") + 1)))
                } else {
                    res[str] = undefined
                }
            })
            return res
        })
        return (res.length == 1) ? res[0] : res
        
    }

    static parseValue(k, v) {
        switch(keytypes[k]) {
            case "ArrayOfInt": return v.split(",").map(i => parseFloat(i))
            case "ArrayOfString": return v.split(",").map(i => String(i))
            case Boolean: return Boolean(v)
            case Number: return parseFloat(v)
            case String:
            default: return String(v)
        }
    }
}

module.exports = Response