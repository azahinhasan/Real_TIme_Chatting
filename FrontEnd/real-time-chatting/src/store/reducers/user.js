import * as actionTypes from '../actions/actionTypes';

const initialState={
   friendsList:[],
   messages:[],
   theyAreFriend:false,
   friendRequestMsg:'',
   friendRequesActiontMsg:'',
   friendRequestList:[],
   group_data:[],
   group_list:[],
   group_member_validitation:false,
   group_msg:[]
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
            group_data:action.group_data,
            group_msg:action.group_msg
         };

      case actionTypes.GROUP_LIST: 
         return {
            ...state,
            group_list:action.group_list
         };
      case actionTypes.GROUP_MEMBER_VALIDATION: 
         return {
            ...state,
            group_member_validitation:action.group_member_validitation
         };

      default:
         return state;
   }
};


export default reducer;