// eslint-disable-next-line @typescript-eslint/no-var-requires
import baseConfig from '../../jest.config.base.js';

export default {
  ...baseConfig,
  testMatch: ['**/web/tests/*.test.ts'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!@js-fns)'],
  moduleNameMapper: {
    '^~web/(.*)$': '<rootDir>/src/$1',
    '^@js-fns/core/(.*)$': '<rootDir>/../core/src/$1'
  }
};
