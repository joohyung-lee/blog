import React, { Component } from 'react';
import axios from 'axios';
import 'styles/common/common.scss';
import Header from './header/header';

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
  componentDidMount() {
    axios.get('/motionLab')
             .then(response => console.log(response.data));
  }
  render() {
    return (
      <div>
        <h2>{this.props.userId}</h2>
          <Header/>
      </div>
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
