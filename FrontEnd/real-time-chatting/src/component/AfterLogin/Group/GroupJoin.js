import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';

const GroupJoin=(props)=> {

   const [groupKey,setGroupKey]=useState('');

   return (
      <div className={Classes.App}>
         <h3>Join Group</h3>
            <br/>
            <input onChange={e=>setGroupKey(e.target.value)} placeholder="Enter Group Key"/>
            <br/>
            <p>{props.friendRequestMsg}</p>
            <br/>
            <button >SEND</button>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      group_msg:state.user.group_msg,
      group_list:state.user.group_list,
      group_data:state.user.group_data,
      group_member_validitation:state.user.group_member_validitation
   }

}

const mapDispatchToProps=dispatch=>{
   return{

      groupList:(UserID)=>dispatch(action.groupList(UserID)),
      groupData:(GroupID,userID)=>dispatch(action.groupData(GroupID,userID)),
      sendGroupMsg:(SenderID,GroupID,Msg)=>dispatch(action.sendGroupMsg(SenderID,GroupID,Msg)),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(GroupJoin); 








