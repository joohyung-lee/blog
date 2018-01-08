import React, { Component } from 'react';
class Comments extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className="comments-body">
                    <div className="comments-write">
                        <textarea type="text" placeholder="댓글을 입력해주세요"
                            value={this.props.commentsText} 
                            onChange={this.props.commentsOnChange.bind(this,'write',null)}/>
                        <button onClick={this.props.writeComments.bind(this,'write',null)}>등록</button>
                    </div>    
                    <div className="comments-contents">
                        <ul>
                            {this.props.commentsData.map((item,i)=>{
                                return (
                                    <li key={i}>
                                        <div className="original-comments">
                                                <div className="user-header">
                                                    <div className="avatar-wrap">
                                                        <div className="avatar" style={{backgroundImage:`url(${item.userImg})`}}/>
                                                        <div className="avatar-info">
                                                            <p>{item.name}</p>
                                                            <p>{item.date}</p>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button className="btn-reply" onClick={this.props.writeMode.bind(this,'reply',i)}>댓글쓰기</button>
                                                        {item.name===this.props.commentsUser?
                                                        <div className="my-comments">
                                                            <button className="btn-modify" onClick={this.props.writeMode.bind(this,'modify',i)}>수정</button>
                                                            <button onClick={this.props.delComments.bind(this,i)} className="btn-delete">지우기</button>
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
                                                        onChange={this.props.commentsOnChange.bind(this,'modify',i)}/>
                                                    <button onClick={this.props.writeComments.bind(this,'modify',null)}>등록</button>
                                                    </div>:
                                                    <p className="text-body">{item.body}</p>
                                                }
                                                {//reply comments
                                                    this.props.commentView==='reply' && this.props.modifyIndex===i?
                                                    <div className="comments-write">
                                                    <textarea type="text" 
                                                        value={this.props.replyText}
                                                        onChange={this.props.commentsOnChange.bind(this,'reply',i)}/>
                                                    <button onClick={this.props.writeComments.bind(this,'reply',i)}>등록</button>
                                                    </div>:
                                                    null
                                                }

                                        </div>
                                        {
                                        (item.reply)?
                                        <div className="reply-comments">
                                            <ul>
                                                {item.reply.map((replyItem,i)=>{
                                                    return  (
                                                        <li key={i}>
                                                            <div className="user-header">
                                                                <div className="avatar-wrap">
                                                                    <div className="avatar" style={{backgroundImage:`url(${replyItem.userImg})`}}/>
                                                                    <div className="avatar-info">
                                                                        <p>{replyItem.name}</p>
                                                                        <p>{replyItem.date}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="btn-group">
                                                                    <button className="btn-modify">수정</button>
                                                                    <button className="btn-delete">지우기</button>
                                                                </div>
                                                            </div>
                                                            <p className="text-body">{replyItem.body}</p>
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