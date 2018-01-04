import React, { Component } from 'react';
class Comments extends Component {  
    render() {
        
        return (
            <div className="comments-wrap">
                <div className="comments-header">
                    {this.props.header}
                </div>
                <div className="comments-body">
                    <div className="comments-write">
                        <textarea type="text" placeholder="댓글을 입력해주세요"/>
                        <button>등록</button>
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
                                                            <p>{item.userName}</p>
                                                            <p>{item.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button className="btn-modify">수정</button>
                                                        <button className="btn-reply">댓글쓰기</button>
                                                        <button className="btn-delete">지우기</button>
                                                    </div>
                                                </div>
                                                <p className="text-body">{item.body}</p>
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
                                                                        <p>{replyItem.userName}</p>
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