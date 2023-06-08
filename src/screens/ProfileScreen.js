import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import Header from '../components/Header';
import {Globalstyles} from '../styles/GlobalStyle';
import {CustomButton} from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/actions';
import {DATABASE_URL_IMG} from '../constants/database';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);

  // console.log(`${DATABASE_URL_IMG}/users/${user.image}`);

  return (
    <>
      <SafeAreaView style={Globalstyles.container_1}>
        {/* Header */}
        {/* <Header
          title="Account"
          icon={icons.logout}
          onPressIcon={() => console.log('haha')}
        /> */}
        {/* <FlashMessage position="top" /> Add this line */}
        <View style={Globalstyles.container_2}>
          {/* User Photo */}
          <View style={styles.image_container}>
            {user?.image ? (
              <Image
                source={{uri: `${DATABASE_URL_IMG}/users/${user?.image}`}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            ) : (
              <Image
                source={icons.user}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            )}
          </View>
          {/* User Name */}
          <Text style={styles.name}>{user?.name}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyProfileScreen')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
                paddingLeft: 3,
                marginTop: SIZES.padding * 8,
                borderBottomColor: COLORS.darkgray,
                borderBottomWidth: 1,
              }}>
              <Image
                source={icons.profileuser}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
              <Text style={styles.contact_text}>Thông Tin</Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyFavouriteScreen')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderBottomColor: COLORS.darkgray,
                borderBottomWidth: 1,
              }}>
              <Image
                source={icons.like}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text style={styles.contact_text}>Yêu Thích</Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyRecipesScreen')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderBottomColor: COLORS.darkgray,
                borderBottomWidth: 1,
              }}>
              <Image
                source={icons.document}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text style={styles.contact_text}>Công Thức</Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyShareScreen')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderBottomColor: COLORS.darkgray,
                borderBottomWidth: 1,
              }}>
              <Image
                source={icons.comment}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text style={styles.contact_text}>Bài Chia sẻ </Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch(setUser(null));
              navigation.navigate('StartScreen');
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                paddingVertical: SIZES.padding,
                paddingLeft: 3,

                borderBottomColor: COLORS.darkgray,
                borderBottomWidth: 1,
              }}>
              <Image
                source={icons.logout}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text style={styles.contact_text}>Đăng Xuất</Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image_container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 55,
    marginTop: SIZES.padding * 4,
    backgroundColor: COLORS.white,
  },
  name: {
    alignSelf: 'center',
    ...FONTS.h2,
    marginTop: SIZES.padding,
  },
  contact_text: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: SIZES.padding,
    flex: 1,
  },
});
