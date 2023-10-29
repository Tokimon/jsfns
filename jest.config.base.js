export default {
  preset: 'ts-jest/presets/default-esm',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/*.ts'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['json-summary'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
};
