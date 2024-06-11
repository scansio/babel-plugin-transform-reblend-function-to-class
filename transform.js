const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const inputFilePath = path.join(__dirname, "input.js");
const outputFilePath = path.join(__dirname, "output.js");

const inputCode = fs.readFileSync(inputFilePath, "utf8");

const outputCode = babel.transform(inputCode, {
  filename: inputFilePath,
  presets: [
    //path.resolve("node_modules", "@babel/preset-env"),
    path.resolve("node_modules", "@babel/preset-typescript"),
    path.resolve("node_modules", "babel-preset-reblend"),
  ],
  plugins: [path.resolve("./babel-plugin-transform-functional-to-class")],
}).code;

fs.writeFileSync(outputFilePath, outputCode);
