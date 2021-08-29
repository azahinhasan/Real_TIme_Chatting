import React, {  useState,useEffect } from 'react';
import Classes from './BeforeLogin.css';
import * as action from '../store/actions/index';
import { connect } from 'react-redux';
import axios from '../hoc/auxx';
import {useHistory} from 'react-router-dom';

const SignUpPage=(props)=> {

   const [userName, setUserNmae]=useState('');
   const [userNameVerify, setUserNameVerify]=useState(true);
   const [name, setNmae]=useState('');
   const [password,setPassword]=useState('');
   const [msg,setMsg]=useState('');
   const [formValid,setFormValid]=useState(false);
   const redirectTo = useHistory();



   
   useEffect(() => {
      if(name!='' &&userName!='' &&password!='' &&userNameVerify!=false){
         setFormValid(true);
      }else{
         setFormValid(false);
      }
   }, [name,userName,password,userNameVerify]);

   
   const SignUp=()=>{
      console.log('sigup')
      props.SignUp(name,userName,password);
   }

   const userNameVerifyHandler=(data)=>{
      setUserNmae(data);

      axios.get('/signup/usernameverify/'+data)
         .then(r=>{
            if(r.data=='OK'){
               setUserNameVerify(true);
            }
            else{
               setUserNameVerify(false);
            }
         })
   }

   return (
      <div className={Classes.LoginPage}>
         <h2>Real Time Chatting App</h2>
         <hr/>
         <h3>Sign Up</h3>
         <form>
            <table>
               <tr>
                  <td><input type='name' placeholder="Name" onChange={e=>setNmae(e.target.value)} required/></td>
               </tr>
               <tr>
                  <td>
                     <input placeholder="Username" onChange={e=>userNameVerifyHandler(e.target.value)} required/>
                     <br/>
                     <div style={{color:'red'}}>{userNameVerify?'':'Username Already Taken'}</div>
                  </td>
            
               </tr>
               <tr>
                  <td><input placeholder="Password" onChange={e=>setPassword(e.target.value)} required/></td>
               </tr>
               <tr>
                  <td>
                     <br/>
                     <button type="submit" onClick={()=>SignUp()} disabled={!formValid?true:false}>Sign Up</button>
                     
                  </td>
               </tr>
            </table>
         </form>
         <hr/>
         <button type="submit" onClick={()=>{redirectTo.push('/login')}}>Log In</button>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
   
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      SignUp:(name,userName,password)=>dispatch(action.SignUp(name,userName,password))
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(SignUpPage); 




