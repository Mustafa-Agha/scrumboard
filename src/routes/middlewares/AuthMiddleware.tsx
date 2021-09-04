import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Utils from 'utils';

const AuthMiddleware: FC = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    let AUTH_TOKEN = Utils.getLocalStorage('AUTH_TOKEN');
    console.log(AUTH_TOKEN);
    if (!AUTH_TOKEN) {
      history.push('/auth/login');
      return;
    }
  }, [history]);

  return <>{children}</>;
};

export default AuthMiddleware;