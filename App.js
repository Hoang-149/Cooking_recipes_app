import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/theme';

import HomeScreen from './src/screens/CommunityScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StartScreen from './src/screens/StartScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';

import {Provider as ProviderRedux} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Tabs from './src/navigation/Tabs';
import FoodDetail from './src/screens/FoodDetail';
import CateCuisinineScreen from './src/screens/CateCuisinineScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import MyFavouriteScreen from './src/screens/MyFavouriteScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import AllCuisineScreen from './src/screens/AllCuisineScreen';
import ProfileUserScreen from './src/screens/ProfileUserScreen';
import ProfileDetailScreen from './src/screens/ProfileDetailScreen';
import UserRecipesScreen from './src/screens/UserRecipesScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import MyShareScreen from './src/screens/MyShareScreen';
import UserPostScreen from './src/screens/UserPostScreen';
import TabsGuest from './src/navigation/TabsGuest';
import {Profile} from './src/screens';
import ProfileGuest from './src/screens/ProfileGuest';
import UpdateCuisineScreen from './src/screens/UpdateCuisineScreen';
import UpdatePostScreen from './src/screens/UpdatePostScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProviderRedux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'StartScreen'}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
              <Stack.Screen
                name="MyProfileScreen"
                component={MyProfileScreen}
              />
              <Stack.Screen
                name="MyFavouriteScreen"
                component={MyFavouriteScreen}
              />
              <Stack.Screen
                name="MyRecipesScreen"
                component={MyRecipesScreen}
              />
              <Stack.Screen
                name="AllCuisineScreen"
                component={AllCuisineScreen}
              />
              <Stack.Screen
                name="ProfileUserScreen"
                component={ProfileUserScreen}
              />
              <Stack.Screen
                name="ProfileDetailScreen"
                component={ProfileDetailScreen}
              />
              <Stack.Screen
                name="UserRecipesScreen"
                component={UserRecipesScreen}
              />
              <Stack.Screen
                name="CreatePostScreen"
                component={CreatePostScreen}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
              <Stack.Screen name="MyShareScreen" component={MyShareScreen} />
              <Stack.Screen name="UserPostScreen" component={UserPostScreen} />
              <Stack.Screen name="TabsGuest" component={TabsGuest} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="ProfileGuest" component={ProfileGuest} />
              <Stack.Screen
                name="UpdateCuisineScreen"
                component={UpdateCuisineScreen}
              />
              <Stack.Screen
                name="UpdatePostScreen"
                component={UpdatePostScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ProviderRedux>
  );
}
