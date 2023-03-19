/* eslint-disable @roq/filename-suffix-mismatch */
/* eslint-disable @roq/dir-contains-index */
module.exports = {
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.e2e-spec.ts',
  ],
  bail: true,
  clearMocks: true,
  testEnvironment: "node",
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: [
    "<rootDir>",
    "./backend/src",
    "./backend/test",
  ],
  moduleDirectories: [
    "node_modules",
    "/backend/src"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-cookies)/)"
  ]
};
