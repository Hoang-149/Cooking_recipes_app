import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import Header from '../components/Header';
import {Globalstyles} from '../styles/GlobalStyle';
import {CustomButton} from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/actions';
import {DATABASE_URL_IMG} from '../constants/database';

const ProfileGuest = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);

  // console.log(`${DATABASE_URL_IMG}/users/${user.image}`);

  return (
    <>
      <SafeAreaView style={Globalstyles.container_1}>
        {/* Header */}
        {/* <Header
            title="Account"
            icon={icons.logout}
            onPressIcon={() => console.log('haha')}
          /> */}

        <View style={Globalstyles.container_2}>
          {/* User Photo */}
          <View style={styles.image_container}>
            {user?.image ? (
              <Image
                source={{uri: `${DATABASE_URL_IMG}/users/${user?.image}`}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            ) : (
              <Image
                source={icons.user}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            )}
          </View>
          {/* User Name */}
          <Text style={styles.name}>Bạn chưa đăng nhập</Text>

          <View
            style={{
              margin: SIZES.padding * 2,
              marginTop: 30,
              justifyContent: 'center',
              flex: 1,
            }}>
            <CustomButton
              text={'Đăng nhập'}
              onPressButton={() => navigation.navigate('LoginScreen')}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileGuest;

const styles = StyleSheet.create({
  image_container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 55,
    marginTop: SIZES.padding * 4,
    backgroundColor: COLORS.white,
  },
  name: {
    alignSelf: 'center',
    ...FONTS.h3,
    marginTop: SIZES.padding,
  },
  contact_text: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: SIZES.padding,
    flex: 1,
  },
});
