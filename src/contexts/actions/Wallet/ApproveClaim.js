import { APPROVE_CLAIM_FAIL,APPROVE_CLAIM_LOADING,APPROVE_CLAIM_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { APPROVE_CLAIM_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default (formData) => (dispatch) => (onSuccess) => {
    dispatch({
        type: APPROVE_CLAIM_LOADING,
    });
    

    axiosInstance
        .put(APPROVE_CLAIM_URL, {
          
        }).then((res) => { 
            dispatch({
                type: APPROVE_CLAIM_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: APPROVE_CLAIM_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}