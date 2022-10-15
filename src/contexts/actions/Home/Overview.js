import { OVERVIEW_FAIL,OVERVIEW_LOADING,OVERVIEW_SUCCESS} from "../../../constants/ActionTypes/Home";
import { HOME_OVERVIEW_URL } from "../../../configs/config";
import axiosInstance from "../../../helpers/AxiosInstance";
import i18n,{t} from "../../../services";


export default () => (dispatch) =>  {
    dispatch({
        type: OVERVIEW_LOADING,
    });
  

    axiosInstance
        .get(`${HOME_OVERVIEW_URL}`)
        .then((res) => {  
            dispatch({
                type: OVERVIEW_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => { 
            dispatch({
                type: OVERVIEW_FAIL,
                payload: err.response
                ? err.response.data
                : {error: t("app:something_went_wrong")},
            });
        });
    
}