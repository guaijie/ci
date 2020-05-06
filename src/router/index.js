import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import routes from './routes';
import GlobalGuard from 'components/GlobalGuard';
import { hot } from 'react-hot-loader/root';
const supportsHistory = 'pushState' in window.history;
const TITLE = document.title;
const mapRoutes = (routes, prevProps = {}, switchProps = {}) => {
  return (
    <Switch {...switchProps}>
      {(routes || []).map((route, i) => {
        let { routes, redirect, key, path, ...rest } = route;
        let { match } = prevProps;
        path = match ? match.path.replace(/^\/$/, '') + path : path;
        if (redirect) {
          let { match } = prevProps;
          redirect = match
            ? match.path.replace(/^\/$/, '') + redirect
            : redirect;
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
                  return (
                    <Component {...props} route={route}>
                      {childRoutes}
                    </Component>
                  );
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
