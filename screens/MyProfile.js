import { StyleSheet, Text, View } from 'react-native';

export default function MyProfileScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>MyProfile</Text>
      <Text>MyProfile!</Text>
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