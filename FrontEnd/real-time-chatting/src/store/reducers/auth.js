import * as actionTypes from '../actions/actionTypes';

const initialState={
   verifiedUser:false,
   error:'',
   userId:'',
   name:'',
   loading:false
}


const reducer = ( state = initialState, action ) => {
   switch ( action.type ) {

      default:
         return state;
   }
};


export default reducer;