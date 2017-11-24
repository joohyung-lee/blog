import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion,spring} from 'react-motion';
const springOption={
    enter:{
        stiffness: 180, 
        damping: 30
    },
    leave:{
        stiffness: 180, 
        damping: 30
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
                        opacity:spring(1,springOption.enter)
                    },
                },

            ]
        }
    }
    willEnter=()=>{
        return {
            opacity:0
        }
    }
    willLeave=()=>{
        return{
            opacity:spring(0,springOption.leave)
        }
    }
    deArea=(e)=>{
        e.stopPropagation();
    }
    //구글 로그인
    googleLogin=()=>{
        window.open('/auth/loginPopup/google','google','_blank'); 
    }
    //페이스북 로그인
    facebookLogin=()=>{
        window.open('/auth/loginPopup/facebook','facebook','_blank'); 
    }
    //github 로그인
    githubLogin=()=>{
        window.open('/auth/loginPopup/github','github','_blank'); 
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
            <div>
                {interpolatedStyles.map(config => {
                return(
                    <div className="login-modal-wrap"
                        key={config.key}
                        style={{
                            opacity:config.style.opacity
                        }}
                        onClick={this.props.close}
                    >
                        <div onClick={this.deArea} className="login-modal-box">
                            <div className="login-title">
                                <h1>Login</h1>
                            </div>
                            <div className="login-content">
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
    open:React.PropTypes.bool,
};

export default LoginModal;