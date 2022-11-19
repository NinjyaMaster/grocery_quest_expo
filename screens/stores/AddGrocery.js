import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AuthContext } from '../../contexts/auth-context';
import { StoresContext } from '../../contexts/stores_context';
import { useContext, useState } from 'react';
import axios from 'axios';
import {    BASE_URL,
  ADD_GROCERY_URL
} from '../../constants/network';
import { Alert } from "react-native";

export default function AddGroceryScreen({route, navigation}) {
  const authCtx = useContext(AuthContext);
  const storesCtx = useContext(StoresContext);
  const storeId = route.params?.storeId;

  const [enteredGrocery, setEnteredGrocery] = useState('');

  function handleCancel(){
    navigation.goBack();
  }

  function handleSaveGrocery(){
    const bodyParameters = {
      "name": enteredGrocery,
      "store_id": storeId,
      "is_completed": false
    };

    axios.post(
      `${BASE_URL}${ADD_GROCERY_URL}`,
      bodyParameters,
      authCtx.apiAuthHeaders
    )
    .then(res => {
      storesCtx.addGroceries(storeId, res.data);
      navigation.goBack();
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'grocery':
        setEnteredGrocery(enteredValue);
        break;
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Input
          label="Grocery"
          onUpdateValue={updateInputValueHandler.bind(this, 'grocery')}
          value={enteredGrocery}
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
  }
});