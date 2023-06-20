export default {
  preset: 'ts-jest/presets/default-esm',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/*.ts'],
  coverageDirectory: '<rootDir>/coverage/',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
};
