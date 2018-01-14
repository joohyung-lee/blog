import React, { Component } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';
class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            textareaHeight:60,
            textareaFocus:false,
            textareaActive:false,
            blank:false
        }
    }
    textareaFocus=(e)=>{
        if(!this.props.isLogin){
            return this.props.modalView();
        }else{
            e.target.style.height=e.target.clientHeight<120?'120px':e.target.clientHeight+'px';

            return this.setState({
                textareaFocus:true,
                textareaActive:true,
                textareaHeight:this.state.textareaHeight<120?120:this.state.textareaHeight
            })
        }
    }
    textareaBlur=(e)=>{
         //check space
         let blank_pattern = /^\s+|\s+$/g;
         if(e.target.value.replace( blank_pattern, '' ) === "" ){
            this.setState({
                textareaFocus:false,
                textareaActive:true,
                textareaHeight:60,
                blank:true
            })
         }
        
    }
    textareaKeyDown=(e)=>{
        let target=e.target;
        requestAnimationFrame((e)=>{
            this.setState({
                textareaActive:false,
                textareaHeight:60,
                blank:false
            });
            
            target.style.height='60px';
            target.style.height=target.scrollHeight<120?'120px':target.scrollHeight+'px';
            this.setState({
                textareaHeight:target.scrollHeight<120?120:target.scrollHeight
            });
        })
    }
    render() {
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className={`comments-body`}>
                    <div className={`comments-write ${this.state.textareaFocus?'focus':'default'}`}>
                        {this.props.isLogin?
                        <div className="avatar-wrap">
                            <div className="avatar" 
                                style={{backgroundImage:`url(${this.props.currentUser.profileImg.isDefault?defaultAvatar:this.props.currentUser.profileImg.url})`}}
                            />
                            <div className="avatar-info">
                                <p className="name">{this.props.currentUser.userName}</p>                                
                            </div>
                        </div>:null
                        }
                        <textarea type="text" placeholder="Add comment..."
                            className={this.state.textareaActive?'animate':''}
                            value={this.state.blank?'':this.props.commentsText}
                            onChange={this.props.commentsOnChange.bind(this,'write')}
                            onKeyDown={this.textareaKeyDown}
                            onFocus={this.textareaFocus}
                            onBlur={this.textareaBlur}
                            style={{
                                height:60
                            }}
                            />
                        <button className="submit" onClick={this.props.writeComments.bind(this,'write',null,null)}>등록</button>
                    </div>    
                    <div className="comments-contents">
                        <ul>
                            {this.props.commentsData.map((item,i)=>{
                                return (
                                    <li key={i}>
                                        <div className="original-comments">
                                                <div className="user-header">
                                                    <div className="avatar-wrap">
                                                        <div className="avatar" style={{
                                                            backgroundImage:`url(${item.user.profileImg.isDefault?defaultAvatar:item.user.profileImg.url})`}}
                                                        />
                                                        <div className="avatar-info">
                                                            <p className="name">{item.user.userName}</p>
                                                            <p className="date">{item.date}</p>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button className="btn-reply" onClick={this.props.writeMode.bind(this,'reply',i,null,null)}>댓글쓰기</button>
                                                        {item.user.oauthID===this.props.currentUser.oauthID?
                                                            <div className="my-comments">
                                                                <button className="modify" onClick={this.props.writeMode.bind(this,'modify',i,null,item.body)}>수정</button>
                                                                <button className="delete" onClick={this.props.delComments.bind(this,'modify',i,null)}>지우기</button>
                                                            </div>
                                                            :null
                                                        }
                                                    </div>
                                                </div>
                                                {//modify comments
                                                    this.props.commentView==='modify' && this.props.modifyIndex===i?
                                                    <div className="comments-write reply">
                                                    <textarea type="text" 
                                                        value={this.props.replyText}
                                                        onChange={this.props.commentsOnChange.bind(this,'modify')}
                                                        onKeyDown={this.textareaKeyDown}
                                                        onFocus={this.textareaFocus}
                                                        onBlur={this.textareaBlur}
                                                        style={{
                                                            height:this.state.textareaHeight
                                                        }}
                                                    />
                                                    <button className="submit" onClick={this.props.writeComments.bind(this,'modify',i,null)}>등록</button>
                                                    </div>:
                                                    <p className="text-body">{item.body}</p>
                                                }
                                                {//reply comments
                                                    this.props.commentView==='reply' && this.props.modifyIndex===i?
                                                    <div className="comments-write reply">
                                                    <textarea type="text" 
                                                        value={this.state.blank?'':this.props.replyText}
                                                        onChange={this.props.commentsOnChange.bind(this,'reply')}
                                                        onKeyDown={this.textareaKeyDown}
                                                        onFocus={this.textareaFocus}
                                                        onBlur={this.textareaBlur}
                                                        style={{
                                                            height:this.state.textareaHeight
                                                        }}
                                                    />
                                                    <button className="submit" onClick={this.props.writeComments.bind(this,'reply',i,null)}>등록</button>
                                                    </div>:
                                                    null
                                                }
                                        </div>
                                        {
                                        (item.reply)?
                                        <div className="reply-comments">
                                            <ul>
                                                {item.reply.map((replyItem,rei)=>{
                                                    return  (
                                                        <li key={rei}>
                                                            <div className="user-header">
                                                                <div className="avatar-wrap">
                                                                    <div className="avatar" style={{
                                                                        backgroundImage:`url(${replyItem.user.profileImg.isDefault?defaultAvatar:replyItem.user.profileImg.url})`
                                                                    }}/>
                                                                    <div className="avatar-info">
                                                                        <p className="name">{replyItem.user.userName}</p>
                                                                        <p className="date">{replyItem.date}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="btn-group">
                                                                    {replyItem.user.oauthID===this.props.currentUser.oauthID?
                                                                        <div className="my-comments">
                                                                            <button className="modify" onClick={this.props.writeMode.bind(this,'replyModify',i,rei,replyItem.body)}>수정</button>
                                                                            <button className="delete" onClick={this.props.delComments.bind(this,'reply',i,rei)}>지우기</button>
                                                                        </div>
                                                                        :null
                                                                    }
                                                                </div>
                                                            </div>
                                                            {//reply comments
                                                                this.props.commentView==='replyModify' && this.props.modifyIndex===rei?
                                                                <div className="comments-write reply">
                                                                    <textarea type="text" 
                                                                        value={this.props.replyText}
                                                                        onChange={this.props.commentsOnChange.bind(this,'replyModify')}
                                                                        onKeyDown={this.textareaKeyDown}
                                                                        onFocus={this.textareaFocus}
                                                                        onBlur={this.textareaBlur}
                                                                        style={{
                                                                            height:this.state.textareaHeight
                                                                        }}    
                                                                    />
                                                                    <button className="submit" onClick={this.props.writeComments.bind(this,'replyModify',i,rei)}>등록</button>
                                                                </div>:
                                                                <p className="text-body">{replyItem.body}</p>
                                                            }
                                                            
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>:''
                                        }
                                    </li>
                                ); 
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;