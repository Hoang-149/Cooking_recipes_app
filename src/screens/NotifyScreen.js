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
import NotifyList from '../components/NotifyList';

const NotifyScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [notifyList, setNotifyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      callAllNotify();
      const timeout = setTimeout(() => {
        putStatusNotify();
      }, 3000);
    });

    return unsubscribe;
  }, [navigation]);

  const callAllNotify = () => {
    FoodApi.getNotifyUser(user?.id).then(res => {
      const newNotifyList = res.data.notify;
      // console.log(res.data.notify);

      setNotifyList(newNotifyList);
      setLoading(false);
    });
  };

  const putStatusNotify = () => {
    FoodApi.putStatusNotify(user.id).then(res => {
      console.log(res.data.message);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Thông Báo'} />
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
          <NotifyList
            navigation={navigation}
            onPresscallAllPost={callAllNotify}
            menu={notifyList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotifyScreen;
