import React, { Component } from 'react';
class IconPhone extends Component {
  render() {
    return (
      <svg x="0px" y="0px" viewBox="0 0 30 30"
        style={{
          fill:this.props.isBright?'#333333':'#ffffff'
        }}
      >
        <path className="back" d={`M18.2,6h-6.3c-1.1,0-2.1,0.9-2.1,2.1v13.9c0,1.1,0.9,2.1,2.1,2.1h6.3c1.1,0,2.1-0.9,2.1-2.1V8.1
          C20.2,6.9,19.3,6,18.2,6z`}/>
        <path d={`M18.2,6h-6.3c-1.1,0-2.1,0.9-2.1,2.1v13.9c0,1.1,0.9,2.1,2.1,2.1h6.3c1.1,0,2.1-0.9,2.1-2.1V8.1C20.2,6.9,19.3,6,18.2,6z
          M19.2,21.9c0,0.6-0.5,1.1-1.1,1.1h-6.3c-0.6,0-1.1-0.5-1.1-1.1V8.1c0-0.6,0.5-1.1,1.1-1.1h1c0,0,0,0,0,0c0,0.3,0.2,0.5,0.5,0.5h3.4
          c0.3,0,0.5-0.2,0.5-0.5c0,0,0,0,0,0h1c0.6,0,1.1,0.5,1.1,1.1V21.9z`}/>
      </svg>
    )
  }
}
export default IconPhone;   