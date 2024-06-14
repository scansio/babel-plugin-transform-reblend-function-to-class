import logo from "./logo.svg";
import "./App.css";
import Reblend, { useState } from "reblendjs";
class App extends Reblend {
  init() {
    super();
    const [state, setState] = useState(0);
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
    this.state = state;
    this.setState = setState;
    this.ts = ts;
    this.ats = ats;
    this.tss = tss;
    this.atss = atss;
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