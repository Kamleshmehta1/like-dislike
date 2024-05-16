import { Navigate, useRoutes } from 'react-router-dom';
import { AUTHORIZED_ROUTES, ROOT, UN_AUTHORIZED_ROUTES } from './path';
import { Loadable } from '../utils/ReactLazyLoad';
import { lazy } from 'react';
import UserRoutes from './UserRoutes';
import RoutesLayout from '../layout/RoutesLayout';

const UnAuthGaurd = Loadable(lazy(() => import('../auth/UnAuthGaurd')));
const Layout = Loadable(lazy(() => import('../layout/Layout')));
const AuthPage = Loadable(lazy(() => import('../Component/AuthPage')));
const AuthGuard = Loadable(lazy(() => import('../auth/AuthGuard')));
const MainLayout = Loadable(lazy(() => import('../layout/MainLayout')));

function Routes() {
  return useRoutes([
    {
      path: ROOT,
      element: (
        <UnAuthGaurd>
          <Layout />
        </UnAuthGaurd>
      ),
      children: [
        {
          path: UN_AUTHORIZED_ROUTES.AUTH.path,
          element: <AuthPage />,
        },
        {
          path: '',
          element: <Navigate to={UN_AUTHORIZED_ROUTES.AUTH.path} replace />,
        },
      ],
    },
    {
      path: ROOT,
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: AUTHORIZED_ROUTES.root + '/*',
          element: (
            <RoutesLayout>
              <UserRoutes />
            </RoutesLayout>
          ),
        },
      ],
    },
  ]);
}

export default Routes;
