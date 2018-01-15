import React, { Component } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';
import CommentsTxtArea from './commentsTxtArea';
import ModifyTxtArea from './modifyTxtArea';
class Comments extends Component {
    render() {
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className={`comments-body`}>
                    <div className={`comments-write`}>
                        <CommentsTxtArea
                        {...this.props}
                        writeInit={this.props.writeInit.bind(this,'write')}
                        focus={false}
                        commentsOnChange={this.props.commentsOnChange.bind(null,'write')}>
                        <button className="submit" onClick={this.props.writeComments.bind(this,'write',null,null)}>등록</button>
                        </CommentsTxtArea>
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
                                                            <ModifyTxtArea
                                                            {...this.props}
                                                            focus={true}
                                                            commentsOnChange={this.props.commentsOnChange.bind(this,'modify')}
                                                            >
                                                            <div className="btn-group">
                                                                <button className="submit" onClick={this.props.writeComments.bind(this,'modify',i,null)}>등록</button>
                                                                <button className="btn-cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                            </div>
                                                            </ModifyTxtArea>
                                                        </div>
                                                        :
                                                    <p className="text-body">{item.body.split('\n').map((line,i)=>{
                                                        return (<span key={i}>{line}<br/></span>)
                                                    })}</p>
                                                }
                                                {//reply comments
                                                    this.props.commentView==='reply' && this.props.modifyIndex===i?
                                                        <div className="comments-write reply">
                                                            <CommentsTxtArea
                                                            {...this.props}
                                                            commentsText={this.props.replyText}
                                                            focus={true}
                                                            commentsOnChange={this.props.commentsOnChange.bind(null,'reply')}
                                                            >
                                                            <div className="btn-group">
                                                                <button className="submit" onClick={this.props.writeComments.bind(this,'reply',i,null)}>등록</button>
                                                                <button className="btn-cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                            </div>
                                                            </CommentsTxtArea>
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
                                                                this.props.commentView==='replyModify' && this.props.modifyIndex===`${i}/${rei}`?
                                                                    <div className="comments-write reply">
                                                                        <ModifyTxtArea
                                                                        {...this.props}
                                                                        focus={true}
                                                                        commentsOnChange={this.props.commentsOnChange.bind(this,'replyModify')}
                                                                        >
                                                                        <div className="btn-group">
                                                                            <button className="submit" onClick={this.props.writeComments.bind(this,'replyModify',i,rei)}>등록</button>
                                                                            <button className="btn-cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                                        </div>
                                                                        </ModifyTxtArea>
                                                                    </div>:
                                                                <p className="text-body">{replyItem.body.split('\n').map((line,i)=>{
                                                                    return (<span key={i}>{line}<br/></span>)
                                                                })}</p>
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