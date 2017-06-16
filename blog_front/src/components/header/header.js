import React from 'react';
import './header.scss';
import { connect } from 'react-redux';

const Header = ({number}) => {
    return (
        <div className="global-nav">
            <div className="logo">
                <h1>JOOMATION</h1>
                {number}
            </div>    
            <div className="nav-contents">
                <ul>
                    <li>Motion Lab</li>
                    <li>About</li>
                </ul>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        number: state.something,
    })
)(Header);