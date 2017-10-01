import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion,spring} from 'react-motion';
import * as httpRequest from 'redux/helper/httpRequest';
//router
import {Link} from 'react-router-dom';

const springOption={
    enter:{
        stiffness: 230, 
        damping: 18
    },
    leave:{
        stiffness: 240, 
        damping: 15
    }
}
class LoginState extends Component {
    constructor(props){
        super(props);
        this.state={
            item:[]
        }
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.open !== this.props.open) {
            if(!this.props.open) {
                this.setState({
                    item:[]
                })
            }else{
                this.setState({
                    item:[
                        {
                            key: 'dropdown',
                            style:{
                                opacity:spring(1,springOption.enter),
                                size:spring(1,springOption.enter)
                            }
                        },
        
                    ]
                });
            }
          }    
    }
    willEnter=()=>{
        return {
            opacity:0.5,
            size:0
        }
    }
    willLeave=()=>{
        return{
            opacity:spring(0,springOption.leave),
            size:spring(0.5,springOption.leave)
        }
    }

    deArea=(e)=>{
        e.stopPropagation();
    }
    
    //구글 로그인
    googleLogin=()=>{
        window.open('/auth/loginPopup/goolge','google','_blank'); 
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
        return (
            <TransitionMotion
                styles={this.state.item.map(item=>({
                    key:item.key,
                    style:item.style
                }))}
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                didLeave={this.didLeave}              
            >
                {interpolatedStyles=>
                    <div className="login-state">
                    {(this.props.view==='login')?
                        <button className="btn-login" onClick={this.props.dropdown}>Login</button>:
                        <div className="avatar-wrap" onClick={this.props.dropdown}>
                            <span>{this.props.username}</span>
                            <div className="avatar" style={{backgroundImage:`url(${this.props.userImg})`}}>
                            </div>
                        </div>
                    }
                        {interpolatedStyles.map(config => {
                        return (
                            <div className="box-state"key={config.key} 
                                onClick={this.deArea}
                                style={{
                                    transform:`scale(${config.style.size})`,
                                    opacity:config.style.opacity
                                }}>
                            {
                            (this.props.authLoading)?
                            <h1>로딩중...</h1>
                            :
                            (this.props.view==='login')?
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
                                :
                                <ul className="my-state">
                                    <li>
                                        <Link to="/mypage/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="">Collections</Link>
                                    </li>
                                    <li>
                                        <Link to="">My comments</Link>
                                    </li>
                                    <li>
                                        <button onClick={this.props.logOut}>Log out</button>
                                    </li>
                                    
                                </ul>
                            }
                            </div>
                            )
                        })}
                    </div>
                }
            </TransitionMotion>
            
        );
    }
}

LoginState.propTypes = {

};
export default LoginState;