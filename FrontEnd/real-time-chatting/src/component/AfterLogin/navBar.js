import React, {  useState } from 'react';
import Classes from './AfterLogin.css';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const LoginPage=(props)=> {


   return (
      <div className={Classes.App}>
         <Link to={{pathname: '/user/friends'}}>Friends</Link>
         <Link to={{pathname: '/user/chatting'}}>Chatting</Link>
         <Link to={{pathname: '/user/other'}}>Other</Link>
         <Link to={{pathname: '/user/logout'}}>SignOut</Link>
      </div>
   
   );

}


export default LoginPage; 




