const path = require('path');

const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, '../src');
const modules = [srcPath, 'node_modules'];

module.exports = {
  stories: ['../**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-rtl/register'
  ],
  // adjust the webpack config
  webpackFinal: async (config) => {
    const cssRegex = /\.css$/;

    // grab CSS rule
    const rule = config.module.rules.find(rule => rule.test.toString() === cssRegex.toString());

    // remove sideEffects
    rule.sideEffects = false;
    // adjust loaders for the rule
    rule.use = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          fallback: require.resolve('style-loader'),
        }
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: {
            localIdentName: '[local]__[folder]__[hash:base64:5]'
          },
          importLoaders: 1,
          sourceMap: true,
          localsConvention: 'camelCase'
        },
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: true,
        },
      },
    ];

    // exclude node_modules and global
    rule.exclude = [
      /node_modules/,
      /global\.css/,
      /flexboxgrid/
    ],

      // add new rule for node_modules and global.css files
      config.module.rules.push({
        test: cssRegex,
        include: [
          /node_modules/,
          /flexboxgrid/,
          /\.global\.css/
        ],
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')]
      })

    // add MiniCssExtractPlugin to plugins
    config.plugins.push(new MiniCssExtractPlugin())

    // Add resolve settings
    config.resolve = {
      modules
    };

    // feed storybook the modified config object
    return config;
  },
};