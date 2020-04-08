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
                  {
                    tag: "link",
                    attribute: "href",
                    type: "src",
                    filter: (tag, attribute, attributes) => {
                      if (!/stylesheet/i.test(attributes.rel)) {
                        return false
                      }

                      if (
                        attributes.type &&
                        attributes.type.trim().toLowerCase() !== "text/css"
                      ) {
                        return false
                      }

                      return true
                    },
                  },
                ]
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)/,
        use: {
          loader: "file-loader",
          options: {
            name: "/assets/images/[name].[ext]",
          },
        },
      },
    ],
  },
}
