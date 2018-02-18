import React, { Component } from 'react';
class Logo extends Component {
  render() {
    return (
      <svg x="0px" y="0px" viewBox="0 0 80 25">
      <ellipse className="logo-svg" cx="13.6" cy="12.8" rx="3.6" ry="4.4"/>
      <ellipse className="logo-svg" cx="23.7" cy="12.8" rx="3.6" ry="4.4"/>
      <ellipse className="logo-svg" cx="64" cy="12.8" rx="3.6" ry="4.4"/>
      <polyline className="logo-svg" points="37.6,17.2 37.6,8.4 34.1,12 30.5,8.4 30.5,17.2 "/>
      <g>
        <line className="logo-svg" x1="44.2" y1="14.3" x2="42" y2="14.3"/>
        <polyline className="logo-svg" points="47.6,17.2 44.2,8.4 40.8,17.2 	"/>
        <line className="logo-svg" x1="44.2" y1="14.3" x2="46.5" y2="14.3"/>
      </g>
      <g>
        <line className="logo-svg" x1="48.4" y1="8.4" x2="53.8" y2="8.4"/>
        <line className="logo-svg" x1="51.1" y1="8.4" x2="51.1" y2="17.2"/>
      </g>
      <line className="logo-svg" x1="56.9" y1="8.4" x2="56.9" y2="17.2"/>
      <polyline className="logo-svg" points="70.6,17.2 70.6,8.4 76.6,17.2 76.6,8.4 "/>
      <path className="logo-svg" d="M6.8,8.3c0,0,0,3.9,0,5.8s-1.5,4.3-3.8,2.3"/>
      </svg>
    )
  }
}
export default Logo;   