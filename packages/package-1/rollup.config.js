import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import postCssNormalizer from 'postcss-normalize';
import postCssModuleValues from 'postcss-modules-values';
import json from '@rollup/plugin-json';

const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const modules = [srcPath, 'node_modules'];

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs'
    },
    plugins: [
        image(),
        json(),
        postcss({
            extract: false,
            modules: true,
            extensions: ['.css'],
            plugins: [
                postCssNormalizer(),
                postCssModuleValues()
            ]
        }),
        babel({
            include: [
                'src/**',
                'node_modules/@brainhubeu/react-carousel',
                'node_modules/react-loading-skeleton',
                'node_modules/react-datepicker'
            ],
            exclude: ['node_modules/**', 'src/mocks/**', 'src/public/**'],
            presets: ['@babel/env', '@babel/preset-react'],
            babelHelpers: 'runtime'
        }),
        resolve({
            customResolveOptions: {
                moduleDirectory: modules
            }
        }),
        commonjs({
            namedExports: {
                '@brainhubeu/react-carousel': ['Dots'],
            }
        }),
    ],
    external: [
        'react',
        'react-dom',
        '@babel/runtime/helpers/toConsumableArray',
        '@babel/runtime/helpers/slicedToArray',
        '@babel/runtime/helpers/extends',
        '@babel/runtime/helpers/objectWithoutProperties',
        '@babel/runtime/helpers/asyncToGenerator',
        '@babel/runtime/helpers/defineProperty',
        '@babel/runtime/helpers/typeof',
        '@babel/runtime/regenerator',
    ]
}