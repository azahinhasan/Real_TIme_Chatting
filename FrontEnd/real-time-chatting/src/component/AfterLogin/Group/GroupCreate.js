import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';
import axios from '../../../hoc/auxx';

import { connect } from 'react-redux';
import NavBar from '../navBar';

const GroupCreate=(props)=> {

   const [groupName,setGroupName]=useState('');
   const [groupType,setGroupType]=useState('none');
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const [msg, setMsg]=useState('');


   const resetPage=()=>{
      setGroupName('');
      setGroupType('none');
      setMsg("New Group Created!");
   }

   const createGroup=()=>{
      axios.post('/groups/create/',{
         GroupName:groupName,
         CreatorID:localStorage.getItem('UserID'),
         GroupType:groupType,
         Maxmember:50,
         CurrentMemberNum:1
      })
         .then(r=>{
            resetPage();
         })
   }

   return (
      <div className={Classes.FriendsPage} style={{textAlign:'center'}}>
         <h3>Create Group</h3>
            <br/>
            <input value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="Group Name"/>
            <br/>
            {/* <span style={{fontWeight:'bold',marginRight:'2px'}}>Type:</span> */}
            <select value={groupType} style={{textAlign:'center'}} onChange={e=>setGroupType(e.target.value)}>
               <option value="none">TYPE</option>
               <option value="close">CLOSE</option>
               <option value="open">OPEN</option>
            </select>
            <br/>
            {msg}
            <br/>
            <button disabled={groupName=='' || groupType=='none'?true:false} onClick={()=>createGroup()}>SAVE</button>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{

   }

}

const mapDispatchToProps=dispatch=>{
   return{

   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(GroupCreate); 








