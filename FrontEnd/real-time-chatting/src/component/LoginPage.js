import React, {  Component } from 'react';
import Classes from './BeforeLogin.css';

const LoginPage=(props)=> {



   return (
      <div className={Classes.App}>
         <form>
            <table>
               <tr>
                  <td>Username </td>
                  <td><input /></td>
               </tr>
               <tr>
                  <td>Password </td>
                  <td><input /></td>
               </tr>
            </table>
         </form>
      </div>
   
   );

}

export default LoginPage; 




