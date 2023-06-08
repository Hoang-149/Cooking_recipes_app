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
import PostList from '../components/PostList';

const UserPostScreen = ({navigation, route}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const {userItem} = route.params;
    // console.log(userItem);
    setUser(userItem);
    console.log(user);

    FoodApi.getPostOfUer(user?.id).then(res => {
      const newCuisineList = res.data.post;
      // console.log(res.data.cuisine);

      setCuisineList(newCuisineList);
      setLoading(false);
    });
  }, [user?.id]);

  const [cuisineList, setCuisineList] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Bài Đăng'} />
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
          <PostList navigation={navigation} menu={cuisineList} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserPostScreen;
