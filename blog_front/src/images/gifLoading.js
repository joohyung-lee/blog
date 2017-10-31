import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
const springConif={
  stiffness: 120, 
  damping: 17
}
class GifLoading extends Component {
  getStyle=()=>{
    const{open}=this.props;
    return{
      x:spring(open?1:0)
    }
  }
  render() {
    const{open}=this.props;
    return (
      <Motion 
      defaultStyle={{
        w: 45,
        x:2.5,
        offset:0,
        opacity:0.8
      }}
      style={{
        w: spring(20,springConif),
        x:spring(15,springConif),
        offset:spring(155,springConif),
        opacity:spring(0,springConif)
      }}>
      {value => 
        <div className={`gif-loading ${open?`animate`:``}`} >
          <svg x="0px" y="0px" width="50" height="25" viewBox="0 0 50 25" 
          stroke={"rgba(255,255,255,0.8)"} 
          strokeWidth={1} 
          fill={`rgba(255,255,255,${value.opacity})`}
          strokeDasharray={`200`}
          strokeDashoffset={value.offset}
          >
                <rect x={value.x} y="2.5" rx="10" ry="10" width={value.w} height="20"/>
          </svg>
        </div>
    }
      </Motion>
    );
  }
}

export default GifLoading;
