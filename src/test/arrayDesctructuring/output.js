import Reblend, { useState } from "reblendjs";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class extends Reblend {
    init() {
      super();
      const [count, setCount] = useState.bind(this)(0);
      this.apply(setCount, "count");
      const handleClick = () => {
        setCount(count + 1);
      };
      this.count = count;
      this.setCount = setCount;
      this.handleClick = handleClick;
    }
    html() {
      return <div>
      <p>Count: {this.count}</p>
      <button onClick={this.handleClick}>Increment</button>
      <p>Hello, {this.props.name}!</p>
    </div>;
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;