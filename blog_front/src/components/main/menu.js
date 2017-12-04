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
                        <Link className={(this.props.linkLoading)?"disabled":""} to="/home">Home</Link>
                        <p>Discover all posts</p>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""} to="/motionlab">Motion Lab</Link>
                        <p>Creating a UI/UX Motion</p>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""}to="/projects">Projects</Link>
                        <p>Release projects</p>
                    </li>
                    <li>
                        <Link className={(this.props.linkLoading)?"disabled":""}to="/review">Review</Link>
                        <p>Review interest</p>
                    </li>
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {

};

export default Menu;