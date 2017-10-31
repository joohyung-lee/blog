import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
  
class DefaultLoading extends Component {
  constructor(props){
    super(props);
    this.state={
      isDone:false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isDone:true
    })
  }
  render() {
    const{color}=this.props;
    return (
        <div className={`image-loader`} >
          <svg x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" 
          fill={"none"}
          stroke={color==='white'?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)"} 
          strokeWidth={2} 
          strokeDasharray={`200`}
          strokeDashoffset={0}
          >
          <circle cx="25" cy="25" r="15"/>
          </svg>
          <svg x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" 
          fill={"none"}
          stroke={color==='white'?"rgba(255,255,255,1)":"rgba(0,0,0,1)"}
          strokeWidth={2} 
          strokeDasharray={`200`}
          strokeDashoffset={170}
          >
          <circle cx="25" cy="25" r="15"/>
          </svg>
        </div>
    );
  }
}

export default DefaultLoading;
