import React, { Component } from 'react';
import {Motion,TransitionMotion,spring} from 'react-motion';
import {withRouter,Route,Switch} from 'react-router-dom';

import MobileDetect from 'mobile-detect'
//config
import urlConfig from 'config/urlConfig'
// components
import {StaticLoading} from 'components/common/loading';
import {CardItem,Menu} from 'components/main';
//redux
import * as modalActions from 'redux/modal';
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
import * as postsActions from 'redux/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defaultAvatar from 'images/defaultAvatar.svg';
import 'styles/main/index.scss';
const springSetting = {stiffness: 300, damping: 30};

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingState: false,
            menuOpen:false
        };
        
    }
    componentDidMount(){     
        const{get,data,motion}=this.props;
        
        //if data is exist it will load previous data
        if(!motion.detailView){
            get.getCategoryPost('POSTS/GET',this.props.match.params.category);
        }
        this.dimensions();
        window.addEventListener('resize',this.dimensions);     
    }
    componentWillReceiveProps(nextProps) {
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimensions);
        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            window.removeEventListener('touchmove',this.handleMove);
            window.removeEventListener('touchend',this.handleTouchUp);
        }else{
            window.removeEventListener('mousemove',this.handleMove);
            window.removeEventListener('mouseup',this.handleUp);
        }
        
    }
    componentDidUpdate(prevProps,prevState){
        const {menuOpen}=this.state;
        const{get,motionDispatch,motion}=this.props;
        const locationDataChanged = prevProps.match.params.category !== this.props.match.params.category;
        const locationChanged = prevProps.location !== this.props.location;
        if(locationChanged){    
            get.getCategoryPost('POSTS/GET',this.props.match.params.category);
            motionDispatch.motionActions({
                motions:{
                    offsetX:0,
                    detailView:false
                }
            });
            this.setState({
                loadingState: false
            });            
        }
        if(prevProps.data!==this.props.data){
            this.dimensions();    
        }
    }
    //setting response size
    dimensions=()=>{     
        const {motion,dataState,data}=this.props;
        let active = motion.active;          
        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            window.addEventListener('touchmove',this.handleMove);
            window.addEventListener('touchend',this.handleTouchUp);
        }else{
            window.addEventListener('mousemove',this.handleMove);
            window.addEventListener('mouseup',this.handleUp);
        }
        const wrapperPd=motion.wrapperPd;//full width padding
        const itemPd=motion.itemPd;//card item padding
        const eleWidth=motion.eleWidth;//card item width
        const eleHeight=motion.eleHeight;//card item height 
        //full width
        let wrapperWidth=this.wrapperWidth.clientWidth-wrapperPd*2;
        
        //contents width
        const blockWidth=data.length*eleWidth;  
        //possible width to scroll
        const maxScrollWidth=(blockWidth-wrapperWidth<0)?0:blockWidth-wrapperWidth;   
        //moved scroll
        let offsetX=motion.offsetX;
        offsetX=offsetX>maxScrollWidth?maxScrollWidth:offsetX<0?0:offsetX;
        
        //dispatch motions to redux
        const {motionDispatch}=this.props;
        const indicator=(maxScrollWidth<this.scrollWidth.clientWidth)?this.scrollWidth.clientWidth-maxScrollWidth:0
        motionDispatch.motionActions({
            motions:{     
                isPressed:false,
                blockWidth:blockWidth,
                max:maxScrollWidth,//possible width to scroll
                eleWidth:eleWidth,//card item's width
                eleHeight:eleHeight,//card item's height
                scrollWidth:this.scrollWidth.clientWidth,//scroll indicator's width
                indicator:indicator,//scroll indicator's filled width 
                relative:this.scrollWidth.clientWidth/(maxScrollWidth+indicator),
                wrapperPd:wrapperPd,//full width padding
                itemPd:itemPd,//card item padding
                offsetX:offsetX,//moved scroll
                active:active//card index
            }
        });
    }
    handleWheel=(pos,e)=>{
        e.preventDefault();
        e.stopPropagation();
        const{motion}=this.props;
        const {min,max,eleWidth,offsetX,active} = motion;
        e.deltaX=e.deltaY;
        let mouseX=offsetX+e.deltaX;
        //when scrolling less than elewidth, data load old posts
        if(max-offsetX<eleWidth){
            if(!this.state.loadingState && max!==0){
                this.loadOldPosts();
                this.setState({
                    loadingState: true
                });
            }
        }else{
            if(this.state.loadingState){
                this.setState({
                    loadingState: false
                });
            }
        }
        if(mouseX > max){
            mouseX=max;
        }else if(mouseX < min){
            mouseX=min;
        }else{
            mouseX=offsetX+e.deltaX;
        }
        const {motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                offsetX:mouseX,
                active:Math.round(mouseX/eleWidth)
            }
        });

    }
    handleDown=(pos,e)=>{
        let event=(e.type=='mousedown')?e:(e.type=='touchstart')?e.touches[0]:e;
        const {motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                isPressed:true,
                startX:event.pageX,
                posX:event.pageX,
                offsetX:pos,
                deltaX:0,
                indicatorX:pos,
            }
        });
    }
    
    handleMove=(e)=>{  
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e; 
        const{motion,data}=this.props;   
        const {min,max,posX,isPressed,eleWidth,offsetX} = motion;       
        if(isPressed){
            //when scrolling less than elewidth, data load old posts
            if(max-offsetX<eleWidth){
                if(!this.state.loadingState && max>0){
                    this.loadOldPosts();
                    this.setState({
                        loadingState: true
                    });
                }
            }else{
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
            }
            const deltaX=posX-event.pageX;
            const {motionDispatch}=this.props;
            motionDispatch.motionActions({
                motions:{
                    posX:event.pageX,    
                    deltaX:deltaX,
                    offsetX:offsetX+deltaX,
                    active:Math.round(offsetX/eleWidth),
                }
            });   
        }
    }
    loadOldPosts=()=>{
        const {isLast,get,data,dataState}=this.props;
        if(dataState==='success'){
            if(isLast) {
                return new Promise(
                    (resolve, reject)=> {
                        resolve();
                    }
                );
            }
            // get load posts
            let lastId = data[data.length - 1]._id;
            // start request
            return get.getOldPost({
                type:'POSTS/OLD_GET',
                category:this.props.match.params.category,
                listType:'old', 
                id:lastId,
                
            });
        }
    }
    handleUp=(e)=>{
        const{motion,data}=this.props;   
        const {min,max,eleWidth,offsetX,deltaX} = motion;   
        const accel=offsetX+(deltaX*4.2);
        let mouseX;
        if(accel>max){
            mouseX=max;
        }else if(accel<min){
            mouseX=min;
        }else{
            mouseX=accel;
        }
        const {motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                isPressed:false,
                offsetX:mouseX,
                active:Math.round(mouseX/eleWidth),
                deltaX:0
            }
        });
    }
    handleTouchUp=(e)=>{
        this.handleUp();
    }
    handleMouseOver=(i)=>{
        const {motion,motionDispatch}=this.props;
        if(motion.active!==i){
            motionDispatch.motionActions({
                motions:{
                    active:i
                }
            });
        }

    }
    handleMouseOut=()=>{
        const {motion}=this.props;
        const {eleWidth,offsetX} = motion;
    }

    itemUp=(id,i,e)=>{
        let event=(e.type=='mouseup')?e:(e.type=='touchend')?e.touches[0]:e; 
        const {motion,motionDispatch}=this.props;
        const {offsetX,eleWidth,wrapperPd,itemPd,startX,excClick}=motion;
        const distance=startX-event.pageX;
        if(Math.abs(distance) < 20){
            motionDispatch.motionActions({
                motions:{
                    active:i,
                    detailView:true,
                }
            });
            this.props.history.push(`/posts/motionlab/${id}`);            
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
            get.saveStar({   
                postId:postId,
                index:i,
                type:'POSTS/STAR_SAVE'
            });
        }
        
    }
    menuOpen=()=>{     
        const {menuOpen}=this.state;
        this.setState({
            menuOpen:!this.state.menuOpen
        });
        setTimeout(function(){ 
            this.dimensions();
        }.bind(this), 400);

        
    }
    menuClose=()=>{
        setTimeout(function(){ 
            this.dimensions(); 
        }.bind(this), 400);
    }
    getStyles=(prev)=>{
        const{data,motion,dataState}=this.props;
        const {eleWidth,detailView} = motion;
        if(dataState==="success" || detailView===true){
            return data.map((item, i) => {
                if(i===0){
                    return{
                        key:item._id,
                        data:item,
                        style: {
                            size:eleWidth*i,
                            opacity:spring(1),
                            sizeX:spring(0),
                            sizeY:spring(0),
                            scale:spring(1),
                            rotate:spring(0)
                        },
                    }
                }else{
                    return{
                        key:item._id,
                        data:item,
                        style: {
                            size:eleWidth*i,
                            opacity:spring(1),
                            scale:spring(1),
                            sizeX:spring((typeof prev==="undefined")?0:(typeof prev[i]!=="undefined")?prev[i-1].style.sizeX:0),
                            sizeY:spring((typeof prev==="undefined")?0:(typeof prev[i]!=="undefined")?prev[i-1].style.sizeY:0),
                            rotate:spring((typeof prev==="undefined")?0:(typeof prev[i]!=="undefined")?prev[i-1].style.rotate:0)
                        },
                    }
                }
            })
        }else{
            return [];
        }
    }
    willEnter=(prev)=>{
        return {
            sizeX:-150,
            sizeY:0,
            opacity:0,
            scale:0.9,
            rotate:-20
        }
        
    }
    willLeave=(prev)=>{
        return {
            sizeX:spring(0),
            sizeY:spring(0),
            opacity:spring(0),
            scale:spring(0.9),
            rotate:spring(0)
        }
    }
    render() { 
        const {menuOpen}=this.state;
        const {motion,authUser,data,loading,dataState,oldLoading}=this.props;
        const {isPressed,offsetX,eleWidth,eleHeight,itemPd,wrapperPd,relative,max,scrollWidth,indicator} = motion;
        const style=(isPressed)?{x:offsetX}:{x:spring(offsetX)};
               
        return (     
            <div>   
                <Menu open={menuOpen} linkLoading={loading}/>
                <Motion style={style}>
                    {({x,barX})=>
                    <div className="main-container"
                        onTouchStart={this.handleDown.bind(null,x)} 
                        onMouseDown={this.handleDown.bind(null,x)} 
                        onWheel={this.handleWheel.bind(null,x)}
                    > 
                    <div ref={(ref)=>{this.wrapperWidth=ref}} 
                        className={(menuOpen)?`main-wrapper menu`:`main-wrapper`} 
                        
                        style={{
                            padding:`0px ${wrapperPd}px`,
                            left:(menuOpen)?`${250}px`:0
                        }}
                        >
                        <div className="title-wrap">
                            <div className="menu-title">
                                <h2>All Posts</h2>
                                <div className={(menuOpen)?"menu-icon active":"menu-icon"} onClick={this.menuOpen}> 
                                    <span/><span/><span/>
                                </div>
                            </div>
                            <div ref={(ref)=>{this.scrollWidth=ref}} className="scroll-bar">
                                <div className="indicator"
                                    style={{
                                        width:`${(indicator+x)*relative}px`,
                                        minWidth:`${30}px`
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="card-item-wrap" 
                            style={{
                                transform:`translate3d(${-x}px,0,0)`,
                                }}>
                                <TransitionMotion
                                willEnter={this.willEnter}
                                willLeave={this.willLeave}
                                styles={prev=>this.getStyles(prev)}
                                >
                                {currentStyles =>{    
                                    return(
                                    <div>
                                    {currentStyles.map((config, i) =>{
                                        let isFav = (config.data.starred.indexOf(authUser.user.userName) > -1) ? true : false ; 
                                        return(
                                        <CardItem key={config.key} 
                                            onMouseUp={this.itemUp.bind(null,config.data._id,i)}
                                            favClick={this.favClick.bind(null,config.data._id,i)}
                                            fav={isFav}
                                            favCount={(config.data.starred.length==='')?0:config.data.starred.length}
                                            onMouseOver={this.handleMouseOver.bind(null,i)} 
                                            onMouseOut={this.handleMouseOut}
                                            category={config.data.category}
                                            postDate={config.data.postDate}
                                            title={config.data.title}
                                            author={config.data.author}
                                            userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg}
                                            summary={config.data.summary}
                                            className={motion.active===i?"card-item hover":"card-item"}
                                            wrapStyle={{
                                                width:`${eleWidth}px`,
                                                height:`${eleHeight}px`,
                                                padding:`${itemPd}px`, 
                                                left:`${config.style.size}px`,
                                                transform:`perspective(600px) rotateY(${config.style.rotate}deg) matrix(${config.style.scale},0.00,0.00,${config.style.scale},${config.style.sizeX},${config.style.sizeY})`,
                                                opacity:config.style.opacity
                                            }}
                                            style={{
                                                width:`calc(100% - ${itemPd*2}px)`,
                                                height:`calc(100% - ${itemPd*2}px)`,
                                                backgroundImage:(config.data.thumbnail)?`url(${urlConfig.url}/api/${config.data.thumbnail.path})`:'',
                                                
                                            }} 
                                        />
                                        )}
                                        )
                                    }
                                    {(oldLoading)?
                                        <div className="old-posts-loading"
                                        style={{
                                            left:`${eleWidth*data.length}px`
                                        }}
                                        >
                                            <StaticLoading/>
                                        </div>:null
                                    }
                                    </div>
                                    )
                                }
                                }
                                </TransitionMotion>
                            
                        </div>
                    </div>
                    </div>
                    }
                </Motion>
            </div>
        )
    }
}

export default connect(
    (state)=>({
        authUser:state.auth.toJS().profile,
        motion:state.main.toJS().motions,
        dataState:state.posts.toJS().listData.state,  
        loading:state.posts.toJS().listData.pending,
        oldLoading:state.posts.toJS().listData.oldPosts.pending,
        oldDataState:state.posts.toJS().listData.oldPosts.state,
        isLast:state.posts.toJS().listData.lastPosts,
        starState:state.posts.toJS().listData.starred,
        data:state.posts.toJS().listData.data
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
        modalView:bindActionCreators(modalActions,dispatch),
        
    })
)(Main);