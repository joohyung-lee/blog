import React, { Component } from 'react';
import {Motion,TransitionMotion,StaggeredMotion,spring} from 'react-motion';
import MobileDetect from 'mobile-detect'
//config
import urlConfig from 'config/urlConfig'
// components
import {StaticLoading} from 'components/common/loading';
import {CardItem,Menu} from 'components/main';
//redux
import * as commonAction from 'redux/common';
import * as modalActions from 'redux/modal';
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
import * as postsActions from 'redux/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import defaultAvatar from 'images/defaultAvatar.svg';
const springSetting = {stiffness: 300, damping: 30};
const springSetting2 = {stiffness: 230, damping: 15};

class Main extends Component {
    constructor(props){
        super(props);
        const{motion}=this.props;
        this.state = {
            loadingState: false,
            menuOpen:false,
            favActive:0,
            mainText:[
                {
                    key:'home',
                    data:'All Posts',
                },
                {
                    key:'motionlab',
                    data:'Motion Lab',
                },
                {
                    key:'projects',
                    data:'Projects',
                },
                {
                    key:'review',
                    data:'Review',
                }
            ],
            searchKeyowrdAni:[],
            mainIndex:0,
        };
        
    }
    componentWillMount(){
        const url=this.props.location.pathname.split('/')[1];
        this.state.mainText.map((item,i)=>{
            if(url===item.key){
                this.setState({
                    mainIndex:i
                })
            }
        })
    }
    componentDidMount(){     
        const{get,data,motion,common,handleHeader}=this.props;
        const url=this.props.location.pathname.split('/')[1];
        if(!common.mainLoad){
            get.getCategoryPost('POSTS/CATEGORY_GET',url);
        }
        handleHeader.mainLoad({
            mainLoad:true
        })
        this.dimensions();
        window.addEventListener('resize',this.dimensions); 
        
    }
    
    componentWillUnmount(){
        const{motionDispatch,motion}=this.props;
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
    componentWillReceiveProps(nextProps) {
        const{get,motionDispatch}=this.props;
        const{starState}=this.state;
        const locationChanged = nextProps.location !== this.props.location;   
        if(locationChanged){        
            motionDispatch.motionActions({
                motions:{
                    offsetX:0,
                    active:0,
                }
            });    
            const url=nextProps.location.pathname.split('/')[1];
            get.getCategoryPost('POSTS/CATEGORY_GET',url);   
            this.state.mainText.map((item,i)=>{
                if(url===item.key){
                    this.setState({
                        mainIndex:i
                    })
                }
            })
        }
        if(nextProps.data.length!==this.props.data.length){
            this.dimensions();    
        }
    }        

    //setting response size
    dimensions=()=>{     
        const {motion,data,motionDispatch}=this.props;
        const{active,offsetX}=motion;
        let offset=offsetX; 
        const activeItem=active;
        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            window.addEventListener('touchmove',this.handleMove);
            window.addEventListener('touchend',this.handleTouchUp);
        }else{
            window.addEventListener('mousemove',this.handleMove);
            window.addEventListener('mouseup',this.handleUp);
        }
        const eleResponse=window.innerWidth/3.5;
        const mobileSize=window.innerWidth/1.2;
        const minDesk=window.innerWidth/2.5;
        const maxDesk=window.innerWidth/4.5;
        //full width padding
        const wrapperPd=(window.innerWidth<1600)?
            (window.innerWidth<1024)?
            window.innerWidth<670?
            30:
            50:
            50:
            70
        //card item padding
        const itemPd=(window.innerWidth<1600)?
            (window.innerWidth<1024)?
            window.innerWidth<670?
            15:
            15:
            15:
            20;
        //card item width
        const eleWidthSize=(window.innerWidth>1600)?
            (maxDesk>400)?
            400:
            maxDesk:
            (window.innerWidth<1024)?
            window.innerWidth<670?
            mobileSize:
            minDesk:
            eleResponse;
        const eleWidth=eleWidthSize;
        //card item height 
        const eleHeight=eleWidth*1.2;
        //full width
        let wrapperWidth=this.wrapperWidth.clientWidth-wrapperPd*2;
        
        //contents width
        const blockWidth=data.length*eleWidth;  
        //possible width to scroll
        const maxScrollWidth=(blockWidth-wrapperWidth<0)?0:blockWidth-wrapperWidth;   
        
        offset=offset>maxScrollWidth?maxScrollWidth:offset<0?0:offset
        //dispatch motions to redux
        const indicator=(maxScrollWidth<this.scrollWidth.clientWidth)?this.scrollWidth.clientWidth-maxScrollWidth:0;
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
                offsetX:offset,//moved scroll
                active:activeItem
            }
        });
    }
    handleWheel=(pos,e)=>{
        e.preventDefault();
        e.stopPropagation();
        const{motionDispatch,motion}=this.props; 
        const {min,max,eleWidth,offsetX} = motion;
        let mouseX=offsetX+e.deltaX+e.deltaY;
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
            mouseX=offsetX+e.deltaX+e.deltaY;
        }
        motionDispatch.motionActions({
            motions:{
                offsetX:mouseX,
                active:Math.round(mouseX/eleWidth)
            }
        });
    }
    handleDown=(pos,e)=>{
        const{motionDispatch}=this.props; 
        let event=(e.type=='mousedown')?e:(e.type=='touchstart')?e.touches[0]:e;
        motionDispatch.motionActions({
            motions:{
                isPressed:true,
                startX:event.pageX,
                posX:event.pageX,
                offsetX:pos,
                deltaX:0,
            }
        });
    }
    
    handleMove=(e)=>{  
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e; 
        const{motion,data,motionDispatch}=this.props;   
        const {max,posX,isPressed,eleWidth,offsetX,startX,active} = motion;       
        const distance=startX-event.pageX;
        if(isPressed){
            let count=(Math.round(offsetX/eleWidth)<0)?0:Math.round(offsetX/eleWidth);
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
            if (deltaX > 2 || deltaX < -2) {
                
                motionDispatch.motionActions({
                    motions:{
                        posX:event.pageX,    
                        deltaX:deltaX,
                        offsetX:offsetX+deltaX,
                        active:(Math.abs(distance) > 20)?count:active,
                    }
                });
            }
        }
    }
    loadOldPosts=()=>{
        const {isLast,get,data,dataState}=this.props;
        const url=this.props.location.pathname.split('/')[1];
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
                category:url,
                listType:'old', 
                id:lastId,
                
            });
        }
    }
    handleUp=(e)=>{
        const{motionDispatch,motion}=this.props;   
        const {min,max,isPressed,offsetX,deltaX} = motion;   
        if(isPressed){
            const accel=offsetX+(deltaX*4.2);
            let mouseX;
            if(accel>max){
                mouseX=max;
            }else if(accel<min){
                mouseX=min;
            }else{
                mouseX=accel;
            }
            motionDispatch.motionActions({
                motions:{
                    isPressed:false,
                    offsetX:mouseX,
                    deltaX:0
                }
            });
        }

    }

    itemUp=(id,i,bgColor,category,e)=>{
        const {motion,motionDispatch}=this.props;
        const {offsetX}=motion;
            motionDispatch.motionActions({
                motions:{
                    active:i,
                    offsetX:offsetX,
                    bgColor:bgColor,
                    detailLoad:false
                }
            });
            this.props.history.push(`/posts/${category}/${id}`);            
    }
    handleTouchUp=(e)=>{
        this.handleUp();
    }
    handleMouseOver=(i,e)=>{
        const{motion,motionDispatch}=this.props;
        const{active}=motion;
        if(active!==i){
            motionDispatch.motionActions({
                motions:{
                    active:i,
                }
            });
        }
    }
    handleMouseOut=()=>{
        const {motion}=this.props;
        const {eleWidth,offsetX} = motion;
    }
    
    favClick=(postId,i,e)=>{
        e.stopPropagation();
        const {starState}=this.state;
        const {motionDispatch,postAction,get,authUser,modalView}=this.props;        
        motionDispatch.motionActions({
            motions:{
                active:i,
            }
        });
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
                type:'POSTS/STAR_SAVE'
            });
        }
        
    }
    menuOpen=()=>{     
        const {menuOpen}=this.state;
        this.setState({
            menuOpen:!this.state.menuOpen
        });
        setTimeout(()=>{ 
            this.dimensions();
        }, 400);  
    }
    menuClose=()=>{
        setTimeout(()=>{ 
            this.dimensions();
        }, 400);  
    }
    getStyles=(prev)=>{
        const{data,motion,dataState}=this.props;
        const {detailView}=this.state;
        const{eleWidth,active,isPressed,offsetX,deltaX}=motion;
        if(dataState==="success"){
            return data.map((item, i) => {
                if(i===0){
                    return{
                        key:item._id,
                        data:item,
                        style: {
                            size:eleWidth*i,
                            opacity:spring(1),
                            scale:spring((i===active)?1.07:1),
                            sizeX:spring(0),
                            sizeY:spring(0),
                            rotate:spring(0),
                            shadowSize1:spring((i===active)?20:10),
                            shadowSize2:spring((i===active)?70:50),
                            shadowColor:spring((i===active)?0.25:0.2),
                        },
                    }
                }else{
                    return{
                        key:item._id,
                        data:item,
                        style: {
                            size:eleWidth*i,
                            opacity:spring(1),
                            scale:spring((i===active)?1.07:1),
                            sizeX:spring((typeof prev==="undefined" || typeof prev[i]==="undefined")?0:prev[i-1].style.sizeX),
                            sizeY:spring((typeof prev==="undefined" || typeof prev[i]==="undefined")?0:prev[i-1].style.sizeY),
                            rotate:spring((typeof prev==="undefined" || typeof prev[i]==="undefined")?0:prev[i-1].style.rotate),
                            shadowSize1:spring((i===active)?20:10),
                            shadowSize2:spring((i===active)?70:50),
                            shadowColor:spring((i===active)?0.25:0.2),
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
            rotate:-20,
            shadowSize1:0,
            shadowSize2:0,
            shadowColor:0,
        }
        
    }
    willLeave=(prev)=>{     
        return {
            sizeX:spring(0),
            sizeY:spring(0),
            opacity:spring(0),
            scale:spring(0.9),
            rotate:spring(0),
            shadowSize1:spring(0),
            shadowSize2:spring(0),
            shadowColor:spring(0),
        }
    }
    countZero=(num)=>{
        if(num<10){
            if(num===0){
                return 0
            }
            return '0'+num
        }else{
            return num
        }
    }
    render() {   
        const {menuOpen,favActive,mainIndex,detailView}=this.state;
        const {motion,authUser,data,loading,total,oldLoading,starLoading,common}=this.props;
        const {isPressed,offsetX,eleWidth,eleHeight,itemPd,wrapperPd,relative,active,indicator} = motion;
        const style=(isPressed)?{
                x:offsetX,
            }:{
                x:spring(offsetX),
            };
        return (     
            <div>   
                <Menu open={menuOpen} linkLoading={loading}/>
                <Motion style={style} onRest={this.onRest}>
                    {({x})=>
                    <div className="main-container"
                        onTouchStart={this.handleDown.bind(this,x)} 
                        onMouseDown={this.handleDown.bind(this,x)} 
                        onWheel={this.handleWheel.bind(this,x)}
                    > 
                    <div ref={(ref)=>{this.wrapperWidth=ref}} 
                        className={(menuOpen)?`main-wrapper menu`:`main-wrapper`} 
                        style={{
                            padding:`0px ${wrapperPd}px`,
                        }}
                        >
                        <div className="title-wrap">
                            <div className="menu-title">
                                <TransitionMotion
                                styles={this.state.mainText.map((item,i)=>{
                                    return{
                                        key: item.key,
                                        data:item.data,
                                        style: {
                                            offset:spring(i>mainIndex?50:i<mainIndex?-50:0,springSetting2),
                                            opacity:spring(i===mainIndex?1:0,springSetting2)
                                        },
                                    }
                                })}
                                >
                                    {currentStyles=>
                                        <div className="main-txt">
                                            {currentStyles.map((config,i)=>{
                                                return <h2 key={config.key} style={{
                                                    transform:`translateY(${config.style.offset}px)`,
                                                    opacity:config.style.opacity,
                                                    position:mainIndex===i?`relative`:`absolute`,
                                                    pointerEvents:mainIndex===i?``:`none`
                                                }}>{config.data}</h2>
                                            })}
                                        </div>
                                    }
                                </TransitionMotion>
                                <div className={(menuOpen)?"menu-icon active":"menu-icon"} onClick={this.menuOpen}> 
                                    <span/><span/><span/>
                                </div>
                            </div>
                            <span className="pages">{this.countZero(active+1)}</span>
                            <div ref={(ref)=>{this.scrollWidth=ref}} className="scroll-bar">
                                <div className="indicator"
                                    style={{
                                        width:`${(indicator+x)*relative}px`,
                                        minWidth:`${30}px`
                                    }}
                                ></div>
                            </div>
                            <span className="total">{this.countZero(total)}</span>
                                
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
                                        const isGif=(typeof config.data.gif.data.path!=='undefined')?true:false;
                                        return(
                                        <CardItem key={config.key} 
                                            onMouseUp={this.itemUp.bind(this,config.data._id,i,config.data.bgColor,config.data.category)}
                                            favClick={this.favClick.bind(this,config.data._id,i)}
                                            fav={isFav}
                                            favLoading={favActive===i?starLoading?true:false:false}
                                            favCount={(config.data.starred.length==='')?0:config.data.starred.length}
                                            favOver={this.handleMouseOver.bind(this,i)}
                                            isGif={isGif}
                                            gifLoad={(active===i && isGif)?true:false}
                                            onMouseOver={this.handleMouseOver.bind(this,i)} 
                                            onMouseOut={this.handleMouseOut}
                                            category={config.data.category}
                                            postDate={config.data.postDate}
                                            title={config.data.title}
                                            author={config.data.author}
                                            userImg={(!authUser.user.profileImg || authUser.user.profileImg==='')?defaultAvatar:authUser.user.profileImg}
                                            summary={config.data.summary}
                                            className={active===i?"card-item hover":"card-item"}
                                            wrapStyle={{
                                                width:`${eleWidth}px`,
                                                height:`${eleHeight}px`,
                                                padding:`${itemPd}px`, 
                                                left:`${config.style.size}px`,
                                                transform:`perspective(600px) rotateY(${config.style.rotate}deg) matrix(${config.style.scale},0.00,0.00,${config.style.scale},${config.style.sizeX},${config.style.sizeY})`,
                                                zIndex:detailView===i?10:1,
                                                opacity:config.style.opacity
                                            }}
                                            style={{
                                                width:`100%`,
                                                height:`100%`,
                                                borderRadius:`10px`,
                                                boxShadow: `0 ${config.style.shadowSize1}px ${config.style.shadowSize2}px rgba(52, 73, 94, ${config.style.shadowColor})`,
                                                
                                            }} 
                                            responseFont={(eleWidth-itemPd*2)/21}
                                            imgHeight={(eleWidth-itemPd*2)*3/4}
                                            bottomHeight={(eleHeight-itemPd*2)-(eleWidth-itemPd*2)*3/4}
                                            thumbSrc={(config.data.thumbnail.data.path)?`${urlConfig.url}/api/${config.data.thumbnail.data.path}`:''}
                                            gifSrc={(config.data.gif.data.path)?`${urlConfig.url}/api/${config.data.gif.data.path}`:''}
                                            bgColor={(typeof config.data.bgColor!=='undefined')?config.data.bgColor:null}
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
        starLoading:state.posts.toJS().listData.starred.pending,
        data:state.posts.toJS().listData.data,
        total:state.posts.toJS().listData.total,
        error:state.posts.toJS().listData.error,
        common:state.common.toJS()
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
        modalView:bindActionCreators(modalActions,dispatch),
        postAction: bindActionCreators(postsActions, dispatch),
        handleHeader:bindActionCreators(commonAction,dispatch),
        
    })
)(Main);