import { LOGIN_KEEP } from "../../../constants/ActionTypes/Auth";


export default (userdata) => (dispatch) => { 
    dispatch({
      type: LOGIN_KEEP,
      payload: userdata,
    });
};