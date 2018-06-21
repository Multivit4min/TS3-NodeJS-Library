const fs = require("fs")
const path = require("path")

class Scanner {
  constructor(folders) {
    this.folders = Array.isArray(folders) ? folders : [folders]
    this.files = []
  }
  
  scanFor(regex) {
    return new Promise((fulfill, reject) => {
      if (!this.ready) return reject(new Error("Scanner not ready"))
      var regex = Array.isArray(regex) ? regex : [regex]
      this.folders.map(folder => this.scanFolder(folder, res))
    })
  }
  
  scanFolder(folder) {
    return new Promise((fulfill, reject) => {
      fs.readdir(folder, (err, files) => {
        Promise.all(files.map(file => this.handleFile(folder, file)))
          .then(res => {
            var files = []
            res.forEach(r => files.push(typeof r === "string" ? r : ...r))
            fulfill(res)
          })
          .catch(reject)
      })
    })
  }
  
  handleFile(folder, filename) {
    return new Promise((fulfill, reject) => {
      fs.stat(path.join(folder, filename), (err, stat) => {
        if (stat.isSymbolicLink()) return fulfill([])
        if (stat.isFile() && path.match(regex)) return fulfill(path.join(folder, filename))
        if (stat.isDirectory()) 
          return this.scanFolder(path.join(folder, filename)).then(fulfill).catch(reject) 
        return fulfill([])
      })
    })
  }
  
}


module.exports = {
  createScan: (folders, regex) => new Scanner(folders, regex)
}