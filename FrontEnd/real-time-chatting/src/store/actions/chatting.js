import * as actionTypes from './actionTypes';
import axios  from '../../hoc/auxx';




export const saveMessage = (message) => {
   return {
      type: actionTypes.MESSAGE,
      message:message
   };
};


export const saveFriendsNameList = (data) => {
   return {
      type: actionTypes.FRIEDNS,
      friendsList:data
   };
};


export const filterMessage = (ReceiverID,SenderID) => {
   return (dispatch)=>{
      axios.get('/messages/'+ReceiverID+'/'+SenderID)
         .then(r=>{
            //console.log(r.data,' Messages');
            dispatch(saveMessage(r.data));
         })
   
      }
};

export const sentMessage = (ReceiverID,SenderID,Msg) => {
   return (dispatch)=>{
      axios.post('/messages/'+ReceiverID+'/'+SenderID,{Msg:Msg})
         .then(r=>{
            //console.log(r.data,' Messages');
            dispatch(saveMessage(r.data));
         })
   
      }
};


export const friendsNameList = (id) => {
   return (dispatch)=>{
      axios.get('/friendsList/'+id)
         .then(r=>{
            console.log(r.data,' Firends');

            dispatch(saveFriendsNameList(r.data));
         })
   
      }
};
