import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import {LoginState} from 'components/auth';
import LoginToast from 'components/common/modal/loginToast';
import * as httpRequest from 'redux/helper/httpRequest';
//redux
import * as modalActions from 'redux/modal';
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defaultAvatar from 'images/defaultAvatar.svg';
class AuthLogin extends Component {
    componentWillMount(){
        const {request} =this.props;
        request.getAuth({
            type:'AUTH/PROFILE'
        })
    }
    componentDidMount(){         
        const{modal}=this.props;
        window.addEventListener('click',this.outHide);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.authUser.isLogin !== this.props.authUser.isLogin) {
            const {authUser,modalView} =this.props;      
            if(authUser.isLogin){
                if(authUser.cookie){
                    return;
                }else{
                    setTimeout(function(){ 
                        modalView.closeModal({
                            modalName:'toast'
                        }); 
                    }, 2500);
                }
            }else{
                modalView.openModal({
                    modalName:'toast'
                });
                setTimeout(function(){ 
                    modalView.closeModal({
                        modalName:'toast'
                    }); 
                }, 2500);
            }
        } 
    }
    //메뉴 드랍다운
    dropdown=(e)=>{
        e.stopPropagation();
        const {modal,modalView}=this.props;
        if(modal.mymenu.open){
            modalView.closeModal({
                modalName:'mymenu'
            }); 
        }else{
            modalView.openModal({
                modalName:'mymenu'
            }); 
        }      
    }
    //바깥 클릭 시 메뉴드랍 접기
    outHide=(e)=>{
        const {modalView,modal}=this.props;
        if(modal.mymenu.open){
            modalView.closeModal({
                modalName:'mymenu'
            });
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
            <div>
                {
                (authUser.pending)?
                <div className="login-state">
                    
                </div>:              
                <LoginState 
                    view={(authUser.isLogin)?'mypage':'login'}
                    open={modal['mymenu'].open}
                    dropdown={this.dropdown}
                    userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg} 
                    logOut={this.logOut}
                    authLoading={authUser.pending}
                    username={authUser.user.userName}
                />   
                }    
                <LoginToast 
                    open={modal['toast'].open}
                    userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg} 
                    type={authUser.user.type}>
                    {(authUser.pending)?
                    <p>
                        로딩중..
                    </p>:
                    <p>
                        {
                            (authUser.isLogin)?'Login Success':
                            'Logout Success'
                        }
                    </p>
                    }
                </LoginToast>    
            </div>
        );
    }
}

AuthLogin.propTypes = {

};
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