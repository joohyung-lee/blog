import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest'
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MarkdownEdit from 'components/admin/markdown';

class Posts extends Component { 
    componentDidMount(){
        const{get,data,match}=this.props;
        const ADMIN_SINGLE_GET='ADMIN/SINGLE_GET'; 
        
        get.getPost(ADMIN_SINGLE_GET,match.params.id);
    }
    handleChange=(e)=>{
        const { contents ,input} = this.props;
        let nextState = {};
        nextState= e.target.value;
        return input.postCreate({
            source:nextState,
            index:0
        })
    }
    render() {
        const {contents,input,match,error,loading}=this.props;
        return (
            <div>
                {loading?<h1>로딩중</h1>:
                    error?<h1>에러발생</h1>:
                    <MarkdownEdit source={contents.title} handleChange={this.handleChange}/>
                }
            </div>
        );
    }
}

Posts.propTypes = {

};

export default withRouter(connect(
    (state)=>({
        data:state.admin.data,
        loading:state.admin.pending,
        error:state.admin.error,
        contents:state.admin.data[0]?state.admin.data[0]:''
    }),
    (dispatch)=>({
        input: bindActionCreators(adminAction, dispatch),
        get:bindActionCreators(httpRequest, dispatch),
    })
)(Posts));