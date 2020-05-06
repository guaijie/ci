import React from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
class GlobalGuard extends React.Component {
  componentDidMount() {
    let paths = ['/login'];
    let pathname = this.props.location.pathname;
    let { push } = this.props.history;
    if (paths.includes(pathname)) {
      return null;
    } else {
      push(pathname);
    }
  }
  render() {
    return null;
  }
}

export default GlobalGuard;
