const path = require("path")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: ["./src/index.js"],
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  resolve: {
    modules: ["./src", "node_modules"]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "./public",
        to: "./",
        ignore: ["index.html"]
      }
    ]),
    new HtmlPlugin({
      template: "./public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
