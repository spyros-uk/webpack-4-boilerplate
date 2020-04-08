require("./main.css")
require("../public/index.html")
import { foo } from "./example"
;(async () => {
  console.log(await Promise.resolve("main"))
  foo()
})()
