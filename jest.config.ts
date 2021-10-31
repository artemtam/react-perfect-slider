import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: 'jsdom',
};

export default config;
