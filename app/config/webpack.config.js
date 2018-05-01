const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const { VueLoaderPlugin } = require('vue-loader');
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: './app/client/index.js',
  watch: true,
  watchOptions: {
    poll: 1000,
  },
  devServer: {
    contentBase: '../dist',
    hot: true,
    inline: true,
    open: true,
  },
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
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..')}),
    new HtmlWebpackPlugin({
      title: 'Testing',
    }),
    // new VueLoaderPlugin(),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
  ],
};
