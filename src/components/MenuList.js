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

const MenuList = ({
  navigation,
  menu,
  // onPressFavourite,
  // favorites,
  // categorySelected,
  // categories,
}) => {
  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id);
    if (category.length > 0) {
      return category[0].name;
    } else return '';
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate('Restaurant', {
        //     currentItem: item,
        //     currentCategory: getCategoryNameById(item.category),
        //   })
        // }
        onPress={() => navigation.navigate('FoodDetail')}
        style={{
          width: SIZES.width * 0.5 - 24,
          height: 200,
          elevation: 3,
          alignItems: 'center',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          margin: 8,
        }}>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={{width: '70%', height: '70%'}}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.black,
              textAlign: 'center',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary,
            }}>
            {item.view}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            top: 14,
            right: 14,
            position: 'absolute',
          }}
          onPress={() => {
            onPressFavourite(item);
          }}>
          <Image
            source={icons.like}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.darkgray,
              // tintColor: favorites.includes(item.name)
              //   ? 'red'
              //   : COLORS.darkgray,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* {!categorySelected ? (
        <Text style={{...FONTS.h3, paddingLeft: 16, paddingBottom: 8}}>
          Món ăn nổi bật
        </Text>
      ) : null} */}
      <Text style={{...FONTS.h3, paddingLeft: 16, paddingBottom: 8}}>
        Món ăn nổi bật
      </Text>
      <FlatList
        data={menu}
        numColumns={2}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 16,
          paddingTop: 16,
        }}
      />
    </View>
  );
};

export default MenuList;
