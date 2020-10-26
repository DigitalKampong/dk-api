import type {Config} from '@jest/types';
import {defaults} from 'jest-config';

const config: Config.InitialOptions = {
  // verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  globalSetup: './test/setup.ts',
  globalTeardown: './test/teardown.ts',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};

export default config;

