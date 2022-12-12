import { StyleSheet, View, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import FlatButton from '../../components/ui/FlatButton';

import { LOGIN_URL } from '../../constants/network';
import useAuthCtx from '../../hooks/useAuthCtx';
import { AxiosContext } from '../../contexts/AxiosProvider';
import * as SecureStore from 'expo-secure-store';

export default function Login() {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const navigation = useNavigation();
  const authCtx = useAuthCtx();
  const { publicAxios } = useContext(AxiosContext);

  const submitHandler = async () => {
    try{
      const response = await publicAxios.post(LOGIN_URL, {
        email:enteredEmail,
        password: enteredPassword,
      });

      const {access, refresh} = response?.data?.tokens;
      const {email, username } = response?.data
      authCtx.setAuthState({
        accessToken: access,
        refreshToken: refresh,
        authenticated: true,
        email:email,
        username:username
      });
      await SecureStore.setItemAsync('accessToken', access);
      await SecureStore.setItemAsync('refreshToken', refresh);

    }catch (error) {
      Alert.alert('Login Failed', error?.response?.data);
      console.error(error);
      return error;
    }
  }

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  const switchToRegister = () =>{
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
