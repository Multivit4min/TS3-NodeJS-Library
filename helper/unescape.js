module.exports = function unescape(s) {
  return String(s)
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