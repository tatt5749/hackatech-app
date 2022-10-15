import { CREATE_WALLET_FAIL,CREATE_WALLET_LOADING,CREATE_WALLET_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { CREATE_WALLET_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: CREATE_WALLET_LOADING,
    });
    

    axiosInstance
        .put(CREATE_WALLET_URL, {
          
        }).then((res) => { 
            dispatch({
                type: CREATE_WALLET_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: CREATE_WALLET_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}