"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../testUtils");
test("Should transpile to Reblend class", () => {
    const { outputCode, expectedOutputCode } = (0, testUtils_1.run)(__dirname);
    expect(outputCode).toBe(expectedOutputCode);
});
//# sourceMappingURL=index.test.js.map