"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOutputFiles = exports.run = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const core_1 = require("@babel/core"); // Assuming you're using Babel
function run(dir, writeOutFile = false) {
    const inputFilePath = path.resolve(dir, "input.js").replace("/lib/", "/src/");
    const outputFilePath = path
        .resolve(dir, "output.js")
        .replace("/lib/", "/src/");
    // Read the input code
    const inputCode = fs.readFileSync(inputFilePath, "utf8");
    // Use Babel to transform the code (assuming it's needed)
    const config = {
        filename: inputFilePath,
    };
    const outputCode = (0, core_1.transformSync)(inputCode, config).code;
    const write = () => fs.writeFileSync(outputFilePath, `${outputCode}`);
    let writing = false;
    let expectedOutputCode = "";
    try {
        // Read the expected output code, handle potential errors
        expectedOutputCode = fs.readFileSync(outputFilePath, "utf8");
    }
    catch (error) {
        if (writeOutFile) {
            write();
            writing = true;
            console.warn(`Expected output file "${outputFilePath}" not found, using transformed code.`);
        }
        else {
            throw error; // Re-throw the error if not writing the output file
        }
    }
    writeOutFile && !writing && write();
    return {
        outputCode: outputCode,
        expectedOutputCode: (writeOutFile ? outputCode : expectedOutputCode),
    };
}
exports.run = run;
function generateOutputFiles(filepath = "") {
    if (!filepath ||
        !fs.existsSync(filepath) ||
        !fs.statSync(filepath).isDirectory()) {
        return;
    }
    if (fs.existsSync(path.resolve(filepath, "input.js"))) {
        run(filepath, true);
    }
    for (const dir of fs.readdirSync(filepath)) {
        const fullDir = path.resolve(filepath, dir);
        generateOutputFiles(fullDir);
    }
}
exports.generateOutputFiles = generateOutputFiles;
//# sourceMappingURL=testUtils.js.map