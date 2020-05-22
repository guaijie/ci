import React from 'react';
import { Input, Form } from 'antd';
import './index.css';
function Home() {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="in-form-item" style={{ width: '160px' }}>
        <input placeholder="placeholder" className="in-input" type="text" />
        <label htmlFor="" className="in-placeholder">
          email
        </label>
      </div>
    </div>
  );
}

export default Home;
