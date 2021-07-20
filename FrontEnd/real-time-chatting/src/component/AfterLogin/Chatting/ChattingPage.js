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
      props.friendsNameList(localStorage.getItem('UserID'),'chatting');
      //scrollToBottom();

   }, []);

   useEffect(() => {
      if(resiverID!==''){
         const interval = setInterval(() => {
        
            props.filterMessage(resiverID,localStorage.getItem('UserID'));
         
         }, 50000);
         return () => clearInterval(interval);
      }
     
    }, []);



   const showMasage=(ResiverID)=>{
      setresiverID(ResiverID);
      props.filterMessage(ResiverID,localStorage.getItem('UserID'));
   }

   const sentMasage=(Senderid)=>{
      
      props.sentMessage(Senderid,localStorage.getItem('UserID'),msg);
      setMsg('');
   }
   // console.log(props.friendsList)


   let chattingPart = '';

   if(resiverID!==''){
      chattingPart=(
         <div>
               <ScrollToBottom  className={Classes.allMessages}>
                  {props.messages.map(data=>{
                     return(
                        <div>
                           
                           <span className={data.SenderID==localStorage.getItem('UserID')? Classes.messageSender:Classes.messageReciver}>
                              {data.Msg}
                           </span>
                           <br/>
                        </div>
                     )
                  })}
               
               </ScrollToBottom>

               
               <div className={Classes.msgTypingPart}>
               {props.theyAreFriend?  
                  <div>
                     <textarea 
                        placeholder="Type Your Message!" 
                        onChange={e=>{setMsg(e.target.value)}}
                        value={msg}
                        />
                     <button onClick={()=>sentMasage(resiverID)} disabled={msg.length<1? true: false}>SEND</button>
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
            <h2>Personal  Chatting Page</h2>
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
               {chattingPart}
            </div>


      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      friendsList:state.user.friendsList,
      messages:state.user.messages,
      theyAreFriend:state.user.theyAreFriend,
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      friendsNameList:(UserID,pageType)=>dispatch(action.friendsNameList(UserID,pageType)),
      filterMessage:(SenderID,ReceiverID)=>dispatch(action.filterMessage(SenderID,ReceiverID)),
      sentMessage:(SenderID,ReceiverID,Msg)=>dispatch(action.sentMessage(SenderID,ReceiverID,Msg)),

   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 





//check before mesgage frensd or not
//chating page handling
//add friend




