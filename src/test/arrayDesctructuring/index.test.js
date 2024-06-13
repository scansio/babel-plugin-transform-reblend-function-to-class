const run = require("../testUtils").run;
test("Should be able to map array desctructured declarations arrow function", () => {
  const { outputCode, expectedOutputCode } = run(__dirname);
  expect(outputCode).toBe(expectedOutputCode);
});
