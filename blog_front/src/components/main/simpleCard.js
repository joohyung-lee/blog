import React, { Component } from 'react';
import DefaultLoading from 'images/defaultLoading';
import defaultAvatar from 'images/defaultAvatar.svg';
import urlConfig from 'config/urlConfig';
import Dotdotdot from 'react-dotdotdot';
class SimpleCard extends Component {
    render() {
        return (
            <div className="card-item simple">
                <div className="card-item-box" onClick={this.props.onClick}>
                    <div className="card-item-image">
                        <DefaultLoading color="white"/>
                        <div className="back-image"
                        style={{
                            backgroundImage:`url(${(this.props.data.thumbnail.data.path)?`${urlConfig.url}/api/${this.props.data.thumbnail.data.path}`:''})`
                        }}>
                        </div>
                    </div>
                    <div className="card-item-bottom">
                        <div className="post-meta">
                            <span className="category">{this.props.data.category}</span>
                        </div>
                        <Dotdotdot clamp={this.props.bottomHeight<140?1:2} className="post-title">
                            <h3>{this.props.data.title}</h3>
                        </Dotdotdot>
                        <div className="avatar-wrap">                       
                            <div className="avatar" 
                            style={{backgroundImage:`url(${this.props.currentUser.profileImg.isDefault?defaultAvatar:this.props.currentUser.profileImg.url})`}}
                            />
                            <div className="avatar-info">
                                <span>{this.props.currentUser.userName}</span>
                                <span className="date">{this.props.data.postDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimpleCard;