import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import * as PostActions from 'redux/motionLab';
class MotionLab extends Component {
    componentDidMount() {
        axios.get(`/api/motionlab`).then((response)=>{
            console.log(response);
        });
        //PostActions.getPost();
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