import type {Config} from '@jest/types';
import {defaults} from 'jest-config';

const config: Config.InitialOptions = {
  // verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  globalSetup: './tests/globalSetup.ts',
  globalTeardown: './tests/globalTeardown.ts',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;
