const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode:'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: 'majax',
    libraryTarget: 'umd',
    filename: 'mrequestqueue.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[new CleanWebpackPlugin()]
};