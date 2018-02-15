import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';
import { Scrollbars } from 'react-custom-scrollbars';
//config
//components
import {SimpleCard} from 'components/main';
//redux
import * as commonAction from 'redux/common';
import * as modalActions from 'redux/modal';
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
import * as postsActions from 'redux/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//images
import DefaultLoading from 'images/defaultLoading';
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchKeyowrdAni:[],
            hash:false,
            tagUrl:false,
            contentsPd:0,
            searchScroll:false,
            initial:false,
            load:false,
            tagLeftScroll:false,
            tagRightScroll:true,
            active:null,
            scrollLoad:false,
            
        }
    }
    componentWillMount(){
        const {handleHeader}=this.props;
        if(typeof this.props.match.params.keyword!=="undefined"){
            handleHeader.searchValue({
                searchValue:this.props.match.params.keyword
            });
            if(this.props.match.path==="/search/tags/:keyword"){
                this.setState({
                    hash:true,
                    tagUrl:true
                })
            }else{
                this.setState({
                    hash:false,
                    tagUrl:false
                })
            }
        }else{
            handleHeader.searchValue({
                searchValue:''
            });
            this.setState({
                hash:false,
                tagUrl:false
            })
        }
        
    }
    componentDidMount(){
        const {get}=this.props;
        this.dimensions();
        window.addEventListener('resize',this.dimensions); 
        if(typeof this.props.match.params.keyword!=="undefined"){
            let result = this.props.match.params.keyword.match(/./g);                
            this.setState({
                searchKeyowrdAni:result.map((item,i)=>{
                    return{
                        key:`text${i}`,
                        data:item,
                        
                    }
                }),
                load:true
                
            });
            if(this.props.match.path==="/search/tags/:keyword"){
                return get.getSearchTags({
                    type:'POSTS/POSTS_SEARCH_POSTS',
                    tagsname:this.props.match.params.keyword
                });
            }else{
                this.setState({
                    hash:false
                })
                return get.getSearchPosts({
                    type:'POSTS/POSTS_SEARCH_POSTS',
                    searchKeyword:this.props.match.params.keyword
                });
            }
        }else{
            this.setState({
                searchKeyowrdAni:[],
                initial:true,
                load:true
            })
        }
    }
    componentDidUpdate(prevProps,prevState){
        const{postsScroll}=this.props;
        const{scrollLoad}=this.state
        if(!scrollLoad){    
            this.refs.scrollbars.scrollTop(postsScroll);
            this.setState({
                scrollLoad:true
            })
        }
    }
    componentWillReceiveProps(nextProps){
        const {get,postAction,handleHeader}=this.props; 
        const{searchValue}=nextProps.common;
        const paramsChanged = nextProps.match.params.keyword !== this.props.match.params.keyword;
        const pathChanged=nextProps.match.path!==this.props.match.path;
        //result search page  
        if(pathChanged || paramsChanged){
            //if have keyword
            if(typeof nextProps.match.params.keyword!=="undefined"){
                handleHeader.searchValue({
                    searchValue:nextProps.match.params.keyword
                });
                //tag search
                if(nextProps.match.path==="/search/tags/:keyword"){
                    this.setState({
                        tagUrl:true,
                        hash:true,
                        initial:false
                    });
                    
                    return get.getSearchTags({
                        type:'POSTS/POSTS_SEARCH_POSTS',
                        tagsname:nextProps.match.params.keyword
                    });
                //subject search    
                }else{    
                    this.setState({
                        tagUrl:false,
                        hash:false,
                        initial:false
                    });
                    return get.getSearchPosts({
                        type:'POSTS/POSTS_SEARCH_POSTS',
                        searchKeyword:nextProps.match.params.keyword
                    });
                }
            //if not have keyword
            }else{
                handleHeader.searchValue({
                    searchValue:''
                });
                this.setState({
                    initial:true,
                    searchKeyowrdAni:[]
                });
                return get.getSearchPosts({
                    type:'POSTS/POSTS_SEARCH_POSTS',
                    searchKeyword:nextProps.match.params.keyword
                });
            }
        }
        //if change search value
        if(this.props.common.searchValue!==nextProps.common.searchValue){  
            //change tags
            if(typeof nextProps.match.params.keyword!=="undefined"){               
                let result = nextProps.match.params.keyword.match(/./g);
                this.setState({
                    searchKeyowrdAni:result.map((item,i)=>{
                        return{
                            key:`text${i}`,
                            data:item
                        }
                    }),
                });
                if(searchValue===''){
                    if(this.props.match.path==="/search/tags/:keyword"){
                        this.setState({
                            hash:true
                        })
                    }else{
                        this.setState({
                            hash:false
                        })
                    }
                    let result = nextProps.match.params.keyword.match(/./g);
                    this.setState({
                        searchKeyowrdAni:result.map((item,i)=>{
                            return{
                                key:`text${i}`,
                                data:item
                            }
                        }),
                    });
                }else{
                    postAction.postVacuum({
                        vacuum:false
                    })
                    let result = searchValue.match(/./g);
                    this.setState({
                        searchKeyowrdAni:result.map((item,i)=>{
                            return{
                                key:`text${i}`,
                                data:item
                            }
                        }),
                    });
                    if(nextProps.match.path==="/search/tags/:keyword"){
                        this.setState({
                            hash:this.state.load?false:true,
                        })
                        get.getSearchTags({
                            type:'POSTS/POSTS_SEARCH_TAGS',
                            tagsname:searchValue
                        });
                    }else{
                        this.setState({
                            hash:false
                        })
                        get.getSearchTags({
                            type:'POSTS/POSTS_SEARCH_TAGS',
                            tagsname:searchValue
                        });
                    }
                }
            //search initial page
            }else{
                let result;
                if(searchValue===''){
                    postAction.postVacuum({
                        vacuum:true
                    })
                    result = []               
                }else{
                    postAction.postVacuum({
                        vacuum:false
                    })
                    let keyword=searchValue;
                    result = keyword.match(/./g);
                }
                this.setState({
                    searchKeyowrdAni:result.map((item,i)=>{
                        return{
                            key:`text${i}`,
                            data:item
                        }
                    }),
                    hash:false
                })
                return get.getSearchTags({
                    type:'POSTS/POSTS_SEARCH_TAGS',
                    tagsname:searchValue
                });
                
            }
        }
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimensions);
    }
    dimensions=()=>{

        this.setState({
            windowWidth:document.documentElement.clientWidth,
            windowHeight:document.documentElement.clientHeight,
        })
    }
      
    
    willEnter=()=>{
        return {
            offset:-50,
            opacity:0
        }
    }
    willLeave=()=>{
        return {
            offset:spring(-50),
            opacity:spring(0)
        }
    }
    getStyle=()=>{
        const {searchKeyowrdAni}=this.state;
        if(searchKeyowrdAni.length!==0){
            return searchKeyowrdAni.map((item,i)=>{
                return {
                    key:item.key,
                    data:item.data,
                    style:{
                        offset:spring(0),
                        opacity:spring(1)
                    }
                }
            })
        }else{
            return[]
        }
    }
    willEnterTags=()=>{
        return {
            offset:-50,
            opacity:0,
            width:0,
            padding:0
        }
    }
    willLeaveTags=()=>{
        return {
            offset:spring(-50),
            opacity:spring(0),
            width:spring(0),
            padding:spring(0),
        }
    }
    getStyleTags=()=>{
        return this.tagResult().map((item,i)=>{
            return {
                key:item.key,
                data:item.data,
                style:{
                    offset:spring(0),
                    opacity:spring(1),
                    width:spring(item.size),
                    padding:spring(4),
                }
            }
        })
    }
    handleTagsSearch=(target,i)=>{
        const {handleHeader}=this.props;
        handleHeader.searchValue({
            searchValue:target
        })
        let result = target.match(/./g);
        this.setState({
            searchKeyowrdAni:result.map((item,i)=>{
                return{
                    key:`text${i}`,
                    data:item
                }
            }),
            hash:true,
            active:i
        });
        if(this.props.location.pathname===`/search/tags/${target}`){
            return false;
        }else{
            return this.props.history.push(`/search/tags/${target}`)
        }
        
    }
    tagResult=()=>{
        const {common,tags} = this.props;
        const {keyword}=this.props.match.params;
        let tagData=[];
        tags.filter((item,pos)=>{
            return tags.indexOf(item)===pos;
        }).map((item,i)=>{
            if(common.searchValue!=='' && item.indexOf(common.searchValue?common.searchValue.toLowerCase():typeof keyword!=="undefined"?keyword.toLowerCase():'')!==-1){
                let text='# '+item;
                const textSize=text.match(/./g);
                return tagData.push({
                    key:item,
                    size:7*textSize.length+45,
                    data:text,
                })
            }else{
                return [];
            }
        })
        return tagData;
    }
    handleScroll=(value)=>{
        const {postAction}=this.props;
        postAction.postScroll({
            scroll:value.scrollTop
        })
        if(value.scrollTop>1){
            this.setState({
                searchScroll:true,
            })
        }else{
            this.setState({
                searchScroll:false,
            })
        }
    }

    tagsScrollUpdate=(value)=>{
        if(value.scrollWidth>value.clientWidth){
            if(this.state.tagRightScroll){
                return false;
            }else{
                if(Math.floor(value.left)===1){
                    return this.setState({
                        tagRightScroll:false
                    }) 
                }else{
                    return this.setState({
                        tagRightScroll:true
                    })     
                }
            }
            
        }
    }
    
    tagsScrollFrame=(value)=>{
        if(value.scrollWidth>value.clientWidth){
            if(value.left>0){
                if(Math.floor(value.left)===1){
                    return this.setState({
                        tagLeftScroll:true,
                        tagRightScroll:false
                    })
                }else{
                    return this.setState({
                        tagLeftScroll:true,
                        tagRightScroll:true
                    })
                }
            }else{
                return this.setState({
                    tagLeftScroll:false,
                    tagRightScroll:true
                })
            }
        }else{
            return false
        }
    }
    itemUp=(id,bgColor,category,e)=>{
        const {motionDispatch} = this.props;
        motionDispatch.motionActions({
            motions:{
                bgColor:bgColor===''?'#ffffff':bgColor,
                detailLoad:false,
                backUrl:true
            }
        });
        this.props.history.push(`/posts/${category}/${id}`)
    }
    render(){
        const {postsData,postsLoading} = this.props;
        const {hash,tagUrl,tagLeftScroll,tagRightScroll,searchScroll,initial} =this.state;
        return (
            <div className={`search-container ${searchScroll?'scroll':''}`}>
                <div className="search-title">
                    <div className="title-wrap">
                        <TransitionMotion
                        willEnter={this.willEnter}
                        willLeave={this.willLeave}
                        styles={this.getStyle()}
                        >
                            {currentStyles=>
                                <h2 className="main-txt">
                                    <span className="hash-tag">{hash?`#`:``}</span>
                                    {currentStyles.map((config,i)=>{
                                        return <span key={config.key} ref={(ref)=>{this.text=ref}} style={{
                                            transform:`translate(${0}px , ${config.style.offset}px)`,
                                            opacity:config.style.opacity,
                                        }}>{config.data}</span>
                                    })}
                                </h2>
                            }
                        </TransitionMotion>
                        <Scrollbars
                            universal 
                            autoHeight
                            className={`tags-wrap ${tagLeftScroll?'left':''} ${tagRightScroll?'right':''}`}
                            onScrollFrame={this.tagsScrollFrame}
                            onUpdate={this.tagsScrollUpdate}
                            >
                            <TransitionMotion
                            willEnter={this.willEnterTags}
                            willLeave={this.willLeaveTags}
                            styles={this.getStyleTags()}
                            >
                                {currentStyles=>
                                    <ul>
                                        {currentStyles.map((config,i)=>{
                                            
                                            return  <li key={config.data} style={{
                                                        width:`${config.style.width}px`,
                                                        padding:`${config.style.padding}px`
                                                    }}>
                                                        <span className={tagUrl?this.props.match.params.keyword===config.key?'active':'':''}
                                                            onClick={this.handleTagsSearch.bind(this,config.key,i)}
                                                            style={{
                                                                opacity:config.style.opacity,
                                                            }}>
                                                        {config.data}
                                                        </span>
                                                    </li>
                                        })}
                                    </ul>
                                    
                                }
                            </TransitionMotion>
                        </Scrollbars>
                    </div>
                </div>
                <Scrollbars
                    universal
                    className="search-contents-wrap"
                    ref="scrollbars"
                    onScrollFrame={this.handleScroll}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                   >
                    <div className="search-contents">
                        <div className="search-result" ref={(ref)=>{this.searchContents=ref}}>
                            {initial?
                            <div className="no-data">
                                <span>Search text or tag</span>
                            </div>:
                            <div>
                            <div className="search-result-title">
                                <span className="count">{postsData.length} Posts</span>
                                <span>results for {tagUrl?`tag`:`title/body`}</span>
                                {!initial && postsLoading?
                                <span className="search-loading">
                                    <DefaultLoading color={'black'} size={20} r={8} stroke={1}/>
                                </span>
                                :null}
                            </div>
                            <div className="search-result-contents"  >
                                {
                                    postsData.map((item,i)=>{
                                        return <SimpleCard
                                            key={item._id}
                                            data={item}
                                            currentUser={item.user}
                                            onClick={this.itemUp.bind(this,item._id,item.bgColor,item.category)}
                                            />
                                    })
                                }
                            </div>
                            </div>
                        }
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }
};

export default connect(
    (state)=>({
        authUser:state.auth.toJS().profile,
        common:state.common.toJS(),
        postsData:state.posts.toJS().searchData.data,
        postsState:state.posts.toJS().searchData.state,
        postsScroll:state.posts.toJS().searchData.scroll,
        tagsLoading:state.posts.toJS().tags.pending,
        postsLoading:state.posts.toJS().searchData.pending,
        starLoading:state.posts.toJS().searchData.starred.pending,
        tags:state.posts.toJS().tags.data,
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
        modalView:bindActionCreators(modalActions,dispatch),
        postAction: bindActionCreators(postsActions, dispatch),
        handleHeader:bindActionCreators(commonAction,dispatch),
    })
)(Search);