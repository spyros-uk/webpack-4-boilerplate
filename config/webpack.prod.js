const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const BrotliPlugin = require("brotli-webpack-plugin")
const UglifyjsPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge.smart(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /src/,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
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
                    type: "src"
                  },
                  {
                    tag: "img",
                    attribute: "srcset",
                    type: "srcset"
                  },
                  {
                    tag: "img",
                    attribute: "data-src",
                    type: "src"
                  },
                  {
                    tag: "img",
                    attribute: "data-srcset",
                    type: "srcset"
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[ext]"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyjsPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ]
})
