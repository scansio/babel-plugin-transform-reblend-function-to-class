"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _actions = require("./actions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SampleComponent = ({
  user
}) => {
  const count = (0, _reactRedux.useSelector)(state => state.counter);
  const dispatch = (0, _reactRedux.useDispatch)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Count: ", count.number.insert()), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => dispatch((0, _actions.increment)())
  }, "Increment"), /*#__PURE__*/_react.default.createElement("p", null, "Hello, ", user.names.first, " ", user.lastname, "!"));
};
var _default = exports.default = SampleComponent;