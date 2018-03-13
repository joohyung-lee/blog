import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

//components
import {ProfileContents} from 'components/mypage';
import {SimpleCard} from 'components/main';
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
        const {motionDispatch,data}=this.props;
            motionDispatch.motionActions({
                motions:{
                    bgColor:bgColor===''?'#ffffff':bgColor,
                    detailLoad:false,
                    backUrl:true
                }
            });
            if(data[i].blogType==="blog"){
                this.props.history.push(`/blog/${category}/${id}`);   
            }else{
                this.props.history.push(`/posts/${category}/${id}`);    
            }           
    }
    render() {
        const {user,userSuccess,data} = this.props;
        return (
            <div className="collections-wrap">
                <div className="collections-header">
                    {(userSuccess==='success')?
                        <ProfileContents
                        currentUser={user}
                        />:null
                    }
                </div>
                <Scrollbars>
                <div className="collections-contents">
                    
                    {
                        data.map((item,i)=>{
                            return (
                                <SimpleCard
                                key={item._id}
                                data={item}
                                currentUser={user}
                                onClick={this.itemUp.bind(this,item._id,i,item.bgColor,item.category)}
                                />
                            )
                        })
                    }
                    
                </div>
                </Scrollbars>
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
