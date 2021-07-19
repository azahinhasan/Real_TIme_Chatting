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

export const loginActivityLsit = (data) => {
   return {
       type: actionTypes.LOGINACTIVITYLIST,
       loginActivityList: data
   };
};



export const SignIn=(Username,Password)=>{
   return (dispatch)=>{

   axios.post('/login',{Username,Password})
      .then(r=>{

         if(r.data[0]!=='userNotValid'){
            localStorage.setItem('Username',Username);
            localStorage.setItem('Token',r.data[1]);
            localStorage.setItem('Name',r.data[0]);
            localStorage.setItem('UserID',r.data[2]);
           // dispatch(authSuccess());
           dispatch(authCheckState());
           dispatch(trackLocation());

         }
         

      })

   }
}

export const trackLocation=()=>{
   return (dispatch)=>{
      axios.get('https://extreme-ip-lookup.com/json/')
         .then(r=>{
            console.log(r.data);

            axios.post('/loginActivityStore',{
               IP:r.data.query,
               Address:r.data.city+','+r.data.country,
               Time: new Date().toLocaleString(),
               Region:r.data.continent,
               UserID:localStorage.getItem('UserID')
            })
               .then(rs=>{
                  console.log(rs.data, 'Login Activity History');
               })
         })

      }
         
}




export const SignOut=()=>{
   return (dispatch)=>{

         localStorage.removeItem("Username");
         localStorage.removeItem("Token");
         localStorage.removeItem("Name");
         localStorage.removeItem("UserID");
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
         if(e.data==='userValid'){
            dispatch(authSuccess());
         }else{
            dispatch(authFailed());
         }
      
      })

   }
}



export const loginActivityGet=()=>{
   return (dispatch)=>{

      axios.get('/loginActivity/'+localStorage.getItem('UserID'))
         .then(r=>{
            dispatch(loginActivityLsit(r.data));
         })
         
}}


export const loginActivityRemoveSingle=(dataID)=>{
   return (dispatch)=>{

      axios.delete('/loginActivity/'+dataID)
         .then(r=>{
            console.log(r.data, ' login Activity Remove Single');
            dispatch(loginActivityGet());
         })
         
}}

export const loginActivityRemoveAll=()=>{
   return (dispatch)=>{

      axios.delete('/loginActivityAll/'+localStorage.getItem('UserID'))
         .then(r=>{
            dispatch(loginActivityGet());
         })
         
}}


export const logOutFromOtherDevice=()=>{
   return (dispatch)=>{

      axios.put('/logout_fromother_device/'+localStorage.getItem('Username')+'/'+localStorage.getItem('Token'))
         .then(r=>{
            //dispatch(loginActivityGet());
            localStorage.setItem('Token',r.data);
            console.log(r.data,' New Token');
         })
         
}}