import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as commonAction from 'redux/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class NotFound extends Component {
    componentDidMount(){
        // const {handleHeader}=this.props;
        // handleHeader.isHeader({
        //     visible:false
        // });
    }
    render() {
        return (
            <div>
                {this.props.location.pathname}
            </div>
        );
    }
}

NotFound.propTypes = {

};

export default connect(
    (state)=>({
        header:state.common.toJS()
    }),
    (dispatch)=>({
        handleHeader:bindActionCreators(commonAction,dispatch),
    })
  )(NotFound);
  