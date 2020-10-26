import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({
            include: ['src/**'],
            exclude: 'node_modules/**',
            presets: ['@babel/env'],
            babelHelpers: 'runtime'
        }),
        commonjs(),
    ]
}