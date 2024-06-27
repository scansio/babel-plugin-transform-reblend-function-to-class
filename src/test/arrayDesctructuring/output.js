import Reblend, { useState } from "reblendjs";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    static ELEMENT_NAME = "SampleComponent";
    constructor() {
      super();
    }
    init() {
      let [count, setCount] = useState.bind(this)(0);
      setCount = this.apply(setCount, "count");
      const handleClick = () => {
        this.setCount(this.count + 1);
      };
      this.count = count;
      this.setCount = setCount;
      this.handleClick = handleClick;
      this.handleClick = this.handleClick.bind(this);
    }
    html() {
      return /*#__PURE__*/Reblend.construct.bind(this)("div", null, /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct.bind(this)("button", {
        onClick: this.handleClick
      }, "Increment"), /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;