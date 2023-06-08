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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {CustomButton} from '../components/CustomButton';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HeaderProfile from '../components/HeaderProfile';
import {useSelector} from 'react-redux';

const MyProfileScreen = ({navigation, route}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const {userItem} = route.params;
    // console.log(userItem);
    setUser(userItem);
  }, []);

  const [image, setImage] = useState('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Thông Tin'} />

      <View
        style={{
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: SIZES.padding * 2,
            alignContent: 'center',
          }}>
          {image ? (
            <Image
              source={{uri: image.uri}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `${DATABASE_URL_IMG}/users/${user.image}`,
                // cache: 'force-cache',
              }}
              // resizeMode="contain"
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          )}
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            paddingBottom: SIZES.padding * 2,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              marginBottom: SIZES.padding,
            }}>
            Tên
          </Text>
          <TextInput
            value={user.name}
            editable={false}
            // onChangeText={text => setName(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
              color: 'black',
              paddingVertical: 0,
            }}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            paddingBottom: SIZES.padding * 2,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              marginBottom: SIZES.padding,
            }}>
            Email
          </Text>
          <TextInput
            value={user.email}
            editable={false}
            // onChangeText={text => setEmail(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
              color: 'black',
              paddingVertical: 0,
            }}
          />
        </View>
        <View
          style={
            {
              // backgroundColor: 'red',
            }
          }>
          <Text
            style={{
              ...FONTS.h4,
              marginBottom: SIZES.padding,
            }}>
            Số điện thoại
          </Text>
          <TextInput
            value={user.phone === 'null' ? '' : user.phone}
            editable={false}
            // onChangeText={text => setPhone(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
              color: 'black',
              paddingVertical: 0,
            }}
          />
        </View>
        {/* <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
          <CustomButton
            text={'Save Changes'}
            onPressButton={() => console.log('ahihi')}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
