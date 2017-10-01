import React, { Component } from 'react';
import { AnimatedSwitch,AnimatedRoute } from 'react-router-transition/lib/react-router-transition';

import {Motion,TransitionMotion,spring} from 'react-motion';
import {withRouter,Route,Switch} from 'react-router-dom';

import MobileDetect from 'mobile-detect'
//config
import urlConfig from 'config/urlConfig'
//import components
import {StaticLoading} from 'components/common/loading';
import {CardItem} from 'components/main';
//redux
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defaultAvatar from 'images/defaultAvatar.svg';
import 'styles/main/index.scss';
const springSetting = {stiffness: 300, damping: 30};

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingState: false
        };
    }
    componentDidMount(){     
        const{get,data}=this.props;
        //if data is exist it will load previous data
        if(data.length===0){
            get.getPost('POSTS/GET');
                
        }else{
            this.dimensions();
            window.addEventListener('resize',this.dimensions);
        }
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimensions);
        
    }
    componentWillReceiveProps(nextProps) {
        // will be true
        const locationChanged = nextProps.location !== this.props.location
        if(locationChanged){
          
        }
      }
      componentDidUpdate(prevProps){
        const dataChanged=prevProps.data!==this.props.data;
        if(dataChanged){
            this.dimensions();
            window.addEventListener('resize',this.dimensions);
            
        }
    }
    //setting response size
    dimensions=()=>{
        let path = window.location.href;
        const {motion}=this.props;
        let active = motion.active;          
        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            this.wrapperWidth.addEventListener('touchmove',this.handleMove);
            this.wrapperWidth.addEventListener('touchend',this.handleTouchUp);
        }else{
            this.wrapperWidth.addEventListener('mousemove',this.handleMove);
            this.wrapperWidth.addEventListener('mouseup',this.handleUp);
        }
               
        //full width padding
        let wrapperWidthStyle=window.getComputedStyle(this.wrapperWidth,null);
        const wrapperPd=parseInt(wrapperWidthStyle.getPropertyValue("padding-left"));
        //full width
        let wrapperWidth=this.wrapperWidth.clientWidth-wrapperPd*2;
        //contents width
        const blockWidth=this.fullWidth.clientWidth;  
        //const eleStyle=window.getComputedStyle(this.fullWidth.childNodes[0],null);
        
        const itemPd=22;//card item padding
        const eleWidth=400;//card item width
        const eleHeight=430;//card item height 
        //contents's width = window's width 
        //possible width to scroll
        const maxScrollWidth=blockWidth-wrapperWidth;   
        //moved scroll
        let offsetX=motion.offsetX;
        offsetX=offsetX>maxScrollWidth?maxScrollWidth:offsetX<0?0:offsetX;
        
        //dispatch motions to redux
        const {motionDispatch}=this.props;
        const indicator=(maxScrollWidth<this.scrollWidth.clientWidth)?this.scrollWidth.clientWidth-maxScrollWidth:0
        motionDispatch.motionActions({
            motions:{     
                max:maxScrollWidth,//possible width to scroll
                eleWidth:eleWidth,//card item's width
                eleHeight:eleHeight,//card item's height
                scrollWidth:this.scrollWidth.clientWidth,//scroll indicator's width
                indicator:indicator,//scroll indicator's filled width 
                relative:this.scrollWidth.clientWidth/(maxScrollWidth+indicator),
                wrapperPd:wrapperPd,//full width padding
                itemPd:itemPd,//card item padding
                offsetX:offsetX,//moved scroll
                eleX:motion.eleX,//card position x
                eleY:this.fullWidth.offsetTop+itemPd,//card position y
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
            if(!this.state.loadingState){
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
        const{motion}=this.props;
        const {max} = motion;

        const {motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                isPressed:true,
                posX:event.pageX,
                offsetX:pos,
                deltaX:0,
                indicatorX:pos,
                moved:false,
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
                if(!this.state.loadingState){
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
                    moved:true
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
            return get.getOldPost('POSTS/OLD_GET','old', lastId);
        }
    }
    handleUp=(e)=>{
        const{motion,data}=this.props;   
        const {min,max,eleWidth,offsetX,deltaX,active} = motion;   
        const accel=offsetX+(deltaX*4.2);
        let mouseX;
        let index;
        if(accel>max){
            index=data.length-1;
            mouseX=max;
        }else if(accel<min){
            index=0;
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
            }
        });
    }
    handleTouchUp=(e)=>{
        this.handleUp();
    }
    handleMouseOver=(i)=>{
        const {motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                active:i
            }
        });

    }
    handleMouseOut=()=>{
        const {motion}=this.props;
        const {eleWidth,offsetX} = motion;
        

    }
    handleClick=(id,i,e)=>{
        console.log('card')
        const {motion}=this.props;
        const {moved,offsetX,eleWidth,wrapperPd,itemPd}=motion
        if(moved){
            return false;
        }else{
            this.props.history.push(`/motionlab/${id}`);
            const positionX=(i*eleWidth-offsetX)+(itemPd)+wrapperPd;
            const {motionDispatch}=this.props;
            motionDispatch.motionActions({
                motions:{
                    active:i,
                    moved:false,
                    eleX:positionX,
                }
            });
        }   
    }
    favClick=(i,e)=>{
        e.stopPropagation();
        console.log('fav')  
    }
    
    
    render() { 
        const {motion,authUser,data,loading,dataState,oldLoading}=this.props;
        const {isPressed,offsetX,eleWidth,eleHeight,itemPd,wrapperPd,relative,max,scrollWidth,indicator} = motion;
        let style;
            if(isPressed){
                style={
                    x:offsetX,
                }
            }else{
                style={
                    x:spring(offsetX),
                }
                
            }
        return (
            
            <div className="main-container">   
                <Motion style={style}>
                    {({x,barX})=>
                    <div ref={(ref)=>{this.wrapperWidth=ref}} className="main-wrapper" 
                        onTouchStart={this.handleDown.bind(null,x)} 
                        onMouseDown={this.handleDown.bind(null,x)} 
                        onWheel={this.handleWheel.bind(null,x)}
                        >
                        <div className="title-wrap">
                            <div className="menu-title">
                                <h2>MOTION LAB</h2>
                                <ul>
                                    <li></li>
                                </ul>
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
                        <div ref={(ref)=>{this.fullWidth=ref}} className="card-item-wrap" 
                            style={{
                                transform:`translate3d(${-x}px,0,0)`,
                                minWidth:`calc(100% - ${wrapperPd*2}px)`
                                }}>
                                {
                                data.map((item,i)=>{       
                                    //console.log(item[item.length]._id)
                                    const cardStyle={
                                        active:spring(1.1)
                                    }                 
                                    return (
                                        
                                        <Motion key={i}style={cardStyle}>
                                            {({active})=>
                                                <CardItem key={i} 
                                                    onClick={this.handleClick.bind(null,item._id,i)} 
                                                    favClick={this.favClick.bind(null,i)}
                                                    fav={false}
                                                    favCount={25}
                                                    onMouseOver={this.handleMouseOver.bind(null,i)} 
                                                    onMouseOut={this.handleMouseOut}
                                                    category={item.category}
                                                    postDate={item.postDate}
                                                    title={item.title}
                                                    author={item.author}
                                                    userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg}
                                                    summary={item.summary}
                                                    className={motion.active===i?"card-item hover":"card-item"}
                                                    style={{
                                                        width:`calc(100% - ${itemPd*2}px)`,
                                                        height:`calc(100% - ${itemPd*2}px)`,
                                                        backgroundImage:(item.thumbnail)?`url(${urlConfig.url}/api/${item.thumbnail.path})`:''
                                                    }}
                                                        
                                                    
                                                />
                                            }
                                        </Motion>
                                    )
                                })
                            }
                            {oldLoading?
                                <div className="old-posts-loading">
                                    <StaticLoading/>
                                </div>:''
                            }
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
        isLast:state.posts.toJS().listData.lastPosts,
        error:state.posts.toJS().listData.error,
        data:state.posts.toJS().listData.data
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
    })
)(Main);