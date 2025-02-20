import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // https://stackoverflow.com/questions/77399773/cannot-find-module-msw-node-from
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
