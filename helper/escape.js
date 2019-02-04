module.exports = function escape(s) {
  return String(s)
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