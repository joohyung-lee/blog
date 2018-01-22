import React, { Component } from 'react';

//components
import {ProfileContents,LikeContents} from 'components/mypage';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as httpRequest from 'redux/helper/httpRequest';
import * as motionActions from 'redux/main';
class Collections extends Component {  
    constructor(props){
        super(props);
        this.state={
            active:0
        }
    }
    componentDidMount(){
        const {user,get} = this.props;
        const userId=user.oauthID;
        if(this.props.userSuccess==='success'){
            return get.loadStar({
                type:'POSTS/STAR_LOAD',
                userId:userId
            });
        }
        
    }
    componentWillReceiveProps(nextProps){
        const {user,get} = nextProps;
        const userId=user.oauthID;
        if(this.props.userSuccess!==nextProps.userSuccess){
            return get.loadStar({
                type:'POSTS/STAR_LOAD',
                userId:userId
            });
        }
    }
    itemUp=(id,i,bgColor,category,e)=>{
        const {motionDispatch}=this.props;
            motionDispatch.motionActions({
                motions:{
                    active:i,
                    bgColor:bgColor,
                    detailLoad:false
                }
            });
            this.props.history.push(`/posts/${category}/${id}`);            
    }
    render() {
        const {user,userSuccess,data,motionDispatch} = this.props;
        const {active} = this.state;
        return (
            <div className="collections-wrap">
                <div className="collections-header">
                    {(userSuccess==='success')?
                        <ProfileContents
                        currentUser={user}
                        />:null
                    }
                </div>
                <div className="collections-contents">
                {
                    data.map((item,i)=>{
                        return (
                            <LikeContents
                            key={item._id}
                            data={item}
                            currentUser={user}
                            />
                        )
                    })
                }
                </div>
            </div>             
        )
    }
}
export default connect(
    (state)=>({
        data:state.posts.toJS().starListData.data,
        user:state.auth.toJS().profile.user,
        userSuccess:state.auth.toJS().profile.state,
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
    })
)(Collections);
