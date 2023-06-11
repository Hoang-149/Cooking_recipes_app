import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import {useSelector} from 'react-redux';
import FoodApi from '../constants/option';

const CommentList = ({postId, allComment, onCommentDeleted, idUserPost}) => {
  const {user} = useSelector(state => state.userReducer);

  const comments = allComment.filter(comment => comment.postId === postId);

  // console.log('comments', comments);

  const [displayReplay, setDisplayReplay] = useState('none');
  const [displayUpdate, setDisplayUpdate] = useState('none');
  const [displayEdit, setDisplayEdit] = useState('flex');
  const [displayDelete, setDisplayDelete] = useState('flex');

  // const textInputRef = useRef(null);
  const [editable, setEditable] = useState(false);

  //   console.log(comments);
  const onDelCommentPress = (id_user_cm, id_comment) => {
    Alert.alert('Bạn có chắc?', 'Bạn có chắc muốn xóa bình luận này không?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          if (id_user_cm === user?.id || idUserPost === user?.id) {
            FoodApi.deleteComment(id_comment).then(response => {
              if (response.data.status === 200) {
                console.log(response.data.message);
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                // callAllComment();
              } else {
                console.log(response.data.message);
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              }
              onCommentDeleted(postId);
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
    ]);
  };

  const onDisplayUpdate = () => {
    setDisplayUpdate('flex');
    setDisplayEdit('none');
    setDisplayDelete('none');
  };

  const onHideUpdate = () => {
    setDisplayUpdate('none');
    setDisplayEdit('flex');
    setDisplayDelete('flex');
    setEditable(false);
  };

  const onDisplayReplayPress = commentid => {
    if (displayReplay == 'none') {
      setDisplayReplay('flex');
      setIdCommeent(commentid);
    } else {
      setDisplayReplay('none');
      setIdCommeent('');
    }
  };

  const onEditCommentPress = (id_user_cm, id_comment) => {
    if (id_user_cm === user?.id) {
      setEditable(true);
      // if (textInputRef.current) {
      //   textInputRef.current.focus();
      // }
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
          setEditable(!editable);
          onHideUpdate();
          callAllComment();
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
        // backgroundColor: 'red',
        // height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {comments?.[0]?.comments?.map((comment, index) => (
        <View
          key={comment.id}
          style={{
            // backgroundColor: 'blue',
            // height: 50,
            width: '100%',
          }}>
          {/* <Text>{comment.content}</Text> */}
          <View
            style={{
              flexDirection: 'column',
              paddingBottom: SIZES.padding,
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: COLORS.lightGray,
                paddingVertical: SIZES.padding,
                borderRadius: 10,
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
                    paddingRight: SIZES.padding * 0.5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    {comment.user.name}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body5,
                      color: 'black',
                    }}>
                    {new Date(comment.updated_at).toLocaleString('en-US', {
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
                    paddingLeft: SIZES.padding,
                  }}>
                  <TextInput
                    // ref={textInputRef}
                    onFocus={onDisplayUpdate}
                    onBlur={onHideUpdate}
                    value={comment.content}
                    multiline={true}
                    onChangeText={text => setContent(text)}
                    editable={editable}
                    style={{
                      paddingVertical: 0,
                      color: 'black',
                    }}
                  />
                </View>
              </View>
            </View>
            {user ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: SIZES.padding * 2,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {/* <TouchableOpacity
                  //  onPress={() => onDisplayReplayPress(comment.id)}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        paddingRight: SIZES.padding,
                        ...FONTS.h5,
                      }}>
                      Phản hồi
                    </Text>
                  </TouchableOpacity> */}
                  {/* {comment.id_user === user?.id ? (
                    <TouchableOpacity
                      onPress={() =>
                        // onEditCommentPress(comment.id_user, comment.id)
                      }>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          ...FONTS.h5,
                          paddingRight: SIZES.padding,
                          display: `${displayEdit}`,
                        }}>
                        Sửa
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    ''
                  )} */}

                  {comment.id_user === user?.id || idUserPost === user?.id ? (
                    <TouchableOpacity
                      onPress={() =>
                        onDelCommentPress(comment.id_user, comment.id)
                      }>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          ...FONTS.h5,
                          display: `${displayDelete}`,
                        }}>
                        Xóa
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
                          ...FONTS.h5,

                          display: 'none',
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
            ) : (
              ''
            )}
          </View>
          {/* <View
            style={
              {
                // display: `${displayReplay}`,
              }
            }>
            <TextInput
              multiline={true}
              // value={replayContent.value}
              // onChangeText={text => setReplayContent({value: text, error: ''})}
              // error={!!replayContent.error}
              // errorText={replayContent.error}
              style={{
                paddingVertical: 5,
                color: 'black',
                backgroundColor: COLORS.lightGray,
                // opacity: 0.5,
                borderRadius: 10,
                marginLeft: SIZES.padding,
                paddingLeft: SIZES.padding,
                paddingRight: SIZES.padding * 3,
                // marginTop: SIZES.padding * 0.5,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 12,
                right: 5,
                alignItems: 'center',
                // alignSelf: 'center',
              }}
              // onPress={onReplayPress}
            >
              <Image
                source={icons.send}
                style={{
                  width: 24,
                  height: 24,
                  // tintColor: favourite ? 'red' : COLORS.darkgray,
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      ))}
    </View>
  );
};

export default CommentList;
