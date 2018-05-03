const {
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: ['webpack-hot-middleware/client', './app/client/index.js'],
  plugins: [
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
});
