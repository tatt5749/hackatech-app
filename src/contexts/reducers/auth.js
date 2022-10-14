import { 
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_AUTH_STATE,
  LOGOUT_USER,
  CLEAR_ERROR,
  LOGIN_KEEP,
  SET_USER_INFO,
  INIT_LOGIN
} from "../../constants/ActionTypes/Auth";

const auth = (state, {type, payload}) => {
    switch (type) {
      case INIT_LOGIN:
        return{
          ...state,
          login:{
            ...state.login,
            isLoggedIn: false,
            data: {},
            error: null,
            loading: false,
            isSuccess:false,
          }
        } 
      case LOGIN_LOADING:
        return {
          ...state,
          login:{
            ...state.login,
            loading: true,
            error: null,
            isSuccess:false,
          }
        };
      case LOGIN_KEEP:
        return {
          ...state,
          login:{
            ...state.login,
            isLoggedIn: true,
            data: payload,
            error: null,
          },
          userInfo:{
            ...state.userInfo,
            userData:payload
          }
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          login : {
            ...state.login,
            loading: false,
            data: payload,
            isLoggedIn: true,
            error: null,
            isSuccess:true,
          },
          userInfo:{
            ...state.userInfo,
            userData:JSON.parse(payload)
          }
        };
      case LOGOUT_USER:
        return {
          ...state,
          login:{
            ...state.login,
            loading: false,
            data: null,
            isLoggedIn: false,
          },
          userInfo:{
            ...state.userInfo,
            userData : {}
          }
        };
      case LOGIN_FAIL:
        return {
          ...state,
          login:{
            ...state.login,
            loading: false,
            error: payload,
            isSuccess:false,
          }
        };
      case CLEAR_AUTH_STATE:
        return {
          ...state,
          loading: false,
          data: null,
          error: null,
        };
      case CLEAR_ERROR:
          return {
            ...state,
            loading: false,
            data: null,
            error: null,
          };
      case SET_USER_INFO:
        return{
          ...state,
          userInfo : {
            ...state.userInfo,
            userData:payload
          }
        }
      default:
        return state;
    }
  };
  
  export default auth;