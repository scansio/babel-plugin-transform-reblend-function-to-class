import logo from "./logo.svg";
import "./App.css";
import Reblend, { useState } from "reblendjs";
class App extends Reblend {
  init() {
    super();
    const [state, setState] = useState.bind(this)(0);
    this.apply(setState, "state");
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
    return <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state}
          </p>
          <a onClick={this.atss} className="App-link" href="https://reblendjs.org" target="_blank" rel="noopener noreferrer">
            Learn Reblend
          </a>
        </header>
      </div>
    </>;
  }
}
/* Transformed from function to class */
export default App;