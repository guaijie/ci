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
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
      //stage1
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ],
  },
  webpack: {
    alias: {
      path: require.resolve('path-browserify'),
    },
    plugins: [
      ...whenDev(
        () => [
          new BundleAnalyzerPlugin({
            analyzerHost: 'localhost',
            analyzerPort: '9000',
            openAnalyzer: false,
          }),
        ],
        []
      ),
    ],
    configure: (webpackConfig /* , { env } */) => {
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
