import React, { propTypes } from 'react';
//모달이나 레이어 띄울때 바깥영역을 만들어주고, 클릭이벤트를 연결해준다.
const Overlay = ({children,open,closeOver}) => {
    if(!open) {
            return null;
        }
    return (
        <div className="overlay" onClick={closeOver}>
            {children}
        </div>
    );
};

Overlay.propTypes = {
    children:React.PropTypes.node,
    open:React.PropTypes.bool,
    closeOver:React.PropTypes.func
};

export default Overlay;
