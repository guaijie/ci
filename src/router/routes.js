// import Layout from 'layouts/Layout';
// import Login from 'components/Login';
import NotFound from 'components/NotFound';

const modules = require.context('page', true, /\.\/[\w-]+\/index\.js$/);
let routes = [];
modules.keys().forEach(key => {
  routes.push({
    path: key.replace(/\.(\/[\w-]+)\/index\.js$/, '$1'),
    component: modules(key).default
  });
});
export default [
  // {
  //   path: '/login',
  //   component: Login,
  //   exact: true
  // },
  {
    path: '/',
    // component: Layout,
    routes: [
      ...routes.filter(r => r.component),
      {
        path: '*',
        component: NotFound
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
];
