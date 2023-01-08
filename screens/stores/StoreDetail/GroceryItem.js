import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import useAxiosCtx from '../../../hooks/useAxiosCtx';

import IconButton from '../../../components/ui/IconButton';
import { GROCERY_URL } from '../../../constants/network';
import useStoresCtx from '../../../hooks/useStoresCtx';

export default function GroceryItem({ id, store_id, name }) {
  const navigation = useNavigation();
  const storesCtx = useStoresCtx();
  const { authAxios } = useAxiosCtx();

  const storesPressHandler = () => {
    //navigation.navigate('StoreDetail',{
    //     storeId: id });
  };

  const groceryDeleteHandler = async () => {
    try {
      authAxios.delete(`${GROCERY_URL}${id}`);
      storesCtx.deleteGrocery(store_id, id);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={storesPressHandler} style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.storeItem}>
          <View>
            <Text style={[styles.textBase, styles.name]}>{name}</Text>
          </View>
        </View>
      </Pressable>
      <IconButton
        icon="checkbox"
        color={Colors.primary500}
        size={30}
        onPress={groceryDeleteHandler}
      />
      <IconButton icon="trash" color={Colors.primary500} size={30} onPress={groceryDeleteHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  storeItem: {
    padding: 12,
    marginVertical: 5,
    marginLeft: 20,
    backgroundColor: Colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary700,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    //backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
