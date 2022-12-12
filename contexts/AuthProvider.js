//AuthContext.js
// copied and modified : https://blog.logrocket.com/react-native-jwt-authentication-using-axios-interceptors/
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
    email: '',
    username: ''
  });


  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      email: '',
      username: '',      
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};