import {
  View,
  Text,
  Image,
  // TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  Linking,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import TextInput from '../components/TextInput';

import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {CustomButton} from '../components/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

import {
  categoryValidator,
  difficultyValidator,
  durationValidator,
  ingredientValidator,
  nameValidator,
  stepsValidator,
  urlWebsiteValidator,
  urlYoutubeValidator,
} from '../helpers/nameValidator';

import {useSelector} from 'react-redux';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {theme} from '../core/theme';
import FoodApi from '../constants/option';
import LottieView from 'lottie-react-native';

const CreateRecipe = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);

  const [image, setImage] = useState('');
  const [name, setName] = useState({value: '', error: ''});
  const [duration, setDuration] = useState({value: '', error: ''});
  const [ingredients, setIngredients] = useState({value: '', error: ''});
  const [steps, setSteps] = useState({value: '', error: ''});
  const [urlWebsite, setUrlWebsite] = useState({value: '', error: ''});
  const [urlYoutube, setUrlYoutube] = useState({value: '', error: ''});

  const [checkValue, setCheckValue] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [category, setCategory] = useState([]);
  // console.log(category);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDiff, setSelectedDiff] = useState('Dễ');

  const [displayAnim, setDisplayAnim] = useState(false);
  const [displayReset, setDisplayReset] = useState(1);

  useEffect(() => {
    FoodApi.getAllCategory().then(response => {
      const ListCategory = response.data.category;
      // console.log(ListCategory);
      setCategory(ListCategory);
    });
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      setSelectedItem(category[0].id);
    }
  }, [category]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayAnim(false);
      // console.log('timeout');
    }, 9000);
    setName('');
    setSelectedDiff('Dễ');
    setDuration('');
    setIngredients('');
    setSteps('');
    setUrlWebsite('');
    setUrlYoutube('');
  }, [displayAnim]);

  const onNextStep1 = () => {
    const nameError = nameValidator(name.value);

    if (nameError) {
      setName({...name, error: nameError});
      setCheckValue(true);
      // return;
    } else {
      setCheckValue(false);
    }
    // return;
  };
  const onNextStep2 = () => {
    const durationError = durationValidator(duration.value);

    if (durationError) {
      setDuration({...duration, error: durationError});
      setCheckValue(true);
      // return;
    } else {
      setCheckValue(false);
    }
    // return;
  };

  const onAddPressed = () => {
    const ingredientsError = ingredientValidator(ingredients.value);
    const stepsError = stepsValidator(steps.value);
    const urlWebsiteError = urlWebsiteValidator(urlWebsite.value);
    const urlYoutubeError = urlYoutubeValidator(urlYoutube.value);

    if (ingredientsError || stepsError || urlWebsiteError || urlYoutubeError) {
      setIngredients({...ingredients, error: ingredientsError});
      setSteps({...steps, error: stepsError});
      setUrlWebsite({...urlWebsite, error: urlWebsiteError});
      setUrlYoutube({...urlYoutube, error: urlYoutubeError});
      return;
    }

    const uri =
      Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '');
    const filename = image.uri.split('/').pop();
    const regex = /\.(\w+)$/;

    const ext = filename.match(regex);
    // console.log(ext);

    const ext1 = filename.match(regex)[1];
    // console.log(ext1);

    const type = ext ? `image/${ext[1]}` : `image`;
    // console.log(type);

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `image.${ext1}`,
      type,
    });
    formData.append('name', name.value);
    formData.append('user_id', user.id);
    formData.append('category_id', selectedItem);
    formData.append('difficulty', selectedDiff);
    formData.append('duration', duration.value);
    formData.append('ingredients', ingredients.value);
    formData.append('steps', steps.value);
    formData.append('websiteURL', urlWebsite.value);
    formData.append('youtubeURL', urlYoutube.value);

    // console.log(formData);

    FoodApi.postCreateRecipe(formData)
      .then(response => {
        // handle the response data
        // console.log(response.data);
        if (response.data.status === 200) {
          console.log(response.data.message);
          setImage('');
          setName('');
          setDuration('');
          setIngredients('');
          setSteps('');
          setUrlWebsite('');
          setUrlYoutube('');

          setCurrentStep(1);
          setDisplayAnim(true);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        } else {
          console.log(response.data.message);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        // handle the error
        console.log(error);
      });
  };

  // function for taking/selecting photo
  let options = {
    // saveToPhotos: true,
    mediaType: 'photo',
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result.assets[0].uri);
    setImage(result.assets[0]);
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray4,
        }}>
        <Text
          style={{
            paddingTop: 8,
            paddingVertical: SIZES.padding,
            textAlign: 'center',
            ...FONTS.h2,
            fontWeight: '700',
            backgroundColor: 'white',
          }}>
          Thêm Công Thức
        </Text>
        {displayAnim ? (
          <View
            style={{
              // marginTop: SIZES.padding2 * 0.5,
              // width: '100%',
              position: 'absolute',
              backgroundColor: 'white',
              opacity: 0.9,
              width: '100%',
              height: '100%',
              // display: 'flex',
              flex: 1,
              zIndex: 999,
            }}>
            <LottieView
              // progress={progress}
              autoPlay
              speed={0.5}
              // duration={5000}
              loop={true}
              style={{height: '100%', alignSelf: 'center'}}
              source={require('../assets/anim/foodanimation.json')}
            />
          </View>
        ) : (
          ''
        )}

        <View style={{flex: 1}}>
          <ProgressSteps activeStep={currentStep}>
            <ProgressStep
              label="Bước 1"
              onNext={onNextStep1}
              errors={checkValue}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: SIZES.padding2 * 2,
                }}>
                <TouchableOpacity onPress={openGallery}>
                  <View
                    style={{
                      marginVertical: 16,
                      alignItems: 'center',
                      width: 200,
                      height: 200,
                      backgroundColor: '#fff',
                      // borderWidth: 1,
                      // borderColor: COLORS.lightGray,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 25,
                    }}>
                    {/* User Photo */}
                    {image == 'default' || image == '' || image == undefined ? (
                      <View>
                        <TouchableOpacity
                          onPress={openGallery}
                          style={
                            {
                              // backgroundColor: COLORS.lightGray,
                              // paddingVertical: 10,
                              // paddingHorizontal: 20,
                              // borderRadius: 10,
                            }
                          }>
                          <Image
                            source={icons.plus}
                            resizeMode="contain"
                            style={{
                              width: 36,
                              height: 36,
                              tintColor: COLORS.primary,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Image
                        source={{uri: image.uri}}
                        style={{
                          width: 200,
                          height: 200,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                    paddingHorizontal: SIZES.padding,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                      // backgroundColor: 'red',
                    }}>
                    Tên công thức
                  </Text>
                  <TextInput
                    value={name.value}
                    onChangeText={text => setName({value: text, error: ''})}
                    autoCapitalize="none"
                    error={!!name.error}
                    errorText={name.error}
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>
              </View>
            </ProgressStep>

            <ProgressStep
              label="Bước 2"
              onNext={onNextStep2}
              errors={checkValue}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: SIZES.padding2 * 2,
                  paddingHorizontal: SIZES.padding,
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Danh mục
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.darkgray,
                      borderRadius: 5,
                      marginVertical: SIZES.padding2,
                    }}>
                    <Picker
                      style={{
                        color: theme.colors.text,
                      }}
                      selectedValue={selectedItem}
                      onValueChange={itemValue => setSelectedItem(itemValue)}>
                      {category?.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View
                  style={{
                    // flexDirection: 'row',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Mức độ
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.darkgray,
                      borderRadius: 5,
                      marginVertical: SIZES.padding2,
                    }}>
                    <Picker
                      // mode="dropdown" // Android only
                      style={{
                        color: theme.colors.text,
                      }}
                      selectedValue={selectedDiff}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedDiff(itemValue)
                      }>
                      <Picker.Item label="Dễ" value="Easy" />
                      <Picker.Item label="Trung bình" value="Medium" />
                      <Picker.Item label="Khó" value="Hard" />
                    </Picker>
                  </View>
                </View>

                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Thời gian (phút)
                  </Text>
                  <TextInput
                    value={duration.value}
                    onChangeText={text => setDuration({value: text, error: ''})}
                    error={!!duration.error}
                    errorText={duration.error}
                    autoCapitalize="none"
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>
              </View>
            </ProgressStep>

            <ProgressStep label="Bước 3" onSubmit={onAddPressed}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: SIZES.padding2 * 2,
                  paddingHorizontal: SIZES.padding,
                  // backgroundColor: 'blue',
                }}>
                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Nguyên liệu
                  </Text>
                  <TextInput
                    multiline={true}
                    value={ingredients.value}
                    onChangeText={text =>
                      setIngredients({value: text, error: ''})
                    }
                    error={!!ingredients.error}
                    errorText={ingredients.error}
                    autoCapitalize="none"
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>

                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Các bước
                  </Text>
                  <TextInput
                    multiline={true}
                    value={steps.value}
                    onChangeText={text => setSteps({value: text, error: ''})}
                    error={!!steps.error}
                    errorText={steps.error}
                    autoCapitalize="none"
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>

                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Link Website
                  </Text>
                  <TextInput
                    value={urlWebsite.value}
                    onChangeText={text =>
                      setUrlWebsite({value: text, error: ''})
                    }
                    error={!!urlWebsite.error}
                    errorText={urlWebsite.error}
                    autoCapitalize="none"
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>

                <View
                  style={{
                    // paddingBottom: 12,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      ...FONTS.body3,
                      // fontWeight: '700',
                    }}>
                    Link Youtube
                  </Text>
                  <TextInput
                    value={urlYoutube.value}
                    onChangeText={text =>
                      setUrlYoutube({value: text, error: ''})
                    }
                    error={!!urlYoutube.error}
                    errorText={urlYoutube.error}
                    autoCapitalize="none"
                    style={{
                      // borderBottomWidth: 1,
                      // borderBottomColor: COLORS.darkgray,
                      // backgroundColor: 'red',
                      padding: 0,
                      ...FONTS.body3,
                    }}
                  />
                </View>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateRecipe;
