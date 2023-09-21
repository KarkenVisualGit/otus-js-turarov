import conditions from "../src/conditions.js";

test("find condition by code", () => {
  const code = 1000;
  const result = conditions.find((element) => element.code === code);
  expect(result).toBeDefined();
});
