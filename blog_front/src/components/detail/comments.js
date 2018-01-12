import React, { Component } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';
class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            textareaHeight:50,
            textareaActive:false
        }
    }
    textareaFocus=()=>{
        this.setState({
            textareaActive:true,
            textareaHeight:this.state.textareaHeight<100?100:this.state.textareaHeight
        })
    }
    textareaBlur=(e)=>{
        if(e.target.value===''){
            this.setState({
                textareaActive:true,
                textareaHeight:50,
            })
        }
        
    }
    textareaKeyDown=(e)=>{
        const target=e.target;
        requestAnimationFrame((e)=>{
            this.setState({
                textareaActive:false,
                textareaHeight:50,
            });
            this.setState({
                textareaHeight:target.scrollHeight<100?100:target.scrollHeight
            });
        })
    }
    render() {
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className="comments-body">
                    <div className="comments-write"
                        >
                        <div className="avatar-wrap">
                            <div className="avatar" 
                                style={{backgroundImage:`url(${defaultAvatar})`}}
                            />
                            <div className="avatar-info">
                                <p className="name">{this.props.currentUser.userName}</p>                                
                            </div>
                        </div>
                        <textarea type="text" placeholder="Add comment..."
                            className={this.state.textareaActive?'animate':''}
                            value={this.props.commentsText} 
                            onChange={this.props.commentsOnChange.bind(this,'write',null,null)}
                            onKeyDown={this.textareaKeyDown}
                            onFocus={this.textareaFocus}
                            onBlur={this.textareaBlur}
                            style={{
                                height:this.state.textareaHeight
                            }}
                            />
                        <button className="submit" onClick={this.props.writeComments.bind(this,'write',null)}>등록</button>
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
                                                        <button className="btn-reply" onClick={this.props.writeMode.bind(this,'reply',i)}>댓글쓰기</button>
                                                        {item.user.oauthID===this.props.currentUser.oauthID?
                                                            <div className="my-comments">
                                                                <button className="modify" onClick={this.props.writeMode.bind(this,'modify',i)}>수정</button>
                                                                <button className="delete" onClick={this.props.delComments.bind(this,'modify',i,null)} className="btn-delete">지우기</button>
                                                            </div>
                                                            :null
                                                        }
                                                    </div>
                                                </div>
                                                {//modify comments
                                                    this.props.commentView==='modify' && this.props.modifyIndex===i?
                                                    <div className="comments-write">
                                                    <textarea type="text" 
                                                        value={item.body}
                                                        onChange={this.props.commentsOnChange.bind(this,'modify',i,null)}/>
                                                    <button className="submit" onClick={this.props.writeComments.bind(this,'modify',null)}>등록</button>
                                                    </div>:
                                                    <p className="text-body">{item.body}</p>
                                                }
                                                {//reply comments
                                                    this.props.commentView==='reply' && this.props.modifyIndex===i?
                                                    <div className="comments-write">
                                                    <textarea type="text" 
                                                        value={this.props.replyText}
                                                        onChange={this.props.commentsOnChange.bind(this,'reply',i,null)}/>
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
                                                                            <button className="modify" onClick={this.props.writeMode.bind(this,'replyModify',i,rei)}>수정</button>
                                                                            <button className="delete" onClick={this.props.delComments.bind(this,'reply',i,rei)} className="btn-delete">지우기</button>
                                                                        </div>
                                                                        :null
                                                                    }
                                                                </div>
                                                            </div>
                                                            {//reply comments
                                                                this.props.commentView==='replyModify' && this.props.modifyIndex===rei?
                                                                <div className="comments-write">
                                                                <textarea type="text" 
                                                                    value={replyItem.body}
                                                                    onChange={this.props.commentsOnChange.bind(this,'replyModify',i,rei)}/>
                                                                <button className="submit" onClick={this.props.writeComments.bind(this,'replyModify',i)}>등록</button>
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