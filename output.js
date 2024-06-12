import Reblend from "reblendjs";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    constructor() {
      super();
      const count = useSelector(state => state.counter);
      const dispatch = useDispatch();
      this.count = count;
      this.dispatch = dispatch;
    }
    html() {
      return /*#__PURE__*/Reblend.construct("div", null, /*#__PURE__*/Reblend.construct("p", null, "Count: ", this.count), /*#__PURE__*/Reblend.construct("button", {
        onClick: () => this.dispatch(increment())
      }, "Increment"), /*#__PURE__*/Reblend.construct("p", null, "Hello, ", name, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;