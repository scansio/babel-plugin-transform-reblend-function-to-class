import Reblend, { useState, useEffect } from "reblendjs";
const SampleComponent = ((
  /* Transformed from function to class */
) => {
  return class SampleComponent extends Reblend {
    constructor() {
      super();
    }
    init() {
      const [count, setCount] = useState.bind(this)(0);
      this.apply(setCount, "count");
      useEffect.bind(this)(() => {
        const interval = setInterval(() => {
          setCount(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
      this.count = count;
      this.setCount = setCount;
    }
    html() {
      return <div>
      <p>Count: {this.count}</p>
      <p>Hello, {this.props.name}!</p>
    </div>;
    }
  };
})(
  /* Transformed from function to class */
);
export default SampleComponent;