import {
  View,
  Text,
  Image,
  // TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Animated,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {CustomButton} from '../components/CustomButton';
import {DATABASE_URL_IMG} from '../constants/database';
import FoodApi from '../constants/option';
import InfoCard from '../components/InfoCard';
import {commentValidator} from '../helpers/nameValidator';
import {useSelector} from 'react-redux';
import Comments from '../components/Comments';
import HeaderProfile from '../components/HeaderProfile';
import TextInput from '../components/TextInput';

const CreatePostScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.userReducer);

  const [title, setTitle] = useState({value: '', error: ''});
  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    const {cuisineCurrent} = route.params;
    // console.log(cuisineCurrent);
    setCuisine(cuisineCurrent);
  }, []);

  const onPostPress = () => {
    const dataPost = {
      name: `${user?.id}${cuisine?.id}`,
      title: title.value,
      id_user: user?.id,
      id_cuisine: cuisine?.id,
    };

    console.log(dataPost);

    FoodApi.createPost(dataPost).then(response => {
      if (response.data.status === 200) {
        console.log(response.data.message);

        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setTitle([]);
      } else {
        console.log(response.data.message);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  // console.log(`${DATABASE_URL_IMG}/cuisine/${cuisine?.image}`);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      <HeaderProfile navigation={navigation} textHeader={'Create Post'} />

      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        <View
          style={
            {
              // paddingBottom: 12,
            }
          }>
          <Text
            style={{
              color: '#000',
              ...FONTS.body2,
              fontWeight: '700',
            }}>
            Title
          </Text>
          <TextInput
            placeholder="Hãy viết một điều gì đó"
            value={title.value}
            onChangeText={text => setTitle({value: text, error: ''})}
            autoCapitalize="none"
            error={!!title.error}
            errorText={title.error}
            multiline={true}
            // borderColor={COLORS.darkgray}
            // borderWidth={1}
            style={{
              padding: 5,
              ...FONTS.body3,
              height: 100,
              textAlignVertical: 'top',
            }}
          />
        </View>
        <View
          style={
            {
              // paddingBottom: 12,
            }
          }>
          <Text
            style={{
              color: '#000',
              ...FONTS.body2,
              fontWeight: '700',
              marginBottom: SIZES.padding,
            }}>
            Content
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: SIZES.radius,
              }}>
              <Image
                // source={require('../assets/images/nuong.png')}
                source={{uri: `${DATABASE_URL_IMG}/cuisine/${cuisine?.image}`}}
                style={{width: '100%', height: 200, resizeMode: 'contain'}}
              />
              <View
                style={{
                  width: '100%',
                  height: 60,
                  backgroundColor: COLORS.darkgray,
                  opacity: 0.9,
                  position: 'absolute',
                  bottom: 0,
                  borderBottomLeftRadius: SIZES.radius,
                  borderBottomRightRadius: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.padding * 2,
                }}>
                <Text
                  style={{
                    color: 'white',
                    ...FONTS.body2,
                    fontWeight: '700',
                  }}>
                  {cuisine?.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
          <CustomButton text={'Post'} onPressButton={() => onPostPress()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
