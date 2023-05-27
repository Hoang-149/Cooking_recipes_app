import React, {useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {useSelector} from 'react-redux';

export default function StartScreen({navigation}) {
  const {user} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (user) {
      navigation.navigate('Tabs');
    }
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Welcome</Header>
      <Paragraph>
        Pinacola với công thức nấu ăn đầy đủ hình ảnh video sẽ giúp bạn thực
        hành dễ dàng
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  );
}
