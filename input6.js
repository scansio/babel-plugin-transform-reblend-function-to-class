import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";

const SampleComponent = ({ name }) => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>Hello, {name}!</p>
    </div>
  );
};

export default SampleComponent;
