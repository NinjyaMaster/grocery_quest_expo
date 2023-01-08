// Install axios@0.21.4 because axios@^1.1.3 give Network Error when access token need to be used and POST method is used
import axios from 'axios';
import useAuthCtx from '../hooks/useAuthCtx';
import { BASE_URL, REFRESH_URL } from '../constants/network';
import * as SecureStore from 'expo-secure-store';
import React, { createContext } from 'react';
import { Alert } from 'react-native';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const { authState, logout, setAuthState } = useAuthCtx();

  const authAxios = axios.create({
    baseURL: BASE_URL,
  });

  const publicAxios = axios.create({
    baseURL: BASE_URL,
  });

  authAxios.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && originalRequest.url === `${BASE_URL}${REFRESH_URL}`) {
        logout();
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = authState.refreshToken;
        return axios
          .post(`${BASE_URL}${REFRESH_URL}`, {
            refresh: refreshToken,
          })
          .then(async (res) => {
            if (res.status === 200) {
              originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
              setAuthState({
                ...authState,
                accessToken: res.data.access,
              });
              await SecureStore.setItemAsync('accessToken', res.data.access);
              return authAxios(originalRequest);
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Session expired. Please login again');
            logout();
          });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
