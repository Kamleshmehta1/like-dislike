import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { AUTHORIZED_ROUTES } from './path';
import { Loadable } from '../utils/ReactLazyLoad';

const Home = Loadable(lazy(() => import('../Component/Home')));

export default function Routes() {
  return useRoutes([
    {
      path: AUTHORIZED_ROUTES.HOME.path,
      element: <Home />,
    },
  ]);
}
