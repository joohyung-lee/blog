import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';
import { Scrollbars } from 'react-custom-scrollbars';
//config
import urlConfig from 'config/urlConfig'
//components
import {CardItem} from 'components/main';
//redux
import * as commonAction from 'redux/common';
import * as modalActions from 'redux/modal';
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
import * as postsActions from 'redux/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//images
import defaultAvatar from 'images/defaultAvatar.svg';

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchKeyowrdAni:[],
            hash:false,
            eleWidth:0,
            tagUrl:false,
            contentsPd:0,
            searchScroll:false,
            initial:false,
            load:false,
            tagLeftScroll:false,
            tagRightScroll:false,
            favActive:0,
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
                    initial:true
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
        let eleWidth;
        eleWidth=window.innerWidth>1200?
        this.searchContents.clientWidth/4:
        window.innerWidth<900?
        window.innerWidth<670?
        this.searchContents.clientWidth:
        this.searchContents.clientWidth/2:
        this.searchContents.clientWidth/3;

        this.setState({
            eleWidth:eleWidth,
            itemPd:10,
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
    handleTagsSearch=(target)=>{
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
            if(item.indexOf(common.searchValue?common.searchValue.toLowerCase():typeof keyword!=="undefined"?keyword.toLowerCase():'')!==-1){
                let text='# '+item;
                const textSize=text.match(/./g);
                return tagData.push({
                    key:item,
                    size:7*textSize.length+35,
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
                if(value.left===1){
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
                if(value.left===1){
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
    favClick=(postId,i,e)=>{
        e.stopPropagation();
        const {get,authUser,modalView}=this.props;        
        if(!authUser.isLogin){
            modalView.openModal({
                modalName:'login'
              });
        }else{
            this.setState({
                favActive:i
            });
            get.saveStar({   
                postId:postId,
                index:i,
                type:'POSTS/SEARCH_STAR_SAVE'
            });
        }
        
    }

    handleMouseOver=(i,e)=>{
        e.stopPropagation();
        const{active}=this.state;
        if(active===i){
            return false;
            
        }else{
            this.setState({
                active:i
            })
        }
    }
    handleMouseOut=(i,e)=>{
        this.setState({
            active:null
        })
       
    }
    itemUp=(id,i,e)=>{
        this.props.history.push(`/posts/motionlab/${id}`)
 
    }
    render(){
        const {postsData,postsLoading,authUser,starLoading} = this.props;
        const {hash,eleWidth,itemPd,tagUrl,windowWidth,windowHeight,tagLeftScroll,tagRightScroll,searchScroll,initial,favActive,active} =this.state;
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
                            className={`tags-wrap ${tagLeftScroll?'left':''} ${tagRightScroll?'right':''}`}
                            style={{
                                height:60,
                                
                            }}
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
                                                        <span onClick={this.handleTagsSearch.bind(this,config.key)}
                                                        style={{
                                                            opacity:config.style.opacity,
                                                        }}>{config.data}
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
                    style={{
                        height:`${windowHeight-200}px`,
                    }}>
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
                            </div>
                            {!initial && !postsLoading && postsData.length===0?
                            <div className="no-data">
                                <span>No matches found for</span>
                                <b> "{this.props.match.params.keyword}"</b>
                            </div>
                            :null}
                            <div className="search-result-contents"  >
                                {
                                    postsData.map((item,i)=>{
                                        let isFav = (item.starred.indexOf(authUser.user.userName) > -1) ? true : false ; 
                                        const isGif=(typeof item.gif.data.path!=='undefined')?true:false;
                                        return <CardItem key={item._id} 
                                            className={`card-item ${active===i?'hover':''}`}
                                            onMouseUp={this.itemUp.bind(this,item._id,i)}                                            
                                            onMouseOver={this.handleMouseOver.bind(this,i)}
                                            onMouseOut={this.handleMouseOut.bind(this,i)}
                                            favOver={this.handleMouseOver.bind(this,i)}
                                            favClick={this.favClick.bind(this,item._id,i)}
                                            fav={isFav}
                                            favLoading={favActive===i?starLoading?true:false:false}
                                            favCount={(item.starred.length==='')?0:item.starred.length}
                                            thumbSrc={(item.thumbnail.data.path)?`${urlConfig.url}/api/${item.thumbnail.data.path}`:''}
                                            isGif={isGif}
                                            gifLoad={(active===i && isGif)?true:false}
                                            gifSrc={(item.gif.data.path)?`${urlConfig.url}/api/${item.gif.data.path}`:''}
                                            category={item.category}
                                            userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg}                                            
                                            postDate={item.postDate}
                                            title={item.title}
                                            author={item.author}
                                            summary={item.summary}
                                            wrapStyle={{
                                                width:`${eleWidth}px`,   
                                                padding:`${itemPd}px`,                         
                                            }} 
                                            bgColor={(typeof item.bgColor!=='undefined')?item.bgColor:null}
                                            imgHeight={(eleWidth-itemPd*2)*3/4}
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