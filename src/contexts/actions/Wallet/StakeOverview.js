import { STAKE_OVERVIEW_FAIL,STAKE_OVERVIEW_LOADING,STAKE_OVERVIEW_SUCCESS } from "../../../constants/ActionTypes/Wallet";
import { STAKE_OVERVIEW_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default () => (dispatch) =>  {
    dispatch({
        type: STAKE_OVERVIEW_LOADING,
    });
  

    axiosInstance
        .get(`${STAKE_OVERVIEW_URL}`)
        .then((res) => {  
            dispatch({
                type: STAKE_OVERVIEW_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => { 
            dispatch({
                type: STAKE_OVERVIEW_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
        });
    
}