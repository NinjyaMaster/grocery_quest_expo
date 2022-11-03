import { StyleSheet, Text, View } from 'react-native';

export default function StoresScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Stores!</Text>
      <Text>Stores List!</Text>
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