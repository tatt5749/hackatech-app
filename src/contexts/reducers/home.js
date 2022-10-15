import { 
    OVERVIEW_FAIL,OVERVIEW_LOADING,OVERVIEW_SUCCESS,INIT_OVERVIEW
  } from "../../constants/ActionTypes/Home";
  
  const home = (state, {type, payload}) => {
      switch (type) {
        case INIT_OVERVIEW :
          return {
            ...state,
            overview:{
              ...state.overview,
              overviewData: {},
              overviewError: null,
              overviewLoading: false,
            }
          };
        case OVERVIEW_LOADING :
          return {
            ...state,
            overview:{
              ...state.overview,
              overviewData: {},
              overviewError: null,
              overviewLoading: true,
            }
          };
        case OVERVIEW_SUCCESS:
          return {
            ...state,
            overview : {
              ...state.overview,
              overviewLoading: false,
              overviewData: payload.data,
              overviewError: null,
            }
          };
        case OVERVIEW_FAIL:
          return {
            ...state,
            overview:{
              ...state.overview,
              overviewLoading: false,
              overviewData: {},
              overviewError: payload.data,
            }
          };
        default:
          return state;
      }
    };
    
    export default home;