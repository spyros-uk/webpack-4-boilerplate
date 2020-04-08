const path = require("path")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  devServer: {
    contentBase: "public",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].html",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
}
