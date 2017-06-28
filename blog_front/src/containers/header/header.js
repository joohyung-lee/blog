import React, { Component, propTypes } from 'react';
//components
import Modal from 'components/common/modal/modalCommon';
import Overlay from 'components/common/overlay/overlay';
//firebase
import firebase from 'firebase';
//redux
import * as modalActions from 'redux/modal/modalRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//css
import 'styles/header/header.scss';


class Header extends Component {


    authLogin=()=>{
        
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.setCustomParameters({
        'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithRedirect(provider);
    
    }
    logOut=()=>{
        firebase.auth().signOut().then(function() {
        }, function(error) {
        // An error happened.
        });
    }
     closeOver=(e)=>{
        if(e.target.className=='overlay'){
            const {modalView} =this.props;
            modalView.closeModal({
                modalName:'login'
            });
        }
    }
    render(){
        const {modalView,modal} =this.props;
        return (
            <div className="global-nav">
                <div className="logo">
                    <h1>JOOMATION</h1>
                </div>    
                <div className="nav-contents">
                    <ul>
                        <li>Motion Lab</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className="login-state">
                    <button onClick={()=>modalView.openModal({modalName:'login'})}>로그인</button>
                </div>
                <Overlay open={modal['login'].open} closeOver={this.closeOver}>
                    <Modal open={modal['login'].open}>
                        <h1>test</h1>
                        <button onClick={this.authLogin}>구글로그인</button>
                        <button onClick={this.logOut}>구글로그아웃</button>
                    </Modal>    
                </Overlay> 
            </div>
        );
    }
};

export default connect(
    (state)=>({
        modal:state.modal
    }),
    (dispatch)=>({
        modalView: bindActionCreators(modalActions, dispatch)
    })
)(Header);