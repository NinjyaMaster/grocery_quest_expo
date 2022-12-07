import { StyleSheet, View } from 'react-native';
import Button from '../../../components/ui/Button';
import { useEffect } from 'react';
import useAuthCtx from '../../../hooks/useAuthCtx';
import useStoresCtx from '../../../hooks/useStoresCtx';

import StoresOutput from './StoresOutput'

import axios from 'axios';
import { BASE_URL, STORES_URL } from '../../../constants/network';

export default function StoresList({navigation,handleDeleteStore}) {
  const authCtx = useAuthCtx();
  const storeCtx = useStoresCtx();

  useEffect( () => {
    axios.get(
      `${BASE_URL}${STORES_URL}`,
      authCtx.apiAuthHeaders
    )
    .then( res => {
      const storesList = res.data;
      storeCtx.setStores(storesList);
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  },[]);

  const handleAddStore = () =>{
    navigation.navigate("AddStore");

  }

  return (
    <View style={styles.rootContainer}>
      <Button onPress={handleAddStore}>Add Store</Button>
      <StoresOutput stores={storeCtx.stores} handleDeleteStore={handleDeleteStore}/>
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