import typescript from 'rollup-plugin-typescript2';
import minify from 'rollup-plugin-babel-minify';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';

export default {
  input: 'lib/index.ts',
  plugins: [
    typescript(), 
    minify({comments: false, sourceMap: false}),
    filesize(),
    progress()
  ],
  output: [{
    file: 'dist/coordinates-parser-iife.js',
    format: 'iife',
    name: 'coordinatesParser'
  }, {
    file: 'dist/coordinates-parser-cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/coordinates-parser.mjs',
    format: 'es'
  }]
};