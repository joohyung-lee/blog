import React, { Component } from 'react';
import { AnimatedSwitch} from 'react-router-transition/lib/react-router-transition';
import {spring} from 'react-motion'
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'

//common style
import 'styles/common/common.scss';
//components
import {NotFound} from 'components/common/error'
import RoutePage from 'components/route'
//containers

import Header from 'containers/header';
import Main from 'containers/main';

//router animation
import RouterAnimation from 'containers/detail';
//redux
import * as modalActions from 'redux/modal';
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
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location
    if(locationChanged){
      const {modalView}=this.props;
      modalView.closeModal({
        modalName:'mymenu'
      })
    }
    
  }
  glide=(val)=>{
    return spring(val, {
      stiffness: 174,
      damping: 24,
    });
  }
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      //transform:`translateX(${styles.offset}px)`
    };
  }
  render() {
    const pageTransitions = {
      atEnter: {
        offset: 200,
        opacity:0
      },
      atLeave: {
        offset: this.glide(-200),
        opacity:1
      },
      atActive: {
        offset: this.glide(0),
        opacity:1
      },
    };
    
    const {authUser,header,motion}=this.props;  
    return (
        <div>
            <Header mode={header.isHeader} />
            <Route render={({ location}) => (
              <div>
                <AnimatedSwitch
                  className="page-wrap"
                  location={{...location,key:''}}
                  {...pageTransitions}
                  mapStyles={this.mapStyles}
                >
                  <Route exact path="/" component={Main}/>         
                  <Route component={RoutePage}/>     
                </AnimatedSwitch>  
              <RouterAnimation pathname={location.pathname} 
                eleX={motion.eleX} 
                eleY={motion.eleY} 
                eleW={motion.eleWidth-motion.itemPd*2} 
                eleH={motion.eleHeight-motion.itemPd*2}>
                >
                  <Route path="/motionlab/:id"/>
              </RouterAnimation>
            </div>
        )} />
        </div>
    );
  }
}

export default withRouter(connect(
  (state)=>({
    header:state.common.toJS(),
    authUser:state.auth.toJS().profile.user,
    modal:state.modal.toJS,
    motion:state.main.toJS().motions,
  }),
  (dispatch)=>({
    handleHeader:bindActionCreators(commonAction,dispatch),
    modalView:bindActionCreators(modalActions,dispatch)
  })
)
(App));
