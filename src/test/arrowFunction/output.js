import logo from "./logo.svg";
import "./App.css";
import Reblend, { useState } from "reblendjs";
const App = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    init() {
      super();
      const [state, setState] = useState.bind(this)(0);
      this.apply(setState, "state");
      setInterval(() => {
        setState(state + 1);
      }, 1000);
      this.state = state;
      this.setState = setState;
    }
    html() {
      return <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state}
          </p>
          <a className="App-link" href="https://reblendjs.org" target="_blank" rel="noopener noreferrer">
            Learn Reblend
          </a>
        </header>
      </div>
    </>;
    }
  };
})(
  /* Transformed from function to class */
);
export default App;