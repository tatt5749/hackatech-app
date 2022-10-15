import { UNSTACK_FAIL,UNSTACK_LOADING,UNSTACK_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { UNSTAKE_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: UNSTACK_LOADING,
    });
    
    axiosInstance
        .post(UNSTAKE_URL, 
            formData
        ).then((res) => { 
            dispatch({
                type: UNSTACK_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: UNSTACK_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}