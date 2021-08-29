import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import GroupClasses from './Group.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';
import GroupOtherOption from './GroupOther';
import { connect } from 'react-redux';
import NavBar from '../navBar';

import GroupOtherOptions from './GroupOtherOptions';

const GroupChattingPage=(props)=> {
   const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
   const history = useHistory();
   const [msg,setMsg]=useState('');
   const [groupID,setGroupID]=useState('');
   const [userID,setUserID]=useState(localStorage.getItem('UserID'));
   const messagesEndRef = useRef(null);
   const [isGroupMember,setIsGroupMember]=useState(false);
   const [hideChattingPart, setHideChattingPart]=useState(false);

   const [showJoinGroupPage,setShowJoinGroupPage]=useState(false);
   // const scrollToBottom = () => {
   //    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   //  }

   useEffect(() => {
      //scrollToBottom();
      props.groupList(localStorage.getItem('UserID'));
   }, []);

   useEffect(() => {
      if(groupID!==''){
         const interval = setInterval(() => {
            props.groupData(localStorage.getItem(groupID,userID));
         }, 5000);
         return () => clearInterval(interval);
      }
   }, []);


   const checkGroopMemberValidity=(data)=>{
      setIsGroupMember(true);
      if(data == 'not_member'){
         setIsGroupMember(false);
      }
      
   }

   const showGroupInfo=(GroupID)=>{
      setShowJoinGroupPage(false);
      setHideChattingPart(false);
      setGroupID(GroupID);

   }

   const sentMasage=(GroupID)=>{
      
      props.sendGroupMsg(localStorage.getItem('UserID'),GroupID,msg);
      setMsg('');
      props.groupList(localStorage.getItem('UserID'));
   }
   // console.log(props.friendsList)


   let chattingPart = '';

   if(groupID!=='' && !showJoinGroupPage){
      chattingPart=(
        
         <div>
            <div className={Classes.chattingHeader}>
                  {props.group_data.GroupName}
                  <button className={GroupClasses.chat_manue} onClick={()=>setHideChattingPart(!hideChattingPart)}>=</button>
                
            </div>

            {!hideChattingPart?
               <div>
               <ScrollToBottom  className={Classes.allMessages}>
                  {props.group_msg.map(d=>{
                     return(
                        
                        <div>
                           <br/>
                           <span className={d.SenderID==localStorage.getItem('UserID')? Classes.messageSender:Classes.messageReciver}>
                              {/* {d.Msg} */}
                              {new Buffer(d.Msg, 'base64').toString('ascii')}
                              <div style={{fontSize:'10px'}}>-Sent From {d.UserInfo.Name}</div>
                           </span>

                           <br/>
                        </div>
                           
               
                     )})}
               
               </ScrollToBottom>

               
               <div className={Classes.msgTypingPart}>
               {props.group_member_validitation?  
                  <div>
                     <textarea 
                        placeholder="Type Your Message!" 
                        onChange={e=>{setMsg(e.target.value)}}
                        value={msg}
                        />
                     <button onClick={()=>sentMasage(groupID)} disabled={msg.length<1? true: false}>SEND</button>
                  </div>
               :
               <h4 style={{textAlign:'center'}}>Can not send any Message</h4>
               }
               </div>
            </div>

            :<GroupOtherOptions groupKey={groupID} adminID={props.group_data.CreatorID}/>
            
            }
            
         </div>

 
      )
   }
   else if(showJoinGroupPage){
      chattingPart=<GroupOtherOption/>
   }
   else{
      chattingPart=<h4>Nothing Choosed!</h4>
   }

   return (
      <div className={Classes.App}>
         <NavBar/>

         <div className={Classes.homePageData}>
            <h2>Group  Chatting Page</h2>
         </div>
         <div className={Classes.friendsNamePart}>
               <h3>Group List</h3>
               <hr/>
                  <button className={Classes.friendsName} onClick={()=>setShowJoinGroupPage(true)} style={{fontSize:'20px',fontWeight:'bold'}}>+</button>
               <hr/>
               <br/>
               {props.group_list.map(data=>{
                  return(
                     <div key={data.ID}>
                        <button className={Classes.friendsName} onClick={()=>{props.groupData(data.GroupID,userID);showGroupInfo(data.GroupID)}}>{data.GroupName}</button>
                     </div>
                  )
               })}
            </div>

            <div className={Classes.messagePart}>
               {chattingPart}
            </div>


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
export default  connect(mapStateToProps,mapDispatchToProps)(GroupChattingPage); 





//check before mesgage frensd or not
//chating page handling
//add friend




