import { useContext } from 'react';
import { AxiosContext } from '../contexts/AxiosProvider';

const useAxiosCtx = () => {
  return useContext(AxiosContext);
};
export default useAxiosCtx;
