import React, { Component } from 'react';
import { AnimatedSwitch,AnimatedRoute } from 'react-router-transition/lib/react-router-transition';
import{spring} from 'react-motion';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'
//common style
import 'styles/common/common.scss';
//components
import {NotFound} from 'components/common/error';
import LoginModal from 'components/common/modal/loginModal';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {FadeTransition,DetailTransition,RouterMotion,DetailMotion} from 'components/route';
//containers
import {RedirectLogin} from 'components/loginPopup';
import {Profile} from 'containers/mypage';
import AdminMain from 'containers/admin/';
import Write from 'containers/admin/write';
import Posts from 'containers/admin/posts';
import Header from 'containers/header';
import Main from 'containers/main';
import {DetailView} from 'containers/detail';

//redux
import * as modalActions from 'redux/modal';
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonAction from 'redux/common';
import * as motionActions from 'redux/main';

class App extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){  
    
    const {handleHeader,motionDispatch}=this.props;
    let re = /(auth|loginPopup)/;
    let isAuth = re.test(this.props.location.pathname);
    
    handleHeader.isHeader({
      visible:!isAuth
  });
  }
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location;
    const {modalView,motionDispatch}=this.props;
    let detail=/(main|motionlab|project|review|posts)/;
    let isDetail = detail.test(nextProps.location.pathname);
    if(locationChanged){    
      if(!isDetail){
        motionDispatch.motionActions({
          motions:{
              offsetX:0,
              detailView:false
          }
        });
      }
      modalView.closeModal({
        modalName:'mymenu'
      });
      modalView.closeModal({
        modalName:'login'
      });
    }
  }
  fade=(val)=>{
    return spring(val, {
      stiffness: 200,
      damping: 26,
    });
  }
  move=(val)=>{
    return spring(val, {
      stiffness: 170,
      damping: 26,
    });
  }
  mainMapStyles(styles) {
    return {
      transform: `translateY(${styles.offsetY}px) scale(${styles.scale})`,
    };
  }
  pageMapStyles(styles) {
    return {
      opacity: styles.opacity,
    };
  }
  detailMapStyles(styles) {
    return {
      transform: `translateY(${styles.offsetY}%)`,
      width:`100%`,
    };
  }
  loginClose=()=>{
    const {modalView}=this.props;
    modalView.closeModal({
      modalName:'login'
    });
  }
  render() {
    const {authUser,header,motion,modal}=this.props;
    
    const pageTransitions = {
      atEnter: {
        opacity :0,
        offsetY: 70,
        scale:0.95
      },
      atLeave: {
        opacity: this.fade(0),
        offsetY: this.fade(70),
        scale:this.fade(0.95)
      },
      atActive: {
        opacity: this.fade(1),
        offsetY: this.fade(0),
        scale:this.fade(1)
      },
    };
    const detailLayer = {
      atEnter: {
        offsetY: 100,
      },
      atLeave: {
        offsetY: this.move(100)
      },
      atActive: {
        offsetY: this.move(0),
      },
    }
    return (
        <div>
            <LoginModal open={modal['login'].open} close={this.loginClose}/>
            <Header mode={header.isHeader} />
            <Route render={({location}) => (
              <div>
                <Route exact path="/" render={() => (
                  <Redirect to="/main"/>
                )}/>
                <AnimatedSwitch
                  className="page-wrap"
                  {...pageTransitions}             
                  mapStyles={(motion.detailView)?this.mainMapStyles:this.pageMapStyles}
                >  
                  <Route exact path="/:category" component={Main}/> 
                  <Route exact path="/posts/:category/:postId"/> 
                  <Route exact path="/admin" component={AdminMain}/>
                  <Route path="/admin/posts/:id" component={Posts}/>
                  <Route exact path="/admin/write" component={Write}/>
                  <Route path="/auth/loginPopup/:name" component={RedirectLogin}/>
                  <Route path="/mypage/profile" component={Profile}/>
                  
                  <Route component={NotFound}/>   
                </AnimatedSwitch>
                <AnimatedRoute
                  className={`detail-page-wrap ${(motion.detailView)?"hidden":""}`}
                  path="/posts/:category/:postId"
                  component={DetailView}
                  {...detailLayer}
                  mapStyles={this.detailMapStyles}
                />

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
    modal:state.modal.toJS(),
    motion:state.main.toJS().motions,
  }),
  (dispatch)=>({
    handleHeader:bindActionCreators(commonAction,dispatch),
    modalView:bindActionCreators(modalActions,dispatch),
    motionDispatch:bindActionCreators(motionActions,dispatch),
    
  })
)
(App));
