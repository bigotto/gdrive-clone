export default {
  clearMocks: true,
  restoreMocks: true,
  // collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageRports: [
    "text",
    "lcov"
  ],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ],
  collectCoverageFrom: [
    "src/**/*.js", "!src/**/index.js"
  ]
};
