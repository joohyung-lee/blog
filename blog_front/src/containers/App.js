import React, { Component } from 'react';
import { AnimatedSwitch,AnimatedRoute } from 'react-router-transition/lib/react-router-transition';
import{spring} from 'react-motion';
import {withRouter,Route,Redirect} from 'react-router-dom'
import MobileDetect from 'mobile-detect';

//polyfill
import 'lib/arrayFind';
//joomation style
import 'styles/joomation.scss';
//components
import LoginModal from 'components/common/modal/loginModal';

import {MainRoute,SearchRoute,AdminRoute} from 'components/route';

//pages
import {RedirectLogin,Collections,Header,DetailView,DetailBlog} from 'components/pages';

//redux
import * as modalActions from 'redux/modal';
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
    this.state={
      mobile:false
    }
  }
  componentDidMount(){  
    const {handleHeader}=this.props;
    let md = new MobileDetect(window.navigator.userAgent);
    if(md.mobile()){
      this.setState({
        mobile:true
      })
    }else{
      this.setState({
        mobile:false
      })
    }
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
    const {modalView,motionDispatch,handleHeader,motion}=this.props;
    const nextUrl=nextProps.location.pathname.split('/');
    const thisUrl=this.props.location.pathname.split('/');
    let isBright = (this.get_brightness(nextProps.motion.bgColor) > 160);
    if(nextUrl[1]==='posts' || nextUrl[1]==='blog'){
      handleHeader.isBrightness({
        isBright:isBright
      });  
    }
    if(locationChanged){
      if(nextUrl[1]==='posts' || nextUrl[1]==='blog'){
        motionDispatch.motionActions({
          motions:{
              scale:true,
              detailView:true,
          }
        });
        handleHeader.isBrightness({
          isBright:isBright
        });
       
      }else{
        handleHeader.isBrightness({
          isBright:true
        });  
        if(thisUrl[1]==='posts' || thisUrl[1]==='blog'){
            motionDispatch.motionActions({
              motions:{
                  scale:false,
                  detailView:true,
                  
              }
            });
        }else{
          motionDispatch.motionActions({
            motions:{
                scale:false,
                detailView:false,
                frameFull:false,
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
      stiffness: 150,
      damping: 24,
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
      transform: `translateX(${styles.offsetX}%)`,
      width:`100%`,
    };
  }
  loginClose=()=>{
    const {modalView}=this.props;
    modalView.closeModal({
      modalName:'login'
    });
  }
  get_brightness=(hexCode)=>{
    // strip off any leading #
    hexCode = hexCode.replace('#', '');
  
    var c_r = parseInt(hexCode.substr(0, 2),16);
    var c_g = parseInt(hexCode.substr(2, 2),16);
    var c_b = parseInt(hexCode.substr(4, 2),16);
    return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  }
  render() {
    const {adminError,postsError,header,motion,modal}=this.props;
    const{mobile} = this.state;
    const pageTransitions = {
      atEnter: {
        opacity :0,

      },
      atLeave: {
        opacity: this.fade(0),
      },
      atActive: {
        opacity: this.fade(1),
      },
    };
    const detailLayer = {
      atEnter: {
        offsetX: 100,
      },
      atLeave: {
        offsetX: this.move(100)
      },
      atActive: {
        offsetX: this.move(0),
      },
    }
    return (
        <div className="app">
            <LoginModal open={modal['login'].open} close={this.loginClose}/>
            {header.isHeader?<Header/>:null}
            
              <Route render={({location}) => {
                if(adminError===403 || postsError===403){
                  return <Route component={Forbidden}/>
                }
                if(postsError===404){
                  return <Route component={NotFound}/>
                }
                return (
                  <div className="container">
                    <Route exact path="/" render={() => (
                      <Redirect to="/home"/>
                    )}/>
                    
                    <AnimatedSwitch
                      className={`page-wrap ${motion.scale?'scale':''}`}
                      {...pageTransitions}             
                      mapStyles={(motion.detailView)?this.mainMapStyles:this.pageMapStyles}
                    >  
                      <Route exact path="/"/> 
                      <Route path="/posts/:category/:postId"/>
                      <Route path="/blog/:category/:postId"/>
                      <Route path="/search" component={SearchRoute}/> 
                      <Route path="/admin" component={AdminRoute}/> 
                      <Route path="/mypage/collections" component={Collections}/>
                      <Route path="/auth/loginPopup/:name" component={RedirectLogin}/>
                      <Route path="/:category" component={MainRoute}/> 
                    </AnimatedSwitch>
                    <AnimatedRoute
                      className={`detail-page-wrap ${!mobile?'fixed':''}`}
                      path="/posts/:category/:postId"
                      component={DetailView}
                      {...detailLayer}
                      mapStyles={this.detailMapStyles}
                    />
                    <AnimatedRoute
                      className={`detail-page-wrap blog ${!mobile?'fixed':''}`}
                      path="/blog/:category/:postId"
                      component={DetailBlog}
                      {...detailLayer}
                      mapStyles={this.detailMapStyles}
                    />
                </div>
                )
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
)(App));
