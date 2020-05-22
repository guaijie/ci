import React from 'react';
import ReactDOM from 'react-dom';
import App from 'router';
import * as serviceWorker from 'serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
serviceWorker.register();
