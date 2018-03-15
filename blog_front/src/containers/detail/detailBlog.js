import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
//components
import asyncRoute from 'lib/asyncRoute';
import {MarkdownView} from 'components/pages';
//redux
import * as commonAction from 'redux/common';
import * as httpRequest from 'redux/helper/httpRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'redux/modal';
import * as motionActions from 'redux/main';
import * as postsAction from 'redux/posts';

//svg&images
import IconPhone from 'images/iconPhone';
import IconDesk from 'images/iconDesk';
class DetailBlog extends Component {
    constructor(props){
        super(props);
        this.state={
            windowHeight:document.documentElement.clientHeight,
        }
    }
    componentDidMount(){   
        const {get}=this.props;
        this.dimensions();
        window.addEventListener('resize',this.dimensions);
        
        setTimeout(()=>{
            get.getSinglePost('POSTS/SINGLE_GET',this.props.match.params.category,this.props.match.params.postId);
        },400);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimensions);  
    }
    componentWillReceiveProps(nextProps) {
        
        const {get,data,motionDispatch,motion,loading,commentsLoading,dataState}=nextProps;
        const locationChanged = nextProps.location !== this.props.location;
        if(locationChanged){
            setTimeout(()=>{
                get.getSinglePost('POSTS/SINGLE_GET',nextProps.match.params.category,nextProps.match.params.postId);
            },400)
        }
        if(!motion.detailLoad){
            this.dimensions();
            
            if(this.props.loading!==loading && dataState==="success"){         
                let isBright = (parseInt(this.get_brightness(data.bgColor),10) > 160);           
                motionDispatch.motionActions({
                    motions:{
                        bgColor:data.bgColor,
                        detailLoad:true
                    }
                });  
            }
        }

    }
    dimensions=()=>{
        let windowHeight=document.documentElement.clientHeight;
        this.setState({
            windowHeight:windowHeight
        })
    }
    goBack=(link)=>{
        const {data}=this.props;
        if(link=='none'){
            this.props.history.goBack();
        }else{
            this.props.history.push(`/${link}`); 
            
        }
        
    }
    handleScroll=(value)=>{
        let root=document.querySelector('#root');
        let parallax=root.querySelectorAll('.dic');
        
        if(parallax){
            [].forEach.call(parallax, function(item,i) {
                if(value.scrollTop>item.offsetTop-document.documentElement.clientHeight){
                    item.classList.add('active')
                }
                
              });
        }
        var blog=require('./blog');
        blog.parallax(value);
    }
    get_brightness=(hexCode)=>{
        hexCode = hexCode.replace('#', '');
        var c_r = parseInt(hexCode.substr(0, 2),16);
        var c_g = parseInt(hexCode.substr(2, 2),16);
        var c_b = parseInt(hexCode.substr(4, 2),16);
        return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    }
    render() {
        const {motion,data,common} = this.props;
        const {windowHeight}=this.state;
        return (
            <Scrollbars
                    className={`detail-blog-wrap ${common.isBright?'bright':'dark'}`}
                    renderView={this.renderView}
                    onScrollFrame={this.handleScroll}
                    style={{
                        position:'absolute',
                        top:0,
                        right:0,
                        width:`100%`,
                        height:`${windowHeight}px`,
                        backgroundColor:motion.bgColor
                    }}>
                <div className="detail-blog-header">
                    {motion.backUrl?
                        <span className={`go-back`} onClick={this.goBack.bind(this,'none')}>
                            <span className="icon"></span>
                            <span>Back</span>
                        </span>:
                        <span className={`go-back`} onClick={this.goBack.bind(this,data.category)}>
                            <span className="icon"></span>
                            <span>{data.category}</span>
                        </span>
                    }
                    <div className="right visit-site">
                        <a href={data.iframeUrl} target="_blank">Visit Site</a>
                    </div>
                </div>
                <div className="detail-blog">
                {motion.detailLoad?
                    <MarkdownView source={data.body}/>
                :null}
                </div>
            </Scrollbars>
        );
    }
}

DetailBlog.propTypes = {

};

export default connect(
    (state)=>({
        authUser:state.auth.toJS().profile,
        common:state.common.toJS(),        
        motion:state.main.toJS().motions,
        modal:state.modal.toJS(),
        data:state.posts.toJS().itemData.data,
        loading:state.posts.toJS().itemData.pending,
        commentsLoading:state.posts.toJS().itemData.comments.pending,
        dataState:state.posts.toJS().itemData.state,
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
        modalView: bindActionCreators(modalActions, dispatch),
        motionDispatch:bindActionCreators(motionActions,dispatch),
        handleHeader:bindActionCreators(commonAction,dispatch),
        input: bindActionCreators(postsAction, dispatch),
    })
)(DetailBlog);