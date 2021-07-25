import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';
import axios from '../../../hoc/auxx';

import { connect } from 'react-redux';
import GroupJoinRequests from './GroupJoinRequests';

const GroupOtherOptions=(props)=> {

   const [groupKey,setGroupKey]=useState('');
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const [msg, setMsg]=useState('');
   const [showPageOf,setShowPageOf]=useState('request');

   let showPage="";

   if(showPageOf=='request'){
      showPage= <GroupJoinRequests groupKey={props.groupKey} adminID={props.adminID}/>

   }
   else if(showPageOf=='members'){
      showPage= <GroupJoinRequests groupKey={props.groupKey} adminID={props.adminID}/>
   }

   return (
      <div className={Classes.FriendsReqPage}>
         <div className={Classes.homePageData}>
            <br/>
            <button className={Classes.blackBtn} onClick={()=>setShowPageOf('request')}>Request</button>
            <button className={Classes.blackBtn} onClick={()=>setShowPageOf('members')}>Members</button>
            <hr/>
         </div>
      
         {showPage}
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
export default  connect(mapStateToProps,mapDispatchToProps)(GroupOtherOptions); 








