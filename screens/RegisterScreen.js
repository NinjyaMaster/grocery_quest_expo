import axios from 'axios';
import { Alert, StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FlatButton from '../components/ui/FlatButton';

import { BASE_URL, REGISTER_URL } from '../constants/network';
import { AuthContext } from '../contexts/auth-context';

export default function RegisterScreen() {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);


  const submitHandler = () => {
    console.log('register',`${BASE_URL}${REGISTER_URL}`);
    console.log(enteredEmail)
    console.log(enteredPassword)

    axios.post(`${BASE_URL}${REGISTER_URL}`,
            {
              username: enteredUsername,
              email: enteredEmail,
              password: enteredPassword,
            })
          .then(res => {
            console.log(res.data);
            Alert.alert(
              `Email has sent to ${enteredEmail}`,
              "Please verify the email",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
            navigation.replace('Login');
          })
          .catch(error => {
            console.log(error);
            return error;
          });
  }

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'username':
          setEnteredUsername(enteredValue);
          break;
    }
  }

  const switchToRegister = () =>{
    navigation.replace('Login');
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
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={true}
        />
        <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'username'
            )}
            value={enteredUsername}
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
              Signup
          </Button>
          <FlatButton onPress={switchToRegister}>
              Login instead
        </FlatButton>
        </View>
      </View>
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
  form: {
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});