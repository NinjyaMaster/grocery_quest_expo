import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import StoresScreen from './StoresScreen';
import FriendsScreen from './FriendsScreen';
import MyProfileScreen from './MyProfileScreen';

import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {

    return (
      <Drawer.Navigator
        useLegacyImplementation={true}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary100 },
          headerTintColor: Colors.primary1000,
          sceneContainerStyle: { backgroundColor: Colors.primary100 },
          drawerContentStyle: { backgroundColor: Colors.primary800 },
          drawerInactiveTintColor: Colors.primary700,
          drawerActiveTintColor:  Colors.primary500 ,
          drawerActiveBackgroundColor: Colors.primary100,
        }}
      >
        <Drawer.Screen
          name="Stores"
          component={StoresScreen}
          options={{
            title: 'Stores',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            title: 'Friends',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="My Profile"
          component={MyProfileScreen}
          options={{
            title: 'My Profile',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="happy" color={color} size={size} />
            ),
          }}
        />       
      </Drawer.Navigator>
    );
}

export default function AuthenticatedScreen() {
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      </Stack.Navigator>
    );
  }
