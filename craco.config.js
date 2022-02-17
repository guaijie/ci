/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { whenDev } = require('@craco/craco');
const cracoLessPlugin = require('craco-less');
const { resolve } = require('path');

module.exports = {
  plugins: [
    {
      plugin: cracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      // ...whenDev(() => ['react-hot-loader/babel'], []),
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      // stage0
      '@babel/plugin-proposal-function-bind',
      //stage1
      '@babel/plugin-proposal-logical-assignment-operators',
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      //stage2
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      //stage3
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
    ],
  },
  webpack: {
    // alias: {
    //   ...whenDev(() => ({
    //     'react-dom': '@hot-loader/react-dom',
    //   })),
    // },
    plugins: [
      ...whenDev(
        () => [
          // new BundleAnalyzerPlugin({
          //   analyzerHost: 'localhost',
          //   analyzerPort: '8080',
          //   openAnalyzer: false,
          // }),
        ],
        []
      ),
    ],
    module: {
      rules: [],
    },
    configure: (webpackConfig /* , { env } */) => {
      // if (env === 'development') {
      //   webpackConfig.entry = ['react-hot-loader/patch', appIndexJs];
      // }
      const options = webpackConfig.module.rules[1].oneOf[2].options;
      webpackConfig.module.rules[1].oneOf.splice(
        2,
        0,
        {
          test: /\.worker\.(js|mjs|jsx|ts|tsx)$/,
          use: [
            { loader: require.resolve('worker-loader') },
            {
              loader: require.resolve('babel-loader'),
              options,
            },
          ],
        },
        {
          test: /\.?sw\.(js|mjs|jsx|ts|tsx)$/,
          use: [
            { loader: require.resolve('./loader/sw-loader') },
            {
              loader: require.resolve('babel-loader'),
              options,
            },
          ],
        }
      );
      return webpackConfig;
    },
  },
  devServer(devServerConfig) {
    // const base = devServerConfig.contentBase;
    // devServerConfig.watchFiles = [
    //   'src/**/*',
    //   'public/**/*',
    //   'config/**/*',
    //   'scripts/**/*',
    // ];
    // devServerConfig.contentBase = [
    //   base,
    //   resolve(__dirname, './src/staticServices'),
    // ];
    return devServerConfig;
  },
};
