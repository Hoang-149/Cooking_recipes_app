import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {
  CommunityScreen,
  HomeScreen,
  NotifyScreen,
  Profile,
  CreateRecipe,
} from '../screens/index';
import {COLORS, icons} from '../constants';
import HomeGuest from '../screens/HomeGuest';
import ProfileGuest from '../screens/ProfileGuest';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          <Svg width={75} height={61} ViewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.white,
          paddingBottom: 12,
        }}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  return <BottomTabBar {...props.props} />;
};

const TabsGuest = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="HomeGuest"
        component={HomeGuest}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.comment}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.plus}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="NotifyScreen"
        component={NotifyScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileGuest"
        component={ProfileGuest}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsGuest;
