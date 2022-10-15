import { CLAIM_FAIL,CLAIM_LOADING,CLAIM_SUCCESS } from '../../../constants/ActionTypes/Wallet';
import { CLAIM_URL } from '../../../configs/config';
import axiosInstance from '../../../helpers/AxiosInstance';

export default () => (dispatch) => (onSuccess) => {
    dispatch({
        type: CLAIM_LOADING,
    });
    
    axiosInstance
        .put(CLAIM_URL, 
            
        ).then((res) => { 
            dispatch({
                type: CLAIM_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        }).catch((err) => {  
            dispatch({ 
                type: CLAIM_FAIL,
                payload: err.response
                  ? err.response.data
                  : {error: 'Something went wrong, try agin'},
            });
        })
}