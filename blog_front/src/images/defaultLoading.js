import React, { Component } from 'react';  
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
    const size=this.props.size?this.props.size:"50";
    const r=this.props.r?this.props.r:'15';
    const stroke=this.props.stroke?this.props.stroke:2;
    return (
        <div className={this.props.class?this.props.class:`image-loader`} 
          style={{
            width:`${size}px`,
            height:`${size}px`
          }}
        >
          <svg x="0px" y="0px" width={size} height={size} 
          viewBox={`0 0 ${size} ${size}`}
          fill={"none"}
          stroke={color==='white'?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)"} 
          strokeWidth={stroke} 
          strokeDasharray={`200`}
          strokeDashoffset={0}
          >
          <circle cx={size/2} cy={size/2} r={r}/>
          </svg>
           <svg x="0px" y="0px" width={size} height={size} 
          viewBox={`0 0 ${size} ${size}`} 
          fill={"none"}
          stroke={color==='white'?"rgba(255,255,255,1)":"rgba(0,0,0,1)"}
          strokeWidth={stroke} 
          strokeDasharray={`200`}
          strokeDashoffset={170}
          >
          <circle cx={size/2} cy={size/2} r={r}/>
          </svg>
        </div>
    );
  }
}

export default DefaultLoading;
