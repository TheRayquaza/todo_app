const dotenv = require('dotenv');
dotenv.config({path: '.env'});

export default {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleDirectories: [
    "node_modules"
  ],
  testMatch: [
    "**/*.test.ts"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose : true
};