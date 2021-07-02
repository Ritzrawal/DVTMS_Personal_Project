import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from '../config/routes';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import BaseRouter from '../components/BaseRouter';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute
          path={routes.login.path}
          component={routes.login.component}
        />
        <UnauthenticatedRoute
          path={routes.resetPassword.path}
          component={routes.resetPassword.component}
        />

        <AuthenticatedRoute
          path={routes.vehicleEntry.path}
          component={routes.vehicleEntry.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.newVehicleEntry.path}
          component={routes.newVehicleEntry.component}
        />

        <AuthenticatedRoute
          path={routes.dashboard.path}
          component={routes.dashboard.component}
          exact
        />
        <AuthenticatedRoute
          path={routes.verifiedList.path}
          component={routes.verifiedList.component}
        />
        <AuthenticatedRoute
          path={routes.unverifiedList.path}
          component={routes.unverifiedList.component}
        />
        <AuthenticatedRoute
          path={routes.unverfiableList.path}
          component={routes.unverfiableList.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.newUser.path}
          component={routes.newUser.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.users.path}
          component={routes.users.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.naamSari.path}
          component={routes.naamSari.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.resetPassword.path}
          component={routes.resetPassword.component}
          exact
        />

        <AuthenticatedRoute
          path={routes.analytics.path}
          component={routes.analytics.component}
        />
        <BaseRouter
          path={routes.notFound.path}
          Component={routes.notFound.component}
        />
        <BaseRouter
          path={routes.unauthorize.path}
          Component={routes.unauthorize.component}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
