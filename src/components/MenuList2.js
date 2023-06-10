import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';

const MenuList2 = ({
  navigation,
  menu,
  onPresscallAllRecipes,
  user,
  like,
  categorySelected,
  categories,
}) => {
  const onDelPress = item => {
    Alert.alert('Bạn có chắc?', 'Bạn có chắc muốn xóa món này không?', [
      // The "Yes" button
      {
        text: 'Có',
        onPress: () => {
          FoodApi.deleteCuisine(item).then(response => {
            if (response.data.status === 200) {
              console.log(response.data.cuisine);
              ToastAndroid.show(response.data.cuisine, ToastAndroid.SHORT);
              onPresscallAllRecipes;
            } else {
              console.log(response.data.cuisine);
              ToastAndroid.show(response.data.cuisine, ToastAndroid.SHORT);
            }
          });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'Không',
      },
    ]);
  };

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
        onLongPress={() => onDelPress(item.id)}
        style={{
          width: SIZES.width * 0.5 - 24,
          height: 200,
          elevation: 3,
          alignItems: 'center',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          margin: 8,
        }}>
        <View
          style={{
            position: 'absolute',
            height: 20,
            width: '50%',
            left: 0,
            top: 0,
            backgroundColor: item.status == 1 ? COLORS.primary : 'red',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            borderRadius: 25,
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            {item.status == 1 ? 'Đã duyệt' : 'Chờ duyệt'}
          </Text>
        </View>

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
              height: 36,
              // backgroundColor: 'red',
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
            top: 6,
            right: 36,
            position: 'absolute',
            flexDirection: 'row',
          }}
          onPress={() =>
            navigation.navigate('UpdateCuisineScreen', {
              currentItem: item,
              stt: '0',
            })
          }>
          <Image
            source={icons.edit}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            top: 6,
            right: 10,
            position: 'absolute',
            flexDirection: 'row',
          }}
          onPress={() => onDelPress(item.id)}>
          <Image
            source={icons.trash}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
              paddingLeft: SIZES.padding,
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

export default MenuList2;
