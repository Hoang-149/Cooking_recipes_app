import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
// import CartIcon from './CartIcon';

const HomeHeader = ({navigation, searchMenu}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 12,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.avatar}
          style={{width: 35, height: 35, borderRadius: SIZES.radius}}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: COLORS.lightGray3,
          flex: 1,
          borderRadius: SIZES.radius,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
            marginStart: 12,
            marginEnd: 8,
            tintColor: COLORS.darkgray,
          }}
        />
        <TextInput
          placeholder="Tìm theo công thức, nguyên liệu"
          style={{...FONTS.h5}}
          onChangeText={text => searchMenu(text)}
        />
      </View>
      {/* <CartIcon navigation={navigation} /> */}
    </View>
  );
};

export default HomeHeader;
