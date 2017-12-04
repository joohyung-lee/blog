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
class DetailView extends Component {
    constructor(props){
        super(props);
        this.state={
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
        },300)
        
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);  
 
    }
    componentWillReceiveProps(nextProps) {
        const {get}=this.props;
        const locationChanged = nextProps.location !== this.props.location;
        if(locationChanged){
            
            
            get.getSinglePost('POSTS/SINGLE_GET',nextProps.match.params.category,nextProps.match.params.postId);
        }

    }
    //window resize width
    dimentions=()=>{
        const{motionDispatch}=this.props;
        motionDispatch.motionActions({
            motions:{
                innerWidth:window.innerWidth,
                innerHeight:window.innerHeight
            }
        });
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
        this.setState({
            iframeLoad:true
        })
    }
    render() {
        const {data,modal,motion}=this.props;
        const {iframeLoad} = this.state;
        return (
            <div className="detail-frame">
                <Scrollbars
                className="detail-contents-wrap"
                style={{
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
                <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                    {({x})=>
                        <div className="detail-main"
                            style={{
                                height:`${motion.innerHeight}px`,
                                backgroundColor:motion.bgColor
                            }}
                            >
                            <div className="device-controll-wrap">
                                <div className="device-controll">
                                    <div className="dic">
                                        <span className="icon-device"></span>
                                        <span className="icon-text">Phone</span>
                                    </div>
                                    <div className="dic">
                                        <span className="icon-device"></span>
                                        <span className="icon-text">Desktop</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`iframe-wrap ${iframeLoad?'load':''}`}>
                            {data.map((item,i)=>{
                                return <iframe src={item.iframeUrl}
                                onLoad={this.iframeLoad} 
                                frameBorder="0" width="100%" height="100%"></iframe>
                            })}
                            </div>   
                        </div>
                    }
                </Motion>
            </div>
                         
        );
    }
}


export default connect(
    (state)=>({
        motion:state.main.toJS().motions,
        modal:state.modal.toJS(),
        data:state.posts.toJS().itemData.data,
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch),
        motionDispatch:bindActionCreators(motionActions,dispatch),
    })
)(DetailView);