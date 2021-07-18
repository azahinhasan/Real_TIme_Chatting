import React, {  Component } from 'react';
import Classes from './App.css';
import { connect } from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import * as action from './store/actions/index';
import LoginPage from './component/LoginPage';
class App extends Component {

  render() {

    return (
      <div className={Classes.App}>
           <Switch>
              <Route path="/" component={LoginPage}/>
              <Redirect to="/"/>
           </Switch>
      </div>
      
    );
  }
}


const mapStateToProps=state=>{
  return{
    signedIn:state.auth.signedIn
  }

}

const mapDispatchToProps=dispatch=>{
  return{
    authCheckState:()=>dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); 




