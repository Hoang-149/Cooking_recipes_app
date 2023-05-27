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
import FoodApi from '../constants/option';
import HeaderProfile from '../components/HeaderProfile';
import MenuList from '../components/MenuList';

const MyRecipesScreen = ({navigation, route}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const {userItem} = route.params;
    // console.log(userItem);
    setUser(userItem);

    FoodApi.getAllCuisineOfUser(user?.id).then(res => {
      const newCuisineList = res.data.cuisine;
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
      <HeaderProfile navigation={navigation} textHeader={'Recipes'} />
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
          // like={true}
          user={user?.id}
          // categories={categoryData}
          // categorySelected={categorySelected}
        />
      )}
    </SafeAreaView>
  );
};

export default MyRecipesScreen;
