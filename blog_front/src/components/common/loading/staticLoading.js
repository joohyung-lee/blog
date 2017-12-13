import React, { Component } from 'react';
class StaticLoading extends Component {
    render() {
        return (
            <div className="loading-wrap">
                <div className="loading">
                    <svg className="circular">
                    <circle className="path" cx="60" cy="60" r="10" fill="none" strokeWidth="1" strokeMiterlimit="10"></circle>
                    </svg>
                </div>
                <p className="loading-msg">
                    {this.props.msg}
                </p>
            </div>
        );
    }
}
export default StaticLoading;