// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs

const axiosClient = axios.create({
  baseURL: 'http://10.0.2.2:8000/',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,

  paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient;
