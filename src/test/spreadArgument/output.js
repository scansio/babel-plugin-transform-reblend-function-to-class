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
      return <div>
      <p>Count: {this.count.number.insert()}</p>
      <button onClick={() => this.dispatch(increment())}>Increment</button>
      <p>
        Hello, {this.props.user.names.first} {this.props.user.lastname}!
      </p>
    </div>;
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;