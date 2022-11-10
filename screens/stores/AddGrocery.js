import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
//import { AuthContext } from '../contexts/auth-context';
//import { useContext } from 'react';


export default function AddGroceryScreen({route, navigation}) {
  //const authCtx = useContext(AuthContext);
  const storeId = route.params?.storeId;

  function handleScreenClose(){
    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Add Grocery to Store {storeId}</Text>
      <Button onPress={handleScreenClose}>Cancel</Button>
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