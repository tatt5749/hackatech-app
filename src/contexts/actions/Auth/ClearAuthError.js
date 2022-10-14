import { CLEAR_ERROR } from "../../../constants/ActionTypes/Auth";


export default (type) => (dispatch) => { 
    dispatch({
      type: type,
    });
};