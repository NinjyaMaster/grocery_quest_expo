import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Authenticated from './screens/Authenticated';
import AllowAny from './screens/AllowAny';
import { AuthProvider }  from './contexts/AuthProvider';
import useAuthCtx from './hooks/useAuthCtx';
import StoreContextPtovider from './contexts/StoresContextProvider';


const Stack = createNativeStackNavigator();

const Navigation = () =>{
  const authCtx = useAuthCtx();

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated  &&  <AllowAny />}
      {authCtx.isAuthenticated  && <StoreContextPtovider><Authenticated /></StoreContextPtovider>}
    </NavigationContainer>
  )
}

export default function App() {
  [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
});