import React, {  useState,useEffect } from 'react';
import Classes from './AfterLogin.css';
import * as action from '../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import NavBar from './navBar';
const LoginPage=(props)=> {
   const history = useHistory();


   useEffect(() => {
     //props.authCheckState();

   //   if(!props.verifiedUser){
   //       history.push('/user/logout');
   //   }
   }, []);

   return (
      <div className={Classes.App}>
         <NavBar/>

         <div className={Classes.homePageData}>
            <p>UserHOme Page</p>
         </div>
 

      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      verifiedUser:state.auth.verifiedUser
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      authCheckState:()=>dispatch(action.authCheckState())
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 




