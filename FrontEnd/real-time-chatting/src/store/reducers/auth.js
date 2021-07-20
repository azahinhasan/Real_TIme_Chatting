import * as actionTypes from '../actions/actionTypes';

const initialState={
   verifiedUser:false,
   error:'',
   loading:false,
   loginErrorMsg:'',
   loginActivityList:[]
}


const reducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case actionTypes.AUTH_SUCCESS: 
         return {
            ...state,
            verifiedUser:action.verifiedUser,
            loginErrorMsg:action.loginErrorMsg,
         };

      case actionTypes.AUTH_FAILED: 
         return {
            ...state,
            verifiedUser:action.verifiedUser,
            loginErrorMsg:action.loginErrorMsg,
         };
         case actionTypes.LOGINACTIVITYLIST: 
      return {
            ...state,
            loginActivityList:action.loginActivityList,
         };
      default:
         return state;
   }
};


export default reducer;