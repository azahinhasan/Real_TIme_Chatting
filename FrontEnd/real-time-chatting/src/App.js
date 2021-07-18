import React, {  Component } from 'react';
import Classes from './App.css';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';

import * as action from './store/actions/index';
import { connect } from 'react-redux';

//pages
import LoginPage from './component/LoginPage';
import LogOut from './component/LogOut';
import UserHome from './component/AfterLogin/userHomePage';
import ChattingPage from './component/AfterLogin/Chatting/ChattingPage';

class App extends Component {

  componentDidMount(){
    this.props.authCheckState();
  }

  render() {
    console.log(this.props.verifiedUser, "verifiedUser app,js");
    return (
      <div className={Classes.App}>
          {!this.props.verifiedUser?
              <Switch>
                  <Route path="/" component={LoginPage}/>
                  <Redirect to="/"/>
              </Switch>
              :
              <Switch>
                  <Route path="/user/home" component={UserHome}/>
                  <Route path="/user/logout" component={LogOut}/>
                  <Route path="/user/chatting" component={ChattingPage}/>
                  <Redirect to="/user/home"/>
              </Switch>
          }
      </div>
      
    );
  }
}


const mapStateToProps=state=>{
  return{
    verifiedUser:state.auth.verifiedUser
  }

}

const mapDispatchToProps=dispatch=>{
  return{
    authCheckState:()=>dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); 




