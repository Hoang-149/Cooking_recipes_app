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
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/actions';

const MyProfileScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.phone != 'null') {
      setPhone(user?.phone);
    }
  }, [user?.phone]);

  const onUpdatePress = () => {
    const dataUser = new FormData();

    if (image) {
      const uri =
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', '');
      const filename = image.uri.split('/').pop();
      const regex = /\.(\w+)$/;

      const ext = filename.match(regex);
      console.log(ext);

      const ext1 = filename.match(regex)[1];
      console.log(ext1);

      const type = ext ? `image/${ext[1]}` : `image`;
      console.log(type);

      dataUser.append('img', {
        uri,
        name: `image.${ext1}`,
        type,
      });
    }

    dataUser.append('name', name);
    dataUser.append('email', email);
    dataUser.append('phone', phone);

    console.log(dataUser);

    FoodApi.postUpdateUser(user?.id, dataUser).then(response => {
      if (response.data.status === 200) {
        console.log(response.data.message);

        console.log(response.data.user);
        dispatch(setUser(response.data.user));

        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  // function for taking/selecting photo
  let options = {
    // saveToPhotos: true,
    mediaType: 'photo',
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    // console.log(result.assets[0].uri);
    setImage(result.assets[0]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Thông Tin Của Tôi'} />

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
          <View>
            {user?.image ? (
              <Image
                source={{uri: `${DATABASE_URL_IMG}/users/${user?.image}`}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            ) : image ? (
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
                source={icons.user}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            )}
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              alignSelf: 'center',
              paddingLeft: SIZES.padding,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={openGallery}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: SIZES.padding,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    ...SIZES.body4,
                    color: 'black',
                  }}>
                  Tải hình ảnh lên
                </Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity>
              <View
                style={{
                  height: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: SIZES.padding,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    ...SIZES.body4,
                    color: 'black',
                  }}>
                  Xóa hình ảnh
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            paddingBottom: SIZES.padding * 2,
          }}>
          <Text
            style={{
              ...FONTS.h4,
            }}>
            Tên
          </Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
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
            }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
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
            }}>
            Số điện thoại
          </Text>
          <TextInput
            value={phone}
            onChangeText={text => setPhone(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              ...FONTS.body2,
              textAlignVertical: 'bottom',
              fontWeight: 'bold',
            }}
          />
        </View>

        <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
          <CustomButton text={'Lưu Thay Đổi'} onPressButton={onUpdatePress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
