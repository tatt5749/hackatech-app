import { APPROVE_STAKE_FAIL,APPROVE_STAKE_LOADING,APPROVE_STAKE_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { APPROVE_STAKE_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: APPROVE_STAKE_LOADING,
    });
    

    axiosInstance
        .put(APPROVE_STAKE_URL, {
          
        }).then((res) => { 
            dispatch({
                type: APPROVE_STAKE_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: APPROVE_STAKE_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}