import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    plugins: [typescript()],
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
