import { lazy } from 'react';

const routes = {
  dashboard: {
    path: '/',
    component: lazy(() => import('../pages/Dashboard')),
  },
  login: {
    path: '/login',
    component: lazy(() => import('../pages/Login')),
  },
  verifiedList: {
    path: '/verified-list',
    component: lazy(() => import('../pages/VerfiedList')),
  },
  unverifiedList: {
    path: '/unverified-list',
    component: lazy(() => import('../pages/UnverfiedList')),
  },
  unverfiableList: {
    path: '/unverifiable-list',
    component: lazy(() => import('../pages/UnverifiableList')),
  },
  naamSari: {
    path: '/naam-sari',
    component: lazy(() => import('../pages/NaamSari')),
  },
  analytics: {
    path: '/analytics',
    component: lazy(() => import('../pages/Analytics')),
  },
  users: {
    path: '/users',
    component: lazy(() => import('../pages/Users')),
  },
  vehicleEntry: {
    path: '/vehicle-entry',
    component: lazy(() => import('../pages/VehicleEntry')),
  },
  newUser: {
    path: '/users/add',
    component: lazy(() => import('../pages/NewUser')),
  },
  resetPassword: {
    path: '/accounts/activate/:id',
    component: lazy(() => import('../pages/ResetPassword')),
  },
  newVehicleEntry: {
    path: '/vehicle-entry/add',
    component: lazy(() => import('../pages/AddVehicleEntry')),
  },
  notFound: {
    path: '*',
    component: lazy(() => import('../pages/404')),
  },
  unauthorize: {
    path: '/unauthorize',
    component: lazy(() => import('../pages/403')),
  },
};

export default routes;
