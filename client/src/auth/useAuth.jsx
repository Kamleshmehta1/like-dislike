import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

function useAuth() {
  const authData = useContext(AuthContext);

  return authData;
}

export default useAuth;
