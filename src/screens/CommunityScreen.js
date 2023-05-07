import {SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
import HomeHeader from '../components/HomeHeader';
import {Tab, Text, TabView} from '@rneui/themed';
import Post from '../components/Post';

const CommunityScreen = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        paddingTop: 2,
      }}>
      <HomeHeader />
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
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Bài Post</Text>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Bài Post</Text>
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

export default CommunityScreen;
