import express from "express"
import webpack from "webpack"
import webpackDevConfig from "../config/webpack.dev"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import expressStaticGzip from "express-static-gzip"

const isProd = process.env.NODE_ENV === "production"
const server = express()

if (!isProd) {
  webpackDevConfig.entry.push("webpack-hot-middleware/client?reload=true")
  const withMiddleware = (compiler, devServerConfig) => (middleware) =>
    middleware(compiler, devServerConfig)
  const useMiddleware = withMiddleware(
    webpack(webpackDevConfig),
    webpackDevConfig.devServer
  )

  const webpackMiddlewareDev = useMiddleware(webpackDevMiddleware)
  server.use(webpackMiddlewareDev)

  const webpackHMRMiddleware = useMiddleware(webpackHotMiddleware)
  server.use(webpackHMRMiddleware)

  const expressStaticMiddleware = express.static("dist")
  server.use(expressStaticMiddleware)
}

server.use(
  expressStaticGzip("dist", {
    enableBrotli: true,
    orderPreference: ["br", "gz"]
  })
)

const PORT = process.env.port || 3000

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
