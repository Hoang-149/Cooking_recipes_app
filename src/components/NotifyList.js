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

const NotifyList = ({navigation, onPresscallAllPost, menu}) => {
  const [idpost, setIdpost] = useState('');

  const onDelPress = () => {
    Alert.alert('Bạn có chắc?', 'Bạn có chắc muốn xóa bài chia sẻ này không?', [
      // The "Yes" button
      {
        text: 'Có',
        // onPress: () => {
        //   //   console.log(idpost.id);
        //   FoodApi.deletePost(idpost.id).then(response => {
        //     if (response.data.status === 200) {
        //       console.log(response.data.post);
        //       ToastAndroid.show(response.data.post, ToastAndroid.SHORT);
        //       onPresscallAllPost;
        //     } else {
        //       console.log(response.data.post);
        //       ToastAndroid.show(response.data.post, ToastAndroid.SHORT);
        //     }
        //   });
        // },
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
      <TouchableOpacity
        onPress={onDelPress}
        style={{
          flex: 1,
          backgroundColor: '#ccffbd',
          justifyContent: 'center',
          width: '10%',
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
            height: 60,
            elevation: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius * 0.5,
            backgroundColor: 'white',
            marginTop: SIZES.padding,
          }}>
          {item.status == 1 ? (
            <View
              style={{
                position: 'absolute',
                height: 10,
                width: 10,
                right: 5,
                top: 5,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
                borderRadius: 25,
              }}
            />
          ) : (
            ''
          )}
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: SIZES.padding,
            }}>
            <Image
              source={{
                uri: `${DATABASE_URL_IMG}/cuisine/${item?.cuisine.image}`,
                // cache: 'force-cache',
              }}
              resizeMode="contain"
              style={{
                width: 70,
                // backgroundColor: 'red',
                height: 70,
              }}
            />
            <Text
              style={{
                ...FONTS.body4,
                color: 'black',
                flex: 1,
                // backgroundColor: 'blue',
              }}>
              {item.content}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              height: 20,
              //   width: '50%',
              right: 5,
              bottom: 0,
              //   backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
              borderRadius: 25,
            }}>
            <Text
              style={{
                color: 'black',
                ...FONTS.body5,
              }}>
              {new Date(item?.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
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

export default NotifyList;
