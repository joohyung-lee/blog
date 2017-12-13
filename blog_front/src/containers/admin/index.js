import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest';
import { Scrollbars } from 'react-custom-scrollbars';
import DefaultLoading from 'images/defaultLoading';
//config
import urlConfig from 'config/urlConfig'
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//error
class AdminMain extends Component { 
    constructor(props){
        super(props);
        this.state={
            innerHeight:window.innerHeight,
            active:1,
            pageN:0,
            delLoadingState:false,
            delActive:0,
            searchValue:'',
            isSearch:false,
            searchResult:''
        }
    }
    componentDidMount(){
       const{get}=this.props;
       this.dimentions();
       window.addEventListener('resize',this.dimentions);
       get.getPost({
           type:'POSTS/GET',
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
        const {searchKeyword,searchResult}=this.state;
        this.setState({
            active:pageId
        });
        if(searchKeyword){
            get.getSearchPost({
                type:'POSTS/GET',
                title:searchResult,
                pageId:pageId
            });
        }else{
            get.getPost({
                type:'POSTS/GET',
                pageId:pageId
            });
        }
    }
    handlePageFirst=()=>{
        const{get}=this.props;
        const {searchKeyword,searchResult}=this.state;
        this.setState({
            active:1
        });
        
        if(searchKeyword){
            get.getSearchPost({
                type:'POSTS/GET',
                title:searchResult,
                pageId:1
            });
        }else{
            get.getPost({
                type:'POSTS/GET',
                pageId:1
            });
        }
    }
    handlePagePrev=()=>{
        const{get}=this.props;
        const {searchKeyword,searchResult}=this.state;
        this.setState({
            active:(this.state.active-1<1)?1:this.state.active-1
        });
        if(searchKeyword){
            get.getSearchPost({
                type:'POSTS/GET',
                title:searchResult,
                pageId:(this.state.active-1<1)?1:this.state.active-1
            });
        }else{
            get.getPost({
                type:'POSTS/GET',
                pageId:(this.state.active-1<1)?1:this.state.active-1
            });
        }
    }
    handlePageNext=()=>{
        const{get}=this.props;
        const {searchKeyword,searchResult}=this.state;
        this.setState({
            active:this.state.active+1
        });
        if(searchKeyword){
            get.getSearchPost({
                type:'POSTS/GET',
                title:searchResult,
                pageId:this.state.active+1
            });
        }else{
            get.getPost({
                type:'POSTS/GET',
                url:'admin',
                pageId:this.state.active+1
            });
        }
        
    }
    handlePageLast=()=>{
        const{get,pageLast}=this.props;
        const {searchKeyword,searchResult}=this.state;
        this.setState({
            active:pageLast
        });
        if(searchKeyword){
            get.getSearchPost({
                type:'POSTS/GET',
                title:searchResult,
                pageId:pageLast
            });
        }else{
            get.getPost({
                type:'POSTS/GET',
                pageId:pageLast
            });
        }
    }
    handleDelete=(id,i)=>{
        const{get}=this.props;
        this.setState({
            delLoadingState:false,
            delActive:i
        })
        get.deletePost({
            type:'POSTS/DELETE',
            id:id,
            index:i
        });
    }
    handleSearchValue=(e)=>{
        this.setState({
            searchValue:e.target.value,
        });
    }
    handleSearch=(e)=>{    
        if(e.keyCode === 13){
            this.handleSearchResult();
        }
    }
    handleSearchResult=(e)=>{
        const{get}=this.props;
        const {searchValue}=this.state;
       
        var blank_pattern = /^\s+|\s+$/g;
        if(searchValue.replace( blank_pattern, '' ) === "" ){
            //공백만 입력
            return false;
        }
        if(searchValue===''){
            return false;
        }
        this.setState({
            searchKeyword:true,
            searchResult:searchValue,
        });
        //var result = searchValue.match(/(?!'.*')\b[\w']+\b/g);
        //var keywords=result.split(",");     
        get.getSearchPost({
            type:'POSTS/GET',
            title:searchValue,
            pageId:1
        });
    }
    render() {
        const {data,loading,total,pages,delLoading,prev,first,next,last}=this.props;
        const {delActive}=this.state;
        return (
            <Scrollbars
            style={{
                height:`${this.state.innerHeight}px`,
            }}>
                <div className="admin-posts-wrapper">
                    <div className="admin-posts-header">
                        <div className="search-box">
                            <input type="text" onChange={this.handleSearchValue} onKeyDown={this.handleSearch} placeholder="Search"/>
                            {/* <button onClick={this.handleSearchResult}>검색</button> */}
                        </div>
                        <Link className="btn-default write" to={`/admin/write`}>글쓰기</Link>
                    </div>               
                    <div className="admin-posts-contents">
                        <ul>
                        
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
                                            <DefaultLoading color="white" size="20" r="8" stroke="1"/>:null
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }                      
                        </ul>                      
                    </div>  
                    <div className="page-navigation">
                        <div className="total">
                            <span>Total</span>
                            <span className="count">{total}</span>
                        </div>
                        <ul>
                            <li><span onClick={this.handlePageFirst} className={`page-move ${!first?`disabled`:''}`}>{`<<`}</span></li>
                            <li><span onClick={this.handlePagePrev} className={`page-move ${!prev?`disabled`:''}`}>{`<`}</span></li>
                        {
                            pages.map((number,i)=>{
                                return(
                                    <li key={i} className={this.state.active===number.pageNum?'active':''}>
                                        <span onClick={this.handlePageMove.bind(this,number.pageNum)}>{number.pageNum}</span>
                                    </li>
                                )
                            })
                        }
                            <li><span onClick={this.handlePageNext} className={`page-move ${!next?`disabled`:''}`}>{`>`}</span></li>
                            <li><span onClick={this.handlePageLast} className={`page-move ${!last?`disabled`:''}`}>{`>>`}</span></li>
                        </ul>
                    </div>         
                </div>
                {loading?<DefaultLoading color="black"/>:null}
            </Scrollbars>
        );
    }
}
export default connect(
    (state)=>({
        loading:state.posts.toJS().listData.pending,
        delLoading:state.posts.toJS().listData.delPosts.pending, 
        delState:state.posts.toJS().listData.delPosts.state, 
        error:state.posts.toJS().listData.error,
        data:state.posts.toJS().listData.data,
        total:state.posts.toJS().listData.total,
        pages:state.posts.toJS().listData.pages,
        page:state.posts.toJS().listData.page,
        pageLast:state.posts.toJS().listData.pageLast,
        
        first:state.posts.toJS().listData.firstPages,
        prev:state.posts.toJS().listData.prevPages,
        next:state.posts.toJS().listData.nextPages,
        last:state.posts.toJS().listData.lastPages
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest, dispatch),
    })
)(AdminMain);