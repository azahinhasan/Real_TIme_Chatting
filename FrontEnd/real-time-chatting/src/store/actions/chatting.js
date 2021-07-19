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

export const notFriend = () => {
   return {
      type: actionTypes.FRIEDNVERIFY,
      theyAreFriend:false
   };
};

export const theyAreFriend = () => {
   return {
      type: actionTypes.FRIEDNVERIFY,
      theyAreFriend:true
   };
};

export const friendRequestMsg = (msg) => {
   return {
      type: actionTypes.FRIENDREQMSG,
      friendRequestMsg:msg
   };
};

export const friendRequesActiontMsg = (msg) => {
   return {
      type: actionTypes.FRIENDREQACTION,
      friendRequesActiontMsg:msg
   };
};

export const friendRequestList = (list) => {
   return {
      type: actionTypes.FRIENDREQLIST,
      friendRequestList:list
   };
};


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

export const friendValidition = (ReceiverID,SenderID) => {
   return (dispatch)=>{
      axios.get('/friendValidition/'+ReceiverID+'/'+SenderID)
         .then(r=>{
            if(r.data==='notFriend'){
               dispatch(notFriend(r.data));
            }
            else{
               dispatch(theyAreFriend(r.data));
            }
         })
   
      }
};

export const friendsNameList = (id) => {
   return (dispatch)=>{
      axios.get('/friendsList/'+id)
         .then(r=>{
           // console.log(r.data,' Firends');
            dispatch(saveFriendsNameList(r.data));
         })
   
      }
};


export const friendReqSent = (FriendKey,SenderID) => {
   return (dispatch)=>{
      axios.post('/sentFriendReq/'+FriendKey+'/'+SenderID)
         .then(r=>{
           //console.log(r.data,' Req');
            dispatch(friendRequestMsg(r.data));
         })
   
      }
};

export const friendReqSentList = (ReciverID) => {
   return (dispatch)=>{
      axios.get('/friendsRequstAction/'+ReciverID)
         .then(r=>{
            dispatch(friendRequestList(r.data));
         })
   
      }
};

export const friendReqSentAction = (requstID,actionType) => {
   return (dispatch)=>{
      axios.post('/friendsRequstAction/'+actionType+'/'+requstID)
         .then(r=>{

            dispatch(friendRequesActiontMsg(r.data));
            dispatch(friendReqSentList(localStorage.getItem('UserID')));
         })
   
      }
};


export const unfriend = (f1,f2) => {
   return (dispatch)=>{
      axios.post('/unfriend/'+f1+'/'+f2)
         .then(r=>{
            console.log(r.data,' Req');
            

         })
   
      }
};
