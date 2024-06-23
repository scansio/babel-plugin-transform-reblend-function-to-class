import logo from "./logo.svg";
import "./App.css";
import Reblend, { useState } from "reblendjs";
class App extends Reblend {
  constructor() {
    super();
  }
  init() {
    let [state, setState] = useState.bind(this)(0);
    setState = this.apply(setState, "state");
    setInterval(() => {
      this.setState(this.state + 1);
    }, 1000);
    function ts() {
      console.log(this);
    }
    async function ats() {
      console.log(this);
    }
    const tss = () => console.log(this);
    const atss = async () => console.log(this);
    this.state = state;
    this.setState = setState;
    this.ts = ts;
    this.ats = ats;
    this.tss = tss;
    this.atss = atss;
  }
  html() {
    return /*#__PURE__*/Reblend.construct.bind(this)(Reblend.bind(this), null, /*#__PURE__*/Reblend.construct.bind(this)("div", {
      className: "App"
    }, /*#__PURE__*/Reblend.construct.bind(this)("header", {
      className: "App-header"
    }, /*#__PURE__*/Reblend.construct.bind(this)("img", {
      src: logo,
      className: "App-logo",
      alt: "logo"
    }), /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Edit ", /*#__PURE__*/Reblend.construct.bind(this)("code", null, "src/App.js"), " and save to reload. ", this.state), /*#__PURE__*/Reblend.construct.bind(this)("a", {
      onClick: this.atss,
      className: "App-link",
      href: "https://reblendjs.org",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Learn Reblend"))));
  }
}
/* Transformed from function to class */
export default App;