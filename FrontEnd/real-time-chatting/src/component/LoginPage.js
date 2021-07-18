import React, {  useState } from 'react';
import Classes from './BeforeLogin.css';
import * as action from '../store/actions/index';
import { connect } from 'react-redux';

const LoginPage=(props)=> {

   const [userName, setUserNmae]=useState('');
   const [password,setPassword]=useState('');

   const SignIn=()=>{
      props.SignIn(userName,password);
   }

   return (
      <div className={Classes.App}>
         <form>
            <table>
               <tr>
                  <td>Username </td>
                  <td><input onChange={e=>setUserNmae(e.target.value)}/></td>
               </tr>
               <tr>
                  <td>Password </td>
                  <td><input onChange={e=>setPassword(e.target.value)}/></td>
               </tr>
               <tr>
                  <td></td>
                  <td>
                     <input type="submit" value="SignIn" onClick={SignIn}/>
                  </td>
               </tr>
            </table>
         </form>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      signedIn:state.auth.signedIn
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      SignIn:(userName,password)=>dispatch(action.SignIn(userName,password))
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 




