import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function GlobalGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    let paths = ['/login'];
    let pathname = this.props.location.pathname;
    if (paths.includes(pathname)) {
      return null;
    } else {
      navigate(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default GlobalGuard;
