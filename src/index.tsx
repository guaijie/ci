import ReactDOM from 'react-dom';
import App from 'router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'index.less';
// import 'serviceWorker';
ReactDOM.unstable_createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
