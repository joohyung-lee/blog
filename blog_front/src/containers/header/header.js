import React from 'react';
import 'styles/header/header.scss';
import Modal from 'components/common/modal/modalCommon';
import * as modalActions from 'redux/modal/modalRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const Header = ({modalView}) => {
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
                <button onClick={modalView.openModal}>로그인</button>
            </div>
            <Modal>
                <h1>test</h1>
            </Modal>    
        </div>
    );
};

export default connect(
    null,
    (dispatch)=>({
        modalView: bindActionCreators(modalActions, dispatch)
    })
)(Header);