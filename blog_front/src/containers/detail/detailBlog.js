import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import dateFormat from 'dateformat';
import MobileDetect from 'mobile-detect';
//components
import {Documentation} from 'components/detail';
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
            windowHeight:document.documentElement.clientHeight
        }
    }
    componentDidMount(){   
        this.dimensions();
        window.addEventListener('resize',this.dimensions);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimensions);  
    }
    dimensions=()=>{
        let windowHeight=document.documentElement.clientHeight;
        this.setState({
            windowHeight:windowHeight
        })
    }
    render() {
        let temp={
            name:['123','123','asdga']
        }
        const {windowHeight}=this.state;
        return (
            <Scrollbars
                    className={`detail-blog-wrap`}
                    renderView={this.renderView}
                    style={{
                        position:'absolute',
                        top:0,
                        right:0,
                        width:`100%`,
                        height:`${windowHeight}px`,
                    }}>
                <div className="detail-blog-header">
                    {temp.name.map((data,i)=>{
                        return <div>{data}</div>
                    })}
                </div>
                <div className="detail-blog">
                    <p>blog 타입화면</p>
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