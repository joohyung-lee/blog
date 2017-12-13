import React, { Component } from 'react';
import * as commonAction from 'redux/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class NotFound extends Component {
    componentWillMount(){
       
        const {handleHeader}=this.props;
        console.log(handleHeader)
        handleHeader.isHeader({
            visible:false
        });
    }
    render() {
        return (
            <div>
                <h1>404</h1>
                <a href="/home">home으로 가기</a>
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
  )(NotFound);
  