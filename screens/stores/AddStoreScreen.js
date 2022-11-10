import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useNavigation } from "@react-navigation/native";
//import { AuthContext } from '../contexts/auth-context';
//import { useContext } from 'react';


export default function AddStoreScreen({navigation}) {
  //const authCtx = useContext(AuthContext);

  function handleScreenClose(){
    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Add Store</Text>
      <Button onPress={handleScreenClose}>Close Screen</Button>
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