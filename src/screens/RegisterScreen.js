import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [cfpassword, setcfPassword] = useState({value: '', error: ''});

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const cfpasswordError = passwordValidator(cfpassword.value);
    if (emailError || passwordError || nameError || cfpasswordError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setcfPassword({...cfpassword, error: cfpasswordError});
      return;
    }

    const dataUser = {
      username: name.value,
      email: email.value,
      password: password.value,
      confirm_password: cfpassword.value,
    };
    // const dataUser = {
    //   username: 'Thang122',
    //   email: 'Thang122@gmail.com',
    //   password: '123123123',
    //   confirm_password: '123123123',
    // };
    console.log(dataUser);

    // const API_URL = 'http://127.0.0.1:8000';

    const res = axios
      .post(`http://10.0.2.2:8000/api/register`, dataUser)
      .then(response => {
        // handle the response data
        console.log(response.data);
        if (response.data.status === 200) {
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        // handle the error
        console.log(error);
      });
    // if (res.data.status === 200) {
    //   console.log(res.data.message);
    // } else {
    //   console.log(res.data.message);
    // }

    // axios.get(`${API_URL}/sanctum/csrf-cookie`).then(response => {
    //   authApi.postRegister(data).then(res => {
    //     if (res.data.status === 200) {
    //       console.log('Success', res.data.message, 'success');
    //     } else {
    //       console.log('error');
    //     }
    //   });
    // });

    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Dashboard'}],
    // });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={cfpassword.value}
        onChangeText={text => setcfPassword({value: text, error: ''})}
        error={!!cfpassword.error}
        errorText={cfpassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
