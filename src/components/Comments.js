import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {FONTS, SIZES} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import {useSelector} from 'react-redux';
import FoodApi from '../constants/option';

const Comments = ({comment, callAllComment, userCuisine}) => {
  const {user} = useSelector(state => state.userReducer);

  // const refInput = useRef(null);
  const [displayUpdate, setDisplayUpdate] = useState('none');
  const [displayEdit, setDisplayEdit] = useState('flex');
  const [displayDelete, setDisplayDelete] = useState('flex');
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  const onDisplayUpdate = () => {
    setDisplayUpdate('flex');
    setDisplayEdit('none');
    setDisplayDelete('none');
  };

  const onHideUpdate = () => {
    setDisplayUpdate('none');
    setDisplayEdit('flex');
    setDisplayDelete('flex');
  };

  const onDelCommentPress = (id_user_cm, id_comment) => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete this comment?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            if (id_user_cm === user?.id || userCuisine[0]?.id === user?.id) {
              FoodApi.deleteComment(id_comment).then(response => {
                if (response.data.status === 200) {
                  console.log(response.data.message);
                  ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                  callAllComment();
                } else {
                  console.log(response.data.message);
                  ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                }
              });
            } else {
              ToastAndroid.show(
                'Bạn không thể xóa bình luận',
                ToastAndroid.SHORT,
              );
            }
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const onEditCommentPress = (id_user_cm, id_comment) => {
    if (id_user_cm === user?.id) {
      setEditable(!editable);
    } else {
      ToastAndroid.show(
        'Bạn không thể chỉnh sửa bình luận',
        ToastAndroid.SHORT,
      );
    }
  };

  const onUpdateCommentPress = (id_user_cm, id_comment) => {
    if (id_user_cm === user?.id) {
      // refInput.current.focus();

      const dataComment = {
        content: content,
      };
      // console.log(dataComment);

      FoodApi.updateComment(id_comment, dataComment).then(response => {
        if (response.data.status === 200) {
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          callAllComment();
          onHideUpdate();
          setEditable(!editable);
        } else {
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      });
    } else {
      ToastAndroid.show(
        'Bạn không thể chỉnh sửa bình luận',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: SIZES.padding,
      }}>
      <Image
        source={{
          uri: `${DATABASE_URL_IMG}/users/${comment.user.image}`,
          // cache: 'force-cache',
        }}
        style={{width: 35, height: 35, borderRadius: SIZES.radius}}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '700',
              color: 'black',
            }}>
            {comment.user.name}
          </Text>
          <Text>
            {new Date(comment.created_at)
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')}
          </Text>
        </View>
        <View
          style={{
            paddingLeft: SIZES.padding,
          }}>
          <TextInput
            // ref={refInput}
            onFocus={onDisplayUpdate}
            onBlur={onHideUpdate}
            value={content}
            onChangeText={text => setContent(text)}
            editable={editable}
            style={{
              paddingVertical: 0,
              color: 'black',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: SIZES.padding,
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity onPress={() => refInput.current.focus()}> */}
            {/* <TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                Reply
              </Text>
            </TouchableOpacity> */}
            {comment.id_user === user?.id ? (
              <TouchableOpacity
                onPress={() => onEditCommentPress(comment.id_user, comment.id)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    // paddingLeft: SIZES.padding,
                    display: `${displayEdit}`,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            {comment.id_user === user?.id || userCuisine[0]?.id === user?.id ? (
              <TouchableOpacity
                onPress={() => onDelCommentPress(comment.id_user, comment.id)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: SIZES.padding,
                    display: `${displayDelete}`,
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            {comment.id_user === user?.id ? (
              <TouchableOpacity
                onPress={() =>
                  onUpdateCommentPress(comment.id_user, comment.id)
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    display: `${displayUpdate}`,
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comments;
