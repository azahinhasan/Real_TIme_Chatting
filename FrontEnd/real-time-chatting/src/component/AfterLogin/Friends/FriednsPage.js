import React, {  useState,useEffect } from 'react';
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from '../navBar';

import FriendsReqList from './FriendsReqPage';
import FriendsListPage from './FriendsList';

const FriendsPage=(props)=> {
   const history = useHistory();

   const [pageDataOf,setPageDataOf]=useState('list');
   const [friendKey,setFriendKey]=useState('');


   useEffect(() => {

   }, []);

   const sentReq=()=>{

      props.friendReqSent(friendKey,localStorage.getItem('UserID'));
   }



   let pageData='';

   if(pageDataOf=='add'){
      pageData=(
         <div>
            <h3>ADD FRIEND</h3>
            <br/>
            <input onChange={e=>setFriendKey(e.target.value)} placeholder="Enter Friend Key"/>
            <br/>
            <p>{props.friendRequestMsg}</p>
            <br/>
            <button onClick={()=>sentReq()}>SEND</button>
         </div>
      )
   }
   else if(pageDataOf=='request'){
      pageData=<FriendsReqList/>
   }
   else if(pageDataOf=='list'){
      pageData=<FriendsListPage/>
   }
   return (
      <div className={Classes.FriendsPage}>
         <NavBar/>

         <div className={Classes.homePageData}>
            <p>Friends Page</p>
            <button onClick={()=>{setPageDataOf('add')}}>ADD FRIEND</button>
            <button  onClick={()=>{setPageDataOf('list')}}>FRIENDS LIST</button>
            <button  onClick={()=>{setPageDataOf('request')}}>FRIENDS REQUEST</button>
            <hr/>

          {pageData}
         
         
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
export default  connect(mapStateToProps,mapDispatchToProps)(FriendsPage); 




