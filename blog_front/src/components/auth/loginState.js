import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';
//svg
import DefaultAvatar from 'images/default-avatar';
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
                    <div>
                    {(this.props.view==='login')?
                        <button className="btn-login" onClick={this.props.dropdown}>Login</button>:
                        <div className="avatar-wrap" onClick={this.props.dropdown}>
                        
                            <div className="avatar" style={{backgroundImage:`url(${this.props.userImg})`}}>
                                {this.props.header?<DefaultAvatar open={this.props.avatarFace}/>:null}
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
                                    {this.props.adminUser?                           
                                        <li>
                                            <Link to="/admin/read">Admin Page</Link>
                                        </li>
                                    :null}
                                    <li>
                                        <Link to="/mypage/collections">Collections</Link>
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
export default LoginState;