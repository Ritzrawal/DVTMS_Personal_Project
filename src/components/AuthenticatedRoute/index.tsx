import { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import routes from '../../config/routes';
import authorization from '../../config/authorization';
import Sidebar from '../Sidebar';
import { pingMe } from '../../redux/actions/auth';
import { resetRedirect } from '../../redux/actions/ui';
import AppUser from '../AppUser/AppUser';
import ScreenLoader from '../ScreenLoader';

const { Header, Content, Footer } = Layout;

interface IProps extends RouteProps {}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, loggedInUser = [] } = useSelector(
    (state: any) => state.auth,
  );
  const { redirectLink } = useSelector((state: any) => state.ui);

  let group: string = loggedInUser?.groups?.[0];

  useEffect(() => {
    dispatch(pingMe());
  }, [dispatch]);

  useEffect(() => {
    if (redirectLink) {
      history.push(redirectLink);
    }
  }, [history, redirectLink]);

  useEffect(() => {
    return function () {
      dispatch(resetRedirect());
    };
  }, [dispatch]);

  if (!isLoggedIn) {
    return null;
  }

  const pathname = history?.location?.pathname;
  const canEnterRoutes = authorization[group];

  if (canEnterRoutes && !canEnterRoutes?.includes?.(pathname)) {
    history.push(routes.dashboard.path);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            boxShadow: '0px 0 5px rgba(0,0,0,0.08)',
            background: '#fff',
            position: 'fixed',
            width: '90%',
            zIndex: 1,
          }}
        >
          <AppUser />
        </Header>
        <Content style={{ padding: '1em' }}>
          <Suspense fallback={<ScreenLoader />}>
            <Route {...props} />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by Digital valley Pvt. Ltd.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedRoute;
