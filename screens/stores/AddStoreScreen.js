import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AuthContext } from '../../contexts/auth-context';
import { StoresContext } from '../../contexts/stores_context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL,STORES_URL } from '../../constants/network';


export default function AddStoreScreen({navigation}) {
  const authCtx = useContext(AuthContext);
  const storesCtx = useContext(StoresContext);

  const [enteredStore, setEnteredStore] = useState('');
  const [enteredGrocery, setEnteredGrocery] = useState('');
  const [enteredQty, setEnteredQty] = useState(1);

  const handleCancel = () => {
    navigation.goBack();
  }

  const IsGroceryEmpty = () => {
    const groceryString = enteredGrocery.trim();
    return groceryString.length <= 0 ? true : false ;

  }

  const handleSaveStore = () =>{
    //const string2 = `something ${doSomething() ? 'x' : 'y'}`
    const enternedGroceries = IsGroceryEmpty() ? [] : [{
                    "name": enteredGrocery,
                    "qty": enteredQty,
                    "store_id": 0, // correct store_id will be set inside of backend serializer
                    "is_completed": false
                    }];
    const bodyParameters = {
      "name": enteredStore,
      "is_completed": false,
      "groceries":enternedGroceries
    };

    axios.post(
      `${BASE_URL}${STORES_URL}`,
      bodyParameters,
      authCtx.apiAuthHeaders
    )
    .then(res => {
      storesCtx.addStore(res.data);
      navigation.goBack();
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  }

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
  }

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
  }
});