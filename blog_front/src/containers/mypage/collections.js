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
        const {get} = this.props;
        const url='home';
        get.getCategoryPost('POSTS/CATEGORY_GET',url);
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
        data:state.posts.toJS().listData.data,
        user:state.auth.toJS().profile.user,
        userSuccess:state.auth.toJS().profile.state,
    }),
    (dispatch)=>({
        motionDispatch:bindActionCreators(motionActions,dispatch),
        get:bindActionCreators(httpRequest,dispatch),
    })
)(Collections);
