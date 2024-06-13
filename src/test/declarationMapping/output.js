"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _logo = _interopRequireDefault(require("./logo.svg"));
require("./App.css");
var _reblendjs = _interopRequireWildcard(require("reblendjs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  const [state, setState] = (0, _reblendjs.useState)(0);
  setInterval(() => {
    setState(state + 1);
  }, 1000);
  function ts() {
    console.log(this);
  }
  async function ats() {
    console.log(this);
  }
  const tss = () => console.log(this);
  const atss = async () => console.log(this);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/React.createElement("img", {
    src: _logo.default,
    className: "App-logo",
    alt: "logo"
  }), /*#__PURE__*/React.createElement("p", null, "Edit ", /*#__PURE__*/React.createElement("code", null, "src/App.js"), " and save to reload. ", state), /*#__PURE__*/React.createElement("a", {
    onClick: atss,
    className: "App-link",
    href: "https://reblendjs.org",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn Reblend"))));
}
var _default = exports.default = App;