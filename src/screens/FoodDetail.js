import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Animated,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {CustomButton} from '../components/CustomButton';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';
import InfoCard from '../components/InfoCard';
import {commentValidator} from '../helpers/nameValidator';
import {useSelector} from 'react-redux';
import Comments from '../components/Comments';

const BANNER_H = 350;

const FoodDetail = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState(null);
  const [idCuisine, setIdCuisine] = useState(null);
  // console.log(item.ingredients);

  const [comment, setComment] = useState({value: '', error: ''});
  const [userCuisine, setUserCuisine] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const [callFavourite, setCallFavourite] = useState([]);

  const scrollA = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const {currentItem, like, idCuisine} = route.params;
    // console.log(currentItem);
    setItem(currentItem);
    setFavourite(like ? true : false);
    setIdCuisine(idCuisine);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   FoodApi.getUserCuisine(item?.user_id).then(res => {
  //     const newUserCuisine = res.data.usercuisine;

  //     // console.log(res.data.usercuisine);

  //     setUserCuisine(newUserCuisine);
  //   });
  // }, [item?.user_id]);

  useEffect(() => {
    callAllComment();
    getFavourite();
  }, [item?.id]);

  let nameFavorite = `${user.id}${idCuisine ? idCuisine : item?.id}`;
  // console.log(nameFavorite);

  const getFavourite = () => {
    FoodApi.getFavourite(nameFavorite).then(response => {
      if (response.data.status === 200) {
        // console.log(response.data.favourites);
        const ahihi = response?.data?.favourites?.find(favourite =>
          favourite.id_cuisine == idCuisine
            ? idCuisine
            : item?.id && favourite.id_user == user.id,
        );
        // console.log('FIND', ahihi);
        // console.log(item.id);
        // console.log(user.id);
        // console.log(ahihi?.id);
        if (ahihi) {
          setCallFavourite(ahihi?.id);
          setFavourite(true);
        }
      } else {
        // console.log(response.data.favourites);
      }
    });
  };

  const onPressFavourite = favoriteItem => {
    // console.log(callFavourite);
    if (user) {
      if (favourite) {
        // console.log(callFavourite);
        FoodApi.deleteFavourite(callFavourite).then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            // console.log(response.data.message);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            getFavourite();
            setFavourite(!favourite);
          } else {
            console.log(response.data.message);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        });
      } else {
        const dataAddFavourite = {
          name: `${user?.id}${favoriteItem}`,
          id_user: user?.id,
          id_cuisine: favoriteItem,
        };

        // console.log(dataAddFavourite);

        FoodApi.postFavourite(dataAddFavourite).then(response => {
          if (response.data.status === 200) {
            // console.log(response.data.message);
            ToastAndroid.show('Đã Yêu Thích', ToastAndroid.SHORT);
            setFavourite(!favourite);
            getFavourite();
          } else {
            // console.log(response.data.message);
            ToastAndroid.show('Đã Bỏ Yêu Thích', ToastAndroid.SHORT);
          }
        });
      }
    }
  };

  const callAllComment = () => {
    FoodApi.getComment(idCuisine ? idCuisine : item?.id).then(response => {
      const newCommentList = response.data.comments;

      // console.log(response.data.comments);

      setAllComment(newCommentList);
    });
  };

  const onPressUser = () => {
    if (item?.user?.id == user?.id) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('ProfileUserScreen', {
        userItem: item?.user,
      });
    }
  };

  const onCommentPressed = async () => {
    const commentError = commentValidator(comment.value);
    if (commentError) {
      setComment({...comment, error: commentError});
      return;
    }

    const dataComment = {
      id_user: user.id,
      id_cuisine: item?.id,
      content: comment.value,
    };

    // console.log(dataComment);

    FoodApi.postComment(dataComment).then(response => {
      if (response.data.status === 200) {
        console.log(response.data.message);
        ToastAndroid.show('Bình luận thành công', ToastAndroid.SHORT);
        setComment('');
        callAllComment();
      } else {
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  function renderHeader() {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            left: 10,
            top: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: COLORS.lightGray,
            // flex: 99,
            zIndex: 999,
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.black,
              backgroundColor: 'red',
              zIndex: 999,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function renderFoodInfor() {
    return (
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View style={styles.bannerContainer}>
          <Animated.Image
            source={{
              uri: `${DATABASE_URL_IMG}/cuisine/${item?.image}`,
              // cache: 'force-cache',
            }}
            style={styles.banner(scrollA)}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            elevation: 5,
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
          <View
            style={{
              // borderBottomWidth: 1,
              // borderBottomColor: COLORS.lightGray3,
              flexDirection: 'row',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 2,
              flex: 10,
            }}>
            <Text
              style={{
                ...FONTS.h2,
                paddingRight: SIZES.padding * 2,
                flex: 8,
              }}>
              {item?.name}
            </Text>
            <TouchableOpacity
              style={{alignItems: 'center', alignSelf: 'center'}}
              onPress={() => {
                onPressFavourite(item?.id);
              }}>
              <Image
                source={icons.like}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: favourite ? 'red' : COLORS.darkgray,
                }}
              />
            </TouchableOpacity>
          </View>
          {item?.youtubeURL || item?.websiteURL ? (
            <View
              style={{
                paddingHorizontal: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
                flexDirection: 'row',
                flex: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item?.youtubeURL ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.lightGray3,
                    flex: 5,
                    alignItems: 'center',
                    paddingVertical: SIZES.padding,
                  }}>
                  <TouchableOpacity
                    style={{alignItems: 'center', alignSelf: 'center'}}
                    onPress={() => {
                      Linking.openURL(item?.youtubeURL);
                    }}>
                    <Image
                      source={icons.youtube}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                ''
              )}
              {item?.websiteURL ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.lightGray3,
                    flex: 5,
                    alignItems: 'center',
                    paddingVertical: SIZES.padding,
                  }}>
                  <TouchableOpacity
                    style={{alignItems: 'center', alignSelf: 'center'}}
                    onPress={() => {
                      Linking.openURL(item?.websiteURL);
                    }}>
                    <Image
                      source={icons.google}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                ''
              )}
            </View>
          ) : (
            ''
          )}

          {/* <InfoCard data={userCuisine} /> */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              backgroundColor: COLORS.primary,
            }}>
            <TouchableOpacity onPress={() => onPressUser()}>
              <Image
                source={{
                  uri: `${DATABASE_URL_IMG}/users/${item?.user?.image}`,
                  // cache: 'force-cache',
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: SIZES.radius,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
                color: '#d9d9d9',
              }}>
              {item?.user?.name}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: SIZES.padding * 2,
              paddingVertical: SIZES.padding,
              flexDirection: 'row',
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightGray3,
                flex: 5,
                alignItems: 'center',
                paddingVertical: SIZES.padding,
              }}>
              <Text
                style={{
                  ...FONTS.h5,
                }}>
                Thời gian nấu
              </Text>
              <Text> {item?.duration} phút</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightGray3,
                flex: 5,
                alignItems: 'center',
                paddingVertical: SIZES.padding,
              }}>
              <Text
                style={{
                  ...FONTS.h5,
                }}>
                Mức độ
              </Text>
              <Text> {item?.difficulty}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              // borderBottomWidth: 1,
              // borderBottomColor: COLORS.lightGray3,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: 'bold',
              }}>
              Thành phần
            </Text>
            {/* <Text
              style={{
                ...FONTS.body5,
                marginLeft: SIZES.padding,
              }}>
              Khẩu phần: 1 người
            </Text> */}
          </View>
          <View
            style={{
              // backgroundColor: 'blue',
              paddingHorizontal: SIZES.padding * 2,
            }}>
            {item?.ingredients.split('\n').map(item => (
              <View
                key={item}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.lightGray3,
                  flexDirection: 'column',
                  paddingVertical: SIZES.padding,
                  flexDirection: 'row',

                  // justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'red',
                    paddingRight: 18,
                  }}>
                  {'\u2B24'}
                </Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: 'bold',
                paddingBottom: SIZES.padding * 0.5,
              }}>
              Hướng dẫn thực hiện
            </Text>
            <View
              style={
                {
                  // backgroundColor: 'blue',
                  // paddingHorizontal: SIZES.padding * 2,
                }
              }>
              {item?.steps.split('\n').map(item => (
                <View
                  key={item}
                  style={{
                    flexDirection: 'column',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      textAlign: 'justify',
                      flex: 1,
                      flexWrap: 'wrap',
                    }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                fontSize: 16,
                fontWeight: 'bold',
                paddingBottom: SIZES.padding,
              }}>
              Bình luận
            </Text>

            {allComment.map((comment, i) => (
              <Comments
                key={i}
                comment={comment}
                callAllComment={callAllComment}
                userCuisine={item?.user?.id}
              />
            ))}

            <View>
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
                borderLeftColor="green"
                borderLeftWidth={3}
                borderRightColor="green"
                borderRightWidth={3}
                style={{
                  padding: 10,
                  ...FONTS.body3,
                  height: 100,
                  borderTopColor: COLORS.darkgray,
                  borderWidth: 1,
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
                onPress={onCommentPressed}>
                <Image
                  source={icons.send}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: comment.value ? 'blue' : COLORS.secondary,
                  }}
                />
              </TouchableOpacity>
              {/* <View
                style={{
                  flex: 10,
                  marginTop: SIZES.padding,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 8}}></View>
                <TouchableOpacity onPress={onCommentPressed}>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      padding: SIZES.padding,
                      borderRadius: SIZES.padding * 0.5,
                      backgroundColor: COLORS.primary,
                      backgroundColor: comment.value
                        ? COLORS.primary
                        : COLORS.secondary,
                    }}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: 'white',
                      }}>
                      Bình luận
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>

          <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
            <CustomButton
              text={'Chia sẻ'}
              onPressButton={() =>
                navigation.navigate('CreatePostScreen', {cuisineCurrent: item})
              }
            />
          </View>
        </View>
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray4}}>
      {/* {renderHeader()} */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{flex: 1}}
        />
      ) : (
        renderFoodInfor()
      )}
    </SafeAreaView>
  );
};

const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '100%',
    // backgroundColor: 'blue',
    // zIndex: -1,
    // resizeMode: 'contain',

    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};

export default FoodDetail;
