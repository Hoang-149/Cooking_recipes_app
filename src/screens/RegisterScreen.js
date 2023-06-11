import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
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
import FoodApi from '../constants/option';
import LottieView from 'lottie-react-native';
import {COLORS} from '../constants';

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
      name: name.value,
      email: email.value,
      password: password.value,
      confirm_password: cfpassword.value,
    };
    // console.log(dataUser);

    FoodApi.postSignUpUser(dataUser)
      .then(response => {
        // handle the response data
        console.log(response.data);
        if (response.data.status === 200) {
          console.log(response.data.message);
          ToastAndroid.show('Đăng Kí Thành Công', ToastAndroid.SHORT);
          navigation.navigate('LoginScreen');
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        // handle the error
        console.log(error);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View
        style={{
          width: '100%',
          // height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          autoPlay
          speed={0.5}
          // duration={5000}
          loop={true}
          style={{
            height: 250,
            alignSelf: 'center',
          }}
          source={require('../assets/anim/88782-women-cooking-in-kitchen.json')}
        />
        <Header>Tạo Tài Khoản</Header>
      </View>
      <TextInput
        label="Tên"
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
        label="Mật Khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Xác Nhận Mật Khẩu"
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
        Đăng Ký
      </Button>
      <View style={styles.row}>
        <Text>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Đăng Nhập</Text>
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
    color: COLORS.primary,
  },
});
