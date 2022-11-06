import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import AuthenticatedScreen from './screens/AuthenticatedScreen';
import AllowAnyScreen from './screens/AllowAny';
import AuthContextProvider, { AuthContext } from './contexts/auth-context';



const Stack = createNativeStackNavigator();

function Navigation(){
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated  &&  <AllowAnyScreen />}
      {authCtx.isAuthenticated  && <AuthenticatedScreen />}
    </NavigationContainer>    
  )
}

export default function App() {
  [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
});