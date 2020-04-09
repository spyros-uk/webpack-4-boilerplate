import { getMesssage } from "./example"

test("returns test example", () => {
  expect(getMesssage()).toEqual("test example")
})