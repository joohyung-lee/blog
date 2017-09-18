import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as PostActions from 'redux/motionLab';

const PostWrap=({title,index})=>{
    return (
        
        <li>{title}, {index}</li>
    );
}
class MotionLab extends Component {
    componentDidMount() {
        const {postReducer}=this.props;
    }
    render() {
        const{error,loading,post,number}=this.props;
        return (
            <div>
                {loading && <h2>로딩중..</h2>}
                {error?
                    <h1>에러발생</h1>
                    :(
                        <ul>
                            {/* {
                                this.props.post.map((postItem,number)=>{
                                    return (<PostWrap key={number} index={number} title={postItem.title}/>)                              
                                })
                            } */}
                           
                        </ul>
                    )}
                <h1>MotionLab</h1>
            </div>
        );
    }
}

MotionLab.propTypes = {

};

export default connect(
    (state)=>({
        
    }),
    (dispatch)=>({ 
    })
)(MotionLab);