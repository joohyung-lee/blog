import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
const springConif={
  stiffness: 80, 
  damping: 24
}
class IframeBorder extends Component {
  render() {
    const{load}=this.props;
    return (
      <Motion 
      style={{
        offsetX:spring(load?0:0,springConif),
        arrayX:spring(load?(this.props.width+this.props.height)*2:0,springConif),
        arrayXReverse:spring(load?0:(this.props.width+this.props.height)*2,springConif),
        stroke:spring(load?1:5,springConif),
      }}>
      {value => 
        <div className="iframe-border">
          <svg 
            width={this.props.width}
            height={this.props.height}
            fill="none"
            stroke={`rgba(255,255,255,1)`}
            strokeWidth={value.stroke}
            strokeDashoffset={value.offsetX}
            strokeDasharray={`${value.arrayX} ${value.arrayXReverse}`}
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
