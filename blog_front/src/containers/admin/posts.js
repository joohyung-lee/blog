import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest'
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {MarkdownEdit} from 'components/admin';

class Posts extends Component { 
    componentDidMount(){
        const{get,data,match}=this.props;
        const ADMIN_SINGLE_GET='ADMIN/SINGLE_GET'; 
        
        get.getPost(ADMIN_SINGLE_GET,match.params.id);
    }
    handleChange=(e)=>{
        const {input} = this.props;
        let contents = {};
        contents= e.target.value;
        return input.postModify({
            source:[
                {
                    body:contents
                }
            ],
            index:0
        })
    }
    render() {
        const {data,input,match,error,loading}=this.props;
        return (
            <div>
                {loading?<h1>로딩중</h1>:
                    error?<h1>에러발생</h1>:
                    <MarkdownEdit source={data.body} handleChange={this.handleChange}/>
                }
            </div>
        );
    }
}

Posts.propTypes = {

};

export default withRouter(connect(
    (state)=>({
        loading:state.admin.getIn(['itemData','pending']),
        error:state.admin.getIn(['itemData','error']),
        data:state.admin.getIn(['itemData','data'])
    }),
    (dispatch)=>({
        input: bindActionCreators(adminAction, dispatch),
        get:bindActionCreators(httpRequest, dispatch),
    })
)(Posts));