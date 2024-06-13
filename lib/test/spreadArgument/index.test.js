"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../testUtils");
test("Should be able to map argument to this.props", () => {
    const { outputCode, expectedOutputCode } = (0, testUtils_1.run)(__dirname);
    expect(outputCode).toBe(expectedOutputCode);
});
//# sourceMappingURL=index.test.js.map