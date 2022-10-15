import { CHECK_APPROVE_STAKE_STATUS_FAIL,CHECK_APPROVE_STAKE_STATUS_LOADING,CHECK_APPROVE_STAKE_STATUS_SUCCESS } from "../../../constants/ActionTypes/Wallet";
import { APPROVE_STAKE_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default () => (dispatch) => (onSuccess) => {
    dispatch({
        type: CHECK_APPROVE_STAKE_STATUS_LOADING,
    });
  

    axiosInstance
        .get(`${APPROVE_STAKE_URL}`)
        .then((res) => {  
            dispatch({
                type: CHECK_APPROVE_STAKE_STATUS_SUCCESS,
                payload: res.data,
            });
            onSuccess(res.data);
        })
        .catch((err) => { 
            dispatch({
                type: CHECK_APPROVE_STAKE_STATUS_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
        });
    
}