import express from "express"
import webpack from "webpack"
import webpackConfig from "../config/webpack.dev"
import webpackDevMiddleware from "webpack-dev-middleware"

const server = express()
const compiler = webpack(webpackConfig)
const middlewareArgs = [compiler, webpackConfig.devServer]
const webpackMiddlewareDev = webpackDevMiddleware(...middlewareArgs)
const webpackHMRMiddleware = require("webpack-hot-middleware")(
  ...middlewareArgs
)
const expressStaticMiddleware = express.static("dist")
const PORT = 8080

server.use(webpackMiddlewareDev)
server.use(webpackHMRMiddleware)
server.use(expressStaticMiddleware)

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
