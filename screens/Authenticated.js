import 'react-native-gesture-handler';
import { Text, View, Image, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import useAuthCtx from '../hooks/useAuthCtx';
import useStoresCtx from '../hooks/useStoresCtx';
import useAxiosCtx from '../hooks/useAxiosCtx';

import { Ionicons } from '@expo/vector-icons';

import StoresList from './stores/StoresList/StoresList';
import StoreDetail from './stores/StoreDetail/StoreDetail';
import AddStore from './stores/AddStore';
import AddGrocery from './stores/AddGrocery';
import Friends from './Friends';
import MyProfile from './MyProfile';

import { Colors } from '../constants/colors';
import IconButton from '../components/ui/IconButton';

import { STORES_URL } from '../constants/network';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/*
 *    Tag design is from https://youtu.be/mRoDNjhRO3E
 */

const CustomDrawerContent = (props) => {
  const authCtx = useAuthCtx();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ flex: 1, top: 0, bottom: 0, backgroundColor: Colors.primary800 }}
        {...props}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            marginBottom: 5,
          }}
        >
          <View>
            <Text>Username</Text>
            <Text>Friends</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          inactiveTintColor={Colors.primary200}
          label="Logout"
          icon={({ focused, color, size }) => <Ionicons name="exit" color={color} size={size} />}
          onPress={authCtx.logout}
          activeBackgroundColor={Colors.primary100}
        />
      </DrawerContentScrollView>
      <IconButton icon="exit" color={Colors.primary500} size={24} onPress={authCtx.logout} />
    </View>
  );
};

const DrawerNavigator = ({ handleDeleteStore }) => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: Colors.primary1000,
        sceneContainerStyle: { backgroundColor: Colors.primary100 },
        //  drawerContentStyle: { backgroundColor: Colors.primary800 },//
        drawerInactiveTintColor: Colors.primary200,
        drawerActiveTintColor: Colors.primary500,
        drawerActiveBackgroundColor: Colors.primary100,
      }}
    >
      <Drawer.Screen
        name="Stores"
        //component={StoresScreen}
        options={{
          title: 'Stores',
          drawerIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      >
        {(props) => <StoresList handleDeleteStore={handleDeleteStore} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          title: 'Friends',
          drawerIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfile}
        options={{
          title: 'My Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="happy" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default function Authenticated() {
  const storesCtx = useStoresCtx();
  const navigation = useNavigation();
  const { authAxios } = useAxiosCtx();

  const handleDeleteStore = async (id) => {
    try {
      await authAxios.delete(`${STORES_URL}${id}`);
      storesCtx.deleteStore(id);
      navigation.navigate('Stores');
    } catch (error) {
      console.log(error);
      Alert.alert('Delete Store Failed', error.response.data.message);
      return error;
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: Colors.primary1000,
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Drawer"
        //component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      >
        {(props) => <DrawerNavigator handleDeleteStore={handleDeleteStore} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="StoreDetail"
        //component={StoreDetailScreen}
        //options={{}}
      >
        {(props) => <StoreDetail handleDeleteStore={handleDeleteStore} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="AddStore"
        component={AddStore}
        options={{
          presentation: 'modal',
          title: 'Add Store',
        }}
      />
      <Stack.Screen
        name="AddGrocery"
        component={AddGrocery}
        options={{
          presentation: 'modal',
          title: 'Add Grocery',
        }}
      />
    </Stack.Navigator>
  );
}
