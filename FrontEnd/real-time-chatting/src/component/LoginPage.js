import React, {  useState } from 'react';
import Classes from './BeforeLogin.css';
import * as action from '../store/actions/index';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';


const LoginPage=(props)=> {

   const [userName, setUserNmae]=useState('');
   const [password,setPassword]=useState('');
   const redirectTo = useHistory();

   const SignIn=()=>{
      props.SignIn(userName,password);
   }

   return (
      <div className={Classes.LoginPage}>
         <h2>Real Time Chatting App</h2>
         <hr/>
         <h3>Log In</h3>
         <form>
            <table>
               <tr>
                  <td><input placeholder="Username" onChange={e=>setUserNmae(e.target.value)}/></td>
               </tr>
               <tr>
                  <td><input placeholder="Password" onChange={e=>setPassword(e.target.value)}/></td>
               </tr>
               <tr>
                  <td>
                     <br/>
                     <div style={{color:'red'}}>{props.loginErrorMsg?'Wrong Password/Username':null}</div>
                     <br/>
                     <button type="submit" onClick={()=>SignIn()}>Log In</button>
                  </td>
               </tr>
            </table>
         </form>

         <hr/>
         <button onClick={()=>{redirectTo.push('/signup')}}>Sign Up</button>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      signedIn:state.auth.signedIn,
      loginErrorMsg:state.auth.loginErrorMsg
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      SignIn:(userName,password)=>dispatch(action.SignIn(userName,password))
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage); 




