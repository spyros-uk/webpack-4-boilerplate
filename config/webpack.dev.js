const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = merge.smart(common, {
  mode: "development",
  devServer: {
    hot: true,
    inline: true,
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: "public",
    stats: {
      colors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new BundleAnalyzer({
      generateStatsFile: true
    })
  ]
})
