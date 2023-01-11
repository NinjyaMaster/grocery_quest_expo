import { StyleSheet, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useState, useEffect } from 'react';
import { STORES_URL } from '../../constants/network';
import { Alert } from 'react-native';
import useStoresCtx from '../../hooks/useStoresCtx';
import useAxiosCtx from '../../hooks/useAxiosCtx';

export default function AddGrocery({ route, navigation }) {
  const storesCtx = useStoresCtx();
  const { authAxios } = useAxiosCtx();
  const storeId = route.params?.storeId;
  const storeName = route.params?.storeName;

  const [enteredGrocery1, setEnteredGrocery1] = useState('');
  const [enteredQty1, setEnteredQty1] = useState(1);
  const [enteredGrocery2, setEnteredGrocery2] = useState('');
  const [enteredQty2, setEnteredQty2] = useState(1);

  useEffect(() => {
    navigation.setOptions({
      title: 'Add Grocery to ' + storeName,
    });
  }, []);

  const handleCancel = () => {
    navigation.goBack();
  };

  const IsGroceryEmpty = (groceryStr) => {
    const trimmedGroceryStr = groceryStr.trim();
    return trimmedGroceryStr.length <= 0 ? true : false;
  };

  const handleSaveGrocery = async () => {
    let enternedGroceries = IsGroceryEmpty(enteredGrocery1)
      ? []
      : [
          {
            name: enteredGrocery1,
            qty: enteredQty1,
            store_id: storeId, // correct store_id will be set inside of backend serializer
            is_completed: false,
          },
        ];

    if (!IsGroceryEmpty(enteredGrocery2)) {
      enternedGroceries.push({
        name: enteredGrocery2,
        qty: enteredQty2,
        is_completed: false,
      });
    }
    const bodyParameters = {
      name: storeName,
      is_completed: false,
      groceries: enternedGroceries,
    };

    try {
      const res = await authAxios.patch(`${STORES_URL}${storeId}`, bodyParameters);
      storesCtx.addGroceries(storeId, res.data.groceries);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'grocery1':
        setEnteredGrocery1(enteredValue);
        break;
      case 'qty1':
        setEnteredQty1(enteredValue);
        break;
      case 'grocery2':
        setEnteredGrocery2(enteredValue);
        break;
      case 'qty2':
        setEnteredQty2(enteredValue);
        break;
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Input
        label="Grocery"
        onUpdateValue={updateInputValueHandler.bind(this, 'grocery1')}
        value={enteredGrocery1}
        //keyboardType="email-address"
        testID={'grocery1'}
        isInvalid={true}
      />
      <Input
        label="Qty"
        onUpdateValue={updateInputValueHandler.bind(this, 'qty1')}
        value={enteredQty1}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <Input
        label="Grocery"
        onUpdateValue={updateInputValueHandler.bind(this, 'grocery2')}
        value={enteredGrocery2}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <Input
        label="Qty"
        onUpdateValue={updateInputValueHandler.bind(this, 'qty2')}
        value={enteredQty2}
        //keyboardType="email-address"
        isInvalid={true}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleSaveGrocery}>Save</Button>
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
