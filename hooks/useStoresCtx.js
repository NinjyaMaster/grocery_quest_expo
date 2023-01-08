import { useContext } from 'react';
import { StoresContext } from '../contexts/StoresContextProvider';

const useStoresCtx = () => {
  return useContext(StoresContext);
};
export default useStoresCtx;
