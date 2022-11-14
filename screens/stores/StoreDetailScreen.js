import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useContext, useEffect, useState } from 'react';

import  StoreItem from '../../components/stores/StoreItem';

import { StoresContext } from '../../contexts/stores_context';


export default function StoreDetailScreen({route, navigation}) {
  const storeId = route.params?.storeId;
  const storeCtx = useContext(StoresContext);
  const [store, setStore] = useState({});

  useEffect( () => {
    storeCtx.stores.forEach( function(store){
      if ( store.id === storeId){
        setStore(store);
      }
    });
  }, []);

  function handleAddGrocery(){
      navigation.navigate("AddGrocery",{
        storeId: storeId,
      });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Store Detail</Text>
      <StoreItem {...store} />
      <Button onPress={handleAddGrocery}>Add Grocery</Button>
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