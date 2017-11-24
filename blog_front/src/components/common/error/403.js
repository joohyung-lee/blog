import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as commonAction from 'redux/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Forbidden extends Component {
    componentWillMount(){
        const {handleHeader}=this.props;
        handleHeader.isHeader({
            visible:false
        });
    }
    render() {
        return (
            <div>
                <h1>403</h1>
                <p>{this.props.pathname}</p>
                <a href="/home">home으로 가기</a>
            </div>
        );
    }
}

Forbidden.propTypes = {

};

export default connect(
    (state)=>({
        header:state.common.toJS()
    }),
    (dispatch)=>({
        handleHeader:bindActionCreators(commonAction,dispatch),
    })
  )(Forbidden);