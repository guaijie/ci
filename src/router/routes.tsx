// import Layout from 'layouts/Layout';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { ReactNode, ComponentType } from 'react';
console.log('3', '3');
export type RouteNode = {
  path: string;
  component?: ComponentType;
  title?: string;
  caseSensitive?: boolean;
  redirect?: string;
  children?: RouteNode[];
};

const modules = require.context('../page', true, /index\.tsx$/);

const pageRoutes: RouteNode[] = [];
modules.keys().forEach((key) => {
  pageRoutes.push({
    path: key.replace(/\.?((\/[^/]+)+)\/index\.tsx$/, '$1'),
    component: modules(key).default,
  });
});

const routes: RouteNode[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    // component: Layout,
    redirect: '/home',
    children: [
      ...pageRoutes.filter((r) => r.component),
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
