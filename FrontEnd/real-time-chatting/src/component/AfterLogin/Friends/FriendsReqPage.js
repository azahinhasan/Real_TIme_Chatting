import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';





const FriendsPage=(props)=> {
   

   

   useEffect(() => {
      friendReqList();
   }, []);


   const friendReqList=()=>{
      props.friendReqSentList(localStorage.getItem('UserID'));
      
   }

   const friendReqAction=(requstID,action)=>{
      console.log('acton')
      props.friendReqSentAction(requstID,action);
      
   }

   return (
      <div className={Classes.FriendsPage}>

         <h3>All Friends Requests</h3>
         
         <br/>
         <p>{props.friendRequesActiontMsg}</p>
         <br/>
         {props.friendRequestList.map(data=>{
               return(
                  <div key={data.ID}>
                     <span>{data.UserInfo1.Name}</span>
                     <button onClick={()=>friendReqAction(data.ID,'accept')}>A</button>
                     <button onClick={()=>friendReqAction(data.ID,'reject')}>R</button>


                  </div>
               )
         })}

      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      friendRequestList:state.user.friendRequestList,
      friendRequesActiontMsg:state.user.friendRequesActiontMsg
   }

}

const mapDispatchToProps=dispatch=>{
   return{

      friendReqSentAction:(requstID,actionType)=>dispatch(action.friendReqSentAction(requstID,actionType)),
      friendReqSentList:(SenderID)=>dispatch(action.friendReqSentList(SenderID)),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(FriendsPage); 




