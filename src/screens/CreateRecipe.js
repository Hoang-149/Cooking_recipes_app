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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import TextInput from '../components/TextInput';

import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {CustomButton} from '../components/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

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

const CreateRecipe = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);

  const [image, setImage] = useState('');
  const [name, setName] = useState({value: '', error: ''});
  const [difficulty, setDifficulty] = useState({value: '', error: ''});
  const [duration, setDuration] = useState({value: '', error: ''});
  const [ingredients, setIngredients] = useState({value: '', error: ''});
  const [steps, setSteps] = useState({value: '', error: ''});
  const [urlWebsite, setUrlWebsite] = useState({value: '', error: ''});
  const [urlYoutube, setUrlYoutube] = useState({value: '', error: ''});

  const [category, setCategory] = useState([]);
  // console.log(category);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8000/api/view-category`)
      .then(response => {
        const ListCategory = response.data.category;
        // console.log(ListCategory);
        setCategory(ListCategory);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      setSelectedItem(category[0].id);
    }
  }, [category]);

  const filePath = RNFS.DocumentDirectoryPath + image;

  const onAddPressed = () => {
    const nameError = nameValidator(name.value);
    const difficultyError = difficultyValidator(difficulty.value);
    const durationError = durationValidator(duration.value);
    const ingredientsError = ingredientValidator(ingredients.value);
    const stepsError = stepsValidator(steps.value);
    const urlWebsiteError = urlWebsiteValidator(urlWebsite.value);
    const urlYoutubeError = urlYoutubeValidator(urlYoutube.value);
    if (
      nameError ||
      difficultyError ||
      durationError ||
      ingredientsError ||
      stepsError ||
      urlWebsiteError ||
      urlYoutubeError
    ) {
      setName({...name, error: nameError});
      setDifficulty({...difficulty, error: difficultyError});
      setDuration({...duration, error: durationError});
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
    console.log(ext);

    const ext1 = filename.match(regex)[1];
    console.log(ext1);

    const type = ext ? `image/${ext[1]}` : `image`;
    console.log(type);

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `image.${ext1}`,
      type,
    });
    formData.append('name', name.value);
    formData.append('user_id', user.id);
    formData.append('category_id', selectedItem);
    formData.append('difficulty', difficulty.value);
    formData.append('duration', duration.value);
    formData.append('ingredients', ingredients.value);
    formData.append('steps', steps.value);
    formData.append('urlWebsite', urlWebsite.value);
    formData.append('urlYoutube', urlYoutube.value);

    console.log(formData);

    try {
      const {data} = axios
        .post(`http://10.0.2.2:8000/api/create-cuisine`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          // handle the response data
          console.log(response.data);
          if (response.data.status === 200) {
            console.log(response.data.message);
          } else {
            console.log(response.data.message);
          }
        })
        .catch(error => {
          // handle the error
          console.log(error);
        });
    } catch (e) {
      console.log('Error', e.message);
    }

    // RNFS.exists(filePath)
    //   .then(exists => {
    //     if (exists) {
    //       console.log('File exists');
    //     } else {
    //       console.log('File does not exist');
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
          paddingHorizontal: 16,
        }}>
        <ScrollView>
          <Text
            style={{
              paddingTop: 8,
              textAlign: 'center',
              ...FONTS.h2,
              fontWeight: '700',
            }}>
            Add Recipe
          </Text>
          <TouchableOpacity onPress={openGallery}>
            <View
              style={{
                marginVertical: 16,
                width: 100,
                height: 100,
                backgroundColor: '#fff',
                alignItems: 'center',
                borderWidth: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {/* User Photo */}
              {image == 'default' || image == '' || image == undefined ? (
                <View>
                  <Text>Add Image</Text>
                </View>
              ) : (
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <View
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Recipe Name
              </Text>
              <TextInput
                value={name.value}
                onChangeText={text => setName({value: text, error: ''})}
                error={!!name.error}
                errorText={name.error}
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
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Category
              </Text>
              {/* <SelectDropdown
                data={cate}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              /> */}
              <Picker
                style={{
                  color: 'red',
                  // backgroundColor: 'blue',
                  borderBottomColor: 'yellow',
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
            <View
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Difficulty
              </Text>
              <TextInput
                value={difficulty.value}
                onChangeText={text => setDifficulty({value: text, error: ''})}
                error={!!difficulty.error}
                errorText={difficulty.error}
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
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Duration
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
            <View
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Ingredients
              </Text>
              <TextInput
                value={ingredients.value}
                onChangeText={text => setIngredients({value: text, error: ''})}
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
              style={
                {
                  // paddingBottom: 12,
                }
              }>
              <Text
                style={{
                  color: '#000',
                  ...FONTS.body3,
                  // fontWeight: '700',
                }}>
                Steps
              </Text>
              <TextInput
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
              style={
                {
                  // paddingBottom: 12,
                }
              }>
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
                onChangeText={text => setUrlWebsite({value: text, error: ''})}
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
              style={
                {
                  // paddingBottom: 12,
                }
              }>
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
                onChangeText={text => setUrlYoutube({value: text, error: ''})}
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
            <CustomButton text="ADD" onPressButton={onAddPressed} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateRecipe;
