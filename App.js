import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Authenticated from './screens/Authenticated';
import AllowAny from './screens/AllowAny';
import { AuthProvider }  from './contexts/AuthProvider';
import { AxiosProvider } from './contexts/AxiosProvider';
import useAuthCtx from './hooks/useAuthCtx';
import StoreContextPtovider from './contexts/StoresContextProvider';


const Navigation = () =>{
  const authCtx = useAuthCtx();

  return (
      <NavigationContainer>
      {!authCtx.authState.authenticated &&  <AllowAny />}
      {authCtx.authState.authenticated  && <StoreContextPtovider><Authenticated /></StoreContextPtovider>}
      </NavigationContainer>
  )
}

export default function App() {

  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <AxiosProvider>
          <Navigation />
        </AxiosProvider>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
});