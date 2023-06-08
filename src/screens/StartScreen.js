import React, {useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {View, Text, TouchableOpacity} from 'react-native';
import Button1 from '../components/Button1';

export default function StartScreen({navigation}) {
  const {user} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (user) {
      navigation.navigate('Tabs');
    }
  }, []);

  return (
    <Background>
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
        <Header>Welcome to LITHE</Header>
      </View>
      {/* <Paragraph>
        LITHE với công thức nấu ăn đầy đủ hình ảnh video sẽ giúp bạn thực hành
        dễ dàng
      </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Đăng Nhập
      </Button>
      <Button1
        // style={{color: COLORS.primary}}
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Đăng Ký
      </Button1>
      <View
        style={{
          // marginTop: SIZES.padding2 * 0.5,
          width: '100%',
          // position: 'absolute',
          // backgroundColor: 'red',
          // opacity: 0.9,
          // width: '100%',
          // height: '100%',
          // marginHorizontal: SIZES.padding,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 5,
          // // display: 'flex',
          // flex: 1,
          // zIndex: 999,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TabsGuest')}>
          <Text
            style={{
              ...FONTS.body3,
              color: 'black',
              // textDecorationLine: 'underline',
              // fontSize: 23,
            }}>
            Bỏ qua &gt;&gt;
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
