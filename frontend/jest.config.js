module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '^modules(.*)$': '<rootDir>/src/modules/$1',
    '^layouts(.*)$': '<rootDir>/src/layouts/$1',
    '^views(.*)$': '<rootDir>/src/views/$1',
    '^routes(.*)$': '<rootDir>/routes/$1',
    '^configuration(.*)$': '<rootDir>/src/configuration/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};
