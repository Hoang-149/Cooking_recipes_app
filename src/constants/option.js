import axios from 'axios';
import {LOCAL_URL, icons} from '.';
import axiosClient from './axiosClient';

export const optionData = [
  {
    id: 1,
    name: 'Ăn sáng',
    icon: icons.burgers,
  },
];

export const foodData = [
  {
    id: 1,
    name: 'Canh ghẹ kim chi',
    view: '199 lượt xem. 45p',
    icon: icons.burgers,
  },
];

const FoodApi = {
  createPost: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/create-post`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postSignUpUser: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/register`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postLoginUser: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/login`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postCreateRecipe: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/create-cuisine`, data, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getPostOfUer: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/view-post-user/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getLimitCuisine: () => {
    try {
      const url = axios.get(`${LOCAL_URL}/api/view-cuisine`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getCuisineOfCate: async id => {
    try {
      const url = await axios.get(
        `${LOCAL_URL}/api/view-category-cuisine/${id}`,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllCuisine: () => {
    try {
      const url = axios.get(`${LOCAL_URL}/api/view-all-cuisine`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllPost: () => {
    try {
      const url = axios.get(`${LOCAL_URL}/api/view-all-post`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllBanner: () => {
    try {
      const url = axios.get(`${LOCAL_URL}/api/view-banner`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllCategory: () => {
    try {
      const url = axios.get(`${LOCAL_URL}/api/view-category`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getUserCuisine: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/show-user-cuisine/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllCuisineOfUser: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/show-cuisine-user/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getComment: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/view-comment/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getCommentPost: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/view-comment-post/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postComment: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/store-comment`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postCommentPost: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/store-comment-post`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postReplayComment: async data => {
    try {
      const url = await axios.post(
        `${LOCAL_URL}/api/store-replay-comment`,
        data,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async id => {
    try {
      const url = await axios.delete(`${LOCAL_URL}/api/delete-comment/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  deleteReplyComment: async id => {
    try {
      const url = await axios.delete(
        `${LOCAL_URL}/api/delete-comment-reply/${id}`,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  updateComment: async (id, data) => {
    try {
      const url = await axios.post(
        `${LOCAL_URL}/api/update-comment/${id}`,
        data,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postReplyComment: async data => {
    try {
      const url = await axios.post(
        `${LOCAL_URL}/api/store-reply-comment`,
        data,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postFavourite: async data => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/store-favourite`, data);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getAllFavourite: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/get-all-favourite/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postUpdateUser: async (id, data) => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/update/${id}`, data, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postUpdateCuisine: async (id, data) => {
    try {
      const url = await axios.post(
        `${LOCAL_URL}/api/update-cuisine/${id}`,
        data,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  postUpdatePost: async (id, data) => {
    try {
      const url = await axios.post(`${LOCAL_URL}/api/update-post/${id}`, data, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getFavourite: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/get-favourite/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  showFavourite: async id => {
    try {
      const url = await axios.get(
        `${LOCAL_URL}/api/show-cuisine-favourite/${id}`,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  deleteFavourite: async id => {
    try {
      const url = await axios.delete(`${LOCAL_URL}/api/delete-favourite/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  searchCuisine: async key => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/search-cuisine/${key}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCuisine: async id => {
    try {
      const url = await axios.delete(`${LOCAL_URL}/api/delete-cuisine/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  deletePost: async id => {
    try {
      const url = await axios.delete(`${LOCAL_URL}/api/delete-post/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  getNotifyUser: async id => {
    try {
      const url = await axios.get(`${LOCAL_URL}/api/cuisine-status/${id}`);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  putStatusNotify: id => {
    try {
      const url = axios.put(
        `${LOCAL_URL}/api/users/${id}/notify/update-status`,
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  },
};

export default FoodApi;
