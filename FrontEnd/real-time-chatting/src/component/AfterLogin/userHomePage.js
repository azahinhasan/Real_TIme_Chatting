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
            <h2>Home Page</h2>

            <br/><br/>
            <div style={{fontSize:'20px',fontWeight:'bold'}}>
               <hr/>
               <div>Name</div>
               <br/>
               <div style={{border:'2px solid',padding:'15px'}}>{localStorage.getItem('Name')}</div>
               <br/>
               <hr/>
               <div>UserConnectID</div>
               <br/>
               <div style={{border:'2px solid',padding:'15px'}}>
                  <table>
                     <tr>
                        <td style={{width:'550px',borderRight:'2px black solid'}}>{localStorage.getItem('UserConnectID')}</td>
                        <td>
                        <button style={{height:'50px',fontWeight:'bold'}} className={Classes.blackBtn}  onClick={() => {navigator.clipboard.writeText(localStorage.getItem('UserConnectID'))}}>
                           COPY
                        </button>
                        </td>
                     </tr>
                  </table>
               </div>
              
            </div>
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




