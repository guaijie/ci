import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  SwitchProps
} from 'react-router-dom';
import routes, { RouteNode } from './routes';
import GlobalGuard from 'components/GlobalGuard';
import { hot } from 'react-hot-loader/root';
const supportsHistory = 'pushState' in window.history;
const TITLE = document.title;
const mapRoutes = (
  routes: RouteNode[],
  prevProps?: RouteComponentProps,
  switchProps?: SwitchProps
) => {
  return (
    <Switch {...switchProps}>
      {(routes || []).map((route, i) => {
        let {
          routes,
          redirect: subRedirect,
          key,
          path: subPath,
          ...rest
        } = route;
        let prevpath = prevProps?.match.path.replace(/\/$/, '');
        let path = prevpath ? prevpath + subPath : subPath;
        if (subRedirect) {
          let redirect = prevpath ? prevpath + subRedirect : subRedirect;
          return (
            <Redirect
              key={key || i}
              from={path}
              to={redirect}
              {...rest}
            ></Redirect>
          );
        } else {
          let { component, title, ...nextRest } = rest;
          return (
            <Route
              {...nextRest}
              path={path}
              key={key || i}
              render={props => {
                let childRoutes;
                if (routes && routes.length > 0) {
                  childRoutes = mapRoutes(routes, props, {
                    location: props.location
                  });
                } else {
                  document.title = title || TITLE;
                  childRoutes = null;
                }
                if (component) {
                  const Component = component;
                  return <Component {...props}>{childRoutes}</Component>;
                } else {
                  return childRoutes;
                }
              }}
            />
          );
        }
      })}
    </Switch>
  );
};

function App() {
  return (
    <Router forceRefresh={!supportsHistory}>
      <GlobalGuard />
      {mapRoutes(routes)}
    </Router>
  );
}

export default hot(App);
