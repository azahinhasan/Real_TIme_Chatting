import * as actionTypes from '../actions/actionTypes';

const initialState={
   friendsList:[],
   messages:[],
   theyAreFriend:false,
   friendRequestMsg:'',
   friendRequesActiontMsg:'',
   friendRequestList:[],
   group_data:[],
   group_list:[]
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

      case actionTypes.FRIENDREQLIST: 
         return {
            ...state,
            friendRequestList:action.friendRequestList
         };
      case actionTypes.FRIENDREQACTION: 
         return {
            ...state,
            friendRequesActiontMsg:action.friendRequesActiontMsg
         };
      case actionTypes.GROUP_DATA: 
         return {
            ...state,
            group_data:action.group_data
         };

      case actionTypes.GROUP_LIST: 
         return {
            ...state,
            group_list:action.group_list
         };

      default:
         return state;
   }
};


export default reducer;