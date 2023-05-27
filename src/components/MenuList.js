import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';

const MenuList = ({
  navigation,
  menu,
  onPressFavourite,
  user,
  like,
  categorySelected,
  categories,
}) => {
  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id);
    if (category.length > 0) {
      return category[0].name;
    } else return '';
  }

  const renderItem = ({item}) => {
    // console.log(item.id_cuisine);
    const tt = like
      ? like
      : item?.favourite?.find(record => record.id_user === user);
    // console.log(tt);
    // console.log(item.favourite_count);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FoodDetail', {
            currentItem: item,
            like: like,
            idCuisine: item.id_cuisine,
          })
        }
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
          source={{
            uri: `${DATABASE_URL_IMG}/cuisine/${item?.image}`,
            // cache: 'force-cache',
          }}
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
            {item.duration} phút
          </Text>
        </View>
        <TouchableOpacity
          style={{
            top: 14,
            right: 14,
            position: 'absolute',
            flexDirection: 'row',
          }}
          // onPress={() => {
          //   onPressFavourite(tt);
          // }}
        >
          <Image
            source={icons.like}
            style={{
              width: 20,
              height: 20,
              tintColor: tt ? 'red' : COLORS.darkgray,
            }}
          />
          {item.favourite_count > 0 ? (
            <Text
              style={{
                ...FONTS.body3,
                color: 'black',
                paddingLeft: SIZES.padding * 0.3,
              }}>
              {item.favourite_count}
            </Text>
          ) : (
            ''
          )}
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
