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
import React, {useState} from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FoodApi from '../constants/option';

const PostList2 = ({navigation, onPresscallAllPost, menu}) => {
  const [idpost, setIdpost] = useState('');

  const onDelPress = () => {
    Alert.alert('Bạn có chắc?', 'Bạn có chắc muốn xóa bài chia sẻ này không?', [
      // The "Yes" button
      {
        text: 'Có',
        onPress: () => {
          //   console.log(idpost.id);
          FoodApi.deletePost(idpost.id).then(response => {
            if (response.data.status === 200) {
              console.log(response.data.post);
              ToastAndroid.show(response.data.post, ToastAndroid.SHORT);
              onPresscallAllPost;
            } else {
              console.log(response.data.post);
              ToastAndroid.show(response.data.post, ToastAndroid.SHORT);
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

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UpdatePostScreen', {currentItem: idpost})
          }
          style={{
            backgroundColor: '#ff8303',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '50%',
          }}>
          <Text
            style={{
              //   ...FONTS.body3,
              color: '#1b1a17',
              paddingHorizontal: 10,
              fontWeight: '600',
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}>
            Cập nhật
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelPress}
          style={{
            flex: 1,
            backgroundColor: '#ccffbd',
            justifyContent: 'center',
            width: '50%',
          }}>
          <Text
            style={{
              //   ...FONTS.body3,
              color: '#40394a',
              paddingHorizontal: 10,
              fontWeight: '600',
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}>
            Xóa
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const swipeFromRightOpen = item => {
    setIdpost(item);
    // console.log(item);
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => swipeFromRightOpen(item)}>
        <View
          style={{
            width: SIZES.width * 0.95,
            height: 200,
            elevation: 10,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: 'white',
            marginTop: SIZES.padding,
          }}>
          <View
            style={{
              position: 'absolute',
              height: 20,
              width: '25%',
              right: 0,
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
              {item.status == 1 ? 'Đã duyệt' : 'Chưa duyệt'}
            </Text>
          </View>
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
                  // paddingVertical: SIZES.padding,
                  color: 'black',
                  //   textAlign: 'auto',
                }}>
                {item?.user?.name}
              </Text>
            </View>
            <Text
              style={{
                ...FONTS.body5,
                color: 'black',
              }}>
              {new Date(item?.updated_at).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
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
              paddingVertical: SIZES.padding,
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
                paddingVertical: SIZES.padding,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: 'white',
                  ...FONTS.body3,
                  fontWeight: '700',
                  // paddingVertical: SIZES.padding,
                }}>
                {item?.cuisine?.name}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
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
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          {
            // paddingLeft: 8,
            // paddingRight: 8,
            // paddingBottom: 16,
            // paddingTop: 16,
            // backgroundColor: 'red',
          }
        }
      />
    </View>
  );
};

export default PostList2;
