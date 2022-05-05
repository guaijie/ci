import App from 'router';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'index.less';
// import 'serviceWorker';
createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);

const registrationNameDependencies: { [key: string]: string[] } = {};
const topLevelEventsToReactNames: Map<string, string> = new Map();
const dispatchQueue: { event: string; listeners: (() => void)[] }[] = [];

console.log(
  registrationNameDependencies,
  topLevelEventsToReactNames,
  dispatchQueue
);
