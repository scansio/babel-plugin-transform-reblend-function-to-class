import Reblend from "reblendjs";
import React, { useState, useEffect } from "react";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class SampleComponent extends Reblend {
    init() {
      super();
      const [count, setCount] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setCount(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
      this.count = count;
      this.setCount = setCount;
    }
    html() {
      return /*#__PURE__*/Reblend.construct("div", null, /*#__PURE__*/Reblend.construct("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct("p", null, "Hello, ", this.props.name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;