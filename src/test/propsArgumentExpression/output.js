"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _useCounter = _interopRequireDefault(require("./useCounter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SampleComponent = function (props) {
  const {
    count,
    increment
  } = (0, _useCounter.default)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Count: ", count), /*#__PURE__*/_react.default.createElement("button", {
    onClick: increment
  }, "Increment"), /*#__PURE__*/_react.default.createElement("p", null, "Hello, ", props.name, "!"));
};
var _default = exports.default = SampleComponent;