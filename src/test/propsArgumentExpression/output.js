import Reblend from "reblendjs";
import useCounter from './useCounter';
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    static ELEMENT_NAME = "SampleComponent";
    constructor() {
      super();
    }
    init() {
      const {
        count,
        increment
      } = useCounter.bind(this)();
      this.count = count;
      this.increment = increment;
    }
    html() {
      return /*#__PURE__*/Reblend.construct.bind(this)("div", null, /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct.bind(this)("button", {
        onClick: this.increment
      }, "Increment"), /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;