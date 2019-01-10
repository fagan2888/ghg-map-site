import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    postcss({
      extensions: [ '.css' ],
    }),
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
    babel({
      exclude: 'node_modules/**'
    }),
		production && terser() // minify, but only in production
	]
};
