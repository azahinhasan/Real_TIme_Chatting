import React, {  Component } from 'react';
import Classes from './App.css';

import {Route,Switch,withRouter,Redirect} from 'react-router-dom';

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

export default App; 




