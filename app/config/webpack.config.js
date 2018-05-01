const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { NamedModulesPlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');

module.exports = {
  entry: [
  'webpack-hot-middleware/client',
  './app/client/index.js'
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    inline: true,
    open: true,
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Testing',
    }),
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..')}),
    new VueLoaderPlugin(),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ],
};
