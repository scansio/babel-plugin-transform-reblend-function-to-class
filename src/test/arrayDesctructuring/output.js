import Reblend from "reblendjs";
import React, { useState } from 'react';
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    init() {
      super();
      const [count, setCount] = useState(0);
      const handleClick = () => {
        setCount(count + 1);
      };
      this.count = count;
      this.setCount = setCount;
      this.handleClick = handleClick;
    }
    html() {
      return /*#__PURE__*/Reblend.construct("div", null, /*#__PURE__*/Reblend.construct("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct("button", {
        onClick: this.handleClick
      }, "Increment"), /*#__PURE__*/Reblend.construct("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;