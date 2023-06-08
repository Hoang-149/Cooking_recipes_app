import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';
import HeaderProfile from '../components/HeaderProfile';
import MenuList from '../components/MenuList';
import {useSelector} from 'react-redux';
import PostList from '../components/PostList';
import PostList2 from '../components/PostList2';

const MyShareScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callAllPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      callAllPosts();
    });

    return unsubscribe;
  }, [navigation]);

  const callAllPosts = () => {
    FoodApi.getPostOfUer(user?.id).then(res => {
      const newPostList = res.data.post;
      // console.log(res.data.post);

      setPostList(newPostList);
      setLoading(false);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Chia Sẻ Công Thức'} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{flex: 1}}
        />
      ) : (
        <View
          style={{
            marginHorizontal: SIZES.padding,
            flex: 1,
          }}>
          <PostList2
            navigation={navigation}
            onPresscallAllPost={callAllPosts}
            menu={postList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyShareScreen;
