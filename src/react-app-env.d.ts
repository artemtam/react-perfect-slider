/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />s

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}
