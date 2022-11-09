import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { AuthContext } from '../../contexts/auth-context';
import { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";

import StoresOutput from '../../components/stores/StoresOutput'

const DUMMY_STORES2 = [
  {
      id: '0',
      name: 'Whole Foods',
  },
  {
      id: '1',
      name: 'Target',
  },
  {
      id: '2',
      name: 'LuLuLemon',
  },
];


export default function StoresScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  function handleAddStore(){
    console.log("Add Store");
    navigation.navigate("AddStore");

  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Stores!</Text>
      <Button onPress={handleAddStore}>Add Store</Button>
      <StoresOutput stores={DUMMY_STORES2} titleText='stores'/>
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