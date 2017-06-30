import React, { Component } from 'react';
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
    fetch('/motionLab')
      .then(res => res.json())
      .then(motionLab => this.setState({ motionLab }));
  }
  render() {
    return (
      <div>
       {this.state.motionLab.map(user =>
          <div key={user.id}>{user.title}</div>
        )}
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
