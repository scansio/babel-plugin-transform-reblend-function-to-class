const run = require("../testUtils").run;
test("Should be able to map props argument to this.props in Function Expression", () => {
  const { outputCode, expectedOutputCode } = run(__dirname);
  expect(outputCode).toBe(expectedOutputCode);
});
