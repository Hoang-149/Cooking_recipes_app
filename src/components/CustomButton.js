import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';

export const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPressButton}
      style={{
        borderRadius: SIZES.radius,
        height: 50,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.body3,
          fontWeight: '700',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
