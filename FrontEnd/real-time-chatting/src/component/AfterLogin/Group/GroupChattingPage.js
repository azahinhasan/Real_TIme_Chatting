import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';

const GroupChattingPage=(props)=> {
   const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
   const history = useHistory();
   const [msg,setMsg]=useState('');
   const [groupID,setGroupID]=useState('');
   const [resiverName,setresiverName]=useState('');
   const messagesEndRef = useRef(null);
   const [groupMsg,setGroupMsg]=useState([]);
   const [isGroupMember,setIsGroupMember]=useState(false);
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
            props.groupList(localStorage.getItem('UserID'));
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

   const showGroupMasage=(GroupID,GroupMessage,GroupMempers)=>{
      setGroupID(GroupID);
      checkGroopMemberValidity(GroupMempers);
      setGroupMsg(GroupMessage);
   }

   const sentMasage=(GroupID)=>{
      
      props.sendGroupMsg(localStorage.getItem('UserID'),GroupID,msg);
      setMsg('');
   }
   // console.log(props.friendsList)


   let chattingPart = '';

   if(groupID!==''){
      chattingPart=(
         <div>
            <div className={Classes.chattingHeader}>{resiverName}</div>
               <ScrollToBottom  className={Classes.allMessages}>
                  {groupMsg.map(data=>{
                     return(
                        <div>
                           <br/><br/>
                           <span className={data.SenderID==localStorage.getItem('UserID')? Classes.messageSender:Classes.messageReciver}>
                              
                              {data.Msg}
                              <div style={{fontSize:'10px'}}>-Sent From {data.UserInfo.Name}</div>
                           </span>

                           <br/><br/>
                        </div>
                     )
                  })}
               
               </ScrollToBottom>

               
               <div className={Classes.msgTypingPart}>
               {isGroupMember?  
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
      )
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
               <h3>Friends List</h3>
               <hr/>
               {props.group_list.map(data=>{
                  return(
                     <div key={data.ID}>
                        <button className={Classes.friendsName} onClick={()=>showGroupMasage(data.ID,data.GroupInfo.GroupMsgs,data.Rank)}>{data.GroupInfo.GroupName}</button>
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

      group_list:state.user.group_list,
   
   }

}

const mapDispatchToProps=dispatch=>{
   return{

      groupList:(UserID)=>dispatch(action.groupList(UserID)),
      sendGroupMsg:(SenderID,GroupID,Msg)=>dispatch(action.sendGroupMsg(SenderID,GroupID,Msg)),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(GroupChattingPage); 





//check before mesgage frensd or not
//chating page handling
//add friend




