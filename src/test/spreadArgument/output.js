import Reblend from "reblendjs";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    constructor() {
      super();
    }
    init() {
      const count = useSelector.bind(this)(state => state.counter);
      const dispatch = useDispatch.bind(this)();
      this.count = count;
      this.dispatch = dispatch;
    }
    html() {
      return /*#__PURE__*/Reblend.construct.bind(this)("div", null, /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Count: ", this.count.number.insert()), /*#__PURE__*/Reblend.construct.bind(this)("button", {
        onClick: () => this.dispatch(increment())
      }, "Increment"), /*#__PURE__*/Reblend.construct.bind(this)("p", null, "Hello, ", this.props.user.names.first, " ", this.props.user.lastname, "!"));
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;