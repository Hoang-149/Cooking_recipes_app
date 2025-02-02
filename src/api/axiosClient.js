// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,

  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  error => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
