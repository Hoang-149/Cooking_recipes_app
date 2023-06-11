import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import {commentValidator} from '../helpers/nameValidator';
import FoodApi from '../constants/option';
import {useSelector} from 'react-redux';
import CommentList from './CommentList';

const PostList = ({
  navigation,
  allComment,
  menu,
  callAllPost,
  getCommentPost,
  refreshing,
  onRefresh,
  onCommentDeleted,
}) => {
  const {user} = useSelector(state => state.userReducer);

  const [comment, setComment] = useState({value: '', error: ''});

  const onCommentPressed = async postId => {
    const commentError = commentValidator(comment.value);
    if (commentError) {
      setComment({...comment, error: commentError});
      return;
    }

    const dataComment = {
      id_user: user.id,
      id_post: postId,
      content: comment.value,
    };

    FoodApi.postCommentPost(dataComment).then(response => {
      if (response.data.status === 200) {
        ToastAndroid.show('Bình luận thành công', ToastAndroid.SHORT);
        setComment({value: '', error: ''});

        // const newComment = response.data.comment;

        getCommentPost(postId);
        // callAllPost();
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: SIZES.width * 0.95,
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
            width: '100%',
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: `${DATABASE_URL_IMG}/users/${item?.user?.image}`,
              }}
              style={{width: 35, height: 35, borderRadius: SIZES.radius}}
            />
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: 'bold',
                paddingLeft: SIZES.padding,
                color: 'black',
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
              }}>
              {item?.cuisine?.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Bình luận
          </Text>
        </View>

        <View
          style={{
            width: '95%',
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}>
          <CommentList
            postId={item.id}
            allComment={allComment}
            onCommentDeleted={onCommentDeleted}
            idUserPost={item?.user?.id}
          />
        </View>

        {user && (
          <View
            style={{
              width: '90%',
              marginHorizontal: SIZES.padding * 3,
              marginBottom: SIZES.padding,
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
              borderBottomWidth={1}
              style={{
                padding: 10,
                ...FONTS.body3,
                height: 40,
                textAlignVertical: 'top',
              }}
            />

            <TouchableOpacity
              onPress={() => onCommentPressed(item.id)}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 2,
                alignItems: 'center',
              }}>
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
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={menu}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} // Call your refresh function here
          />
        }
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default PostList;
