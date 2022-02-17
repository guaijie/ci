import { Button, Space } from 'antd';
import { useState, useRef, useReducer, Reducer } from 'react';

const reducer: Reducer<{ count: number }, { type: string }> = (
  state,
  { type }
) => {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
export default function Life() {
  const [count, setCount] = useState(910);
  const numRef = useRef<number>(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const handleIncrementCount = () => {
    setCount((count) => ++count);
  };
  return (
    <div>
      <div>
        <div>{count}</div>
        <Button onClick={handleIncrementCount}>increment</Button>
      </div>
      <div>
        <div>{numRef.current}</div>
        <Button
          onClick={() => {
            numRef.current = numRef.current + 1;
          }}
        >
          increment
        </Button>
      </div>
      <div>
        <div>{state.count}</div>
        <Space>
          <Button onClick={() => dispatch({ type: 'INCREMENT' })}>
            increment
          </Button>
          <Button onClick={() => dispatch({ type: 'DECREMENT' })}>
            decrement
          </Button>
        </Space>
      </div>
    </div>
  );
}
