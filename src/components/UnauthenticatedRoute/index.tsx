import { useEffect, Suspense } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import config from '../../config';
import routes from '../../config/routes';
import { getToken } from '../../utils/token';
import ScreenLoader from '../ScreenLoader';

interface IProps extends RouteProps {}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const token = getToken({ name: config.tokenName });

  useEffect(() => {
    if (token?.token) {
      history.push(routes.dashboard.path);
    }
  }, [history, token]);

  if (token?.token) {
    return null;
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <Route {...props} />
    </Suspense>
  );
};

export default AuthenticatedRoute;
