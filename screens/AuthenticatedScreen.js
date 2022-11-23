import 'react-native-gesture-handler';
import { useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AuthContext } from '../contexts/auth-context';
import { StoresContext } from '../contexts/stores_context';

import { Ionicons } from '@expo/vector-icons';

import StoresScreen from './stores/StoresScreen';
import StoreDetailScreen from './stores/StoreDetailScreen';
import AddStoreScreen from './stores/AddStoreScreen';
import AddGroceryScreen from './stores/AddGrocery';
import FriendsScreen from './FriendsScreen';
import MyProfileScreen from './MyProfileScreen';

import { Colors } from '../constants/colors';
import  IconButton from '../components/ui/IconButton'

import axios from 'axios';
import { BASE_URL, STORES_URL } from '../constants/network';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/*
*    Tag design is from https://youtu.be/mRoDNjhRO3E
*/

function CustomDrawerContent(props) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
    <DrawerContentScrollView
      contentContainerStyle={{flex: 1, top: 0, bottom: 0, backgroundColor: Colors.primary800 }}
      {...props}
    >
      <View
          style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginBottom: 5,
            }}>
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
          icon={({ focused, color, size }) => (
                    <Ionicons name="exit" color={color} size={size} />
                )}
          onPress={authCtx.logout}
          activeBackgroundColor={Colors.primary100}
      />
    </DrawerContentScrollView>
    <IconButton
              icon="exit"
              color={Colors.primary500}
              size={24}
              onPress={authCtx.logout}
    />
    </View>
  );
}


function DrawerNavigator({handleDeleteStore}) {

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
            drawerActiveTintColor:  Colors.primary500 ,
            drawerActiveBackgroundColor: Colors.primary100,
        }}
      >
        <Drawer.Screen
          name="Stores"
          //component={StoresScreen}
          options={{
            title: 'Stores',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={size} />
            ),
          }}
        >
          {(props) => (
                <StoresScreen handleDeleteStore={handleDeleteStore} {...props}/>
          )}            
        </Drawer.Screen>
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
  const storesCtx = useContext(StoresContext);
  const authCtx = useContext(AuthContext); 
  const navigation = useNavigation();

  function handleDeleteStore(id){
    axios.delete(
      `${BASE_URL}${STORES_URL}${id}`,
      authCtx.apiAuthHeaders
    )
    .then( res => {
      //const storesList = res.data;
      storesCtx.deleteStore(id);
      navigation.navigate('Stores');
    })
    .catch(error => {
      console.log(error);
      return error;
    });

}


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
          {(props) => (
                <DrawerNavigator handleDeleteStore={handleDeleteStore} {...props}/>
          )}          
      </Stack.Screen>
      <Stack.Screen name="StoreDetail"
        //component={StoreDetailScreen}
        //options={{}}
      >
           {(props) => (
                <StoreDetailScreen handleDeleteStore={handleDeleteStore} {...props}/>
           )}        
      </Stack.Screen>
      <Stack.Screen name="AddStore"
        component={AddStoreScreen}
        options={{
          presentation: 'modal',
          title: 'Add Store',
        }}
      />
      <Stack.Screen name="AddGrocery"
        component={AddGroceryScreen}
        options={{
          presentation: 'modal',
          title: 'Add Grocery',
        }}
      />
      </Stack.Navigator>
    );
  }
