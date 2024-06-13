const path = require("path");
const fs = require("fs");
const babel = require("@babel/core"); // Assuming you're using Babel

function run(dir, writeOutFile = false) {
  const inputFilePath = path.resolve(dir, ".input");
  const outputFilePath = path.resolve(dir, ".output");

  // Read the input code
  const inputCode = fs.readFileSync(inputFilePath, "utf8");

  // Use Babel to transform the code (assuming it's needed)
  const outputCode = babel.transform(inputCode, {
    filename: inputFilePath,
  }).code;

  const write = () => fs.writeFileSync(outputFilePath, outputCode);
  let writing;
  let expectedOutputCode;
  try {
    // Read the expected output code, handle potential errors
    expectedOutputCode = fs.readFileSync(outputFilePath, "utf8");
  } catch (error) {
    if (writeOutFile) {
      write();
      writing = true;
      console.warn(
        `Expected output file "${outputFilePath}" not found, using transformed code.`
      );
    } else {
      throw error; // Re-throw the error if not writing the output file
    }
  }

  writeOutFile && !writing && write();

  return {
    outputCode,
    expectedOutputCode: writeOutFile ? outputCode : expectedOutputCode,
  };
}

function generateOutputFiles(filepath = __dirname) {
  if (!filepath || !fs.statSync(filepath).isDirectory()) return;
  if (fs.existsSync(path.resolve(filepath, ".input"))) {
    run(filepath, true);
  }
  for (const dir of fs.readdirSync(filepath)) {
    const fullDir = path.resolve(filepath, dir);
    generateOutputFiles(fullDir);
  }
}

module.exports = {
  run,
  generateOutputFiles,
};
