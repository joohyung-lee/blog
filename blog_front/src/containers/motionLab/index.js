import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import * as PostActions from 'redux/motionLab/motionLabRedux';
class MotionLab extends Component {
    componentDidMount() {
        PostActions.getPost();
    }
    render() {
        return (
            <div>
                <h1>MotionLab</h1>
            </div>
        );
    }
}

MotionLab.propTypes = {

};

export default MotionLab;