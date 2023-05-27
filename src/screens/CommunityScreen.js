import {
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {COLORS, SIZES} from '../constants';
import HomeHeader from '../components/HomeHeader';
import {Tab, Text, TabView} from '@rneui/themed';
import Post from '../components/Post';
import FoodApi from '../constants/option';
import PostList from '../components/PostList';

const CommunityScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);

  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callAllPost();
  }, []);

  const callAllPost = () => {
    FoodApi.getAllPost().then(res => {
      const newCuisineList = res.data.post;
      // console.log(res.data.post);

      setPostList(newCuisineList);
      setLoading(false);

      setRefreshing(false);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callAllPost();
  }, [refreshing]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      {/* <ScrollView
        style={{
          flex: 1,
        }}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
      {/* <HomeHeader /> */}
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item title="Thực hiện" titleStyle={{fontSize: 12}} />
        <Tab.Item title="Công thức" titleStyle={{fontSize: 12}} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{marginHorizontal: SIZES.padding}}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{flex: 1}}
            />
          ) : (
            <PostList navigation={navigation} menu={postList} />
          )}
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Bài Post</Text>
        </TabView.Item>
      </TabView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default CommunityScreen;
