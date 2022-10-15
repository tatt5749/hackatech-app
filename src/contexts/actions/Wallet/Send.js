import { SEND_FAIL,SEND_LOADING,SEND_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { SEND_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: SEND_LOADING,
    });
    
    axiosInstance
        .post(SEND_URL, formData
            
        ).then((res) => { 
            dispatch({
                type: SEND_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: SEND_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}