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

const PostList = ({navigation, menu}) => {
  const renderItem = ({item}) => {
    // console.log(item?.cuisine?.image);
    //   const tt = like
    //     ? like
    //     : item?.favourite?.find(record => record.id_user === user);
    // console.log(tt);

    return (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate('Restaurant', {
        //     currentItem: item,
        //     currentCategory: getCategoryNameById(item.category),
        //   })
        // }
        onPress={() =>
          navigation.navigate('FoodDetail', {
            currentItem: item,
            //   like: like,
            idCuisine: item.id_cuisine,
          })
        }>
        <View
          style={{
            width: SIZES.width * 0.95,
            height: 200,
            elevation: 3,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: 'white',
            marginTop: SIZES.padding,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: SIZES.padding,
              justifyContent: 'space-between',
              alignItems: 'center',
              //   backgroundColor: 'red',
              width: '100%',
              paddingHorizontal: SIZES.padding,
              paddingTop: SIZES.padding,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={{
                  uri: `${DATABASE_URL_IMG}/users/${item?.user?.image}`,
                  // cache: 'force-cache',
                }}
                // source={require('../assets/icons/user.png')}
                style={{width: 35, height: 35, borderRadius: SIZES.radius}}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: 'bold',
                  paddingLeft: SIZES.padding,
                  color: 'black',
                  //   textAlign: 'auto',
                }}>
                {item?.user?.name}
              </Text>
            </View>
            <Text>
              {new Date(item.created_at)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')}
            </Text>
          </View>
          <View
            style={{
              //   backgroundColor: 'red',
              width: '100%',
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: 'black',
              }}>
              {item.title}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'gray',
              opacity: 0.8,
              flex: 1,
              width: '100%',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FoodDetail', {
                  currentItem: item?.cuisine,
                  idCuisine: item?.cuisine?.id,
                })
              }>
              <Image
                // source={require('../assets/images/nuong.png')}
                source={{
                  uri: `${DATABASE_URL_IMG}/cuisine/${item?.cuisine?.image}`,
                }}
                style={{width: '100%', height: 100, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: 40,
                backgroundColor: COLORS.darkgray,
                // opacity: 0.9,
                position: 'absolute',
                bottom: 0,
                borderBottomLeftRadius: SIZES.radius,
                borderBottomRightRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  ...FONTS.body2,
                  fontWeight: '700',
                }}>
                {item?.cuisine?.name}
              </Text>
            </View>
          </View>
        </View>
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
        numColumns={1}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={
          {
            // paddingLeft: 8,
            // paddingRight: 8,
            // paddingBottom: 16,
            // paddingTop: 16,
          }
        }
      />
    </View>
  );
};

export default PostList;
