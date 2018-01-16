import React, { Component, PropTypes } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';

class CommentsTxtArea extends Component {
    constructor(props){
        super(props);
        this.state={
            textareaHeight:60,
            textareaFocus:false,
            textareaActive:false,
            blank:false
        }
    }
    componentDidMount(){
        (this.props.focus)?this.refs.commentsTxtArea.focus():null
    }
    textareaFocus=(e)=>{
        if(!this.props.isLogin){
            return this.props.modalView();
        }else{
            this.props.writeInit();
            return this.setState({
                textareaHeight:e.target.clientHeight<120?120:e.target.clientHeight,
                textareaFocus:true,
                textareaActive:true,
            })
            
        }
    }
    textareaBlur=(e)=>{
        //check space
        let blank_pattern = /^\s+|\s+$/g;
        if(e.target.value.replace( blank_pattern, '' ) === "" ){
           this.setState({
               textareaHeight:60,
               textareaFocus:false,
               textareaActive:true,
               blank:true,
               visible:this.props.type==='reply'?false:true
           });
        }
       
   }
   textareaKeyDown=(e)=>{
        let target=e.target;
        requestAnimationFrame((e)=>{
            this.setState({
                textareaHeight:60,
                textareaActive:false,
                blank:false
            });
            this.setState({
                textareaHeight:target.scrollHeight<120?120:target.scrollHeight
            })
        })
    }
    render() {
        const {textareaFocus}=this.state;
        return (
            <div className={`commentsTxtArea ${textareaFocus?'focus':'default'}`}>
                {this.props.isLogin?
                <div className="avatar-wrap">
                    <div className="avatar" 
                        style={{backgroundImage:`url(${this.props.currentUser.profileImg.isDefault?defaultAvatar:this.props.currentUser.profileImg.url})`}}
                    />
                    <div className={`avatar-info`}>
                        <p className="name">{this.props.currentUser.userName}</p>                                
                    </div>
                </div>:null
                }
                <textarea type="text" placeholder="Add comment..."
                    ref="commentsTxtArea"
                    className={this.state.textareaActive?'animate':''}
                    value={this.state.blank?'':this.props.commentsText}
                    onChange={this.props.commentsOnChange}
                    onKeyDown={this.textareaKeyDown}
                    onFocus={this.textareaFocus}
                    onBlur={this.textareaBlur}
                    style={{
                        height:this.state.textareaHeight
                    }}
                    />
                {this.props.children}
            </div>
        );
    }
}

CommentsTxtArea.propTypes = {

};

export default CommentsTxtArea;