import { StyleSheet, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useState } from 'react';
import { STORES_URL } from '../../constants/network';
import useStoresCtx from '../../hooks/useStoresCtx';
import useAxiosCtx from '../../hooks/useAxiosCtx';

export default function AddStore({ navigation }) {
  const storesCtx = useStoresCtx();
  const { authAxios } = useAxiosCtx();

  const [enteredStore, setEnteredStore] = useState('');
  const [enteredGrocery, setEnteredGrocery] = useState('');
  const [enteredQty, setEnteredQty] = useState(1);

  const handleCancel = () => {
    navigation.goBack();
  };

  const IsGroceryEmpty = () => {
    const groceryString = enteredGrocery.trim();
    return groceryString.length <= 0 ? true : false;
  };

  const handleSaveStore = async () => {
    //const string2 = `something ${doSomething() ? 'x' : 'y'}`
    const enternedGroceries = IsGroceryEmpty()
      ? []
      : [
          {
            name: enteredGrocery,
            qty: enteredQty,
            store_id: 0, // correct store_id will be set inside of backend serializer
            is_completed: false,
          },
        ];
    const bodyParameters = {
      name: enteredStore,
      is_completed: false,
      groceries: enternedGroceries,
    };

    try {
      const res = await authAxios.post(STORES_URL, bodyParameters);
      storesCtx.addStore(res.data);
      navigation.goBack();
    } catch (error) {
      console.log(JSON.stringify(error));
      //console.log(error?.message);
    }
  };

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'store':
        setEnteredStore(enteredValue);
        break;
      case 'grocery':
        setEnteredGrocery(enteredValue);
        break;
      case 'qty':
        setEnteredQty(enteredValue);
        break;
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Input
        label="Store"
        onUpdateValue={updateInputValueHandler.bind(this, 'store')}
        value={enteredStore}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <Input
        label="Grocery"
        onUpdateValue={updateInputValueHandler.bind(this, 'grocery')}
        value={enteredGrocery}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <Input
        label="qty"
        onUpdateValue={updateInputValueHandler.bind(this, 'qty')}
        value={enteredQty}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleSaveStore}>Save</Button>
        <Button onPress={handleCancel}>Cancel</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
