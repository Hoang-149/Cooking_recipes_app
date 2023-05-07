import {SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS, optionData, foodData} from '../constants';
import HomeHeader from '../components/HomeHeader';
import OptionList from '../components/OptionList';
import MenuList from '../components/MenuList';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);

  // console.log(user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        paddingTop: 2,
      }}>
      <HomeHeader />

      <OptionList
        categories={optionData}
        // onSelectedCategory={onSelectedCategory}
        // selectedCategory={selectedCategory}
      />

      <MenuList
        navigation={navigation}
        menu={foodData}
        // onPressFavourite={addToFavourite}
        // favorites={favorites}
        // categories={categoryData}
        // categorySelected={categorySelected}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
