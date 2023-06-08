import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
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

import {setUser} from '../redux/actions';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import FoodApi from '../constants/option';
import LottieView from 'lottie-react-native';
import {COLORS} from '../constants';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = async () => {
    // console.log('duoc');
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    const dataUser = {
      email: email.value,
      password: password.value,
    };

    FoodApi.postLoginUser(dataUser).then(response => {
      if (response.data.status === 200) {
        // console.log(response.data.message);
        navigation.navigate('Tabs');
        // console.log(response.data.user);
        dispatch(setUser(response.data.user));
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
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
        <Header>Welcome back.</Header>
      </View>
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
      <View style={styles.forgotPassword}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity> */}
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Đăng Nhập
      </Button>
      <View style={styles.row}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
