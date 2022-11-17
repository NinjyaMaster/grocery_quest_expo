import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AuthContext } from '../../contexts/auth-context';
import { StoresContext } from '../../contexts/stores_context';
import { useContext, useState } from 'react';


export default function AddStoreScreen({navigation}) {
  const authCtx = useContext(AuthContext);
  const storesCtx = useContext(StoresContext);

  const [enteredStore, setEnteredStore] = useState('');
  const [enteredGrocery, setEnteredGrocery] = useState('');

  function handleCancel(){
    navigation.goBack();
  }

  function handleSaveStore(){
    console.log("store saved");
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'store':
        setEnteredStore(enteredValue);
        break;
      case 'grocery':
        setEnteredGrocery(enteredValue);
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