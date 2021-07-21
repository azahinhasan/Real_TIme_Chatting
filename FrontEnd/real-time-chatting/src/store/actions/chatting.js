import * as actionTypes from './actionTypes';
import axios  from '../../hoc/auxx';
import {friendValidition} from './friends'; //calling anoter function from another file



export const saveMessage = (message) => {
   return {
      type: actionTypes.MESSAGE,
      message:message
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

