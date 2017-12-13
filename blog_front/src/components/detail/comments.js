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
                    </div>    
                    <div className="comments-contents">
                        <ul>
                            {this.props.commentsData.map((item,i)=>{
                                return (
                                    <li key={i}>
                                            <div className="original-comments">
                                                    <div className="btn-group">
                                                        <button className="btn-modify">수정</button>
                                                        <button className="btn-reply">댓글쓰기</button>
                                                        <button className="btn-delete">지우기</button>
                                                    </div>
                                                    <div className="avatar-wrap">
                                                        <div className="avatar" style={{backgroundImage:`url(${item.userImg})`}}/>
                                                        <div className="avatar-info">
                                                            <h2>{item.userName}</h2>
                                                            <p>{item.date}</p>
                                                        </div>
                                                    </div>
                                                    {item.body}
                                            </div>
                                            {
                                            (item.reply)?
                                            <div className="reply-comments">
                                                    <div className="btn-group">
                                                        <button className="btn-modify">수정</button>
                                                        <button className="btn-delete">지우기</button>
                                                    </div>
                                                <ul>
                                                    {item.reply.map((replyItem,i)=>{
                                                        return  <li key={i}>
                                                                    <div className="avatar-wrap">
                                                                        <div className="avatar" style={{backgroundImage:`url(${replyItem.userImg})`}}/>
                                                                        <div className="avatar-info">
                                                                            <h2>{replyItem.userName}</h2>
                                                                            <p>{replyItem.date}</p>
                                                                        </div>
                                                                    </div>
                                                                    {replyItem.body}
                                                                </li>
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