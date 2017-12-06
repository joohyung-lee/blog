import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
const springConif={
  stiffness: 120, 
  damping: 17
}
class IframeBorder extends Component {
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
        w: spring(open?20:45,springConif),
        x:spring(open?15:2.5,springConif),
        offset:spring(open?155:0,springConif),
        opacity:spring(open?0:0.8,springConif)
      }}>
      {value => 
        <div className="iframe-border">
          <svg 
            width={this.props.width}
            height={this.props.height}
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          >
            <rect x="1" y="1" rx="20" ry="20" width={this.props.width-2} height={this.props.height-2}/>
          </svg>
        </div>
    }
      </Motion>
    );
  }
}

export default IframeBorder;
