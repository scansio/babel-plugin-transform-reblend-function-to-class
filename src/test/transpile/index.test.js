const run = require("../testUtils").run;
test("Should transpile to Reblend class", () => {
  const { outputCode, expectedOutputCode } = run(__dirname);
  expect(outputCode).toBe(expectedOutputCode);
});
