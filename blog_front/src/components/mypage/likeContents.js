import React, { Component } from 'react';
import DefaultLoading from 'images/defaultLoading';
import defaultAvatar from 'images/defaultAvatar.svg';
import urlConfig from 'config/urlConfig'
class LikeContents extends Component {
    render() {
        return (
            <div className="card-item">
                <div className="card-item-box">
                    <div className="card-item-image">
                        <DefaultLoading color="white"/>
                        <img src={
                            (this.props.data.thumbnail.data.path)?`${urlConfig.url}/api/${this.props.data.thumbnail.data.path}`:''
                        }/>
                    </div>
                    <div className="card-item-bottom">
                    </div>
                </div>
            </div>
        );
    }
}

export default LikeContents;