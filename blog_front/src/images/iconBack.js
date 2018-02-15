import React, { Component } from 'react';
class IconBack extends Component {
  render() {
    return (
      <svg x="0px" y="0px" viewBox="0 0 42 24"
      style={{
        fill:this.props.isBright?'#333333':'#ffffff'
      }}
      >
        <path d={`M37.6,11.5H5.8l6.6-6.6c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0l-7.5,7.5c0,0-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0,0.2
        c0,0.1,0,0.3,0.1,0.4l7.5,7.5C11.9,20,12,20,12.1,20s0.3,0,0.4-0.1c0.2-0.2,0.2-0.5,0-0.7l-6.7-6.7h31.9c0.3,0,0.5-0.2,0.5-0.5
        S37.9,11.5,37.6,11.5z`}/>
      </svg>
    )
  }
}
export default IconBack;   