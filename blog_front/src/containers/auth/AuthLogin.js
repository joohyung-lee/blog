import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import {LoginState} from 'components/auth'
import Modal from 'components/common/modal/modalCommon';
import Overlay from 'components/common/overlay/overlay';
import * as httpRequest from 'redux/helper/httpRequest';
//redux
import * as modalActions from 'redux/modal';
import * as authActions from 'redux/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class AuthLogin extends Component {
    componentDidMount(){         
        let loginData = this.getCookie('user');
        if(typeof loginData === "undefined"){
            return;
        }else{
            loginData = JSON.parse(atob(loginData));
            const {auth}=this.props;
            auth.profileCookie({
                userInfo:loginData
            });
        }
    }
    // 쿠키가져오기
    getCookie=(name)=>{
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    closeOver=(e)=>{
        if(e.target.className=='overlay'){
            const {modalView} =this.props;
            modalView.closeModal({
                modalName:'alert'
            });
        }
    }
    // 쿠키 생성
    setCookie=(cName, cValue, cDay)=>{
        let expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        let cookies = cName + '=' + escape(cValue) + '; path=/ '; 
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }
    //logout
    logOut=()=>{
        const {request} =this.props;
        request.getAuthLogout({
            type:'AUTH/PROFILE_LOGOUT'
        });
        this.setCookie('user', '', -1);
    }
    render() {
        const {authUser,modal} =this.props;        
        return (
            <div>
                <LoginState 
                    view={(authUser.isLogin)?'mypage':'login'}
                    logOut={this.logOut}
                    authLoading={authUser.user.pending}
                    username={authUser.user.userName}
                />         
                <Overlay open={modal['alert'].open} closeOver={this.closeOver}>
                    <Modal open={modal['alert'].open}>
                        <h1>{authUser.user.userName}</h1>
                        <button>OK</button>
                    </Modal>    
                </Overlay>
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