import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    plugins: [typescript(), json()],
    external: ['@lightning-builder/framework', 'uuid', 'dexie'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [dts()],
    output: [{ file: pkg.types, format: 'es' }],
  },
];
