import ReactDOM from 'react-dom';
import App from 'router';
import * as serviceWorker from 'serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'index.less';
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
serviceWorker.register();
