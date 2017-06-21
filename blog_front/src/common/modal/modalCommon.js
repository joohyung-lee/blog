import React, { Component, propTypes } from 'react';
import * as modalActions from '../../modules/modal/modalRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './modal.scss';
//modal wrapping
class Modal extends Component {
    handleClick= (e) => {
        if(e.target.className=='overlay'){
            const {modalView}=this.props;
           modalView.closeModal();
        }
    }
    render() {
        const {isOpen,children}=this.props;
        if(!isOpen) {
            return null;
        }
        return (         
            <ModalOut onClick={this.handleClick}>
                <div className="modal-wrap">
                    {children}
                </div>
            </ModalOut>          
        );
    }
}

Modal.propTypes = {

};

//modal contents
const ModalOut = ({children,onClick}) => {
    return (
        <div className="overlay" onClick={onClick}>
            {children}
        </div>
    );
};

ModalOut.propTypes = {
    
};

export default connect(
    (state) => ({
        isOpen: state.modalRedux.isOpen,
    }),
    (dispatch) => ({
        modalView: bindActionCreators(modalActions, dispatch),
    })
)(Modal);
