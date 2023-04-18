import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import {CustomButton} from '../components/CustomButton';

const FoodDetail = ({navigation}) => {
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50, paddingHorizontal: 5}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: COLORS.lightGray3,
            flex: 1,
            borderRadius: SIZES.radius,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3}}>Ăn sáng</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <CartIcon navigation={navigation} /> */}
        </TouchableOpacity>
      </View>
    );
  }
  function renderFoodInfor() {
    return (
      <>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: SIZES.height * 0.3,
              marginTop: 25,
              paddingBottom: 20,
            }}>
            <Image
              source={require('../assets/images/burger.png')}
              resizeMode="contain"
              style={{
                width: SIZES.width - 24,
                height: '95%',
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 5,
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
          <Text
            style={{
              ...FONTS.h1,
              textAlign: 'center',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
            }}>
            Bánh mỳ
          </Text>
          {/* <Text
            style={{
              ...FONTS.h4,
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              color: COLORS.black,
              textAlign: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
            }}>
            Cách làm:
          </Text> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              Nguyên liệu:
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              xà lách, thịt heo, dưa leo
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              Cách làm:
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              Ahihihihihihihihihihih
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginLeft: SIZES.padding,
              }}>
              Đánh giá
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                }}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: SIZES.padding,
                }}>
                4.5
              </Text>
            </View>
          </View>
          <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
            <CustomButton text={'LƯU'} onPressButton={() => addToCart()} />
          </View>
        </View>
      </>
    );
  }
  return (
    <SafeAreaView
      style={{flex: 1, paddingTop: 5, backgroundColor: COLORS.lightGray4}}>
      {renderHeader()}
      {renderFoodInfor()}
    </SafeAreaView>
  );
};

export default FoodDetail;
