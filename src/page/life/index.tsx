import { Button } from 'antd';
import { useState } from 'react';
export default function Life() {
  const [count, setCount] = useState(910);
  const handleIncrementCount = () => {
    setCount((count) => ++count);
  };
  return (
    <div>
      <div>{count}</div>
      <Button onClick={handleIncrementCount}>increment</Button>
    </div>
  );
}
