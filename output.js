import logo from "./logo.svg";
import "./App.css";
import Reblend, { useState } from "reblendjs";
class App extends Reblend {
  constructor() {
    super();
    const [state, setState] = useState(0);
    setInterval(() => {
      setState(state + 1);
    }, 1000);
    this.state = state;
    this.setState = setState;
  }
  html() {
    return /*#__PURE__*/Reblend.construct(Reblend, null, /*#__PURE__*/Reblend.construct("div", {
      className: "App"
    }, /*#__PURE__*/Reblend.construct("header", {
      className: "App-header"
    }, /*#__PURE__*/Reblend.construct("img", {
      src: logo,
      className: "App-logo",
      alt: "logo"
    }), /*#__PURE__*/Reblend.construct("p", null, "Edit ", /*#__PURE__*/Reblend.construct("code", null, "src/App.js"), " and save to reload. ", this.state), /*#__PURE__*/Reblend.construct("a", {
      className: "App-link",
      href: "https://reblendjs.org",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Learn Reblend"))));
  }
}
/* Transformed from function to class */
export default App;