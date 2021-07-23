import * as actionTypes from './actionTypes';
import axios  from '../../hoc/auxx';
import {friendValidition} from './friends'; //calling anoter function from another file



export const saveMessage = (message) => {
   return {
      type: actionTypes.MESSAGE,
      message:message
   };
};

export const saveGroupData = (data) => {
   return {
      type: actionTypes.GROUP_DATA,
      group_data:data
   };
};

export const groupListData = (data) => {
   return {
      type: actionTypes.GROUP_LIST,
      group_list:data
   };
};


export const groupMemberValidition = (data) => {
   return {
      type: actionTypes.GROUP_DATA,
      group_data:data
   };
};

// export const unfriendSuccess = (list) => {
//    return {
//       type: actionTypes.UNFRIENDSUCESS,
//       friendRequestList:list
//    };
// };


export const filterMessage = (ReceiverID,SenderID) => {
   return (dispatch)=>{
      axios.get('/messages/'+ReceiverID+'/'+SenderID)
         .then(r=>{

            dispatch(saveMessage(r.data));
            dispatch(friendValidition(ReceiverID,SenderID));
            
         })
   
      }
};

export const sentMessage = (ReceiverID,SenderID,Msg) => {
   return (dispatch)=>{
      axios.post('/messages/'+ReceiverID+'/'+SenderID,{Msg:Msg})
         .then(r=>{
               dispatch(saveMessage(r.data));
         })
   
      }
};



export const filterMessageGroupData = (GroupID,UserID) => {  //group message and group Info
   return (dispatch)=>{
      axios.get('/groups/messages/'+GroupID)
         .then(r=>{

            dispatch(saveGroupData(r.data));

            //dispatch(groupMemberValidation(GroupID,UserID));
            
         })
   
      }
};


export const groupList = (UserID) => { 
   return (dispatch)=>{
      axios.get('/groups/list/'+UserID)
         .then(r=>{

            console.log(r.data)
            dispatch(groupListData(r.data));

            
         })
   
      }
};
