import React, { Component } from 'react';
class VideoLoading extends Component {
  render() {
    const{open}=this.props;
    return (
        <div className={`gif-loading ${open?`animate`:''}`} >
          <svg x="0px" y="0px" viewBox="0 0 25 25"
          >
            <path d="M20.3,11.7L6.2,3.5c-0.7-0.4-1.7,0.1-1.7,1v16.3c0,0.9,0.9,1.4,1.7,1l14.1-8.2C21.1,13.2,21.1,12.1,20.3,11.7z"/>
          </svg>
        </div>
    );
  }
}
export default VideoLoading;
