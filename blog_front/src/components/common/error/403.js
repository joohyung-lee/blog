import React, { Component } from 'react';
import * as commonAction from 'redux/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconBack from 'images/iconBack';

class Forbidden extends Component {
    render() {
        return (
            <div>
                <div className="error-wrap">
                    <h1>403</h1>
                    <p>This data not exist.</p>
                    <a href="/home">
                        <span className="arrow-link">
                            <IconBack isBright={true}/>
                        </span>
                        Back to home
                    </a>
                    
                </div>
            </div>
        );
    }
}
export default connect(
    (state)=>({
        header:state.common.toJS()
    }),
    (dispatch)=>({
        handleHeader:bindActionCreators(commonAction,dispatch),
    })
  )(Forbidden);