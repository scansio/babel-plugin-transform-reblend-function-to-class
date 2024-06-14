import Reblend from "reblendjs";
import React from 'react';
import useCounter from './useCounter';
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    init() {
      super();
      const {
        count,
        increment
      } = useCounter();
      this.count = count;
      this.increment = increment;
    }
    html() {
      return /*#__PURE__*/Reblend.construct("div", null, /*#__PURE__*/Reblend.construct("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct("button", {
        onClick: this.increment
      }, "Increment"), /*#__PURE__*/Reblend.construct("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;