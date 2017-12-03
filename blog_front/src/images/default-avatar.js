import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
const springConif={
  stiffness: 120, 
  damping: 17
}
class DefaultAvatar extends Component {
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
      style={{
        faceMove: spring(open?3.5:0,springConif),

      }}>
      {value => 
        <div>
          <svg x="0px" y="0px" viewBox="-11 -1 26 26">
          <g id="back">
            <circle cx="2" cy="12" r="11" fill="none" stroke="#222"/>
          </g>
          <g id="mouth">
            <path d={`M7.1,1${5}.1c0,0-0.4,4.4-5.1,4.4s-5.1-4.4-5.1-4.4H7.1z`} fill="#c9c9c9" stroke="#222" 
            strokeWidth="0.75" 
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`translate(-0.5 ${value.faceMove})`}
            />
          </g>
          <g id="nose">
            <path d="M2,10c0,0.8-0.6,1.5-1,2.1c-0.3,0.4,0.4,1.1,1.3,0.8"  fill="none" stroke="#222"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`translate(-1.5 ${value.faceMove})`}
            />
          </g>
          <g id="eyes" fill="#222" stroke="none" 
          transform={`translate(-1.5 ${value.faceMove})`}>
            <path d={`M-2.2,10.1L-2.2,10.1C-2.6,10.1-3,9.7-3,9.3V8.2c0-0.4,0.4-0.8,0.8-0.8h0c0.4,0,0.8,0.4,0.8,0.8v1.1
              C-1.4,9.7-1.7,10.1-2.2,10.1z`}/>
            <path d={`M6.2,10.1L6.2,10.1c-0.4,0-0.8-0.4-0.8-0.8V8.2c0-0.4,0.4-0.8,0.8-0.8h0C6.6,7.4,7,7.7,7,8.2v1.1C7,9.7,6.6,10.1,6.2,10.1z
              `}/>    
          </g>
          </svg>
        </div>
    }
      </Motion>
    );
  }
}

export default DefaultAvatar;
