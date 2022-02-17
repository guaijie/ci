import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import useToggle from 'hooks/useToggle';
import usePrevious from 'hooks/usePreviousRender';
import './index.css';
function Home() {
  const [value, setValue] = useState('');
  const [flag, current] = useToggle(false);
  const prevValue = usePrevious(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    console.log('effect:', value);
    console.log('effect prevValue:', prevValue);
  }, [value, prevValue]);
  useLayoutEffect(() => {
    console.log('layoutEffect:', value);
    console.log('layoutEffect prevValue:', prevValue);
  });
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="in-form-item" style={{ width: '160px' }}>
        <input
          onChange={handleChange}
          placeholder="placeholder"
          className="in-input"
          type="text"
          value={value}
        />
        <label htmlFor="" className="in-placeholder">
          email
        </label>
      </div>
      <button onClick={() => current.toggle(true)}>toggle</button>
      <div>{flag ? 1 : 2}</div>
    </div>
  );
}

export default Home;
