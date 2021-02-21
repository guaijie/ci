// const {
//   override,
//   fixBabelImports,
//   addWebpackPlugin,
//   addDecoratorsLegacy,
//   addBabelPlugins,
//   useEslintRc,
//   addWebpackResolve,
//   addLessLoader
// } = require('customize-cra');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const { whenDev, addPlugins} = require('@craco/craco')

module.exports = {
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
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
      '@babel/plugin-proposal-json-strings'
    ],
  },
  webpack: {
    plugins: [
      whenDev(()=> new BundleAnalyzerPlugin({
        analyzerHost: 'localhost',
        analyzerPort: '8080',
        openAnalyzer: false
      }))
    ],
  }
}

// module.exports = override(
//   addDecoratorsLegacy(),
//   fixBabelImports('antd', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true
//   }),
//   process.env.NODE_ENV === 'development' &&
//     addWebpackPlugin(
//       new BundleAnalyzerPlugin({
//         analyzerHost: 'localhost',
//         analyzerPort: '8080',
//         openAnalyzer: false
//       })
//     ),
//   process.env.NODE_ENV === 'development' &&
//     addWebpackResolve({
//       alias: {
//         'react-dom': '@hot-loader/react-dom'
//       }
//     }),
//   addLessLoader({
//     javascriptEnabled: true
//   }),
//   // stage0
//   addBabelPlugins('@babel/plugin-proposal-function-bind'),
//   // stage1
//   addBabelPlugins(
//     '@babel/plugin-proposal-logical-assignment-operators',
//     ['@babel/plugin-proposal-optional-chaining', { loose: false }],
//     ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
//     ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }]
//   ),
//   // stage2
//   addBabelPlugins(
//     '@babel/plugin-proposal-function-sent',
//     '@babel/plugin-proposal-numeric-separator',
//     '@babel/plugin-proposal-throw-expressions'
//   ),
//   // stage3
//   addBabelPlugins(
//     '@babel/plugin-proposal-class-properties',
//     '@babel/plugin-proposal-json-strings'
//   ),
//   process.env.NODE_ENV === 'development' &&
//     addBabelPlugins(['react-hot-loader/babel']),

//   // useEslintRc()
// );
