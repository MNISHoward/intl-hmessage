import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/common',
      format: 'cjs'
    },
    {
      dir: 'dist/esm',
      format: 'esm'
    }
  ],
  external: [
    "intl-messageformat"
  ],
  plugins: [
    resolve({
      extensions
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**', configFile: './babel.config.js', extensions }),
    terser()
  ]
};