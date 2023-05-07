import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
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
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
              flexDirection: 'column',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text
              style={{
                ...FONTS.h2,
              }}>
              Canh ghẹ kim chi
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

          <View
            style={{
              paddingHorizontal: SIZES.padding * 2,
              paddingVertical: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                textAlign: 'justify',
              }}>
              Canh ghẹ kim chi món ăn có biến tấu độc đáo từ ghẹ và kim chi.Vị
              ngọt tự nhiên của ghẹ kết hợp vị chua cay
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: 'bold',
              }}>
              Thành phần
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                marginLeft: SIZES.padding,
              }}>
              Khẩu phần: 1 người
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
              flexDirection: 'column',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h5,
              }}>
              Kim chi
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                marginLeft: SIZES.padding,
              }}>
              100 Gr
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
              flexDirection: 'column',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h5,
              }}>
              Ghẹ đỏ
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                marginLeft: SIZES.padding,
              }}>
              1 con
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
              flexDirection: 'column',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h5,
              }}>
              Rau tần ô(cải cúc)
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                marginLeft: SIZES.padding,
              }}>
              100 Gr
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: 'bold',
              }}>
              Hướng dẫn thực hiện
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                textAlign: 'justify',
              }}>
              1. Đầu tiên, cho 1 muỗng canh dầu ăn vào nồi đợi nóng, trút 400gr
              kim chi đã cắt thành miếng vừa ăn vào xào.
            </Text>
            {/* <Text
              style={{
                ...FONTS.h5,
                paddingVertical: SIZES.padding,

                textAlign: 'justify',
              }}>
              1. Canh ghẹ kim chi món ăn có biến tấu độc đáo từ ghẹ và kim
              chi.Vị ngọt tự nhiên của ghẹ kết hợp vị chua cay
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                textAlign: 'justify',
              }}>
              1. Canh ghẹ kim chi món ăn có biến tấu độc đáo từ ghẹ và kim
              chi.Vị ngọt tự nhiên của ghẹ kết hợp vị chua cay
            </Text> */}
          </View>

          <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
            <CustomButton text={'Chia sẻ'} onPressButton={() => addToCart()} />
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
