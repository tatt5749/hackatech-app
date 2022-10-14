import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_FAIL,LOGIN_LOADING,LOGIN_SUCCESS } from '../../../constants/ActionTypes/Auth';
import { LOGIN_EMAIL_URL,LOGIN_PHONE_URL,encryptKEY } from '../../../configs/config';
import axiosInstance  from '../../../helpers/AxiosInstance';
import i18n,{t} from '../../../services';
import CryptoJS from "react-native-crypto-js";
import { LOGIN_BY_EMAIL, LOGIN_BY_PHONE } from '../../../constants/Enums/LoginType';

export default (formData,loginType) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    
    let url = '';
    switch (loginType) {
        case LOGIN_BY_EMAIL:
            url = LOGIN_EMAIL_URL;
            break;
        case LOGIN_BY_PHONE:
            url = LOGIN_PHONE_URL;
            break;
    }
    

    axiosInstance
        .post(url, formData).then((res) => { 
            let token =  CryptoJS.AES.encrypt(res.data.data.token, encryptKEY).toString();
            
            AsyncStorage.setItem('token', token);
           

            AsyncStorage.setItem('user',  JSON.stringify(res.data.data.user));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: JSON.stringify(res.data.data.user),
            });
        }).catch((err) => {   
            dispatch({ 
                type: LOGIN_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: t("app:something_went_wrong")},
            });
        })
}