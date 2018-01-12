import React, { Component } from 'react';
//components
import {LoginState} from 'components/auth';
import LoginToast from 'components/common/modal/loginToast';
import * as httpRequest from 'redux/helper/httpRequest';
//redux
import * as modalActions from 'redux/modal';
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//svg
import defaultAvatar from 'images/defaultAvatar.svg';
class AuthLogin extends Component {
    componentWillMount(){
        const {request} =this.props;
        request.getAuth({
            type:'AUTH/PROFILE'
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.authUser.isLogin !== this.props.authUser.isLogin) {
            const {authUser,modalView} =this.props;  
            modalView.closeModal({
                modalName:'mymenu'
            });    
            if(authUser.isLogin){
                setTimeout(()=>{ 
                    modalView.closeModal({
                        modalName:'toast'
                    }); 
                }, 1500);
            }else{
                modalView.openModal({
                    modalName:'toast'
                });
                setTimeout(()=>{ 
                    modalView.closeModal({
                        modalName:'toast'
                    }); 
                }, 1500);
            }
        } 
    }
    //logout
    logOut=()=>{
        const {request} =this.props;
        request.getAuthLogout({
            type:'AUTH/PROFILE_LOGOUT'
        });
    }

    render() {    
        const {authUser,modal} =this.props;  
        return (
            <div className="login-state">
                {
                (authUser.pending)?
                <div>
                </div>:              
                <LoginState 
                    view={(authUser.isLogin)?'mypage':'login'}
                    open={this.props.open}
                    dropdown={this.props.dropdown}
                    avatarFace={this.props.avatarFace}
                    userImg={authUser.isLogin?authUser.user.profileImg.isDefault?defaultAvatar:authUser.user.profileImg.url:''}  
                    logOut={this.logOut}
                    authLoading={authUser.pending}
                    adminUser={authUser.user.email==="joomation@gmail.com"?true:false}
                />   
                }    
                <LoginToast 
                    open={modal['toast'].open}
                    isLogin={authUser.isLogin}
                    userImg={authUser.isLogin?authUser.user.profileImg.isDefault?defaultAvatar:authUser.user.profileImg.url:''}  
                    type={authUser.user.type}>
                    {(authUser.pending)?
                    <p>
                        로딩중..
                    </p>:
                    <p>
                        {
                            (authUser.isLogin)?'Login Success':
                            'Logout'
                        }
                    </p>
                    }
                </LoginToast>    
            </div>
        );
    }
}
export default connect(
    (state)=>({
        modal:state.modal.toJS(),
        authUser:state.auth.toJS().profile
    }),
    (dispatch)=>({
        auth:bindActionCreators(authActions,dispatch),
        request:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch)
        
    })
)(AuthLogin);