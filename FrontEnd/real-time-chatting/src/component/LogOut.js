import React, {  useEffect } from 'react';
import * as action from '../store/actions/index';
import { connect } from 'react-redux';
import LoginPage  from './LoginPage';
import {Route,Switch,Redirect,useHistory} from 'react-router-dom';

const LogOut=(props)=> {

   const history = useHistory();

      useEffect(() => {
         props.SignOut();
         history.push('/');
      }, []);

   return (
      <div className={""}>
      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      SignOut:()=>dispatch(action.SignOut())
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LogOut); 




