import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import {commentValidator} from '../helpers/nameValidator';
import FoodApi from '../constants/option';
import {useSelector} from 'react-redux';
import Comments from './Comments';
import CommentPosts from './CommentPosts';

const PostList = ({navigation, allComment, menu, callAllPost}) => {
  const {user} = useSelector(state => state.userReducer);

  const [comment, setComment] = useState({value: '', error: ''});

  const onCommentPressed = async item => {
    const commentError = commentValidator(comment.value);
    if (commentError) {
      setComment({...comment, error: commentError});
      return;
    }

    const dataComment = {
      id_user: user.id,
      id_post: item,
      content: comment.value,
    };

    // console.log(dataComment);
    // setComment('');

    FoodApi.postCommentPost(dataComment).then(response => {
      if (response.data.status === 200) {
        console.log(response.data.message);
        ToastAndroid.show('Bình luận thành công', ToastAndroid.SHORT);
        setComment('');
        callAllPost();
      } else {
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: SIZES.width * 0.95,
          // height: 200,
          elevation: 1,
          alignItems: 'center',
          borderRadius: SIZES.radius * 0.5,
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
            // backgroundColor: 'red',
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
            backgroundColor: COLORS.lightGray2,
            // opacity: 0.8,
            flex: 1,
            width: '100%',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            paddingVertical: SIZES.padding,
          }}>
          <TouchableOpacity
            style={
              {
                // tex: '',
              }
            }
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
              opacity: 0.8,
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

        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              fontSize: 16,
              fontWeight: 'bold',
              // paddingBottom: SIZES.padding,
            }}>
            Bình luận
          </Text>
        </View>

        <View
          style={{
            // marginTop: 50,
            // backgroundColor: 'blue',
            width: '95%',
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}>
          {allComment.map((comment, i) => (
            <CommentPosts
              key={i}
              comment={comment}
              callAllComment={callAllPost}
              userCuisine={item?.user?.id}
            />
          ))}
        </View>

        {/* {allComment.map(comment => (
              <Text key={comment.id}>{comment.content}</Text>
            ))} */}
        {user ? (
          <View
            style={{
              // marginTop: 50,
              // backgroundColor: 'blue',
              width: '90%',
              marginHorizontal: SIZES.padding * 3,
              marginVertical: SIZES.padding,
            }}>
            <TextInput
              placeholder="Hãy viết một điều gì đó"
              multiline={true}
              value={comment.value}
              onChangeText={text => setComment({value: text, error: ''})}
              error={!!comment.error}
              errorText={comment.error}
              autoCapitalize="none"
              borderBottomColor="green"
              borderBottomWidth={3}
              // borderLeftColor="green"
              // borderLeftWidth={3}
              // borderRightColor="green"
              // borderRightWidth={3}
              style={{
                padding: 10,
                ...FONTS.body3,
                height: 40,
                // borderColor: COLORS.darkgray,
                // borderWidth: 1,
                textAlignVertical: 'top',
              }}
            />

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 10,
                right: 8,
                alignItems: 'center',
                // alignSelf: 'center',
              }}
              onPress={() => onCommentPressed(item.id)}>
              <Image
                source={icons.send}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: comment.value ? 'blue' : COLORS.secondary,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
      </View>
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

export default PostList;
