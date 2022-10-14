import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LOGOUT } from '../constants/RouteNames';
import * as c from '../configs/config';
import {navigate} from '../routes/SideMenu/RootNavigator';
import CryptoJS from "react-native-crypto-js";
import alert from '../components/Common/Alert';
import i18n,{t} from '../services';

let headers = {};

const axiosInstance = axios.create({
    baseURL: c.apiUrl,
    headers,
});

axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const tokenByte = CryptoJS.AES.decrypt(token, c.encryptKEY);
        const BearerToken = tokenByte.toString(CryptoJS.enc.Utf8);

        config.headers.Authorization = `Bearer ${BearerToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => { console.log(error);
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      
      if (error.response.status === 403 || error.response.status === 401) {
        navigate(LOGOUT, {tokenExpired: true});
      }else if(error.response.status >= 500){
        alert(t('app:error'), t('app:something_went_wrong'), [
          {
              text: t('app:confirm'),
              onPress: () => {
                //onClearError();
              },
          },
      ])
      }
      else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    },
);
  
export default axiosInstance;