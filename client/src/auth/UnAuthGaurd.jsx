import PropTypes from 'prop-types';
import useAuth from './useAuth';
import { Navigate } from 'react-router-dom';
import { AUTHORIZED_ROUTES } from '../routes/path';

function UnAuthGaurd({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={AUTHORIZED_ROUTES.HOME.fullpath} />;
  }

  return <>{children}</>;
}

export default UnAuthGaurd;

UnAuthGaurd.propTypes = {
  children: PropTypes.any,
};
