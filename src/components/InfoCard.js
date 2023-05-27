import {View, Text, Image} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';

const InfoCard = ({data}) => {
  //   console.log(data);
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 2,
        backgroundColor: 'red',
      }}>
      <Image
        source={{
          uri: `${DATABASE_URL_IMG}/users/${data[0]?.image}`,
          // cache: 'force-cache',
        }}
        resizeMode="contain"
        style={{
          width: 23,
          height: 23,
        }}
      />
      <Text
        style={{
          ...FONTS.h4,
          marginLeft: SIZES.padding,
        }}>
        {data[0]?.name}
      </Text>
    </View>
  );
};

export default InfoCard;
