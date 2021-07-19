import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';





const FriendsList=(props)=> {
   

   

   useEffect(() => {
      props.friendsNameList(localStorage.getItem('UserID'));
   }, []);


   return (
      <div className={Classes.FriendsReqPage}>

         <h3>Friends List</h3>
         
         <br/>
         <p>{props.friendRequesActiontMsg}</p>
         <br/>
         {props.friendsList !== ''? 
            <table style={{width:'100%'}}>
            {props.friendsList.map(data=>{
                  return(
                     <div key={data.ID} style={{border:'2px black solid',marginTop:'5px'}}>
                        <tr>
                           <td style={{width:'68.8%',borderRight:'2px black solid'}}> <span>{data.UserInfo.Name}</span></td>
                           <td>
                              <button className={Classes.blueBtn} onClick={""}>MESSAGE</button>
                              <button className={Classes.redBtn} onClick={()=>props.unfriend(data.UserInfo.ID,localStorage.getItem('UserID'))}>UNFIREND</button>
                           </td>
                        </tr>
                     </div>
                  )
            })}
         </table>
         :
         <h2>You Have No Friends!</h2>
      }
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      friendsList:state.user.friendsList,
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      friendsNameList:(UserID)=>dispatch(action.friendsNameList(UserID)),
      unfriend:(f1,f2)=>dispatch(action.unfriend(f1,f2)),
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(FriendsList); 




