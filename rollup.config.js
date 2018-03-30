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
    file: 'dist/coord-parser-cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/coord-parser.mjs',
    format: 'es'
  }]
};