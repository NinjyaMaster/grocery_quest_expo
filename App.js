import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import AuthenticatedScreen from './screens/AuthenticatedScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function AuthScreen() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: 'white' },
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    </Stack.Navigator>
  );
}

export default function App() {
  [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer>
      {!isAuthenticated &&  <AuthScreen />}
      {isAuthenticated && <AuthenticatedScreen />}
    </NavigationContainer>
    </>
  );
}
