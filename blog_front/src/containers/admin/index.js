import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Router,
  Route,
  Link } from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest';
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminMain extends Component { 
    componentDidMount(){
       const{get}=this.props;
       const ADMIN_GET='ADMIN/GET'; 
        get.getPost(ADMIN_GET);
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

export default withRouter(connect(
    (state)=>({
        loading:state.admin.getIn(['listData','pending']),
        error:state.admin.getIn(['listData','error']),
        data:state.admin.getIn(['listData','data'])
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest, dispatch),
    })
)(AdminMain));