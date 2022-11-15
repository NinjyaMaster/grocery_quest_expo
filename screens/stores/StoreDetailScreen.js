import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useContext, useEffect, useState } from 'react';

import GroceriesList from '../../components/stores/GroceriesList';

import { StoresContext } from '../../contexts/stores_context';


export default function StoreDetailScreen({route, navigation}) {
  const storeId = route.params?.storeId;
  const storeCtx = useContext(StoresContext);
  const [store, setStore] = useState({});
  const [groceries, setGroceries] = useState([]);
  const [isGroceryEmpty, setIsGroceryEmpty] = useState(false);

  useEffect( () => {
    storeCtx.stores.forEach( function(store){
      if ( store.id === storeId){
        setStore(store);
        setGroceries(store.groceries);
        if(store.groceries.length!== 0){
          setIsGroceryEmpty(true);
        }
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
      <Text style={styles.title}>{store.name}</Text>
      <Button onPress={handleAddGrocery}>Add Grocery</Button>
      {!isGroceryEmpty &&  <Text>Please Add Grocery</Text>}
      {isGroceryEmpty  &&  <GroceriesList groceries={groceries} />}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    //flex: 1,
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