/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { whenDev } = require('@craco/craco');
const cracoLessPlugin = require('craco-less');

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
      ...whenDev(() => ['react-hot-loader/babel'], []),
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
    alias: {
      ...whenDev(() => ({
        'react-dom': '@hot-loader/react-dom',
      })),
    },
    plugins: [
      ...whenDev(
        () => [
          new BundleAnalyzerPlugin({
            analyzerHost: 'localhost',
            analyzerPort: '8080',
            openAnalyzer: false,
          }),
        ],
        []
      ),
    ],
    configure: (webpackConfig, { env, paths: { appIndexJs } }) => {
      if (env === 'development') {
        webpackConfig.entry = ['react-hot-loader/patch', appIndexJs];
      }
      return webpackConfig;
    },
  },
};
