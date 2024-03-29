import {REACT_APP_SERVER_URL} from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

export default axiosInstance;
