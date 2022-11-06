import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/ui/Button';

const BASE_URL = 'https://4f87-68-5-11-7.ngrok.io/';

export default function SignupScreen() {


  function submitHandler(){
    console.log('login');
    axios.post(`${BASE_URL}api/user/login/`,
            {
              email: 'foo@foo.com',
              password: 'foopassword',
            })
          .then(res => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error);
            return error;
          });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Login!</Text>
      <Text>Please Login!</Text>
      <Button onPress={submitHandler} >Login</Button>
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