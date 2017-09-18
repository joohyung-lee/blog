import React, { Component } from 'react';
import {withRouter,Route,Switch} from 'react-router-dom'

//common style
import 'styles/common/common.scss';
//components
import {NotFound} from 'components/common/error'
//containers
import Header from './header/';
import Main from './main/';
import {Redirect} from 'components/loginPopup';
import AdminMain from './admin/';
import Write from './admin/write';
import Posts from './admin/posts';
//redux
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonAction from 'redux/common';
class App extends Component {
  
  componentDidMount(){  
    const {handleHeader}=this.props;
    let re = /(auth|loginPopup)/;
    let isAuth = re.test(this.props.location.pathname);
    handleHeader.isHeader({
      visible:!isAuth
  });
  }
  
  render() {
    const {authUser,header}=this.props;  
    return (
        <div>
            <Header mode={header.isHeader} />  
            <Switch>
              <Route exact path="/" component={Main}/>              
              <Route path="/motionlab" component={Main}/>
              <Route path="/auth/loginPopup/:name" component={Redirect}/>

              <Route exact path="/admin/" component={AdminMain}/>
              <Route exact path="/admin/write" component={Write}/>
              <Route path="/admin/posts/:id" component={Posts}/>
              <Route component={NotFound} statue={404}/> 
            </Switch>
        </div>
    );
  }
}

export default withRouter(connect(
  (state)=>({
    header:state.common.toJS(),
    authUser:state.auth.toJS().profile.user
  }),
  (dispatch)=>({
    handleHeader:bindActionCreators(commonAction,dispatch),
  })
)
(App));
