import React, { Component } from 'react';
import { AnimatedSwitch,AnimatedRoute } from 'react-router-transition/lib/react-router-transition';
import{spring} from 'react-motion';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'
//common style
import 'styles/common/common.scss';
//components
import {NotFound} from 'components/common/error';
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
    let isDetail = detail.test(this.props.location.pathname);
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
    }
  }
  motion=(val)=>{
    return spring(val, {
      stiffness: 174,
      damping: 24,
    });
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
 
  render() {
    const {authUser,header,motion}=this.props;
    const pageTransitions = {
      atEnter: {
        opacity: 0,
      },
      atLeave: {
        opacity: this.motion(0),
      },
      atActive: {
        opacity: this.motion(1),
      },
    };
    const detailLayer = {
      atEnter: {
        offsetY: 100,
      },
      atLeave: {
        offsetY: this.motion(100)
      },
      atActive: {
        offsetY: this.motion(0),
      },
    }
    return (
        <div>
            <Header mode={header.isHeader} />
            <Route render={({location}) => (
              <div>
                <AnimatedSwitch
                  className="page-wrap"
                  {...pageTransitions}
                  
                  mapStyles={this.pageMapStyles}
                >  
                  <Route exact path="/" render={()=>(
                    <Redirect to="/main"/>         
                  )} />
                  <Route exact path="/:category" component={Main}/> 
                  <Route exact path="/admin" component={AdminMain}/>
                  <Route path="/admin/posts/:id" component={Posts}/>
                  <Route exact path="/admin/write" component={Write}/>
                  <Route path="/auth/loginPopup/:name" component={RedirectLogin}/>
                  <Route path="/mypage/profile" component={Profile}/>
                  <Route exact path="/posts/:category/:postId"/> 
                  <Route component={NotFound}/>   
                </AnimatedSwitch>      
                <AnimatedRoute
                  className={`detail-page-wrap ${(motion.detailView)?"hidden":""}`}
                  path="/posts/:category/:postId"
                  component={DetailView}
                  {...detailLayer}
                  mapStyles={this.detailMapStyles}
                />
                {/* <RouterMotion 
                  open={motion.detailView}
                  eleX={motion.eleX} 
                  eleY={motion.eleY} 
                  eleW={motion.eleWidth} 
                  eleH={motion.eleHeight}
                  itemPd={motion.itemPd}
                >
                <Route 
                  location={location}
                  path="/posts/:category/:postId"  
                  component={DetailView}/> 
                </RouterMotion> */}

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
    modalView:bindActionCreators(modalActions,dispatch),
    motionDispatch:bindActionCreators(motionActions,dispatch),
    
  })
)
(App));
