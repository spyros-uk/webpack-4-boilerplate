require("./main.css")
require("../public/index.html")

const foo = async () => {
  const bar = Promise.resolve("baz")
  console.log(await bar);
}

foo()