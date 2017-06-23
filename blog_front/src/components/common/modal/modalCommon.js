import React, { Component, propTypes } from 'react';
import 'styles/common/modal/modal.scss';

//modal 컴포넌트
const Modal=({open,children})=> {
    if(!open) {
            return null;
        }
    return(       
        <div className="modal-wrap">
            {children}
        </div>        
    );
};

Modal.propTypes = {
    children:React.PropTypes.node,
    open:React.PropTypes.bool,
};

export default Modal;
