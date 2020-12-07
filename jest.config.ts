// eslint-disable-next-line node/no-extraneous-import
import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;
