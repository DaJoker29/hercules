const path = require('path');
const {
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: ['webpack-hot-middleware/client', './app/client/index.js'],
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    inline: true,
    open: true
  },
  plugins: [
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
});
