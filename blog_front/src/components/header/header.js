import React from 'react';
import './header.scss';
import Modal from '../../common/modal/modalCommon';

const Header = () => {
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
                <button>로그인</button>
            </div>
            <Modal isOpen={true}/>
        </div>
    );
};

export default Header;