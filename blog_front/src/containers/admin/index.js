import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest';
import { Scrollbars } from 'react-custom-scrollbars';
import DefaultLoading from 'images/defaultLoading';
//config
import urlConfig from 'config/urlConfig'
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminMain extends Component { 
    constructor(props){
        super(props);
        this.state={
            innerHeight:window.innerHeight,
            active:1,
            delLoadingState:false,
            delActive:0,
        }
    }
    componentDidMount(){
       const{get}=this.props;
       this.dimentions();
       window.addEventListener('resize',this.dimentions);
       get.getPost({
           type:'POSTS/GET',
           url:'admin',
           pageId:1
       });
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);  
    }
    componentWillReceiveProps(nextProps) {
        const {delLoadingState,active}=this.state;
        const {get}=this.props;
        if(nextProps.delState==='success'){
           if(!delLoadingState){
                get.getPost({
                    type:'POSTS/GET',
                    url:'admin',
                    pageId:active
                });
                this.setState({
                    delLoadingState:true
                })
           }
        }
        
    }
    
    dimentions=()=>{
        this.setState({
            innerHeight:window.innerHeight
        });
    }
    handlePageMove=(pageId)=>{
        const{get}=this.props;
        this.setState({
            active:pageId
        });
        get.getPost({
            type:'POSTS/GET',
            url:'admin',
            pageId:pageId
        });
    }
    handleDelete=(id,i)=>{
        const{get}=this.props;
        this.setState({
            delLoadingState:false,
            delActive:i
        })
        get.deletePost({
            type:'POSTS/DELETE',
            url:'admin',
            id:id,
            index:i
        });
       
    }
    render() {
        const {data,loading,page,pages,delLoading}=this.props;
        const {delActive}=this.state;
        return (
            <Scrollbars
            style={{
                height:`${this.state.innerHeight}px`,
            }}>
                <div className="admin-posts-wrapper">
                    <div className="page-navigation">
                        <ul>
                        {
                            pages.map((number,i)=>{
                                return(
                                    <li key={i} className={this.state.active===i+1?'active':''}>
                                        <span onClick={this.handlePageMove.bind(this,i+1)}>{i+1}</span>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                    <div className="admin-posts-contents">
                        <ul>
                        {loading?<h1>로딩중</h1>:null}
                        {
                            data.map((item,i)=>{
                                return (
                                    <li key={item._id}>
                                        <div className="image-wrap"
                                        style={{
                                            backgroundImage:(item.thumbnail!=="undefined")?
                                            `url(${urlConfig.url}/api/${item.thumbnail.data.path})`:'url(dummy)'
                                        }}
                                        />
                                        <div className="txt-wrap">
                                            <span className="category">{item.category}</span>
                                            <span className="date">{item.postDate}</span>
                                            <h2>{item.title}</h2>
                                            <p>{item.summary}</p>
                                        </div>
                                        <div className="btn-group">
                                            <Link to={`/admin/write/${item._id}`}>수정</Link>
                                            <button 
                                            disabled={delActive===i && delLoading}
                                            className="btn-delete" 
                                            onClick={this.handleDelete.bind(this,item._id,i)}
                                            >삭제</button>
                                            {(delActive===i && delLoading)?
                                            <DefaultLoading color="white"/>:null
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                        </ul>
                    </div>
                </div>
            </Scrollbars>
        );
    }
}

AdminMain.propTypes = {

};

export default connect(
    (state)=>({
        loading:state.posts.toJS().listData.pending,
        delLoading:state.posts.toJS().listData.delPosts.pending, 
        delState:state.posts.toJS().listData.delPosts.state, 
        error:state.posts.toJS().listData.error,
        data:state.posts.toJS().listData.data,
        total:state.posts.toJS().listData.total,
        pages:state.posts.toJS().listData.pages,
        page:state.posts.toJS().listData.page
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest, dispatch),
    })
)(AdminMain);