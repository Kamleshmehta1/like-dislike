import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const authSliceData = useSelector((state) => state?.authSlice);

  return (
    <AuthContext.Provider value={{ ...authSliceData }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
