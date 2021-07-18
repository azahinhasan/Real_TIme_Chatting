import * as actionTypes from './actionTypes';
import axios  from '../../hoc/auxx';




export const authSuccess = () => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      verifiedUser: true,
   };
};

export const authFailed = (error) => {
   return {
       type: actionTypes.AUTH_FAILED,
       verifiedUser: false,
       error:error
   };
};


export const SignIn=(Username,Password)=>{
   return (dispatch)=>{

   axios.post('/login',{Username,Password})
      .then(r=>{

         if(r.data[0]!='userNotValid'){
            localStorage.setItem('Username',Username);
            localStorage.setItem('Token',r.data[1]);
            localStorage.setItem('Name',r.data[0]);
           // dispatch(authSuccess());
           dispatch(authCheckState());
         }
         

      })

   }
}

export const SignOut=()=>{
   return (dispatch)=>{

         localStorage.removeItem("Username");
         localStorage.removeItem("Token");
         localStorage.removeItem("Name");
         dispatch(authFailed());
      }
         
}


export const authCheckState=()=>{
   return (dispatch)=>{

   axios.post('/userauth/'+localStorage.getItem('Name'),{
      Token:localStorage.getItem('Token'),
      Username:localStorage.getItem('Username'),

   })
      .then(e=>{
         console.log(e.data)
         if(e.data=='userValid'){
            dispatch(authSuccess());
         }else{
            dispatch(authFailed());
         }
      
      })

   }
}