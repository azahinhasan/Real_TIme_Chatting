import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';
const LoginPage=(props)=> {
   const history = useHistory();


   useEffect(() => {
      props.friendsNameList(localStorage.getItem('UserID'));

   }, []);


   const showMasage=(id)=>{

   }
   // console.log(props.friendsList)

   return (
      <div className={Classes.App}>
         <NavBar/>

         <div className={Classes.homePageData}>
            <p>friendsNameList Page</p>

            <div className={Classes.friendsName}>
               {props.friendsList.map(data=>{
                  return(
                     <div>
                        <button onClick={showMasage(data.UserInfo.ID)}>{data.UserInfo.Name}</button>
                     </div>
                  )
               })}
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
      filterMessage:()=>dispatch(action.filterMessage()),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 




