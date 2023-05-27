import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import SearchBar from 'react-native-dynamic-search-bar';
import FoodApi from '../constants/option';

const HeaderProfile = ({navigation, textHeader, search, valueSearch}) => {
  const [searchValue, setSearchValue] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log(valueSearch);
    if (valueSearch) {
      setDisplaySearch(true);
    }
  }, [valueSearch]);

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
      console.log(res.data.cuisine);
      // setCategoryList(newCateList);
      setRefreshing(false);
    });
  };

  return (
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
        // <View
        //   style={{
        //     backgroundColor: 'white',
        //     flexDirection: 'row',
        //     flex: 1,
        //     paddingLeft: SIZES.padding,
        //   }}>
        //   <TouchableOpacity onPress={() => navigation.goBack()}>
        //     <Image
        //       source={icons.back}
        //       resizeMode="contain"
        //       style={{width: 25, height: 25, tintColor: COLORS.black}}
        //     />
        //   </TouchableOpacity>
        //   <Text
        //     style={{
        //       ...FONTS.h4,
        //       fontWeight: 'bold',
        //       flex: 1,
        //       textAlign: 'center',
        //       paddingRight: 25 + SIZES.padding,
        //     }}>
        //     {textHeader}
        //   </Text>
        // </View>

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
              paddingRight: search ? SIZES.padding : 25 + SIZES.padding,
            }}>
            {textHeader}
          </Text>
          {search ? (
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
  );
};

export default HeaderProfile;
