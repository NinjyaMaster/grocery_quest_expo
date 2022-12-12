import { StyleSheet, View } from 'react-native';
import Button from '../../../components/ui/Button';
import { useEffect } from 'react';
import useStoresCtx from '../../../hooks/useStoresCtx';

import StoresOutput from './StoresOutput'

import useAxiosCtx from '../../../hooks/useAxiosCtx';
import { BASE_URL, STORES_URL } from '../../../constants/network';
import { Alert } from 'react-native';

export default function StoresList({navigation,handleDeleteStore}) {
  const storeCtx = useStoresCtx();
  const { authAxios } = useAxiosCtx();

  useEffect(() => {

    const getStoresData = async () => {
      try{
        //const res = await  authAxios.get(`${BASE_URL}${STORES_URL}`);
        const res = await  authAxios.get(STORES_URL);
        const storesList = res.data;
        storeCtx.setStores(storesList);
      }catch(error){
        console.log(error);
        Alert.alert('Add Store Failed', error.response.data.message);
        return error;   
      }
    }

    getStoresData();
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