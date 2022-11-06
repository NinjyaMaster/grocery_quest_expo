import { Colors } from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';


const Stack = createNativeStackNavigator();

export default function AllowAnyScreen() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor:  Colors.primary100},
      headerTintColor: 'white',
      contentStyle: { backgroundColor: Colors.primary100 },
    }}
    >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        headerShown: false,
      }}
    />    
    </Stack.Navigator>
  );
}
