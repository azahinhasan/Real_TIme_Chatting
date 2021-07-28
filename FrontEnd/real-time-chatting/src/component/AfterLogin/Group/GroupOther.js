import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';
import axios from '../../../hoc/auxx';

import { connect } from 'react-redux';
import Join from './GroupJoin';
import GroupMembers from './GroupMembers';

const GroupOther=(props)=> {

   const [groupKey,setGroupKey]=useState('');
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const [msg, setMsg]=useState('');
   const [showPageOf,setShowPageOf]=useState('join');

   let showPage="";

   if(showPageOf=='join'){
      showPage= <Join groupKey={props.groupKey} adminID={props.adminID}/>

   }
   else if(showPageOf=='create'){
      showPage= <GroupMembers groupKey={props.groupKey} adminID={props.adminID}/>
   }

   return (
      <div className={Classes.FriendsReqPage}>
         <div className={Classes.homePageData}>
            <h3>Group Others Options</h3>
            <hr/>

            <button className={Classes.blackBtn} onClick={()=>setShowPageOf('join')}>Join</button>
            <button className={Classes.blackBtn} onClick={()=>setShowPageOf('create')}>Create</button>
      
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
export default  connect(mapStateToProps,mapDispatchToProps)(GroupOther); 








