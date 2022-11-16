import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FlatButton from '../components/ui/FlatButton';

import { BASE_URL, LOGIN_URL } from '../constants/network';
import { AuthContext } from '../contexts/auth-context';

export default function LoginScreen() {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  function submitHandler(){
    console.log('login',`${BASE_URL}${LOGIN_URL}`);
    console.log(enteredEmail)
    console.log(enteredPassword)
    axios.post(`${BASE_URL}${LOGIN_URL}`,
            {
              email: enteredEmail,
              password: enteredPassword,
            })
          .then(res => {
            console.log(res.data);
            authCtx.authenticate(res.data);
          })
          .catch(error => {
            console.log(error);
            return error;
          });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function switchToRegister(){
    navigation.replace('Register');
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={true}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={true}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
              Login
          </Button>
          <FlatButton onPress={switchToRegister}>
              Create a new user
        </FlatButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 32,
  },
  buttons: {
    marginTop: 12,
  },
});
