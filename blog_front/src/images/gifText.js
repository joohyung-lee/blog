import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
  
class GifText extends Component {
  getStyle=()=>{
    const{open}=this.props;
    return{
      x:spring(open?1:0)
    }
  }
  render() {
    return (

        <div className={`gif-loading`} >
          <svg x="0px" y="0px" width="50" height="25" viewBox="0 0 50 25"fill={`rgba(255,255,255,0.8)`}
          >
          <path  d={`M37.5,2.5h-25c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10h25c5.5,0,10-4.5,10-10C47.5,7,43,2.5,37.5,2.5z
	 M18.1,14.9c0.4,0.5,0.9,0.7,1.5,0.7c0.7,0,1.2-0.2,1.5-0.5v-1.5h-1.8v-1.3h3.4v3.4l0,0c-0.3,0.4-0.8,0.7-1.3,0.9
	c-0.6,0.2-1.2,0.3-1.9,0.3c-0.7,0-1.4-0.2-1.9-0.5c-0.6-0.3-1-0.8-1.3-1.4c-0.3-0.6-0.5-1.3-0.5-2.2v-0.7c0-1.3,0.3-2.3,0.9-3.1
	C17.4,8.4,18.3,8,19.4,8c1,0,1.8,0.2,2.3,0.7c0.6,0.5,0.9,1.2,1,2.1l0,0.1h-1.7l0-0.1c-0.2-1-0.7-1.5-1.7-1.5
	c-0.6,0-1.1,0.2-1.4,0.7c-0.3,0.5-0.5,1.1-0.5,2v0.7C17.5,13.7,17.7,14.4,18.1,14.9z M26.5,16.9h-1.7V8.1h1.7V16.9z M34.2,9.5h-3.9
	v2.3h3.4v1.4h-3.4v3.6h-1.7V8.1h5.6V9.5z`}/>
          </svg>
        </div>
    );
  }
}

export default GifText;
