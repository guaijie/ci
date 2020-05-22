// import Layout from 'layouts/Layout';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { ComponentType } from 'react';

export type RouteNode = {
  path: string;
  component?: ComponentType;
  redirect?: string;
  key?: string;
  title?: string;
  exact?: boolean;
  routes?: RouteNode[];
};

const modules = require.context('../page', true, /\.\/[\w-]+\/index.tsx$/);

let pageRoutes: RouteNode[] = [];
modules.keys().forEach(key => {
  pageRoutes.push({
    path: key.replace(/\.(\/[\w-]+)\/index\.tsx$/, '$1'),
    component: modules(key).default
  });
});

const routes: RouteNode[] = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/',
    // component: Layout,
    routes: [
      ...pageRoutes.filter(r => r.component),
      {
        path: '/',
        redirect: '/home',
        exact: true
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];

export default routes;
