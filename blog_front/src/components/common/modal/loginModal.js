import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion,spring} from 'react-motion';
const springOption={
    enter:{
        stiffness: 120, 
        damping: 18
    },
    leave:{
        stiffness: 120, 
        damping: 18
    },
    spring:{
        stiffness: 120, 
        damping: 15
    }
}
class LoginModal extends Component {
    componentDidUpdate(prevProps, prevState){
        if(prevProps.open !== this.props.open) {
            
          }    
    }
    getStyle=()=>{
        if(!this.props.open) {
            return[]
        }else{
            return[
                {
                    key: 'loginModal',
                    style:{
                        opacity:spring(1,springOption.enter),
                        scale:spring(1,springOption.spring)
                    },
                },

            ]
        }
    }
    willEnter=()=>{
        return {
            opacity:0,
            scale:1.1
        }
    }
    willLeave=()=>{
        return{
            opacity:spring(0,springOption.leave),
            scale:spring(1.1,springOption.spring)
        }
    }
    deArea=(e)=>{
        e.stopPropagation();
    }
    openDialog = (uri, name, options, closeCallback)=>{
        let win = window.open(uri, name, options);
        let interval = window.setInterval(function() {
            try {
                if (win == null || win.closed) {
                    window.clearInterval(interval);
                    closeCallback(win);
                }
            }
            catch (e) {
            }
        }, 100);
        return win;
    };
    //구글 로그인
    googleLogin=()=>{
        const uri='/auth/loginPopup/google';
        const popupName='google login';
        const options='_blank';
        this.openDialog(uri, popupName, options, function(win) {
            return window.loginSuccess();
        });        
    }
    //페이스북 로그인
    facebookLogin=()=>{
        const uri='/auth/loginPopup/facebook';
        const popupName='facebook login';
        const options='_blank';
        this.openDialog(uri, popupName, options, function(win) {
            return window.loginSuccess();
        });    
    }
    //github 로그인
    githubLogin=()=>{
        const uri='/auth/loginPopup/github';
        const popupName='github login';
        const options='_blank';
        this.openDialog(uri, popupName, options, function(win) {
            return window.loginSuccess();
        });    
    }
    render() {
        
        return(       
            <TransitionMotion
            styles={this.getStyle()}
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            didLeave={this.didLeave}              
        >
            {interpolatedStyles=>
            <div className="login-container">
                {interpolatedStyles.map(config => {
                return(
                    <div className="modal-wrap"
                        key={config.key}
                        style={{
                            opacity:config.style.opacity
                        }}
                        onClick={this.props.close}
                    >
                        <div onClick={this.deArea} className="modal-box"
                        style={{
                            transform:`scale(${config.style.scale})`
                        }}
                        >
                            <div className="btn-close" onClick={this.props.close}>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="modal-title">
                                <h1>
                                    <span className="logo">JOOMATION</span>
                                    LOGIN
                                </h1>
                            </div>
                            <div className="modal-contents">
                                <ul>
                                    <li className='google'>
                                        <button onClick={this.googleLogin}>Google</button>
                                    </li>
                                    <li className='facebook'>
                                        <button onClick={this.facebookLogin}>Facebook</button>
                                    </li>
                                    <li className='github'>
                                        <button onClick={this.githubLogin}>github</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-bottom">
                                <p className="text">Sign in to access this homepage, write comments and posts you love, and collect you love</p>
                                <p className="contact">joomation@gmail.com</p>
                            </div>
                        </div>
                    </div>
                )
                })}
            </div>  
            }
            </TransitionMotion>      
            );
        }
}

LoginModal.propTypes = {
    open:PropTypes.bool,
};

export default LoginModal;