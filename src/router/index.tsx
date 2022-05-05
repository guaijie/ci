import {
  BrowserRouter as Router,
  MemoryRouter,
  Routes,
  Route,
  RoutesProps,
} from 'react-router-dom';
import routes, { RouteNode } from './routes';
import GlobalGuard from 'components/GlobalGuard';
import { resolve } from 'path';
const TITLE = document.title;
const mapRoutes = (routes: RouteNode[], parent?: RouteNode) => {
  return routes.map((route, i) => {
    const { path, component: Comp, children, title, ...rest } = route;
    const currentPath = resolve(parent?.path ?? '', path);
    const redirect = parent?.redirect;
    const routes = mapRoutes(children || [], { ...route, path: currentPath });
    const index = currentPath === redirect;
    console.log(currentPath, index, redirect);
    return (
      <Route
        {...rest}
        path={currentPath}
        key={i}
        index={index}
        element={Comp && <Comp />}
        children={routes}
      />
    );
  });
};

export default function App() {
  console.log('reload routes');
  return (
    <Router>
      {/* <GlobalGuard /> */}
      <Routes>{mapRoutes(routes)}</Routes>
    </Router>
  );
}
