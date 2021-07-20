import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';

import LoginHistory from './LoginHistory';

const OthersPage=(props)=> {
   const history = useHistory();

   const [pageDataOf,setPageDataOf]=useState('list');
   const [friendKey,setFriendKey]=useState('');


   useEffect(() => {

   }, []);


   return (
      <div className={Classes.FriendsPage}>
         <NavBar/>

         <div className={Classes.homePageData}>
            {/* <p>OthersPage Page</p> */}
            <LoginHistory/>
         </div>

      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      friendRequestMsg:state.user.friendRequestMsg
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      friendReqSent:(FriendKey,SenderID)=>dispatch(action.friendReqSent(FriendKey,SenderID))
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(OthersPage); 




