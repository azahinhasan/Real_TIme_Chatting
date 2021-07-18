import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';
const LoginPage=(props)=> {
   const history = useHistory();

   const [msg,setMsg]=useState('');
   const [resiverID,setresiverID]=useState('');

   useEffect(() => {
      props.friendsNameList(localStorage.getItem('UserID'));

   }, []);

   useEffect(() => {
      if(resiverID!=''){
         const interval = setInterval(() => {
        
            props.filterMessage(resiverID,localStorage.getItem('UserID'));
         }, 500000);
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
               {props.friendsList.map(data=>{
                  return(
                     <div>
                        <button className={Classes.friendsName} onClick={()=>showMasage(data.UserInfo.ID)}>{data.UserInfo.Name}</button>
                     </div>
                  )
               })}
            </div>

            <div className={Classes.messagePart}>
               <div className={Classes.allMessages}>
                  {props.messages.map(data=>{
                     return(
                        <div>
                           <span className={data.SenderID==localStorage.getItem('UserID')? Classes.messageSender:Classes.messageReciver}>
                              {data.Msg}
                           </span>
                           <br/><br/>
                        </div>
                     )
                  })}
               </div>
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




