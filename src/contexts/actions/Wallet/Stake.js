import { STAKE_FAIL,STAKE_LOADING,STAKE_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { STAKE_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: STAKE_LOADING,
    });
    
    axiosInstance
        .post(STAKE_URL, 
            formData
        ).then((res) => { 
            dispatch({
                type: STAKE_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: STAKE_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}