import { useState } from 'react';
import type { ReactElement } from 'react';

function Son() {
  console.log('son render');
  return <div>Son</div>;
}

function Parent(props: { children: ReactElement }) {
  const [count, setCount] = useState(0);
  console.log('parent render');
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click</button>
      {props.children}
    </div>
  );
}

export default () => (
  <Parent>
    <Son />
  </Parent>
);
