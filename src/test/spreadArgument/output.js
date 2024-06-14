import Reblend from "reblendjs";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    init() {
      super();
      const count = useSelector(state => state.counter);
      const dispatch = useDispatch();
      this.count = count;
      this.dispatch = dispatch;
    }
    html() {
      return /*#__PURE__*/Reblend.construct("div", null, /*#__PURE__*/Reblend.construct("p", null, "Count: ", this.count.number.insert()), /*#__PURE__*/Reblend.construct("button", {
        onClick: () => this.dispatch(increment())
      }, "Increment"), /*#__PURE__*/Reblend.construct("p", null, "Hello, ", this.props.user.names.first, " ", this.props.user.lastname, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;