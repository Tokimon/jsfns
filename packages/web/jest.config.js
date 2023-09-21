import baseConfig from '../../jest.config.base.js';

export default {
  ...baseConfig,
  testMatch: ['**/web/tests/*.test.ts'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@jsfns/web/(.*)$': '<rootDir>/src/$1',
    '^@jsfns/core/(.*)$': '<rootDir>/../core/src/$1',
  },
  collectCoverageFrom: ['src/*.ts', '!src/types.d.ts'],
};
