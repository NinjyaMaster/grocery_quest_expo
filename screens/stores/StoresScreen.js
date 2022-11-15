import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { AuthContext } from '../../contexts/auth-context';
import { useContext, useEffect } from 'react';

import StoresOutput from '../../components/stores/StoresOutput'
import { StoresContext } from '../../contexts/stores_context';

import axios from 'axios';
import { BASE_URL, STORES_URL } from '../../constants/network';

export default function StoresScreen({navigation}) {
  const authCtx = useContext(AuthContext);
  const storeCtx = useContext(StoresContext);

  useEffect( () => {
    axios.get(
      `${BASE_URL}${STORES_URL}`,
      { headers: {"Authorization": `Bearer ${authCtx.token}`}}
    )
    .then( res => {
      const storesList = res.data;
      console.log(storesList);
      storeCtx.setStores(storesList);
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  },[]);

  function handleAddStore(){
    navigation.navigate("AddStore");

  }

  return (
    <View style={styles.rootContainer}>
      <Button onPress={handleAddStore}>Add Store</Button>
      <StoresOutput stores={storeCtx.stores}/>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});