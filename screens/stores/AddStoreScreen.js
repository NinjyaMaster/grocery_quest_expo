import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
//import { AuthContext } from '../contexts/auth-context';
//import { useContext } from 'react';


export default function AddStoreScreen() {
  //const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Add Store</Text>
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