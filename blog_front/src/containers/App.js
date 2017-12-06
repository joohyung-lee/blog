import React, { Component } from 'react';
import { AnimatedSwitch,AnimatedRoute } from 'react-router-transition/lib/react-router-transition';
import{spring} from 'react-motion';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'
//joomation style
import 'styles/joomation.scss';
//components
import LoginModal from 'components/common/modal/loginModal';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {MainRoute,SearchRoute} from 'components/route';

//containers
import {RedirectLogin} from 'components/loginPopup';
import {Profile} from 'containers/mypage';
import AdminMain from 'containers/admin';
import Write from 'containers/admin/write';
import Header from 'containers/header';
import {DetailView} from 'containers/detail';

//redux
import * as modalActions from 'redux/modal';
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonAction from 'redux/common';
import * as motionActions from 'redux/main';

//error
import {NotFound,Forbidden} from 'components/common/error';
//font
import FontFaceObserver from 'fontfaceobserver';

var font = new FontFaceObserver('Roboto');

font.load().then(function () {
  console.log('fonts has loaded.');
});

class App extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){  
    const {handleHeader}=this.props;

    let re = /(auth|loginPopup)/;
    let isAuth = re.test(this.props.location.pathname);
    if(isAuth){
      handleHeader.isHeader({
        visible:false
    });
  }
  }
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location;
    const {modalView,motionDispatch,motion}=this.props;
    const nextUrl=nextProps.location.pathname.split('/');
    const thisUrl=this.props.location.pathname.split('/');
    if(locationChanged){    
      if(nextUrl[1]==='posts'){
        motionDispatch.motionActions({
          motions:{
              scale:true,
              detailView:true
          }
        });
      }else{
        if(thisUrl[1]==='posts'){
            motionDispatch.motionActions({
              motions:{
                  scale:false,
                  detailView:true
              }
            });
        }else{
          motionDispatch.motionActions({
            motions:{
                scale:false,
                detailView:false
            }
          });
        }
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
      stiffness: 300,
      damping: 26,
    });
  }
  move=(val)=>{
    return spring(val, {
      stiffness: 120,
      damping: 15,
    });
  }
  mainMapStyles(styles) {
    return {
      opacity: 1,
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
    const {adminError,adminLoading,postsError,postsLoading,header,motion,modal}=this.props;
    
    const pageTransitions = {
      atEnter: {
        opacity :0,
        offsetY: 5,
        scale:0.92
      },
      atLeave: {
        opacity: this.fade(1),
        offsetY: this.move(5),
        scale:this.move(0.92)
      },
      atActive: {
        opacity: this.fade(1),
        offsetY: this.move(0),
        scale:this.move(1)
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
              <Route render={({location}) => {
                if(adminError===403 || postsError===403){
                  return <Route component={Forbidden}/>
                }
                if(postsError===404){
                  return <Route component={NotFound}/>
                }
                return <div>
                  <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                  )}/>
                  
                  <AnimatedSwitch
                    className={`page-wrap ${motion.scale?'scale':''}`}
                    {...pageTransitions}             
                    mapStyles={(motion.detailView)?this.mainMapStyles:this.pageMapStyles}
                  >  
                    <Route exact path="/"/> 
                    <Route path="/search" component={SearchRoute}/>
                    <Route exact path="/:category" component={MainRoute}/> 
                     
                    <Route exact path="/posts/:category/:postId"/> 
                    <Route path="/auth/loginPopup/:name" component={RedirectLogin}/>
                    <Route path="/mypage/profile" component={Profile}/>
                    <Route exact path="/admin/read" component={AdminMain}/>
                    <Route exact path="/admin/write" component={Write}/>
                    <Route path="/admin/write/:id" component={Write}/>
                    <Route component={NotFound}/>   
                  </AnimatedSwitch>
                  <AnimatedRoute
                    className={`detail-page-wrap`}
                    path="/posts/:category/:postId"
                    component={DetailView}
                    {...detailLayer}
                    mapStyles={this.detailMapStyles}
                  />
              </div>
            }}/>
        </div>
    );
  }
}

export default withRouter(connect(
  (state)=>({
    postsError:state.posts.toJS().listData.error,
    postsLoading:state.posts.toJS().listData.pending,
    adminError:state.auth.toJS().adminProfile.error,
    adminLoading:state.auth.toJS().adminProfile.pending,
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
