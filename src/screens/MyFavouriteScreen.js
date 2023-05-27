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

const MyFavouriteScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [cuisineList, setCuisineList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FoodApi.showFavourite(user?.id).then(res => {
      const newCuisineList = res.data.cuisine_favourite;
      // console.log(res.data.cuisine_favourite);

      setCuisineList(newCuisineList);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'My Favourites'} />
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
          //   onPressFavourite={addToFavourite}
          like={true}
          // categories={categoryData}
          // categorySelected={categorySelected}
        />
      )}
    </SafeAreaView>
  );
};

export default MyFavouriteScreen;
