module.exports = {
  transform: {"^.+\\.ts?$": "ts-jest"},
  testEnvironment: "node",
  testRegex: "/tests/.*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**"
  ]
}