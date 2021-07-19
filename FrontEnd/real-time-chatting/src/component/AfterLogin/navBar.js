import React, {  useState } from 'react';
import Classes from './AfterLogin.css';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const LoginPage=(props)=> {


   return (
      <div className={Classes.navBar}>
         <div className={Classes.leftSide}>
            <Link className={Classes.Link} to={{pathname: '/user/friends'}}>Friends</Link>
            <Link className={Classes.Link} to={{pathname: '/user/chatting'}}>Chatting</Link>
            <Link className={Classes.Link} to={{pathname: '/user/others'}}>Other</Link>
         </div>
         <div className={Classes.rightSide}>
         <Link className={Classes.LinkSignOut} to={{pathname: '/user/logout'}}>SignOut</Link>
         </div>
       
      </div>
   
   );

}


export default LoginPage; 




