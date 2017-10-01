import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ProfileContents extends Component {
    render() {
        return (
            <div className="profile-wrap">
                <div className="avatar-wrap">
                    <div className="avatar" style={{backgroundImage:`url(${this.props.userImg})`}}/>
                    <div className="avatar-info">
                        <h2>{this.props.displayName}</h2>
                        <p>{this.props.loginType}</p>
                    </div>
                </div>
                <div className="activity-wrap">
                    <div className="activity-header">
                        <h3 className="title">My comments</h3>
                    </div>    
                    <div className="activity-contents">
                        <ul>
                            {this.props.commentsData.map((item,i)=>{
                                return (
                                    <li key={i}>
                                        <div className="avatar-wrap">
                                            <div className="avatar" style={{backgroundImage:`url(${item.userImg})`}}/>
                                            <div className="avatar-info">
                                                <h2>{item.displayName}</h2>
                                                <p>{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="link-page">
                                            <Link to={`/${item.pageLink}`}>
                                                <div className="page-thumb" style={{backgroundImage:`url(${item.pageThumb})`}}/>
                                                <div className="page-info">
                                                    <h3>{item.pageTitle}</h3>
                                                    <p>{item.pageDate}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="comments-wrap">
                                            {
                                                (item.replyComments)?
                                                <div className="comments-contents">
                                                    <div className="original-comments">
                                                        {item.originalComments}
                                                    </div>
                                                    <div className="my-comments">
                                                        {item.myComments}
                                                    </div>
                                                </div>:
                                                <div className="comments-contents">
                                                    <div className="my-comments">
                                                        {item.myComments}
                                                    </div>
                                                </div>
                                            }
                                            <div className="btn-group">
                                                <button className="modify"></button>
                                                <button className="delete"></button>
                                            </div>
                                        </div>    
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

ProfileContents.propTypes = {

};

export default ProfileContents;