import * as actionTypes from '../actions/actionTypes';

const initialState={
   friendsList:[],
   messages:[],
   theyAreFriend:false,
   friendRequestMsg:''
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
      case actionTypes.FRIEDNVERIFY: 
         return {
            ...state,
            theyAreFriend:action.theyAreFriend,
         };

      case actionTypes.FRIENDREQMSG: 
         return {
            ...state,
            friendRequestMsg:action.friendRequestMsg,
         };
      default:
         return state;
   }
};


export default reducer;