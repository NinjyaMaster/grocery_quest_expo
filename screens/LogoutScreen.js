import { StyleSheet, Text, View } from 'react-native';

export default function LogoutScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Logout</Text>
      <Text>Logged out!</Text>
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