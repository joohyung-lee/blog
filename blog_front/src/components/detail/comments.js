import React, { Component } from 'react';
class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            modifyIndex:''
        }
    }
    commentsModify=(i)=>{
        this.setState({
            modifyIndex:i
        })
    }
    render() {
        const {modifyIndex}=this.state
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className="comments-body">
                    <div className="comments-write">
                        <textarea type="text" placeholder="댓글을 입력해주세요"
                            value={this.props.commentsText} 
                            onChange={this.props.commentsOnChange.bind(this,'write')}/>
                        <button onClick={this.props.writeComments}>등록</button>
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
                                                        <button className="btn-reply">댓글쓰기</button>
                                                        {item.name===this.props.commentsUser?
                                                        <div className="my-comments">
                                                            <button className="btn-modify" onClick={this.commentsModify.bind(this,i)}>수정</button>
                                                            <button onClick={this.props.delComments.bind(this,i)} className="btn-delete">지우기</button>
                                                        </div>
                                                        :null
                                                        }
                                                    </div>
                                                </div>
                                                {modifyIndex===i?
                                                <div className="comments-write">
                                                <textarea type="text" 
                                                    value={this.props.commentsModifyText}
                                                    onChange={this.props.commentsOnChange.bind(this,'modify')}/>
                                                <button onClick={this.props.writeComments}>등록</button>
                                                </div>:
                                                <p className="text-body">{item.body}</p>
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