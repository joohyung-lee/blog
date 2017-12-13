import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
//components
import MarkdownView from 'components/common/markdown'
import {Comments} from 'components/detail' 
//containers

//redux
import * as commonAction from 'redux/common';
import * as httpRequest from 'redux/helper/httpRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'redux/modal';
import * as motionActions from 'redux/main';
import { setTimeout } from 'timers';
//svg&images

class DetailView extends Component {
    constructor(props){
        
        super(props);
        this.state={
            frameWrap:0,
            frameSizeX:0,
            frameSizeY:0,
            mobileMode:false,
            deskMode:true,
            iframeLoad:false,
            commentsData:[//임시 테스트
                {
                    "postId": 1,
                    "id": 1,
                    "userName": "LEE",
                    "body": "댓글 내용이다아",
                    reply:[
                        {
                            "postId": 1,
                            "id": 2,
                            "userName": "reply",
                            "body": "댓글 내용이다아"
                        },
                        {
                            "postId": 1,
                            "id": 3,
                            "userName": "reply",
                            "body": "댓글 내용이다아"
                        },
                    ]
                },
                {
                    "postId": 1,
                    "id": 4,
                    "userName": "JOO",
                    "body": "댓글 내용이다아"
                },
            ]
        }
    }
    componentDidMount(){   
        this.dimentions();
        window.addEventListener('resize',this.dimentions);
        const {get}=this.props; 
        window.addEventListener('click',this.outHide);
        setTimeout(()=>{
            get.getSinglePost('POSTS/SINGLE_GET',this.props.match.params.category,this.props.match.params.postId);
        },400)
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);  
 
    }
    componentWillReceiveProps(nextProps) {
        const {get,data,motionDispatch,handleHeader,motion}=nextProps;
        const locationChanged = nextProps.location !== this.props.location;
        if(locationChanged){
            setTimeout(()=>{
                get.getSinglePost('POSTS/SINGLE_GET',nextProps.match.params.category,nextProps.match.params.postId);
            },400)
        }
        if(!motion.detailLoad){
            this.setState({
                iframeLoad:false
            })
            if(this.props.data[0]!==data[0]){
                let isBright = (parseInt(this.get_brightness(data[0].bgColor),10) > 160);                
                motionDispatch.motionActions({
                    motions:{
                        bgColor:data[0].bgColor,
                        detailLoad:true
                    }
                });  
                handleHeader.isBrightness({
                    isBright:isBright
                });
            }
        }

    }

    //window resize width
    dimentions=()=>{
        const{motionDispatch}=this.props;
        const {mobileMode} = this.state
        motionDispatch.motionActions({
            motions:{
                innerWidth:document.documentElement.clientWidth,
                innerHeight:document.documentElement.clientHeight
            }
        });
        let sizeX;
        let sizeY;
        const frameWrap=document.documentElement.clientWidth<1900?
        document.documentElement.clientWidth<1600?
        document.documentElement.clientWidth<1400?
        document.documentElement.clientWidth:
        900:
        900:
        document.documentElement.clientWidth*0.6;
        
        if(mobileMode){
            sizeX=375;
            sizeY=600;
        }else{
            sizeX=frameWrap;
            sizeY=Math.floor(frameWrap*0.6);
        }
        this.setState({
            frameSizeX:sizeX,
            frameSizeY:sizeY,
            frameWrap:frameWrap
        })
    }
  
    //바깥 클릭 시 메뉴드랍 접기
    outHide=(e)=>{
        const {modalView,modal}=this.props;
        if(modal.postAuth.open){
            modalView.closeModal({
                modalName:'postAuth'
            });
        }
    }
    //메뉴 드랍다운
    dropdown=(e)=>{
        e.stopPropagation();
        const {modal,modalView}=this.props;
        if(modal.postAuth.open){
            modalView.closeModal({
                modalName:'postAuth'
            }); 
        }else{
            modalView.openModal({
                modalName:'postAuth'
            }); 
        }      
    }
    layerclose=()=>{
        this.props.history.goBack();
        
    }
    iframeLoad=()=>{
        const {motion} = this.props;
        if(motion.detailLoad){
            this.setState({
                iframeLoad:true
            })
        }
        
        
    }
    modeChange=(mode)=>{
        const{frameWrap}=this.state;
        if(mode==="mobile"){
            this.setState({
                mobileMode:true,
                deskMode:false,
                frameSizeX:375,
                frameSizeY:600
            });
        }else{
            const sizeX=frameWrap;
            this.setState({
                mobileMode:false,
                deskMode:true,
                frameSizeX:sizeX,
                frameSizeY:Math.floor(sizeX*0.6)
            })
        }
    }
   get_brightness=(hexCode)=>{
        hexCode = hexCode.replace('#', '');
        var c_r = parseInt(hexCode.substr(0, 2),16);
        var c_g = parseInt(hexCode.substr(2, 2),16);
        var c_b = parseInt(hexCode.substr(4, 2),16);
        return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
      }
    render() {
        const {data,motion}=this.props;
        const {iframeLoad,frameWrap,frameSizeX,frameSizeY} = this.state;
        return (
            <div className={`detail-frame`}>
                {motion.detailLoad?
                    <Scrollbars
                    className={`detail-contents-wrap ${motion.detailLoad?'animate':''}`}
                    style={{
                        width:`calc(100% - ${frameWrap}px)`,
                        height:`${motion.innerHeight}px`,
                    }}>
                        {data.map((item,i)=>{
                            return  <div key="i"
                                        className="detail-contents"
                                    >
                                        <div className="header">
                                            <span>{item.category}</span>
                                            <h2>{item.title}</h2>
                                            <span>{item.postDate}</span>
                                            <p>{item.summary}</p>
                                        </div>
                                        <div className="tags-wrap">
                                        <ul>
                                            {item.tags.map((tagsItem,i)=>{
                                                return (
                                                    <li key={i}>
                                                    <Link to={`/search/tags/${tagsItem}`}>{tagsItem}</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        </div>
                                        <div className="body">   
                                            <h3 className="title">Documentation</h3> 
                                            <MarkdownView source={item.body}/>
                                        </div>
                                        <Comments
                                            commentsData={this.state.commentsData}
                                        />
                                    </div>
                            
                        })}
                    </Scrollbars>
                    :null
                }
                <div className={`detail-main ${motion.detailLoad?'animate':''}`}
                    style={{
                        width:motion.detailLoad?`${frameWrap}px`:`${motion.innerWidth}px`,
                        height:`${motion.innerHeight}px`,
                        backgroundColor:motion.bgColor
                    }}>
                    <div className={`loading-text`}>
                        <h3>Loading...</h3>
                    </div>
                    {motion.detailLoad?
                        <div className="detail-simulate">
                            <div className="device-controll-wrap">
                                <div className="device-controll">
                                    <div className="dic mobile" onClick={this.modeChange.bind(this,'mobile')}>
                                        <span className="icon-device"></span>
                                        <span className="icon-text">Phone</span>
                                    </div>
                                    <div className="dic desk" onClick={this.modeChange.bind(this,'desk')}>
                                        <span className="icon-device"></span>
                                        <span className="icon-text">Desktop</span>
                                    </div>
                                </div>
                            </div>
                            {data.map((item,i)=>{
                                return( 
                                    <div key={item._id} className={`iframe-wrap ${iframeLoad?'animate':''}`}
                                        style={{
                                            width:`${frameSizeX-60}px`,
                                            height:`${iframeLoad?frameSizeY-60:0}px`
                                        }}
                                    >
                                        <iframe title="This is a detailView" key="i" src={item.iframeUrl}
                                            onLoad={this.iframeLoad} 
                                            frameBorder="0" width={"100%"} height="100%"></iframe>
                                    </div>  
                                )
                            })} 
                        </div>:null
                }
                </div>
            </div>
        )
    }
}


export default connect(
    (state)=>({
        common:state.common.toJS(),        
        motion:state.main.toJS().motions,
        modal:state.modal.toJS(),
        data:state.posts.toJS().itemData.data,
        dataState:state.posts.toJS().itemData.state,
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch),
        motionDispatch:bindActionCreators(motionActions,dispatch),
        handleHeader:bindActionCreators(commonAction,dispatch),
        
    })
)(DetailView);