import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";
const SampleComponent = ({
  user
}) => {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return <div>
      <p>Count: {count.number.insert()}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>
        Hello, {user.names.first} {user.lastname}!
      </p>
    </div>;
};
export default SampleComponent;