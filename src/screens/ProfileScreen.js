import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import Header from '../components/Header';
import {Globalstyles} from '../styles/GlobalStyle';
import {CustomButton} from '../components/CustomButton';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/actions';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

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
            <Image
              source={icons.user}
              resizeMode="center"
              style={{
                width: '50%',
                height: '50%',
              }}
            />
          </View>
          {/* User Name */}
          <Text style={styles.name}>Thang</Text>

          {/* Email */}
          <View style={{flexDirection: 'row', marginTop: SIZES.padding * 2}}>
            <Image
              source={icons.email}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.black,
              }}
            />
            <Text style={styles.contact_text}> Thang12345@gmail.com</Text>
          </View>

          {/* Phone */}
          <View style={{flexDirection: 'row', marginTop: SIZES.padding}}>
            <Image
              source={icons.phone}
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text style={styles.contact_text}>0869142545</Text>
          </View>

          {/* Update Button */}
          <CustomButton
            text="Update"
            onPressButton={() => {
              dispatch(setUser(null));
              navigation.navigate('StartScreen');
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Profile;

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
    ...FONTS.h2,
    marginTop: SIZES.padding,
  },
  contact_text: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: SIZES.padding,
  },
});
