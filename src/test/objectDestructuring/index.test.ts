const run = require("../testUtils").run;
test("Should be able to map object destructured declarations to the class", () => {
  const { outputCode, expectedOutputCode } = run(__dirname);
  expect(outputCode).toBe(expectedOutputCode);
});
