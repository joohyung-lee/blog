import React, { Component, propTypes } from 'react';
//components
import Modal from 'components/common/modal/modalCommon';
import Overlay from 'components/common/overlay/overlay';
//redux
import * as modalActions from 'redux/modal/modalRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//css
import 'styles/header/header.scss';


class Header extends Component {
     closeOver=(e)=>{
        if(e.target.className=='overlay'){
            const {modalView} =this.props;
            modalView.closeModal();
        }
    }
    render(){
        const {modalView,open} =this.props;
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
                <Overlay open={open} closeOver={this.closeOver}>
                    <Modal open={open}>
                        <h1>test</h1>
                    </Modal>    
                </Overlay> 
            </div>
        );
    }
};

export default connect(
    (state)=>({
        open:state.modalRedux.open
    }),
    (dispatch)=>({
        modalView: bindActionCreators(modalActions, dispatch)
    })
)(Header);