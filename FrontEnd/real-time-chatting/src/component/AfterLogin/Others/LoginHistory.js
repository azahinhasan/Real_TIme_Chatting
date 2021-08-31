import React, {  useState,useEffect } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
//npm i react-scroll-to-bottom
import Classes from '../AfterLogin.css';
import * as action from '../../../store/actions/index';
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux';


const LoginHistory=(props)=> {
   const history = useHistory();

   const [logOutFromOther,setlogOutFromOther]=useState('');
   const [friendKey,setFriendKey]=useState('');
   const [data,setData]=useState([]);


   useEffect(() => {
      props.loginActivityGet();
      console.log(props.loginActivityList,' Login Histroy');
   }, []);

   const logOutFromOtherDevice=()=>{

      props.logOutFromOtherDevice();
      setlogOutFromOther('LogOut From Other Device Success!');
     
   }


   return (
      <div className={Classes.FriendsPage}>

         <div className={Classes.homePageData}>
            <h2>Login Activity Page</h2>
            <table style={{width:'100%'}}>
            <ScrollToBottom  className={Classes.allLoginActivity}>
            {props.loginActivityList!=undefined?
               props.loginActivityList.map(data=>{
                  return(
                     <div key={data.ID} style={{border:'2px black solid',marginTop:'10px'}}>
                        <tr>
                           <td style={{width:'530px',borderRight:'2px black solid'}}> 
                              <table>
                                 <tr >
                                    <td style={{borderBottom:'2px black solid'}}>IP</td>
                                    <td style={{width:'45%',borderRight:'2px black solid',borderBottom:'2px black solid'}}>{data.IP}</td>
                                    <td style={{borderBottom:'2px black solid'}}>Time</td>
                                    <td style={{borderBottom:'2px black solid'}}>{data.Time}</td>

                                 </tr>
                                 <tr>
                                    <td>Address</td>
                                    <td style={{width:'45%',borderRight:'2px black solid'}}>{data.Address}</td>
                                    <td>Region</td>
                                    <td>{data.Region}</td>
                                 </tr>
                              </table>
                           </td>

                           <td>
                              <button style={{height:'50px',fontWeight:'bold'}} className={Classes.greenBtn} onClick={()=>props.loginActivityRemoveSingle(data.ID)}>It's ME</button>
                           </td>
                        </tr>
                     </div>
                  )
               })
               :
            <h3>No Login Activity!</h3>}
               </ScrollToBottom>
            </table>

         
         <br/><br/>
         <div>
            <hr/>
            <button className={Classes.redBtn} onClick={()=>{props.loginActivityRemoveAll()}}>REMOVE ALL</button>
            <hr/>
            <button  className={Classes.blueBtn} onClick={()=>{logOutFromOtherDevice()}}>SignOut From All Other Device</button>
            <div style={{color:'blue'}}>{logOutFromOther}</div>
            </div>
         </div>

      </div>
   
   );

}

const mapStateToProps=state=>{
   return{
      loginActivityList:state.auth.loginActivityList
   }

}

const mapDispatchToProps=dispatch=>{
   return{
      loginActivityGet:()=>dispatch(action.loginActivityGet()),
      loginActivityRemoveSingle:(dataID)=>dispatch(action.loginActivityRemoveSingle(dataID)),
      loginActivityRemoveAll:()=>dispatch(action.loginActivityRemoveAll()),
      logOutFromOtherDevice:()=>dispatch(action.logOutFromOtherDevice()),
      
   
   }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LoginHistory); 




