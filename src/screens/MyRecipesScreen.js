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
import MenuList2 from '../components/MenuList2';
import HeaderProfile2 from '../components/HeaderProfile2';

const MyRecipesScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [cuisineList, setCuisineList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      callAllRecipes();
    });

    return unsubscribe;
  }, [navigation]);

  const callAllRecipes = () => {
    FoodApi.getAllCuisineOfUser(user?.id).then(res => {
      const newCuisineList = res.data.cuisine;
      // console.log(res.data.cuisine);

      setCuisineList(newCuisineList);
      setLoading(false);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile2
        navigation={navigation}
        textHeader={'Công Thức Của Tôi'}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{flex: 1}}
        />
      ) : (
        <MenuList2
          navigation={navigation}
          menu={cuisineList}
          onPresscallAllRecipes={callAllRecipes}
          // like={true}
          user={user?.id}
          // categories={categoryData}
          // categorySelected={categorySelected}
        />
      )}
      <View
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
          <Image
            source={icons.plus}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyRecipesScreen;
