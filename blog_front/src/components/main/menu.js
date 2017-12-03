import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Motion,TransitionMotion,spring} from 'react-motion';

import {Link} from 'react-router-dom';
class Menu extends Component {   
    render() {
        return (
            <div className={`menu-list ${this.props.open?'open':''}`}>
                <ul>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""} to="/home">All Posts</Link>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""} to="/motionlab">Motion Lab</Link>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""}to="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""}to="/review">Review</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {

};

export default Menu;