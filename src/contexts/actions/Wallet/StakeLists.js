import { STAKE_LISTS_FAIL,STAKE_LISTS_LOADING,STAKE_LISTS_SUCCESS,INIT_STAKE_LISTS } from "../../../constants/ActionTypes/Wallet";
import { STAKES_LIST_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default (start,limit,initFlag=false) => (dispatch) =>  {
    if(initFlag){
        dispatch({
            type: INIT_STAKE_LISTS,
        });
    }else{
        dispatch({
            type: STAKE_LISTS_LOADING,
        });
    }
    
  
    const requestPayload = {
        start: start || 0,
        limit: limit || 5,
    };

    
    axiosInstance
        .get(`${STAKES_LIST_URL}`,{
            params : requestPayload
        })
        .then((res) => {  
            dispatch({
                type: STAKE_LISTS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => { 
            dispatch({
                type: STAKE_LISTS_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
        });
    
}