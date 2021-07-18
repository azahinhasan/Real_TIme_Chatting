import React, {  useState,useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';
const LoginPage=(props)=> {
   const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
   const history = useHistory();
   const [msg,setMsg]=useState('');
   const [resiverID,setresiverID]=useState('');
   const messagesEndRef = useRef(null);

   // const scrollToBottom = () => {
   //    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   //  }

   useEffect(() => {
      props.friendsNameList(localStorage.getItem('UserID'));
      //scrollToBottom();

   }, []);

   useEffect(() => {
      if(resiverID!=''){
         const interval = setInterval(() => {
        
            props.filterMessage(resiverID,localStorage.getItem('UserID'));
         
         }, 500);
         return () => clearInterval(interval);
      }
     
    }, []);



   const showMasage=(ResiverID)=>{
      setresiverID(ResiverID);
      props.filterMessage(ResiverID,localStorage.getItem('UserID'));
   }

   const sentMasage=(Senderid)=>{
      setMsg('');
      props.sentMessage(Senderid,localStorage.getItem('UserID'),msg)
   }
   // console.log(props.friendsList)

   return (
      <div className={Classes.App}>
         <NavBar/>

         <div className={Classes.homePageData}>
            <p>friendsNameList Page</p>
         </div>
         <div className={Classes.friendsNamePart}>
               <h3>Friends List</h3>
               <hr/>
               {props.friendsList.map(data=>{
                  return(
                     <div>
                        <button className={Classes.friendsName} onClick={()=>showMasage(data.UserInfo.ID)}>{data.UserInfo.Name}</button>
                     </div>
                  )
               })}
            </div>

            <div className={Classes.messagePart}>
               <ScrollToBottom  className={Classes.allMessages}>
                  {props.messages.map(data=>{
                     return(
                        <div key={data.ID}>
                           
                           <span className={data.SenderID==localStorage.getItem('UserID')? Classes.messageSender:Classes.messageReciver}>
                              {data.Msg}
                           </span>
                  
                           {/* <div ref={messagesEndRef} /> */}
                           <br/>
                        </div>
                     )
                  })}
               
               </ScrollToBottom>
               <div className={Classes.msgTypingPart}>
                  <textarea 
                     placeholder="Type Your Message!" 
                     onChange={e=>{setMsg(e.target.value)}}
                     value={msg}
                     />
                     
                  <button onClick={()=>sentMasage(resiverID)} disabled={msg.length<1? true: false}>SEND</button>
               
               </div>
            
            </div>


      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      friendsList:state.user.friendsList,
      messages:state.user.messages,
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      friendsNameList:(UserID)=>dispatch(action.friendsNameList(UserID)),
      filterMessage:(SenderID,ReceiverID)=>dispatch(action.filterMessage(SenderID,ReceiverID)),
      sentMessage:(SenderID,ReceiverID,Msg)=>dispatch(action.sentMessage(SenderID,ReceiverID,Msg)),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 




