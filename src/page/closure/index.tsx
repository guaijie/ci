import { useState, useRef, useEffect } from 'react';
export default function Demo() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  useEffect(() => {
    // 延迟调用处
    const timer = setTimeout(() => {
      console.log(countRef.current);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return <button onClick={() => setCount((c) => c + 1)}>click</button>;
}
