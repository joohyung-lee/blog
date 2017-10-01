import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest';
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminMain extends Component { 
    componentDidMount(){
       const{get}=this.props;
       get.getPost('POSTS/GET');
    }
    render() {
        const {data,loading,error}=this.props;
        return (
            <div>
                {loading?
                    <h1>로딩중</h1>:
                    error?<h1>에러발생</h1>:
                    data.map((item,i)=>{
                        return (
                            <div key={i}>
                                <Link to={`/admin/posts/${item._id}`}>{item.title}</Link>
                            </div>
                        )
                    })
                }
                
            </div>
        );
    }
}

AdminMain.propTypes = {

};

export default connect(
    (state)=>({
        loading:state.posts.toJS().listData.pending,
        error:state.posts.toJS().listData.error,
        data:state.posts.toJS().listData.data
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest, dispatch),
    })
)(AdminMain);