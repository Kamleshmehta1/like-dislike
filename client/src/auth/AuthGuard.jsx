import PropTypes from 'prop-types';
import useAuth from './useAuth';
import { Navigate } from 'react-router-dom';
import { UN_AUTHORIZED_ROUTES } from '../routes/path';

function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={UN_AUTHORIZED_ROUTES.AUTH.fullpath} />;
  }
  return <>{children}</>;
}

export default AuthGuard;

AuthGuard.propTypes = {
  children: PropTypes.any,
};
