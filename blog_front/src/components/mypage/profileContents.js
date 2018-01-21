import React, { Component } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';
class ProfileContents extends Component {
    render() {
        return (
            <div className="profile-wrap">
                <div className="avatar-wrap">
                    <div className="avatar" 
                        style={{backgroundImage:`url(${this.props.currentUser.profileImg.isDefault?defaultAvatar:this.props.currentUser.profileImg.url})`}}
                    />
                    <div className={`avatar-info`}>
                        <p className="name">{this.props.currentUser.userName}</p>      
                        <p className="type">{this.props.currentUser.type}</p>                          
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContents;