import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useContext, useEffect, useState } from 'react';

import GroceriesList from '../../components/stores/GroceriesList';

import { StoresContext } from '../../contexts/stores_context';


export default function StoreDetailScreen({route, navigation}) {
  const storeId = route.params?.storeId;
  const storeCtx = useContext(StoresContext);
  const [store, setStore] = useState({});
  const [isGroceryEmpty, setIsGroceryEmpty] = useState(true);

  useEffect( () => {
    const storeObj = storeCtx.stores.find(
      (store) => store.id === storeId
    );
    setStore(storeObj);
    if(storeObj.groceries.length !== 0){
      setIsGroceryEmpty(false);
    }

    navigation.setOptions({
      title: storeObj.name,
    });

  }, []);



  function handleAddGrocery(){
      navigation.navigate("AddGrocery",{
        storeId: storeId,
        storeName: store.name
      });
  }

  function handleDeleteStore(){
    console.log("delete");
}

  return (
    <View style={styles.rootContainer}>
      <Button onPress={handleAddGrocery}>Add Grocery</Button>
      {isGroceryEmpty &&  <Text>Please Add Grocery</Text>}
      {!isGroceryEmpty  &&  <GroceriesList groceries={store.groceries} />}
      <Button onPress={handleDeleteStore}>Delete Store</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});