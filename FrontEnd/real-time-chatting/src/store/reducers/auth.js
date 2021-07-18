import * as actionTypes from '../actions/actionTypes';

const initialState={
   verifiedUser:false,
   error:'',
   loading:false,
   messages:[]
}


const reducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case actionTypes.AUTH_SUCCESS: 
      return {
         ...state,
         verifiedUser:action.verifiedUser,
      };

      case actionTypes.AUTH_FAILED: 
         return {
            ...state,
            verifiedUser:action.verifiedUser,
         };
      case actionTypes.MESSAGE: 
         return {
            ...state,
            verifiedUser:action.verifiedUser,
            messages:action.messages
         };
      default:
         return state;
   }
};


export default reducer;