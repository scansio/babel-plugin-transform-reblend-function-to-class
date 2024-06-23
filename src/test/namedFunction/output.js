import Reblend, { useState, useEffect } from "reblendjs";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class SampleComponent extends Reblend {
    constructor() {
      super();
    }
    init() {
      let [count, setCount] = useState.bind(this)(0);
      setCount = this.apply(setCount, "count");
      useEffect.bind(this)(() => {
        const interval = setInterval(() => {
          this.setCount(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
      this.count = count;
      this.setCount = setCount;
    }
    html() {
      return /*#__PURE__*/Reblend.construct.bind(this)("div", null, /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;