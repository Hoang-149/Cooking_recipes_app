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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';
import {useSelector} from 'react-redux';
import MenuList from '../components/MenuList';
import OptionList from '../components/OptionList';
import HeaderProfile from '../components/HeaderProfile';
import SearchBar from 'react-native-dynamic-search-bar';

const AllCuisineScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [loading, setLoading] = useState(true);

  const [valueSearch, setValueSearch] = useState([]);

  const [cuisineList, setCuisineList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);

  const [searchValue, setSearchValue] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const {idCate, value} = route.params;

    console.log(value);

    if (value) {
      setValueSearch(value);
      setDisplaySearch(true);
      // searchCuisine(value);
      // inputRef.current.focus();
    }

    callCate();

    if (idCate) {
      onSelectedCategory(idCate);
      setSelectedCategory(idCate);
    } else {
      callCuisine();
      setSelectedCategory(null);
    }
    // setCategorySelected(false);
  }, []);

  const callCuisine = () => {
    FoodApi.getAllCuisine().then(res => {
      const newCuisineList = res.data.cuisine;
      // console.log(res.data.cuisine);

      setCuisineList(newCuisineList);
      setLoading(false);

      setSelectedCategory(null);

      // setRefreshing(false);
    });
  };

  const callCate = () => {
    FoodApi.getAllCategory().then(res => {
      const newCateList = res.data.category;
      // console.log(res.data.category);
      setCategoryList(newCateList);
      // setRefreshing(false);
    });
  };

  const onSelectedCategory = category => {
    // setCategorySelected(true);
    setLoading(true);
    setSelectedCategory(category);

    FoodApi.getCuisineOfCate(category).then(res => {
      const newCuisineList = res.data.cuisineOfCate;
      // console.log(res.data.cuisineOfCate);
      setCuisineList(newCuisineList);
      setLoading(false);
      //   console.log(selectedCategory);
    });
  };

  const onDisplayPress = () => {
    setDisplaySearch(true);
  };

  const onHiddenPress = () => {
    setDisplaySearch(false);
  };

  const searchCuisine = text => {
    setRefreshing(true);

    FoodApi.searchCuisine(text).then(res => {
      const newCateList = res.data.cuisine;
      // console.log(res.data.cuisine);

      setCuisineList(newCateList);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {displaySearch ? (
          <View
            style={{
              backgroundColor: COLORS.lightGray4,
              flexDirection: 'row',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              alignItems: 'center',
              flex: 10,
            }}>
            <SearchBar
              // ref={inputRef}
              placeholder="Tìm theo công thức, nguyên liệu"
              fontColor="#c6c6c6"
              iconColor="#c6c6c6"
              shadowColor="#282828"
              cancelIconColor="#c6c6c6"
              backgroundColor="white"
              style={
                {
                  // marginRight: -20,
                }
              }
              onChangeText={text => {
                setSearchValue(text);
              }}
              onClearPress={() => {
                console.log('cancel');
              }}
              onSearchPress={() => searchCuisine(searchValue)}
            />
            <TouchableOpacity onPress={() => onHiddenPress()}>
              <Text
                style={{
                  ...FONTS.body4,
                  flex: 4,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              paddingLeft: SIZES.padding,
              flex: 1,
              paddingVertical: SIZES.padding,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={icons.back}
                resizeMode="contain"
                style={{width: 25, height: 25, tintColor: COLORS.black}}
              />
            </TouchableOpacity>

            <Text
              style={{
                ...FONTS.h4,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center',
                paddingRight: valueSearch ? SIZES.padding : 25 + SIZES.padding,
              }}>
              All Cuisine
            </Text>
            {valueSearch ? (
              <TouchableOpacity onPress={() => onDisplayPress()}>
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                    marginRight: SIZES.padding,
                  }}
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        )}
      </View>

      <OptionList
        categories={categoryList}
        onSelectedCategory={onSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <TouchableOpacity onPress={() => callCuisine()}>
        <Text
          style={{
            ...FONTS.h3,
            paddingLeft: SIZES.padding,
            fontWeight: '700',
          }}>
          All Cuisine
        </Text>
      </TouchableOpacity>
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
          user={user?.id}
          categories={categoryList}
          categorySelected={categorySelected}
        />
      )}
    </SafeAreaView>
  );
};

export default AllCuisineScreen;
