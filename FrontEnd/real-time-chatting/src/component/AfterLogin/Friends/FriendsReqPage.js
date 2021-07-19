import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';





const FriendsReq=(props)=> {
   

   

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
      <div className={Classes.FriendsReqPage}>

         <h3>All Friends Requests</h3>
         
         <br/>
         <p>{props.friendRequesActiontMsg}</p>
         <br/>
         {props.friendRequestList != ''? 
            <table style={{width:'100%'}}>
            {props.friendRequestList.map(data=>{
                  return(
                     <div key={data.ID} style={{border:'2px black solid',marginTop:'5px'}}>
                        <tr>
                           <td style={{width:'73%',borderRight:'2px black solid'}}> <span>{data.UserInfo1.Name}</span></td>
                           <td>
                              <button className={Classes.greenBtn} onClick={()=>friendReqAction(data.ID,'accept')}>ACCEPT</button>
                              <button className={Classes.redBtn} onClick={()=>friendReqAction(data.ID,'reject')}>REJECT</button>
                           </td>
                        </tr>
                     </div>
                  )
            })}
         </table>
         :
         <h2>You Have No Friend Request!</h2>
      }
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
export default  connect(mapStateToProps,mapDispatchToProps)(FriendsReq); 




