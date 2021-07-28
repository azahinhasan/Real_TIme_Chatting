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

   const [groupKey,setGroupKey]=useState('');
   const [groupType,setGroupType]=useState('close');
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const [msg, setMsg]=useState('');

   const sendGroupReq=()=>{
      axios.post('/groups/joingroup/'+userID+'/'+groupKey)
         .then(r=>{
            setMsg(r.data);
         })
   }

   return (
      <div className={Classes.FriendsPage} style={{textAlign:'center'}}>
         <h3>Join Group</h3>
            <br/>
            <input type="" onChange={e=>setGroupKey(e.target.value)} placeholder="Group Name"/>
            <br/>
            Type:
            <select onChange={r=>setGroupType(e.target.value)}>
               <option value="close">CLOSE</option>
               <option value="open">OPEN</option>
            </select>
            <br/>
            {msg}
            <br/>
            <button disabled={groupKey==''?true:false} onClick={()=>sendGroupReq()}>SAVE</button>
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








