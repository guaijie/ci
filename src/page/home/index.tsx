import { ChangeEvent, useEffect, useState } from 'react';
import usePrevious from 'hooks/usePreviousRender';
import './index.css';
function Home() {
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    console.log('effect:', value);
    console.log('effect prevValue:', prevValue);
  }, [value, prevValue]);

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
    </div>
  );
}

export default Home;
