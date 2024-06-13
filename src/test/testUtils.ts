import * as path from "path";
import * as fs from "fs";
import { transformSync } from "@babel/core"; // Assuming you're using Babel

interface TransformResult {
  outputCode: string;
  expectedOutputCode: string;
}

function run(dir: string, writeOutFile = false): TransformResult {
  const inputFilePath = path.resolve(dir, "input.ts");
  const outputFilePath = path.resolve(dir, "output.js");

  // Read the input code
  const inputCode = fs.readFileSync(inputFilePath, "utf8");

  // Use Babel to transform the code (assuming it's needed)
  const outputCode = transformSync(inputCode, {
    filename: inputFilePath,
  })!.code; // Non-null assertion for transformed code

  const write = () => fs.writeFileSync(outputFilePath, `${outputCode}`);
  let writing: boolean = false;
  let expectedOutputCode: string = "";
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
    outputCode: outputCode as any,
    expectedOutputCode: (writeOutFile ? outputCode : expectedOutputCode) as any,
  };
}

function generateOutputFiles(filepath = __dirname): void {
  if (
    !filepath ||
    !fs.existsSync(filepath) ||
    !fs.statSync(filepath).isDirectory()
  ) {
    return;
  }
  if (fs.existsSync(path.resolve(filepath, "input.ts"))) {
    run(filepath, true);
  }
  for (const dir of fs.readdirSync(filepath)) {
    const fullDir = path.resolve(filepath, dir);
    generateOutputFiles(fullDir);
  }
}

export { run, generateOutputFiles };