import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { IRouteProps } from '../../interfaces/IRoutes';
import ScreenLoader from '../ScreenLoader';

const BasicRoute = (props: IRouteProps) => {
  const { Component, path, exact } = props;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <Route path={path} component={Component} exact={exact} />
    </Suspense>
  );
};

export default BasicRoute;
