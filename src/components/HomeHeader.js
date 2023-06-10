import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';
import SearchBar from 'react-native-dynamic-search-bar';
import FoodApi from '../constants/option';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = ({searchMenu, user}) => {
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const searchCuisine = text => {
    navigation.navigate('AllCuisineScreen', {value: true});
    // setSearchValue([]);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
        marginRight: SIZES.padding,
      }}>
      <TouchableOpacity
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          user
            ? navigation.navigate('Profile')
            : navigation.navigate('ProfileGuest')
        }>
        {user?.image ? (
          <Image
            source={{uri: `${DATABASE_URL_IMG}/users/${user?.image}`}}
            style={{width: 35, height: 35, borderRadius: SIZES.radius}}
          />
        ) : (
          <Image
            source={icons.user}
            style={{width: 35, height: 35, borderRadius: SIZES.radius}}
          />
        )}
      </TouchableOpacity>

      <SearchBar
        placeholder="Tìm theo công thức, nguyên liệu"
        // onChangeText={text => {
        //   setSearchValue(text);
        // }}
        // onClearPress={() => {
        //   console.log('cancel');
        // }}
        // onFocus={() => navigation.navigate('AllCuisineScreen')}
        // onSearchPress={() => searchCuisine(searchValue)}
        cancelIconColor="white"
        onFocus={() => searchCuisine()}
      />
    </View>
  );
};

export default HomeHeader;
