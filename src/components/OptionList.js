import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';

const OptionList = ({categories, onSelectedCategory, selectedCategory}) => {
  // console.log(selectedCategory);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: SIZES.radius,
          marginRight: SIZES.padding,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          backgroundColor:
            selectedCategory == item.id ? COLORS.primary : COLORS.white,
        }}
        onPress={() => onSelectedCategory(item.id)}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory == item.id ? COLORS.white : COLORS.lightGray,
          }}>
          <Image
            source={{
              uri: `${DATABASE_URL_IMG}/cate/${item?.image}`,
              // cache: 'force-cache',
            }}
            resizeMode="contain"
            style={{
              height: 45,
              width: 45,
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            ...FONTS.h5,
            color: selectedCategory == item.id ? COLORS.white : COLORS.black,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        paddingBottom: 0,
      }}>
      <FlatList
        data={categories}
        key={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: SIZES.padding * 2,
          paddingLeft: 2,
        }}
      />
    </View>
  );
};

export default OptionList;
