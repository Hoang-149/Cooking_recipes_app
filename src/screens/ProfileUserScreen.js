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
import {DATABASE_URL_IMG} from '../constants/database';
import HeaderProfile from '../components/HeaderProfile';

const Profile = ({navigation, route}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const {userItem} = route.params;
    // console.log(userItem);
    setUser(userItem);
  }, []);

  // console.log(`${DATABASE_URL_IMG}/users/${user.image}`);

  return (
    <>
      <SafeAreaView style={Globalstyles.container_1}>
        <HeaderProfile
          navigation={navigation}
          textHeader={`Thông Tin của ${user.name}`}
        />

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
            onPress={() =>
              navigation.navigate('ProfileDetailScreen', {userItem: user})
            }>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
                paddingLeft: 3,

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
            onPress={() =>
              navigation.navigate('UserRecipesScreen', {userItem: user})
            }>
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

          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserPostScreen', {userItem: user})
            }>
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
              <Text style={styles.contact_text}>Bài Đăng</Text>
              <Image
                source={icons.next}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </TouchableOpacity> */}
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
