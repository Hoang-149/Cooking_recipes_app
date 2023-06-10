import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../constants';
import Header3 from '../components/Header3';
import PostList from '../components/PostList';
import FoodApi from '../constants/option';
import {CustomButton} from '../components/CustomButton';

const CommunityScreen = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allComment, setAllComment] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callAllPost();
    });

    return unsubscribe;
  }, [navigation, callAllPost]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    callAllPost();
    setRefreshing(false);
  }, [callAllPost]);

  const callAllPost = () => {
    FoodApi.getAllPost().then(res => {
      const newPostList = res.data.post;

      setPostList(newPostList);
      setLoading(false);

      newPostList.forEach(post => {
        getCommentPost(post.id);
      });
    });
  };

  const getCommentPost = postId => {
    FoodApi.getCommentPost(postId).then(response => {
      const newCommentList = response.data.comments;

      console.log(response.data.comments);

      setAllComment(prevComments => {
        const newPrev = prevComments.filter(item => item.postId !== postId);

        return [...newPrev, {postId, comments: newCommentList}];
      });
    });
  };

  const handleCommentDeleted = deletedCommentId => {
    // Xóa comment từ danh sách comments
    // const updatedComments = allComment.filter(
    //   comment => comment.id !== deletedCommentId,
    // );
    // console.log(deletedCommentId);
    // setAllComment(prevComments => {
    //   const newPrev = prevComments.filter(
    //     item => item.postId !== deletedCommentId,
    //   );

    //   return [...newPrev];
    // });
    callAllPost();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      }}>
      {user ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header3 textHeader={'Cộng Đồng'} />
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{flex: 1}}
            />
          ) : (
            <PostList
              navigation={navigation}
              allComment={allComment}
              menu={postList}
              callAllPost={callAllPost}
              getCommentPost={getCommentPost}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onCommentDeleted={handleCommentDeleted}
            />
          )}
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              paddingTop: 8,
              paddingVertical: SIZES.padding,
              textAlign: 'center',
              ...FONTS.h2,
              fontWeight: '700',
              backgroundColor: 'white',
              marginBottom: 30,
            }}>
            Thông Báo
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: SIZES.padding * 3,
            }}>
            <CustomButton
              text={'Đăng nhập'}
              onPressButton={() => navigation.navigate('LoginScreen')}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CommunityScreen;
