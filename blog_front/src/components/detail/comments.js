import React, { Component } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';
import CommentsTxtArea from './commentsTxtArea';
import ModifyTxtArea from './modifyTxtArea';
class Comments extends Component {
    render() {
        return (
            <div className="comments-wrap">
                <div className="category-title">
                    <h4>Comments</h4>
                    <span className="comments-count">{this.props.commentsCount}</span>
                </div>
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
                        <div className="btn-group">
                            <button className="submit" onClick={this.props.writeComments.bind(this,'write',null,null)}>Submit</button>
                        </div>
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
                                                                <button className="submit" onClick={this.props.writeComments.bind(this,'modify',i,null)}>Submit</button>
                                                                <button className="cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                            </div>
                                                            </ModifyTxtArea>
                                                        </div>
                                                        :
                                                    <p className="text-body">{item.body.split('\n').map((line,i)=>{
                                                        return (<span key={i}>{line}<br/></span>)
                                                    })}</p>
                                                }
                                                
                                                <div className="btn-group">
                                                    <button className="reply" onClick={this.props.writeMode.bind(this,'reply',i,null,null)}>Reply</button>
                                                    {item.user.oauthID===this.props.currentUser.oauthID?
                                                            <button className="modify" onClick={this.props.writeMode.bind(this,'modify',i,null,item.body)}>Modify</button>
                                                        :null
                                                    }
                                                    {item.user.oauthID===this.props.currentUser.oauthID?
                                                            <button className="delete" onClick={this.props.delComments.bind(this,'modify',i,null)}>Delete</button>
                                                        :null
                                                    }
                                                </div>
                                                {//reply comments
                                                    this.props.commentView==='reply' && this.props.modifyIndex===i?
                                                    <div className="comments-write reply">
                                                        <CommentsTxtArea
                                                        {...this.props}
                                                        commentsText={this.props.replyText}
                                                        type='reply'
                                                        focus={true}
                                                        commentsOnChange={this.props.commentsOnChange.bind(null,'reply')}
                                                        >
                                                        <div className="btn-group">
                                                            <button className="submit" onClick={this.props.writeComments.bind(this,'reply',i,null)}>Submit</button>
                                                            <button className="cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                        </div>
                                                        </CommentsTxtArea>
                                                    </div>:
                                                null
                                            }
                                        </div>
                                        {
                                        (item.reply && item.reply.length!==0)?
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
                                                                            <button className="submit" onClick={this.props.writeComments.bind(this,'replyModify',i,rei)}>Submit</button>
                                                                            <button className="cancel" onClick={this.props.textareaCancel}>Cancle</button>
                                                                        </div>
                                                                        </ModifyTxtArea>
                                                                    </div>:
                                                                <p className="text-body">{replyItem.body.split('\n').map((line,i)=>{
                                                                    return (<span key={i}>{line}<br/></span>)
                                                                })}</p>
                                                            }
                                                            
                                                                {replyItem.user.oauthID===this.props.currentUser.oauthID?
                                                                    <div className="btn-group">
                                                                        <button className="modify" onClick={this.props.writeMode.bind(this,'replyModify',i,rei,replyItem.body)}>Modify</button>
                                                                        <button className="delete" onClick={this.props.delComments.bind(this,'reply',i,rei)}>Delete</button>
                                                                    </div>    
                                                                    :null
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