import baseConfig from '../../jest.config.base.js';

export default {
  ...baseConfig,
  testMatch: ['**/core/tests/*.test.ts'],
  moduleNameMapper: {
    '^@jsfns/core/(.*)$': '<rootDir>/src/$1',
  },
};
