/* eslint-disable @typescript-eslint/no-var-requires */
const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');
const path = require('path');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const WebWorkerTemplatePlugin = require('webpack/lib/webworker/WebWorkerTemplatePlugin');
const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');

const useWebpack5 = require('webpack/package.json').version.startsWith('5.');

let EntryPlugin;

if (useWebpack5) {
  EntryPlugin = require('webpack/lib/EntryPlugin');
} else {
  EntryPlugin = require('webpack/lib/SingleEntryPlugin');
}

function getDefaultFilename(filename) {
  if (typeof filename === 'function') {
    return filename;
  }

  return filename.replace(/\.([a-z]+)(\?.+)?$/i, '.sw.$1$2');
}

function getDefaultChunkFilename(chunkFilename) {
  return chunkFilename.replace(/\.([a-z]+)(\?.+)?$/i, '.sw.$1$2');
}

exports.default = loader;
exports.pitch = pitch;

/* eslint-disable @typescript-eslint/no-empty-function */
function loader(s) {
  console.log(s);
}

function pitch(request) {
  this.cacheable(false);

  const callback = this.async();

  const options = getOptions(this);

  const workerContext = {};
  const compilerOptions = this._compiler.options || {};
  const filename = options.filename
    ? options.filename
    : getDefaultFilename(compilerOptions.output.filename);
  const chunkFilename = options.chunkFilename
    ? options.chunkFilename
    : getDefaultChunkFilename(compilerOptions.output.chunkFilename);
  const publicPath = options.publicPath
    ? options.publicPath
    : compilerOptions.output.publicPath;

  workerContext.options = {
    filename,
    chunkFilename,
    publicPath,
    globalObject: 'self',
  };

  workerContext.compiler = this._compilation.createChildCompiler(
    `sw-loader ${request}`,
    workerContext.options
  );

  // new WebWorkerTemplatePlugin().apply(workerContext.compiler);

  // if (this.target !== 'webworker' && this.target !== 'web') {
  //   new NodeTargetPlugin().apply(workerContext.compiler);
  // }

  // if (compilerOptions.externals) {
  //   new ExternalsPlugin(
  //     getExternalsType(compilerOptions),
  //     compilerOptions.externals
  //   ).apply(workerContext.compiler);
  // }

  new EntryPlugin(
    this.context,
    `!${request}`,
    path.parse(this.resourcePath).name
  ).apply(workerContext.compiler);

  workerContext.request = request;

  workerContext.compiler.runAsChild((error, entries, compilation) => {
    if (error) {
      return callback(error);
    }
    if (entries[0]) {
      // eslint-disable-next-line no-param-reassign, prefer-destructuring
      const workerFilename = entries[0].files[0];
      // let workerSource = compilation.assets[workerFilename].source();
      // console.log(workerSource);

      const workerCode = `export default function serviceWorker(options) {
        return navigator.serviceWorker.register(__webpack_public_path__ + ${JSON.stringify(
          workerFilename
        )}, options)
      }`;

      // if (options.inline === 'no-fallback') {
      //   // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      //   delete loaderContext._compilation.assets[workerFilename]; // TODO improve it, we should store generated source maps files for file in `assetInfo`
      //   // eslint-disable-next-line no-underscore-dangle

      //   if (loaderContext._compilation.assets[`${workerFilename}.map`]) {
      //     // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      //     delete loaderContext._compilation.assets[`${workerFilename}.map`];
      //   } // Remove `/* sourceMappingURL=url */` comment

      //   workerSource = workerSource.replace(_utils.sourceMappingURLRegex, ''); // Remove `//# sourceURL=webpack-internal` comment

      //   workerSource = workerSource.replace(_utils.sourceURLWebpackRegex, '');
      // }

      // const workerCode = workerGenerator(
      //   loaderContext,
      //   workerFilename,
      //   workerSource,
      //   options
      // );
      return callback(null, workerCode);
    }

    return callback(
      new Error(
        `Failed to compile web worker "${workerContext.request}" request`
      )
    );
  });
}
