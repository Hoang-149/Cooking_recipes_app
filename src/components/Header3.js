import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import SearchBar from 'react-native-dynamic-search-bar';
import FoodApi from '../constants/option';

const Header3 = ({textHeader}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: SIZES.padding,
      }}>
      <Text
        style={{
          ...FONTS.h4,
          fontWeight: 'bold',
          flex: 1,
          textAlign: 'center',
          //   paddingRight: search ? SIZES.padding : 25 + SIZES.padding,
        }}>
        {textHeader}
      </Text>
    </View>
  );
};

export default Header3;
