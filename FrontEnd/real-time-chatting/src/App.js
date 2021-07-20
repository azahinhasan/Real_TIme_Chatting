import React, {  Component } from 'react';
import Classes from './App.css';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';

import * as action from './store/actions/index';
import { connect } from 'react-redux';

//pages
import LogInPage from './component/LoginPage';
import SignUpPage from './component/SignUpPage';
import LogOut from './component/LogOut';
import UserHome from './component/AfterLogin/userHomePage';
import ChattingPage from './component/AfterLogin/Chatting/ChattingPage';
import FriendsPage from './component/AfterLogin/Friends/FriednsPage';
import OtherPage from './component/AfterLogin/Others/OthersPage';

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
                  <Route path="/login" component={LogInPage}/>
                  <Route path="/signup" component={SignUpPage}/>
                  <Redirect to="/login"/>
              </Switch>
              :
              <Switch>
                  <Route path="/user/home" component={UserHome}/>
                  <Route path="/user/logout" component={LogOut}/>
                  <Route path="/user/chatting" component={ChattingPage}/>
                  <Route path="/user/friends" component={FriendsPage}/>
                  <Route path="/user/others" component={OtherPage}/>
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




