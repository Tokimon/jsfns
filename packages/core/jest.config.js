import baseConfig from '../../jest.config.base.js';

export default {
  ...baseConfig,
  testMatch: ['**/core/tests/*.test.ts'],
  moduleNameMapper: {
    '^~core/(.*)$': '<rootDir>/src/$1',
  },
};
