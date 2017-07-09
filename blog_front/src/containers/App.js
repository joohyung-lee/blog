import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'

//common style
import 'styles/common/common.scss';
//components
import Header from './header/';
import Main from './main'
import MotionLab from './motionLab'

//redux
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class App extends Component {
  constructor(){
    super();
    this.state={
      motionLab:[]
    }

  }
  
  render() {
    return (
        <div>
          <h2>{this.props.userId}</h2>
            <Header/>        
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/motionlab" component={MotionLab}/>     
              <Route component={NoMatch}/>
            </Switch>
        </div>
    );
  }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
export default connect(
  (state)=>({
        userId:state.auth.profile.uid
    }),
    (dispatch)=>({
        userInfo: bindActionCreators(authActions, dispatch)
    })
)
(App);
