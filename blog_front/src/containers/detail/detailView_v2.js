import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {TransitionMotion,spring} from 'react-motion';
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

//css
import 'styles/detail/index.scss';
class DetailView extends Component {
    constructor(props){
        super(props);
        this.state={
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
        get.getSinglePost('POSTS/SINGLE_GET',this.props.match.params.category,this.props.match.params.postId);
        // setTimeout(function(){ 
        //     motionDispatch.motionActions({
        //         motions:{
        //             detailView:false
        //         }
        //     }); 
        // }, 500);
        
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);  
 
    }
    
    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location;
        if(locationChanged){

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
    render() {
        const {data,modal,motion}=this.props;
        return (
            <div>
                <button onClick={this.layerclose}>close</button>
                    {data.map((item,i)=>{
                        return  <div key="i" className="detail-wrap" style={{
                                    
                            }}>
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
            </div>
                         
        );
    }
}


export default connect(
    (state)=>({
        motion:state.main.toJS().motions,
        modal:state.modal.toJS(),
        data:state.posts.toJS().itemData.data
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch),
        motionDispatch:bindActionCreators(motionActions,dispatch),
    })
)(DetailView);