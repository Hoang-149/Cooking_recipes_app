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

const OptionList = ({categories, selectedCategory, onSelectedCategory}) => {
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
          backgroundColor: COLORS.white,
          // selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
        }}
        // onPress={() => onSelectedCategory(item)}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightGray,
            // selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 45,
              width: 45,
            }}
          />
        </View>
        <Text
          style={{
            color:
              selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
            textAlign: 'center',
            ...FONTS.h5,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{padding: SIZES.padding * 2, paddingBottom: 0}}>
      <Text style={{...FONTS.h3}}>Chủ đề</Text>
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
