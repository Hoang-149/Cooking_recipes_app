import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {COLORS, optionData, foodData, FONTS, SIZES} from '../constants';
import HomeHeader from '../components/HomeHeader';
import OptionList from '../components/OptionList';
import MenuList from '../components/MenuList';
import {useSelector} from 'react-redux';
import FoodApi from '../constants/option';
import {SliderBox} from 'react-native-image-slider-box';
import SearchBar from 'react-native-dynamic-search-bar';
import {DATABASE_URL_IMG, LOCAL_URL} from '../constants/database';
import {Image} from 'react-native-svg';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cuisineList, setCuisineList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    callCate();
    callCuisine();
    callBanner();
    // getFavourite();
    // updateProductApproval(3);
  }, []);

  const callCuisine = () => {
    FoodApi.getLimitCuisine().then(res => {
      const newCuisineList = res.data.cuisine;
      // console.log(res.data.cuisine);

      setCuisineList(newCuisineList);
      setLoading(false);

      setRefreshing(false);
    });
  };

  const callCate = () => {
    FoodApi.getAllCategory().then(res => {
      const newCateList = res.data.category;
      // console.log(res.data.category);
      setCategoryList(newCateList);
      setRefreshing(false);
    });
  };

  const callBanner = () => {
    FoodApi.getAllBanner().then(res => {
      const newBannerList = res.data.banner;
      // console.log(res.data.banner);

      setBannerList(newBannerList);
      setLoading(false);

      setRefreshing(false);
    });
  };

  const onRefresh = useCallback(() => {
    // setCategoryList([]);
    // setCuisineList([]);
    setRefreshing(true);
    callCate();
    callCuisine();
  }, [refreshing]);

  const getFavourite = () => {
    if (user) {
      FoodApi.getAllFavourite(user.id).then(res => {
        const newFavouriteList = res.data.favourites;
        // console.log(res.data.cuisine);

        setFavorites(newFavouriteList);
      });
    }
  };

  function addToFavourite(favoriteItem) {
    if (user) {
      const dataAddFavourite = {
        name: `${user.id}${favoriteItem}`,
        id_user: user.id,
        id_cuisine: favoriteItem,
      };

      // console.log(dataAddFavourite);

      FoodApi.postFavourite(dataAddFavourite).then(response => {
        if (response.data.status === 200) {
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          getFavourite();
        } else {
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      });
    }
  }

  const onSelectedCategory = category => {
    navigation.navigate('AllCuisineScreen', {idCate: category});

    setSelectedCategory(category);
  };

  const updateProductApproval = async productId => {
    try {
      const response = await axios.post(
        `${LOCAL_URL}/web/cuisine/update/${productId}`,
      );
      // Handle success
      console.log(response.data.message);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.lightGray4,
    //     paddingTop: 2,
    //   }}>
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        paddingTop: 2,
      }}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HomeHeader user={user} />

      <View
        style={{
          marginTop: SIZES.padding * 2,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            paddingLeft: SIZES.padding,
            fontWeight: '700',
          }}>
          Chủ đề
        </Text>

        <OptionList
          navigation={navigation}
          categories={categoryList}
          onSelectedCategory={onSelectedCategory}
          // selectedCategory={selectedCategory}
        />
      </View>

      {bannerList ? (
        <View
          style={{
            marginHorizontal: SIZES.padding,
            // backgroundColor: 'red',
            marginBottom: SIZES.padding * 2,
          }}>
          <View
            style={{
              // marginLeft: SIZES.padding * 2,
              // marginRight: SIZES.padding * 2,
              // marginBottom: SIZES.padding,
              borderRadius: SIZES.radius,
              width: 200,
              height: 200,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <SliderBox
              ImageComponentStyle={{
                borderRadius: 15,
              }}
              imageLoadingColor={COLORS.primary}
              parentWidth={SIZES.width * 0.9}
              images={bannerList.map((item, i) => {
                return {uri: `${DATABASE_URL_IMG}/banner/${item?.image}`};
              })}
              autoplay={true}
              autoplayInterval={4000}
              circleLoop={true}
            />
          </View>
        </View>
      ) : (
        ''
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            fontWeight: '700',

            marginBottom: 0,
          }}>
          Món ăn nổi bật
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AllCuisineScreen', {
              idCate: null,
              value: null,
            })
          }>
          <Text
            style={{
              textDecorationLine: 'underline',
              ...FONTS.h5,
              color: COLORS.darkgray,
            }}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{flex: 1}}
        />
      ) : (
        <MenuList
          navigation={navigation}
          menu={cuisineList}
          onPressFavourite={addToFavourite}
          user={user?.id}
          // categories={categoryData}
          // categorySelected={categorySelected}
        />
      )}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default HomeScreen;
