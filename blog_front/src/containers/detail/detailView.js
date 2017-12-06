import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Motion,spring} from 'react-motion';
import { Scrollbars } from 'react-custom-scrollbars';
//components
import MarkdownView from 'components/common/markdown'
import {Comments} from 'components/detail' 
//containers
import {AuthLogin} from 'containers/auth'
//redux
import * as httpRequest from 'redux/helper/httpRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'redux/modal';
import * as motionActions from 'redux/main';
import { setTimeout } from 'timers';
//svg&images
import IframeBorder from 'images/iframeBorder';

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
        const {get,data,motion,motionDispatch}=this.props; 
        window.addEventListener('click',this.outHide);

        setTimeout(()=>{
            get.getSinglePost('POSTS/SINGLE_GET',this.props.match.params.category,this.props.match.params.postId);
        },400)
        
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);  
 
    }
    componentWillReceiveProps(nextProps) {
        const {get,data,motionDispatch,dataState,motion}=nextProps;
        
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
                motionDispatch.motionActions({
                    motions:{
                        bgColor:data[0].bgColor,
                        detailLoad:true
                    }
                });  
            }
        }

    }

    //window resize width
    dimentions=()=>{
        const{motionDispatch}=this.props;
        const {mobileMode,deskMode} = this.state
        motionDispatch.motionActions({
            motions:{
                innerWidth:window.innerWidth,
                innerHeight:window.innerHeight
            }
        });
        let sizeX;
        let sizeY;
        const frameWrap=window.innerWidth<1900?
        window.innerWidth<1600?
        window.innerWidth<1400?
        window.innerWidth:
        900:
        900:
        window.innerWidth*0.6;
        if(mobileMode){
            sizeX=375;
            sizeY=600;
        }else{
            sizeX=frameWrap;
            sizeY=frameWrap*0.6;
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
        const{motionDispatch}=this.props;
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
                frameSizeY:sizeX*0.6
            })
        }
    }
    render() {
        const {data,modal,motion,dataState}=this.props;
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
                        <button onClick={this.layerclose}>close</button>
                            {data.map((item,i)=>{
                                return  <div key="i"
                                            className="detail-contents"
                                        >
                                            <Link to="/posts/motionlab/59d3423f455c61032eb5b4b0">다음페이지</Link>
                                            <h1 className="title">{item.title}</h1>
                                            <div className="body">    
                                                <MarkdownView source={item.body}/>
                                            </div>
                                            <Comments
                                                header={<AuthLogin open={modal['postAuth'].open} dropdown={this.dropdown}/>}
                                                commentsData={this.state.commentsData}
                                            />
                                        </div>
                                
                            })}
                    </Scrollbars>
                    :null
                }
                <div className={`detail-main ${motion.detailLoad?'animate':''}`}
                    style={{
                        width:`${motion.detailLoad?`${frameWrap}px`:'100%'}`,
                        height:`${motion.innerHeight}px`,
                        backgroundColor:motion.bgColor
                    }}>
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
                                    <div key={item._id} className={`iframe-wrap`}
                                        style={{
                                            width:`${frameSizeX-40}px`,
                                            height:`${frameSizeY-40}px`
                                        }}
                                    >
                                        <iframe key="i" src={item.iframeUrl}
                                            onLoad={this.iframeLoad} 
                                            frameBorder="0" width={"100%"} height="100%"></iframe>
                                        <IframeBorder width={frameSizeX-40} height={frameSizeY-40}/>
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
        motion:state.main.toJS().motions,
        modal:state.modal.toJS(),
        data:state.posts.toJS().itemData.data,
        dataState:state.posts.toJS().itemData.state,
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch),
        motionDispatch:bindActionCreators(motionActions,dispatch),
    })
)(DetailView);