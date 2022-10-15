import { SEND_STATUS_FAIL,SEND_STATUS_LOADING,SEND_STATUS_SUCCESS } from "../../../constants/ActionTypes/Wallet";
import { CHECK_STAKE_STATUS_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default (id) => (dispatch) => (onSuccess)  => {
    dispatch({
        type: SEND_STATUS_LOADING,
    });
    
    const requestPayload = {
        transaction_hash: id ,
    };

    axiosInstance
        .get(`${CHECK_STAKE_STATUS_URL}`, {params : requestPayload} )
        .then((res) => {  
            dispatch({
                type: SEND_STATUS_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        })
        .catch((err) => { 
            dispatch({
                type: SEND_STATUS_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
            
        });
    
}