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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {DATABASE_URL_IMG} from '../constants/database';

const CateCuisinineScreen = ({navigation, route}) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const {currentItem} = route.params;
    console.log(currentItem);
    setItem(currentItem);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      {/* <FlatList
        data={item}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      /> */}
    </SafeAreaView>
  );
};

export default CateCuisinineScreen;
