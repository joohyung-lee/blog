import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

//common style
import 'styles/common/common.scss';
//components
import Header from './header/header';
import Main from './main'
import MotionLab from './motionLab'

//redux
import * as authActions from 'redux/auth/authRedux';
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
      <Router>
        <div>
          <h2>{this.props.userId}</h2>
            <Header/>        
            <Route exact path="/" component={Main}/>
            <Route path="/motionLab" component={MotionLab}/>       
        </div>
      </Router>
    );
  }
}

export default connect(
  (state)=>({
        userId:state.auth.profile.uid
    }),
    (dispatch)=>({
        userInfo: bindActionCreators(authActions, dispatch)
    })
)
(App);
