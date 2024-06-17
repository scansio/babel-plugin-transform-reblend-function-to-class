import Reblend from "reblendjs";
import useCounter from './useCounter';
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
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
      return <div>
      <p>Count: {this.count}</p>
      <button onClick={this.increment}>Increment</button>
      <p>Hello, {this.props.name}!</p>
    </div>;
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;