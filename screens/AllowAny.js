import { Colors } from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './auth/Login';
import Register from './auth/Register';


const Stack = createNativeStackNavigator();

export default function AllowAny(){
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
      component={Login}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        headerShown: false,
      }}
    />
    </Stack.Navigator>
  );
}