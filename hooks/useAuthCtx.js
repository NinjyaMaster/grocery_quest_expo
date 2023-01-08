import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useAuthCtx = () => {
  return useContext(AuthContext);
};
export default useAuthCtx;
