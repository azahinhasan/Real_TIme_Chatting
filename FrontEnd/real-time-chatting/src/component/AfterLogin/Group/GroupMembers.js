import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import GroupClasses from './Group.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';
import axios from '../../../hoc/auxx';


import { connect } from 'react-redux';
import NavBar from '../navBar';

const GroupMembers=(props)=> {

   const [reqs,setReqs]=useState([]);
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const [msg, setMsg]=useState('');

   useEffect(() => {
      loadReq();
   }, []);

   useEffect(() => {
      loadReq();
   }, []);

   const loadReq=()=>{
      axios.get('/groups/members/'+props.groupKey)
         .then(r=>{
            //console.log(r.data,' req');
            setReqs(r.data);
         })
   }

   const reqAction=(senderID,action)=>{
      axios.post('/groups/joinrequest/action/'+props.groupKey+'/'+props.adminID+'/'+senderID+'/'+action)
         .then(r=>{
            
            //setReqs(r.data);
         })
      
   }

   const removeFromGroup=(groupID,removeUserID)=>{
      axios.post('/groups/removeMember/'+groupID+'/'+removeUserID+'/'+userID)
         .then(r=>{
            console.log(r.data,' req');
            //setReqs(r.data);
            loadReq();
         })
      
   }

   return (
      <div className={Classes.App} style={{textAlign:'center'}}>
            <h3>All Members</h3>
            
         {reqs != ''? 
            <table style={{width:'100%'}}>
               <ScrollToBottom className={Classes.allLoginActivity}>
                  {reqs.map(data=>{
                        return(
                           <div key={data.ID} style={{border:'2px black solid',marginTop:'5px'}}>
                        
                                 <tr>
                                    <td style={{width:'86.2%',borderRight:'2px black solid',textAlign:'center'}}> <span>{data.UserID}</span></td>
                                    <td>
                                       {/* <button className={Classes.greenBtn} onClick={""}>Promotion</button> */}

                                       {data.UserID!=userID?
                                          <button className={Classes.redBtn} onClick={()=>removeFromGroup(data.GroupID,data.UserID)} disabled={props.adminID==localStorage.getItem('UserID')?false:true}>Remove</button>
                                       :
                                          <button style={{width:'70px'}} className={Classes.redBtn} onClick={()=>removeFromGroup(data.GroupID,props.adminID)} disabled={props.adminID==localStorage.getItem('UserID')?false:false}>Leave</button>
                                       }
                                    </td>
                                 </tr>
                              
                           </div>
                        )
                  })}
               </ScrollToBottom>
            </table>
         :
         <h4>No Group Join Request!</h4>}
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
export default  connect(mapStateToProps,mapDispatchToProps)(GroupMembers); 








