import * as actionTypes from '../actions/actionTypes';

const initialState={
   friendsList:[],
   messages:[]
}

const reducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case actionTypes.MESSAGE: 
      return {
         ...state,
         messages:action.message,
      };

      case actionTypes.FRIEDNS: 
         return {
            ...state,
            friendsList:action.friendsList,
         };
      default:
         return state;
   }
};


export default reducer;