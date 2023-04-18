import { sayHi } from "./controller";

test("sample test 1", () => {
  expect(sayHi()).toBe("Hello");
});
