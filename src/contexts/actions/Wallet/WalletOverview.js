import { GET_WALLET_FAIL,GET_WALLET_LOADING,GET_WALLET_SUCCESS } from "../../../constants/ActionTypes/Wallet";
import { WALLET_OVERVIEW_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default () => (dispatch) =>  {
    dispatch({
        type: GET_WALLET_LOADING,
    });
  

    axiosInstance
        .get(`${WALLET_OVERVIEW_URL}`)
        .then((res) => {  
            dispatch({
                type: GET_WALLET_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => { 
            dispatch({
                type: GET_WALLET_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
        });
    
}