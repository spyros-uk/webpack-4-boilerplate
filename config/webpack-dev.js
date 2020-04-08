const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: ["webpack-hot-middleware/client?reload=true", "./src/index.js"],
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  devServer: {
    hot: true,
    inline: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    contentBase: "public",
    stats: {
      colors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attributes: {
                list: [
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                  {
                    tag: "img",
                    attribute: "srcset",
                    type: "srcset",
                  },
                  {
                    tag: "img",
                    attribute: "data-src",
                    type: "src",
                  },
                  {
                    tag: "img",
                    attribute: "data-srcset",
                    type: "srcset",
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "./public",
        to: "./",
        ignore: ["index.html"],
      },
    ]),
    new htmlWebpackPlugin({
      inject: false,
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
