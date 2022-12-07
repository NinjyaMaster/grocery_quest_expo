import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/ui/Button';
import IconButton from '../../../components/ui/IconButton';
import { useEffect, useState } from 'react';

import GroceriesList from './GroceriesList';
import { Colors } from '../../../constants/colors';
import useStoresCtx from '../../../hooks/useStoresCtx';


export default function StoreDetail({route, navigation, handleDeleteStore}) {
  const storeId = route.params?.storeId;
  const storesCtx = useStoresCtx();
  const [store, setStore] = useState({});
  const [isGroceryEmpty, setIsGroceryEmpty] = useState(true);

  useEffect( () => {
    const storeObj = storesCtx.stores.find(
      (store) => store.id === storeId
    );
    setStore(storeObj);
    if(storeObj.groceries.length !== 0){
      setIsGroceryEmpty(false);
    }

    navigation.setOptions({
      title: storeObj.name,
      headerRight: () => (
        <IconButton
          icon="trash"
          color={Colors.primary500}
          size={30}
          onPress={() => handleDeleteStore(storeId)}
        />
      ),
    });
  }, []);



  const handleAddGrocery = () =>{
      navigation.navigate("AddGrocery",{
        storeId: storeId,
        storeName: store.name
      });
  }

//   function handleDeleteStore(id){
//     axios.delete(
//       `${BASE_URL}${STORES_URL}${id}`,
//       authCtx.apiAuthHeaders
//     )
//     .then( res => {
//       const storesList = res.data;
//       storesCtx.deleteStore(id);
//       navigation.goBack();
//     })
//     .catch(error => {
//       console.log(error);
//       return error;
//     });

// }

  return (
    <View style={styles.rootContainer}>
      <Button onPress={handleAddGrocery}>Add Grocery</Button>
      {isGroceryEmpty &&  <Text>Please Add Grocery</Text>}
      {!isGroceryEmpty  &&  <GroceriesList groceries={store.groceries} />}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20
    //padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});